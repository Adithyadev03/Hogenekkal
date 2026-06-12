import React, { useState, useEffect } from 'react';
import { 
  Waves, 
  Ticket, 
  Map, 
  Users, 
  CheckSquare, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  BookOpen, 
  Droplets,
  Anchor,
  Sparkles,
  PhoneCall
} from 'lucide-react';

import { WaterLevelMetrics, Booking, Review, PackingItem } from './types';
import { 
  INITIAL_WEATHER_INFO, 
  INITIAL_PACKING_ITEMS, 
  MOCK_REVIEWS 
} from './data';

// Component imports
import WaterSafetyDashboard from './components/WaterSafetyDashboard';
import CoracleBookingPanel from './components/CoracleBookingPanel';
import InteractiveMapGuide from './components/InteractiveMapGuide';
import LocalGuidesDirectory from './components/LocalGuidesDirectory';
import TravelChecklist from './components/TravelChecklist';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'book' | 'explore' | 'crew' | 'prepare'>('book');

  // Hydrology Metrics State
  const [metrics, setMetrics] = useState<WaterLevelMetrics>(() => {
    const saved = localStorage.getItem('hogenakkal_metrics');
    return saved ? JSON.parse(saved) : INITIAL_WEATHER_INFO;
  });

  // Booking ledger state
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('hogenakkal_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  // Client reviews feed state
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('hogenakkal_reviews');
    return saved ? JSON.parse(saved) : MOCK_REVIEWS;
  });

  // Packing checklist state
  const [packingItems, setPackingItems] = useState<PackingItem[]>(() => {
    const saved = localStorage.getItem('hogenakkal_packing');
    return saved ? JSON.parse(saved) : INITIAL_PACKING_ITEMS;
  });

  // Sync state to local storage on modify
  useEffect(() => {
    localStorage.setItem('hogenakkal_metrics', JSON.stringify(metrics));
  }, [metrics]);

  useEffect(() => {
    localStorage.setItem('hogenakkal_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('hogenakkal_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('hogenakkal_packing', JSON.stringify(packingItems));
  }, [packingItems]);

  // Handlers
  const handleBookingCreated = (newBooking: Booking) => {
    setBookings([newBooking, ...bookings]);
  };

  const handleDeleteBooking = (id: string) => {
    setBookings(bookings.filter(b => b.id !== id));
  };

  const handleAddReview = (newReview: Review) => {
    setReviews([newReview, ...reviews]);
  };

  const handleTogglePackingItem = (id: string) => {
    setPackingItems(packingItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleResetPacking = () => {
    setPackingItems(INITIAL_PACKING_ITEMS.map(item => ({ ...item, completed: false })));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-150 selection:text-teal-900 leading-relaxed flex flex-col">
      
      {/* Dynamic Security Ribbon */}
      <div className={`py-1.5 px-4 text-center text-xs font-mono font-bold flex items-center justify-center gap-2 border-b transition-all ${
        metrics.boatingPermitted 
          ? 'bg-teal-950 text-teal-300 border-teal-900/40' 
          : 'bg-rose-950 text-rose-300 border-rose-900/40'
      }`}>
        <span className="inline-block h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
        <span>
          {metrics.boatingPermitted 
            ? '✓ HOGENAKKAL PORT AUTHORITY: RIVER EXPEDITIONS FULLY ACTIVE' 
            : '⚠️ HIGH DISCHARGE ALERT: ALL CORACLE BOATING SUSPENDED'}
        </span>
        <span className="hidden sm:inline-block ml-4 text-[10px] text-slate-400">
          Flow: {metrics.dischargeCusecs.toLocaleString()} cusecs
        </span>
      </div>

      {/* Main Top Header Section */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo area */}
            <div className="flex items-center gap-2.5">
              <div className="bg-gradient-to-tr from-teal-800 to-teal-600 text-white p-2.5 rounded-xl shadow-md shadow-teal-950/20">
                <Anchor size={18} className="animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div>
                <span className="text-base font-extrabold text-slate-900 tracking-tight block">Hogenakkal Falls</span>
                <span className="text-[10px] text-slate-500 font-mono tracking-widest block uppercase leading-none font-bold">Coracle Administration</span>
              </div>
            </div>

            {/* Quick stats segment */}
            <div className="hidden md:flex items-center gap-6 text-xs text-slate-600 border-l border-slate-200 pl-6 font-mono">
              <div>
                <span className="block text-[9px] text-slate-400 uppercase">Canyon Flow Rate</span>
                <span className="font-bold text-slate-800">{metrics.dischargeCusecs.toLocaleString()} Cusecs</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 uppercase">Safety Policy</span>
                <span className={`font-bold ${metrics.boatingPermitted ? 'text-teal-700' : 'text-rose-600'}`}>
                  {metrics.status}
                </span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 uppercase">Licensed Crew</span>
                <span className="font-bold text-slate-800">120+ On Roster</span>
              </div>
            </div>

            {/* Contact Support Hotlines */}
            <div className="flex items-center gap-2">
              <div className="hidden lg:block text-right">
                <span className="block text-[9px] text-slate-400 uppercase font-mono">District Emergency Helplines</span>
                <span className="text-xs font-bold text-slate-700 block">+91 4342 230 X5</span>
              </div>
              <a 
                href="tel:108"
                className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 px-3 rounded-lg text-xs font-semibold border border-slate-200/60"
              >
                <PhoneCall size={12} className="text-slate-500" />
                <span>Line 108</span>
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="bg-slate-950 text-white py-12 relative overflow-hidden flex-shrink-0">
        
        {/* Abstract design elements representation */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" 
            alt="Scenic kaveri rapids background" 
            className="w-full h-full object-cover opacity-15 saturate-100 filter blur-[1px]"
            referrerPolicy="no-referrer"
          />
          {/* Deep slate to teal gradient overcover */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/95 to-slate-950"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-teal-900/80 border border-teal-500/30 text-teal-300 py-1 px-3 rounded-full text-xs font-semibold">
              <Sparkles size={12} className="animate-pulse text-amber-400" />
              The Niagara of Southern India • Kaveri Gorge
            </span>
            <h1 className="text-3xl sm:text-4.5xl font-black tracking-tight leading-tight text-white font-sans max-w-2xl">
              Traditional Coracle Adventures & Safety Information Desk
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
              Welcome to the official, district-guided booking portal for the Hogenakkal carbonatite gorges. Plan your trip with live hydrology water flow indicators, packing checklist tools, official ticket rates, and verified native boat pilots.
            </p>

            {/* Micro warning notice */}
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl max-w-xl text-xs text-slate-300 flex items-center justify-between gap-3 font-mono">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-teal-400" />
                <span>Operating hours: 07:30 AM – 05:45 PM • Daily Safety Drills</span>
              </div>
              <span className="text-slate-500 text-[10px]">Ver. 2026.06</span>
            </div>
          </div>
        </div>

      </section>

      {/* Navigation Sub-Tabs Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 sm:gap-4 py-2 text-sm no-scrollbar scroll-smooth">
            
            <button
              onClick={() => setActiveTab('book')}
              className={`px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer text-xs sm:text-sm ${
                activeTab === 'book' 
                  ? 'bg-teal-900 text-white shadow-sm font-semibold' 
                  : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              <Ticket size={16} />
              Reservations & Passes
            </button>

            <button
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer text-xs sm:text-sm ${
                activeTab === 'explore' 
                  ? 'bg-teal-900 text-white shadow-sm font-semibold' 
                  : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              <Map size={16} />
              Canyon Virtual Guide
            </button>

            <button
              onClick={() => setActiveTab('crew')}
              className={`px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer text-xs sm:text-sm ${
                activeTab === 'crew' 
                  ? 'bg-teal-900 text-white shadow-sm font-semibold' 
                  : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              <Users size={16} />
              Rower Directory & Reviews
            </button>

            <button
              onClick={() => setActiveTab('prepare')}
              className={`px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer text-xs sm:text-sm ${
                activeTab === 'prepare' 
                  ? 'bg-teal-900 text-white shadow-sm font-semibold' 
                  : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              <CheckSquare size={16} />
              Travel Packlist & FAQs
            </button>

          </div>
        </div>
      </div>

      {/* Main Dynamic Panel Viewports */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'book' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Live active dashboard combining live conditions feed & reservation cards */}
            <WaterSafetyDashboard metrics={metrics} onMetricsChange={setMetrics} />
            <CoracleBookingPanel 
              isBoatingPermitted={metrics.boatingPermitted} 
              onBookingCreated={handleBookingCreated}
              savedBookings={bookings}
              onDeleteBooking={handleDeleteBooking}
            />
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="animate-fadeIn">
            <InteractiveMapGuide currentWaterCusecs={metrics.dischargeCusecs} />
          </div>
        )}

        {activeTab === 'crew' && (
          <div className="animate-fadeIn">
            <LocalGuidesDirectory reviewsList={reviews} onAddReview={handleAddReview} />
          </div>
        )}

        {activeTab === 'prepare' && (
          <div className="animate-fadeIn">
            <TravelChecklist 
              items={packingItems} 
              onToggleItem={handleTogglePackingItem} 
              onResetItems={handleResetPacking}
            />
          </div>
        )}
      </main>

      {/* Official Footers banner */}
      <footer className="bg-slate-900 text-slate-400 py-10 mt-16 border-t border-slate-800 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-slate-800 pb-8">
            <div className="space-y-2">
              <span className="font-bold text-white text-sm block">Government Compliance Desk</span>
              <p className="leading-relaxed">
                Hogenakkal Boat rides are strictly managed by the Pennagaram Forest Office and local Panchayats. Prices are government-enforced to prevent tourist exploitation. All oarsmen undergo periodic breathalyzer checks and swimming drills.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-bold text-white text-sm block">Water Release Warnings</span>
              <p className="leading-relaxed">
                We pull telemetry daily from the Cauvery Neeravari Nigama Limited reservoirs and the Mettur downstream monitors. Ensure total compliance with the Red-Ban advisories posted on this portal.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-bold text-white text-sm block">Environmental Pledge</span>
              <p className="leading-relaxed">
                Hogenakkal is a designated plastic-free preserve. Any passenger carrying disposable water bags or plastic liquor covers into the coracle is subject to immediate fines of ₹1,000 by forest department guards.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-slate-500">
            <span>© 2026 District Administration, Dharmapuri. Prepared in technical alignment with the Kaveri Waterway Authority.</span>
            <span>Made with strict emphasis on local crew livelihoods. Offline state saved to browser storage.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
