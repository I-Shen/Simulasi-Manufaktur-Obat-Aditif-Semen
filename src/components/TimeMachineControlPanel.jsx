import React from 'react';
import { useIndustrialStore } from '../store/useIndustrialStore';
import { Play, Pause, RotateCcw, FastForward, Clock, Calendar, AlertTriangle, Truck, CheckCircle2 } from 'lucide-react';

export const TimeMachineControlPanel = () => {
  const {
    simulatedHour,
    isClockRunning,
    timeMultiplier,
    toggleClock,
    setTimeMultiplier,
    setSimulatedHour,
    resetSimulation,
    scheduledEvents,
    activeBottleneck
  } = useIndustrialStore();

  const metrics = useIndustrialStore((state) => state.getMetrics());

  // Speed options
  const speeds = [
    { label: '1x (Real)', val: 1 },
    { label: '5x', val: 5 },
    { label: '15x', val: 15 },
    { label: '60x (1s=1m)', val: 60 },
    { label: '120x (Turbo)', val: 120 }
  ];

  return (
    <div className="bg-slate-900 border border-cyan-500/30 rounded-xl p-4 shadow-xl shadow-cyan-950/20 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
        {/* Left: Title & Digital Clock */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                SCENARIO RUNTIME ENGINE
              </span>
              <span className="text-xs text-slate-400">Shift 1 (07:00 - 14:00)</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-mono font-bold tracking-wider text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                {metrics.formattedSimTime}
              </span>
              <span className="text-xs font-mono text-slate-400">WIB</span>
              {activeBottleneck !== 'none' && (
                <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse font-medium">
                  SIMULATION HALTED ({activeBottleneck.replace('_', ' ').toUpperCase()})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center: Controls (Play/Pause, Speeds, Reset) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Play/Pause */}
          <button
            onClick={toggleClock}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-md ${
              isClockRunning
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
            }`}
          >
            {isClockRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isClockRunning ? 'Pause Waktu' : 'Jalankan Waktu'}
          </button>

          {/* Speed Buttons */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
            {speeds.map((spd) => (
              <button
                key={spd.val}
                onClick={() => setTimeMultiplier(spd.val)}
                className={`px-2.5 py-1 text-xs font-mono font-bold rounded transition-all ${
                  timeMultiplier === spd.val
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {spd.label}
              </button>
            ))}
          </div>

          {/* Reset */}
          <button
            onClick={resetSimulation}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold border border-slate-700 transition-all"
            title="Reset simulasi ke jam 07:00 pagi"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Shift
          </button>
        </div>
      </div>

      {/* Time Scrubber Slider */}
      <div className="space-y-2 mb-4 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span>07:00 (Mulai Shift)</span>
          <span className="text-cyan-400 font-semibold">
            Geser Slider untuk Simulasi Jam Tertentu: {metrics.formattedSimTime}
          </span>
          <span>17:00 (Overtime / Shift 2)</span>
        </div>
        <input
          type="range"
          min="7.0"
          max="17.0"
          step="0.05"
          value={simulatedHour}
          onChange={(e) => setSimulatedHour(e.target.value)}
          className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300"
        />
        <div className="flex justify-between text-[11px] text-slate-500 font-mono px-1">
          <span>07:00</span>
          <span>09:00</span>
          <span>11:00</span>
          <span>13:00</span>
          <span>14:00 (Shift Selesai)</span>
          <span>16:00</span>
          <span>17:00</span>
        </div>
      </div>

      {/* Predictive Milestones & Answers to Operational Questions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Card 1: Bentonite Exhaustion Prediction */}
        <div className="bg-slate-950/80 border border-rose-500/30 p-3 rounded-lg flex items-start gap-3">
          <div className="p-2 bg-rose-500/10 rounded text-rose-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              Prediksi Stok Bentonite Habis
            </div>
            <div className="text-lg font-bold font-mono text-rose-300">
              Pukul {metrics.predictedDepletionTimeStr} WIB
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Sisa buffer: <span className="text-rose-400 font-semibold">{metrics.bentoniteHoursLeft.toFixed(1)} Jam</span> jika pasokan truk terputus.
            </div>
          </div>
        </div>

        {/* Card 2: Silo Buffer Full Prediction */}
        <div className="bg-slate-950/80 border border-amber-500/30 p-3 rounded-lg flex items-start gap-3">
          <div className="p-2 bg-amber-500/10 rounded text-amber-400 shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              Prediksi Bin Silo 72 m³ Penuh
            </div>
            <div className="text-lg font-bold font-mono text-amber-300">
              Pukul {metrics.predictedSiloFullTimeStr} WIB
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Wajib dispatch truk pengangkut dalam <span className="text-amber-400 font-semibold">{metrics.siloHoursUntilFull.toFixed(1)} Jam</span>.
            </div>
          </div>
        </div>

        {/* Card 3: Shift Target Quota Completion */}
        <div className="bg-slate-950/80 border border-emerald-500/30 p-3 rounded-lg flex items-start gap-3">
          <div className="p-2 bg-emerald-500/10 rounded text-emerald-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              Target Shift 140 Ton Selesai
            </div>
            <div className="text-lg font-bold font-mono text-emerald-300">
              Pukul {metrics.predictedShiftCompleteTimeStr} WIB
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Output saat ini: <span className="text-emerald-400 font-semibold">{useIndustrialStore.getState().totalProducedShift.toFixed(1)} / 140 T</span>.
            </div>
          </div>
        </div>
      </div>

      {/* Scheduled Timeline Track */}
      <div className="mt-4 pt-3 border-t border-slate-800/80">
        <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            Jadwal Logistik Ritase Shift Ini (Klik untuk Lompat ke Jam Tersebut):
          </span>
          <span className="text-[11px] text-slate-400">
            Total Inbound: {useIndustrialStore.getState().trucksUnloadedToday} Rit | Outbound: {useIndustrialStore.getState().trucksDispatchedToday} Rit
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
          {scheduledEvents.map((evt) => (
            <button
              key={evt.id}
              onClick={() => setSimulatedHour(evt.hour)}
              className={`shrink-0 px-2.5 py-1.5 rounded-lg border text-left transition-all text-xs font-mono ${
                evt.completed
                  ? 'bg-slate-950/80 border-emerald-500/40 text-emerald-300'
                  : simulatedHour >= evt.hour - 0.25 && simulatedHour < evt.hour
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 animate-pulse'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold">
                <span>{evt.timeStr}</span>
                {evt.completed && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </div>
              <div className="text-[10px] truncate max-w-[150px] text-slate-300 font-sans mt-0.5">
                {evt.title}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
