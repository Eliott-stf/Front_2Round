import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchAdminTypeReports, 
    createAdminTypeReport, 
    deleteAdminTypeReport 
} from '@store/admin/adminSlice';

export default function ModaleTypeReport({ isOpen, onClose }) {
    //hook
    const dispatch = useDispatch();

    //state
    const { typeReports, loading } = useSelector((state) => state.admin);
    const [newLabel, setNewLabel] = useState('');

    //appel a l'api
    useEffect(() => {
        if (isOpen) {
            dispatch(fetchAdminTypeReports());
        }
    }, [isOpen, dispatch]);

    //méthode de création
    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newLabel.trim()) return;
        
        //on le trim
        await dispatch(createAdminTypeReport({ label: newLabel.trim() }));
        setNewLabel('');
    };

    //méthode de suppression
    const handleDelete = async (id) => {
        if (window.confirm('Voulez-vous vraiment supprimer ce type de signalement ?')) {
            await dispatch(deleteAdminTypeReport(id));
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg bg-[#111111] border border-[#2f2f2f] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-[#2f2f2f] shrink-0">
                        <h2 className="text-xl font-bold text-white uppercase tracking-wider">
                            Types de signalement
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-white hover:bg-[#222222] rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                        {loading && typeReports.length === 0 ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="w-8 h-8 text-white animate-spin" />
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {typeReports.length === 0 ? (
                                    <li className="text-gray-400 text-center py-4 text-sm">
                                        Aucun type de signalement défini.
                                    </li>
                                ) : (
                                    typeReports.map((type) => (
                                        <li 
                                            key={type.id} 
                                            className="flex items-center justify-between bg-[#1a1a1a] border border-[#2f2f2f] p-4 rounded-xl group hover:border-[#444] transition-colors"
                                        >
                                            <span className="text-white font-medium">{type.label}</span>
                                            <button
                                                onClick={() => handleDelete(type.id)}
                                                className="text-gray-500 hover:text-red-500 p-2 rounded-lg hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                title="Supprimer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </li>
                                    ))
                                )}
                            </ul>
                        )}
                    </div>

                    {/* Footer / Form */}
                    <div className="p-6 border-t border-[#2f2f2f] bg-[#0a0a0a] shrink-0">
                        <form onSubmit={handleCreate} className="flex gap-3">
                            <input
                                type="text"
                                value={newLabel}
                                onChange={(e) => setNewLabel(e.target.value)}
                                placeholder="Nouveau type..."
                                className="flex-1 bg-[#111111] border border-[#2f2f2f] text-white px-4 py-3 rounded-xl focus:outline-none focus:border-white transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={!newLabel.trim() || loading}
                                className="bg-white text-black px-5 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                                <span className="hidden sm:inline">Ajouter</span>
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
