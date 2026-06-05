// src/components/Admin/Category/CategoryRow.jsx
import React from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';

const CategoryRow = ({ 
    category, 
    isSubcategory = false, 
    onEdit, 
    onDelete, 
    deleteConfirmId, 
    setDeleteConfirmId 
}) => {
    //on déclare nos const de confort
    const isConfirming = deleteConfirmId === category.id;

    return (
        <div className={`flex items-center justify-between gap-4 ${
            isSubcategory 
                ? 'py-1.5 hover:bg-white/[0.02] px-2 rounded-md transition-colors' 
                : 'pb-2 border-b border-[#222]/50'
        }`}>
            <div className="flex items-center gap-2">
                {isSubcategory && <span className="text-[#888] font-inter text-xs">└─</span>}
                <span className={`${
                    isSubcategory 
                        ? 'font-inter text-sm text-[#ccc]' 
                        : 'font-bebas text-lg tracking-wider text-white'
                }`}>
                    {category.name}
                </span>
                <span className="font-inter text-xs text-[#555] bg-[#111] px-2 py-0.5 rounded-full border border-[#222]">
                    {category.slug}
                </span>
            </div>

            {/* Actions ou Confirmation */}
            <div className="flex items-center gap-2">
                {isConfirming ? (
                    <div className="flex items-center gap-2 bg-[#221111] border border-red/20 px-3 py-1 rounded-md">
                        <span className="font-inter text-xs text-[#ff4444] mr-2">
                            {isSubcategory ? 'Supprimer ?' : 'Confirmer suppression définitive ?'}
                        </span>
                        <button 
                            onClick={() => onDelete(category.id)}
                            className="p-1 hover:bg-[#331111] rounded text-[#ff4444] transition-colors"
                        >
                            <Check size={14} />
                        </button>
                        <button 
                            onClick={() => setDeleteConfirmId(null)}
                            className="p-1 hover:bg-[#331111] rounded text-[#888] transition-colors"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ) : (
                    <>
                        <button 
                            onClick={() => onEdit(category)}
                            className={`hover:bg-[#222] rounded-full text-white/50 hover:text-white transition-all ${
                                isSubcategory ? 'p-1.5' : 'p-2'
                            }`}
                            title="Modifier"
                        >
                            <Pencil size={isSubcategory ? 12 : 14} />
                        </button>
                        <button 
                            onClick={() => setDeleteConfirmId(category.id)}
                            className={`hover:bg-[#221111] rounded-full text-[#ff4444]/50 hover:text-[#ff4444] transition-all ${
                                isSubcategory ? 'p-1.5' : 'p-2'
                            }`}
                            title="Supprimer"
                        >
                            <Trash2 size={isSubcategory ? 12 : 14} />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CategoryRow;
