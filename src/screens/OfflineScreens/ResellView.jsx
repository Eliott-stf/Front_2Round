import React from 'react';
import ResellHeaderSection from '@components/Resell/ResellHeaderSection';
import InfoSection from '@components/Resell/InfoSection';
import TutoSection from '@components/Resell/TutoSection';

export default function ResellView() {
    return (
        <main className="w-full min-h-screen bg-black flex flex-col overflow-hidden">
            <ResellHeaderSection />
            <InfoSection />
            <TutoSection />
        </main>
    );
}