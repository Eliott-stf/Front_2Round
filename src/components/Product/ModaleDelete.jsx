import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '@store/product/productSlice';

export default function ModaleDelete({ isOpen, onClose, productId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);

    if (!isOpen) return null;

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            //On appelle notre méthode du store
            await dispatch(deleteProduct(productId)).unwrap();
            // Redirection après suppression
            navigate('/profil');
        } catch (error) {
            console.error("Échec de la suppression :", error);
            setIsDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-100 bg-[#111111] border border-[#333333] p-8 flex flex-col items-center text-center">
                <h2 className="font-bebas text-[32px] text-white uppercase tracking-wide mb-4">Supprimer l'annonce</h2>
                <p className="font-inter text-gray-light text-[15px] mb-8 leading-relaxed">
                    Cette action est irréversible. L'annonce sera retirée de la plateforme.
                </p>

                <div className="flex flex-col gap-4 w-full">
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="w-full h-14 bg-red text-white font-inter font-bold text-[14px] uppercase tracking-widest hover:bg-red/80 transition-colors disabled:opacity-50"
                    >
                        {isDeleting ? 'Suppression...' : 'Confirmer'}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="w-full h-14 border border-[#333333] bg-transparent text-white font-inter font-semibold text-[14px] uppercase tracking-widest hover:border-white transition-colors"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}