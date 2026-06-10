import React from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { API_ROOT } from '@constants/apiConstant';

export default function SwipeCard({ product, isTop, onSwipe }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    const opacityLike = useTransform(x, [50, 150], [0, 1]);
    const opacityNope = useTransform(x, [-50, -150], [0, 1]);
    const opacityOffer = useTransform(y, [-50, -150], [0, 1]);

    const controls = useAnimation();

    const handleDragEnd = async (event, info) => {
        const threshold = 120;
        if (Math.abs(info.offset.x) > Math.abs(info.offset.y)) {
            // Balayage horizontal
            if (info.offset.x > threshold) {
                await controls.start({ x: 500, opacity: 0, transition: { duration: 0.3 } });
                onSwipe('right');
            } else if (info.offset.x < -threshold) {
                await controls.start({ x: -500, opacity: 0, transition: { duration: 0.3 } });
                onSwipe('left');
            } else {
                controls.start({ x: 0, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
            }
        } else {
            // Balayage vertical
            if (info.offset.y < -threshold) {
                await controls.start({ y: -500, opacity: 0, transition: { duration: 0.3 } });
                onSwipe('up');
            } else {
                controls.start({ x: 0, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
            }
        }
    };

    const isPack = product?.isPack || product?.description?.includes('[PACK:');
    let imagePath = product?.medias?.[0]?.path || product?.imageUrl || null;
    if (!imagePath && isPack && product?.subProducts?.[0]?.medias?.[0]?.path) {
        imagePath = product.subProducts[0].medias[0].path;
    }
    const imageUrl = imagePath
        ? (imagePath.startsWith('http') ? imagePath : `${API_ROOT}${imagePath}`)
        : '/images/RectangleBG.svg';

    return (
        <motion.div
            className="absolute w-full h-full px-4"
            style={{ 
                x, 
                y,
                rotate,
                scale: isTop ? 1 : 0.95,
                zIndex: isTop ? 10 : 1 
            }}
            drag={isTop ? true : false}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
            whileDrag={{ scale: 1.05 }}
        >
            <div className="relative w-full h-full bg-[#111111] rounded-2xl border border-[#2f2f2f] overflow-hidden shadow-2xl flex flex-col cursor-grab active:cursor-grabbing">
                {/* Tampons visuels superposés */}
                <motion.div 
                    className="absolute top-10 right-10 border-4 border-green-500 text-green-500 font-bebas text-5xl px-4 py-2 rounded-lg transform rotate-12 z-20 pointer-events-none bg-black/40 backdrop-blur-sm"
                    style={{ opacity: opacityLike }}
                >
                    LIKE
                </motion.div>
                <motion.div 
                    className="absolute top-10 left-10 border-4 border-red text-red font-bebas text-5xl px-4 py-2 rounded-lg transform -rotate-12 z-20 pointer-events-none bg-black/40 backdrop-blur-sm"
                    style={{ opacity: opacityNope }}
                >
                    K.O
                </motion.div>
                <motion.div 
                    className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-amber-500 text-amber-500 font-bebas text-5xl px-4 py-2 rounded-lg z-20 pointer-events-none bg-black/40 backdrop-blur-sm"
                    style={{ opacity: opacityOffer }}
                >
                    OFFRE
                </motion.div>

                {/* Image de l'article */}
                <div className="relative w-full h-[70%] bg-black pointer-events-none">
                    <img 
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        draggable="false"
                    />
                    {/* Dégradé de fond pour la lisibilité */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-90" />
                </div>

                {/* Informations de l'article */}
                <div className="flex flex-col p-6 h-[30%] justify-between pointer-events-none bg-[#111111]">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="font-bebas text-3xl md:text-4xl text-white uppercase tracking-wider truncate mr-4 drop-shadow-md">
                                {product.title}
                            </h2>
                            <span className="font-bebas text-2xl md:text-3xl text-red drop-shadow-md">
                                {product.price}€
                            </span>
                        </div>
                        <p className="font-inter text-[#888] text-sm line-clamp-2">
                            {product.description || "Aucune description fournie par le vendeur."}
                        </p>
                    </div>
                    
                    <div className="flex gap-2">
                        <span className="bg-[#222] text-xs font-inter text-[#ccc] px-3 py-1 rounded-full border border-[#333]">
                            Taille: {product.size || 'N/A'}
                        </span>
                        <span className="bg-[#222] text-xs font-inter text-[#ccc] px-3 py-1 rounded-full border border-[#333]">
                            État: {product.condition || 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
