import React, { useState } from 'react';
import { useIndustrialStore } from '../store/useIndustrialStore';
import { 
  TRIAL_SCENARIOS, 
  LOCAL_INDUSTRY_DYNAMICS, 
  DISPATCH_TIMELINE_PEAK_DAY 
} from '../data/trialScenariosData';
import { 
  Zap, 
  Truck, 
  DollarSign, 
  AlertTriangle, 
  ShieldCheck, 
  Layers, 
  Clock, 
  FileSpreadsheet, 
  Package, 
  Flame, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Landmark,
  Scale
} from 'lucide-react';

export const TrialExtremeScenarioViewer = () => {
  const { 
    appMode, 
    trialScenario, 
    setTrialScenario, 
    isJumboBagBufferActive, 
    toggleJumboBagBuffer,
    isWetSeasonBurnerOverload,
    toggleWetSeasonOverload
  } = useIndustrialStore();

  const [activeTab, setActiveTab] = useState('scenarios'); // 'scenarios' | 'financial' | 'dynamics' | 'dispatch'

  const currentScen = TRIAL_SCENARIOS[trialScenario] || TRIAL_SCENARIOS['SCN-06'];

  return (
    <div className="bg-slate-900 border-2 border-rose-500/60 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-rose-950/30 transition-all">
      {/* Top Banner Alert Mode Trial */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-300 font-mono font-bold text-xs border border-rose-600/50">
              MODE TRIAL AKTIF — EXTREME STRESS-TEST & MULTIPLIER DEMAND
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-600/40">
              DATABASE EXCEL BARU
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Simulasi Kasus Ekstrim: Lonjakan Tender Masif Pemerintah & Megaproyek Nasional
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-4xl">
            Memodelkan dinamika operasi pabrik hingga <strong className="text-rose-400">420 Ton/hari (3x normal)</strong>, 
            beban logistik <strong className="text-amber-300">29 rit truk/hari (@ 30T)</strong>, penegakan regulasi Zero ODOL, 
            lonjakan kadar air musim hujan open-pit, serta analisis likuiditas modal kerja <strong className="text-emerald-400">hingga Rp 145 Miliar</strong>.
          </p>
        </div>

        {/* Action Button: Download New Excel */}
        <div className="flex items-center gap-2">
          <a
            href="./Database_Simulasi_SCADA_dan_Operasional_Expanded_Demand_Range.xlsx"
            download="Database_Simulasi_SCADA_dan_Operasional_Expanded_Demand_Range.xlsx"
            className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/40 border border-emerald-400/50 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Unduh Excel Baru (Model Lengkap)</span>
          </a>
        </div>
      </div>

      {/* Scenario Selector Pills */}
      <div className="my-5">
        <label className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Pilih Skenario Rentang Permintaan (6 Tingkat Kapasitas):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {Object.values(TRIAL_SCENARIOS).map((scen) => {
            const isSelected = trialScenario === scen.code;
            return (
              <button
                key={scen.code}
                onClick={() => setTrialScenario(scen.code)}
                className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-rose-500 shadow-md shadow-rose-950/50 ring-2 ring-rose-500/40'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${scen.badgeClass}`}>
                    {scen.code}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-white">
                    {scen.dailyOutput} T/h
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-200 line-clamp-1">
                  {scen.shortName}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">
                  {scen.hours} Jam • {scen.outboundTrucks} Rit Out
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top 4 Real-Time KPI Cards for Current Scenario */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        {/* Card 1: Output & Armada Truk */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-cyan-400" />
                TRAFIK ARMADA (@ 30 TON)
              </span>
              <span className="text-cyan-400 font-bold">{currentScen.hours} Jam Kerja</span>
            </div>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {currentScen.dailyOutput} <span className="text-sm font-normal text-slate-400">Ton / Hari</span>
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Bulanan: <strong>{currentScen.monthlyOutput.toLocaleString('id-ID')} Ton</strong> (25 Hari)
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Truk Melintas Plant:</span>
            <span className="text-cyan-400 font-bold text-sm">{currentScen.totalTrucksDaily} Rit / Hari</span>
          </div>
        </div>

        {/* Card 2: Finansial & Omzet */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span className="flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                OMZET & LABA KOTOR
              </span>
              <span className="text-emerald-400 font-bold">Margin {currentScen.grossMarginPct}%</span>
            </div>
            <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
              Rp {(currentScen.revenueDaily / 1000000).toFixed(0)} <span className="text-sm font-normal text-slate-400">Juta / Hari</span>
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Laba Harian: <strong>Rp {(currentScen.grossProfitDaily / 1000000).toFixed(1)} Juta</strong>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Laba Bersih Bulanan (Est):</span>
            <span className="text-emerald-300 font-bold text-sm">Rp {(currentScen.monthlyGrossProfit / 1000000000).toFixed(2)} M</span>
          </div>
        </div>

        {/* Card 3: Working Capital Gap (TOP 90 Hari) */}
        <div className="bg-slate-950/80 border border-amber-500/40 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-500/10 rounded-full blur-xl"></div>
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Landmark className="w-3.5 h-3.5 text-amber-400" />
                MODAL KERJA (TOP 90H)
              </span>
              <span className="text-amber-400 text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950 border border-amber-600/40">
                Pemerintah/BUMN
              </span>
            </div>
            <div className="text-2xl font-black font-mono text-amber-300 mt-1">
              Rp {(currentScen.workingCapital90d / 1000000000).toFixed(1)} <span className="text-sm font-normal text-slate-400">Miliar</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              HPP Harian Wajib Ditalangi: Rp {(currentScen.hppDaily / 1000000).toFixed(0)} Jt/hari
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">TOP 60H BUMN:</span>
            <span className="text-slate-200 font-bold">Rp {(currentScen.workingCapital60d / 1000000000).toFixed(1)} M</span>
          </div>
        </div>

        {/* Card 4: Buffer Safety & Emergency Jumbo Bag Toggle */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span className="flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-purple-400" />
                STORAGE BUFFER RISK
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${currentScen.badgeClass}`}>
                {currentScen.riskLevel}
              </span>
            </div>
            <div className="text-sm font-mono text-slate-200 mt-1">
              Stockpile Ben: <strong className="text-amber-300">{currentScen.stockpileReserveHours} Jam</strong> (Habis cepat)
            </div>
            <div className="text-xs font-mono text-slate-400 mt-0.5">
              Silo Produk Jadi: <strong className="text-cyan-300">{currentScen.siloHoldingHours} Jam</strong> (Penuh cepat)
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800/80">
            <button
              onClick={toggleJumboBagBuffer}
              className={`w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold font-mono transition border ${
                isJumboBagBufferActive
                  ? 'bg-purple-600 hover:bg-purple-500 text-white border-purple-400 shadow-md shadow-purple-900/50'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>{isJumboBagBufferActive ? '✓ Buffer Jumbo Bag AKTIF' : '+ Aktifkan Jumbo Bag 1T'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-800 mb-5 gap-2 overflow-x-auto pb-1 font-mono text-xs">
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`px-4 py-2 rounded-t-lg font-bold transition flex items-center gap-2 ${
            activeTab === 'scenarios'
              ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Matriks 6 Skenario Permintaan & Logistik Truk</span>
        </button>

        <button
          onClick={() => setActiveTab('financial')}
          className={`px-4 py-2 rounded-t-lg font-bold transition flex items-center gap-2 ${
            activeTab === 'financial'
              ? 'bg-slate-800 text-emerald-400 border-b-2 border-emerald-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Struktur HPP, Laba, & Modal Kerja (TOP 30H/60H/90H)</span>
        </button>

        <button
          onClick={() => setActiveTab('dynamics')}
          className={`px-4 py-2 rounded-t-lg font-bold transition flex items-center gap-2 ${
            activeTab === 'dynamics'
              ? 'bg-slate-800 text-amber-400 border-b-2 border-amber-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>8 Dinamika Industri Lokal Indonesia & Solusi SOP</span>
        </button>

        <button
          onClick={() => setActiveTab('dispatch')}
          className={`px-4 py-2 rounded-t-lg font-bold transition flex items-center gap-2 ${
            activeTab === 'dispatch'
              ? 'bg-slate-800 text-rose-400 border-b-2 border-rose-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Jadwal Dispatch Peak Day (29 Truk: 07:00 - 23:00)</span>
        </button>
      </div>

      {/* TAB CONTENT 1: MATRIKS 6 SKENARIO */}
      {activeTab === 'scenarios' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-300 border-b border-slate-800 text-[11px]">
                <th className="p-2.5">Kode</th>
                <th className="p-2.5">Nama Skenario Permintaan</th>
                <th className="p-2.5">Konfigurasi Shift</th>
                <th className="p-2.5 text-center">Jam</th>
                <th className="p-2.5 text-right">Output/Hari</th>
                <th className="p-2.5 text-right">Bulanan (25H)</th>
                <th className="p-2.5 text-center">Rit Out (@30T)</th>
                <th className="p-2.5 text-right">Bentonite 80%</th>
                <th className="p-2.5 text-center">Rit Inbound Ben</th>
                <th className="p-2.5 text-center">Total Inbound</th>
                <th className="p-2.5 text-center text-cyan-400">Total Trafik</th>
                <th className="p-2.5">Status Risiko Buffer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {Object.values(TRIAL_SCENARIOS).map((s) => {
                const isCurrent = trialScenario === s.code;
                return (
                  <tr 
                    key={s.code}
                    onClick={() => setTrialScenario(s.code)}
                    className={`cursor-pointer transition ${
                      isCurrent 
                        ? 'bg-rose-950/40 text-white font-bold' 
                        : 'hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <td className="p-2.5 font-bold">
                      <span className={`px-1.5 py-0.5 rounded border text-[10px] ${s.badgeClass}`}>
                        {s.code}
                      </span>
                    </td>
                    <td className="p-2.5 font-sans font-semibold text-white">
                      {s.name}
                    </td>
                    <td className="p-2.5 text-slate-400">{s.shiftType}</td>
                    <td className="p-2.5 text-center">{s.hours}</td>
                    <td className="p-2.5 text-right font-bold text-white">{s.dailyOutput} T</td>
                    <td className="p-2.5 text-right">{s.monthlyOutput.toLocaleString('id-ID')} T</td>
                    <td className="p-2.5 text-center font-bold text-amber-300">{s.outboundTrucks} Rit</td>
                    <td className="p-2.5 text-right">{s.bentoniteTon} T</td>
                    <td className="p-2.5 text-center">{s.inboundBentonite} Rit</td>
                    <td className="p-2.5 text-center">{s.totalInboundTrucks} Rit</td>
                    <td className="p-2.5 text-center font-bold text-cyan-400">{s.totalTrucksDaily} Rit / Hari</td>
                    <td className="p-2.5 text-xs text-slate-300">{s.riskLevel}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-[11px] text-slate-500 mt-2 font-mono italic">
            * Klik pada baris skenario untuk langsung mensimulasikan nilai dan parameternya ke seluruh sistem dashboard.
          </p>
        </div>
      )}

      {/* TAB CONTENT 2: FINANSIAL & MODAL KERJA */}
      {activeTab === 'financial' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-300 border-b border-slate-800 text-[11px]">
                <th className="p-2.5">Kode</th>
                <th className="p-2.5 text-right">Output/Hari</th>
                <th className="p-2.5 text-right">Total HPP / Hari</th>
                <th className="p-2.5 text-right">HPP / Ton</th>
                <th className="p-2.5 text-right">Omzet Harian</th>
                <th className="p-2.5 text-right">Laba Kotor / Hari</th>
                <th className="p-2.5 text-center">Margin %</th>
                <th className="p-2.5 text-right text-emerald-400">Laba Kotor Bulanan</th>
                <th className="p-2.5 text-right text-amber-400">Modal Kerja 60H (BUMN)</th>
                <th className="p-2.5 text-right text-rose-400">Modal Kerja 90H (Pemerintah)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {Object.values(TRIAL_SCENARIOS).map((s) => {
                const isCurrent = trialScenario === s.code;
                return (
                  <tr 
                    key={s.code}
                    className={`transition ${isCurrent ? 'bg-emerald-950/30 text-white font-bold' : 'hover:bg-slate-800/40 text-slate-300'}`}
                  >
                    <td className="p-2.5 font-bold">{s.code}</td>
                    <td className="p-2.5 text-right">{s.dailyOutput} Ton</td>
                    <td className="p-2.5 text-right">Rp {(s.hppDaily).toLocaleString('id-ID')}</td>
                    <td className="p-2.5 text-right">Rp {(s.hppPerTon).toLocaleString('id-ID')}</td>
                    <td className="p-2.5 text-right">Rp {(s.revenueDaily).toLocaleString('id-ID')}</td>
                    <td className="p-2.5 text-right font-bold text-emerald-400">Rp {(s.grossProfitDaily).toLocaleString('id-ID')}</td>
                    <td className="p-2.5 text-center">{s.grossMarginPct}%</td>
                    <td className="p-2.5 text-right font-bold text-emerald-300">Rp {(s.monthlyGrossProfit / 1000000).toFixed(0)} Jt</td>
                    <td className="p-2.5 text-right font-bold text-amber-300">Rp {(s.workingCapital60d / 1000000000).toFixed(2)} M</td>
                    <td className="p-2.5 text-right font-bold text-rose-400">Rp {(s.workingCapital90d / 1000000000).toFixed(2)} M</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-3 p-3 rounded-lg bg-amber-950/40 border border-amber-600/40 text-xs text-amber-200 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>Peringatan Likuiditas C-Level:</strong> Pada tender masif pemerintah (SCN-06), 
              omzet mencapai <strong>Rp 1,83 Miliar/hari</strong>, namun beban modal kerja tertahan (HPP) selama 90 hari masa tunggu BAST 
              mencapai <strong>Rp 145,03 Miliar</strong>. Tanpa fasilitas perbankan seperti Supply Chain Financing (SCF) atau Surat Kredit Berdokumen Dalam Negeri (SKBDN), arus kas operasional pabrik berisiko mengalami defisit fatal.
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: 8 DINAMIKA INDUSTRI LOKAL */}
      {activeTab === 'dynamics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LOCAL_INDUSTRY_DYNAMICS.map((dyn) => (
            <div 
              key={dyn.no}
              className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px]">
                      {dyn.no}
                    </span>
                    {dyn.title}
                  </span>
                  <span className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {dyn.affectedScenarios}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">
                  <strong>Kondisi Riil:</strong> {dyn.realWorldContext}
                </p>
                <div className="text-[11px] text-rose-300 bg-rose-950/30 p-2 rounded-lg border border-rose-900/50 mb-2">
                  <strong>Dampak SCADA:</strong> {dyn.scadaImpact}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  <strong>Sensitivitas Batasan:</strong> {dyn.sensitivityThreshold}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800 text-xs text-emerald-300 bg-emerald-950/20 p-2 rounded-lg border border-emerald-900/40">
                <span className="font-bold text-emerald-400">SOP Mitigasi Teruji:</span> {dyn.mitigationStrategy}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT 4: JADWAL DISPATCH 29 TRUK */}
      {activeTab === 'dispatch' && (
        <div className="overflow-x-auto">
          <div className="mb-2 text-xs text-slate-300 flex items-center justify-between">
            <span>Simulasi Jadwal Beban Puncak 24 Jam: <strong>15 Rit Truk Inbound + 14 Rit Truk Outbound (Total 29 Rit)</strong></span>
            <span className="text-cyan-400 font-mono text-[11px]">Jembatan Timbang EQ-WB-01</span>
          </div>
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-300 border-b border-slate-800 text-[11px]">
                <th className="p-2">Jam (WIB)</th>
                <th className="p-2">Status SCADA</th>
                <th className="p-2 text-amber-300">Inbound Truk Masuk</th>
                <th className="p-2 text-cyan-300">Outbound Truk Keluar</th>
                <th className="p-2 text-right">In (T)</th>
                <th className="p-2 text-right">Out (T)</th>
                <th className="p-2 text-right">Stockpile Ben</th>
                <th className="p-2 text-right">Level Silo</th>
                <th className="p-2">Catatan Kontrol Logistik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {DISPATCH_TIMELINE_PEAK_DAY.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-850/60 text-slate-300">
                  <td className="p-2 font-bold text-white whitespace-nowrap">{row.time}</td>
                  <td className="p-2 text-[11px] text-slate-400">{row.status}</td>
                  <td className="p-2 text-amber-300 font-semibold">{row.inTruck}</td>
                  <td className="p-2 text-cyan-300 font-semibold">{row.outTruck}</td>
                  <td className="p-2 text-right">{row.tonsIn} T</td>
                  <td className="p-2 text-right font-bold text-white">{row.tonsOut} T</td>
                  <td className="p-2 text-right text-amber-300">{row.stockpileBen} T</td>
                  <td className="p-2 text-right font-bold text-cyan-400">{row.siloLevel} T</td>
                  <td className="p-2 text-slate-400 text-[11px] font-sans">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
