import React from 'react';
import { useIndustrialStore } from '../store/useIndustrialStore';
import { 
  AlertTriangle, 
  Truck, 
  Wrench, 
  ZapOff, 
  ShieldCheck, 
  Clock, 
  TrendingDown, 
  DollarSign, 
  Flame, 
  Users,
  FlameKindling
} from 'lucide-react';

export const BottleneckAndDowntimeSimulator = () => {
  const { 
    activeBottleneck, 
    setBottleneck, 
    downtimeHours, 
    setDowntimeHours,
    capacityPerHour,
    fuelType,
    getMetrics 
  } = useIndustrialStore();

  const m = getMetrics();

  const scenarios = [
    {
      id: 'none',
      name: 'Normal Operation',
      icon: ShieldCheck,
      color: 'emerald',
      desc: 'Plant berjalan stabil tanpa hambatan logistik maupun mesin.',
      defaultHrs: 0
    },
    {
      id: 'truk_macet',
      name: 'Truk Macet / Terlambat',
      icon: Truck,
      color: 'amber',
      desc: 'Armada Bentonite tertahan kemacetan rute logistik. Output hilang 70 Ton (Excel: DWT-261002-01).',
      defaultHrs: 3.5
    },
    {
      id: 'mesin_rusak',
      name: 'Mesin Rusak / Rotary Burner Trip',
      icon: Wrench,
      color: 'red',
      desc: 'Kegagalan mekanikal rotary drum / burner trip. Output hilang 40 Ton (Excel: DWT-261003-02).',
      defaultHrs: 2.0
    },
    {
      id: 'lampu_mati',
      name: 'Lampu Mati / Blackout PLN 100 kW',
      icon: ZapOff,
      color: 'purple',
      desc: 'Padamnya suplai daya PLN 125 kVA menghentikan motor & burner. Output hilang 50 Ton (Excel: DWT-261004-01).',
      defaultHrs: 2.5
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h2 className="text-base font-bold text-white tracking-wide uppercase">
            Simulator Skenario Bottleneck & Kalkulator Kerugian Downtime
          </h2>
        </div>
        <span className="text-xs font-mono text-cyan-400">
          Revisi Excel: Formula Bahan Bakar Terbuang & Kehilangan Margin Laba
        </span>
      </div>

      {/* Scenario Switcher Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {scenarios.map((sc) => {
          const Icon = sc.icon;
          const isSelected = activeBottleneck === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => setBottleneck(sc.id)}
              className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? sc.color === 'emerald'
                    ? 'bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-500/20'
                    : sc.color === 'amber'
                    ? 'bg-amber-950/60 border-amber-500 shadow-lg shadow-amber-500/20'
                    : sc.color === 'red'
                    ? 'bg-red-950/60 border-red-500 shadow-lg shadow-red-500/20'
                    : 'bg-purple-950/60 border-purple-500 shadow-lg shadow-purple-500/20'
                  : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${
                      sc.color === 'emerald' ? 'text-emerald-400' :
                      sc.color === 'amber' ? 'text-amber-400' :
                      sc.color === 'red' ? 'text-red-400' : 'text-purple-400'
                    }`} />
                    <span className="font-bold text-xs text-white tracking-wide">{sc.name}</span>
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{sc.desc}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Downtime Bawaan:</span>
                <span className="font-bold text-slate-200">{sc.defaultHrs} Jam</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Slider & Financial Loss Breakdown Box */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Durasi Terhenti (Downtime Duration):
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Geser untuk menyimulasikan dampak waktu mati pabrik secara real-time
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-mono font-bold text-red-400">
              {downtimeHours.toFixed(1)}
            </span>
            <span className="text-xs font-mono text-slate-400">Jam Terhenti</span>
          </div>
        </div>

        {/* Range Slider */}
        <div className="mb-6">
          <input
            type="range"
            min="0"
            max="12"
            step="0.5"
            value={downtimeHours}
            onChange={(e) => setDowntimeHours(e.target.value)}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>0 Jam (Normal)</span>
            <span>2.0 Jam (Mesin Rusak)</span>
            <span>2.5 Jam (Lampu Mati)</span>
            <span>3.5 Jam (Truk Macet)</span>
            <span>7 Jam (1 Shift Penuh)</span>
            <span>12 Jam</span>
          </div>
        </div>

        {/* 5 Cards: Breakdown Kerugian Finansial Sesuai Revisi Excel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Card 1: Lost Tonnage */}
          <div className="bg-slate-900 border border-slate-800/80 rounded p-3">
            <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
              Kehilangan Output
            </span>
            <div className="text-lg font-mono font-bold text-amber-400">
              {m.lostTonnage.toFixed(1)} <span className="text-xs font-normal text-slate-400">Ton</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Setara {(m.lostTonnage / 30).toFixed(1)} rit pengiriman batal
            </p>
          </div>

          {/* Card 2: Idle Labor Cost */}
          <div className="bg-slate-900 border border-slate-800/80 rounded p-3">
            <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
              SDM Menganggur (10 Org)
            </span>
            <div className="text-lg font-mono font-bold text-slate-200">
              Rp {Math.round(m.biayaSdmMenganggur).toLocaleString('id-ID')}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Tarif: Rp {Math.round(m.idleLaborCostPerHour).toLocaleString('id-ID')} / Jam
            </p>
          </div>

          {/* Card 3: Bahan Bakar Terbuang (Revisi Point 1 & 2) */}
          <div className="bg-slate-900 border border-amber-500/30 rounded p-3 bg-amber-950/10">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-amber-300 font-semibold uppercase block">
                Bahan Bakar Terbuang
              </span>
              <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 font-mono">
                Revisi Point 1 & 2
              </span>
            </div>
            <div className="text-lg font-mono font-bold text-orange-400">
              Rp {Math.round(m.bahanBakarTerbuang).toLocaleString('id-ID')}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Rumus: {downtimeHours.toFixed(1)}j × {((m.gasConsumptionMmbtuPerHour || 6.732)).toFixed(2)} MMBTU × Rp {fuelType === 'PGN' ? '234.000' : '279.000'}
            </p>
          </div>

          {/* Card 4: Kehilangan Margin Laba (Revisi Point 3) */}
          <div className="bg-slate-900 border border-cyan-500/30 rounded p-3 bg-cyan-950/10">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-cyan-300 font-semibold uppercase block">
                Kehilangan Laba Margin
              </span>
              <span className="text-[9px] px-1 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-mono">
                Revisi Point 3
              </span>
            </div>
            <div className="text-lg font-mono font-bold text-cyan-400">
              Rp {Math.round(m.kehilanganLabaMargin).toLocaleString('id-ID')}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Rumus: {m.lostTonnage.toFixed(0)} Ton × Rp 628.494 (Margin/Ton)
            </p>
          </div>

          {/* Card 5: Total Kerugian Finansial */}
          <div className="bg-red-950/40 border border-red-500/50 rounded p-3 relative overflow-hidden">
            <span className="text-[10px] font-mono text-red-300 font-bold uppercase block mb-1">
              TOTAL KERUGIAN DOWNTIME
            </span>
            <div className="text-lg font-mono font-bold text-red-400">
              Rp {Math.round(m.totalDowntimeLoss).toLocaleString('id-ID')}
            </div>
            <p className="text-[10px] text-red-400/80 mt-1">
              SDM + Gas Terbuang + Margin Hilang
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
