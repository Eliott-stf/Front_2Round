// src/components/EvaluationsTab.jsx
import React from 'react';
import ReviewCard from './ReviewCard';


const GlobalStar = ({ filled }) => (
  <svg className={`w-10 h-10 ${filled ? 'text-red' : 'text-white'}`} viewBox="0 0 58 55" fill="currentColor">
    <path d="M28.5312 0L35.2667 20.7295H57.0629L39.4294 33.541L46.1648 54.2705L28.5312 41.459L10.8977 54.2705L17.6331 33.541L-0.00044632 20.7295H21.7958L28.5312 0Z"/>
  </svg>
);

export default function ReviewTab() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col mb-12">
        <div className="flex items-center gap-6">
          <span className="font-bebas text-7xl text-white tracking-wide">4.5</span>
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => <GlobalStar key={i} filled={i < 4} />)}
          </div>
        </div>
        <p className="font-inter text-gray-light text-lg uppercase mt-2 tracking-widest">2 Évaluations</p>
      </div>

      <div className="flex flex-col w-full">
        <ReviewCard 
          avatar="/images/isi63.png"
          username="ISI63"
          date="Il y a 1 mois"
          content="Super échange, tout était parfait."
          rating={5}
        />
        <ReviewCard 
          avatar="/images/bubule2.png"
          username="BUBULE2"
          date="Il y a 1 mois"
          content="Article super, en très bon état. L'envoie un peu long."
          rating={4}
        />
      </div>
    </div>
  );
}