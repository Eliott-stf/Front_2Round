// On importe nos dépendances
import React from 'react';
import { Truck, FileText } from 'lucide-react';

export default function OrderAddresses({ shippingAddress, billingAddress }) {

    // On déclare nos méthodes utilitaires
    const renderAddress = (address) => {
        if (!address) return <span className="text-[#737373] text-sm font-inter">Adresse non renseignée</span>;

        return (
            <div className="flex flex-col gap-0.5 text-white font-inter text-sm leading-relaxed">
                {address.streetNumber && address.streetName ? (
                    <span>{address.streetNumber} {address.streetName}</span>
                ) : (
                    <span>{address.streetName}</span>
                )}
                <span>{address.zipCode} {address.city}</span>
                {address.additionalInfo && (
                    <span className="text-[#737373] mt-1 italic">{address.additionalInfo}</span>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-[#111111] border border-[#2f2f2f] rounded-xl p-6 flex flex-col gap-4">
                <h3 className="flex items-center gap-3 font-bebas text-white text-xl tracking-wider uppercase border-b border-[#2f2f2f] pb-3">
                    <Truck className="w-5 h-5 text-white" />
                    Adresse de livraison
                </h3>
                {renderAddress(shippingAddress)}
            </div>

            <div className="bg-[#111111] border border-[#2f2f2f] rounded-xl p-6 flex flex-col gap-4">
                <h3 className="flex items-center gap-3 font-bebas text-white text-xl tracking-wider uppercase border-b border-[#2f2f2f] pb-3">
                    <FileText className="w-5 h-5 text-white" />
                    Adresse de facturation
                </h3>
                {renderAddress(billingAddress)}
            </div>
        </div>
    );
}