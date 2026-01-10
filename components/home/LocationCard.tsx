import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';

export default function LocationCard({ trip, idx }: { trip: any, idx: number }) {
  return (
    <Link href={trip.link} className={`group cursor-pointer p-1.5 bg-white shadow-[1px_1px_4px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-[1.05] ${idx % 3 === 0 ? 'rotate-[0.5deg] hover:rotate-0' : 'rotate-[-0.5deg] hover:rotate-0'}`}>
        
        {/* Aspect Ratio 1:1 (Square for Locations) */}
        <div className="relative aspect-square mb-2 filter contrast-[0.95] group-hover:contrast-100 transition-all">
           <Image 
             src={trip.coverImage} 
             alt={trip.location} 
             fill 
             className="object-cover border border-gray-50"
           />
           <button className="absolute top-1.5 right-1.5 text-white/70 hover:text-white hover:scale-110 transition">
              <Heart size={12} className="fill-black/20"/>
           </button>
        </div>

        <div className="px-0.5 pb-1">
           <div className="flex justify-between items-start">
              <h3 className="font-serif font-bold text-gray-900 text-xs">{trip.location}</h3>
              {/* <div className="flex items-center gap-0.5 text-[8px] font-mono text-gray-400 mt-0.5">
                 ★ {trip.rating}
              </div> */}
           </div>
           <p className="font-hand text-gray-400 text-[10px] mt-0.5 line-clamp-1">{trip.title}</p>
           {/* <p className="font-mono text-[8px] text-gray-500 mt-1 uppercase tracking-wider bg-gray-50 inline-block px-1 rounded-sm border border-gray-100">From {trip.price}</p> */}
        </div>
     </Link>
  );
}