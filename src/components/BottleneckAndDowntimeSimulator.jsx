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
      desc: 'Armada Bentonite 5 rit/hari tertahan kemacetan. Stok 134,4 T habis dlm 8,4 jam -> Plant Starvation!',
      defaultHrs: 8.4
    },
    {
      id: 'mesin_rusak',
      name: 'Mesin Rusak / Rotary Burner Trip',
      icon: Wrench,
      color: 'red',
      desc: 'Kegagalan mekanikal motor rotary dryer atau burner padam. Butuh perbaikan & reheating drum.',
      defaultHrs: 4.0
    },
    {
      id: 'lampu_mati',
      name: 'Lampu Mati / Blackout PLN 100 kW',
      icon: ZapOff,
      color: 'purple',
      desc: 'Padamnya suplai daya PLN 125 kVA menghentikan seluruh motor penggerak & burner seketika.',
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
        <span className="text-xs font-mono text-slate-400">
          Uji Ketahanan Sistem & Biaya Risiko Operasional
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
              Geser untuk menyimulasikan dampak waktu mati pabrik
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
            max="24"
            step="0.5"
            value={downtimeHours}
            onChange={(e) => setDowntimeHours(e.target.value)}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>0 Jam (Normal)</span>
            <span>4 Jam (Ganti Suku Cadang)</span>
            <span>8.4 Jam (Bentonite Kosong)</span>
            <span>16 Jam</span>
            <span>24 Jam (Mati Penuh)</span>
          </div>
        </div>

        {/* 4 Cards: Breakdown Kerugian Finansial */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Loss 1: Lost Tonnage */}
          <div className="bg-slate-900 border border-slate-800/80 rounded p-3">
            <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
              Kehilangan Output Produk
            </span>
            <div className="text-lg font-mono font-bold text-amber-400">
              {m.lostTonnage.toFixed(1)} <span className="text-xs font-normal text-slate-400">Ton</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Setara {(m.lostTonnage / 30).toFixed(1)} rit truk pengiriman batal
            </p>
          </div>

          {/* Loss 2: Idle Labor Cost */}
          <div className="bg-slate-900 border border-slate-800/80 rounded p-3">
            <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
              Beban SDM Menganggur (10 Orang)
            </span>
            <div className="text-lg font-mono font-bold text-slate-200">
              Rp {Math.round(m.idleLaborCostPerHour * downtimeHours).toLocaleString('id-ID')}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Tarif: Rp {Math.round(m.idleLaborCostPerHour).toLocaleString('id-ID')} / Jam operasional
            </p>
          </div>

          {/* Loss 3: Reheat Burner Penalty */}
          <div className="bg-slate-900 border border-slate-800/80 rounded p-3">
            <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
              Wasted Reheat & Pembersihan
            </span>
            <div className="text-lg font-mono font-bold text-orange-400">
              Rp {downtimeHours > 0 ? (fuelType === 'CNG' ? '20.500.000' : '17.200.000') : '0'}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Biaya gas pemanasan awal drum & purging
            </p>
          </div>

          {/* Loss 4: Total Financial Damage */}
          <div className="bg-red-950/40 border border-red-500/50 rounded p-3 relative overflow-hidden">
            <span className="text-[10px] font-mono text-red-300 font-bold uppercase block mb-1">
              TOTAL KERUGIAN FINANSIAL
            </span>
            <div className="text-lg font-mono font-bold text-red-400">
              Rp {Math.round(m.totalDowntimeLoss).toLocaleString('id-ID')}
            </div>
            <p className="text-[10px] text-red-400/80 mt-1">
              Termasuk hilangnya potensi gross profit margin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
