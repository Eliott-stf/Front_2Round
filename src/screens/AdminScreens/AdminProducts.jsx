//on récup le hook
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts, toggleAdminProductArchive } from '@store/admin/adminSlice';
import { fetchCategories } from '@store/category/categorySlice';
import PageLoader from '@components/Loader/PageLoader';
import ProductList from '@components/Admin/Product/ProductList';
import ModaleProductDetail from '@components/Admin/Product/ModaleProductDetail';
import HeaderAdmin from '@components/Admin/UI/HeaderAdmin';
import SearchBar from '@components/Admin/UI/SearchBar';
import FilterSelect from '@components/Admin/UI/FilterSelect';
import CounterBadge from '@components/Admin/UI/CounterBadge';
import { PRODUCT_STATUS_FILTER_OPTIONS } from '@constants/appConstant';


const AdminProducts = () => {
    //on récup le hook
    const dispatch = useDispatch();
    
    //on déclare nos state
    const { products, loading } = useSelector((state) => state.admin);
    const { items: categories = [] } = useSelector((state) => state.categories || { items: [] });
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    //Méthode pour récup les donne de L'API
    useEffect(() => {
        dispatch(fetchAdminProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    //on déclare nos const de confort
    const handleToggleArchive = (productId) => {
        dispatch(toggleAdminProductArchive(productId));
    };

    const handleOpenDetail = (product) => {
        setSelectedProduct(product);
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setSelectedProduct(null);
        setIsDetailOpen(false);
    };

    const filteredProducts = products.filter((product) => {
        const titleMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const sellerName = product.seller 
            ? `${product.seller.name} ${product.seller.lastname}`.toLowerCase()
            : '';
        const sellerMatch = sellerName.includes(searchQuery.toLowerCase());
        const categoryMatch = selectedCategoryId 
            ? product.categoryId === selectedCategoryId 
            : true;
        const statusMatch = statusFilter === 'ALL' || product.status === statusFilter;
        
        return (titleMatch || sellerMatch) && categoryMatch && statusMatch;
    });

    //loading et erreur
    if (loading && products.length === 0) {
        return <PageLoader />;
    }

    return (
        <div className="flex flex-col gap-8">
            <HeaderAdmin 
                title="Produits" 
                subtitle="Modération du catalogue."
            >
                <SearchBar 
                    placeholder="Rechercher produit ou vendeur..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
                <FilterSelect 
                    value={selectedCategoryId} 
                    onChange={(e) => setSelectedCategoryId(e.target.value)} 
                    options={categories.map((cat) => ({ value: cat.id, label: cat.name }))} 
                    defaultLabel="Toutes les catégories" 
                />
                <FilterSelect 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    options={PRODUCT_STATUS_FILTER_OPTIONS}
                />
                <CounterBadge count={filteredProducts.length} label="Produits" />
            </HeaderAdmin>

            {/* Appel du composant enfant ProductList */}
            <ProductList 
                products={filteredProducts} 
                loading={loading} 
                handleToggleArchive={handleToggleArchive} 
                handleOpenDetail={handleOpenDetail}
            />

            {/* Modale de Détail du Produit */}
            <ModaleProductDetail 
                isOpen={isDetailOpen}
                onClose={handleCloseDetail}
                product={selectedProduct}
            />
        </div>
    );
};

export default AdminProducts;
