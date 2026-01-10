"use client";

import { useState } from 'react';
import HomeHeader from '@/components/home/HomeHeader';
import PolaroidCard from '@/components/home/PolaroidCard';
import LocationCard from '@/components/home/LocationCard';
import { CREATOR_TRIPS, LOCATION_TRIPS } from '@/data/mockHomeData';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'creators' | 'locations' | 'all'>('all');

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#222222] font-sans selection:bg-yellow-100">
      <HomeHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pt-10 pb-32 space-y-24">
        
        {/* === SECTION 1: CREATORS === */}
        {(activeTab === 'all' || activeTab === 'creators') && (
          <section>
            <div className="flex items-baseline justify-between mb-8 border-b border-dashed border-gray-200 pb-2 mx-2">
               <h2 className="font-serif text-xl md:text-2xl font-bold text-black">Journal Originals</h2>
               <span className="font-hand text-gray-400 text-sm">Handpicked journeys</span>
            </div>
            
            {/* THE GRID ALGEBRA:
                Mobile:  grid-cols-2 + gap-6 (Spacing squeezes cards smaller)
                Desktop: grid-cols-6 or 7 + gap-10 (High density, lots of breathing room)
            */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
              {CREATOR_TRIPS.map((trip, idx) => (
                <PolaroidCard key={trip.id} trip={trip} idx={idx} />
              ))}
            </div>
          </section>
        )}

        {/* === SECTION 2: LOCATIONS === */}
        {(activeTab === 'all' || activeTab === 'locations') && (
           <section>
             <div className="flex items-baseline justify-between mb-8 border-b border-dashed border-gray-200 pb-2 mx-2">
               <h2 className="font-serif text-xl md:text-2xl font-bold text-black">
                 Places to Log
               </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
               {LOCATION_TRIPS.map((trip, idx) => (
                 <LocationCard key={trip.id} trip={trip} idx={idx} />
               ))}
            </div>
           </section>
        )}
      </div>
    </main>
  );
}