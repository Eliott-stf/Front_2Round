import React, { useRef } from 'react';
import ProductCard from './ProductCard'; 

export default function SimilarProduct({ title, products = [], limit = 10 }) {
  const scrollContainerRef = useRef(null);

  // Références pour le défilement par clic-glisser (Drag to scroll)
  const isDragActive = useRef(false);
  const startX = useRef(0);
  const scrollLeftVal = useRef(0);
  const dragDistance = useRef(0);

  const displayedProducts = products.slice(0, limit);

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
    <div className="flex flex-col w-full mt-12 overflow-hidden">
      <h2 className="font-inter font-bold text-[20px] text-white mb-6 tracking-wide uppercase">
        {title}
      </h2>
      
      {displayedProducts.length > 0 ? (
        <div className="relative w-full">
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onClickCapture={handleContainerClick}
            className="flex overflow-x-auto flex-nowrap gap-4 md:gap-8 pb-4 no-scrollbar cursor-grab active:cursor-grabbing select-none w-full"
          >
            {displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <p className="font-inter font-light text-gray-light text-sm italic">
          Aucun article à afficher dans cette section.
        </p>
      )}
    </div>
  );
}