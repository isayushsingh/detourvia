"use client";

import { useState } from 'react';
import { tripData } from '@/data/trip';
import Lightbox from '@/components/ui/Lightbox';
import JournalHeader from '@/components/journal/JournalHeader';
import JournalHero from '@/components/journal/JournalHero';
import ItineraryList from '@/components/journal/ItineraryList';
import ContactBook from '@/components/journal/ContactBook'; 
import CreatorFooter from '@/components/journal/CreatorFooter';
import TripCost from '@/components/journal/TripCost';
import TripEssentials from '@/components/journal/TripEssentials';

export default function JournalPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openGallery = (images: string[]) => {
    setCurrentImages(images);
    setPhotoIndex(0);
    setIsOpen(true);
  };
  
  const handleNext = (e: any) => { e.stopPropagation(); setPhotoIndex((prev) => (prev + 1) % currentImages.length); };
  const handlePrev = (e: any) => { e.stopPropagation(); setPhotoIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length); };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#222222] font-sans selection:bg-yellow-100">
      <JournalHeader />
      
      <Lightbox 
        isOpen={isOpen} 
        images={currentImages} 
        currentIndex={photoIndex} 
        onClose={() => setIsOpen(false)} 
        onNext={handleNext} 
        onPrev={handlePrev}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-10">
        <JournalHero tripData={tripData} openGallery={openGallery} />

        {/* --- MAIN SPLIT LAYOUT --- */}
        {/* On Mobile: 1 Column. On Desktop (md+): 2 Columns (Itinerary + Sidebar) */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-12 lg:gap-20 relative items-start">
          
          {/* LEFT: The Itinerary Stream */}
          <div className="w-full min-w-0">
             <ItineraryList tripData={tripData} openGallery={openGallery} />
          </div>
          
          {/* RIGHT: Sticky Sidebar (Desktop Only) */}
          {/* 'hidden md:block' means it hides on mobile, shows on desktop */}
          <aside className="hidden md:block sticky top-24 h-fit pb-10">
             <ContactBook contacts={tripData.contacts} />
          </aside>

          {/* BOTTOM: Contact Book Fallback (Mobile Only) */}
          {/* 'md:hidden' means it shows on mobile, hides on desktop */}
          <div className="md:hidden mt-12 border-t border-dashed border-gray-300 pt-8">
             <ContactBook contacts={tripData.contacts} />
          </div>

        

        </div>
        
        {/* --- NEW ESSENTIALS SECTION --- */}
        <TripEssentials data={tripData.essentials} />
        {/* --- NEW COST SECTION --- */}
        <TripCost budget={tripData.budget} total={tripData.totalCost} />
        

        {/* --- PAGE FOOTER --- */}
        {/* Always at the bottom */}
        <CreatorFooter creator={tripData.creator} />
      </div>
    </main>
  );
}