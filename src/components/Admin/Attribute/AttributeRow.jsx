import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export default function AttributeRow({ attribute, onEdit, onDelete, deleteConfirmId, setDeleteConfirmId }) {
    //on déclare nos const de confort
    const id = attribute.id;
    const value = attribute.value;
    const isConfirming = deleteConfirmId === id;

    return (
        <tr className="border-b border-[#222] hover:bg-white/5 transition-colors">
            <td className="px-4 py-3 text-white font-inter text-sm font-medium">
                {value}
            </td>
            <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                    {isConfirming ? (
                        <div className="flex items-center gap-1.5 animate-fadeIn">
                            <button
                                onClick={() => onDelete(id)}
                                className="bg-red hover:bg-[#cc0000] text-white font-inter text-[11px] font-semibold px-2.5 py-1 rounded transition-colors uppercase tracking-wider"
                            >
                                Oui
                            </button>
                            <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="bg-[#1c1c1c] hover:bg-[#222] text-[#888] hover:text-white border border-[#222] font-inter text-[11px] font-semibold px-2.5 py-1 rounded transition-colors uppercase tracking-wider"
                            >
                                Non
                            </button>
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={() => onEdit(attribute)}
                                className="p-1.5 hover:bg-[#222] text-[#888] hover:text-white rounded transition-colors"
                                title="Modifier"
                            >
                                <Pencil size={14} />
                            </button>
                            <button
                                onClick={() => setDeleteConfirmId(id)}
                                className="p-1.5 hover:bg-red/10 text-[#888] hover:text-red rounded transition-colors"
                                title="Supprimer"
                            >
                                <Trash2 size={14} />
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
}
