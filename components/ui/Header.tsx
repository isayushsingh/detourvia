"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Globe, Search, Menu, Share, Heart, ChevronLeft, MoreHorizontal, User, MapPin, Grid } from 'lucide-react';

interface HeaderProps {
  variant?: 'home' | 'journal';
  activeTab?: 'all' | 'creators' | 'locations';
  setActiveTab?: (tab: 'all' | 'creators' | 'locations') => void;
}

export default function Header({ variant = 'home', activeTab, setActiveTab }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for input
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- SEARCH HANDLER ---
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md transition-all duration-300 ${isScrolled ? 'shadow-sm border-b border-gray-200' : ''}`}>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* LEFT: Logo & Back */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          {variant === 'journal' && (
            <Link href="/" className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors text-gray-500 hover:text-black">
              <ChevronLeft size={20} />
            </Link>
          )}
          
          <Link href="/" className={`font-serif font-bold text-lg flex items-center gap-2 tracking-tight group ${variant === 'journal' ? 'hidden md:flex' : 'flex'}`}>
             <Globe size={18} className="text-black group-hover:rotate-12 transition-transform" strokeWidth={1.5} />
             <span>detourvia</span>
          </Link>
        </div>

        {/* MIDDLE: Search Bar */}
        <div className={`
            flex-grow max-w-lg mx-auto
            ${variant === 'journal' ? 'flex md:flex' : 'hidden md:flex'}
            ${variant === 'home' && !isScrolled ? 'md:opacity-0 md:translate-y-4 md:pointer-events-none' : 'md:opacity-100 md:translate-y-0'}
            transition-all duration-500 ease-in-out
        `}>
           <div className="flex items-center gap-3 w-full bg-white border border-gray-200 rounded-full px-3 py-2 shadow-sm hover:shadow-md transition-all h-10">
              <Search size={14} className="text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder={variant === 'home' ? "Start your search..." : "Search journal..."}
                className="bg-transparent border-none outline-none font-sans text-sm text-gray-800 placeholder:text-gray-400 w-full min-w-0"
              />
           </div>
        </div>

        {/* RIGHT: Actions (Unchanged) */}
        <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
           {variant === 'home' ? (
             <button className="p-2 hover:bg-black/5 rounded-full transition-colors text-gray-600">
                <Menu size={20} strokeWidth={1.5} />
             </button>
           ) : (
             <>
               <button className="p-2 hover:bg-black/5 rounded-full transition-colors text-gray-500 hover:text-black hidden md:block">
                  <Share size={18} />
               </button>
               <button className="p-2 hover:bg-black/5 rounded-full transition-colors text-gray-500 hover:text-red-500 transition-colors">
                  <Heart size={18} />
               </button>
               <button className="p-2 hover:bg-black/5 rounded-full transition-colors text-gray-500 hover:text-black">
                  <MoreHorizontal size={18} />
               </button>
             </>
           )}
        </div>
      </div>

      {/* MOBILE SEARCH BAR (Home Only) */}
      {variant === 'home' && (
        <div className="md:hidden px-4 pb-3">
           <div className="flex items-center gap-2 w-full border border-gray-200 bg-white rounded-full px-4 py-2.5 shadow-sm">
              <Search size={16} className="text-black" />
              <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 onKeyDown={handleSearch}
                 placeholder="Where to?" 
                 className="bg-transparent border-none outline-none font-sans text-sm text-gray-800 placeholder:text-gray-400 w-full"
              />
           </div>
        </div>
      )}

      {/* TABS ROW (Unchanged) */}
      {variant === 'home' && setActiveTab && (
        <div className={`w-full bg-[#FDFBF7]/95 transition-all duration-300 overflow-hidden ${isScrolled ? 'h-10 md:h-0 border-b md:border-none border-gray-100' : 'h-16 md:h-12'}`}>
           <div className="max-w-7xl mx-auto px-4 h-full flex justify-center gap-8 md:gap-12 items-center">
             
             {/* Tab 0: All */}
             <button 
               onClick={() => setActiveTab('all')}
               className={`group flex items-center gap-2 transition-all ${activeTab === 'all' ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
             >
                <Grid size={18} />
                <span className="font-serif font-bold text-sm md:text-base relative pb-1">
                  All
                  {activeTab === 'all' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full" />}
                </span>
             </button>

             {/* Tab 1: Creators */}
             <button 
               onClick={() => setActiveTab('creators')}
               className={`group flex items-center gap-2 transition-all ${activeTab === 'creators' ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
             >
                <User size={18} />
                <span className="font-serif font-bold text-sm md:text-base relative pb-1">
                  Creators
                  {activeTab === 'creators' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full" />}
                </span>
             </button>

             {/* Tab 2: Locations */}
             <button 
               onClick={() => setActiveTab('locations')}
               className={`group flex items-center gap-2 transition-all ${activeTab === 'locations' ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
             >
                <MapPin size={18} />
                <span className="font-serif font-bold text-sm md:text-base relative pb-1">
                  Locations
                  {activeTab === 'locations' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full" />}
                </span>
             </button>

           </div>
        </div>
      )}

    </header>
  );
}