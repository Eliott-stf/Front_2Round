// src/components/Product/ProductImg.jsx
import { API_ROOT } from '@constants/apiConstant';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@store/product/productSlice';
import { fetchMyFavorites } from '@store/user/userSlice';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function ProductImg({ product }) {
  //on récup le hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //on déclare nos state
  const { myFavorites } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  //on déclare nos const de confort
  const isPack = product?.isPack || product?.description?.includes('[PACK:');
  let medias = product?.medias || [];
  if (medias.length === 0 && isPack && product?.subProducts?.length > 0) {
    medias = product.subProducts.flatMap(p => p.medias || []);
  }

  const images = medias.length > 0
    ? medias.map(m => m.path.startsWith('http') ? m.path : `${API_ROOT}${m.path}`)
    : ['/images/placeholder.jpg'];

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  //useEffect pour synchroniser l'état du favori avec le store
  useEffect(() => {
    if (product?.id && myFavorites) {
      setIsFavorite(myFavorites.some(fav => fav.id === product.id));
    }
  }, [product?.id, myFavorites]);

  //Méthode pour ajouter/supprimer des favoris
  const handleToggleFavorite = async () => {
    if (!token) {
      navigate('/login', { state: { message: "Connectez-vous pour enregistrer des favoris." } });
      return;
    }
    if (!product?.id) return;
    setIsFavorite(!isFavorite);
    await dispatch(toggleFavorite(product.id));
    dispatch(fetchMyFavorites());
  };

  return (
    <div className="relative isolate w-full aspect-square md:aspect-auto md:h-[541px] max-w-full md:max-w-[535px] bg-[#111111] shrink-0 overflow-hidden group select-none rounded-sm">

      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={activeIndex}
          src={images[activeIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              handleNext();
            } else if (swipe > swipeConfidenceThreshold) {
              handlePrev();
            }
          }}
          alt={product?.title || `Produit ${activeIndex + 1}`}
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute z-10 left-4 md:left-6 top-1/2 -translate-y-1/2 p-2 text-white/80 drop-shadow-md hover:text-white active:text-gray-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 outline-none"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 md:w-8 md:h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute z-10 right-4 md:right-6 top-1/2 -translate-y-1/2 p-2 text-white/80 drop-shadow-md hover:text-white active:text-gray-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 outline-none"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 md:w-8 md:h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute z-10 top-4 right-4 md:top-6 md:right-6 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white font-inter text-[10px] md:text-[12px] font-medium tracking-wider">
            {activeIndex + 1} / {images.length}
          </div>

          <div className="absolute z-10 bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 dynamic-dots">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1 rounded-full transition-all duration-300 outline-none ${index === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                  }`}
              />
            ))}
          </div>
        </>
      )}

      <button
        onClick={handleToggleFavorite}
        className="absolute z-10 bottom-4 right-4 md:bottom-6 md:right-6 transition-transform hover:scale-110 outline-none"
      >
        <svg viewBox="0 0 60 51" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[36px] h-[30px] md:w-[54px] md:h-[46px]">
          <g clipPath={`url(#clip0_203_832_${product?.id})`}>
            <path d="M5.30717 4.09507C9.26792 0.455991 15.2357 -0.88994 20.4347 0.625609C22.6614 1.24607 24.7554 2.33207 26.4984 3.82853C27.9339 4.98795 29.0312 6.48588 29.9912 8.033C31.1424 6.1158 32.6409 4.37043 34.4934 3.06635C36.1329 1.86801 38.0214 1.01257 39.9962 0.497845C45.0834 -0.823855 50.8134 0.526481 54.6782 4.03853C56.4872 5.64219 57.8964 7.66146 58.8227 9.8687C59.9889 12.6744 60.2604 15.7936 59.7639 18.7718C59.1249 22.875 57.2627 26.7086 54.8754 30.1047C52.2804 33.7929 49.1274 37.0774 45.7307 40.0666C42.0699 43.2379 38.1564 46.1266 34.0314 48.6958C32.7234 49.5043 31.3922 50.2804 30.0264 50.9934L29.9177 51C25.2444 48.3963 20.8029 45.3938 16.6622 42.0367C12.8634 38.9542 9.32342 35.5427 6.32642 31.6973C3.43967 27.9797 1.06517 23.7392 0.280669 19.0868C-0.279581 16.0396 -0.00883133 12.8366 1.16267 9.9524C2.08967 7.74003 3.47867 5.69286 5.30717 4.09581V4.09507Z" fill={isFavorite ? "#ff0000" : "black"} />
          </g>
          <defs>
            <clipPath id={`clip0_203_832_${product?.id}`}>
              <rect width="60" height="51" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
}