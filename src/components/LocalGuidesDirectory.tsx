import React, { useState } from 'react';
import { Star, MessageSquare, Anchor, ShieldAlert, BadgeCheck, Languages, Plus, PenTool } from 'lucide-react';
import { VERIFIED_BOATMEN } from '../data';
import { Boatman, Review } from '../types';

interface LocalGuidesProps {
  reviewsList: Review[];
  onAddReview: (review: Review) => void;
}

export default function LocalGuidesDirectory({ reviewsList, onAddReview }: LocalGuidesProps) {
  // Filter states
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  
  // Submit new review form states
  const [showAddReview, setShowAddReview] = useState(false);
  const [revUser, setRevUser] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState('');
  const [revRide, setRevRide] = useState('Carbonite Canyon Voyage');

  const languagesAvailable = ['All', 'Tamil', 'Kannada', 'English', 'Hindi', 'Telugu'];

  const filteredBoatmen = VERIFIED_BOATMEN.filter((b) => {
    if (selectedLanguage === 'All') return true;
    return b.languages.some(lang => lang.toLowerCase().includes(selectedLanguage.toLowerCase()));
  });

  const filteredReviews = reviewsList.filter((r) => {
    if (selectedRating === 0) return true;
    return r.rating === selectedRating;
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revUser || !revComment) {
      alert('Please provide your name and feedback comments.');
      return;
    }

    const newRev: Review = {
      id: 'REV-' + Math.floor(1000 + Math.random() * 9000),
      userName: revUser + ' (Verified Boarder)',
      rating: revRating,
      date: new Date().toISOString().split('T')[0],
      comment: revComment,
      source: 'Direct Review Portal',
      rideType: revRide
    };

    onAddReview(newRev);
    setRevUser('');
    setRevComment('');
    setShowAddReview(false);
  };

  return (
    <div className="space-y-6" id="guides-reviews-portal">
      
      {/* SECTION 1: Local Oarsmen Directory */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-5 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-500"></span>
              <span className="text-xs font-mono font-bold text-teal-600 uppercase tracking-widest">Licensed Boatmen</span>
            </div>
            <h2 className="text-2xl font-bold font-sans text-slate-900 tracking-tight mt-1">Local Oarsmen Directory</h2>
          </div>

          {/* Languages filter dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Filter by language:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg text-slate-700 font-sans focus:outline-none"
            >
              {languagesAvailable.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          Meet the experienced rowers who pilot traditional coracles through Hogenakkal's swirling depths. All oarsmen undergo thorough government licensing, deep-water rescue drills, and are native to neighboring Pennagaram riverbank villages.
        </p>

        {/* Boatmen Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredBoatmen.map((b) => (
            <div key={b.id} className="bg-slate-50/60 rounded-xl p-4 border border-slate-200/40 hover:border-teal-500/30 transition-all hover:bg-white hover:shadow-sm">
              <div className="flex items-start gap-3">
                <img 
                  src={b.avatarUrl} 
                  alt={b.name} 
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-slate-200 bg-slate-100 flex-shrink-0"
                />
                <div className="min-w-0">
                  <span className="inline-block text-[9px] font-mono font-semibold bg-teal-50 text-teal-700 py-0.5 px-1.5 rounded-full uppercase mb-1">
                    {b.badge}
                  </span>
                  <h4 className="font-bold text-xs text-slate-900 leading-tight block truncate" title={b.name}>{b.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono">📅 {b.experienceYears} Years Rowing</p>
                </div>
              </div>

              {/* Pilot metadata details */}
              <div className="mt-4 pt-3 border-t border-slate-200/50 space-y-1.5 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Languages size={12} className="text-slate-400" />
                  <span className="truncate">{b.languages.join(', ')}</span>
                </div>
                <div className="flex justify-between items-center bg-white px-2 py-1 rounded border border-slate-100 font-mono text-[10px]">
                  <span>Village: {b.village.split(' ')[0]}</span>
                  <span className="text-amber-600 font-bold flex items-center">
                    ★ {b.rating} <span className="text-slate-400 text-[8px] font-normal ml-0.5">({b.reviewsCount})</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Travel Reviews & Direct Feedback */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-5 gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Traveler Testimonials & Reviews</h3>
            <p className="text-xs text-slate-500">Gathered from TripAdvisor, Google Maps, and direct traveler submissions</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Stars filter */}
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg text-xs text-slate-700 font-sans focus:outline-none"
            >
              <option value={0}>All Star Ratings</option>
              <option value={5}>5-Stars ★★★★★</option>
              <option value={4}>4-Stars ★★★★</option>
            </select>

            <button
              onClick={() => setShowAddReview(!showAddReview)}
              className="flex items-center gap-1.5 text-xs text-white hover:bg-teal-700 bg-teal-600 transition-colors py-1.5 px-3 rounded-lg border border-transparent font-medium cursor-pointer"
            >
              <Plus size={14} />
              Write Review
            </button>
          </div>
        </div>

        {/* New Review Add Form section overlay/expanding */}
        {showAddReview && (
          <form onSubmit={handleReviewSubmit} className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6 space-y-4 animate-scaleUp">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <PenTool size={13} />
              Submit My Coracle Experience
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-600 block uppercase font-mono">Your Name & City</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar (Salem)"
                  value={revUser}
                  onChange={(e) => setRevUser(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-xs text-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-600 block uppercase font-mono">Rating Choice</label>
                  <select
                    value={revRating}
                    onChange={(e) => setRevRating(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-xs text-slate-800"
                  >
                    <option value={5}>5-Star (Exceptional)</option>
                    <option value={4}>4-Star (Very Good)</option>
                    <option value={3}>3-Star (Fair)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-600 block uppercase font-mono">Package Chosen</label>
                  <select
                    value={revRide}
                    onChange={(e) => setRevRide(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-xs text-slate-800"
                  >
                    <option value="Carbonite Canyon Voyage">Classic Canyon</option>
                    <option value="Deep-Gorge River Safari">Gorge Safari</option>
                    <option value="Express Spray Loop">Express Loop</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-600 block uppercase font-mono">Review Comments</label>
              <textarea
                required
                rows={3}
                placeholder="How was the scenic beauty? Comment on safety rules, fresh food stall treats, or your assigned licensed boatman..."
                value={revComment}
                onChange={(e) => setRevComment(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-xs text-slate-800 focus:outline-none focus:border-teal-500 font-sans"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddReview(false)}
                className="py-1 px-3 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-1 px-3 bg-teal-600 hover:bg-teal-700 text-white rounded text-xs font-semibold"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}

        {/* Review list feed */}
        <div className="space-y-4">
          {filteredReviews.map((rev) => (
            <div key={rev.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/30 font-sans space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="font-bold text-xs text-slate-800 block">{rev.userName}</span>
                  <span className="text-[10px] font-mono text-slate-400">📅 Published: {rev.date} • {rev.rideType || 'General Sightseeing'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        fill={i < rev.rating ? 'currentColor' : 'none'}
                        className={i < rev.rating ? 'text-amber-500' : 'text-slate-200'}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono bg-slate-100 text-slate-500 py-0.5 px-2 rounded-full uppercase">
                    via {rev.source}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
