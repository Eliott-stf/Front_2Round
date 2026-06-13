import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAddress, updateAddress, clearAddressError } from "../../../store/address/addressSlice";

export default function AddressForm({ initialData, onCancel }) {
    // On récupère les hooks
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.addresses);

    // Détermination automatique du mode d'opération
    const isEditMode = !!initialData;

    // Déclaration du schéma d'état aligné sur le DTO
    const [fields, setFields] = useState({
        streetNumber: "",
        streetName: "",
        zipCode: "",
        city: "",
        additionalInfo: "",
    });

    // Nettoyage de l'erreur quand on quitte ou ouvre le form
    useEffect(() => {
        dispatch(clearAddressError());
        return () => {
            dispatch(clearAddressError());
        };
    }, [dispatch]);

    // Chargement des données si on est en modification
    useEffect(() => {
        if (initialData) {
            setFields({
                streetNumber: initialData.streetNumber || "",
                streetName: initialData.streetName || "",
                zipCode: initialData.zipCode || "",
                city: initialData.city || "",
                additionalInfo: initialData.additionalInfo || "",
            });
        }
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFields((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                // Routage vers l'action de mise à jour de l'adresse
                await dispatch(updateAddress({ id: initialData.id, ...fields })).unwrap();
            } else {
                // Routage vers l'action de création de l'adresse (par défaut de type SHIPPING)
                await dispatch(createAddress({ ...fields, type: "SHIPPING" })).unwrap();
            }
            onCancel(); // Ferme le formulaire et retourne à l'affichage liste
        } catch (error) {
            console.error("Échec du traitement de l'adresse :", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full space-y-4">
            <div className="space-y-3">
                <div className="flex gap-3">
                    <input
                        type="text"
                        name="streetNumber"
                        placeholder="N° (opt.)"
                        value={fields.streetNumber}
                        onChange={handleInputChange}
                        className="w-1/3 bg-black border border-[#222222] rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:border-white focus:outline-none transition-colors font-inter"
                    />
                    <input
                        type="text"
                        name="streetName"
                        required
                        placeholder="Nom de la rue, voie..."
                        value={fields.streetName}
                        onChange={handleInputChange}
                        className="w-2/3 bg-black border border-[#222222] rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:border-white focus:outline-none transition-colors font-inter"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="additionalInfo"
                        placeholder="Bâtiment, étage, interphone (optionnel)"
                        value={fields.additionalInfo}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-[#222222] rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:border-white focus:outline-none transition-colors font-inter"
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <input
                        type="text"
                        name="zipCode"
                        required
                        placeholder="Code postal"
                        value={fields.zipCode}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-[#222222] rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:border-white focus:outline-none transition-colors font-inter"
                    />
                    <input
                        type="text"
                        name="city"
                        required
                        placeholder="Ville"
                        value={fields.city}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-[#222222] rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:border-white focus:outline-none transition-colors font-inter"
                    />
                </div>
            </div>

            {error && (
                <div className="text-red font-inter text-sm text-center bg-red/10 border border-red/20 py-3 px-4 md:px-6 rounded-lg break-words">
                    {error}
                </div>
            )}

            <div className="flex gap-3 pt-4 pb-2">
                {isEditMode && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-1/3 flex items-center justify-center py-4 rounded-xl font-bebas text-xl tracking-wider border border-[#222222] text-gray-400 hover:text-white transition-all duration-200"
                    >
                        Annuler
                    </button>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 flex items-center justify-center py-4 rounded-xl font-bebas text-[22px] tracking-wider bg-white text-black transition-all duration-200 hover:bg-[#e5e5e5] disabled:opacity-50`}
                >
                    {loading ? "Traitement..." : isEditMode ? "Mettre à jour" : "Enregistrer"}
                </button>
            </div>
        </form>
    );
}