"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/ui/Header';
import PolaroidCard from '@/components/home/PolaroidCard';
import LocationCard from '@/components/home/LocationCard';
// UPDATED: Import from new DB and Schema
import { TRIPS, CREATORS } from '@/data/db';
import { LocationGroup } from '@/types/schema';
import { Search, Frown } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  // --- 1. DATA PREP (Same logic as Home Page) ---
  
  // A. Enrich Trips with Creator Data
  const allTripsEnriched = TRIPS.map(trip => {
    const creator = CREATORS.find(c => c.id === trip.creatorId)!;
    return { ...trip, creator };
  });

  // B. Derive Location Groups
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
       if (!g.creators.find(c => c.id === trip.creator.id)) {
          g.creators.push(trip.creator);
       }
    });
    return Object.values(groups);
  };
  const locationGroups = deriveLocations();


  // --- 2. SEARCH LOGIC ---

  // Filter Creators (Trips)
  const matchedCreators = allTripsEnriched.filter(trip => 
    trip.title.toLowerCase().includes(query) || 
    trip.locationName.toLowerCase().includes(query) ||
    trip.creator.name.toLowerCase().includes(query) ||
    // Check tags
    (trip.tags && trip.tags.some(tag => tag.toLowerCase().includes(query)))
  );

  // Filter Locations
  const matchedLocations = locationGroups.filter(group => 
    group.name.toLowerCase().includes(query) || 
    // Check if any trip in this location has a matching tag
    group.trips.some(t => t.tags.some(tag => tag.toLowerCase().includes(query)))
  );

  const hasResults = matchedCreators.length > 0 || matchedLocations.length > 0;

  return (
    <div className="max-w-[1800px] mx-auto px-6 md:px-12 pt-8 pb-32 space-y-16">
        
      {/* Search Header */}
      <div className="border-b border-dashed border-gray-200 pb-4">
        <div className="flex items-center gap-3 mb-2">
            <Search className="text-black" size={24} />
            <h1 className="font-serif text-3xl font-bold text-black">
                {query ? `Results for "${query}"` : "Search"}
            </h1>
        </div>
        {query && hasResults && (
            <p className="font-mono text-xs text-gray-500 uppercase tracking-widest pl-9">
                Found {matchedCreators.length + matchedLocations.length} matches
            </p>
        )}
      </div>

      {/* --- NO RESULTS STATE --- */}
      {!hasResults && query && (
        <div className="flex flex-col items-center justify-center py-20 opacity-60">
            <Frown size={48} className="mb-4 text-gray-400" />
            <h3 className="font-serif text-xl font-bold text-gray-900">No journeys found</h3>
            <p className="font-hand text-lg text-gray-500">Try searching for a city, a creator, or a specific vibe.</p>
        </div>
      )}

      {/* --- RESULTS GRIDS --- */}
      
      {/* 1. Creator Matches */}
      {matchedCreators.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
               <h2 className="font-serif text-xl font-bold text-black mb-1">Journal Originals</h2>
               <div className="h-[2px] w-12 bg-black/10"></div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
              {matchedCreators.map((trip, idx) => (
                <div key={trip.id} className="bg-white p-3 pb-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transform transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-xl">
                   {/* UPDATED: Pass trip AND creator */}
                   <PolaroidCard trip={trip} creator={trip.creator} idx={idx} />
                </div>
              ))}
            </div>
        </section>
      )}

      {/* 2. Location Matches */}
      {matchedLocations.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
             <div className="mb-8">
               <h2 className="font-serif text-xl font-bold text-black mb-1">Places</h2>
               <div className="h-[2px] w-12 bg-black/10"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
               {matchedLocations.map((group, idx) => (
                 <div key={group.name} className="bg-white p-3 pb-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transform transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-xl">
                    {/* UPDATED: Pass locationGroup */}
                    <LocationCard locationData={group} idx={idx} />
                 </div>
               ))}
            </div>
        </section>
      )}

    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#222222] font-sans selection:bg-yellow-100">
      <Header variant="home" />
      <Suspense fallback={<div className="pt-20 text-center font-mono text-sm text-gray-400">Searching...</div>}>
        <SearchContent />
      </Suspense>
    </main>
  );
}