import { Calculator } from 'lucide-react';
import { Budget } from '@/types/schema'; // New Import

export default function TripCost({ budget, total }: { budget: Budget[], total: string }) {
  if (!budget) return null;

  return (
    <section className="max-w-2xl mx-auto mt-24 mb-16">
      <div className="flex items-center justify-center gap-3 mb-10 opacity-60">
        <Calculator size={18} />
        <h3 className="font-mono text-xl uppercase tracking-[0.2em]">Expense Log</h3>
      </div>

      <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 rotate-1 relative mx-4 md:mx-0">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-100/50 rotate-[-2deg] backdrop-blur-sm"></div>

        <h4 className="font-serif text-2xl text-center mb-8 font-bold text-gray-800">The Damage</h4>

        <div className="space-y-4 font-mono text-sm text-gray-600">
          {budget.map((entry, idx) => (
            <div key={idx} className="flex items-end justify-between group">
              <div className="relative flex-grow overflow-hidden">
                <span className="bg-white relative z-10 pr-2 group-hover:text-black transition-colors">
                  {entry.item}
                </span>
                <div className="absolute bottom-1 left-0 w-full border-b border-dotted border-gray-300 -z-0"></div>
              </div>
              <span className="bg-white pl-2 relative z-10 font-bold group-hover:text-black transition-colors">
                {entry.cost}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t-2 border-dashed border-gray-200 flex justify-between items-center rotate-[-1deg]">
          <span className="font-hand text-xl text-gray-400 transform rotate-2">Total Estimate</span>
          <div className="relative">
             <svg className="absolute -top-2 -left-4 w-[140%] h-[150%] text-red-100 -z-10 rotate-[-2deg]" viewBox="0 0 100 60" fill="currentColor">
               <path d="M10,30 Q50,5 90,30 T10,30" opacity="0.6" />
             </svg>
             <span className="font-hand text-2xl text-red-600 font-bold -rotate-2 inline-block">
               {total}
             </span>
          </div>
        </div>

      </div>
    </section>
  );
}