import { create } from 'zustand';

export const useIndustrialStore = create((set, get) => ({
  // Operational Settings (PT. Pionir Nusantara Sukses Benchmark)
  capacityPerHour: 20, // Ton / Hour
  shiftHours: 7, // Hours per shift
  workingDaysPerMonth: 25, // Days per month (10, 15, 20, 25, 30)
  fuelType: 'PGN', // 'PGN' (Default recommended) | 'CNG'
  sellingPricePerTon: 4350000, // Rp / Ton
  usdToIdr: 16500,

  // Fixed Capex
  capexInvestment: 5150000000, // Rp 5.15 Billion

  // Simulation Status & Scenarios
  isRunning: true,
  activeBottleneck: 'none', // 'none' | 'truk_macet' | 'mesin_rusak' | 'lampu_mati'
  downtimeHours: 0, // Simulated or selected downtime duration

  // -------------------------------------------------------------------
  // VIRTUAL TIME MACHINE & RUNTIME SCENARIO STATE
  // -------------------------------------------------------------------
  simulatedHour: 7.0, // Starts at 07:00 (7.0), up to 24.0 or next days
  shiftStartHour: 7.0, // 07:00
  timeMultiplier: 15, // 1x, 5x, 15x (default brisk), 60x (1s = 1min), 120x, 300x
  isClockRunning: true,

  // Stockpile & Storage Buffer Levels (in Tons)
  bentoniteStock: 134.4, // Max 134.4 T (Stockpile RM 1: 18x6x3 m)
  calciumStock: 120.96, // Max 120.96 T (Stockpile RM 2: 6x6x3 m)
  sodaAshStock: 35.0, // Max 50 T
  siloStock: 42.0, // Bin Silo 72 m3 (~86.4 T max)

  // Simulation Counters
  totalProducedShift: 0.0,
  trucksUnloadedToday: 1,
  trucksDispatchedToday: 0,

  // Scheduled Logistic Milestones during Shift (07:00 - 14:00)
  scheduledEvents: [
    { id: 1, hour: 7.25, timeStr: '07:15', type: 'inbound_bentonite', title: 'Truk 1 Bentonite Tiba (+30T)', material: 'Bentonite', tons: 30, completed: false },
    { id: 2, hour: 8.5, timeStr: '08:30', type: 'inbound_bentonite', title: 'Truk 2 Bentonite Tiba (+30T)', material: 'Bentonite', tons: 30, completed: false },
    { id: 3, hour: 9.0, timeStr: '09:00', type: 'outbound_dispatch', title: 'Rit 1 Pengiriman Silo Truk (-30T)', material: 'Produk Jadi', tons: 30, completed: false },
    { id: 4, hour: 10.25, timeStr: '10:15', type: 'inbound_calcium', title: 'Truk Calsium Masuk (+30T)', material: 'Calsium', tons: 30, completed: false },
    { id: 5, hour: 11.0, timeStr: '11:00', type: 'outbound_dispatch', title: 'Rit 2 Pengiriman Silo Truk (-30T)', material: 'Produk Jadi', tons: 30, completed: false },
    { id: 6, hour: 11.75, timeStr: '11:45', type: 'inbound_bentonite', title: 'Truk 3 Bentonite Tiba (+30T)', material: 'Bentonite', tons: 30, completed: false },
    { id: 7, hour: 13.0, timeStr: '13:00', type: 'outbound_dispatch', title: 'Rit 3 Pengiriman Silo Truk (-30T)', material: 'Produk Jadi', tons: 30, completed: false },
    { id: 8, hour: 13.5, timeStr: '13:30', type: 'inbound_bentonite', title: 'Truk 4 Bentonite Tiba (+30T)', material: 'Bentonite', tons: 30, completed: false },
    { id: 9, hour: 14.0, timeStr: '14:00', type: 'target_complete', title: 'Shift Berakhir (Target 140 Ton Selesai)', material: 'Target', tons: 140, completed: false }
  ],

  // -------------------------------------------------------------------
  // ACTIONS & TIME CONTROLLERS
  // -------------------------------------------------------------------
  setCapacityPerHour: (val) => set({ capacityPerHour: Number(val) }),
  setWorkingDays: (val) => set({ workingDaysPerMonth: Number(val) }),
  setFuelType: (type) => set({ fuelType: type }),
  setSellingPrice: (price) => set({ sellingPricePerTon: Number(price) }),
  setDowntimeHours: (hrs) => set({ downtimeHours: Number(hrs) }),
  
  // Time Clock Controls
  toggleClock: () => set((state) => ({ isClockRunning: !state.isClockRunning })),
  setTimeMultiplier: (speed) => set({ timeMultiplier: Number(speed) }),
  
  // Scrub time directly (e.g. from slider 7.0 to 22.0)
  setSimulatedHour: (newHour) => {
    const s = get();
    const clampedHour = Math.max(7.0, Math.min(24.0, Number(newHour)));
    const elapsedHours = Math.max(0, clampedHour - s.shiftStartHour);
    
    // Recalculate production and stocks proportionally to hour
    const rate = s.capacityPerHour;
    const produced = Math.min(140, elapsedHours * rate);
    
    // Update event completion status
    const updatedEvents = s.scheduledEvents.map((evt) => ({
      ...evt,
      completed: clampedHour >= evt.hour
    }));

    set({
      simulatedHour: clampedHour,
      totalProducedShift: produced,
      scheduledEvents: updatedEvents,
      // Stock adjusted based on production
      bentoniteStock: Math.max(10, 134.4 - (produced * 0.8) + (clampedHour >= 8.5 ? 60 : clampedHour >= 7.25 ? 30 : 0)),
      calciumStock: Math.max(20, 120.96 - (produced * 0.15) + (clampedHour >= 10.25 ? 30 : 0)),
      siloStock: Math.min(86.4, Math.max(15, (produced % 30) + 25))
    });
  },

  // Reset shift simulation
  resetSimulation: () => {
    set((state) => ({
      simulatedHour: 7.0,
      totalProducedShift: 0.0,
      bentoniteStock: 134.4,
      calciumStock: 120.96,
      sodaAshStock: 35.0,
      siloStock: 42.0,
      activeBottleneck: 'none',
      downtimeHours: 0,
      trucksUnloadedToday: 1,
      trucksDispatchedToday: 0,
      scheduledEvents: state.scheduledEvents.map((e) => ({ ...e, completed: false }))
    }));
  },

  setBottleneck: (scenario) => {
    set({ activeBottleneck: scenario });
    if (scenario !== 'none') {
      set({ 
        downtimeHours: scenario === 'truk_macet' ? 3.5 : scenario === 'mesin_rusak' ? 2.0 : 2.5,
        isClockRunning: false // Pause when emergency occurs for inspection
      });
    } else {
      set({ downtimeHours: 0, isClockRunning: true });
    }
  },

  // Manual Trigger: Arrive Truck Inbound
  unLoadTruck: (material) => {
    set((state) => {
      if (material === 'bentonite') {
        return {
          bentoniteStock: Math.min(134.4, state.bentoniteStock + 30),
          trucksUnloadedToday: state.trucksUnloadedToday + 1
        };
      } else if (material === 'calcium') {
        return {
          calciumStock: Math.min(120.96, state.calciumStock + 30),
          trucksUnloadedToday: state.trucksUnloadedToday + 1
        };
      }
      return {};
    });
  },

  // Manual Trigger: Dispatch Finished Product Truck (30T)
  dispatchProductTruck: () => {
    set((state) => ({
      siloStock: Math.max(0, state.siloStock - 30),
      trucksDispatchedToday: state.trucksDispatchedToday + 1
    }));
  },

  // -------------------------------------------------------------------
  // MAIN RUNTIME SIMULATION LOOP (Called every tick: deltaSeconds)
  // -------------------------------------------------------------------
  tickSimulation: (deltaSeconds = 0.1) => {
    const s = get();
    if (!s.isClockRunning || s.activeBottleneck !== 'none') return;

    // Convert real elapsed delta seconds to virtual hours using timeMultiplier
    // e.g. 1 real second at 60x = 60 virtual seconds = 1/60 virtual hour
    const virtualHoursDelta = (deltaSeconds * s.timeMultiplier) / 3600;
    const nextHour = s.simulatedHour + virtualHoursDelta;

    // Production calculation in this step
    const ratePerVirtualHour = s.capacityPerHour;
    const additionalProduction = virtualHoursDelta * ratePerVirtualHour;
    
    const newProduced = s.totalProducedShift + additionalProduction;
    const bentoniteConsumed = additionalProduction * 0.8;
    const calciumConsumed = additionalProduction * 0.15;
    const sodaConsumed = additionalProduction * 0.05;

    // Auto-check scheduled events that trigger as clock reaches them
    let newlyUnloaded = s.trucksUnloadedToday;
    let newlyDispatched = s.trucksDispatchedToday;
    let addedBentonite = 0;
    let addedCalcium = 0;
    let subtractedSilo = 0;

    const updatedEvents = s.scheduledEvents.map((evt) => {
      if (!evt.completed && nextHour >= evt.hour) {
        if (evt.type === 'inbound_bentonite') {
          addedBentonite += 30;
          newlyUnloaded += 1;
        } else if (evt.type === 'inbound_calcium') {
          addedCalcium += 30;
          newlyUnloaded += 1;
        } else if (evt.type === 'outbound_dispatch') {
          subtractedSilo += 30;
          newlyDispatched += 1;
        }
        return { ...evt, completed: true };
      }
      return evt;
    });

    // Check emergency depletion
    const nextBentonite = Math.max(0, s.bentoniteStock - bentoniteConsumed + addedBentonite);
    if (nextBentonite <= 0.5 && s.activeBottleneck === 'none') {
      set({ activeBottleneck: 'truk_macet', downtimeHours: 3.5, isClockRunning: false });
      return;
    }

    const nextSilo = Math.min(86.4, Math.max(0, s.siloStock + additionalProduction - subtractedSilo));

    // Stop at 24:00 or end of shift if reached
    set({
      simulatedHour: nextHour,
      totalProducedShift: newProduced,
      bentoniteStock: Math.min(134.4, nextBentonite),
      calciumStock: Math.min(120.96, Math.max(0, s.calciumStock - calciumConsumed + addedCalcium)),
      sodaAshStock: Math.max(0, s.sodaAshStock - sodaConsumed),
      siloStock: nextSilo,
      trucksUnloadedToday: newlyUnloaded,
      trucksDispatchedToday: newlyDispatched,
      scheduledEvents: updatedEvents
    });
  },

  // -------------------------------------------------------------------
  // REACTIVE COMPUTED METRICS GETTER (Zero-Latency Math)
  // -------------------------------------------------------------------
  getMetrics: () => {
    const s = get();
    const cap = s.capacityPerHour; // 20 T/h
    const shift = s.shiftHours; // 7 Hours
    const days = s.workingDaysPerMonth; // 25 Days

    // Formatted time string
    const currentHourInt = Math.floor(s.simulatedHour);
    const currentMinInt = Math.floor((s.simulatedHour - currentHourInt) * 60);
    const currentSecInt = Math.floor(((s.simulatedHour - currentHourInt) * 60 - currentMinInt) * 60);
    const formattedSimTime = `${String(currentHourInt).padStart(2, '0')}:${String(currentMinInt).padStart(2, '0')}:${String(currentSecInt).padStart(2, '0')}`;

    // Production Volumes
    const tonsPerHour = cap;
    const tonsPerShift = cap * shift; // 140 Ton
    const tonsPerDay = tonsPerShift;
    const tonsPer10Days = tonsPerDay * 10; // 1,400 Ton
    const tonsPer20Days = tonsPerDay * 20; // 2,800 Ton
    const tonsPerMonth = tonsPerShift * days; // 3,500 Ton (25 days) s.d. 4,200 Ton (30 days)

    // Raw Material Formulation Costs (per Ton)
    const bentoniteCostPerTon = 0.8 * 3650000; // Rp 2.920.000
    const calciumCostPerTon = 0.15 * 2750000; // Rp 412.500
    const sodaAshCostPerTon = 0.05 * 5000000; // Rp 250.000
    const rawMaterialCostPerTon = bentoniteCostPerTon + calciumCostPerTon + sodaAshCostPerTon; // Rp 3.582.500

    // Utility & Operational Costs (per Ton)
    // Fuel: PGN $13.00/MMBTU (Rp 79.930/t) vs CNG $15.15/MMBTU (Rp 95.301/t)
    const fuelCostPerTon = s.fuelType === 'PGN' ? 79930 : 95301;
    
    // Electricity PLN (100 kW load at ~5 kWh/ton @ Rp 1.444,7 / kWh)
    const electricityCostPerTon = 7223;

    // Forklift fuel (5 L/h solar @ Rp 18.950/L -> Rp 94.750/h / 20T = ~Rp 4.738/ton)
    const forkliftCostPerTon = 4738;

    // Labor: 10 manpower = Rp 66.875.000 / month
    const totalLaborMonthly = 66875000;
    const laborCostPerTon = tonsPerMonth > 0 ? totalLaborMonthly / tonsPerMonth : 0;

    // Maintenance & Consumables (10% of operational)
    const baseOpex = fuelCostPerTon + electricityCostPerTon + forkliftCostPerTon + laborCostPerTon;
    const maintenanceCostPerTon = baseOpex * 0.1;

    // Total Operational Cost (Opex) per Ton
    const totalOpexPerTon = baseOpex + maintenanceCostPerTon;

    // Total Cost of Goods Sold (HPP) per Ton
    const hppPerTon = rawMaterialCostPerTon + totalOpexPerTon;

    // Financial Revenues & Margins
    const revenuePerTon = s.sellingPricePerTon;
    const grossMarginPerTon = revenuePerTon - hppPerTon;
    const grossMarginPct = revenuePerTon > 0 ? (grossMarginPerTon / revenuePerTon) * 100 : 0;

    // Monthly Figures
    const monthlyRevenue = revenuePerTon * tonsPerMonth;
    const monthlyRawMaterialCost = rawMaterialCostPerTon * tonsPerMonth;
    const monthlyFuelCost = fuelCostPerTon * tonsPerMonth;
    const monthlyElectricityCost = electricityCostPerTon * tonsPerMonth;
    const monthlyForkliftCost = forkliftCostPerTon * tonsPerMonth;
    const monthlyMaintenanceCost = maintenanceCostPerTon * tonsPerMonth;
    const monthlyTotalOpex = totalOpexPerTon * tonsPerMonth;
    const monthlyHppTotal = hppPerTon * tonsPerMonth;

    const monthlyGrossProfit = monthlyRevenue - monthlyHppTotal;
    
    // Net profit after corporate overhead & tax (50%)
    const monthlyNetProfit = monthlyGrossProfit * 0.5;

    // Break Even Point (BEP) in Months for Capex Rp 5,15 Miliar
    const bepMonths = monthlyNetProfit > 0 ? s.capexInvestment / monthlyNetProfit : 999;

    // PGN Savings vs CNG (Monthly & Per Ton)
    const fuelSavingsPerTon = 95301 - 79930; // Rp 15.371 / Ton
    const monthlyPgnSavings = fuelSavingsPerTon * tonsPerMonth; // ~ Rp 53.8 Million / Month

    // Depletion Timeframes & Predictive Timestamps
    const bentoniteHoursLeft = (s.bentoniteStock / (cap * 0.8));
    const calciumHoursLeft = (s.calciumStock / (cap * 0.15));
    const siloHoursUntilFull = Math.max(0, (86.4 - s.siloStock) / cap);

    // Formatted exact depletion time
    const bentoniteDepletionHour = s.simulatedHour + bentoniteHoursLeft;
    const bDH = Math.floor(bentoniteDepletionHour) % 24;
    const bDM = Math.floor((bentoniteDepletionHour - Math.floor(bentoniteDepletionHour)) * 60);
    const predictedDepletionTimeStr = `${String(bDH).padStart(2, '0')}:${String(bDM).padStart(2, '0')}`;

    // Formatted exact Silo full time
    const siloFullHour = s.simulatedHour + siloHoursUntilFull;
    const sFH = Math.floor(siloFullHour) % 24;
    const sFM = Math.floor((siloFullHour - Math.floor(siloFullHour)) * 60);
    const predictedSiloFullTimeStr = `${String(sFH).padStart(2, '0')}:${String(sFM).padStart(2, '0')}`;

    // Target completion hour
    const shiftHoursNeeded = (140 - s.totalProducedShift) / cap;
    const targetDoneHour = s.simulatedHour + shiftHoursNeeded;
    const tDH = Math.floor(targetDoneHour) % 24;
    const tDM = Math.floor((targetDoneHour - Math.floor(targetDoneHour)) * 60);
    const predictedShiftCompleteTimeStr = `${String(tDH).padStart(2, '0')}:${String(tDM).padStart(2, '0')}`;

    // Downtime Financial Losses
    const idleLaborCostPerHour = totalLaborMonthly / (days * shift); // ~ Rp 382.143 / hr
    const lostGrossProfitPerHour = grossMarginPerTon * cap;
    const wastedReheatCost = s.downtimeHours > 0 ? (s.fuelType === 'PGN' ? 17215390 : 20500000) : 0;
    const totalDowntimeLoss = s.downtimeHours * (idleLaborCostPerHour + lostGrossProfitPerHour) + wastedReheatCost;
    const lostTonnage = s.downtimeHours * cap;

    return {
      formattedSimTime,
      tonsPerHour,
      tonsPerShift,
      tonsPerDay,
      tonsPer10Days,
      tonsPer20Days,
      tonsPerMonth,
      rawMaterialCostPerTon,
      fuelCostPerTon,
      electricityCostPerTon,
      forkliftCostPerTon,
      laborCostPerTon,
      maintenanceCostPerTon,
      totalOpexPerTon,
      hppPerTon,
      revenuePerTon,
      grossMarginPerTon,
      grossMarginPct,
      monthlyRevenue,
      monthlyRawMaterialCost,
      monthlyFuelCost,
      monthlyElectricityCost,
      monthlyLaborCost: totalLaborMonthly,
      monthlyMaintenanceCost,
      monthlyTotalOpex,
      monthlyHppTotal,
      monthlyGrossProfit,
      monthlyNetProfit,
      bepMonths,
      monthlyPgnSavings,
      fuelSavingsPerTon,
      bentoniteHoursLeft,
      calciumHoursLeft,
      siloHoursUntilFull,
      predictedDepletionTimeStr,
      predictedSiloFullTimeStr,
      predictedShiftCompleteTimeStr,
      idleLaborCostPerHour,
      lostGrossProfitPerHour,
      wastedReheatCost,
      totalDowntimeLoss,
      lostTonnage
    };
  }
}));
