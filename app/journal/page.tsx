"use client";

import { useState, Suspense } from 'react'; // Added Suspense
import { useSearchParams } from 'next/navigation';
import { TRIPS, CREATORS } from '@/data/db'; // New Data Source
import Lightbox from '@/components/ui/Lightbox';
import Header from '@/components/ui/Header';
import JournalHero from '@/components/journal/JournalHero';
import ItineraryList from '@/components/journal/ItineraryList';
import ContactBook from '@/components/journal/ContactBook'; 
import CreatorFooter from '@/components/journal/CreatorFooter';
import TripCost from '@/components/journal/TripCost';
import TripEssentials from '@/components/journal/TripEssentials';

// Wrapper for the main content to safely use useSearchParams
function JournalContent() {
  const searchParams = useSearchParams();
  const tripId = searchParams.get('id');

  // 1. FETCH DATA (Mock DB Logic)
  // Default to the first trip if ID is missing or not found
  const trip = TRIPS.find((t) => t.id === tripId) || TRIPS[0];
  const creator = CREATORS.find((c) => c.id === trip.creatorId) || CREATORS[0];

  // Gallery State
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
      <Lightbox 
        isOpen={isOpen} 
        images={currentImages} 
        currentIndex={photoIndex} 
        onClose={() => setIsOpen(false)} 
        onNext={handleNext} 
        onPrev={handlePrev}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
        
        {/* Pass separate Trip and Creator objects */}
        <JournalHero trip={trip} creator={creator} openGallery={openGallery} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12 lg:gap-24 relative items-start">
          
          <div className="w-full min-w-0">
             <ItineraryList schedule={trip.itinerary} openGallery={openGallery} />
          </div>
          
          <aside className="hidden md:block sticky top-24 h-fit pb-10">
             <ContactBook contacts={trip.contacts} />
          </aside>

          <div className="md:hidden mt-12 border-t border-dashed border-gray-300 pt-8">
             <ContactBook contacts={trip.contacts} />
          </div>

        </div>

        <TripEssentials data={trip.essentials} />
        
        {/* Updated props: budgetBreakdown instead of budget */}
        <TripCost budget={trip.budgetBreakdown} total={trip.totalCost} />
        
        <CreatorFooter creator={creator} />
      </div>
    </main>
  );
}

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#222222] font-sans selection:bg-yellow-100">
      <Header variant="journal" />
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
         <JournalContent />
      </Suspense>
    </main>
  );
}