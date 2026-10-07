import React, { useState, useEffect } from 'react';
import { useIndustrialStore } from '../store/useIndustrialStore';
import { 
  Activity, 
  Flame, 
  AlertTriangle, 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldCheck, 
  Factory, 
  Truck,
  Zap,
  FileSpreadsheet
} from 'lucide-react';

export const HeaderNavbar = () => {
  const { 
    isRunning, 
    toggleSimulation, 
    activeBottleneck, 
    setBottleneck,
    fuelType,
    capacityPerHour,
    totalProducedToday
  } = useIndustrialStore();

  const [time, setTime] = useState(new Date().toLocaleTimeString('id-ID'));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('id-ID'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hasAlarm = activeBottleneck !== 'none';

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50 px-4 lg:px-8 py-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Plant Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/40">
            <Factory className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-wide">PT. MINERAL ADITIF NUSANTARA</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                CONFIDENTIAL CLIENT
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                SCADA v3.2
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
              <span>Bulk Mixing & Drying Process</span>
              <span className="text-slate-600">•</span>
              <span className="text-cyan-400 font-semibold">{capacityPerHour} Ton/Jam Target</span>
            </p>
          </div>
        </div>

        {/* Live Telemetry Status Pill */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${hasAlarm ? 'bg-red-500 animate-ping' : isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span className={`text-xs font-mono font-bold uppercase tracking-wider ${hasAlarm ? 'text-red-400' : isRunning ? 'text-emerald-400' : 'text-amber-400'}`}>
              {hasAlarm ? `ALARM: ${activeBottleneck.replace('_', ' ').toUpperCase()}` : isRunning ? 'PLANT ONLINE' : 'SIMULATION PAUSED'}
            </span>
          </div>

          <div className="h-4 w-px bg-slate-800"></div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Fuel: <strong className="text-white">{fuelType}</strong></span>
          </div>

          <div className="h-4 w-px bg-slate-800"></div>

          <div className="text-xs font-mono text-cyan-400 font-bold">
            {time} WIB
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-2">
          <a
            href="./Database_Simulasi_SCADA_dan_Operasional.xlsx"
            download="Database_Simulasi_SCADA_dan_Operasional_Revisi.xlsx"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white transition border border-emerald-500/50 shadow-md"
            title="Unduh Database Excel Hasil Revisi Final"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-200" />
            <span className="hidden sm:inline">Unduh Excel Revisi</span>
          </a>

          {hasAlarm && (
            <button 
              onClick={() => setBottleneck('none')}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition border border-red-400"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Alarm
            </button>
          )}

          <button 
            onClick={toggleSimulation}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg transition border ${
              isRunning 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-600/20'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-white" />
                <span>Resume</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
