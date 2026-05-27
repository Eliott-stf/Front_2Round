import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyProducts } from '@store/product/productSlice';
import { useAuthContext } from '@contexts/AuthContext';
import ProductCard from './ProductCard';


export default function ProductTab() {
    const dispatch = useDispatch();
    const { userId } = useAuthContext();
    const { myItems, loading } = useSelector(state => state.products);

    useEffect(() => {
        console.log('userId dans ProductTab:', userId);
        if (userId) dispatch(fetchMyProducts(userId));
    }, [userId]);

    useEffect(() => {
        console.log('fetchMyProducts result:', myItems);
    }, [myItems]);

    if (loading) return <p className="text-center py-4">Chargement...</p>;

    if (myItems.length === 0) return (
        <p className="text-center text-gray-400 py-8">Aucun article en vente</p>
    );

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {myItems.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}