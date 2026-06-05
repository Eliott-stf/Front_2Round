// src/components/Admin/Category/CategoryList.jsx
import React from 'react';
import CategoryRow from './CategoryRow';
import { FolderPlus } from 'lucide-react';

const CategoryList = ({ 
    categories = [], 
    onEdit, 
    onDelete, 
    deleteConfirmId, 
    setDeleteConfirmId 
}) => {
    //on déclare nos const de confort
    const items = categories;

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 border border-dashed border-[#222] rounded-lg text-[#555]">
                <FolderPlus size={40} className="mb-3" />
                <p className="font-inter text-sm">Aucune catégorie existante</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {items.map((parent) => (
                <div 
                    key={parent.id} 
                    className="bg-black/40 border border-[#222] rounded-lg p-4 hover:border-[#333] transition-all"
                >
                    {/* Ligne Catégorie Principale */}
                    <CategoryRow 
                        category={parent}
                        isSubcategory={false}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        deleteConfirmId={deleteConfirmId}
                        setDeleteConfirmId={setDeleteConfirmId}
                    />

                    {/* Sous-catégories (Enfants) */}
                    <div className="mt-3 pl-4 border-l border-[#222] space-y-2">
                        {parent.children && parent.children.length > 0 ? (
                            parent.children.map((child) => (
                                <CategoryRow 
                                    key={child.id}
                                    category={child}
                                    isSubcategory={true}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    deleteConfirmId={deleteConfirmId}
                                    setDeleteConfirmId={setDeleteConfirmId}
                                />
                            ))
                        ) : (
                            <p className="text-[#555] font-inter text-xs italic">Aucune sous-catégorie</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
