import React from 'react';
import { useIndustrialStore } from '../store/useIndustrialStore';
import { 
  Truck, 
  Layers, 
  Flame, 
  RotateCw, 
  Warehouse, 
  ArrowRight, 
  AlertOctagon, 
  CheckCircle2, 
  Clock, 
  TrendingDown, 
  PlusCircle, 
  Send,
  Zap,
  Gauge
} from 'lucide-react';

export const SCADAMimicDiagram = () => {
  const {
    isRunning,
    isLunchBreak,
    activeBottleneck,
    capacityPerHour,
    fuelType,
    bentoniteStock,
    calciumStock,
    sodaAshStock,
    siloStock,
    trucksUnloadedToday,
    trucksDispatchedToday,
    unLoadTruck,
    dispatchProductTruck,
    getMetrics
  } = useIndustrialStore();

  const metrics = getMetrics();
  const isStopped = !isRunning || activeBottleneck !== 'none' || isLunchBreak;

  // Percentage calculations
  const bentonitePct = Math.min(100, Math.round((bentoniteStock / 134.4) * 100));
  const calciumPct = Math.min(100, Math.round((calciumStock / 120.96) * 100));
  const siloPct = Math.min(100, Math.round((siloStock / 86.4) * 100));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <h2 className="text-base font-bold text-white tracking-wide uppercase">
            SCADA Live Material Flow & Process Mimic
          </h2>
          {isLunchBreak && (
            <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse font-bold">
              ⏸️ ISTIRAHAT SIANG — MESIN STANDBY
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-slate-400">Throughput Rate:</span>
          <span className={`px-2.5 py-1 rounded font-bold border flex items-center gap-1.5 ${
            isLunchBreak 
              ? 'bg-amber-950/40 text-amber-300 border-amber-500/40' 
              : isStopped 
              ? 'bg-rose-950/40 text-rose-300 border-rose-500/40' 
              : 'bg-slate-800 text-cyan-400 border-cyan-500/30'
          }`}>
            <Gauge className="w-3.5 h-3.5" />
            {isLunchBreak ? '0.0 Ton/Jam (Standby)' : isStopped ? '0.0 Ton/Jam (Trip/Halt)' : `${capacityPerHour.toFixed(1)} Ton/Jam (${((capacityPerHour * 1000) / 60).toFixed(0)} kg/mnt)`}
          </span>
        </div>
      </div>

      {/* Process Flow Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch relative z-10">

        {/* 1. INBOUND TRUCK LOGISTICS (Cols: 1-3) */}
        <div className="lg:col-span-3 bg-slate-950/80 border border-slate-800/80 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-400" /> Inbound Logistics
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40">
                {trucksUnloadedToday} Rit Hari Ini
              </span>
            </div>

            <div className="space-y-3">
              {/* Bentonite Supply Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded p-2.5">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200">Bentonite (80%)</span>
                  <span className="text-amber-400 font-mono font-bold">5 Rit/Hari @ 30T</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-2">Pemasok Curah: Ritase 150 Ton/Hari</p>
                <button
                  onClick={() => unLoadTruck('bentonite')}
                  className="w-full text-xs font-semibold py-1.5 px-2 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center justify-center gap-1 transition"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  + Bongkar Truk (30 Ton)
                </button>
              </div>

              {/* Calcium Supply Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded p-2.5">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200">Calsium (15%)</span>
                  <span className="text-cyan-400 font-mono font-bold">1 Rit/5 Hari</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-2">Pemasok Curah: Ritase 30 Ton/5 Hari</p>
                <button
                  onClick={() => unLoadTruck('calcium')}
                  className="w-full text-xs font-semibold py-1.5 px-2 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 flex items-center justify-center gap-1 transition"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  + Bongkar Truk (30 Ton)
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Forklift Loader:</span>
            <span className="text-slate-300 font-mono font-semibold">10-15x / jam (Tiap 4-6 mnt)</span>
          </div>
        </div>

        {/* 2. STORAGE STOCK PILES (Cols: 4-6) */}
        <div className="lg:col-span-3 bg-slate-950/80 border border-slate-800/80 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Warehouse className="w-4 h-4 text-cyan-400" /> Stock Pile Area
              </span>
              <span className="text-[10px] font-mono text-slate-400">Retaining Wall 3m</span>
            </div>

            <div className="space-y-4">
              {/* Bentonite Stockpile */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Bentonite (RM 1 - 18x6m)</span>
                  <span className={`font-mono font-bold ${bentonitePct < 25 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`}>
                    {bentoniteStock.toFixed(1)} / 134.4 T ({bentonitePct}%)
                  </span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-3 p-0.5 overflow-hidden border border-slate-700">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${bentonitePct < 25 ? 'bg-red-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'}`}
                    style={{ width: `${bentonitePct}%` }}
                  ></div>
                </div>
                {/* Countdown Warning */}
                <div className="flex items-center justify-between mt-1 text-[11px] font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" /> Daya Tahan:
                  </span>
                  <span className={`font-bold ${metrics.bentoniteHoursLeft < 3 ? 'text-red-400 animate-pulse' : 'text-slate-300'}`}>
                    {metrics.bentoniteHoursLeft.toFixed(1)} Jam ({metrics.bentoniteHoursLeft < 8.4 ? 'DEPLESI' : 'AMAN'})
                  </span>
                </div>
              </div>

              {/* Calcium Stockpile */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Calsium (RM 2 - 6x6m)</span>
                  <span className="font-mono font-bold text-cyan-400">
                    {calciumStock.toFixed(1)} / 120.9 T ({calciumPct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 p-0.5 overflow-hidden border border-slate-700">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
                    style={{ width: `${calciumPct}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-1 text-[11px] font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" /> Daya Tahan:
                  </span>
                  <span className="font-bold text-slate-300">
                    {metrics.calciumHoursLeft.toFixed(1)} Jam
                  </span>
                </div>
              </div>

              {/* Soda Ash Buffer */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Soda Ash (RM 3 - 5%)</span>
                  <span className="font-mono font-bold text-slate-300">
                    {sodaAshStock.toFixed(1)} / 50 T
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-amber-400 transition-all duration-500"
                    style={{ width: `${(sodaAshStock / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-amber-400/90 font-mono">
            *Critical Bottleneck: Bentonite habis dalam 8,4 jam tanpa ritase kontinu!
          </div>
        </div>

        {/* 3. BULK MIXER & ROTARY DRYER (Cols: 7-9) */}
        <div className="lg:col-span-3 bg-slate-950/80 border border-slate-800/80 rounded-lg p-4 flex flex-col justify-between relative overflow-hidden">
          {/* Active Process Glow Effect */}
          {isRunning && activeBottleneck === 'none' && (
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
          )}

          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <RotateCw className={`w-4 h-4 text-amber-400 ${isRunning && activeBottleneck === 'none' ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                Mix & Dry Chamber
              </span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800/40">
                100 kW Drive
              </span>
            </div>

            {/* Industrial Machinery Visualization */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 my-2 text-center relative">
              {/* Conveyor Belt Indicator */}
              <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-slate-400 mb-2">
                <span>Feed Conveyor:</span>
                <span className={`px-1.5 py-0.2 rounded font-bold ${isStopped ? 'text-red-400' : 'text-emerald-400'}`}>
                  {isStopped ? 'STOPPED' : '20 T/h FEEDING'}
                </span>
              </div>

              {/* Rotary Drum Graphic */}
              <div className="relative py-2 flex items-center justify-center">
                <div className={`w-28 h-16 rounded-xl border-2 flex items-center justify-center transition-all ${
                  isStopped 
                    ? 'border-slate-700 bg-slate-800/60' 
                    : 'border-amber-500/60 bg-gradient-to-r from-amber-950/40 via-orange-950/50 to-amber-950/40 shadow-lg shadow-orange-500/10'
                }`}>
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-slate-300 tracking-wider block">ROTARY DRUM</span>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {isStopped ? '0 RPM' : '18 RPM'}
                    </span>
                  </div>
                </div>

                {/* Burner Flame */}
                <div className="absolute -bottom-1 flex items-center justify-center">
                  <Flame className={`w-6 h-6 ${isStopped ? 'text-slate-600' : 'text-orange-500 animate-flame'}`} />
                </div>
              </div>

              {/* Energy Specs */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono">
                <div className="text-left">
                  <span className="text-slate-500 block">Burner Heat:</span>
                  <span className="text-slate-200 font-bold">1,72 M Kcal/h</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block">Fuel Cost:</span>
                  <span className="text-amber-400 font-bold">Rp {metrics.fuelCostPerTon.toLocaleString('id-ID')}/T</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800">
            <span>Active Fuel:</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-white font-bold border border-slate-700">
              {fuelType} ({fuelType === 'PGN' ? '$13/MMBTU' : '$15.15/MMBTU'})
            </span>
          </div>
        </div>

        {/* 4. FINISHED PRODUCT SILO & DISPATCH (Cols: 10-12) */}
        <div className="lg:col-span-3 bg-slate-950/80 border border-slate-800/80 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-400" /> Bin Silo Buffer
              </span>
              <span className="text-[10px] font-mono text-slate-400">Cap: 72 m³ (86,4 T)</span>
            </div>

            {/* Silo Fill Level */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Silo Storage Level</span>
                  <span className={`font-mono font-bold ${siloPct > 85 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {siloStock.toFixed(1)} / 86.4 T ({siloPct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 p-0.5 overflow-hidden border border-slate-700">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${siloPct > 85 ? 'bg-amber-500' : 'bg-gradient-to-r from-emerald-500 to-cyan-500'}`}
                    style={{ width: `${siloPct}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-1 text-[11px] font-mono text-slate-400">
                  <span>Penuh Dalam:</span>
                  <span className="font-bold text-slate-300">
                    {metrics.siloHoursUntilFull > 0 ? `${metrics.siloHoursUntilFull.toFixed(1)} Jam` : 'PENUH!'}
                  </span>
                </div>
              </div>

              {/* Truck Loading Action */}
              <div className="bg-slate-900/90 border border-slate-800 rounded p-2.5">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200">Outflow Dispatch</span>
                  <span className="text-emerald-400 font-mono font-bold">Tiap 2 Jam</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-2">
                  Sudah Terkirim: <strong className="text-white font-mono">{trucksDispatchedToday} Rit</strong> ({trucksDispatchedToday * 30} Ton)
                </p>
                <button
                  onClick={dispatchProductTruck}
                  disabled={siloStock < 10}
                  className="w-full text-xs font-semibold py-1.5 px-2 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 flex items-center justify-center gap-1 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5" />
                  Kirim Truk Produk Jadi (30T)
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Buffer Holding Time:</span>
            <span className="text-slate-300 font-mono font-semibold">3,28 - 4,32 Jam Operasional</span>
          </div>
        </div>

      </div>
    </div>
  );
};
