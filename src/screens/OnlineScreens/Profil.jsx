// src/screens/Profil.jsx
import ProductTab from '@components/Product/ProductTab';
import ProfilHeader from '@components/Profil/ProfilHeader';
import ReviewTab from '@components/Review/ReviewTab';
import React, { useState } from 'react';


export default function Profil() {
  const [activeTab, setActiveTab] = useState('articles');

  return (
    // L'ajout de bg-black sur le conteneur parent prévient tout affichage de fond blanc.
    <main className="flex flex-col w-full min-h-screen bg-black">
      <ProfilHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <section className="w-full flex-grow bg-black py-12">
        <div className="max-w-[1200px] mx-auto px-8">
          {activeTab === 'articles' ? <ProductTab /> : <ReviewTab />}
        </div>
      </section>
    </main>
  );
}