import React from 'react';

export default function ProductForm({ formData, setFormData, categories, errors }) {
    return (
        <div className="bg-[#111111] border border-[#2f2f2f] rounded-2xl p-6 md:p-8 flex flex-col gap-6">
            <h2 className="font-bebas text-white text-3xl tracking-wider uppercase border-b border-[#2f2f2f] pb-3">
                Détails de l'article
            </h2>

            {/* Titre */}
            <div className="flex flex-col gap-2">
                <label className="text-white font-inter text-xs uppercase tracking-widest font-semibold">
                    Titre de l'annonce <span className="text-red">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Ex: Gants Everlast Pro 14oz"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#161616] border border-[#2f2f2f] focus:border-red/60 rounded-xl px-4 py-3 text-white placeholder-[#525252] font-inter text-sm focus:outline-none focus:ring-1 focus:ring-red/60 transition-all duration-200"
                />
                {errors.title && <span className="text-red text-xs mt-1">{errors.title}</span>}
            </div>

            {/* Catégorie */}
            <div className="flex flex-col gap-2">
                <label className="text-white font-inter text-xs uppercase tracking-widest font-semibold">
                    Catégorie <span className="text-red">*</span>
                </label>
                <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full bg-[#161616] border border-[#2f2f2f] focus:border-red/60 rounded-xl px-4 py-3 text-white font-inter text-sm focus:outline-none focus:ring-1 focus:ring-red/60 transition-all duration-200 cursor-pointer"
                >
                    <option value="" className="text-[#525252]">Sélectionner une catégorie</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id} className="text-white bg-[#111111]">
                            {cat.name}
                        </option>
                    ))}
                </select>
                {errors.categoryId && <span className="text-red text-xs mt-1">{errors.categoryId}</span>}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
                <label className="text-white font-inter text-xs uppercase tracking-widest font-semibold">
                    Description <span className="text-red">*</span>
                </label>
                <textarea
                    placeholder="Décrivez votre produit, son état, ses éventuels défauts, matières, etc."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={5}
                    className="w-full bg-[#161616] border border-[#2f2f2f] focus:border-red/60 rounded-xl px-4 py-3 text-white placeholder-[#525252] font-inter text-sm focus:outline-none focus:ring-1 focus:ring-red/60 transition-all duration-200 resize-none"
                />
                {errors.description && <span className="text-red text-xs mt-1">{errors.description}</span>}
            </div>

            {/* État / Condition */}
            <div className="flex flex-col gap-2">
                <label className="text-white font-inter text-xs uppercase tracking-widest font-semibold mb-1">
                    État <span className="text-red">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { value: 'NEW', label: 'Neuf', desc: 'Jamais porté, avec étiquette' },
                        { value: 'VERY_GOOD', label: 'Très bon état', desc: 'Peu porté, sans défauts' },
                        { value: 'GOOD', label: 'Bon état', desc: 'Déjà porté, légères marques' },
                        { value: 'FAIR', label: 'État correct', desc: 'Traces d\'usure visibles' }
                    ].map((cond) => (
                        <button
                            key={cond.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, condition: cond.value })}
                            className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                                formData.condition === cond.value
                                    ? 'bg-[#1b1716] border-red text-white'
                                    : 'bg-[#161616] border-[#2f2f2f] hover:border-[#444444] text-[#a3a3a3]'
                            }`}
                        >
                            <span className="font-inter font-bold text-sm mb-1">{cond.label}</span>
                            <span className="font-inter text-[10px] leading-tight text-[#737373]">{cond.desc}</span>
                        </button>
                    ))}
                </div>
                {errors.condition && <span className="text-red text-xs mt-1">{errors.condition}</span>}
            </div>

            {/* Taille & Prix (2 Colonnes) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Taille */}
                <div className="flex flex-col gap-2">
                    <label className="text-white font-inter text-xs uppercase tracking-widest font-semibold">
                        Taille / Dimension
                    </label>
                    <input
                        type="text"
                        placeholder="Ex: 14oz, L, 42..."
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        className="w-full bg-[#161616] border border-[#2f2f2f] focus:border-red/60 rounded-xl px-4 py-3 text-white placeholder-[#525252] font-inter text-sm focus:outline-none focus:ring-1 focus:ring-red/60 transition-all duration-200"
                    />
                </div>

                {/* Prix */}
                <div className="flex flex-col gap-2">
                    <label className="text-white font-inter text-xs uppercase tracking-widest font-semibold">
                        Prix de vente <span className="text-red">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.price}
                            onChange={(e) => {
                                setFormData({ ...formData, price: e.target.value });
                            }}
                            className="w-full bg-[#161616] border border-[#2f2f2f] focus:border-red/60 rounded-xl pl-4 pr-12 py-3 text-white placeholder-[#525252] font-inter text-sm focus:outline-none focus:ring-1 focus:ring-red/60 transition-all duration-200"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737373] font-inter text-sm font-semibold">
                            €
                        </span>
                    </div>
                    {errors.price && <span className="text-red text-xs mt-1">{errors.price}</span>}
                </div>
            </div>
        </div>
    );
}
