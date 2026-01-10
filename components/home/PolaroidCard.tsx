import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function PolaroidCard({ trip, idx }: { trip: any, idx: number }) {
  return (
    <Link href={trip.link} className={`group cursor-pointer p-1.5 bg-white shadow-[2px_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.05] hover:z-10 ${idx % 2 === 0 ? 'rotate-[-1deg] hover:rotate-0' : 'rotate-[1deg] hover:rotate-0'}`}>
      
      {/* Aspect Ratio 4:4 (Portrait) */}
      <div className="relative aspect-[3/4] mb-2 filter sepia-[0.15] group-hover:sepia-0 transition-all">
         <Image src={trip.creatorImage} alt={trip.creatorName} fill className="object-cover border border-gray-50" />
         
         {trip.isOriginal && (
           <div className="absolute top-1.0 left-1.5 bg-black/80 backdrop-blur-sm px-1 py-[2px] rounded-[2px] shadow-sm">
              <span className="text-[6px] font-mono uppercase tracking-widest text-white">OG</span>
           </div>
         )}
         
         <button className="absolute top-1.5 right-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110">
            <Heart size={15} className="fill-black/40 drop-shadow-sm"/>
         </button>
      </div>

      <div className="text-center px-0.5 pb-1">
         {/* Tighter Text for Smaller Card */}
         <h3 className="font-serif font-bold text-gray-900 text-xs leading-tight line-clamp-1">{trip.title}</h3>
         <p className="font-hand text-gray-400 text-[10px] mt-0.5 truncate">{trip.creatorName} • {trip.location}</p>
         
         {/* <div className="mt-1.5 flex justify-center items-center gap-1.5 font-mono text-[8px] text-gray-400 uppercase tracking-wider">
            <span className="bg-yellow-50 text-gray-600 px-1 rounded-sm border border-yellow-100">{trip.price}</span>
            <span>★ {trip.rating}</span>
         </div> */}
      </div>
    </Link>
  );
}