import React, { useState, useEffect } from 'react';
import { Ticket, Calendar, Phone, User, Clock, Check, Layers, ChevronRight, Sparkles, Receipt, Trash2 } from 'lucide-react';
import { CORACLE_RIDES, VERIFIED_BOATMEN } from '../data';
import { RideOption, Booking, Boatman } from '../types';

interface BookingPanelProps {
  isBoatingPermitted: boolean;
  onBookingCreated: (booking: Booking) => void;
  savedBookings: Booking[];
  onDeleteBooking: (id: string) => void;
}

export default function CoracleBookingPanel({ 
  isBoatingPermitted, 
  onBookingCreated, 
  savedBookings, 
  onDeleteBooking 
}: BookingPanelProps) {
  // Input states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedRideId, setSelectedRideId] = useState(CORACLE_RIDES[0].id);
  const [numGuests, setNumGuests] = useState(2);
  const [numCoracles, setNumCoracles] = useState(1);
  const [bookingDate, setBookingDate] = useState(() => {
    // Current date default
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('09:00 AM - 10:30 AM');
  
  // Custom add-ons
  const [addOnMassage, setAddOnMassage] = useState(false);
  const [addOnFishFry, setAddOnFishFry] = useState(false);
  const [addOnLocalGuide, setAddOnLocalGuide] = useState(false);
  const [assignedBoatmanId, setAssignedBoatmanId] = useState(VERIFIED_BOATMEN[0].id);

  // Active pass view state
  const [activePassId, setActivePassId] = useState<string | null>(null);

  // Auto-regulate number of coracles based on guests (Max 4 per coracle enforced by Government rules)
  useEffect(() => {
    const required = Math.ceil(numGuests / 4);
    if (numCoracles < required) {
      setNumCoracles(required);
    }
  }, [numGuests]);

  const selectedRide = CORACLE_RIDES.find(r => r.id === selectedRideId) || CORACLE_RIDES[0];
  
  // Custom addon unit pricing
  const MASSAGE_PRICE_FACTOR = 300; // per guest
  const FISHFRY_PRICE_FACTOR = 250; // per guest
  const GUIDE_PRICE_FACTOR = 500;   // flat fee

  // Price calculations
  const rideCost = selectedRide.pricePerCoracle * numCoracles;
  const massageCost = addOnMassage ? (MASSAGE_PRICE_FACTOR * numGuests) : 0;
  const fishCost = addOnFishFry ? (FISHFRY_PRICE_FACTOR * numGuests) : 0;
  const guideCost = addOnLocalGuide ? GUIDE_PRICE_FACTOR : 0;
  const totalCost = rideCost + massageCost + fishCost + guideCost;

  // Active slots available
  const AVAILABLE_SLOTS = [
    '07:30 AM - 09:00 AM',
    '09:00 AM - 10:30 AM',
    '10:30 AM - 12:00 PM',
    '12:00 PM - 01:30 PM',
    '01:30 PM - 03:00 PM',
    '03:00 PM - 04:30 PM',
    '04:30 PM - 06:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isBoatingPermitted) return;
    if (!customerName || !customerPhone) {
      alert('Please fill out the primary customer contact details.');
      return;
    }

    const newBooking: Booking = {
      id: 'HOG-' + Math.floor(100000 + Math.random() * 900000),
      customerName,
      customerPhone,
      bookingDate,
      timeSlot,
      rideOptionId: selectedRideId,
      numCoracles,
      numGuests,
      addOnMassage,
      addOnFishFry,
      addOnLocalGuide,
      assignedBoatmanId,
      totalPrice: totalCost,
      status: 'Confirmed'
    };

    onBookingCreated(newBooking);
    setActivePassId(newBooking.id); // focus on newly booked ticket

    // Reset inputs
    setCustomerName('');
    setCustomerPhone('');
  };

  const getBoatmanName = (id: string) => {
    return VERIFIED_BOATMEN.find(b => b.id === id)?.name || 'Auto Assigned Pilot';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="booking-pannels-container">
      
      {/* LEFT: Setup Booking Forms */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
          <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
            <Ticket size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Oottamalai Coracle Reservations</h3>
            <p className="text-xs text-slate-500">Regulated pricing tariffs • Secure Government-licensed crew</p>
          </div>
        </div>

        {!isBoatingPermitted ? (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 text-center text-rose-950 space-y-2">
            <h4 className="font-bold">Reservations Temporarily Paused</h4>
            <p className="text-xs">
              Coracle boating is suspended due to high-risk water levels (exceeding 12,000 cusecs). Please use the simulator in the Hydrology feed to adjust water speed to safe baseline conditions to book tickets.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Passenger Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Primary Tourist Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vijay Krishna"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all font-sans"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Contact Phone Number</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400">
                    <Phone size={16} />
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 94432 XXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Exp options */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Select Coracle Venture Class</label>
              <div className="space-y-2">
                {CORACLE_RIDES.map((ride) => {
                  const isActive = selectedRideId === ride.id;
                  return (
                    <div
                      key={ride.id}
                      onClick={() => setSelectedRideId(ride.id)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        isActive 
                          ? 'bg-teal-50/50 border-teal-500 shadow-sm' 
                          : 'bg-slate-50/30 border-slate-100 hover:bg-slate-50 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-slate-800">{ride.name}</span>
                            <span className="text-[10px] bg-slate-100 text-slate-600 font-mono py-0.5 px-2 rounded-full">
                              ⏱ {ride.duration}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 lines-clamp-2">{ride.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="block text-sm font-bold text-teal-700 font-mono">₹{ride.pricePerCoracle}</span>
                          <span className="block text-[9px] text-slate-600">per coracle</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Date and Time slots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Day of Voyage</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400">
                    <Calendar size={16} />
                  </span>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-sm text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white transition-all font-mono"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Boarding Time Slot</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400">
                    <Clock size={16} />
                  </span>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-sm text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white transition-all font-sans"
                  >
                    {AVAILABLE_SLOTS.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Occupants counters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/60 p-4 rounded-xl border border-slate-200/40">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Total Visitors Count</label>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="button"
                    disabled={numGuests <= 1}
                    onClick={() => setNumGuests(numGuests - 1)}
                    className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-all font-mono text-sm"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold font-mono text-slate-800 text-base">{numGuests}</span>
                  <button
                    type="button"
                    disabled={numGuests >= 16}
                    onClick={() => setNumGuests(numGuests + 1)}
                    className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-all font-mono text-sm"
                  >
                    +
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 block mt-1">Safety max is 16 guests online booking.</span>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Coracles Needed</label>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="button"
                    disabled={numCoracles <= Math.ceil(numGuests / 4)}
                    onClick={() => setNumCoracles(numCoracles - 1)}
                    className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-all font-mono text-sm"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold font-mono text-slate-800 text-base">{numCoracles}</span>
                  <button
                    type="button"
                    disabled={numCoracles >= 4}
                    onClick={() => setNumCoracles(numCoracles + 1)}
                    className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-all font-mono text-sm"
                  >
                    +
                  </button>
                </div>
                <span className="text-[10px] text-teal-700 font-semibold block mt-1">
                  {Math.ceil(numGuests / 4)} minimum coracle(s) strictly required.
                </span>
              </div>
            </div>

            {/* Custom local add ons */}
            <div className="space-y-2.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Indigenous Hogenakkal Add-Ons</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Massage */}
                <div 
                  onClick={() => setAddOnMassage(!addOnMassage)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-2 ${
                    addOnMassage ? 'bg-amber-50/40 border-amber-500/80 text-amber-950' : 'bg-slate-50/20 border-slate-200/50 text-slate-700'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={addOnMassage} 
                    onChange={() => {}} // toggled by parent div
                    className="mt-1 pointer-events-none rounded text-amber-600 focus:ring-amber-500" 
                  />
                  <div>
                    <span className="block text-xs font-bold leading-none">Rocks Massage</span>
                    <span className="block text-[10px] text-slate-500 mt-1 font-mono">₹300 / guest</span>
                  </div>
                </div>

                {/* Fresh fish fry */}
                <div 
                  onClick={() => setAddOnFishFry(!addOnFishFry)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-2 ${
                    addOnFishFry ? 'bg-orange-50/40 border-orange-500/80 text-orange-950' : 'bg-slate-50/20 border-slate-200/50 text-slate-700'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={addOnFishFry} 
                    onChange={() => {}} // toggled by parent div
                    className="mt-1 pointer-events-none rounded text-orange-600 focus:ring-orange-500" 
                  />
                  <div>
                    <span className="block text-xs font-bold leading-none">Fresh Fish - Feast</span>
                    <span className="block text-[10px] text-slate-500 mt-1 font-mono">₹250 / portion</span>
                  </div>
                </div>

                {/* Local Guide */}
                <div 
                  onClick={() => setAddOnLocalGuide(!addOnLocalGuide)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-2 ${
                    addOnLocalGuide ? 'bg-sky-50/40 border-sky-500/80 text-sky-950' : 'bg-slate-50/20 border-slate-200/50 text-slate-700'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={addOnLocalGuide} 
                    onChange={() => {}} // toggled by parent div
                    className="mt-1 pointer-events-none rounded text-sky-600 focus:ring-sky-500" 
                  />
                  <div>
                    <span className="block text-xs font-bold leading-none">Verified Guide</span>
                    <span className="block text-[10px] text-slate-500 mt-1 font-mono">₹500 flat rate</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Preferred Pilot Selection */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Assign Licensed Boatman</label>
              <select
                value={assignedBoatmanId}
                onChange={(e) => setAssignedBoatmanId(e.target.value)}
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2 px-3 text-sm text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
              >
                {VERIFIED_BOATMEN.map(b => (
                  <option key={b.id} value={b.id}>{b.name} ({b.experienceYears} yrs exp • Rated ★{b.rating})</option>
                ))}
              </select>
            </div>

            {/* Pricing Summary */}
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl space-y-3 font-mono">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Base Coracle tariff ({numCoracles} x ₹{selectedRide.pricePerCoracle}):</span>
                <span>₹{rideCost}</span>
              </div>
              
              {addOnMassage && (
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Therapeutic Rock Oils Massage ({numGuests} guests):</span>
                  <span>₹{massageCost}</span>
                </div>
              )}

              {addOnFishFry && (
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Fresh Kaveri Fish Masala fry ({numGuests} plates):</span>
                  <span>₹{fishCost}</span>
                </div>
              )}

              {addOnLocalGuide && (
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Authorized Local Tour Pilot:</span>
                  <span>₹{guideCost}</span>
                </div>
              )}

              <div className="border-t border-slate-700/60 pt-2.5 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-200">Total Net Cost (Taxes Included):</span>
                <span className="text-xl font-bold text-teal-400">₹{totalCost}</span>
              </div>
            </div>

            {/* Confirm Book Trigger button */}
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Sparkles size={16} />
              Confirm Booking & Issue Digital Boarding Pass
            </button>
          </form>
        )}
      </div>

      {/* RIGHT: Digital Boarding Passes Shelf */}
      <div className="lg:col-span-5 flex flex-col space-y-4">
        
        {/* Booked Boarding Pass List Container */}
        <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-xl p-5 flex-1 flex flex-col">
          <div className="border-b border-slate-800 pb-3 mb-4 flex justify-between items-center">
            <h4 className="font-bold text-base tracking-tight flex items-center gap-1.5 text-teal-400">
              <Receipt size={18} />
              Hogenakkal Boarding Passes ({savedBookings.length})
            </h4>
            {savedBookings.length > 0 && (
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 py-0.5 px-2.5 rounded-full uppercase">
                Active Passes
              </span>
            )}
          </div>

          {savedBookings.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-800/40 flex items-center justify-center text-slate-600 border border-slate-800">
                <Ticket size={24} />
              </div>
              <p className="text-sm font-semibold text-slate-400">No Reservations Issued Yet</p>
              <p className="text-xs">Fill out the left form and generate your custom coracle receipt and printable pass immediately.</p>
            </div>
          ) : (
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px] pr-1">
              {savedBookings.map((booking) => {
                const isActive = activePassId === booking.id;
                const ride = CORACLE_RIDES.find(r => r.id === booking.rideOptionId) || CORACLE_RIDES[0];
                return (
                  <div
                    key={booking.id}
                    onClick={() => setActivePassId(booking.id)}
                    className={`p-3.5 rounded-xl border border-slate-800 cursor-pointer transition-all ${
                      isActive 
                        ? 'bg-slate-800/80 border-teal-500/60 shadow-teal-950/25 shadow-md' 
                        : 'bg-slate-950/55 hover:bg-slate-800/30'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-mono font-black text-teal-400">{booking.id}</span>
                          <span className="text-[9px] bg-slate-800 text-slate-300 py-0.5 px-1.5 rounded font-medium">
                            {booking.numGuests} Guests • {booking.numCoracles} Boat(s)
                          </span>
                        </div>
                        <h5 className="font-bold text-sm text-slate-200 mt-1">{booking.customerName}</h5>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                          📅 {booking.bookingDate} | ⏱ {booking.timeSlot}
                        </p>
                        <p className="text-xs text-slate-300 mt-1 italic font-sans">
                          ⛵ {ride.name}
                        </p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1.5">
                        <span className="text-sm font-black text-slate-100 font-mono">₹{booking.totalPrice}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteBooking(booking.id);
                            if (activePassId === booking.id) {
                              setActivePassId(null);
                            }
                          }}
                          className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors"
                          title="Delete booking ticket"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Pass Live Inspection Detail (The Premium Boarding Pass representation) */}
        {activePassId && (() => {
          const booking = savedBookings.find(b => b.id === activePassId);
          if (!booking) return null;
          const ride = CORACLE_RIDES.find(r => r.id === booking.rideOptionId) || CORACLE_RIDES[0];
          return (
            <div id="issued-pass-artifact" className="bg-gradient-to-br from-slate-950 to-slate-900 text-white rounded-2xl border border-slate-800 p-5 shadow-2xl relative overflow-hidden font-mono text-xs space-y-4 animate-scaleUp">
              {/* Artistic Background Water Circles */}
              <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-teal-500/5 blur-xl pointer-events-none"></div>
              <div className="absolute -left-4 -top-4 w-32 h-32 rounded-full bg-slate-500/5 blur-xl pointer-events-none blue"></div>
              
              <div className="border-b border-dashed border-slate-800 pb-3 flex justify-between items-center text-slate-400">
                <span className="text-[10px]">GOVT OF TN • PENNAGARAM DIVISION</span>
                <span className="text-xs text-teal-400 font-black">BOARDING PASS</span>
              </div>

              {/* Grid ticket style */}
              <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 border-b border-dashed border-slate-800 pb-4">
                <div>
                  <span className="block text-[10px] text-slate-500 font-semibold mb-0.5 uppercase">Passenger</span>
                  <span className="font-bold text-sm text-slate-200 block truncate">{booking.customerName}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-semibold mb-0.5 uppercase">Ticket Serial</span>
                  <span className="font-bold text-sm text-teal-400 block">{booking.id}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-semibold mb-0.5 uppercase">Vessel Ride Class</span>
                  <span className="text-slate-300 block font-sans truncate font-semibold" title={ride.name}>{ride.name}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-semibold mb-0.5 uppercase">Roster Boatman</span>
                  <span className="text-slate-300 font-sans block truncate font-semibold">{getBoatmanName(booking.assignedBoatmanId)}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-semibold mb-0.5 uppercase">Launch Date</span>
                  <span className="text-slate-100 block">{booking.bookingDate}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-semibold mb-0.5 uppercase">Regulated Hour</span>
                  <span className="text-slate-100 block truncate">{booking.timeSlot}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-semibold mb-0.5 uppercase">Vessels Issued</span>
                  <span className="text-slate-200 block">{booking.numCoracles} Basket Boat(s)</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-semibold mb-0.5 uppercase">Head Count</span>
                  <span className="text-slate-200 block">{booking.numGuests} Persons total</span>
                </div>
              </div>

              {/* Addons breakdown inside pass */}
              <div className="space-y-1">
                <span className="block text-[10px] text-slate-500 font-semibold uppercase mb-1">Equipped Extras</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className={`py-0.5 px-2 rounded text-[10px] ${booking.addOnMassage ? 'bg-amber-950/80 text-amber-300' : 'bg-slate-800/40 text-slate-500'}`}>
                    Massage: {booking.addOnMassage ? 'YES' : 'NO'}
                  </span>
                  <span className={`py-0.5 px-2 rounded text-[10px] ${booking.addOnFishFry ? 'bg-orange-950/80 text-orange-300' : 'bg-slate-800/40 text-slate-500'}`}>
                    Fresh Fish: {booking.addOnFishFry ? 'YES' : 'NO'}
                  </span>
                  <span className={`py-0.5 px-2 rounded text-[10px] ${booking.addOnLocalGuide ? 'bg-sky-950/80 text-sky-300' : 'bg-slate-800/40 text-slate-500'}`}>
                    Local Guide: {booking.addOnLocalGuide ? 'YES' : 'NO'}
                  </span>
                </div>
              </div>

              {/* Barcode & Security Marker */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="h-6 bg-slate-200 rounded overflow-hidden flex items-stretch py-1 bg-white px-2">
                    {/* Simulated vector barcode lines */}
                    <div className="w-1 bg-slate-900 mr-0.5"></div>
                    <div className="w-0.5 bg-slate-900 mr-0.5"></div>
                    <div className="w-2 bg-slate-900 mr-2"></div>
                    <div className="w-1 bg-slate-900 mr-0.5"></div>
                    <div className="w-0.5 bg-slate-900 mr-0.5"></div>
                    <div className="w-1.5 bg-slate-900 mr-1.5"></div>
                    <div className="w-0.5 bg-slate-900 mr-0.5"></div>
                    <div className="w-1 bg-slate-900 mr-0.5"></div>
                    <div className="w-2 bg-slate-900 mr-1"></div>
                    <div className="w-0.5 bg-slate-900 mr-0.5"></div>
                    <div className="w-1 bg-slate-900"></div>
                    <div className="w-1.5 bg-slate-900 ml-1"></div>
                    <div className="w-1.5 bg-slate-900 ml-1"></div>
                    <div className="w-0.5 bg-slate-900 ml-0.5"></div>
                    <div className="w-2 bg-slate-900 ml-1"></div>
                    <div className="w-0.5 bg-slate-900 ml-0.5"></div>
                  </div>
                  <span className="text-[8px] text-slate-600 block mt-1 tracking-[4px] text-center">*{booking.id}*</span>
                </div>

                <div className="bg-white p-1 rounded">
                  {/* Beautiful simulated 2D QR Code Matrix */}
                  <div className="grid grid-cols-6 gap-0.5 w-8 h-8">
                    {[
                      1,0,1,1,0,1,
                      1,1,0,1,1,1,
                      0,1,1,0,0,1,
                      1,0,1,1,1,0,
                      0,1,0,1,0,1,
                      1,1,1,0,1,1
                    ].map((val, idx) => (
                      <div 
                        key={idx} 
                        className={`w-1 h-1 ${val === 1 ? 'bg-slate-950' : 'bg-transparent'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Instructions print footer */}
              <div className="bg-slate-950 p-2.5 rounded-lg text-[9px] text-slate-500 leading-relaxed font-sans">
                ⚠️ Secure copy. Safe life vests are compulsory on the river. Present this digital code or government registration message at the Pennagaram check post.
              </div>

            </div>
          );
        })()}

      </div>

    </div>
  );
}
