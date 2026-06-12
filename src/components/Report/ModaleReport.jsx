import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTypeReports, createReport } from '@store/report/reportSlice';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';

export default function ModaleReport({ isOpen, onClose, productId, conversationId }) {
    //on récup le hook
    const dispatch = useDispatch();

    //on déclare nos state
    const { typeReports = [], loading, error: apiError } = useSelector(state => state.reports);
    const [typeReportId, setTypeReportId] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [localError, setLocalError] = useState(null);

    //on déclare nos const de confort
    const title = productId ? "Signaler l'article" : "Signaler la conversation";
    const subtitle = productId 
        ? "Signalez cet article si vous pensez qu'il enfreint nos règles (contrefaçon, contenu inapproprié, arnaque)."
        : "Signalez cette conversation si vous observez des comportements déplacés, des insultes ou des tentatives d'escroquerie.";

    //Méthode pour récup les donne de L'API
    useEffect(() => {
        if (isOpen) {
            dispatch(fetchTypeReports());
        }
    }, [isOpen, dispatch]);

    //Réinitialisation lors de la réouverture/fermeture
    useEffect(() => {
        if (isOpen) {
            setTypeReportId('');
            setContent('');
            setIsSubmitted(false);
            setLocalError(null);
        }
    }, [isOpen]);

    //Vérif que l'élément est ouvert
    if (!isOpen) return null;

    //Méthode pour envoyer le signalement à L'API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);

        //Vérif que le motif est bien sélectionné
        if (!typeReportId) {
            setLocalError("Veuillez sélectionner un motif de signalement.");
            return;
        }

        //on déclare nos const
        const payload = {
            typeReportId,
            content: content.trim() || undefined,
            productId: productId || undefined,
            conversationId: conversationId || undefined
        };

        try {
            await dispatch(createReport(payload)).unwrap();
            setIsSubmitted(true);
        } catch (err) {
            console.error("Erreur lors de la soumission du signalement :", err);
            setLocalError(err || "Une erreur est survenue lors de l'envoi du signalement.");
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-all">
            <div className="relative w-full max-w-135 bg-[#1c1c1e] rounded-4xl p-6 md:p-10 flex flex-col shadow-2xl border border-white/5 max-h-[90vh] overflow-y-auto">
                
                {/* Bouton de fermeture */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                {isSubmitted ? (
                    /* Écran de succès interne après soumission */
                    <div className="flex flex-col items-center text-center py-6">
                        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <CheckCircle size={36} />
                        </div>
                        <h2 className="font-bebas text-[36px] text-white uppercase tracking-wide mb-4">Signalement reçu</h2>
                        <p className="font-inter text-white/70 text-[15px] leading-relaxed mb-8 max-w-md">
                            Merci de nous aider à garder 2ROUND sûr et respectueux. Nos modérateurs vont étudier votre signalement sous 24h et prendront les mesures nécessaires.
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full h-14 bg-white text-black font-inter font-bold text-[14px] uppercase tracking-widest hover:bg-[#e5e5e5] transition-colors rounded-xl"
                        >
                            Fermer
                        </button>
                    </div>
                ) : (
                    /* Formulaire de signalement */
                    <>
                        <div className="flex flex-col mb-8 text-center mt-2">
                            <div className="w-12 h-12 bg-red/10 text-red rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle size={24} />
                            </div>
                            <h2 className="font-bebas text-[36px] text-white uppercase tracking-wide">{title}</h2>
                            <p className="font-inter text-[14px] text-white/50 mt-2 px-2 leading-relaxed">{subtitle}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            
                            {/* Choix du motif */}
                            <div className="flex flex-col gap-2">
                                <label className="font-inter text-[13px] font-medium text-white/70 ml-1">Motif du signalement *</label>
                                <div className="relative">
                                    <select
                                        value={typeReportId}
                                        onChange={(e) => setTypeReportId(e.target.value)}
                                        required
                                        className="w-full h-13 bg-[#2c2c2e] rounded-xl px-4 text-white font-inter text-[15px] outline-none focus:ring-2 focus:ring-white/20 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Sélectionner un motif</option>
                                        {typeReports.map((type) => (
                                            <option key={type.id} value={type.id} className="bg-[#1c1c1e] text-white">
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/50">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Description / Précisions */}
                            <div className="flex flex-col gap-2">
                                <label className="font-inter text-[13px] font-medium text-white/70 ml-1">Détails (Optionnel)</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Décrivez précisément le problème pour aider notre équipe de modération..."
                                    rows={4}
                                    className="w-full bg-[#2c2c2e] rounded-xl p-4 text-white font-inter text-[15px] outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-white/30 resize-none"
                                />
                            </div>

                            {/* loading et erreur */}
                            {(localError || apiError) && (
                                <div className="text-red font-inter text-sm text-center bg-red/10 py-3 px-4 rounded-xl border border-red/20">
                                    {localError || apiError}
                                </div>
                            )}

                            {/* Boutons d'action */}
                            <div className="flex flex-col gap-3 mt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 bg-red text-white font-inter font-bold text-[14px] uppercase tracking-widest hover:bg-red/90 transition-colors disabled:opacity-50 rounded-xl"
                                >
                                    {loading ? 'Envoi...' : 'Envoyer le signalement'}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={loading}
                                    className="w-full h-14 border border-[#333333] bg-transparent text-white font-inter font-semibold text-[14px] uppercase tracking-widest hover:border-white transition-colors rounded-xl"
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
}
