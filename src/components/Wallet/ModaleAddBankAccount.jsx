import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { createBankAccount } from '@store/bankAccount/bankAccountSlice';
import { X, Building } from 'lucide-react';

export default function ModaleAddBankAccount({ isOpen, onClose }) {
    
    // On récupère les hooks
    const dispatch = useDispatch();
    
    // On récupère nos datas Redux
    const { loading } = useSelector((state) => state.bankAccounts);

    // On déclare nos states locaux
    const [formData, setFormData] = useState({
        iban: '',
        bic: '',
        ownerName: '',
        isDefault: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createBankAccount(formData)).unwrap();
            setFormData({ iban: '', bic: '', ownerName: '', isDefault: false });
            onClose();
        } catch (error) {
            console.error('Erreur ajout compte', error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                >
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="w-full max-w-lg bg-[#111111] border border-[#2f2f2f] rounded-xl flex flex-col overflow-hidden"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-[#2f2f2f]">
                            <h3 className="font-bebas text-white text-2xl tracking-wider flex items-center gap-2">
                                <Building className="w-5 h-5 text-white" />
                                Ajouter un compte bancaire
                            </h3>
                            <button onClick={onClose} className="text-[#737373] hover:text-white transition-colors outline-none">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-inter text-[#737373] text-xs uppercase tracking-widest">Titulaire du compte</label>
                                <input
                                    type="text"
                                    name="ownerName"
                                    value={formData.ownerName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Mike Tyson"
                                    className="w-full bg-black border border-[#2f2f2f] rounded-lg px-4 py-3 font-inter text-sm text-white placeholder:text-[#555555] focus:outline-none focus:border-red transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-inter text-[#737373] text-xs uppercase tracking-widest">IBAN</label>
                                <input
                                    type="text"
                                    name="iban"
                                    value={formData.iban}
                                    onChange={handleChange}
                                    required
                                    placeholder="FR76 0000 0000 0000 0000 0000 000"
                                    className="w-full bg-black border border-[#2f2f2f] rounded-lg px-4 py-3 font-inter text-sm text-white placeholder:text-[#555555] focus:outline-none focus:border-red transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-inter text-[#737373] text-xs uppercase tracking-widest">BIC</label>
                                <input
                                    type="text"
                                    name="bic"
                                    value={formData.bic}
                                    onChange={handleChange}
                                    required
                                    placeholder="TRFXFR02"
                                    className="w-full bg-black border border-[#2f2f2f] rounded-lg px-4 py-3 font-inter text-sm text-white placeholder:text-[#555555] focus:outline-none focus:border-red transition-colors"
                                />
                            </div>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="isDefault"
                                    checked={formData.isDefault}
                                    onChange={handleChange}
                                    className="w-5 h-5 accent-red bg-black border-[#2f2f2f] rounded cursor-pointer"
                                />
                                <span className="font-inter text-sm text-white group-hover:text-red transition-colors">
                                    Définir comme compte par défaut
                                </span>
                            </label>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 mt-2 bg-red text-white font-bebas text-xl tracking-widest rounded-lg hover:bg-red/90 disabled:opacity-50 transition-colors uppercase"
                            >
                                {loading ? 'Ajout en cours...' : 'Ajouter le compte'}
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}