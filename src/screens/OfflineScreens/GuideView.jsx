import CitationSection from '@components/Guide/CitationSection';
import GuideSection from '@components/Guide/GuideSection';
import HeaderView from '@components/UI/HeaderView';
import React from 'react';


export default function GuideView() {
  return (
    <main className="w-full min-h-screen bg-black flex flex-col overflow-x-hidden">

      <HeaderView
        title="UN COUP DE POING ?"
        subtitle="Des guides pour mieux comprendre la boxe et ses équipements."
        showBackButton={true}
        heightClass="h-[140px] md:h-[200px]"
      />

      <GuideSection />

      <CitationSection /> 

    </main>
  );
}