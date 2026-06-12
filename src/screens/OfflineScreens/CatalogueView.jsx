import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@store/product/productSlice';
import HeaderView from '@components/UI/HeaderView';
import ProductCard from '@components/Product/ProductCard';
import CatalogueFilters from '@components/Catalogue/CatalogueFilter';
import CataloguePagination from '@components/Catalogue/CataloguePagination';

import { useParams } from 'react-router-dom';
import { setFilters } from '@store/product/productSlice';
import { fetchCategories } from '@store/category/categorySlice';

export default function CatalogueView() {
    
    // On récupère les hooks
    const dispatch = useDispatch();
    const { categorySlug } = useParams();

    // On récupère nos datas Redux
    const { items: products, meta, filters, loading } = useSelector((state) => state.products);
    const { items: categories = [] } = useSelector((state) => state.categories || { items: [] });

    // On gère le cycle de vie
    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch, categories.length]);

    useEffect(() => {
        if (categorySlug) {
            if (categories.length > 0) {
                let foundCat = null;
                for (const parent of categories) {
                    if (parent.slug === categorySlug) {
                        foundCat = parent;
                        break;
                    }
                    if (parent.children) {
                        const child = parent.children.find(c => c.slug === categorySlug);
                        if (child) {
                            foundCat = child;
                            break;
                        }
                    }
                }
                if (foundCat) {
                    dispatch(setFilters({ categoryId: foundCat.id }));
                }
            }
        } else {
            // Si pas de slug dans l'URL, on vide le filtre de catégorie
            dispatch(setFilters({ categoryId: '' }));
        }
    }, [categorySlug, categories, dispatch]);

    useEffect(() => {
        dispatch(fetchProducts(filters));
    }, [dispatch, filters]);

    // On déclare nos constantes de confort
    const totalResults = meta?.total || 0;

    return (
        <main className="w-full min-h-screen bg-black flex flex-col">
            
            <HeaderView 
                title="CATALOGUE" 
                subtitle="Découvrez tous les articles disponibles"
                showBackButton={true}
                heightClass="h-[90px] md:h-[120px]"
            />

            <CatalogueFilters />

            <section className="w-full max-w-[1440px] mx-auto px-6 py-8 flex flex-col flex-1">
                
                <span className="font-inter text-[#555555] text-xs uppercase tracking-widest mb-8">
                    {totalResults} résultats.
                </span>

                {loading ? (
                    <div className="w-full flex justify-center py-20">
                        <span className="font-inter text-[#737373] tracking-widest uppercase text-sm">
                            Chargement du catalogue...
                        </span>
                    </div>
                ) : products.length === 0 ? (
                    <div className="w-full flex justify-center py-20">
                        <span className="font-inter text-red tracking-widest uppercase text-sm">
                            Aucun produit ne correspond à vos critères.
                        </span>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-10">
                        {products.map((product) => (
                            <div key={product.id} className="flex justify-center">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}

            </section>

            <CataloguePagination meta={meta} />

        </main>
    );
}