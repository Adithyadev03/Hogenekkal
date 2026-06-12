import React, { useState } from 'react';
import { Sparkles, CheckSquare, Square, ThumbsUp, Map, Eye, ChevronDown, ChevronUp, Layers, Compass, HelpCircle } from 'lucide-react';
import { TRAVEL_ROUTES, FAQS } from '../data';
import { PackingItem } from '../types';

interface ChecklistProps {
  items: PackingItem[];
  onToggleItem: (id: string) => void;
  onResetItems: () => void;
}

export default function TravelChecklist({ items, onToggleItem, onResetItems }: ChecklistProps) {
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  // Packing analysis
  const totalMandatory = items.filter(u => u.mandatory).length;
  const completedMandatory = items.filter(u => u.mandatory && u.completed).length;
  const isMandatoryDone = totalMandatory === completedMandatory;
  
  const totalCount = items.length;
  const completedCount = items.filter(i => i.completed).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100) || 0;

  const toggleFaq = (idx: number) => {
    if (expandedFaqIndex === idx) {
      setExpandedFaqIndex(null);
    } else {
      setExpandedFaqIndex(idx);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="checklist-transit-faq-grid">
      
      {/* LEFT: Packing checklist */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 tracking-tight">Kaveri Voyage Packer</h3>
              <p className="text-xs text-slate-500">Traditional river trip preparer</p>
            </div>
            <button
              onClick={onResetItems}
              className="text-[10px] font-mono text-slate-500 hover:text-slate-800 underline uppercase"
              title="Reset all packing checklist boxes"
            >
              Reset
            </button>
          </div>

          <p className="text-xs text-slate-600 mb-4 leading-relaxed font-sans">
            Do not bring single-use plastic bottles, liquor, or expensive loose jewelry. Ensure items below are checked. You WILL get wet!
          </p>

          <div className="space-y-2.5">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => onToggleItem(item.id)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  item.completed 
                    ? 'bg-slate-50/50 border-slate-200/50 opacity-75' 
                    : item.mandatory 
                      ? 'bg-rose-50/20 border-rose-200/40 text-slate-800' 
                      : 'bg-white border-slate-200/80 text-slate-700'
                }`}
              >
                <button type="button" className={`mt-0.5 ${item.completed ? 'text-teal-600' : 'text-slate-400'}`}>
                  {item.completed ? <CheckSquare size={16} /> : <Square size={16} />}
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-center gap-2">
                    <span className={`text-xs font-medium block leading-snug ${item.completed ? 'line-through text-slate-400 font-normal' : ''}`}>
                      {item.task}
                    </span>
                    {item.mandatory && (
                      <span className="text-[8px] font-bold font-mono tracking-wider bg-rose-100 text-rose-700 rounded-full py-0.5 px-2 flex-shrink-0">
                        CRITICAL
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono mt-1 block">Category: {item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bars */}
        <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-500">Ready for Launch:</span>
            <span className={`font-bold ${progressPercent === 100 ? 'text-teal-600' : 'text-slate-700'}`}>
              {progressPercent}% Complete
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-teal-500 transition-all duration-300" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {isMandatoryDone ? (
            <div className="bg-teal-50 border border-teal-100 text-teal-950 p-2.5 rounded-lg text-[10px] sm:text-xs flex items-center gap-1.5 leading-snug">
              <ThumbsUp size={14} className="text-teal-600 flex-shrink-0" />
              <span>Great! All mandatory survival and document baggage items are marked. Safe to embark.</span>
            </div>
          ) : (
            <div className="bg-rose-50 border border-rose-100 text-rose-950 p-2.5 rounded-lg text-[10px] sm:text-xs flex items-center gap-1.5 leading-snug">
              <span>Note: Please check all critical files and money bags before departing.</span>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Transit instructions and FAQs */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Transit Routes list */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <div className="p-1.5 bg-slate-100 text-slate-700 rounded-lg">
              <Compass size={18} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 tracking-tight">Geographic Driving Directions</h3>
              <p className="text-xs text-slate-500">How to reach Hogenakkal Falls and local transit details</p>
            </div>
          </div>

          <div className="space-y-4">
            {TRAVEL_ROUTES.map((route, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-slate-800 font-sans">{route.from} Route</span>
                  <span className="text-[10px] font-mono bg-white border border-slate-200 text-slate-600 rounded-full py-0.5 px-2">
                    🚗 {route.distance} (~{route.duration})
                  </span>
                </div>
                <p className="text-xs font-mono text-teal-800 leading-snug font-bold">
                  {route.route}
                </p>
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                  {route.mode}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Accordion FAQs */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <div className="p-1.5 bg-slate-100 text-slate-700 rounded-lg">
              <HelpCircle size={18} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 tracking-tight">Sightseeing & Travel FAQs</h3>
              <p className="text-xs text-slate-500">District administration policies and local advice</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {FAQS.map((faq, idx) => {
              const isOpen = expandedFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="border border-slate-200/65 rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full bg-slate-50/40 hover:bg-slate-50 px-4 py-3 text-left flex justify-between items-center text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="text-slate-400">
                      {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 py-3 bg-white text-xs text-slate-600 leading-relaxed font-sans border-t border-slate-100 animate-slideDown">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
