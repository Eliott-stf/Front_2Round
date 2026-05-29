import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyProducts } from '@store/product/productSlice';
import ProductCard from './ProductCard';

export default function ProductTab({ targetUserId }) {
    //On récupère le hook
    const dispatch = useDispatch();
    //On déclare nos states
    const { myItems = [], loading, error } = useSelector(state => state.products);

    useEffect(() => {
        //On vérifie que l'ID a bien ete transmit
        if (targetUserId) {
            //Appel a l'API par le Slice
            dispatch(fetchMyProducts(targetUserId));
        }
    }, [targetUserId, dispatch]);

    //Chargement + erreur + Product
    if (loading) return <p className="text-center py-4 font-inter text-gray-light">Chargement...</p>;
    if (error) return <p className="text-center py-4 text-red font-inter text-sm">Erreur : {error}</p>;
    if (!myItems || myItems.length === 0) return (
        <p className="text-center font-inter text-gray py-8 tracking-widest uppercase text-sm">
            Aucun article en vente
        </p>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {myItems.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}