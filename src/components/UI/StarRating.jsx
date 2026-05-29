import React from 'react';

const StarIcon = ({ filled, sizeClass, filledColor, emptyColor }) => (
  <svg 
    className={`${sizeClass} ${filled ? filledColor : emptyColor}`} 
    viewBox="0 0 58 55" 
    fill="currentColor"
  >
    <path d="M28.5312 0L35.2667 20.7295H57.0629L39.4294 33.541L46.1648 54.2705L28.5312 41.459L10.8977 54.2705L17.6331 33.541L-0.00044632 20.7295H21.7958L28.5312 0Z" />
  </svg>
);

export default function StarRating({ 
  rating = 0, 
  maxRating = 5, 
  sizeClass = 'w-6 h-6', 
  filledColor = 'text-red', 
  emptyColor = 'text-white',
  containerClass = 'flex gap-2'
}) {
  const normalizedRating = Math.round(rating);

  return (
    <div className={containerClass}>
      {[...Array(maxRating)].map((_, index) => (
        <StarIcon 
          key={index} 
          filled={index < normalizedRating} 
          sizeClass={sizeClass}
          filledColor={filledColor}
          emptyColor={emptyColor}
        />
      ))}
    </div>
  );
}