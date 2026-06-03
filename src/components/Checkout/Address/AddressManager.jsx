import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddresses, toggleForm } from "../../../store/address/addressSlice";
import { ChevronLeft } from "lucide-react";
import AddressList from "./AddressList";
import AddressForm from "./AddressForm";

export default function AddressManager({ onNext, onBack }) {
    // On récupère les hooks
    const dispatch = useDispatch();

    // On récupère l'état global
    const { list, isFormOpen, selectedShippingId, selectedBillingId, loading } = useSelector((state) => state.addresses);

    // Registre local pour conserver l'adresse sélectionnée pour modification
    const [editingAddress, setEditingAddress] = useState(null);

    // Cycle de vie : Chargement initial
    useEffect(() => {
        dispatch(fetchAddresses());
    }, [dispatch]);

    // Déclenchement du formulaire en mode édition ou création
    const handleEditAddress = (address) => {
        setEditingAddress(address);
        dispatch(toggleForm(true));
    };

    // Fermeture du formulaire
    const handleCancelForm = () => {
        setEditingAddress(null);
        dispatch(toggleForm(false));
    };

    const showForm = isFormOpen || list.length === 0;

    if (loading && list.length === 0) {
        return (
            <div className="flex h-full items-center justify-center p-6">
                <span className="font-inter text-sm text-gray-500">Récupération de vos coordonnées...</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full p-6">
            <div className="flex items-center mb-6">
                <button
                    type="button"
                    onClick={showForm && list.length > 0 ? handleCancelForm : onBack}
                    className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors text-gray-500 hover:text-white"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="font-bebas text-3xl text-white tracking-wide ml-2">
                    {showForm ? (editingAddress ? "Modifier l'adresse" : "Nouvelle adresse") : "Vos Adresses"}
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                {showForm ? (
                    <AddressForm initialData={editingAddress} onCancel={handleCancelForm} />
                ) : (
                    <AddressList onEditAddress={handleEditAddress} />
                )}
            </div>

            {!showForm && (
                <div className="mt-6 pb-2">
                    <button
                        type="button"
                        disabled={!selectedShippingId || !selectedBillingId}
                        onClick={onNext}
                        className="w-full flex items-center justify-center py-4 rounded-xl font-bebas text-[22px] tracking-wider bg-white text-black transition-all duration-200 hover:bg-[#e5e5e5] disabled:opacity-50"
                    >
                        Continuer vers le paiement
                    </button>
                </div>
            )}
        </div>
    );
}