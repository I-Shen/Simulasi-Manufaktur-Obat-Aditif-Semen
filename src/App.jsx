import React, { useEffect } from 'react';
import { useIndustrialStore } from './store/useIndustrialStore';
import { HeaderNavbar } from './components/HeaderNavbar';
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
  Factory
} from 'lucide-react';

export function App() {
  const { tickSimulation } = useIndustrialStore();

  // Smooth simulation loop (every 100ms with delta 0.1s)
  useEffect(() => {
    const timer = setInterval(() => {
      tickSimulation(0.1);
    }, 100);
    return () => clearInterval(timer);
  }, [tickSimulation]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 1. Header Navbar */}
      <HeaderNavbar />

      {/* Main Container */}
      <main className="flex-1 p-4 lg:p-6 max-w-[1680px] w-full mx-auto space-y-5">
        
        {/* Top Confidential Notice Banner */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-lg px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 font-bold border border-red-800/60 font-mono text-[10px]">
              CONFIDENTIAL DATA
            </span>
            <span className="text-slate-300 font-medium">
              Data Model: Kapasitas Area Storage & Trafic Material (Bulk Mixing & Drying Raw Material)
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
            <span>Baseline Capex: <strong>Rp 5,15 Miliar</strong></span>
            <span>•</span>
            <span>Target Produksi: <strong>3.500 Ton / Bulan</strong></span>
            <span>•</span>
            <span className="text-cyan-400">Time-Machine Simulation Active</span>
          </div>
        </div>

        {/* 2. Virtual Time Machine & Scenario Runtime Controller */}
        <TimeMachineControlPanel />

        {/* 3. Interactive SCADA Process Flow Mimic */}
        <SCADAMimicDiagram />

        {/* 3. Interactive Parameter Controls & Reactive Sliders */}
        <InteractiveControlSliders />

        {/* 4. Production Capacity & Cycle Time Cards */}
        <ProductionCycleCards />

        {/* 5. Cost Cycle, HPP Breakdown & Financial Feasibility */}
        <CostAndFinancialCards />

        {/* 6. Bottleneck Scenarios & Downtime Financial Loss Calculator */}
        <BottleneckAndDowntimeSimulator />

        {/* 7. SCADA Telemetry Gauges & Analytics Charts */}
        <ChartsPanel />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-5 px-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Factory className="w-4 h-4 text-cyan-500" />
            <span className="text-slate-400 font-bold">PT. PIONIR NUSANTARA SUKSES</span>
            <span>— Industrial Process & Logistics Twin</span>
          </div>
          <div>
            Built with React 19, Tailwind CSS, Zustand Reactive Engine & Apache ECharts.
          </div>
          <div className="text-slate-600">
            Document Reference: <span className="text-slate-400">Kapasitas Area Storage & Trafic Material.xls</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
