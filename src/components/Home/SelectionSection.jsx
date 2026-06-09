import React, { useEffect, useRef, useState } from 'react';
import ProductCard from '@components/Product/ProductCard';
import api from '@lib/api';

export default function SelectionSection() {
    const scrollContainerRef = useRef(null);

    // Références pour le défilement par clic-glisser (Drag to scroll)
    const isDragActive = useRef(false);
    const startX = useRef(0);
    const scrollLeftVal = useRef(0);
    const dragDistance = useRef(0);

    // États locaux dédiés à la sélection aléatoire
    const [selection, setSelection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const loadRandomProducts = async () => {
            try {
                setLoading(true);
                // Charger 50 produits disponibles pour piocher de l'aléatoire
                const response = await api.url('/products?limit=50').get().json();
                const productsList = response?.data || response?.items || response || [];
                const available = productsList.filter(p => p.status === 'AVAILABLE');
                
                // Fonction de mélange 
                const shuffle = (array) => {
                    const copy = [...array];
                    for (let i = copy.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [copy[i], copy[j]] = [copy[j], copy[i]];
                    }
                    return copy;
                };

                if (isMounted) {
                    setSelection(shuffle(available).slice(0, 8));
                    setLoading(false);
                }
            } catch (err) {
                console.error("Erreur chargement SelectionSection :", err);
                if (isMounted) {
                    setError("Impossible de charger la sélection d'articles.");
                    setLoading(false);
                }
            }
        };

        loadRandomProducts();
        return () => {
            isMounted = false;
        };
    }, []);

    // Événements de souris pour le défilement
    const handleMouseDown = (e) => {
        if (!scrollContainerRef.current) return;
        isDragActive.current = true;
        startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollLeftVal.current = scrollContainerRef.current.scrollLeft;
        dragDistance.current = 0;
        scrollContainerRef.current.style.cursor = 'grabbing';
        scrollContainerRef.current.style.userSelect = 'none';
    };

    const handleMouseLeave = () => {
        isDragActive.current = false;
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.cursor = 'grab';
            scrollContainerRef.current.style.userSelect = 'auto';
        }
    };

    const handleMouseUp = () => {
        isDragActive.current = false;
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.cursor = 'grab';
            scrollContainerRef.current.style.userSelect = 'auto';
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragActive.current || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5; // Vitesse
        scrollContainerRef.current.scrollLeft = scrollLeftVal.current - walk;
        dragDistance.current = Math.abs(x - startX.current);
    };

    // Empêche la redirection de la carte produit si l'utilisateur glisse simplement pour défiler
    const handleContainerClick = (e) => {
        if (dragDistance.current > 10) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <section className="w-full bg-black py-20 border-b border-gray-dark flex justify-center">
            <div className="w-full max-w-[1240px] px-6">

                <h2 className="font-bebas text-white text-[56px] uppercase mb-10 tracking-wider">
                    NOTRE SELECTION
                </h2>

                {loading ? (
                    <p className="text-gray font-inter tracking-widest uppercase text-sm">
                        Chargement de la sélection...
                    </p>
                ) : error ? (
                    <p className="text-red font-inter text-sm">
                        Erreur : {error}
                    </p>
                ) : selection.length > 0 ? (
                    <div className="relative w-full">
                        {/* Container défilant par clic-glisser */}
                        <div
                            ref={scrollContainerRef}
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}
                            onClickCapture={handleContainerClick}
                            className="flex overflow-x-auto flex-nowrap gap-8 pb-4 no-scrollbar cursor-grab active:cursor-grabbing select-none"
                        >
                            {selection.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray font-inter tracking-widest uppercase text-sm">
                        Aucun article disponible pour le moment.
                    </p>
                )}

            </div>
        </section>
    );
}