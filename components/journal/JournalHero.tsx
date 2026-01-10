import Image from 'next/image';
import { TripData } from '@/data/trip';

export default function JournalHero({ tripData, openGallery }: { tripData: TripData, openGallery: any }) {
  // Construct the 4-image grid logic
  const heroGridImages = [
    tripData.days[0]?.images[0] || tripData.days[1]?.images[0], 
    tripData.creator.avatar,                                    
    tripData.days[1]?.images[1] || tripData.days[0]?.images[1], 
    tripData.days[2]?.images[0] || tripData.days[0]?.images[0], 
  ];

  return (
    <header className="mb-10">
      {/* 4-Column Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 rounded-xl overflow-hidden aspect-[4/3] md:aspect-[21/9] mb-8 shadow-sm border border-gray-100">
         {heroGridImages.map((img, idx) => (
           <div key={idx} className="relative w-full h-full bg-gray-100 group">
             <Image src={img} alt="Hero" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
             {idx === 3 && (
               <button onClick={() => openGallery(tripData.days[0].images)} className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md text-[10px] md:text-xs font-bold shadow-sm border border-gray-200 uppercase tracking-wide hover:bg-white">
                 View Photos
               </button>
             )}
           </div>
         ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
           <h1 className="font-serif text-3xl md:text-5xl text-black font-bold leading-tight mb-3">{tripData.title}</h1>
           <p className="font-sans text-sm md:text-lg text-gray-500 leading-relaxed max-w-2xl">{tripData.subtitle}</p>
        </div>
        <div className="flex items-center gap-3 pb-2 border-b border-dashed border-gray-300 min-w-[200px]">
            <div className="relative w-10 h-10">
              <Image src={tripData.creator.avatar} fill className="rounded-full object-cover border border-gray-200 grayscale" alt="Host"/>
            </div>
            <div>
               <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">Hosted by {tripData.creator.name}</p>
               <p className="text-[10px] text-gray-400">Verified Traveler</p>
            </div>
         </div>
      </div>
    </header>
  );
}