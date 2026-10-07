import React from 'react';
import { useIndustrialStore } from '../store/useIndustrialStore';
import { 
  Sliders, 
  Flame, 
  Calendar, 
  Gauge, 
  DollarSign, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const InteractiveControlSliders = () => {
  const {
    capacityPerHour,
    setCapacityPerHour,
    workingDaysPerMonth,
    setWorkingDays,
    fuelType,
    setFuelType,
    sellingPricePerTon,
    setSellingPrice,
    getMetrics
  } = useIndustrialStore();

  const m = getMetrics();

  const handleResetDefaults = () => {
    setCapacityPerHour(20);
    setWorkingDays(25);
    setFuelType('CNG');
    setSellingPrice(4350000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-cyan-400" />
          <h2 className="text-base font-bold text-white tracking-wide uppercase">
            Panel Kontrol Parameter & Simulasi Reaktif
          </h2>
        </div>
        <button
          onClick={handleResetDefaults}
          className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition border border-slate-700"
        >
          <RefreshCw className="w-3 h-3" />
          Reset Baseline Excel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Slider 1: Kapasitas Ton / Jam */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              Kapasitas Produksi
            </span>
            <span className="text-sm font-mono font-bold text-cyan-400">
              {capacityPerHour} T/Jam
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="30"
            step="1"
            value={capacityPerHour}
            onChange={(e) => setCapacityPerHour(e.target.value)}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>10 T/h (50%)</span>
            <span className="text-cyan-400 font-bold">20 T/h (Desain)</span>
            <span>30 T/h (150%)</span>
          </div>
        </div>

        {/* Control 2: Hari Kerja per Bulan */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Hari Kerja Operasi
            </span>
            <span className="text-sm font-mono font-bold text-amber-400">
              {workingDaysPerMonth} Hari / Bln
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1 mt-2">
            {[10, 15, 20, 25, 30].map((d) => (
              <button
                key={d}
                onClick={() => setWorkingDays(d)}
                className={`py-1.5 text-xs font-mono font-bold rounded transition border ${
                  workingDaysPerMonth === d
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {d}h
              </button>
            ))}
          </div>
          <span className="text-[10px] text-slate-500 font-mono block mt-2 text-center">
            {workingDaysPerMonth === 25 ? '★ Standar Utama Laporan Excel' : `${workingDaysPerMonth * 7} Jam Operasi/Bulan`}
          </span>
        </div>

        {/* Control 3: Tipe Bahan Bakar Gas */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              Bahan Bakar Burner
            </span>
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
              fuelType === 'PGN' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-300'
            }`}>
              {fuelType}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              onClick={() => setFuelType('CNG')}
              className={`p-2 rounded text-left border transition ${
                fuelType === 'CNG'
                  ? 'bg-orange-500/20 border-orange-500/50 text-orange-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="text-xs font-bold block">Gas CNG</span>
              <span className="text-[10px] font-mono text-slate-400 block">$15.15 / MMBTU</span>
              <span className="text-[10px] font-mono text-orange-400 font-semibold block">Rp 279.000/MMBTU</span>
            </button>

            <button
              onClick={() => setFuelType('PGN')}
              className={`p-2 rounded text-left border transition ${
                fuelType === 'PGN'
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200 shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold block">Gas PGN</span>
                <Sparkles className="w-3 h-3 text-emerald-400" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 block">$13.00 / MMBTU</span>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold block">Rp 234.000/MMBTU</span>
            </button>
          </div>
        </div>

        {/* Slider 4: Harga Jual Pasar (Selling Price) */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              Harga Jual Pasar
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              Rp {(sellingPricePerTon / 1000).toLocaleString('id-ID')}k/T
            </span>
          </div>
          <input
            type="range"
            min="3500000"
            max="5500000"
            step="50000"
            value={sellingPricePerTon}
            onChange={(e) => setSellingPrice(e.target.value)}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>Rp 3,5 M</span>
            <span className="text-emerald-400 font-bold">Rp 4,35 M (Excel)</span>
            <span>Rp 5,5 M</span>
          </div>
        </div>
      </div>
    </div>
  );
};
