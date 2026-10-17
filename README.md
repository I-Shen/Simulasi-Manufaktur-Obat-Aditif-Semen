# Simulasi Manufaktur Obat Aditif Semen — Digital Twin & SCADA Runtime Engine

Sistem simulasi interaktif industri dan *Digital Twin* untuk proses pencampuran dan pengeringan bahan baku manufaktur obat aditif semen (**PT. Mineral Aditif Nusantara - Confidential Client**).

🌐 **Live Deployed Application:**  
👉 **[https://i-shen.github.io/Simulasi-Manufaktur-Obat-Aditif-Semen/](https://i-shen.github.io/Simulasi-Manufaktur-Obat-Aditif-Semen/)**

---

## 🏭 Parameter Teknis Desain Pabrik

- **Kapasitas Produksi:** 20.00 Ton / Jam (140.00 Ton per shift kerja dengan **7 jam kerja efektif**).
- **Jadwal Shift Kerja:** **08:30 – 16:30 WIB** (Total 8 Jam) dengan **Jeda Istirahat Siang 1 Jam (12:00 – 13:00 WIB)** di mana mesin berstatus *Standby*.
- **Rotary Drum Speed:** **4 – 9 RPM (Optimum 8 RPM)** (Revisi 2).
- **Komposisi Formulasi & HPP Bahan Baku (Revisi 2):**
  - $80\%$ Bentonite Clay Curah @ Rp 500 / kg = **Rp 400.000 / Ton**
  - $15\%$ Calsium Carbonate (CaCO3) @ Rp 275 / kg = **Rp 41.250 / Ton**
  - $5\%$ Soda Ash Dense (Na2CO3) @ Rp 5.000 / kg = **Rp 250.000 / Ton**
  - **Total HPP Bahan Baku:** **Rp 691.250 / Ton** (turun dari Rp 3.582.500 / Ton).
- **Struktur Harga Jual & Margin (Revisi 2):**
  - Harga Jual: **Rp 1.000.000 / Ton** (turun dari Rp 4.350.000 / Ton)
  - Biaya Maintenance: **Rp 139.006 / Ton**
  - Gross Margin: $1.000.000 - 691.250 - 139.006 =$ **Rp 169.744 / Ton (16,97%)**
- **Logistik & Buffer Kritis:**
  - *Stockpile 1 (Bentonite):* 134,4 Ton (Habis dalam 8,40 jam operasional penuh jika pasokan terputus).
  - *Stockpile 2 (Calsium):* 120,96 Ton (Habis dalam 40,32 jam operasional).
  - *Bin Silo Produk Akhir:* 72 m³ (86,4 Ton) $\rightarrow$ Buffer holding time 3,28 s.d. 4,32 jam (wajib dispatch truk tiap 2 jam).
- **Efisiensi Energi (Revisi 2):** Pipa Gas PGN (**Rp 173.880 / MMBTU**) menghemat **Rp 123,8 Juta / bulan** dibanding CNG ($15,15/MMBTU @ Rp 279.000 / MMBTU).
- **Investasi Capex:** Rp 5,15 Miliar.

---

## 📋 Catatan Sinkronisasi Database Revisi 2 (`Perubahan 2.txt` & Excel Master v3)

Telah dilakukan sinkronisasi menyeluruh terhadap database Excel terbaru (`Database_Simulasi_SCADA_dan_Operasional.xlsx`):
1. **Kecepatan Rotary Drum:** Disesuaikan menjadi **4 – 9 RPM (optimum 8 RPM)**.
2. **Sheet `master_bahan_baku`:**
   - `RAW-BEN-01` (Bentonite Clay 80%): **Rp 500 / kg**
   - `RAW-CAL-02` (Calsium Carbonate 15%): **Rp 275 / kg**
   - `EN-PGN-09` (Gas Alam Pipa): **Rp 173.880 / MMBTU**
   - `EN-CNG-10` (Compressed Natural Gas): **Rp 279.000 / MMBTU**
3. **Sheet `biaya_siklus_hpp`:**
   - `total_hpp_per_ton_rp`: $0.8 \times 500.000 + 0.15 \times 275.000 + 0.05 \times 5.000.000 = \mathbf{Rp\ 691.250 / Ton}$
   - `biaya_maintenance_per_ton_rp`: **Rp 139.006 / Ton**
   - `harga_jual_per_ton_rp`: **Rp 1.000.000 / Ton**
   - `gross_margin_per_ton_rp`: $1.000.000 - 691.250 - 139.006 = \mathbf{Rp\ 169.744 / Ton}\ (16,97\%)$
4. **Sheet `insiden_downtime_bottleneck`:**
   - Formula bahan bakar terbuang: $\text{Durasi (Jam)} \times \text{Konsumsi Gas (MMBTU/Jam)} \times \text{Tarif Gas PGN (Rp 173.880)}$
   - Formula kehilangan margin laba: $\text{Output Hilang (Ton)} \times \text{Gross Margin per Ton (Rp 169.744)}$
5. **Sheet Tambahan `simulasi_skenario_demand_range`:**
   - Menghubungkan demand 10, 15, 20, 25, 30 hari operasional dan skenario 1 s.d. 3 shift kerja.

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
4. **Simulator Bottleneck 1-Klik:** Skenario Truk Macet (3,5 jam), Mesin Rusak (2,0 jam), Lampu Mati (2,5 jam), serta formula terintegrasi.
5. **Akses Unduh File Excel Revisi:** Tersedia tombol unduh file Excel hasil revisi final langsung di navbar dashboard.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 + Vite
- **Styling:** Tailwind CSS (Modern Industrial Dark SCADA Theme)
- **State & Simulation Engine:** Zustand (Zero-Latency Reactive Calculations)
- **Data Visualization:** Apache ECharts & Canvas
- **Icons:** Lucide React
- **CI/CD Deployment:** GitHub Actions $\rightarrow$ GitHub Pages
