import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useIndustrialStore } from '../store/useIndustrialStore';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Gauge,
  Activity
} from 'lucide-react';

export const ChartsPanel = () => {
  const { 
    capacityPerHour, 
    fuelType, 
    sellingPricePerTon,
    activeBottleneck,
    isRunning,
    capexInvestment,
    getMetrics 
  } = useIndustrialStore();

  const m = getMetrics();
  const isStopped = !isRunning || activeBottleneck !== 'none';
  const currentSpeed = isStopped ? 0 : capacityPerHour;

  // 1. SCADA Gauge Option (Production Rate)
  const gaugeOption = {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 30,
        splitNumber: 6,
        axisLine: {
          lineStyle: {
            width: 14,
            color: [
              [0.33, '#eab308'], // 0-10 Warning
              [0.8, '#06b6d4'],  // 10-24 Optimal
              [1, '#ef4444']     // 24-30 Overload
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 12,
          offsetCenter: [0, '-50%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 6,
          lineStyle: {
            color: 'auto',
            width: 1.5
          }
        },
        splitLine: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2.5
          }
        },
        axisLabel: {
          color: '#94a3b8',
          fontSize: 10,
          distance: -40
        },
        title: {
          offsetCenter: [0, '-10%'],
          fontSize: 11,
          color: '#cbd5e1',
          fontWeight: 'bold'
        },
        detail: {
          fontSize: 22,
          offsetCenter: [0, '-25%'],
          valueAnimation: true,
          formatter: function (value) {
            return Math.round(value) + ' T/h';
          },
          color: isStopped ? '#ef4444' : '#38bdf8',
          fontFamily: 'monospace',
          fontWeight: 'bold'
        },
        data: [
          {
            value: currentSpeed,
            name: isStopped ? 'SYSTEM STOPPED' : 'THROUGHPUT RATE'
          }
        ]
      }
    ]
  };

  // 2. HPP Donut Chart Option
  const hppDonutOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#0f172a',
      borderColor: '#334155',
      textStyle: { color: '#f8fafc', fontSize: 11 },
      formatter: '{b}: Rp {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: '0%',
      textStyle: { color: '#94a3b8', fontSize: 9.5 },
      itemWidth: 10,
      itemHeight: 10
    },
    series: [
      {
        name: 'Komposisi HPP',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '42%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#0f172a',
          borderWidth: 2
        },
        label: { show: false },
        emphasis: {
          label: {
            show: true,
            fontSize: 11,
            fontWeight: 'bold',
            color: '#fff'
          }
        },
        data: [
          { value: 2920000, name: 'Bentonite (80%)', itemStyle: { color: '#06b6d4' } },
          { value: 412500, name: 'Calsium (15%)', itemStyle: { color: '#10b981' } },
          { value: 250000, name: 'Soda Ash (5%)', itemStyle: { color: '#f59e0b' } },
          { value: Math.round(m.fuelCostPerTon), name: `Gas Burner (${fuelType})`, itemStyle: { color: '#f97316' } },
          { value: Math.round(m.electricityCostPerTon), name: 'Listrik PLN 100kW', itemStyle: { color: '#a855f7' } },
          { value: Math.round(m.forkliftCostPerTon), name: 'Solar Forklift', itemStyle: { color: '#64748b' } },
          { value: Math.round(m.laborCostPerTon), name: 'SDM 10 Manpower', itemStyle: { color: '#3b82f6' } },
          { value: Math.round(m.maintenanceCostPerTon), name: 'Maintenance (Rp 139k/T)', itemStyle: { color: '#ec4899' } }
        ]
      }
    ]
  };

  // 3. Financial Milestones Bar Chart (10, 15, 20, 25, 30 Days)
  const daysSteps = [10, 15, 20, 25, 30];
  const revData = daysSteps.map(d => Math.round((sellingPricePerTon * capacityPerHour * 7 * d) / 1000000000 * 100) / 100);
  const costData = daysSteps.map(d => Math.round(((m.baseHppPerTon + m.maintenanceCostPerTon) * capacityPerHour * 7 * d) / 1000000000 * 100) / 100);
  const netProfitData = daysSteps.map(d => Math.round((m.grossMarginPerTon * capacityPerHour * 7 * d * 0.5) / 1000000000 * 100) / 100);

  const financialBarOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#0f172a',
      borderColor: '#334155',
      textStyle: { color: '#f8fafc', fontSize: 11 }
    },
    legend: {
      data: ['Pendapatan (Revenue)', 'Biaya HPP (CGS)', 'Laba Bersih (Net 50%)'],
      top: '0%',
      textStyle: { color: '#94a3b8', fontSize: 10 }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '8%',
      top: '18%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['10 Hari', '15 Hari', '20 Hari', '25 Hari (Target)', '30 Hari'],
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#94a3b8', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      name: 'Miliar Rp',
      nameTextStyle: { color: '#64748b', fontSize: 10 },
      splitLine: { lineStyle: { color: '#1e293b' } },
      axisLabel: { color: '#94a3b8', fontSize: 10 }
    },
    series: [
      {
        name: 'Pendapatan (Revenue)',
        type: 'bar',
        data: revData,
        itemStyle: { color: '#38bdf8', borderRadius: [3, 3, 0, 0] }
      },
      {
        name: 'Biaya HPP (CGS)',
        type: 'bar',
        data: costData,
        itemStyle: { color: '#f43f5e', borderRadius: [3, 3, 0, 0] }
      },
      {
        name: 'Laba Bersih (Net 50%)',
        type: 'line',
        data: netProfitData,
        itemStyle: { color: '#10b981' },
        lineStyle: { width: 3, color: '#10b981' },
        symbol: 'circle',
        symbolSize: 7
      }
    ]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Chart 1: SCADA Speedometer Gauge (Cols 1-4) */}
      <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              SCADA Throughput Speedometer
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Desain: 20 T/h</span>
        </div>

        <div className="h-48 -my-2 flex items-center justify-center">
          <ReactECharts option={gaugeOption} style={{ height: '100%', width: '100%' }} />
        </div>

        <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono border-t border-slate-800 pt-2 text-slate-400">
          <div>
            <span>Status:</span>
            <strong className={`block text-xs ${isStopped ? 'text-red-400' : 'text-emerald-400'}`}>
              {isStopped ? 'INTERRUPTED' : 'RUNNING OPTIMAL'}
            </strong>
          </div>
          <div>
            <span>Ritase Output:</span>
            <strong className="block text-xs text-white font-bold">
              {(currentSpeed / 30).toFixed(2)} Rit / Jam
            </strong>
          </div>
        </div>
      </div>

      {/* Chart 2: HPP Cost Breakdown Donut (Cols 5-8) */}
      <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-1.5">
            <PieChart className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Struktur HPP per Ton Produk
            </h3>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 font-bold">
            Rp {Math.round(m.hppPerTon).toLocaleString('id-ID')}
          </span>
        </div>

        <div className="h-52">
          <ReactECharts option={hppDonutOption} style={{ height: '100%', width: '100%' }} />
        </div>

        <div className="text-[10px] text-slate-400 text-center font-mono border-t border-slate-800 pt-2">
          Bahan baku menyumbang 96% dari HPP total, energi burner {fuelType} {((m.fuelCostPerTon / m.hppPerTon) * 100).toFixed(1)}%.
        </div>
      </div>

      {/* Chart 3: Financial Milestones (Cols 9-12) */}
      <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Proyeksi Siklus Keuangan
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">
            BEP: {m.bepMonths.toFixed(1)} Bln
          </span>
        </div>

        <div className="h-52">
          <ReactECharts option={financialBarOption} style={{ height: '100%', width: '100%' }} />
        </div>

        <div className="text-[10px] text-slate-400 text-center font-mono border-t border-slate-800 pt-2">
          Target 25 hari menghasilkan omzet Rp {revData[3]} Miliar dengan laba bersih Rp {netProfitData[3]} Miliar.
        </div>
      </div>
    </div>
  );
};
