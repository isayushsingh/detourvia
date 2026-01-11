import Image from 'next/image';
import { Trip, Creator } from '@/types/schema';
import Link from 'next/link';
import { Heart } from 'lucide-react';

// Helper to format currency/cost if needed
const formatCost = (cost: string) => cost;

export default function PolaroidCard({ trip, creator, idx }: { trip: Trip, creator: Creator, idx: number }) {
  return (
    <Link href={`/journal?id=${trip.id}`} className={`group cursor-pointer p-1.5 bg-white shadow-[2px_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.05] hover:z-10 ${idx % 2 === 0 ? 'rotate-[-1deg] hover:rotate-0' : 'rotate-[1deg] hover:rotate-0'}`}>
         {/* Aspect Ratio 4:4 (Portrait) */}
         <div className="relative aspect-[3/4] mb-2 filter sepia-[0.15] group-hover:sepia-0 transition-all">
            <Image src={trip.coverImage} alt={trip.title} fill className="object-cover border border-gray-50" />

        {creator && (
           <div className="absolute top-1.0 left-1.5 bg-black/80 backdrop-blur-sm px-1 py-[2px] rounded-[2px] shadow-sm">
              <span className="text-[6px] font-mono uppercase tracking-widest text-white">OG</span>
              </div>
            )}

        <button className="absolute top-1.5 right-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110">
            <Heart size={15} className="fill-black/40 drop-shadow-sm"/>
         </button>
        {/* Overlay Days Tag */}
            <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest backdrop-blur-md">
               {trip.duration}
        </div>
         </div>

         {/* Content */}
         <div className="text-center px-0.5 pb-1">
            {/* Tighter Text for Smaller Card */}
         <h3 className="font-serif font-bold text-gray-900 text-xs leading-tight line-clamp-1">{trip.title}</h3>
         <p className="font-hand text-gray-400 text-[10px] mt-0.5 truncate">{creator.name} • {trip.locationName}</p>

         {/* Creator Signature */}
         {/* <div className="mt-auto flex items-center gap-2 opacity-70">
            <div className="relative w-5 h-5 rounded-full overflow-hidden">
               <Image src={creator.avatar} fill className="object-cover" alt={creator.name} />
            </div>
            <span className="font-hand text-sm text-gray-600">by {creator.name}</span>
         </div> */}
         </div>
    </Link>
  );
}