"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/ui/Header';
import PolaroidCard from '@/components/home/PolaroidCard';
import LocationCard from '@/components/home/LocationCard';
// NEW IMPORTS: Using the normalized DB and Schema
import { TRIPS, CREATORS } from '@/data/db';
import { LocationGroup } from '@/types/schema';
import { Search, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 10; 

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'creators' | 'locations' | 'all'>('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroSearch, setHeroSearch] = useState('');
  const router = useRouter();

  // Pagination State
  const [creatorPage, setCreatorPage] = useState(1);
  const [locationPage, setLocationPage] = useState(1);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeroSearch = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
    if ((e as React.KeyboardEvent).key && (e as React.KeyboardEvent).key !== 'Enter') return;
    if (heroSearch.trim()) {
      router.push(`/search?q=${encodeURIComponent(heroSearch)}`);
    }
  };

  // --- DATA DERIVATION LOGIC ---
  
  // 1. Enrich Trips with Creator Details (Join Operation)
  const allTripsEnriched = TRIPS.map(trip => {
    const creator = CREATORS.find(c => c.id === trip.creatorId)!; // ! assumes creator always exists
    return { ...trip, creator };
  });

  // 2. Derive Location Groups dynamically from Trips
  const deriveLocations = (): LocationGroup[] => {
    const groups: Record<string, LocationGroup> = {};

    allTripsEnriched.forEach(trip => {
       if (!groups[trip.locationName]) {
          groups[trip.locationName] = {
             name: trip.locationName,
             coverImage: trip.coverImage,
             tripCount: 0,
             creators: [],
             trips: []
          };
       }
       const g = groups[trip.locationName];
       g.tripCount++;
       g.trips.push(trip);
       // Add creator if not already in list (Prevent duplicates)
       if (!g.creators.find(c => c.id === trip.creator.id)) {
          g.creators.push(trip.creator);
       }
    });

    return Object.values(groups);
  };

  const locationGroups = deriveLocations();


  // --- PAGINATION & SLICING LOGIC ---

  // 1. Creators List (Trips)
  const totalCreatorPages = Math.ceil(allTripsEnriched.length / ITEMS_PER_PAGE);
  const visibleCreators = activeTab === 'all' 
    ? allTripsEnriched.slice(0, 5) // Preview: Show 5
    : allTripsEnriched.slice((creatorPage - 1) * ITEMS_PER_PAGE, creatorPage * ITEMS_PER_PAGE);

  // 2. Locations List
  const totalLocationPages = Math.ceil(locationGroups.length / ITEMS_PER_PAGE);
  const visibleLocations = activeTab === 'all'
    ? locationGroups.slice(0, 5) // Preview: Show 5
    : locationGroups.slice((locationPage - 1) * ITEMS_PER_PAGE, locationPage * ITEMS_PER_PAGE);


  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#222222] font-sans selection:bg-yellow-100">
      
      <Header variant="home" activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* === HERO SECTION === */}
      <div className={`hidden md:flex flex-col items-center justify-center pt-2 pb-0 transition-all duration-500 ease-in-out ${isScrolled ? 'opacity-0 -translate-y-4 h-0 overflow-hidden' : 'opacity-100 h-20'}`}>
         <div className="relative w-[500px] group">
            <div className="flex items-center gap-3 w-full bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all duration-300">
               <div className="flex-grow flex flex-col justify-center pl-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Where to?</span>
                  <input 
                    type="text" 
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    onKeyDown={handleHeroSearch}
                    placeholder="Search destinations..." 
                    className="bg-transparent border-none outline-none font-serif text-lg text-gray-800 placeholder:text-gray-300 w-full leading-none pb-0.5" 
                  />
               </div>
               <button 
                 onClick={handleHeroSearch}
                 className="w-9 h-9 bg-[#FF385C] hover:bg-[#d93250] rounded-full flex items-center justify-center text-white transition-colors shadow-sm"
               >
                  <Search size={16} strokeWidth={2.5} />
               </button>
            </div>
         </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pt-6 pb-32 space-y-24">
        
        {/* =========================================
            SECTION 1: CREATORS (Journal Originals)
           ========================================= */}
        {(activeTab === 'all' || activeTab === 'creators') && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="flex items-baseline justify-between mb-8 border-b border-dashed border-gray-200 pb-2 mx-2">
               <h2 className="font-serif text-xl md:text-2xl font-bold text-black">Journal Originals</h2>
               <span className="font-hand text-gray-400 text-sm">Handpicked journeys</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
              {visibleCreators.map((trip, idx) => (
                // Pass both trip and creator explicitly to the new PolaroidCard interface
                <PolaroidCard key={trip.id} trip={trip} creator={trip.creator} idx={idx} />
              ))}
            </div>

            {/* View All Button */}
            {activeTab === 'all' && (
              <div className="mt-10 flex justify-center">
                <button 
                  onClick={() => { setActiveTab('creators'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="group flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-black transition-all"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-gray-600 group-hover:text-black">View All Creators</span>
                  <ArrowRight size={14} className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {activeTab === 'creators' && totalCreatorPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-6">
                <button 
                  disabled={creatorPage === 1}
                  onClick={() => { setCreatorPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="p-2 rounded-full border border-gray-200 hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">Page {creatorPage} of {totalCreatorPages}</span>
                <button 
                  disabled={creatorPage === totalCreatorPages}
                  onClick={() => { setCreatorPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="p-2 rounded-full border border-gray-200 hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </section>
        )}


        {/* =========================================
            SECTION 2: LOCATIONS (Derived Groups)
           ========================================= */}
        {(activeTab === 'all' || activeTab === 'locations') && (
           <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             
             <div className="flex items-baseline justify-between mb-8 border-b border-dashed border-gray-200 pb-2 mx-2">
               <h2 className="font-serif text-xl md:text-2xl font-bold text-black">Places to Log</h2>
             </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
               {visibleLocations.map((group, idx) => (
                 // Pass the Derived Group Data to LocationCard
                 <LocationCard key={group.name} locationData={group} idx={idx} />
               ))}
            </div>

            {/* View All Button */}
            {activeTab === 'all' && (
              <div className="mt-10 flex justify-center">
                <button 
                  onClick={() => { setActiveTab('locations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="group flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-black transition-all"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-gray-600 group-hover:text-black">View All Places</span>
                  <ArrowRight size={14} className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {activeTab === 'locations' && totalLocationPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-6">
                <button 
                  disabled={locationPage === 1}
                  onClick={() => { setLocationPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="p-2 rounded-full border border-gray-200 hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">Page {locationPage} of {totalLocationPages}</span>
                <button 
                  disabled={locationPage === totalLocationPages}
                  onClick={() => { setLocationPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="p-2 rounded-full border border-gray-200 hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

           </section>
        )}

      </div>
    </main>
  );
}