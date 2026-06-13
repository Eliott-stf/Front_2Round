import React from 'react';

export default function AttributeForm({
    type,
    setType,
    value,
    setValue,
    isEditing,
    onSubmit,
    onCancel,
    loading
}) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {/* Type d'attribut */}
            <div className="flex flex-col gap-1.5">
                <label className="font-inter text-xs font-semibold text-[#888] uppercase tracking-wider">
                    Type d'attribut
                </label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    disabled={isEditing} // Empêcher le changement de type d'attribut en cours d'édition pour éviter les erreurs logiques
                    className="w-full bg-[#1c1c1c] border border-[#222] rounded-md px-4 py-2 text-white font-inter text-sm focus:border-[#444] focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <option value="size_glove">Gants (taille)</option>
                    <option value="size_shoe">Chaussures (taille)</option>
                    <option value="size_clothing">Vêtements (taille)</option>
                </select>
            </div>

            {/* Valeur de l'attribut */}
            <div className="flex flex-col gap-1.5">
                <label className="font-inter text-xs font-semibold text-[#888] uppercase tracking-wider">
                    Valeur
                </label>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="ex: 12oz, 42, L"
                    className="w-full bg-[#1c1c1c] border border-[#222] rounded-md px-4 py-2 text-white font-inter text-sm focus:border-[#444] focus:outline-none transition-colors"
                    required
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-4">
                <button
                    type="submit"
                    disabled={loading || !value.trim()}
                    className="flex-1 bg-white hover:bg-[#eee] disabled:bg-[#333] disabled:text-[#777] text-black font-inter text-sm font-semibold py-2.5 rounded-md transition-colors cursor-pointer"
                >
                    {isEditing ? 'Enregistrer' : 'Créer'}
                </button>

                {isEditing && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2.5 bg-[#1c1c1c] hover:bg-[#222] text-[#888] hover:text-white font-inter text-sm font-semibold rounded-md border border-[#222] transition-colors cursor-pointer"
                    >
                        Annuler
                    </button>
                )}
            </div>
        </form>
    );
}
