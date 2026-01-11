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
      <div className="flex items-center justify-between mb-8 pb-2 border-b border-black">
        <h2 className="font-serif text-2xl font-bold text-black">Trip Ledger</h2>
        <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
           {schedule.length} Days Recorded
        </span>
      </div>
      
      <div className="space-y-12">
        {schedule.map((dayItem, index) => (
          <div key={index}>

             {/* --- EXCEL HEADER (Day) --- */}
             <div className="flex items-end gap-4 mb-2 pt-2">
                <span className="font-serif text-3xl font-bold leading-none text-black">Day {dayItem.day}</span>
                <div className="flex flex-col pb-1">
                   {/* <span className="font-bold text-base text-gray-900 leading-none">{dayItem.summaryTitle}</span> */}
                </div>
             </div>

             {/* --- THE ROWS (Table Structure) --- */}
             <div className="border-t border-gray-200">
               {dayItem.schedule.map((event, idx) => (
                  <div key={idx} className="group relative flex items-start gap-3 md:gap-6 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                     {/* COL 1: TIME (Data) */}
                     <div className="w-16 md:w-24 flex-shrink-0 pt-1">
                        <p className="font-mono text-sm font-medium text-gray-700 group-hover:text-black transition-colors">{event.timeRange.split('-')[0].trim()}</p>
                        <p className="font-mono text-xs text-gray-400">{event.timeRange.split('-')[1]?.trim()}</p>
                     </div>
                     {/* COL 2: TYPE (Visual Marker) */}
                     <div className="w-6 pt-0.5 text-center flex-shrink-0 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
                        <span className="text-base cursor-default" title={event.type}>{getIcon(event.type)}</span>
                     </div>
                     {/* COL 3: ACTIVITY (Main Content) */}
                     <div className="flex-grow pt-0.5 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-2">
                           <h4 className="text-sm md:text-lg font-bold text-gray-900 leading-tight">{event.title}</h4>
                           
                        </div>
                        {/* Minimal Notes Row - Only shows if exists */}
                        {event.notes && event.notes.length > 0 && (
                           <div className="mt-1">
                             {event.notes.map((note, nIdx) => (
                                <div key={nIdx} className="flex items-start gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                                   <span className="text-[6px] text-gray-300 mt-[7px] flex-shrink-0">●</span>
                                   <p className="font-serif text-xs md:text-sm text-gray-500 leading-tight">{note}</p>
                                </div>
                             ))}
                           </div>
                        )}
                     </div>
                     {/* COL 4: COST (Data) */}
                     <div className="w-16 md:w-20 flex-shrink-0 text-right pt-1">
                        {event.cost ? <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded group-hover:bg-yellow-100 group-hover:text-yellow-800 transition-colors whitespace-nowrap">{event.cost}</span> : <span className="font-mono text-xs text-gray-100">-</span>}
                     </div>
                  </div>
               ))}
             </div>
             
             {/* --- PHOTO CELL (Bottom of the "Sheet") --- */}
             {/* {dayItem.images.length > 0 && (
                <div onClick={() => openGallery(dayItem.images)} className="flex justify-end mt-3 mb-6 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                   <div className="flex items-center gap-2 bg-gray-50 pr-3 pl-1 py-1 rounded-full border border-gray-100 hover:border-gray-300">
                      <div className="flex -space-x-2">
                         {dayItem.images.slice(0,3).map((img, i) => (
                            <div key={i} className="relative w-6 h-6 rounded-full border border-white overflow-hidden shadow-sm"><Image src={img} fill className="object-cover" alt="thumb"/></div>
                         ))}
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wide text-gray-500 font-bold">Photos</span>
                   </div>
                </div>
             )} */}
          </div>
        ))}
      </div>
    </section>
  );
}