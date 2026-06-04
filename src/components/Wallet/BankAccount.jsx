import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { deleteBankAccount, setDefaultBankAccount } from '@store/bankAccount/bankAccountSlice';
import { CreditCard, Plus, Trash2, CheckCircle } from 'lucide-react';
import ModaleAddBankAccount from './ModaleAddBankAccount';

export default function BankAccountsList({ accounts }) {
    
    // On récupère les hooks
    const dispatch = useDispatch();

    // On déclare nos states locaux
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // On déclare nos méthodes
    const handleDelete = (id) => {
        dispatch(deleteBankAccount(id));
    };

    const handleSetDefault = (id) => {
        dispatch(setDefaultBankAccount(id));
    };

    return (
        <>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full bg-[#111111] border border-[#2f2f2f] rounded-xl overflow-hidden flex flex-col"
            >
                <div className="p-6 border-b border-[#2f2f2f] flex justify-between items-center">
                    <h3 className="font-bebas text-white text-2xl tracking-wider uppercase">
                        Comptes Bancaires
                    </h3>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 text-red hover:text-white transition-colors font-inter text-sm font-semibold uppercase tracking-widest outline-none"
                    >
                        <Plus className="w-4 h-4" />
                        Ajouter
                    </button>
                </div>

                <div className="flex flex-col p-6 gap-4">
                    {!accounts || accounts.length === 0 ? (
                        <div className="text-center text-[#737373] font-inter text-sm py-4">
                            Aucun compte bancaire enregistré.
                        </div>
                    ) : (
                        accounts.map((account) => (
                            <div 
                                key={account.id} 
                                className={`flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg border transition-colors ${account.isDefault ? 'border-red bg-red/5' : 'border-[#2f2f2f] bg-black hover:border-[#555555]'}`}
                            >
                                <div className="flex items-center gap-4 mb-4 md:mb-0">
                                    <div className={`p-3 rounded-full ${account.isDefault ? 'bg-red text-white' : 'bg-[#1a1a1a] text-[#737373]'}`}>
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bebas text-white text-xl tracking-wider">
                                            {account.ownerName}
                                        </span>
                                        <span className="font-inter text-[#737373] text-sm font-mono mt-1">
                                            {account.iban}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                                    {!account.isDefault && (
                                        <button 
                                            onClick={() => handleSetDefault(account.id)}
                                            className="flex items-center justify-center gap-2 px-4 py-2 border border-[#2f2f2f] text-white text-xs font-inter uppercase tracking-widest rounded hover:border-white transition-colors"
                                        >
                                            <CheckCircle className="w-3.5 h-3.5" />
                                            Par défaut
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => handleDelete(account.id)}
                                        className="p-2 text-[#737373] hover:text-red hover:bg-red/10 rounded transition-colors"
                                        title="Supprimer le compte"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </motion.div>

            <ModaleAddBankAccount 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
            />
        </>
    );
}