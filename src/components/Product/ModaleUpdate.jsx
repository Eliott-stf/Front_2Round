import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, fetchProductById, clearProductError } from '@store/product/productSlice';
import { fetchCategories } from '@store/category/categorySlice';
import { fetchAttributes } from '@store/attribute/attributeSlice';
import { uploadProductImages, deleteProductImage } from '@store/media/mediaSlice';
import { PRODUCT_CONDITIONS } from '@constants/appConstant';
import { API_ROOT } from '@constants/apiConstant';

export default function ModaleUpdate({ isOpen, onClose, product }) {
    //On récup le hook
    const dispatch = useDispatch();

    //On déclare nos states locaux et Slice
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [existingMedias, setExistingMedias] = useState([]);
    const [newFiles, setNewFiles] = useState([]);
    // filed d'attente
    const [mediasToDelete, setMediasToDelete] = useState([]);
    const { items: categories = [] } = useSelector(state => state.categories || { items: [] });
    const { items: attributes = [] } = useSelector(state => state.attributes || { items: [] });
    const { error } = useSelector(state => state.products || { error: null });
    const [formData, setFormData] = useState({
        title: '', description: '', price: '', condition: 'GOOD', attributeId: '', categoryId: '',
    });
    const [localError, setLocalError] = useState(null);
    const fileInputRef = useRef(null);

    // Charger les catégories et attributs si besoin
    useEffect(() => {
        if (isOpen) {
            if (categories.length === 0) dispatch(fetchCategories());
            dispatch(fetchAttributes());
        }
    }, [isOpen, categories.length, dispatch]);

    // RÉINITIALISATION STRICTE à chaque fois que la modale s'OUVRE
    // 1. L'initialisation parfaite
    useEffect(() => {
        if (isOpen && product) {
            setFormData({
                title: product.title || '',
                description: product.description || '',
                price: product.price || '',
                condition: product.condition || 'GOOD',
                attributeId: product.attributes?.[0]?.attribute?.id || '',
                categoryId: product.categoryId || '',
            });
            setExistingMedias(product.medias || []);
            setNewFiles([]);
            setMediasToDelete([]);
            dispatch(clearProductError());
        }
        return () => {
            dispatch(clearProductError());
        };
    }, [isOpen, product?.id, dispatch]);

    const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
    const categoryName = selectedCategory ? selectedCategory.name.toLowerCase() : '';

    let filteredAttributes = [];
    if (categoryName.includes('gant')) {
        filteredAttributes = attributes.filter(a => a.type === 'size_glove');
    } else if (categoryName.includes('chaussure')) {
        filteredAttributes = attributes.filter(a => a.type === 'size_shoe');
    } else if (categoryName.includes('vêtement') || categoryName.includes('vetement') || categoryName.includes('casque')) {
        filteredAttributes = attributes.filter(a => a.type === 'size_clothing');
    }
    const hasSizes = filteredAttributes.length > 0;

    if (!isOpen || !product) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? (value === '' ? '' : Number(value)) : value
        }));
    };

    // 2. L'extraction sécurisée des fichiers
    const handleFileSelect = (e) => {
        if (!e.target.files) return;

        // On clone immédiatement les fichiers dans un vrai tableau JavaScript
        const selectedFiles = Array.from(e.target.files);

        if (selectedFiles.length > 0) {
            setNewFiles(prev => {
                const total = existingMedias.length + prev.length + selectedFiles.length;
                if (total > 5) {
                    const allowed = 5 - (existingMedias.length + prev.length);
                    if (allowed > 0) {
                        return [...prev, ...selectedFiles.slice(0, allowed)];
                    }
                    return prev;
                }
                return [...prev, ...selectedFiles];
            });
        }

        // On vide l'input proprement pour pouvoir resélectionner la même image si on change d'avis
        e.target.value = null;
    };

    const handleRemoveExistingMedia = (mediaId) => {
        // On ne supprime PAS sur le serveur tout de suite.
        // On cache l'image de l'UI et on la met dans la file d'attente de suppression.
        setExistingMedias(prev => prev.filter(m => m.id !== mediaId));
        setMediasToDelete(prev => [...prev, mediaId]);
    };

    const handleRemoveNewFile = (indexToRemove) => {
        setNewFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);
        const totalFiles = existingMedias.length + newFiles.length;
        if (totalFiles === 0) {
            setLocalError("Veuillez ajouter au moins une photo de l'article.");
            return;
        }

        setIsSubmitting(true);
        try {
            // 1. Mise à jour des textes
            const { attributeId, ...rest } = formData;
            const updatePayload = {
                ...rest,
                attributeIds: attributeId ? [attributeId] : []
            };
            await dispatch(updateProduct({ id: product.id, data: updatePayload })).unwrap();

            // 2. Supprimer les images mises en file d'attente
            if (mediasToDelete.length > 0) {
                await Promise.all(mediasToDelete.map(mediaId => dispatch(deleteProductImage(mediaId)).unwrap()));
            }

            // 3. Upload des nouvelles images
            if (newFiles.length > 0) {
                await dispatch(uploadProductImages({ productId: product.id, files: newFiles })).unwrap();
            }

            // 4. On rafraîchit le produit pour avoir les nouvelles URLs d'images et on ferme
            await dispatch(fetchProductById(product.id));
            onClose();
        } catch (error) {
            console.error("Échec de la sauvegarde :", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex bg-black/60 backdrop-blur-md p-4 overflow-y-auto transition-all">
            <div className="relative w-full max-w-135 bg-[#1c1c1e] rounded-4xl p-10 flex flex-col m-auto shadow-2xl">

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col mb-8 text-center mt-2">
                    <h2 className="font-inter text-[24px] font-semibold text-white tracking-tight">Modifier l'annonce</h2>
                    <p className="font-inter text-[14px] text-white/50 mt-2">Ajustez les détails de votre article.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {(error || localError) && (
                        <div className="text-red font-inter text-sm text-center bg-red/10 border border-red/20 py-3 px-4 md:px-6 rounded-lg break-words">
                            {error || localError}
                        </div>
                    )}

                    {/* Section Médias (Scroll horizontal) */}
                    <div className="flex flex-col gap-2 mb-2">
                        <label className="font-inter text-[13px] font-medium text-white/70 ml-1">Photos de l'article</label>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-24 h-24 shrink-0 rounded-xl border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="text-[10px] uppercase tracking-wider mt-2 font-inter">Ajouter</span>
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                multiple
                                accept="image/jpeg, image/png, image/webp"
                                className="hidden"
                            />

                            {/* Images déjà en ligne */}
                            {existingMedias.map((media) => (
                                <div key={media.id} className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-black">
                                    <img src={`${API_ROOT}${media.path}`} alt="Produit" className="w-full h-full object-cover opacity-80" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveExistingMedia(media.id)}
                                        className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-red transition-colors"
                                    >
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            ))}

                            {/* Prévisualisation des nouvelles images (brouillon) */}
                            {newFiles.map((file, index) => (
                                <div key={index} className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-black">
                                    <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 border-2 border-white/40 rounded-xl pointer-events-none"></div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveNewFile(index)}
                                        className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-red transition-colors"
                                    >
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="font-inter text-[13px] font-medium text-white/70 ml-1">Titre</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full h-13 bg-[#2c2c2e] rounded-xl px-4 text-white font-inter text-[15px] outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-white/30"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="font-inter text-[13px] font-medium text-white/70 ml-1">Prix (€)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="1"
                                className="w-full h-13 bg-[#2c2c2e] rounded-xl px-4 text-white font-inter text-[15px] outline-none focus:ring-2 focus:ring-white/20 transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="font-inter text-[13px] font-medium text-white/70 ml-1">Taille</label>
                            <select
                                name="attributeId"
                                value={formData.attributeId || ''}
                                onChange={handleChange}
                                disabled={!formData.categoryId || !hasSizes}
                                className="w-full h-13 bg-[#2c2c2e] rounded-xl px-4 text-white font-inter text-[15px] outline-none focus:ring-2 focus:ring-white/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option value="">
                                    {formData.categoryId 
                                        ? (hasSizes ? 'Sélectionner' : 'Aucune') 
                                        : 'Sélectionner...'}
                                </option>
                                {filteredAttributes.map(attr => (
                                    <option key={attr.id} value={attr.id} className="text-black bg-white">{attr.value}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="font-inter text-[13px] font-medium text-white/70 ml-1">Catégorie</label>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                required
                                className="w-full h-13 bg-[#2c2c2e] rounded-xl px-4 text-white font-inter text-[15px] outline-none focus:ring-2 focus:ring-white/20 transition-all appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Sélectionner</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="font-inter text-[13px] font-medium text-white/70 ml-1">État</label>
                            <select
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                className="w-full h-13 bg-[#2c2c2e] rounded-xl px-4 text-white font-inter text-[15px] outline-none focus:ring-2 focus:ring-white/20 transition-all appearance-none cursor-pointer"
                            >
                                {PRODUCT_CONDITIONS.map((condition) => (
                                    <option key={condition.value} value={condition.value}>
                                        {condition.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="font-inter text-[13px] font-medium text-white/70 ml-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full bg-[#2c2c2e] rounded-xl p-4 text-white font-inter text-[15px] outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 bg-white text-black rounded-full font-inter font-semibold text-[15px] hover:scale-[0.98] transition-transform mt-4 disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {isSubmitting ? 'Traitement en cours...' : 'Enregistrer'}
                    </button>
                </form>
            </div>
        </div>
    );
}