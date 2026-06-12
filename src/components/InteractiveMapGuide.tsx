import React, { useState } from 'react';
import { MapPin, Compass, AlertCircle, Sparkles, Navigation, Users, Eye, HelpCircle } from 'lucide-react';
import { HOGENAKKAL_SPOTS } from '../data';
import { Spot, RideOption } from '../types';

interface MapGuideProps {
  currentWaterCusecs: number;
}

export default function InteractiveMapGuide({ currentWaterCusecs }: MapGuideProps) {
  const [selectedSpotId, setSelectedSpotId] = useState<string>(HOGENAKKAL_SPOTS[0].id);
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);

  const selectedSpot = HOGENAKKAL_SPOTS.find(s => s.id === selectedSpotId) || HOGENAKKAL_SPOTS[0];

  // Regulate activity rules based on simulated hydrological rate
  const getDynamicSpotStatus = (spot: Spot): { status: Spot['activityStatus']; alertText?: string } => {
    if (currentWaterCusecs > 12000) {
      if (spot.id === 'main-falls' || spot.id === 'carbonite-gorge' || spot.id === 'sandy-beach-stalls') {
        return { status: 'Closed', alertText: 'Dangerous rapids. Boating/approach banned!' };
      }
      return { status: 'Restricted', alertText: 'Extreme flow. Restricted deck access only.' };
    } else if (currentWaterCusecs >= 8000) {
      if (spot.id === 'sandy-beach-stalls') {
        return { status: 'Restricted', alertText: 'Bathing banned. Fast-rising shallow flats.' };
      }
      if (spot.id === 'carbonite-gorge') {
        return { status: 'Restricted', alertText: 'Strict lifejacket check. No private diving.' };
      }
    }
    return { status: spot.activityStatus };
  };

  // Route path vector formulas purely visual based on coordinates to draw beautiful overlay lines
  const routePaths: Record<string, string> = {
    'canyon-classic': 'M 48,35 Q 56,26 52,18 T 62,44 T 25,78',
    'wilderness-expedition': 'M 48,35 Q 58,40 62,44 T 35,58 T 74,55 T 25,78',
    'quick-spray-loop': 'M 48,35 T 52,18 T 48,35'
  };

  const routeColors: Record<string, string> = {
    'canyon-classic': 'stroke-teal-500',
    'wilderness-expedition': 'stroke-amber-500',
    'quick-spray-loop': 'stroke-sky-400'
  };

  return (
    <div id="interactive-map-guide-card" className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-5 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 px-2 bg-slate-100 text-slate-700 rounded-full text-[10px] font-mono tracking-wider">ENVIRONMENT CHART</span>
          </div>
          <h2 className="text-2xl font-bold font-sans text-slate-900 tracking-tight mt-1">Canyon Hydro-Map Guide</h2>
        </div>
        <div className="flex items-center gap-1 bg-teal-50 border border-teal-100/50 py-1 px-2.5 rounded-lg">
          <Compass size={14} className="text-teal-600 animate-spin" />
          <span className="text-[11px] font-sans font-medium text-teal-800">Canyon Compass Locked</span>
        </div>
      </div>

      <p className="text-xs text-slate-600 mb-5 leading-relaxed">
        Click on any canyon coordinate pin to read safety levels, activities, and real-world regulatory restrictions based on simulated flow rate. Select a route package at the bottom to draw the specific coracle journey across the gorges.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: SVG Visual Schematic Map */}
        <div className="lg:col-span-7 bg-slate-950 rounded-xl relative p-3 overflow-hidden min-h-[360px] flex flex-col justify-between border border-slate-900 shadow-inner">
          
          {/* Riverbed illustration layout */}
          <div className="absolute inset-0 z-0 opacity-25">
            {/* Soft geometric topography lines or water curves */}
            <div className="absolute w-72 h-72 rounded-full border border-teal-500/20 -top-10 -left-10 animate-pulse"></div>
            <div className="absolute w-[500px] h-32 bg-slate-800/40 rounded-full rotate-45 top-1/4 left-1/10"></div>
            <div className="absolute w-96 h-96 rounded-full border border-teal-500/10 top-1/2 left-1/4"></div>
          </div>

          {/* Majestic river gorge representations */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* The main Kaveri River track */}
            <path 
              d="M 50,0 Q 55,20 45,35 T 60,50 T 40,70 T 50,100" 
              fill="none" 
              className="stroke-teal-950/70" 
              strokeWidth="20" 
            />
            <path 
              d="M 50,0 Q 55,20 45,35 T 60,50 T 40,70 T 50,100" 
              fill="none" 
              className="stroke-teal-800/40" 
              strokeWidth="14" 
            />
            <path 
              d="M 50,0 Q 55,20 45,35 T 60,50 T 40,70 T 50,100" 
              fill="none" 
              className="stroke-cyan-500/30" 
              strokeWidth="4" 
              strokeDasharray="2 2"
            />

            {/* If route package is highlighted, we draw the path */}
            {activeRouteId && routePaths[activeRouteId] && (
              <path
                d={routePaths[activeRouteId]}
                fill="none"
                className={`stroke-2 ${routeColors[activeRouteId]} transition-all duration-1000`}
                strokeWidth="2.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* Legend indicators */}
          <div className="relative z-20 flex justify-between items-start text-[10px] font-mono text-slate-400">
            <div>
              <span className="block text-slate-500 uppercase tracking-widest text-[9px]">Upstream</span>
              <span className="text-teal-400">▲ KA KABINI INFLOW</span>
            </div>
            <div className="text-right">
              <span className="block text-slate-500 uppercase tracking-widest text-[9px]">Downstream</span>
              <span className="text-sky-400">▼ METTUR BASIN</span>
            </div>
          </div>

          {/* Pins mapped over coordinate grid */}
          <div className="relative z-20 flex-1 min-h-[260px] w-full">
            {HOGENAKKAL_SPOTS.map((spot) => {
              const info = getDynamicSpotStatus(spot);
              const isSelected = selectedSpotId === spot.id;
              
              let markerColor = 'bg-teal-500';
              if (info.status === 'Closed') markerColor = 'bg-red-500';
              else if (info.status === 'Restricted') markerColor = 'bg-amber-500';

              return (
                <button
                  key={spot.id}
                  onClick={() => setSelectedSpotId(spot.id)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none transition-all group"
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Ring highlight animated */}
                    <span className={`absolute inline-flex h-6 w-6 rounded-full opacity-60 animate-ping ${
                      isSelected ? 'bg-teal-400' : 'bg-slate-700/55'
                    }`} />
                    
                    {/* Standard pinpoint */}
                    <div className={`relative h-7 w-7 rounded-full border-2 ${
                      isSelected ? 'border-white bg-teal-500 shadow-lg text-white' : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                    } flex items-center justify-center transition-all`}>
                      <MapPin size={14} className={isSelected ? 'animate-bounce' : ''} />
                    </div>

                    {/* Popover tooltip labels */}
                    <div className="absolute bottom-9 left-1/2 transform -translate-x-1/2 bg-slate-900 border border-slate-800 text-slate-300 py-1 px-2.5 rounded shadow text-[9px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all scale-95 group-hover:scale-100">
                      {spot.name} {info.status !== 'Open' && `(${info.status})`}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Route highlight overlay links */}
          <div className="relative z-20 bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Draw Boating Path:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveRouteId(activeRouteId === 'canyon-classic' ? null : 'canyon-classic')}
                className={`py-1 px-2.5 rounded text-[10px] font-sans font-medium transition-colors ${
                  activeRouteId === 'canyon-classic' 
                    ? 'bg-teal-900/60 text-teal-300 border border-teal-500/50' 
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                Classic Path
              </button>
              <button
                onClick={() => setActiveRouteId(activeRouteId === 'wilderness-expedition' ? null : 'wilderness-expedition')}
                className={`py-1 px-2.5 rounded text-[10px] font-sans font-medium transition-colors ${
                  activeRouteId === 'wilderness-expedition' 
                    ? 'bg-amber-900/60 text-amber-300 border border-amber-500/50' 
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                Gorge Safari Path
              </button>
              <button
                onClick={() => setActiveRouteId(activeRouteId === 'quick-spray-loop' ? null : 'quick-spray-loop')}
                className={`py-1 px-2.5 rounded text-[10px] font-sans font-medium transition-colors ${
                  activeRouteId === 'quick-spray-loop' 
                    ? 'bg-sky-900/60 text-sky-300 border border-sky-500/50' 
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                Express Loop
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT: Detailed focused point metadata card */}
        <div className="lg:col-span-5 bg-slate-50/50 rounded-xl border border-slate-200 p-5 space-y-4">
          
          {/* Header metadata */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-teal-600 block bg-teal-50 py-0.5 px-2 rounded w-fit uppercase">
              🧭 Lat 12.12° N | Lon 77.78° E
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">{selectedSpot.name}</h3>
            <p className="text-xs text-slate-500 italic">"{selectedSpot.tagline}"</p>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-sans mt-2">
            {selectedSpot.description}
          </p>

          <div className="space-y-2 border-t border-slate-200 pt-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Crowd Density:</span>
              <span className="font-semibold text-slate-800">{selectedSpot.crowdLevel}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Government Hazard Advisory:</span>
              <span className={`font-semibold py-0.5 px-2 rounded-full text-[10px] ${
                selectedSpot.safetyLevel === 'Safe' 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : selectedSpot.safetyLevel === 'Caution' 
                    ? 'bg-amber-50 text-amber-700' 
                    : 'bg-red-50 text-red-700'
              }`}>
                {selectedSpot.safetyLevel}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Simulated Access Policy:</span>
              {(() => {
                const info = getDynamicSpotStatus(selectedSpot);
                return (
                  <span className={`font-semibold py-0.5 px-2 rounded text-[10px] ${
                    info.status === 'Open' 
                      ? 'bg-teal-100 text-teal-800' 
                      : info.status === 'Restricted' 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {info.status}
                  </span>
                );
              })()}
            </div>
          </div>

          {/* Real-time hazard alarm overlay if closed */}
          {(() => {
            const info = getDynamicSpotStatus(selectedSpot);
            if (info.status !== 'Open' && info.alertText) {
              return (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2 text-xs text-red-950">
                  <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold underline">Flow Limit Ban:</span>
                    <p className="mt-0.5">{info.alertText}</p>
                  </div>
                </div>
              );
            }
            return null;
          })()}

          <div className="bg-white rounded-lg p-3 border border-slate-200 text-xs">
            <span className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Sparkles size={13} className="text-amber-500" />
              Local Expert Recommendation:
            </span>
            <p className="text-slate-600 leading-relaxed font-sans">{selectedSpot.mustTry}</p>
          </div>

          {/* Quick instructions */}
          <div className="text-[10px] text-slate-400 font-mono text-center flex items-center justify-center gap-1.5">
            <Users size={12} />
            Keep life jackets fastened near shores.
          </div>

        </div>

      </div>

    </div>
  );
}
