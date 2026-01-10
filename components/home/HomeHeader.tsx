import { Search, Globe, Menu } from 'lucide-react';

interface HomeHeaderProps {
  activeTab: 'all' | 'creators' | 'locations';
  setActiveTab: (tab: 'all' | 'creators' | 'locations') => void;
}

export default function HomeHeader({ activeTab, setActiveTab }: HomeHeaderProps) {
  return (
    <header className="sticky top-0 bg-[#FDFBF7]/90 backdrop-blur-md z-50 pt-4 pb-2 border-b border-dashed border-gray-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between mb-4">
        <div className="font-serif font-bold text-xl flex items-center gap-2 cursor-pointer tracking-tight">
           <Globe size={20} className="text-black" strokeWidth={1.5} />
           <span>diy-vacation</span>
        </div>
        
        {/* Search Pill */}
        <div className="hidden md:flex items-center gap-3 bg-white/50 border-b-2 border-dashed border-gray-300 px-4 py-2 w-96 hover:border-gray-400 transition-colors group cursor-pointer">
           <Search size={16} className="text-gray-400 group-hover:text-black transition-colors" />
           <span className="font-hand text-gray-500 text-lg pt-1">Search journals...</span>
        </div>

        <div className="flex items-center gap-3">
           <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Menu size={20} strokeWidth={1.5} /></button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-center gap-6 md:gap-10">
         {['all', 'creators', 'locations'].map((tab) => (
           <button 
             key={tab}
             onClick={() => setActiveTab(tab as any)}
             className={`pb-1 font-serif text-sm md:text-base capitalize transition-all relative ${activeTab === tab ? 'text-black font-bold' : 'text-gray-400 hover:text-gray-600'}`}
           >
             {tab}
             {activeTab === tab && <span className="absolute -bottom-1 left-0 w-full h-3 bg-yellow-200/60 -z-10 -rotate-1 rounded-sm"></span>}
           </button>
         ))}
      </div>
    </header>
  );
}