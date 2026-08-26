# PlantScan

Web app untuk mendeteksi penyakit tanaman dari foto daun atau buah menggunakan Google Gemini Vision API. Dilengkapi rekomendasi penanganan dan chatbot dokter tanaman untuk konsultasi perawatan.

Demo: [https://plantscan-webapp.vercel.app/](https://plantscan-webapp.vercel.app/)

## Fitur

- **Deteksi Penyakit**: Upload foto atau ambil langsung lewat kamera untuk cek kondisi daun dan buah.
- **Hasil Diagnosis**: Menampilkan nama penyakit, penyebab, tingkat keparahan, serta saran penanganan organik & kimiawi.
- **Tanya Dokter Tanaman**: Chatbot berbasis AI untuk tanya-jawab lanjutan seputar perawatan tanaman yang baru di-scan.
- **Filter Foto**: Prompt sudah disesuaikan agar menolak foto jika yang di-upload bukan bagian tanaman.
- **PWA (Progressive Web App)**: Bisa di-install di HP atau desktop, dengan caching aset agar cepat dibuka.
- **Mode Simulasi**: Jika dijalankan tanpa API key, aplikasi otomatis menggunakan data mock agar flow tetap bisa diuji.
- **Bilingual**: Tersedia pilihan Bahasa Indonesia dan Bahasa Inggris.
- **Dashboard Admin**: Halaman `admin.html` untuk melihat simulasi statistik dan riwayat scan.

## Tech Stack

- **Frontend**: HTML5, Vanilla CSS, Vanilla JavaScript
- **Backend**: Node.js Serverless Functions (Vercel)
- **AI**: Google Gemini API (Gemini Vision & Chat)

## Menjalankan di Lokal

### 1. Persiapan
Ambil API key Gemini gratis di [Google AI Studio](https://aistudio.google.com/).

### 2. Setup Environment
Clone repo ini, lalu buat file `.env` dari template:

```bash
cp .env.example .env
```

Buka `.env` dan masukkan API key kamu:
```env
GEMINI_API_KEY=isi_api_key_kamu_disini
```

### 3. Jalankan Aplikasi

**Cara 1 — Menggunakan Vercel CLI (Direkomendasikan)**  
Agar fungsi backend di folder `/api` aktif dan bisa request ke Gemini:
```bash
npx vercel dev
```
Lalu buka `http://localhost:3000` di browser.

**Cara 2 — Menggunakan Live Server biasa (Mode Simulasi)**  
Buka `index.html` langsung lewat VS Code Live Server. Mode ini otomatis memakai data simulasi tanpa memanggil API backend.

## Deploy ke Vercel

1. Push project ini ke repository GitHub.
2. Buka [Vercel](https://vercel.com) dan import repository-nya.
3. Di menu **Environment Variables**, tambahkan `GEMINI_API_KEY`.
4. Klik **Deploy**.

## Struktur Project

```text
api/
  analyze.js       # Endpoint analisis foto (Gemini Vision) + rate limit
  chat.js          # Endpoint chatbot konsultasi perawatan
  diseaseData.js   # Konteks data penyakit 20+ jenis tanaman
index.html         # Halaman utama aplikasi & scanner
admin.html         # Halaman simulasi admin dashboard
style.css          # Styling utama
script.js          # Logika frontend & kamera
lang.js            # Kamus bahasa (ID / EN)
sw.js              # Service worker PWA
vercel.json        # Routing rewrite Vercel
```

## Catatan

- Foto yang di-upload hanya diproses saat request analisis berjalan dan tidak disimpan di server.
- Ada rate limiter sederhana berbasis IP di backend untuk mencegah spam ke API Gemini.