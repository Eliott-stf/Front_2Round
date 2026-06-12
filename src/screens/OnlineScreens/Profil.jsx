import ProductTab from '@components/Product/ProductTab';
import ProfilHeader from '@components/Profil/ProfilHeader';
import ReviewTab from '@components/Review/ReviewTab';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '@contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

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

      <section className="w-full grow bg-black py-12 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeTab}
              initial={{ x: activeTab === 'articles' ? '-100vw' : '100vw' }}
              animate={{ x: 0 }}
              exit={{ x: activeTab === 'articles' ? '-100vw' : '100vw' }}
              transition={{ type: "spring", stiffness: 220, damping: 30, mass: 0.8 }}
              className="w-full"
            >
              {activeTab === 'articles' ? (
                <ProductTab targetUserId={targetUserId} />
              ) : (
                <ReviewTab targetUserId={targetUserId} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}