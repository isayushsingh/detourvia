import { Phone } from 'lucide-react';
import { Contact } from '@/types/schema'; // New Import

export default function ContactBook({ contacts }: { contacts: Contact[] }) {
  if (!contacts || contacts.length === 0) return null;

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pl-2">
         <div className="h-8 w-8 bg-black text-white rounded-full flex items-center justify-center shadow-md rotate-[-6deg]">
            <Phone size={14} />
         </div>
         <div>
            <h2 className="font-serif text-lg font-bold text-black leading-none">Little Black Book</h2>
            <p className="font-hand text-gray-400 text-xs mt-1">Essential numbers</p>
         </div>
      </div>
      
      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
         {contacts.map((contact, idx) => (
           <div 
             key={idx} 
             className={`group relative bg-white p-4 pt-6 shadow-[2px_3px_8px_rgba(0,0,0,0.06)] transition-all duration-300 hover:scale-[1.02] hover:z-10 hover:shadow-lg ${idx % 2 === 0 ? 'rotate-[-1deg]' : 'rotate-[2deg]'}`}
           >
              {/* Tape */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-yellow-200/60 backdrop-blur-sm shadow-sm rotate-[-1deg] z-10"></div>
              
              <div className="relative">
                 <div className="flex justify-between items-start mb-1.5">
                    <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-1 py-[2px] rounded-sm truncate max-w-[80%]">
                       {contact.role}
                    </span>
                    <a href={`tel:${contact.phone}`} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-black text-white rounded-full shadow-md hover:scale-110">
                       <Phone size={10} />
                    </a>
                 </div>

                 <h3 className="font-serif text-lg font-bold text-gray-900 mb-0.5 leading-tight truncate">
                    {contact.name}
                 </h3>

                 <p className="font-mono text-[10px] text-gray-500 mb-3 tracking-wide">
                    {contact.phone}
                 </p>

                 {contact.note && (
                   <div className="pt-2 border-t border-dashed border-gray-100 relative">
                      <p className="font-hand text-sm text-gray-600 leading-4 line-clamp-3">
                         "{contact.note}"
                      </p>
                   </div>
                 )}
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}