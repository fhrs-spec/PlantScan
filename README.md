# 🌱 PlantScan - Deteksi Penyakit Tanaman AI

PlantScan adalah aplikasi web cerdas (berbasis Progressive Web App / PWA) yang dirancang untuk membantu petani, pecinta tanaman hias, dan ahli botani dalam mendeteksi penyakit tanaman secara instan. Dengan memanfaatkan kekuatan AI (Artificial Intelligence), aplikasi ini dapat menganalisis foto daun atau tanaman dan memberikan diagnosis yang akurat beserta rekomendasinya.

---

## ✨ Fitur Utama

- **🤖 Deteksi AI Cerdas**: Menggunakan teknologi AI tingkat lanjut (Google Gemini Vision) untuk menganalisis gambar tanaman secara akurat.
- **📱 Dukungan PWA (Progressive Web App)**: Bisa diinstal langsung di HP (Android/iOS) dan Desktop layaknya aplikasi native. Memiliki dukungan *Service Worker* (bisa cache file offline).
- **🛡️ Keamanan Sistem (Rate Limiter)**: Dilengkapi dengan sistem pembatasan request (*Rate Limiting*) untuk mencegah spamming dan pembengkakan tagihan API.
- **⚡ Serverless Architecture**: Performa tinggi dan biaya server rendah karena *backend* menggunakan Vercel Serverless Functions.
- **🎨 UI/UX Modern & Responsif**: Tampilan antarmuka yang bersih, mudah digunakan oleh siapa saja, dan responsif di berbagai ukuran layar.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (Tanpa Framework, lebih ringan).
- **Backend / API**: Node.js (Vercel Serverless Functions).
- **AI Engine**: Google Gemini API.

---

## 🚀 Cara Setup & Instalasi (Panduan untuk Pembeli)

Karena aplikasi ini menggunakan Vercel Serverless Functions untuk menjalankan API, cara terbaik dan termudah untuk mendeploy aplikasi ini adalah menggunakan **Vercel**.

### 1. Persiapan API Key
1. Buka [Google AI Studio](https://aistudio.google.com/).
2. Login dan buat **API Key** baru (Gemini API).
3. Simpan API Key tersebut.

### 2. Konfigurasi Environment Variables
1. Duplikat atau rename file `.env.example` menjadi `.env`.
2. Buka file `.env` dan masukkan API Key kamu:
   ```env
   GEMINI_API_KEY=AIzaSyYourAPIKeyHere...
   ```
*(Catatan: File `.env` tidak akan ikut ter-upload ke repository berkat `.gitignore`, sehingga aman).*

### 3. Deploy ke Vercel (Gratis & Cepat)
Aplikasi ini sudah dilengkapi dengan file konfigurasi `vercel.json`.
1. Upload folder project ini ke repository GitHub pribadi kamu.
2. Login ke [Vercel](https://vercel.com/) menggunakan akun GitHub.
3. Klik **Add New Project** dan pilih repository yang baru saja kamu upload.
4. Pada bagian **Environment Variables** di Vercel Dashboard, tambahkan variabel baru:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: *(Paste API Key Gemini kamu di sini)*
5. Klik **Deploy**. Selesai! Aplikasi PlantScan kamu sudah *live* dan bisa diakses secara global.

---

## 📖 Struktur Folder (Singkat)
- `index.html` : Halaman utama aplikasi.
- `style.css` : Tampilan desain (CSS).
- `script.js` : Logika frontend (Kamera, upload, animasi).
- `manifest.json` & `sw.js` : Konfigurasi untuk PWA (Progressive Web App).
- `/api` : Folder backend Serverless Vercel.
  - `analyze.js` : Skrip utama untuk menghubungi AI dan memproses Rate Limiting.
  - `diseaseData.js` : Data pendukung (jika ada).

---

## 📄 Lisensi
Project ini adalah hak milik pembeli setelah transaksi selesai. Dilarang mendistribusikan ulang source code ini secara publik tanpa izin kecuali telah diatur dalam perjanjian pembelian.
