import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, HelpCircle, Activity, Droplets, Waves, Thermometer, Wind } from 'lucide-react';
import { WaterLevelMetrics } from '../types';

interface WaterSafetyProps {
  metrics: WaterLevelMetrics;
  onMetricsChange: (newMetrics: WaterLevelMetrics) => void;
}

export default function WaterSafetyDashboard({ metrics, onMetricsChange }: WaterSafetyProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  // Quick simulation function
  const handleSimulate = (cusecs: number) => {
    let status: WaterLevelMetrics['status'] = 'Safe';
    let boating = true;
    let bathing = true;
    let trend: WaterLevelMetrics['trend'] = 'Steady';

    if (cusecs > 12000) {
      status = 'High Flow - Boating Suspended';
      boating = false;
      bathing = false;
      trend = 'Rising';
    } else if (cusecs >= 8000) {
      status = 'Moderate Flooding';
      boating = true;
      bathing = false;
      trend = 'Rising';
    } else if (cusecs < 3000) {
      status = 'Safe';
      boating = true;
      bathing = true;
      trend = 'Falling';
    } else {
      status = 'Safe';
      boating = true;
      bathing = true;
      trend = 'Steady';
    }

    onMetricsChange({
      dischargeCusecs: cusecs,
      trend,
      status,
      boatingPermitted: boating,
      bathingPermitted: bathing,
      lastUpdated: 'Simulated Environment State'
    });
  };

  const percentOfLimit = Math.min((metrics.dischargeCusecs / 16000) * 100, 100);

  return (
    <div id="safety-dashboard-panel" className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 transition-all duration-300 hover:shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-5 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-teal-500 animate-pulse"></span>
            <span className="text-xs font-mono font-semibold tracking-wider text-teal-600 uppercase">Live Hydrology Feed</span>
          </div>
          <h2 className="text-2xl font-bold font-sans text-slate-900 tracking-tight mt-1">Water Safety & Flow-Rate</h2>
        </div>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors bg-slate-50 hover:bg-slate-100 py-1.5 px-3 rounded-lg border border-slate-200/60"
        >
          <HelpCircle size={14} />
          {showExplanation ? 'Hide Guide' : 'Safety Guide'}
        </button>
      </div>

      {showExplanation && (
        <div id="safety-exp-box" className="bg-amber-50/70 border border-amber-200/50 rounded-xl p-4 mb-5 text-sm text-slate-700 space-y-2 animate-fadeIn">
          <p className="font-semibold text-amber-900">How Hogenakkal flow safety regulations are evaluated:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Under 8,000 cusecs:</strong> Ideal conditions. Both high-thrill coracle trips and therapeutic rock baths are fully active.</li>
            <li><strong>8,000 to 12,000 cusecs:</strong> High volume warning. Coracles are allowed in limited sheltered paths, but river-bed bathing is closed.</li>
            <li><strong>Above 12,000 cusecs:</strong> Red Alert. Heavy torrents from Karnataka reservoirs (Mettur/Kabini). Boating and waterfront access are strictly banned.</li>
          </ul>
        </div>
      )}

      {/* Main Hydrology Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        
        {/* Metric 1: Discharge Rate */}
        <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Water Release Flow</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                {metrics.dischargeCusecs.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-slate-500">cusecs</span>
            </div>
            <span className="block text-[11px] text-slate-500 font-mono">
              ({metrics.trend} trend today)
            </span>
          </div>
          <div className="bg-sky-50 text-sky-600 p-2.5 rounded-xl border border-sky-100">
            <Waves size={24} className="animate-pulse" />
          </div>
        </div>

        {/* Metric 2: Boating License Status */}
        <div className={`rounded-xl p-4 border transition-colors ${
          metrics.boatingPermitted 
            ? 'bg-emerald-50/60 border-emerald-100 text-emerald-900' 
            : 'bg-rose-50/60 border-rose-100 text-rose-900'
        } flex items-center justify-between`}>
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-medium block">Coracle Boating</span>
            <span className="text-xl font-bold tracking-tight block">
              {metrics.boatingPermitted ? 'Permitted ✓' : 'Suspended ✕'}
            </span>
            <span className="block text-[11px] opacity-80">
              {metrics.boatingPermitted ? 'Standard packages running' : 'District safety red ban active'}
            </span>
          </div>
          <div className={`p-2.5 rounded-xl ${
            metrics.boatingPermitted ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
          }`}>
            {metrics.boatingPermitted ? <ShieldCheck size={24} /> : <AlertTriangle size={24} />}
          </div>
        </div>

        {/* Metric 3: Bathing Permit Status */}
        <div className={`rounded-xl p-4 border transition-colors ${
          metrics.bathingPermitted 
            ? 'bg-teal-50/60 border-teal-100 text-teal-900' 
            : 'bg-amber-50/60 border-amber-100 text-amber-950'
        } flex items-center justify-between`}>
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-medium block">River-bed Bathing</span>
            <span className="text-xl font-bold tracking-tight block">
              {metrics.bathingPermitted ? 'Allowed ✓' : 'Restricted ✕'}
            </span>
            <span className="block text-[11px] opacity-80">
              {metrics.bathingPermitted ? 'Sandy beaches open' : 'High torrents at steps'}
            </span>
          </div>
          <div className={`p-2.5 rounded-xl ${
            metrics.bathingPermitted ? 'bg-teal-100 text-teal-600' : 'bg-amber-100 text-amber-600'
          }`}>
            <Droplets size={24} />
          </div>
        </div>

      </div>

      {/* Discharge Visual Bar */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-xs text-slate-500 font-mono">
          <span>0 cusecs (Dry bed)</span>
          <span className="text-amber-600 font-medium">8K cusecs (Warning)</span>
          <span className="text-red-600 font-medium">12K cusecs (Red Threshold)</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex relative">
          <div 
            className={`h-full transition-all duration-500 rounded-full ${
              metrics.dischargeCusecs > 12000 ? 'bg-rose-500' : metrics.dischargeCusecs >= 8000 ? 'bg-amber-500' : 'bg-teal-500'
            }`}
            style={{ width: `${percentOfLimit}%` }}
          />
          {/* Regulatory Marker Line */}
          <div className="absolute left-[75%] top-0 bottom-0 w-0.5 bg-red-600" title="Safety Limit" />
        </div>
        <div className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg text-xs font-mono text-slate-500">
          <span>Feed: {metrics.lastUpdated}</span>
          <span className="font-semibold text-slate-700">Level: {metrics.status}</span>
        </div>
      </div>

      {/* Simulator Control Panel */}
      <div className="bg-slate-50/90 border border-slate-200/50 rounded-xl p-4">
        <h3 className="not-prose text-xs font-semibold uppercase text-slate-500 tracking-wider mb-3 flex items-center gap-1.5 font-mono">
          <Activity size={12} />
          Interactive Hydrological Simulation Panel
        </h3>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          The flow rates fluctuate dynamically based on rainwater levels and gates opening in Mettur. Toggle states below to preview how tourist activity policies adapt to protect lives.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => handleSimulate(2800)}
            className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
              metrics.dischargeCusecs === 2800 
                ? 'bg-slate-900 border-slate-900 text-white shadow-sm' 
                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            Moderate: 2,800 cusecs
          </button>
          <button
            onClick={() => handleSimulate(6420)}
            className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
              metrics.dischargeCusecs === 6420 
                ? 'bg-slate-900 border-slate-900 text-white shadow-sm' 
                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            Healthy Flow: 6,420 cusecs
          </button>
          <button
            onClick={() => handleSimulate(9800)}
            className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
              metrics.dischargeCusecs === 9800 
                ? 'bg-slate-900 border-slate-900 text-white shadow-sm' 
                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            Alert: 9,800 cusecs
          </button>
          <button
            onClick={() => handleSimulate(14500)}
            className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
              metrics.dischargeCusecs === 14500 
                ? 'bg-slate-900 border-slate-900 text-white shadow-sm' 
                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            Critical: 14,500 cusecs
          </button>
        </div>
      </div>
    </div>
  );
}
