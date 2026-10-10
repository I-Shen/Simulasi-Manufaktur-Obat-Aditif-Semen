import React, { useEffect } from 'react';
import { useIndustrialStore } from './store/useIndustrialStore';
import { HeaderNavbar } from './components/HeaderNavbar';
import { TrialExtremeScenarioViewer } from './components/TrialExtremeScenarioViewer';
import { TimeMachineControlPanel } from './components/TimeMachineControlPanel';
import { SCADAMimicDiagram } from './components/SCADAMimicDiagram';
import { ProductionCycleCards } from './components/ProductionCycleCards';
import { InteractiveControlSliders } from './components/InteractiveControlSliders';
import { CostAndFinancialCards } from './components/CostAndFinancialCards';
import { BottleneckAndDowntimeSimulator } from './components/BottleneckAndDowntimeSimulator';
import { ChartsPanel } from './components/ChartsPanel';
import { 
  ShieldAlert, 
  Info, 
  FileSpreadsheet, 
  Sparkles, 
  CheckCircle,
  Factory,
  Zap,
  ShieldCheck
} from 'lucide-react';

export function App() {
  const { tickSimulation, appMode, trialScenario } = useIndustrialStore();
  const isTrial = appMode === 'trial';

  // Smooth simulation loop (every 100ms with delta 0.1s)
  useEffect(() => {
    const timer = setInterval(() => {
      tickSimulation(0.1);
    }, 100);
    return () => clearInterval(timer);
  }, [tickSimulation]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 1. Header Navbar with Mode Normal & Mode Trial Toggle */}
      <HeaderNavbar />

      {/* Main Container */}
      <main className="flex-1 p-4 lg:p-6 max-w-[1680px] w-full mx-auto space-y-5">
        
        {/* Dynamic Mode Notification Banner */}
        {isTrial ? (
          <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-amber-950/80 border border-rose-500/60 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-lg shadow-rose-950/40">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded bg-rose-600 text-white font-black font-mono text-[11px] animate-pulse">
                MODE TRIAL AKTIF
              </span>
              <span className="text-white font-semibold">
                Memuat Kasus Ekstrim: Skenario {trialScenario} (Menggunakan Database Excel Baru)
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-300 font-mono text-[11px]">
              <span>Tender Pemerintah: <strong className="text-rose-400">Hingga 420 T / Hari</strong></span>
              <span>•</span>
              <span>Armada Melintas: <strong className="text-amber-300">29 Rit Truk / Hari</strong></span>
              <span>•</span>
              <span>Modal Kerja TOP 90H: <strong className="text-emerald-400">Rp 145 Miliar</strong></span>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800/60 font-mono text-[10px] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                MODE NORMAL (EXCEL ASLI)
              </span>
              <span className="text-slate-300 font-medium">
                Data Model Baseline: 1 Shift Reguler (140 Ton / Hari, 7 Jam Kerja Efektif, 4-5 Rit Truk)
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
              <span>Baseline Capex: <strong>Rp 5,15 Miliar</strong></span>
              <span>•</span>
              <span>Target Produksi: <strong>3.500 Ton / Bulan</strong></span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Margin Kotor: Rp 628.494/T (14,45%)</span>
              <span>•</span>
              <span className="text-cyan-400">Excel Original Synced</span>
            </div>
          </div>
        )}

        {/* 2. TRIAL EXTREME SCENARIO VIEWER (Hanya tampil saat Mode Trial aktif) */}
        {isTrial && <TrialExtremeScenarioViewer />}

        {/* 3. Virtual Time Machine & Scenario Runtime Controller */}
        <TimeMachineControlPanel />

        {/* 4. Interactive SCADA Process Flow Mimic */}
        <SCADAMimicDiagram />

        {/* 5. Interactive Parameter Controls & Reactive Sliders */}
        <InteractiveControlSliders />

        {/* 6. Production Capacity & Cycle Time Cards */}
        <ProductionCycleCards />

        {/* 7. Cost Cycle, HPP Breakdown & Financial Feasibility */}
        <CostAndFinancialCards />

        {/* 8. Bottleneck Scenarios & Downtime Financial Loss Calculator */}
        <BottleneckAndDowntimeSimulator />

        {/* 9. SCADA Telemetry Gauges & Analytics Charts */}
        <ChartsPanel />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-5 px-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Factory className="w-4 h-4 text-cyan-500" />
            <span className="text-slate-400 font-bold">PT. MINERAL ADITIF NUSANTARA</span>
            <span>— Industrial Process & Logistics Twin</span>
          </div>
          <div>
            Built with React 19, Tailwind CSS, Zustand Reactive Engine & Apache ECharts.
          </div>
          <div className="text-slate-600">
            Document Reference: <span className="text-slate-400">Database_Simulasi_SCADA_dan_Operasional.xlsx & Expanded Scenarios</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
