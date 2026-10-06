@echo off
setlocal
cd /d "%~dp0"
title SCADA Dashboard - PT. Mineral Aditif Nusantara (Confidential Client)
color 0A
cls

echo =======================================================================
echo     DASHBOARD SCADA DAN SIMULATOR PABRIK - PT. MINERAL ADITIF NUSANTARA
echo =======================================================================
echo.
echo Sedang menyiapkan dashboard, mohon tunggu sebentar...
echo.

if not exist node_modules goto installdeps
goto startserver

:installdeps
echo [1/2] Memasang paket sistem untuk pertama kali, mohon tunggu...
call npm.cmd install
if errorlevel 1 goto errornode
echo.

:startserver
echo [2/2] Menjalankan server dashboard...
echo.
echo =======================================================================
echo Dashboard akan otomatis terbuka di browser Anda.
echo Alamat URL: http://localhost:5173/
echo.
echo PENTING: Jendela ini jangan ditutup selama Anda menggunakan dashboard.
echo =======================================================================
echo.

start http://localhost:5173/
call npm.cmd run dev
if errorlevel 1 goto errorrun
goto end

:errornode
echo.
echo [PERINGATAN] Komputer ini belum memiliki Node.js atau instalasi gagal!
echo Silakan unduh dan instal Node.js terlebih dahulu di:
echo https://nodejs.org/ (Pilih versi LTS)
echo.
pause
goto end

:errorrun
echo.
echo [PERINGATAN] Server berhenti atau port sedang digunakan.
echo.
pause
goto end

:end
