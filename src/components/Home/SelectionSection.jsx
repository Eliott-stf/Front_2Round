import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@store/product/productSlice';
import ProductCard from '@components/Product/ProductCard';

export default function SelectionSection() {
    const dispatch = useDispatch();

    // Récupération globale des produits depuis le store
    const { items = [], loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Limitation de l'affichage aux 8 premiers articles
    const selection = items.slice(0, 8);

    return (
        <section className="w-full bg-black py-20 border-b border-gray-dark flex justify-center">
            <div className="w-full max-w-[1240px] px-6">

                <h2 className="font-bebas text-white text-[56px] uppercase mb-10 tracking-wider">
                    NOTRE SELECTION
                </h2>

                {loading ? (
                    <p className="text-gray font-inter tracking-widest uppercase text-sm">
                        Chargement de la sélection...
                    </p>
                ) : error ? (
                    <p className="text-red font-inter text-sm">
                        Erreur : {error}
                    </p>
                ) : selection.length > 0 ? (
                    <div className="flex flex-wrap gap-8">
                        {selection.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray font-inter tracking-widest uppercase text-sm">
                        Aucun article disponible pour le moment.
                    </p>
                )}

            </div>
        </section>
    );
}