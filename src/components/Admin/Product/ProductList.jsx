//on récup le hook
import React from 'react';
import ProductRow from './ProductRow';

const ProductList = ({ products, loading, handleToggleArchive, handleOpenDetail }) => {
    return (
        <div className="bg-[#111111] border border-[#222222] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#222222] bg-[#0a0a0a]">
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">ID</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">Produit</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">Prix</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">Vendeur</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider">Statut</th>
                            <th className="px-6 py-4 font-inter text-xs text-[#555555] uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#222222]">
                        {products.map((product) => (
                            <ProductRow 
                                key={product.id} 
                                product={product} 
                                handleToggleArchive={handleToggleArchive} 
                                handleOpenDetail={handleOpenDetail} 
                            />
                        ))}
                        {products.length === 0 && !loading && (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-[#555555] font-inter">
                                    Aucun produit trouvé.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
