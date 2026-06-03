import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShippingId, setBillingId, toggleForm, deleteAddress } from "../../../store/address/addressSlice";
import { CheckCircle, Plus, Trash2, MapPin, Edit2, Truck, FileText } from "lucide-react";

export default function AddressList({ onEditAddress }) {
    // On récupère les hooks
    const dispatch = useDispatch();

    // On extrait la liste et les sélections depuis le store
    const { list, selectedShippingId, selectedBillingId } = useSelector((state) => state.addresses);

    return (
        <div className="space-y-4">
            {list.map((address) => {
                const isShipping = selectedShippingId === address.id;
                const isBilling = selectedBillingId === address.id;

                return (
                    <div
                        key={address.id}
                        className={`group relative flex flex-col gap-3 p-4 rounded-xl bg-black border transition-all duration-200 ${
                            isShipping || isBilling ? "border-white" : "border-[#222222] hover:border-[#333333]"
                        }`}
                    >
                        {/* Corps textuel des informations de l'adresse */}
                        <div className="flex items-start gap-3 min-w-0 pr-16">
                            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                            <div className="min-w-0">
                                <p className="font-inter text-sm text-white font-medium truncate">
                                    {address.streetNumber ? `${address.streetNumber} ` : ""}{address.streetName}
                                </p>
                                {address.additionalInfo && (
                                    <p className="font-inter text-xs text-gray-500 truncate mt-0.5">
                                        {address.additionalInfo}
                                    </p>
                                )}
                                <p className="font-inter text-xs text-gray-400 mt-0.5">
                                    {address.zipCode} {address.city}
                                </p>
                            </div>
                        </div>

                        {/* Sélections interactives pour Livraison et Facturation */}
                        <div className="flex gap-2 pt-2 border-t border-[#151515]">
                            <button
                                type="button"
                                onClick={() => dispatch(setShippingId(address.id))}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-inter text-xs font-medium transition-colors ${
                                    isShipping 
                                        ? "bg-white text-black" 
                                        : "bg-[#111111] text-gray-400 hover:text-white hover:bg-[#222222]"
                                }`}
                            >
                                <Truck className="w-3.5 h-3.5" />
                                {isShipping ? "Livraison active" : "Livrer ici"}
                            </button>

                            <button
                                type="button"
                                onClick={() => dispatch(setBillingId(address.id))}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-inter text-xs font-medium transition-colors ${
                                    isBilling 
                                        ? "bg-white text-black" 
                                        : "bg-[#111111] text-gray-400 hover:text-white hover:bg-[#222222]"
                                }`}
                            >
                                <FileText className="w-3.5 h-3.5" />
                                {isBilling ? "Facturation active" : "Facturer ici"}
                            </button>
                        </div>

                        {/* Groupe d'actions absolues (Modifier / Supprimer) */}
                        <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                type="button"
                                onClick={() => onEditAddress(address)}
                                className="p-1.5 rounded-md hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                            >
                                <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => dispatch(deleteAddress(address.id))}
                                className="p-1.5 rounded-md hover:bg-white/5 text-gray-500 hover:text-red transition-colors"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                );
            })}

            <button
                type="button"
                onClick={() => onEditAddress(null)} // Ouvre le formulaire vide
                className="w-full flex items-center justify-center gap-2 py-4 border border-dashed border-[#222222] rounded-xl font-inter text-xs uppercase tracking-wider font-semibold text-gray-400 hover:text-white hover:border-[#444444] transition-colors"
            >
                <Plus className="w-4 h-4" />
                Ajouter une nouvelle adresse
            </button>
        </div>
    );
}