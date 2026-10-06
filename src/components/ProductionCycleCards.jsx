import React from 'react';
import { useIndustrialStore } from '../store/useIndustrialStore';
import { 
  Clock, 
  Calendar, 
  Target, 
  Zap, 
  BarChart3, 
  CheckCircle,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const ProductionCycleCards = () => {
  const { 
    capacityPerHour, 
    shiftHours, 
    workingDaysPerMonth,
    totalProducedToday,
    getMetrics
  } = useIndustrialStore();

  const metrics = getMetrics();

  // Milestones from Confidential Excel
  const cycles = [
    { label: 'Per Jam (Base Rate)', tons: metrics.tonsPerHour, period: '1 Jam', sub: `${((capacityPerHour * 1000) / 60).toFixed(0)} kg/mnt`, active: true },
    { label: 'Per Shift (7 Jam)', tons: metrics.tonsPerShift, period: '7 Jam / Shift', sub: `${(metrics.tonsPerShift / 30).toFixed(1)} Rit Truk`, active: true },
    { label: 'Siklus 10 Hari', tons: capacityPerHour * shiftHours * 10, period: '10 Hari Kerja', sub: 'Produksi Minimum', active: workingDaysPerMonth >= 10 },
    { label: 'Siklus 15 Hari', tons: capacityPerHour * shiftHours * 15, period: '15 Hari Kerja', sub: 'Setengah Bulan', active: workingDaysPerMonth >= 15 },
    { label: 'Siklus 20 Hari', tons: capacityPerHour * shiftHours * 20, period: '20 Hari Kerja', sub: 'Target Moderat', active: workingDaysPerMonth >= 20 },
    { label: 'Siklus 25 Hari (Standar)', tons: capacityPerHour * shiftHours * 25, period: '25 Hari Kerja', sub: 'Target Utama Excel', highlight: true, active: workingDaysPerMonth >= 25 },
    { label: 'Siklus 30 Hari (Maksimal)', tons: capacityPerHour * shiftHours * 30, period: '30 Hari Kerja', sub: 'Full Capacity Nonstop', active: workingDaysPerMonth === 30 },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white tracking-wide uppercase">
            Kapasitas Produksi & Cycle Time Matrix
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Active Setting:</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-bold border border-slate-700">
            {capacityPerHour} T/h • {shiftHours}h Shift • {workingDaysPerMonth} Hari/Bulan
          </span>
        </div>
      </div>

      {/* Grid of Cycle Time Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {cycles.map((c, i) => (
          <div 
            key={i}
            className={`p-3 rounded-lg border flex flex-col justify-between transition-all ${
              c.highlight 
                ? 'bg-gradient-to-b from-cyan-950/60 to-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10' 
                : c.active 
                ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700' 
                : 'bg-slate-950/30 border-slate-900 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                <span>{c.period}</span>
                {c.highlight && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                )}
              </div>
              <div className="text-lg lg:text-xl font-mono font-bold text-white tracking-tight my-1">
                {c.tons.toLocaleString('id-ID')} <span className="text-xs font-normal text-slate-400">Ton</span>
              </div>
            </div>
            
            <div className="mt-2 pt-1.5 border-t border-slate-800/80 text-[10px] text-slate-400">
              <span className="font-semibold block truncate text-slate-300">{c.label}</span>
              <span className="text-[9px] text-cyan-400/80 font-mono block">{c.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Current Month Projected Volume Summary Banner */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300">
          <Target className="w-4 h-4 text-emerald-400" />
          <span>Total Proyeksi Output Bulan Ini:</span>
          <span className="text-emerald-400 font-bold text-sm bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
            {metrics.tonsPerMonth.toLocaleString('id-ID')} Ton
          </span>
          <span className="text-slate-500">({(metrics.tonsPerMonth / 30).toFixed(0)} Rit Truk Kontainer)</span>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>Produksi Hari Ini: <strong className="text-white">{totalProducedToday.toFixed(1)} Ton</strong></span>
        </div>
      </div>
    </div>
  );
};
