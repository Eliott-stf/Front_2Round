import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchCategories, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} from '@store/category/categorySlice';
import PageLoader from '@components/Loader/PageLoader';
import HeaderAdmin from '@components/Admin/UI/HeaderAdmin';
import CategoryList from '@components/Admin/Category/CategoryList';
import { AlertCircle } from 'lucide-react';


const AdminCategories = () => {
    //on récup le hook
    const dispatch = useDispatch();

    //on déclare nos state
    const { items: categories, loading, error } = useSelector((state) => state.categories);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [parentId, setParentId] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [autoSlug, setAutoSlug] = useState(true);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    //Méthode pour récup les donne de L'API
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    //on déclare nos const de confort
    const parentCategories = categories || [];

    const slugify = (text) => {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    //Méthode pour gérer le changement de nom
    const handleNameChange = (e) => {
        const val = e.target.value;
        setName(val);
        if (autoSlug && !isEditing) {
            setSlug(slugify(val));
        }
    };

    //Méthode pour gérer le changement manuel de slug
    const handleSlugChange = (e) => {
        setSlug(e.target.value);
        setAutoSlug(false);
    };

    //Méthode pour réinitialiser le formulaire
    const resetForm = () => {
        setName('');
        setSlug('');
        setParentId('');
        setIsEditing(false);
        setEditId(null);
        setAutoSlug(true);
    };

    //Méthode pour charger une catégorie en mode édition
    const handleStartEdit = (cat) => {
        setName(cat.name);
        setSlug(cat.slug);
        setParentId(cat.parentId || '');
        setIsEditing(true);
        setEditId(cat.id);
        setAutoSlug(false);
        setDeleteConfirmId(null);
    };

    //Méthode pour soumettre le formulaire (création ou modification)
    const handleSubmit = (e) => {
        e.preventDefault();
        
        //Vérif que les champs requis sont saisis
        if (!name.trim() || !slug.trim()) return;

        const payload = {
            name: name.trim(),
            slug: slug.trim(),
            parentId: parentId || null
        };

        if (isEditing) {
            dispatch(updateCategory({ id: editId, data: payload })).then((res) => {
                if (!res.error) {
                    resetForm();
                    dispatch(fetchCategories());
                }
            });
        } else {
            dispatch(createCategory(payload)).then((res) => {
                if (!res.error) {
                    resetForm();
                    dispatch(fetchCategories());
                }
            });
        }
    };

    //Méthode pour supprimer une catégorie
    const handleDelete = (id) => {
        dispatch(deleteCategory(id)).then(() => {
            setDeleteConfirmId(null);
            dispatch(fetchCategories());
        });
    };

    //loading et erreur
    if (loading && parentCategories.length === 0) {
        return <PageLoader />;
    }

    return (
        <div className="flex flex-col gap-8">
            <HeaderAdmin 
                title="Catégories" 
                subtitle="Gestion de la taxonomie et de la hiérarchie du catalogue."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Liste des catégories (2/3 de large) */}
                <div className="lg:col-span-2 bg-[#111] border border-[#222] rounded-lg p-6">
                    <h3 className="font-bebas text-2xl tracking-wider text-white mb-6">Structure des Catégories</h3>

                    <CategoryList 
                        categories={parentCategories}
                        onEdit={handleStartEdit}
                        onDelete={handleDelete}
                        deleteConfirmId={deleteConfirmId}
                        setDeleteConfirmId={setDeleteConfirmId}
                    />
                </div>

                {/* Formulaire de création / édition (1/3 de large) */}
                <div className="bg-[#111] border border-[#222] rounded-lg p-6 flex flex-col gap-6 h-fit sticky top-24">
                    <div>
                        <h3 className="font-bebas text-2xl tracking-wider text-white">
                            {isEditing ? 'Modifier la catégorie' : 'Créer une catégorie'}
                        </h3>
                        <p className="font-inter text-xs text-[#888] mt-1">
                            {isEditing ? 'Éditez les détails ci-dessous.' : 'Ajoutez une nouvelle option taxonomique.'}
                        </p>
                    </div>

                    {error && (
                        <div className="flex items-start gap-2 bg-[#221111] border border-[#ff4444]/20 p-3 rounded-md text-[#ff4444] font-inter text-xs">
                            <AlertCircle size={16} className="shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        
                        {/* Champ Nom */}
                        <div className="flex flex-col gap-1.5">
                            <label className="font-inter text-xs font-semibold text-[#888] uppercase tracking-wider">
                                Nom
                            </label>
                            <input 
                                type="text" 
                                value={name}
                                onChange={handleNameChange}
                                placeholder="ex: Accessoires"
                                className="w-full bg-[#1c1c1c] border border-[#222] rounded-md px-4 py-2 text-white font-inter text-sm focus:border-[#444] focus:outline-none transition-colors"
                                required
                            />
                        </div>

                        {/* Champ Slug */}
                        <div className="flex flex-col gap-1.5">
                            <label className="font-inter text-xs font-semibold text-[#888] uppercase tracking-wider flex items-center justify-between">
                                <span>Slug</span>
                                {!isEditing && !autoSlug && (
                                    <button 
                                        type="button" 
                                        onClick={() => { setAutoSlug(true); setSlug(slugify(name)); }}
                                        className="text-[#888] hover:text-white transition-colors normal-case text-[10px]"
                                    >
                                        Auto-générer
                                    </button>
                                )}
                            </label>
                            <input 
                                type="text" 
                                value={slug}
                                onChange={handleSlugChange}
                                placeholder="ex: accessoires"
                                className="w-full bg-[#1c1c1c] border border-[#222] rounded-md px-4 py-2 text-white font-inter text-sm focus:border-[#444] focus:outline-none transition-colors"
                                required
                            />
                        </div>

                        {/* Champ Catégorie Parente */}
                        <div className="flex flex-col gap-1.5">
                            <label className="font-inter text-xs font-semibold text-[#888] uppercase tracking-wider">
                                Catégorie Parente (Optionnel)
                            </label>
                            <select 
                                value={parentId}
                                onChange={(e) => setParentId(e.target.value)}
                                className="w-full bg-[#1c1c1c] border border-[#222] rounded-md px-4 py-2 text-white font-inter text-sm focus:border-[#444] focus:outline-none cursor-pointer transition-colors"
                            >
                                <option value="">Aucune (Catégorie principale)</option>
                                {parentCategories.map((cat) => {
                                    //Vérif pour empêcher une catégorie d'être son propre parent en cours d'édition
                                    if (isEditing && cat.id === editId) return null;
                                    return (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        {/* Actions boutons */}
                        <div className="flex items-center gap-3 mt-4">
                            <button 
                                type="submit"
                                disabled={loading || !name.trim() || !slug.trim()}
                                className="flex-1 bg-white hover:bg-[#eee] disabled:bg-[#333] disabled:text-[#777] text-black font-inter text-sm font-semibold py-2.5 rounded-md transition-colors"
                            >
                                {isEditing ? 'Enregistrer' : 'Créer'}
                            </button>
                            
                            {isEditing && (
                                <button 
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-2.5 bg-[#1c1c1c] hover:bg-[#222] text-[#888] hover:text-white font-inter text-sm font-semibold rounded-md border border-[#222] transition-colors"
                                >
                                    Annuler
                                </button>
                            )}
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default AdminCategories;
