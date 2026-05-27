// src/components/ReviewCard.jsx
import React from 'react';

const StarIcon = ({ filled }) => (
  <svg className={`w-6 h-6 ${filled ? 'text-red' : 'text-white'}`} viewBox="0 0 58 55" fill="currentColor">
    <path d="M28.5312 0L35.2667 20.7295H57.0629L39.4294 33.541L46.1648 54.2705L28.5312 41.459L10.8977 54.2705L17.6331 33.541L-0.00044632 20.7295H21.7958L28.5312 0Z"/>
  </svg>
);

export default function ReviewCard({ avatar, username, date, content, rating }) {
  return (
    <article className="flex gap-8 py-8 border-b border-[#222222] last:border-b-0 w-full max-w-[1000px]">
      <div className="flex-shrink-0">
        <img src={avatar} alt={`Profil de ${username}`} className="w-[90px] h-[90px] rounded-full object-cover" />
      </div>

      <div className="flex flex-col flex-1 justify-center pt-1">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-bebas text-3xl uppercase text-white tracking-wide">{username}</h3>
          <span className="font-inter text-gray text-sm font-light">{date}</span>
        </div>

        <p className="font-inter text-gray-light text-xl font-light mt-1">{content}</p>

        <div className="flex gap-2 mt-4">
          {[...Array(5)].map((_, index) => (
            <StarIcon key={index} filled={index < rating} />
          ))}
        </div>
      </div>
    </article>
  );
}