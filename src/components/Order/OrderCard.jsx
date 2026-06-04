// On importe nos dépendances
import { API_ROOT } from '@constants/apiConstant'; 
import { ORDER_STATUS_MAP } from '@constants/appConstant';
import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderCard({ order }) {

    // On déclare nos constantes de confort
    const firstItem = order?.items?.[0];
    const product = firstItem?.product;

    const extraItemsCount = (order?.items?.length || 0) - 1;
    const baseTitle = product?.title || 'Article indisponible';
    const displayTitle = extraItemsCount > 0 ? `${baseTitle} (+${extraItemsCount})` : baseTitle;

    const price = order?.totalAmount || 0;
    const reference = order?.reference || 'N/A';
    const date = order?.createdAt ? new Date(order.createdAt).toLocaleDateString('fr-FR') : 'Date inconnue';

    const imagePath = product?.medias?.[0]?.path || null;
    const imageUrl = imagePath
        ? (imagePath.startsWith('http') ? imagePath : `${API_ROOT}${imagePath}`)
        : '/images/placeholder.jpg';

    // Utilisation du dictionnaire importé
    const statusObj = ORDER_STATUS_MAP[order?.status] || { label: order?.status || 'Inconnu', color: 'text-[#737373] border-[#737373]' };

    return (
        <article className="flex w-full bg-[#111111] border border-[#2f2f2f] rounded-lg overflow-hidden group cursor-pointer hover:border-red/30 transition-colors">
            <Link to={`/order/${order?.id}`} className="flex flex-col md:flex-row w-full items-stretch">

                {/* Conteneur Image */}
                <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0 bg-black overflow-hidden isolate">
                    <img
                        src={imageUrl}
                        alt={baseTitle}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* Conteneur Informations */}
                <div className="flex flex-col md:flex-row flex-1 p-6 justify-between gap-6">

                    {/* Informations principales */}
                    <div className="flex flex-col justify-center min-w-0 flex-1">
                        <span className="text-[#555555] font-inter text-xs mb-2">
                            {date} • Réf : {reference}
                        </span>
                        <h3 className="text-white font-bebas text-3xl uppercase tracking-wide truncate mb-3">
                            {displayTitle}
                        </h3>
                        <div className="flex items-center mt-auto">
                            <span className={`px-3 py-1 text-[10px] font-inter font-semibold uppercase tracking-widest border rounded-full ${statusObj.color}`}>
                                {statusObj.label}
                            </span>
                        </div>
                    </div>

                    {/* Informations de tarification */}
                    <div className="flex flex-col justify-center items-end shrink-0">
                        <span className="text-white font-bebas text-4xl tracking-wider">
                            {price}€
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}