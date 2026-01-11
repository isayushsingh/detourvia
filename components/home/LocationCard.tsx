import Image from 'next/image';
import { LocationGroup } from '@/types/schema';
import Link from 'next/link';

export default function LocationCard({ locationData, idx }: { locationData: LocationGroup, idx: number }) {
  return (
    <Link href={`/search?q=${locationData.name}`} className={`group cursor-pointer p-1.5 bg-white shadow-[1px_1px_4px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-[1.05] ${idx % 3 === 0 ? 'rotate-[0.5deg] hover:rotate-0' : 'rotate-[-0.5deg] hover:rotate-0'}`}>

        {/* Aspect Ratio 1:1 (Square for Locations) */}
       <div className="relative aspect-square mb-2 filter contrast-[0.95] group-hover:contrast-100 transition-all">
          <Image src={locationData.coverImage} fill className="object-cover border border-gray-50" alt={locationData.name} />
          
          {/* Overlay Text */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center text-white">
             <h3 className="font-serif text-xl font-bold">{locationData.name}</h3>
             <span className="font-mono text-[10px] uppercase tracking-widest mt-1">
                {locationData.tripCount} Journals
             </span>
          </div>
       </div>

       {/* Creator Avatars Stack (The "Multiple Creators" feature) */}
       <div className="flex justify-center -space-x-2 mt-3">
          {locationData.creators.slice(0, 3).map((creator, i) => (
             <div key={i} className="relative w-6 h-6 rounded-full border border-[#FDFBF7] overflow-hidden" title={creator.name}>
                <Image src={creator.avatar} fill className="object-cover" alt={creator.name} />
             </div>
          ))}
          {locationData.creators.length > 3 && (
             <div className="w-6 h-6 rounded-full bg-gray-100 border border-[#FDFBF7] flex items-center justify-center text-[8px] font-mono text-gray-500">
                +{locationData.creators.length - 3}
             </div>
          )}
       </div>
    </Link>
  );
}