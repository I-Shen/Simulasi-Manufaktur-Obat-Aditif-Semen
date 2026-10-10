import { create } from 'zustand';
import { TRIAL_SCENARIOS } from '../data/trialScenariosData';

export const useIndustrialStore = create((set, get) => ({
  // -------------------------------------------------------------------
  // SYSTEM MODE: 'normal' (Baseline Excel Asli) vs 'trial' (Kasus Ekstrim Excel Baru)
  // -------------------------------------------------------------------
  appMode: 'normal', // 'normal' | 'trial'
  trialScenario: 'SCN-06', // Default extreme scenario for Trial Mode: Megaproject PSN 24H (420T)
  isJumboBagBufferActive: false, // Staging Buffer 1 Ton Jumbo Bag (PK-JMB-07)
  isWetSeasonBurnerOverload: false, // Wet Season 35% moisture overload on burner

  // Operational Settings (PT. Mineral Aditif Nusantara - Confidential Client Benchmark)
  companyName: 'PT. Mineral Aditif Nusantara',
  capacityPerHour: 20, // Ton / Hour
  shiftHours: 7, // Effective working hours (8 hours total elapsed - 1 hour lunch break)
  workingDaysPerMonth: 25, // Days per month (10, 15, 20, 25, 30)
  fuelType: 'PGN', // 'PGN' (Default recommended) | 'CNG'
  sellingPricePerTon: 4350000, // Rp / Ton
  usdToIdr: 16500,

  // Fixed Capex
  capexInvestment: 5150000000, // Rp 5.15 Billion

  // Simulation Status & Scenarios
  isRunning: true,
  activeBottleneck: 'none', // 'none' | 'truk_macet' | 'mesin_rusak' | 'lampu_mati'
  downtimeHours: 0,

  // -------------------------------------------------------------------
  // VIRTUAL TIME MACHINE & RUNTIME SCENARIO STATE (08:30 - 16:30 with 1h Break)
  // -------------------------------------------------------------------
  simulatedHour: 8.5, // Starts at 08:30 (8.50)
  shiftStartHour: 8.5, // 08:30 WIB
  shiftEndHour: 16.5, // 16:30 WIB
  breakStartHour: 12.0, // 12:00 WIB
  breakEndHour: 13.0, // 13:00 WIB
  isLunchBreak: false,
  
  timeMultiplier: 15, // Custom speed: 1x, 5x, 15x, 60x, 120x
  isClockRunning: true,

  // Stockpile & Storage Buffer Levels (in Tons)
  bentoniteStock: 134.4, // Max 134.4 T (Stockpile RM 1: 18x6x3 m)
  calciumStock: 120.96, // Max 120.96 T (Stockpile RM 2: 6x6x3 m)
  sodaAshStock: 35.0, // Max 50 T
  siloStock: 42.0, // Bin Silo 72 m3 (~86.4 T max)

  // Simulation Counters
  totalProducedShift: 0.0,
  totalProducedToday: 0.0,
  trucksUnloadedToday: 1,
  trucksDispatchedToday: 0,

  // Scheduled Logistic Milestones during Shift (08:30 - 16:30)
  scheduledEvents: [
    { id: 1, hour: 8.5, timeStr: '08:30', type: 'shift_start', title: 'Shift Kerja Dimulai (08:30 WIB)', material: 'Shift', tons: 0, completed: true },
    { id: 2, hour: 8.75, timeStr: '08:45', type: 'inbound_bentonite', title: 'Truk 1 Bentonite Tiba (+30T)', material: 'Bentonite', tons: 30, completed: false },
    { id: 3, hour: 10.0, timeStr: '10:00', type: 'inbound_bentonite', title: 'Truk 2 Bentonite Tiba (+30T)', material: 'Bentonite', tons: 30, completed: false },
    { id: 4, hour: 10.5, timeStr: '10:30', type: 'outbound_dispatch', title: 'Rit 1 Pengiriman Silo Truk (-30T)', material: 'Produk Jadi', tons: 30, completed: false },
    { id: 5, hour: 11.5, timeStr: '11:30', type: 'inbound_calcium', title: 'Truk Calsium Masuk (+30T)', material: 'Calsium', tons: 30, completed: false },
    { id: 6, hour: 12.0, timeStr: '12:00', type: 'break_time', title: '⏸️ Istirahat Siang 1 Jam (Mesin Standby)', material: 'Istirahat', tons: 0, completed: false },
    { id: 7, hour: 13.0, timeStr: '13:00', type: 'resume_work', title: '▶️ Produksi Lanjutan Sesi Sore', material: 'Shift', tons: 0, completed: false },
    { id: 8, hour: 13.25, timeStr: '13:15', type: 'inbound_bentonite', title: 'Truk 3 Bentonite Tiba (+30T)', material: 'Bentonite', tons: 30, completed: false },
    { id: 9, hour: 14.0, timeStr: '14:00', type: 'outbound_dispatch', title: 'Rit 2 Pengiriman Silo Truk (-30T)', material: 'Produk Jadi', tons: 30, completed: false },
    { id: 10, hour: 15.0, timeStr: '15:00', type: 'inbound_bentonite', title: 'Truk 4 Bentonite Tiba (+30T)', material: 'Bentonite', tons: 30, completed: false },
    { id: 11, hour: 16.0, timeStr: '16:00', type: 'outbound_dispatch', title: 'Rit 3 Pengiriman Silo Truk (-30T)', material: 'Produk Jadi', tons: 30, completed: false },
    { id: 12, hour: 16.5, timeStr: '16:30', type: 'target_complete', title: '🏁 Shift Selesai (Target 140 Ton Tercapai)', material: 'Target', tons: 140, completed: false }
  ],

  // -------------------------------------------------------------------
  // ACTIONS & TIME CONTROLLERS
  // -------------------------------------------------------------------
  setAppMode: (mode) => {
    if (mode === 'normal') {
      // Revert completely to baseline 1-shift unmodified Excel data
      set({
        appMode: 'normal',
        capacityPerHour: 20,
        shiftHours: 7,
        workingDaysPerMonth: 25,
        fuelType: 'PGN',
        sellingPricePerTon: 4350000,
        bentoniteStock: 134.4,
        calciumStock: 120.96,
        siloStock: 42.0,
        isJumboBagBufferActive: false,
        isWetSeasonBurnerOverload: false,
        activeBottleneck: 'none',
        downtimeHours: 0
      });
    } else {
      // Switch to Trial Extreme Stress-Test Mode
      const scen = TRIAL_SCENARIOS['SCN-06'];
      set({
        appMode: 'trial',
        trialScenario: 'SCN-06',
        capacityPerHour: 20,
        shiftHours: scen ? scen.hours : 21,
        workingDaysPerMonth: 25,
        isJumboBagBufferActive: false,
        isWetSeasonBurnerOverload: false
      });
    }
  },

  setTrialScenario: (code) => {
    const scen = TRIAL_SCENARIOS[code];
    if (scen) {
      set({
        trialScenario: code,
        shiftHours: scen.hours,
        capacityPerHour: 20
      });
    }
  },

  toggleJumboBagBuffer: () => set((state) => ({ isJumboBagBufferActive: !state.isJumboBagBufferActive })),
  toggleWetSeasonOverload: () => set((state) => ({ isWetSeasonBurnerOverload: !state.isWetSeasonBurnerOverload })),

  setCapacityPerHour: (val) => set({ capacityPerHour: Number(val) }),
  setWorkingDays: (val) => set({ workingDaysPerMonth: Number(val) }),
  setFuelType: (type) => set({ fuelType: type }),
  setSellingPrice: (price) => set({ sellingPricePerTon: Number(price) }),
  setDowntimeHours: (hrs) => set({ downtimeHours: Number(hrs) }),
  
  // Time Clock Controls
  toggleClock: () => set((state) => ({ isClockRunning: !state.isClockRunning })),
  setTimeMultiplier: (speed) => set({ timeMultiplier: Number(speed) }),
  
  // Scrub time directly using slider (08:30 s.d. 17:30)
  setSimulatedHour: (newHour) => {
    const s = get();
    const clampedHour = Math.max(8.5, Math.min(20.0, Number(newHour)));
    
    // Calculate effective working hours considering 12:00 - 13:00 lunch break
    let effectiveHours = 0;
    const isBreak = clampedHour >= 12.0 && clampedHour < 13.0;

    if (clampedHour <= 8.5) {
      effectiveHours = 0;
    } else if (clampedHour <= 12.0) {
      effectiveHours = clampedHour - 8.5; // 0 to 3.5 hours
    } else if (clampedHour < 13.0) {
      effectiveHours = 3.5; // Frozen during 1h lunch break
    } else {
      effectiveHours = Math.min(7.0, 3.5 + (clampedHour - 13.0)); // Afternoon session up to 7h
    }

    const rate = s.capacityPerHour;
    const produced = effectiveHours * rate;
    
    // Update event completion status
    const updatedEvents = s.scheduledEvents.map((evt) => ({
      ...evt,
      completed: clampedHour >= evt.hour
    }));

    set({
      simulatedHour: clampedHour,
      isLunchBreak: isBreak,
      totalProducedShift: produced,
      totalProducedToday: produced,
      scheduledEvents: updatedEvents,
      // Dynamic stock levels
      bentoniteStock: Math.max(10, 134.4 - (produced * 0.8) + (clampedHour >= 15.0 ? 120 : clampedHour >= 13.25 ? 90 : clampedHour >= 10.0 ? 60 : clampedHour >= 8.75 ? 30 : 0)),
      calciumStock: Math.max(20, 120.96 - (produced * 0.15) + (clampedHour >= 11.5 ? 30 : 0)),
      siloStock: Math.min(86.4, Math.max(15, (produced % 30) + 25))
    });
  },

  // Reset shift simulation
  resetSimulation: () => {
    set((state) => ({
      simulatedHour: 8.5,
      totalProducedShift: 0.0,
      totalProducedToday: 0.0,
      isLunchBreak: false,
      bentoniteStock: 134.4,
      calciumStock: 120.96,
      sodaAshStock: 35.0,
      siloStock: 42.0,
      activeBottleneck: 'none',
      downtimeHours: 0,
      trucksUnloadedToday: 1,
      trucksDispatchedToday: 0,
      scheduledEvents: state.scheduledEvents.map((e, idx) => ({ ...e, completed: idx === 0 }))
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
  // MAIN RUNTIME SIMULATION LOOP
  // -------------------------------------------------------------------
  tickSimulation: (deltaSeconds = 0.1) => {
    const s = get();
    if (!s.isClockRunning || s.activeBottleneck !== 'none') return;

    // Convert real elapsed delta seconds to virtual hours using timeMultiplier
    const virtualHoursDelta = (deltaSeconds * s.timeMultiplier) / 3600;
    const nextHour = s.simulatedHour + virtualHoursDelta;

    // Check if in Lunch Break (12:00 - 13:00)
    const isNowBreak = nextHour >= 12.0 && nextHour < 13.0;
    
    // Stop production if beyond shift end (16:30) or during lunch break
    const isShiftEnded = nextHour >= 16.5;
    const canProduce = !isNowBreak && !isShiftEnded;

    // Production calculation in this step
    const ratePerVirtualHour = canProduce ? s.capacityPerHour : 0;
    const additionalProduction = virtualHoursDelta * ratePerVirtualHour;
    
    const newProduced = Math.min(140, s.totalProducedShift + additionalProduction);
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

    set({
      simulatedHour: nextHour,
      isLunchBreak: isNowBreak,
      totalProducedShift: newProduced,
      totalProducedToday: newProduced,
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
    const isTrial = s.appMode === 'trial';
    const trialScen = TRIAL_SCENARIOS[s.trialScenario] || TRIAL_SCENARIOS['SCN-06'];

    const cap = s.capacityPerHour; // 20 T/h
    const shift = isTrial ? trialScen.hours : s.shiftHours; // 7 Hours effective (normal) or trial hours
    const days = s.workingDaysPerMonth; // 25 Days

    // Formatted time string
    const currentHourInt = Math.floor(s.simulatedHour);
    const currentMinInt = Math.floor((s.simulatedHour - currentHourInt) * 60);
    const currentSecInt = Math.floor(((s.simulatedHour - currentHourInt) * 60 - currentMinInt) * 60);
    const formattedSimTime = `${String(currentHourInt).padStart(2, '0')}:${String(currentMinInt).padStart(2, '0')}:${String(currentSecInt).padStart(2, '0')}`;

    // Production Volumes
    const tonsPerHour = cap;
    const tonsPerShift = isTrial ? trialScen.dailyOutput : cap * shift; // 140 Ton (normal) vs trial daily output
    const tonsPerDay = tonsPerShift;
    const tonsPer10Days = tonsPerDay * 10;
    const tonsPer20Days = tonsPerDay * 20;
    const tonsPerMonth = isTrial ? trialScen.monthlyOutput : tonsPerShift * days; // 3,500 Ton (normal) vs trial monthly

    // Raw Material Formulation Costs (per Ton)
    const bentoniteCostPerTon = 0.8 * 3650000; // Rp 2.920.000
    const calciumCostPerTon = 0.15 * 2750000; // Rp 412.500
    const sodaAshCostPerTon = 0.05 * 5000000; // Rp 250.000
    const rawMaterialCostPerTon = bentoniteCostPerTon + calciumCostPerTon + sodaAshCostPerTon; // Rp 3.582.500

    // Gas Pricing
    const gasPricePerMmbtu = s.fuelType === 'PGN' ? 234000 : 279000;
    // Wet season overload: burner consumes 18% more gas to evaporate excess 35% moisture
    const burnerOverloadMultiplier = s.isWetSeasonBurnerOverload ? 1.18 : 1.0;
    const gasConsumptionMmbtuPerHour = 6.732 * (cap / 20) * burnerOverloadMultiplier;
    const fuelCostPerTon = (gasConsumptionMmbtuPerHour / cap) * gasPricePerMmbtu;
    const electricityCostPerTon = 7223;
    const forkliftCostPerTon = 4738;

    // Direct Labor
    const totalLaborMonthly = isTrial ? (trialScen.sdmCostDaily * days) : 66875000;
    const laborCostPerTon = tonsPerMonth > 0 ? totalLaborMonthly / tonsPerMonth : 0;

    // Maintenance Cost
    const maintenanceCostPerTon = 139006;

    // Operational Cost (Opex) per Ton
    const operationalCostPerTon = fuelCostPerTon + electricityCostPerTon + forkliftCostPerTon + laborCostPerTon;

    // Base HPP per Ton
    const baseHppPerTon = rawMaterialCostPerTon; // Rp 3.582.500
    const fullCostPerTon = isTrial ? trialScen.hppPerTon : (baseHppPerTon + maintenanceCostPerTon);

    // Financial Revenues & Margins
    const revenuePerTon = s.sellingPricePerTon; // Rp 4.350.000
    const grossMarginPerTon = revenuePerTon - baseHppPerTon - maintenanceCostPerTon;
    const grossMarginPct = isTrial ? trialScen.grossMarginPct : (revenuePerTon > 0 ? (grossMarginPerTon / revenuePerTon) * 100 : 0);

    // Monthly Figures
    const monthlyRevenue = isTrial ? (trialScen.revenueDaily * days) : (revenuePerTon * tonsPerMonth);
    const monthlyRawMaterialCost = rawMaterialCostPerTon * tonsPerMonth;
    const monthlyFuelCost = fuelCostPerTon * tonsPerMonth;
    const monthlyElectricityCost = electricityCostPerTon * tonsPerMonth;
    const monthlyForkliftCost = forkliftCostPerTon * tonsPerMonth;
    const monthlyMaintenanceCost = maintenanceCostPerTon * tonsPerMonth;
    const monthlyTotalOpex = (operationalCostPerTon + maintenanceCostPerTon) * tonsPerMonth;
    const monthlyHppTotal = isTrial ? (trialScen.hppDaily * days) : (baseHppPerTon * tonsPerMonth);

    // Monthly Gross Profit & Net Profit
    const monthlyGrossProfit = isTrial ? trialScen.monthlyGrossProfit : (grossMarginPerTon * tonsPerMonth);
    const monthlyNetProfit = monthlyGrossProfit * 0.5;

    // Break Even Point (BEP) in Months for Capex Rp 5,15 Miliar
    const bepMonths = monthlyNetProfit > 0 ? s.capexInvestment / monthlyNetProfit : 999;

    // PGN Savings vs CNG
    const fuelSavingsPerTon = (0.3366 * 279000) - (0.3366 * 234000);
    const monthlyPgnSavings = fuelSavingsPerTon * tonsPerMonth;

    // Depletion Timeframes & Predictive Timestamps
    const bentoniteHoursLeft = (s.bentoniteStock / (cap * 0.8));
    const calciumHoursLeft = (s.calciumStock / (cap * 0.15));
    const siloHoursUntilFull = Math.max(0, (86.4 - s.siloStock) / cap);

    // Formatted exact depletion time
    let bentoniteDepletionHour = s.simulatedHour + bentoniteHoursLeft;
    if (s.simulatedHour < 12.0 && bentoniteDepletionHour > 12.0) {
      bentoniteDepletionHour += 1.0;
    }
    const bDH = Math.floor(bentoniteDepletionHour) % 24;
    const bDM = Math.floor((bentoniteDepletionHour - Math.floor(bentoniteDepletionHour)) * 60);
    const predictedDepletionTimeStr = `${String(bDH).padStart(2, '0')}:${String(bDM).padStart(2, '0')}`;

    // Formatted exact Silo full time
    let siloFullHour = s.simulatedHour + siloHoursUntilFull;
    if (s.simulatedHour < 12.0 && siloFullHour > 12.0) {
      siloFullHour += 1.0;
    }
    const sFH = Math.floor(siloFullHour) % 24;
    const sFM = Math.floor((siloFullHour - Math.floor(siloFullHour)) * 60);
    const predictedSiloFullTimeStr = `${String(sFH).padStart(2, '0')}:${String(sFM).padStart(2, '0')}`;

    // Target completion hour
    const predictedShiftCompleteTimeStr = isTrial ? `${trialScen.hours}:00 WIB` : '16:30';

    // Downtime Bottleneck Loss
    const lostTonnage = s.downtimeHours * cap;
    const idleLaborCostPerHour = totalLaborMonthly / (days * shift);
    const biayaSdmMenganggur = s.downtimeHours * idleLaborCostPerHour;
    const bahanBakarTerbuang = s.downtimeHours * gasConsumptionMmbtuPerHour * gasPricePerMmbtu;
    const kehilanganLabaMargin = lostTonnage * grossMarginPerTon;
    const totalDowntimeLoss = biayaSdmMenganggur + bahanBakarTerbuang + kehilanganLabaMargin;

    return {
      isTrial,
      trialScenarioData: trialScen,
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
      operationalCostPerTon,
      baseHppPerTon,
      fullCostPerTon,
      hppPerTon: isTrial ? trialScen.hppPerTon : baseHppPerTon,
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
      lostTonnage,
      idleLaborCostPerHour,
      biayaSdmMenganggur,
      bahanBakarTerbuang,
      kehilanganLabaMargin,
      totalDowntimeLoss,
      gasPricePerMmbtu,
      gasConsumptionMmbtuPerHour
    };
  }
}));
