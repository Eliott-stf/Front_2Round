import React from 'react';
import HeroSection from '@components/Home/HeroSection';

import SelectionSection from '@components/Home/SelectionSection';
import GuidesSection from '@components/Home/GuidesSection';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col overflow-x-hidden">

      {/* Sections structurelles de la page d'accueil */}
      <HeroSection />
      <SelectionSection />
      <GuidesSection />

    </div>
  );
}