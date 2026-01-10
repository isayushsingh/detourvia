import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { TripData, ActivityType } from '@/data/trip';

// Icon Helper
const getIcon = (type: ActivityType) => {
  switch (type) {
    case 'travel': return '✈️';
    case 'activity': return '🥾';
    case 'food': return '🍽️';
    case 'lodging': return '🛏️';
    case 'chill': return '🌅';
    default: return '•';
  }
};

export default function ItineraryList({ tripData, openGallery }: { tripData: TripData, openGallery: any }) {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-8 pb-2 border-b border-black">
        <h2 className="font-serif text-2xl font-bold text-black">Trip Ledger</h2>
        <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
           {tripData.days.length} Days Recorded
        </span>
      </div>
      
      <div className="space-y-12">
        {tripData.days.map((dayItem, index) => (
          <div key={index}>
             
             {/* --- EXCEL HEADER (Day) --- */}
             <div className="flex items-end gap-4 mb-2 pt-2">
                <span className="font-serif text-3xl font-bold leading-none text-black">{dayItem.day}</span>
                <div className="flex flex-col pb-1">
                   <span className="font-bold text-sm text-gray-900 leading-none">{dayItem.summaryTitle}</span>
                   <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">{dayItem.date}</span>
                </div>
             </div>

             {/* --- THE ROWS (Table Structure) --- */}
             <div className="border-t border-gray-200">
               {dayItem.schedule.map((event, idx) => (
                  <div 
                    key={idx} 
                    className="group relative flex items-start gap-3 md:gap-6 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                     
                     {/* COL 1: TIME (Data) */}
                     <div className="w-16 md:w-24 flex-shrink-0 pt-1">
                        <p className="font-mono text-xs text-gray-500 group-hover:text-black transition-colors">
                          {event.timeRange.split('-')[0].trim()}
                        </p>
                        <p className="font-mono text-[10px] text-gray-300">
                          {event.timeRange.split('-')[1]?.trim()}
                        </p>
                     </div>

                     {/* COL 2: TYPE (Visual Marker) */}
                     <div className="w-6 pt-0.5 text-center flex-shrink-0 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
                        <span className="text-sm cursor-default" title={event.type}>
                           {getIcon(event.type)}
                        </span>
                     </div>

                     {/* COL 3: ACTIVITY (Main Content) */}
                     <div className="flex-grow pt-0.5 min-w-0">
                        <div className="flex items-baseline gap-2">
                           <h4 className="text-sm font-medium text-gray-900 truncate">
                             {event.title}
                           </h4>
                           {event.location && (
                             <span className="hidden md:inline-flex items-center gap-0.5 text-[10px] text-gray-400">
                               <MapPin size={8} /> {event.location}
                             </span>
                           )}
                        </div>
                        
                        {/* Minimal Notes Row - Only shows if exists */}
                        {event.notes && event.notes.length > 0 && (
                           <div className="mt-1">
                             <p className="font-hand text-xs text-gray-500 truncate opacity-80 group-hover:opacity-100">
                               {event.notes.join(" • ")}
                             </p>
                           </div>
                        )}
                     </div>
                     
                     {/* COL 4: COST (Data) */}
                     {/* <div className="w-16 md:w-20 flex-shrink-0 text-right pt-1">
                        {event.cost ? (
                           <span className="font-mono text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded group-hover:bg-yellow-100 group-hover:text-yellow-800 transition-colors">
                             {event.cost}
                           </span>
                        ) : (
                           <span className="font-mono text-[10px] text-gray-100">-</span>
                        )}
                     </div> */}

                  </div>
               ))}
             </div>
             
             {/* --- PHOTO CELL (Bottom of the "Sheet") --- */}
             {dayItem.images.length > 0 && (
                <div onClick={() => openGallery(dayItem.images)} className="flex justify-end mt-3 mb-6 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                   <div className="flex items-center gap-2 bg-gray-50 pr-3 pl-1 py-1 rounded-full border border-gray-100 hover:border-gray-300">
                      <div className="flex -space-x-2">
                         {dayItem.images.slice(0,3).map((img, i) => (
                            <div key={i} className="relative w-5 h-5 rounded-full border border-white overflow-hidden">
                               <Image src={img} fill className="object-cover" alt="thumb"/>
                            </div>
                         ))}
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wide text-gray-500">Photos</span>
                   </div>
                </div>
             )}

          </div>
        ))}
      </div>
    </section>
  );
}