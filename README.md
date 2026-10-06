# Simulasi Manufaktur Obat Aditif Semen — Digital Twin & SCADA Runtime Engine

Sistem simulasi interaktif industri dan *Digital Twin* untuk proses pencampuran dan pengeringan bahan baku manufaktur obat aditif semen (**PT. Mineral Aditif Nusantara - Confidential Client**).

🌐 **Live Deployed Application:**  
👉 **[https://i-shen.github.io/Simulasi-Manufaktur-Obat-Aditif-Semen/](https://i-shen.github.io/Simulasi-Manufaktur-Obat-Aditif-Semen/)**

---

## 🏭 Parameter Teknis Desain Pabrik

- **Kapasitas Produksi:** 20.00 Ton / Jam (140.00 Ton per shift kerja dengan **7 jam kerja efektif**).
- **Jadwal Shift Kerja:** **08:30 – 16:30 WIB** (Total 8 Jam) dengan **Jeda Istirahat Siang 1 Jam (12:00 – 13:00 WIB)** di mana mesin berstatus *Standby*.
- **Komposisi Formulasi:**
  - $80\%$ Bentonite Clay Curah (BJ 0,80)
  - $15\%$ Calsium Carbonate (CaCO3) (BJ 2,80)
  - $5\%$ Soda Ash Dense (Na2CO3) (BJ 1,13)
- **Logistik & Buffer Kritis:**
  - *Stockpile 1 (Bentonite):* 134,4 Ton (Habis dalam 8,40 jam operasional penuh jika pasokan terputus).
  - *Stockpile 2 (Calsium):* 120,96 Ton (Habis dalam 40,32 jam operasional).
  - *Bin Silo Produk Akhir:* 72 m³ (86,4 Ton) $\rightarrow$ Buffer holding time 3,28 s.d. 4,32 jam (wajib dispatch truk tiap 2 jam).
- **Efisiensi Energi:** Pipa Gas PGN ($13,00/MMBTU) menghemat **Rp 53,8 Juta / bulan** dibanding CNG ($15,15/MMBTU).
- **Investasi Capex:** Rp 5,15 Miliar (Proyeksi BEP: 4,7 s.d. 12,3 bulan).

---

## 🎛️ Fitur Unggulan

1. **Virtual Time Machine & Runtime Scenario Engine:**
   - Jam digital operasional pabrik (`08:30:00` s.d. `16:30:00` WIB).
   - Tombol geser waktu (*Time Scrubber Slider*) untuk simulasi kondisi pabrik pada jam berapa pun.
   - Tombol geser kecepatan (*Speed Multiplier Slider*) dari 1x (realtime) hingga 120x (turbo).
   - Prediksi kuantitatif seketika: jam habisnya stok bentonite, jam penuhnya silo, dan jam kuota shift 140 ton tercapai.
   - Deteksi jeda istirahat siang otomatis (12:00 - 13:00) dengan status mesin standby.
2. **SCADA Live Process Flow Mimic:** Animasi konveyor live, intensitas api burner, pengisian silo, dan ritase truk.
3. **Kalkulator Biaya HPP & Finansial Reaktif:** Perhitungan HPP per ton, laba kotor, laba bersih, dan BEP dengan latensi 0ms.
4. **Simulator Bottleneck 1-Klik:** Skenario Truk Macet, Mesin Rusak, Lampu Mati, dan perhitungan kerugian kuantitatif.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 + Vite
- **Styling:** Tailwind CSS (Modern Industrial Dark SCADA Theme)
- **State & Simulation Engine:** Zustand (Zero-Latency Reactive Calculations)
- **Data Visualization:** Apache ECharts & Canvas
- **Icons:** Lucide React
- **CI/CD Deployment:** GitHub Actions $\rightarrow$ GitHub Pages
