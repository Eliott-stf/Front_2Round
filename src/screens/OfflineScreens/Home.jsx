import React from 'react';
import HeroSection from '@components/Home/HeroSection';
import SelectionSection from '@components/Home/SelectionSection';
import SwipeSection from '@components/Home/SwipeSection';
import GuidesSection from '@components/Home/GuidesSection';
import ResellSection from '@components/Home/ResellSection';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col overflow-x-hidden">

      {/* Sections structurelles de la page d'accueil */}
      <HeroSection />
      <SelectionSection />
      <SwipeSection />
      <GuidesSection />
      <ResellSection />

    </div>
  );
}