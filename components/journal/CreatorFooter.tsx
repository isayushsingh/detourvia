import Image from 'next/image';
import { Instagram, Twitter, Globe } from 'lucide-react';

export default function CreatorFooter({ creator }: { creator: any }) {
  return (
    <footer className="max-w-4xl mx-auto mt-24 pt-12 border-t border-black mb-12">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        
        {/* Left: Avatar */}
        <div className="relative w-24 h-24 flex-shrink-0">
           <Image 
             src={creator.avatar} 
             fill 
             className="rounded-full object-cover border border-gray-200 grayscale hover:grayscale-0 transition-all duration-500" 
             alt={creator.name}
           />
        </div>

        {/* Right: Content */}
        <div className="text-center md:text-left">
           <h3 className="font-serif text-2xl font-bold text-black mb-2">
             Curated by {creator.name}
           </h3>
           <p className="font-sans text-gray-600 leading-relaxed max-w-xl mb-6">
             {creator.bio || "I am a photographer and slow-travel enthusiast. I believe the best way to see a place is to walk it, taste it, and talk to the locals."}
           </p>

           {/* Social Handles */}
           <div className="flex items-center justify-center md:justify-start gap-6">
              <a href="#" className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                 <Instagram size={16} />
                 <span className="hidden group-hover:inline-block">Instagram</span>
              </a>
              <a href="#" className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                 <Twitter size={16} />
                 <span className="hidden group-hover:inline-block">Twitter</span>
              </a>
              <a href="#" className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                 <Globe size={16} />
                 <span className="hidden group-hover:inline-block">Website</span>
              </a>
           </div>
        </div>
      </div>
      
      <div className="text-center mt-16 opacity-30">
        <p className="font-hand text-sm">© 2026 Travel Journal Inc.</p>
      </div>
    </footer>
  );
}