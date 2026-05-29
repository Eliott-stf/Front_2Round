// src/components/Product/ProductImg.jsx
import React from 'react';

export default function ProductImg({ product }) {
  const imagePath = product?.medias?.[0]?.path;
  const imageUrl = imagePath
      ? (imagePath.startsWith('http') ? imagePath : `http://localhost:3000${imagePath}`)
      : '/images/placeholder.jpg';

  return (
    <div className="relative w-full max-w-[535px] h-[541px] bg-[#111111] shrink-0 flex items-center justify-center overflow-hidden">
      <img 
        src={imageUrl} 
        alt={product?.title || "Détail du produit"} 
        className="w-full h-full object-cover" 
      />

      <button className="absolute left-[22px] top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors">
        <svg width="29" height="29" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button className="absolute right-[22px] top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors">
        <svg width="29" height="29" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-[22px] left-1/2 -translate-x-1/2 flex gap-[7px]">
        <span className="w-[7px] h-[7px] rounded-full bg-white"></span>
        <span className="w-[7px] h-[7px] rounded-full bg-white/40"></span>
        <span className="w-[7px] h-[7px] rounded-full bg-white/40"></span>
        <span className="w-[7px] h-[7px] rounded-full bg-white/40"></span>
      </div>

      <button className="absolute bottom-[22px] right-[22px] transition-transform hover:scale-110">
        <svg width="54" height="46" viewBox="0 0 60 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_203_832)">
            <path d="M5.30717 4.09507C9.26792 0.455991 15.2357 -0.88994 20.4347 0.625609C22.6614 1.24607 24.7554 2.33207 26.4984 3.82853C27.9339 4.98795 29.0312 6.48588 29.9912 8.033C31.1424 6.1158 32.6409 4.37043 34.4934 3.06635C36.1329 1.86801 38.0214 1.01257 39.9962 0.497845C45.0834 -0.823855 50.8134 0.526481 54.6782 4.03853C56.4872 5.64219 57.8964 7.66146 58.8227 9.8687C59.9889 12.6744 60.2604 15.7936 59.7639 18.7718C59.1249 22.875 57.2627 26.7086 54.8754 30.1047C52.2804 33.7929 49.1274 37.0774 45.7307 40.0666C42.0699 43.2379 38.1564 46.1266 34.0314 48.6958C32.7234 49.5043 31.3922 50.2804 30.0264 50.9934L29.9177 51C25.2444 48.3963 20.8029 45.3938 16.6622 42.0367C12.8634 38.9542 9.32342 35.5427 6.32642 31.6973C3.43967 27.9797 1.06517 23.7392 0.280669 19.0868C-0.279581 16.0396 -0.00883133 12.8366 1.16267 9.9524C2.08967 7.74003 3.47867 5.69286 5.30717 4.09581V4.09507Z" fill="black"/>
          </g>
          <defs>
            <clipPath id="clip0_203_832">
              <rect width="60" height="51" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
}