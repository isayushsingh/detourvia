import Link from 'next/link';
import { Globe, Share, Heart, ChevronLeft, MoreHorizontal } from 'lucide-react';

export default function JournalHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-dashed border-gray-300 transition-all">
      <div className="max-w-5xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Back / Home */}
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors text-gray-500 hover:text-black">
            <ChevronLeft size={20} />
          </Link>
          
          <Link href="/" className="font-serif font-bold text-lg flex items-center gap-2 tracking-tight group">
             <Globe size={18} className="text-black group-hover:rotate-12 transition-transform" strokeWidth={1.5} />
             <span>travel.log</span>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
           <button className="p-2 hover:bg-black/5 rounded-full transition-colors text-gray-500 hover:text-black hidden md:block">
              <Share size={18} />
           </button>
           <button className="p-2 hover:bg-black/5 rounded-full transition-colors text-gray-500 hover:text-brand-accent">
              <Heart size={18} />
           </button>
           <button className="p-2 hover:bg-black/5 rounded-full transition-colors text-gray-500 hover:text-black">
              <MoreHorizontal size={18} />
           </button>
        </div>

      </div>
    </header>
  );
}