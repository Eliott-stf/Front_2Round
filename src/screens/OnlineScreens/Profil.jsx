import ProductTab from '@components/Product/ProductTab';
import ProfilHeader from '@components/Profil/ProfilHeader';
import ReviewTab from '@components/Review/ReviewTab';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '@contexts/AuthContext';

export default function Profil() {

  //On déclare nos params (pour récup de l'URL)
  const { id } = useParams();
  //On déclare nos variables du AuthContext
  const { userId: authId } = useAuthContext();
  //On déclare nos States
  const [activeTab, setActiveTab] = useState('articles');

  //Vérification pour savoir si c'est NOTRE profil ou le profil d'un AUTRE
  const targetUserId = id || authId;
  const isOwnProfile = targetUserId === authId;

  return (
    <main className="flex flex-col w-full min-h-screen bg-black">
      <ProfilHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        targetUserId={targetUserId}
        isOwnProfile={isOwnProfile}
      />

      <section className="w-full grow bg-black py-12">
        <div className="max-w-300 mx-auto px-8">
          {activeTab === 'articles' ? (
            <ProductTab targetUserId={targetUserId} />
          ) : (
            <ReviewTab targetUserId={targetUserId} />
          )}
        </div>
      </section>
    </main>
  );
}