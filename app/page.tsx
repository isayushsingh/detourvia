"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/ui/Header';
import PolaroidCard from '@/components/home/PolaroidCard';
import LocationCard from '@/components/home/LocationCard';
import { CREATOR_TRIPS, LOCATION_TRIPS } from '@/data/mockHomeData';
import { Search } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'creators' | 'locations' | 'all'>('all');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#222222] font-sans selection:bg-yellow-100">
      
      <Header variant="home" activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* === HERO SECTION: CAPSULE SEARCH (Desktop Only) === */}
      <div className={`hidden md:flex flex-col items-center justify-center pt-2 pb-0 transition-all duration-500 ease-in-out ${isScrolled ? 'opacity-0 -translate-y-4 h-0 overflow-hidden' : 'opacity-100 h-20'}`}>
         
         {/* THE CAPSULE SEARCH - Slimmer Version */}
         <div className="relative w-[500px] group">
            <div className="flex items-center gap-3 w-full bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all duration-300">
               
               <div className="flex-grow flex flex-col justify-center pl-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Where to?</span>
                  <input 
                      type="text" 
                      placeholder="Search destinations..." 
                      className="bg-transparent border-none outline-none font-serif text-lg text-gray-800 placeholder:text-gray-300 w-full leading-none pb-0.5"
                  />
               </div>

               {/* Search Button Circle - Smaller & Cleaner */}
               <button className="w-9 h-9 bg-[#FF385C] hover:bg-[#d93250] rounded-full flex items-center justify-center text-white transition-colors shadow-sm">
                  <Search size={16} strokeWidth={2.5} />
               </button>

            </div>
         </div>
      
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pt-6 pb-32 space-y-24">
        
        {/* ... (Sections remain unchanged) ... */}
        {/* === SECTION 1: CREATORS === */}
        {(activeTab === 'all' || activeTab === 'creators') && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-baseline justify-between mb-8 border-b border-dashed border-gray-200 pb-2 mx-2">
               <h2 className="font-serif text-xl md:text-2xl font-bold text-black">Journal Originals</h2>
               <span className="font-hand text-gray-400 text-sm">Handpicked journeys</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
              {CREATOR_TRIPS.map((trip, idx) => (
                <PolaroidCard key={trip.id} trip={trip} idx={idx} />
              ))}
            </div>
          </section>
        )}

        {/* === SECTION 2: LOCATIONS === */}
        {(activeTab === 'all' || activeTab === 'locations') && (
           <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
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