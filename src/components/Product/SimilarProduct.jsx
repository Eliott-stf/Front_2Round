import React from 'react';
import ProductCard from './ProductCard'; 

export default function SimilarProduct({ title, products = [], limit = 2 }) {

  const displayedProducts = products.slice(0, limit);

  return (
    <div className="flex flex-col w-full mt-12">
      <h2 className="font-inter font-bold text-[20px] text-white mb-6 tracking-wide">
        {title}
      </h2>
      
      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 w-full">
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="font-inter font-light text-gray-light text-sm italic">
          Aucun article à afficher dans cette section.
        </p>
      )}
    </div>
  );
}