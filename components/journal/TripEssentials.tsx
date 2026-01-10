"use client"; // Needs client for clipboard interaction

import { useState } from 'react';
import { Check, Info, Copy, Share2 } from 'lucide-react';

interface EssentialData {
  packing: string[];
  logistics: { label: string; value: string }[];
}

export default function TripEssentials({ data }: { data: EssentialData }) {
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const handleCopy = () => {
    // 1. Format the list for WhatsApp/Notes
    const text = `PACKING LIST:\n${data.packing.map(item => `• ${item}`).join('\n')}`;
    
    // 2. Write to clipboard
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    });
  };

  return (
    <section className="max-w-4xl mx-auto mt-20 mb-16 px-6 md:px-0">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        
        {/* LEFT COL: THE PACKING CHECKLIST */}
        <div>
          <div className="flex items-center justify-between mb-6 border-b border-black pb-2">
             <h3 className="font-serif text-xl font-bold text-black">Don't Forget</h3>
             
             {/* THE NEW COPY BUTTON */}
             <button 
               onClick={handleCopy}
               className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all group"
               title="Copy list to clipboard"
             >
                {copied ? (
                  <>
                    <Check size={12} strokeWidth={3} className="text-green-600 group-hover:text-green-400" />
                    <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Copy</span>
                  </>
                )}
             </button>
          </div>
          
          <ul className="space-y-4">
            {data.packing.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 group cursor-default">
                {/* Custom Checkbox */}
                <div className="w-5 h-5 border-2 border-gray-300 rounded-sm flex items-center justify-center mt-0.5 group-hover:border-black transition-colors">
                   <Check size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-black" strokeWidth={3} />
                </div>
                <span className="font-hand text-xl text-gray-600 group-hover:text-black transition-colors decoration-gray-300 group-hover:line-through">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>


        {/* RIGHT COL: LOGISTICS (Field Notes Style) */}
        <div>
          <div className="flex items-center gap-3 mb-6 border-b border-black pb-2">
             <h3 className="font-serif text-xl font-bold text-black">Field Notes</h3>
          </div>

          <div className="space-y-6">
            {data.logistics.map((note, idx) => (
               <div key={idx} className="relative pl-4">
                  {/* Vertical Accent Line */}
                  <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-gray-200"></div>
                  
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                    {note.label}
                  </p>
                  <p className="font-serif text-base text-gray-900 leading-tight">
                    {note.value}
                  </p>
               </div>
            ))}
          </div>
          
          {/* Pro Tip Box */}
          <div className="mt-8 bg-yellow-50/50 border border-yellow-100 p-4 rounded-lg flex gap-3">
             <Info size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
             <p className="font-hand text-sm text-gray-600 leading-tight">
               "Ferries get cancelled if winds are high. Always keep a buffer day before your flight back."
             </p>
          </div>

        </div>

      </div>
    </section>
  );
}