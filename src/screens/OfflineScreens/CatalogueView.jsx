import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@store/product/productSlice';
import HeaderView from '@components/UI/HeaderView';
import ProductCard from '@components/Product/ProductCard';
import CatalogueFilters from '@components/Catalogue/CatalogueFilter';
import CataloguePagination from '@components/Catalogue/CataloguePagination';

export default function CatalogueView() {
    
    // On récupère les hooks
    const dispatch = useDispatch();

    // On récupère nos datas Redux
    const { items: products, meta, filters, loading } = useSelector((state) => state.products);

    // On gère le cycle de vie
    useEffect(() => {
        dispatch(fetchProducts(filters));
    }, [dispatch, filters]);

    // On déclare nos constantes de confort
    const totalResults = meta?.total || 0;

    return (
        <main className="w-full min-h-screen bg-black flex flex-col">
            
            <HeaderView 
                title="CATALOGUE" 
                showBackButton={true}
                heightClass="h-[120px]"
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
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
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