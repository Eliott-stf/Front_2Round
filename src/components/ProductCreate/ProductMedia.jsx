import React, { useState } from 'react';

export default function ProductMedia({ files, setFiles, errors }) {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles((prev) => [...prev, ...selectedFiles]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            const imageFiles = droppedFiles.filter(file => file.type.startsWith('image/'));
            setFiles((prev) => [...prev, ...imageFiles]);
        }
    };

    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-[#111111] border border-[#2f2f2f] rounded-2xl p-6 md:p-8 flex flex-col gap-6">
            <div className="flex flex-col border-b border-[#2f2f2f] pb-3">
                <h2 className="font-bebas text-white text-3xl tracking-wider uppercase">
                    Photos de l'article
                </h2>
                <span className="text-[#737373] font-inter text-xs mt-1">
                    Ajoutez jusqu'à 5 photos. Les photos claires et bien éclairées vendent plus vite.
                </span>
            </div>

            {/* Zone de Drag and Drop */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative w-full min-h-[200px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 ${
                    isDragging
                        ? 'border-red bg-[#1a0c0c]/40'
                        : 'border-[#2f2f2f] hover:border-red/40 bg-[#161616]/40 hover:bg-[#161616]'
                }`}
            >
                {/* Icône de Caméra/Upload */}
                <svg
                    className={`w-12 h-12 mb-4 transition-colors duration-300 ${
                        isDragging ? 'text-red' : 'text-[#737373]'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>

                <span className="font-inter text-white text-sm font-semibold mb-1">
                    Glissez-déposez vos photos ici
                </span>
                <span className="font-inter text-[#737373] text-xs mb-4">
                    ou cliquez pour parcourir vos fichiers
                </span>

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    id="images-picker"
                />
            </div>
            {errors.files && <span className="text-red text-xs mt-1">{errors.files}</span>}

            {/* Grille de Previews */}
            {files.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {files.map((file, index) => {
                        const previewUrl = URL.createObjectURL(file);
                        return (
                            <div
                                key={index}
                                className="relative aspect-square rounded-xl overflow-hidden border border-[#2f2f2f] bg-[#0c0c0c] group hover:border-red/40 transition-all duration-300"
                            >
                                <img
                                    src={previewUrl}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                
                                {/* Bouton supprimer au survol */}
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="absolute top-2 right-2 p-1.5 bg-black/80 hover:bg-red rounded-full text-white transition-colors duration-200 cursor-pointer"
                                >
                                    <svg
                                        className="w-3.5 h-3.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
