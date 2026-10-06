import React from 'react';
import { useIndustrialStore } from '../store/useIndustrialStore';
import { 
  DollarSign, 
  TrendingUp, 
  Coins, 
  Sparkles, 
  Flame, 
  Users, 
  Wrench, 
  ShieldAlert,
  ArrowUpRight,
  Clock,
  CheckCircle2
} from 'lucide-react';

export const CostAndFinancialCards = () => {
  const { 
    sellingPricePerTon, 
    fuelType, 
    capexInvestment,
    workingDaysPerMonth,
    getMetrics 
  } = useIndustrialStore();

  const m = getMetrics();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-white tracking-wide uppercase">
            Analisis Biaya Siklus Produksi & Kelayakan Finansial (HPP & BEP)
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {fuelType === 'PGN' ? (
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Hemat PGN: +Rp {((m?.monthlyPgnSavings ?? 0) / 1000000).toFixed(1)} Jt/Bln
            </span>
          ) : (
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-950/40 text-amber-300 border border-amber-500/30">
              Fuel: CNG ($15.15/MMBTU)
            </span>
          )}
        </div>
      </div>

      {/* Top 4 Key Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {/* Card 1: HPP / Ton */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-4">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
            HPP (Cost of Goods Sold)
          </span>
          <div className="text-xl lg:text-2xl font-mono font-bold text-white tracking-tight">
            Rp {Math.round(m?.hppPerTon ?? 0).toLocaleString('id-ID')}
            <span className="text-xs font-normal text-slate-400"> / Ton</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">Bahan Baku:</span>
            <span className="text-slate-200 font-semibold">Rp {(m?.rawMaterialCostPerTon ?? 0).toLocaleString('id-ID')} (96%)</span>
          </div>
        </div>

        {/* Card 2: Selling Price & Margin */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-4">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
            Harga Jual & Margin Kotor
          </span>
          <div className="text-xl lg:text-2xl font-mono font-bold text-cyan-400 tracking-tight">
            Rp {(sellingPricePerTon ?? 0).toLocaleString('id-ID')}
            <span className="text-xs font-normal text-slate-400"> / Ton</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">Gross Margin:</span>
            <span className="text-emerald-400 font-bold">
              +{(m?.grossMarginPct ?? 0).toFixed(1)}% (+Rp {Math.round(m?.grossMarginPerTon ?? 0).toLocaleString('id-ID')})
            </span>
          </div>
        </div>

        {/* Card 3: Projected Monthly Net Profit */}
        <div className="bg-slate-950/70 border border-emerald-900/40 rounded-lg p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none"></div>
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
            Laba Bersih Bulanan (50% Rule)
          </span>
          <div className="text-xl lg:text-2xl font-mono font-bold text-emerald-400 tracking-tight">
            Rp {((m?.monthlyNetProfit ?? 0) / 1000000000).toFixed(2)} Miliar
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">Revenue Bulanan:</span>
            <span className="text-slate-200 font-semibold">Rp {((m?.monthlyRevenue ?? 0) / 1000000000).toFixed(2)} M</span>
          </div>
        </div>

        {/* Card 4: BEP Payback Horizon */}
        <div className="bg-slate-950/70 border border-cyan-900/40 rounded-lg p-4">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
            Periode Balik Modal (BEP)
          </span>
          <div className="text-xl lg:text-2xl font-mono font-bold text-amber-400 tracking-tight flex items-baseline gap-1.5">
            {(m?.bepMonths ?? 0).toFixed(1)} <span className="text-sm font-semibold text-slate-300">Bulan</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">Basis Capex:</span>
            <span className="text-slate-300 font-semibold">Rp {((capexInvestment ?? 0) / 1000000000).toFixed(2)} Miliar</span>
          </div>
        </div>
      </div>

      {/* Detailed Cost Cycle Table (Per Shift, 10 Days, 20 Days, 25 Days) */}
      <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-900/80 text-slate-400 uppercase border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">Komponen Biaya Siklus</th>
              <th className="py-2.5 px-3 text-right">Biaya / Ton</th>
              <th className="py-2.5 px-3 text-right">Per Shift (7 Jam / 140 T)</th>
              <th className="py-2.5 px-3 text-right">10 Hari (1.400 T)</th>
              <th className="py-2.5 px-3 text-right">20 Hari (2.800 T)</th>
              <th className="py-2.5 px-3 text-right text-cyan-400 font-bold bg-cyan-950/20">25 Hari (3.500 T Target)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-slate-300">
            <tr>
              <td className="py-2 px-3 font-medium text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Bahan Baku (Bentonite, Calsium, Soda Ash)
              </td>
              <td className="py-2 px-3 text-right">Rp {m.rawMaterialCostPerTon.toLocaleString('id-ID')}</td>
              <td className="py-2 px-3 text-right">Rp {(m.rawMaterialCostPerTon * 140 / 1000000).toFixed(1)} Jt</td>
              <td className="py-2 px-3 text-right">Rp {(m.rawMaterialCostPerTon * 1400 / 1000000000).toFixed(2)} M</td>
              <td className="py-2 px-3 text-right">Rp {(m.rawMaterialCostPerTon * 2800 / 1000000000).toFixed(2)} M</td>
              <td className="py-2 px-3 text-right text-cyan-300 font-bold bg-cyan-950/20">Rp {(m.rawMaterialCostPerTon * 3500 / 1000000000).toFixed(2)} M</td>
            </tr>
            <tr>
              <td className="py-2 px-3 text-slate-300 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> Energi Burner Gas ({fuelType})
              </td>
              <td className="py-2 px-3 text-right">Rp {m.fuelCostPerTon.toLocaleString('id-ID')}</td>
              <td className="py-2 px-3 text-right">Rp {(m.fuelCostPerTon * 140 / 1000000).toFixed(1)} Jt</td>
              <td className="py-2 px-3 text-right">Rp {(m.fuelCostPerTon * 1400 / 1000000).toFixed(1)} Jt</td>
              <td className="py-2 px-3 text-right">Rp {(m.fuelCostPerTon * 2800 / 1000000).toFixed(1)} Jt</td>
              <td className="py-2 px-3 text-right font-bold bg-cyan-950/20">Rp {(m.fuelCostPerTon * 3500 / 1000000).toFixed(1)} Jt</td>
            </tr>
            <tr>
              <td className="py-2 px-3 text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Listrik PLN 100 kW & Solar Forklift
              </td>
              <td className="py-2 px-3 text-right">Rp {(m.electricityCostPerTon + m.forkliftCostPerTon).toLocaleString('id-ID')}</td>
              <td className="py-2 px-3 text-right">Rp {((m.electricityCostPerTon + m.forkliftCostPerTon) * 140 / 1000000).toFixed(1)} Jt</td>
              <td className="py-2 px-3 text-right">Rp {((m.electricityCostPerTon + m.forkliftCostPerTon) * 1400 / 1000000).toFixed(1)} Jt</td>
              <td className="py-2 px-3 text-right">Rp {((m.electricityCostPerTon + m.forkliftCostPerTon) * 2800 / 1000000).toFixed(1)} Jt</td>
              <td className="py-2 px-3 text-right font-bold bg-cyan-950/20">Rp {((m.electricityCostPerTon + m.forkliftCostPerTon) * 3500 / 1000000).toFixed(1)} Jt</td>
            </tr>
            <tr>
              <td className="py-2 px-3 text-slate-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" /> Tenaga Kerja Langsung (10 Manpower)
              </td>
              <td className="py-2 px-3 text-right">Rp {Math.round(m.laborCostPerTon).toLocaleString('id-ID')}</td>
              <td className="py-2 px-3 text-right">Rp {(66875000 / workingDaysPerMonth / 1000000).toFixed(1)} Jt</td>
              <td className="py-2 px-3 text-right">Rp 66,88 Jt</td>
              <td className="py-2 px-3 text-right">Rp 66,88 Jt</td>
              <td className="py-2 px-3 text-right font-bold bg-cyan-950/20">Rp 66,88 Jt</td>
            </tr>
            <tr className="bg-slate-900/90 font-bold border-t-2 border-slate-700">
              <td className="py-2.5 px-3 text-white">TOTAL BIAYA HPP (CGS)</td>
              <td className="py-2.5 px-3 text-right text-cyan-400">Rp {Math.round(m.hppPerTon).toLocaleString('id-ID')}</td>
              <td className="py-2.5 px-3 text-right text-white">Rp {(m.hppPerTon * 140 / 1000000).toFixed(1)} Jt</td>
              <td className="py-2.5 px-3 text-right text-white">Rp {(m.hppPerTon * 1400 / 1000000000).toFixed(2)} M</td>
              <td className="py-2.5 px-3 text-right text-white">Rp {(m.hppPerTon * 2800 / 1000000000).toFixed(2)} M</td>
              <td className="py-2.5 px-3 text-right text-cyan-300 bg-cyan-950/40">Rp {(m.hppPerTon * 3500 / 1000000000).toFixed(2)} M</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
