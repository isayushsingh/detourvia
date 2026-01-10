"use client";

import { useState } from 'react';
import { tripData } from '@/data/trip';
import Lightbox from '@/components/ui/Lightbox';
import Header from '@/components/ui/Header'; // <--- NEW IMPORT
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
  
  // ... handler logic ...
  const handleNext = (e: any) => { e.stopPropagation(); setPhotoIndex((prev) => (prev + 1) % currentImages.length); };
  const handlePrev = (e: any) => { e.stopPropagation(); setPhotoIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length); };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#222222] font-sans selection:bg-yellow-100">
      
      {/* Unified Header (Journal Mode) */}
      <Header variant="journal" />
      
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

        <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-12 lg:gap-20 relative items-start">
          <div className="w-full min-w-0">
             <ItineraryList tripData={tripData} openGallery={openGallery} />
          </div>
          
          <aside className="hidden md:block sticky top-24 h-fit pb-10">
             <ContactBook contacts={tripData.contacts} />
          </aside>

          <div className="md:hidden mt-12 border-t border-dashed border-gray-300 pt-8">
             <ContactBook contacts={tripData.contacts} />
          </div>
        </div>

        <TripEssentials data={tripData.essentials} />
        <TripCost budget={tripData.budget} total={tripData.totalCost} />
        <CreatorFooter creator={tripData.creator} />
      </div>
    </main>
  );
}