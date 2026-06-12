import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeaderView from '@components/UI/HeaderView';
import ProductForm from '@components/ProductCreate/ProductForm';
import ProductMedia from '@components/ProductCreate/ProductMedia';
import { fetchCategories } from '@store/category/categorySlice';
import { createProduct } from '@store/product/productSlice';
import { uploadProductImages } from '@store/media/mediaSlice';
import { slugify } from '@/utils/slugify';
import { openCTAModal } from '@store/auth/authSlice';

export default function ProductCreateView() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Rediriger si non connecté (vérification synchrone via localStorage pour éviter le flash de l'ErrorPage)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(openCTAModal());
            navigate('/');
        }
    }, [navigate, dispatch]);

    // Récupération des catégories depuis Redux
    const categories = useSelector((state) => state.categories.items);
    const categoriesLoading = useSelector((state) => state.categories.loading);

    // États locaux pour le formulaire et les fichiers
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        condition: '',
        size: '',
        price: '',
        categoryId: '',
    });
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // Charger les catégories au montage
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // Validation du formulaire
    const validateForm = () => {
        const tempErrors = {};
        if (!formData.title.trim()) tempErrors.title = 'Le titre est obligatoire';
        else if (formData.title.trim().length < 3) tempErrors.title = 'Le titre doit faire au moins 3 caractères';

        if (!formData.categoryId) tempErrors.categoryId = 'Veuillez sélectionner une catégorie';

        if (!formData.description.trim()) tempErrors.description = 'La description est obligatoire';
        else if (formData.description.trim().length < 10) tempErrors.description = 'La description doit faire au moins 10 caractères';

        if (!formData.condition) tempErrors.condition = 'Veuillez choisir un état pour l\'article';

        if (!formData.price) tempErrors.price = 'Le prix est obligatoire';
        else {
            const parsedPrice = parseFloat(formData.price);
            if (isNaN(parsedPrice) || parsedPrice <= 0) tempErrors.price = 'Le prix doit être supérieur à 0 €';
        }

        if (files.length === 0) {
            tempErrors.files = 'Veuillez ajouter au moins une photo de l\'article';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);

        if (!validateForm()) {
            // Scroller vers le premier élément en erreur
            const errorElement = document.querySelector('.text-red');
            if (errorElement) {
                errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        setIsSubmitting(true);

        const productData = {
            title: formData.title,
            description: formData.description,
            condition: formData.condition,
            size: formData.size.trim() || null,
            price: parseFloat(formData.price),
            categoryId: formData.categoryId,
        };

        try {
            // 1. Création du produit
            const resultAction = await dispatch(createProduct(productData));

            if (createProduct.fulfilled.match(resultAction)) {
                const newProduct = resultAction.payload?.data || resultAction.payload;
                const productId = newProduct.id;

                // 2. Upload des images associées
                if (files.length > 0) {
                    await dispatch(uploadProductImages({ productId, files }));
                }

                // 3. Redirection vers le produit créé en utilisant le slugify
                const productSlug = slugify(newProduct.title);
                navigate(`/product/${productSlug}-${productId}`);
            } else {
                setSubmitError(resultAction.payload || 'Une erreur est survenue lors de la création du produit.');
            }
        } catch (err) {
            console.error('Erreur lors du processus de publication :', err);
            setSubmitError('Une erreur inattendue est survenue.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="w-full min-h-screen bg-black flex flex-col pb-20">
            {/* Header réutilisant HeaderView */}
            <HeaderView
                title="PUBLIER UN ARTICLE"
                subtitle="Donnez une seconde vie à votre équipement de boxe en quelques secondes"
                heightClass="h-[200px]"
            />

            <section className="w-full max-w-[1000px] mx-auto px-6 py-10">
                {categoriesLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <span className="text-[#737373] font-inter tracking-widest uppercase text-sm animate-pulse">
                            Chargement du formulaire...
                        </span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        {submitError && (
                            <div className="bg-[#1b0c0c] border border-red/40 rounded-xl p-4 text-red font-inter text-sm text-center">
                                {submitError}
                            </div>
                        )}

                        {/* Composant formulaire des informations produit */}
                        <ProductForm
                            formData={formData}
                            setFormData={setFormData}
                            categories={categories}
                            errors={errors}
                        />

                        {/* Composant formulaire des images produit */}
                        <ProductMedia
                            files={files}
                            setFiles={setFiles}
                            errors={errors}
                        />

                        {/* Bouton de Soumission */}
                        <div className="flex justify-end mt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-10 py-4 bg-red hover:bg-[#cc0000] text-white font-bebas text-2xl tracking-wider rounded-xl uppercase transition-all duration-300 shadow-lg cursor-pointer ${isSubmitting
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:scale-[1.02] hover:shadow-red/25'
                                    }`}
                            >
                                {isSubmitting ? 'Publication en cours...' : "Publier l'annonce"}
                            </button>
                        </div>
                    </form>
                )}
            </section>
        </main>
    );
}
