import React, { useState } from 'react';
import AttributeRow from './AttributeRow';

export default function AttributeList({ attributes, onEdit, onDelete, deleteConfirmId, setDeleteConfirmId }) {
    //on déclare nos state
    const [activeTab, setActiveTab] = useState('size_glove');

    //on déclare nos const de confort
    const tabs = [
        { id: 'size_glove', label: 'Gants' },
        { id: 'size_shoe', label: 'Chaussures' },
        { id: 'size_clothing', label: 'Vêtements' }
    ];

    const filteredAttributes = attributes.filter(attr => attr.type === activeTab);

    return (
        <div className="flex flex-col gap-4">
            {/* Onglets tactiles et fully responsive */}
            <div className="flex border-b border-[#222] overflow-x-auto pb-1 gap-1 scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => {
                            setActiveTab(tab.id);
                            setDeleteConfirmId(null);
                        }}
                        className={`font-bebas text-lg md:text-xl tracking-wider px-4 py-2 border-b-2 transition-all shrink-0 cursor-pointer ${
                            activeTab === tab.id
                                ? 'border-white text-white'
                                : 'border-transparent text-[#666] hover:text-white'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tableau responsive des valeurs */}
            <div className="overflow-x-auto rounded-lg border border-[#222]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#161616] border-b border-[#222]">
                            <th className="px-4 py-3 font-bebas text-sm tracking-wider text-[#888] uppercase">Valeur / Taille</th>
                            <th className="px-4 py-3 font-bebas text-sm tracking-wider text-[#888] uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAttributes.length > 0 ? (
                            filteredAttributes.map((attr) => (
                                <AttributeRow
                                    key={attr.id}
                                    attribute={attr}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    deleteConfirmId={deleteConfirmId}
                                    setDeleteConfirmId={setDeleteConfirmId}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="px-4 py-8 text-center text-[#555] font-inter text-sm">
                                    Aucun attribut défini pour ce type.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
