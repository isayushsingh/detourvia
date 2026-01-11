import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { DaySchedule, ActivityType } from '@/types/schema';

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

export default function ItineraryList({ schedule, openGallery }: { schedule: DaySchedule[], openGallery: any }) {
  if (!schedule) return null;

  return (
    <section className="w-full">
      
      {/* Ledger Header */}
      <div className="flex items-center justify-between mb-5 pb-2 border-b border-black">
      </div>
      
      <div className="space-y-6">
        {schedule.map((dayItem, index) => (
          // PAGE CONTAINER: Reduced padding (p-4 md:p-5) to reduce white space
          <div key={index} className="relative bg-white p-4 md:p-4 shadow-[2px_3px_12px_rgba(0,0,0,0.04)] border border-gray-100 rounded-sm rotate-[0.3deg]">
             
             {/* --- HEADER --- */}
             <div className="flex items-center justify-between mb-4 md:mb-3">
                <div className="relative">
                   <div className="absolute inset-0 bg-yellow-200/80 -skew-x-6 -rotate-2 scale-105 rounded-sm"></div>
                   <div className="relative z-10 flex items-baseline gap-3 px-2">
                      <span className="font-serif text-xl md:text-2xl font-bold text-black">Day {dayItem.day}</span>
                   </div>
                </div>
                {/* --- PHOTO PAPER CLIP --- */}
                {dayItem.images.length > 0 && (
                <div 
                   onClick={() => openGallery(dayItem.images)} 
                   className="absolute -top-1 -right-4 bg-white p-1 pb-2 shadow-md border border-gray-200 rotate-3 cursor-pointer hover:rotate-6 hover:scale-105 transition-all z-10"
                >
                   <div className="flex -space-x-2 px-2">
                      {dayItem.images.slice(0,3).map((img, i) => (
                         <div key={i} className="relative w-7 h-7 md:w-9 md:h-9 rounded-full border-2 border-white overflow-hidden shadow-sm">
                            <Image src={img} fill className="object-cover" alt="thumb"/>
                         </div>
                      ))}
                   </div>
                </div>
             )}
             </div>

             {/* --- ROWS --- */}
             <div className="border-t-2 border-gray-100">
               {dayItem.schedule.map((event, idx) => (
                  <div 
                    key={idx} 
                    className="group relative flex items-start gap-3 md:gap-3 py-3 border-b border-dashed border-gray-200 hover:bg-yellow-50/30 transition-colors"
                  >
                     
                     {/* COL 1: TIME (Increased Font Size) */}
                     <div className="w-12 md:w-16 flex-shrink-0 pt-1 text-right">
                        <p className="font-mono text-xs md:text-sm font-bold text-gray-900 leading-none">
                           {event.timeRange.split('-')[0].trim()}
                        </p>
                        <p className="font-mono text-[10px] md:text-xs text-gray-500 mt-1">
                           {event.timeRange.split('-')[1]?.trim()}
                        </p>
                     </div>

                     {/* COL 2: DIVIDER */}
                     <div className="w-[1px] self-stretch bg-gray-100 mx-1"></div>

                     {/* COL 3: CONTENT */}
                     <div className="flex-grow min-w-0 pt-0.5">
                        
                        {/* Title & Location Row */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-4">
                           
                           {/* Activity Title & Icon */}
                           <div className="flex items-baseline gap-2">
                              <span className="text-sm opacity-80 filter grayscale group-hover:grayscale-0 transition-all" title={event.type}>
                                 {getIcon(event.type)}
                              </span>
                              <h4 className="font-serif text-md md:text-lg font-bold text-gray-900 leading-tight">
                                 {event.title}
                              </h4>
                           </div>
                           
                           {/* Location (Now a "Column" on the right side of content) */}
                           {event.location && (
                              <div className="flex items-center gap-1 md:w-50 md:justify-end flex-shrink-0">
                                 <MapPin size={12} className="text-gray-400" />
                                 <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-gray-500 truncate text-right">
                                    {event.location}
                                 </span>
                              </div>
                           )}

                           {/* Mobile Cost (Visible only small screens) */}
                           {event.cost && (
                              <span className="md:hidden self-start mt-1 font-mono text-[10px] font-bold text-gray-600 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-sm">
                                {event.cost}
                              </span>
                           )}
                        </div>

                        {/* Notes (Handwritten Journal Style) */}
                        {event.notes && event.notes.length > 0 && (
                           <div className="mt-2 pl-6 md:pl-7 relative">
                             {/* Vertical handwritten line decoration */}
                             <div className="absolute left-2 top-1 bottom-1 w-[2px] bg-gray-100/80 -rotate-1"></div>
                             <ul className="space-y-0.5">
                               {event.notes.map((note, nIdx) => (
                                  <li key={nIdx} className="font-serif opacity-85 text-xs md:text-sm text-gray-400 leading-snug">
                                     {note}
                                  </li>
                               ))}
                             </ul>
                           </div>
                        )}
                     </div>

                     {/* COL 4: COST (Increased Pill Size) */}
                     <div className="hidden md:flex w-24 flex-shrink-0 justify-end pt-0.5">
                        {event.cost ? (
                           <span className="font-mono text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-md group-hover:border-black group-hover:text-black transition-colors shadow-sm">
                             {event.cost}
                           </span>
                        ) : (
                           <span className="font-mono text-xs text-gray-200 px-3 py-1.5">-</span>
                        )}
                     </div>

                  </div>
               ))}
             </div>
          </div>
        ))}
      </div>
    </section>
  );
}