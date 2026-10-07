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
- **Efisiensi Energi:** Pipa Gas PGN ($13,00/MMBTU @ Rp 234.000/MMBTU) menghemat **Rp 53,0 Juta / bulan** dibanding CNG ($15,15/MMBTU @ Rp 279.000/MMBTU).
- **Investasi Capex:** Rp 5,15 Miliar (Proyeksi BEP: 4,7 bulan pada target 3.500 Ton/bulan).

---

## 📋 Catatan Revisi Database Final (Berdasarkan Perubahan.txt)

Telah dilakukan sinkronisasi menyeluruh terhadap database Excel terbaru (`Database_Simulasi_SCADA_dan_Operasional.xlsx`):
1. **Sheet `insiden_downtime_bottleneck` (Point 1):** Penamaan kolom `penalti_reheat` disesuaikan menjadi **`bahan_bakar_terbuang_rp`**.
2. **Sheet `insiden_downtime_bottleneck` (Point 2):** Formula bahan bakar terbuang diperbarui menjadi:
   $$\text{Bahan Bakar Terbuang} = \text{Durasi (Jam)} \times \text{Konsumsi Gas (MMBTU/Jam)} \times \text{Tarif Gas per MMBTU}$$
   - Contoh DWT Truk Macet (3,5 Jam): $3,5 \times 6,732 \times 234.000 = \mathbf{Rp\ 5.513.181}$.
3. **Sheet `insiden_downtime_bottleneck` (Point 3):** Formula kehilangan margin laba diperbarui menjadi:
   $$\text{Kehilangan Margin Laba} = \text{Output Hilang (Ton)} \times \text{Gross Margin per Ton (Rp 628.494)}$$
   - Contoh DWT Truk Macet (70 Ton): $70 \times 628.494 = \mathbf{Rp\ 43.994.580}$.
4. **Sheet `biaya_siklus_hpp` (Point 4):** Nilai `biaya_maintenance_per_ton_rp` (Kolom K) ditetapkan sebesar **Rp 139.006 / Ton**.
5. **Sheet `biaya_siklus_hpp` (Point 5):** Formula `gross_margin_per_ton_rp` (Kolom N) diperbarui menjadi `= M3 - L3 - K3`:
   $$\text{Gross Margin} = \text{Harga Jual (4.350.000)} - \text{HPP (3.582.500)} - \text{Maintenance (139.006)} = \mathbf{Rp\ 628.494 / Ton}\ (14,45\%)$$
6. **Sheet `master_bahan_baku` (Point 6):** Penyesuaian tarif energi gas per MMBTU:
   - `EN-PGN-09` (Gas Alam Pipa PGN $13): **Rp 234.000 / MMBTU**
   - `EN-CNG-10` (Compressed Natural Gas CNG $15.15): **Rp 279.000 / MMBTU**

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
