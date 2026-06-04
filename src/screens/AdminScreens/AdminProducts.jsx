//on récup le hook
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts, toggleAdminProductArchive } from '@store/admin/adminSlice';
import { fetchCategories } from '@store/category/categorySlice';
import PageLoader from '@components/Loader/PageLoader';
import ProductList from '@components/Admin/Product/ProductList';
import ModaleProductDetail from '@components/Admin/Product/ModaleProductDetail';

const AdminProducts = () => {
    //on récup le hook
    const dispatch = useDispatch();
    
    //on déclare nos state
    const { products, loading } = useSelector((state) => state.admin);
    const { items: categories = [] } = useSelector((state) => state.categories || { items: [] });
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
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
        
        return (titleMatch || sellerMatch) && categoryMatch;
    });

    //loading et erreur
    if (loading && products.length === 0) {
        return <PageLoader />;
    }

    return (
        <div className="flex flex-col gap-8">
            <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div>
                    <h1 className="font-bebas text-4xl tracking-widest text-white">Produits</h1>
                    <p className="font-inter text-[#888888] mt-2">Modération du catalogue.</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    {/* Barre de Recherche */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher produit ou vendeur..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-[#111] border border-[#222] text-white font-inter text-sm rounded-full pl-5 pr-10 py-2 outline-none w-64 focus:border-[#444] transition-colors"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                            </svg>
                        </div>
                    </div>

                    {/* Dropdown Filtre Catégorie */}
                    <div className="relative">
                        <select
                            value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(e.target.value)}
                            className="appearance-none bg-[#111] border border-[#222] text-white font-inter text-sm rounded-full pl-5 pr-10 py-2 outline-none cursor-pointer hover:border-[#444] transition-colors"
                        >
                            <option value="">Toutes les catégories</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    <div className="bg-[#111111] px-4 py-2 border border-[#222222] rounded-full shrink-0">
                        <span className="font-inter text-sm text-white">{filteredProducts.length} Produits</span>
                    </div>
                </div>
            </header>

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
