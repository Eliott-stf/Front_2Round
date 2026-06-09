//on récup le hook
import React from 'react';
import { API_ROOT } from '@constants/apiConstant';

const ProductRow = ({ product, handleToggleArchive, handleOpenDetail }) => {
    //on déclare nos const de confort
    const productIdShort = product.id.substring(0, 8) + '...';

    //Vérif si un vendeur existe sinon "Anonyme"
    const sellerName = product.seller
        ? `${product.seller.name} ${product.seller.lastname}`
        : 'Anonyme';

    const isArchived = product.status === 'ARCHIVED';
    const isPack = product.isPack || product.description?.includes('[PACK:');
    let imagePath = product.medias?.[0]?.path;
    if (!imagePath && isPack && product.subProducts?.[0]?.medias?.[0]?.path) {
        imagePath = product.subProducts[0].medias[0].path;
    }
    const imageUrl = imagePath
        ? (imagePath.startsWith('http') ? imagePath : `${API_ROOT}${imagePath}`)
        : null;

    return (
        <tr
            onClick={() => handleOpenDetail(product)}
            className="hover:bg-[#1a1a1a] transition-colors cursor-pointer"
        >
            <td className="px-6 py-4 font-inter text-sm text-[#888888]">
                {productIdShort}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    {/* Placeholder d'image produit */}
                    <div className="w-10 h-10 bg-[#222222] rounded flex items-center justify-center overflow-hidden">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="font-inter text-xs text-[#555555]">IMG</span>
                        )}
                    </div>
                    <span className="font-inter text-sm text-white max-w-[200px] truncate flex items-center gap-1.5">
                        {product.title}
                        {isPack && (
                            <span className="px-1.5 py-0.5 text-[8px] font-bold bg-red text-white font-inter uppercase tracking-wide rounded">
                                Lot
                            </span>
                        )}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4 font-inter text-sm text-[#888888]">
                {product.price} €
            </td>
            <td className="px-6 py-4 font-inter text-sm text-[#888888]">
                {sellerName}
            </td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-inter uppercase tracking-wider border rounded-md ${isArchived ? 'border-[#333333] text-[#555555]' : 'border-white text-white'
                    }`}>
                    {product.status}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleToggleArchive(product.id);
                    }}
                    className="font-inter text-sm text-white hover:text-[#888888] underline transition-colors outline-none"
                >
                    {isArchived ? 'Restaurer' : 'Archiver'}
                </button>
            </td>
        </tr>
    );
};

export default ProductRow;
