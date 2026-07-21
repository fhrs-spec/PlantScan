const translations = {
  id: {
    nav_deteksi: "Deteksi",
    nav_fitur: "Fitur",
    nav_panduan: "Panduan",
    nav_login: "Login",
    nav_scan: "Mulai Scan",
    hero_badge: "Project By Fharsdev",
    hero_title: "Deteksi <em>Penyakit</em><br>Tanamanmu",
    hero_desc: "Upload foto daun atau buah tanamanmu — AI menganalisis kondisinya secara mendalam, memberikan diagnosis akurat dan rekomendasi penanganan.",
    picker_title: "Pilih Jenis Tanaman",
    search_placeholder: "Cari tanaman...",
    upload_title: "Unggah Foto",
    upload_desc: "Tarik & lepas foto di sini, atau klik untuk memilih",
    camera_btn: "Gunakan Kamera",
    scan_btn: "Deteksi Sekarang",
    history_title: "Riwayat Pemindaian",
    history_sub: "Catatan diagnosis tanaman Anda sebelumnya",
    history_clear: "Hapus",
    modal_login_title: "Masuk ke PlantScan",
    modal_login_desc: "Dapatkan akses scan tanpa batas",
    modal_login_btn: "Masuk Sekarang",
    
    // Fitur Section
    feat_title: "Fitur Unggulan",
    feat_sub: "Semua yang kamu butuhkan untuk menjaga kesehatan tanaman",
    f1_title: "AI Vision Nyata",
    f1_desc: "Menggunakan Gemini AI yang sesungguhnya untuk menganalisis foto — bukan database statis, melainkan pemahaman visual mendalam.",
    f2_title: "Daun & Buah",
    f2_desc: "Bukan hanya daun — PlantScan bisa mendeteksi penyakit pada buah tanaman juga, dengan analisis menyeluruh.",
    f3_title: "20+ Jenis Tanaman",
    f3_desc: "Database tanaman terus berkembang, mencakup sayuran, buah-buahan, dan tanaman pangan populer Indonesia.",
    f4_title: "Diagnosis Mendalam",
    f4_desc: "Hasil analisis lengkap: nama penyakit, penyebab, gejala, tingkat keparahan, dan rekomendasi penanganan spesifik.",
    f5_title: "Ramah Semua Perangkat",
    f5_desc: "Antarmuka responsif yang nyaman digunakan di HP, tablet, maupun komputer dengan performa optimal.",
    f6_title: "Privasi Terjaga",
    f6_desc: "Foto hanya diproses saat analisis berlangsung dan tidak disimpan di server manapun setelah selesai.",

    // Cara Pakai Section
    how_title: "Cara Menggunakan",
    how_sub: "Lima langkah mudah menuju diagnosis akurat",
    h1_title: "Pilih Jenis Tanaman",
    h1_desc: "Pilih jenis tanaman dari daftar yang tersedia. Langkah ini wajib agar AI dapat memberikan analisis yang lebih terfokus dan akurat.",
    h2_title: "Siapkan Foto yang Baik",
    h2_desc: "Ambil foto daun atau buah yang menunjukkan gejala dengan pencahayaan cukup. Jarak ideal 20–30 cm agar detail terlihat jelas.",
    h3_title: "Unggah atau Ambil Foto",
    h3_desc: "Seret foto ke area drop zone, klik \"Pilih Foto\" untuk memilih dari galeri, atau gunakan kamera langsung dari aplikasi.",
    h4_title: "Tunggu Analisis AI",
    h4_desc: "Gemini AI menganalisis gambar secara mendalam — biasanya selesai dalam 5–15 detik tergantung koneksi internet.",
    h5_title: "Baca & Tindak Lanjuti",
    h5_desc: "Baca diagnosis lengkap, pahami penyebab penyakit, dan ikuti rekomendasi penanganan yang diberikan AI."
  },
  en: {
    nav_deteksi: "Scan",
    nav_fitur: "Features",
    nav_panduan: "Guide",
    nav_login: "Login",
    nav_scan: "Start Scan",
    hero_badge: "Project By Fharsdev",
    hero_title: "Detect Your Plant's<br><em>Diseases</em>",
    hero_desc: "Upload a photo of your plant's leaf or fruit — AI will deeply analyze its condition, providing accurate diagnosis and treatment recommendations.",
    picker_title: "Select Plant Type",
    search_placeholder: "Search plants...",
    upload_title: "Upload Photo",
    upload_desc: "Drag & drop photo here, or click to select",
    camera_btn: "Use Camera",
    scan_btn: "Detect Now",
    history_title: "Scan History",
    history_sub: "Your previous plant diagnosis records",
    history_clear: "Clear",
    modal_login_title: "Login to PlantScan",
    modal_login_desc: "Get unlimited scanning access",
    modal_login_btn: "Login Now",

    // Fitur Section
    feat_title: "Key Features",
    feat_sub: "Everything you need to keep your plants healthy",
    f1_title: "Real AI Vision",
    f1_desc: "Powered by true Gemini AI to analyze photos — not a static database, but deep visual understanding.",
    f2_title: "Leaves & Fruits",
    f2_desc: "Not just leaves — PlantScan can detect diseases on plant fruits too, with comprehensive analysis.",
    f3_title: "20+ Plant Types",
    f3_desc: "Our plant database keeps growing, covering popular vegetables, fruits, and food crops.",
    f4_title: "In-depth Diagnosis",
    f4_desc: "Complete analysis results: disease name, causes, symptoms, severity, and specific treatment recommendations.",
    f5_title: "Device Friendly",
    f5_desc: "Responsive interface that's comfortable to use on mobile phones, tablets, or computers with optimal performance.",
    f6_title: "Privacy Protected",
    f6_desc: "Photos are only processed during analysis and are not stored on any server after completion.",

    // Cara Pakai Section
    how_title: "How to Use",
    how_sub: "Five easy steps to accurate diagnosis",
    h1_title: "Select Plant Type",
    h1_desc: "Choose a plant type from the list. This step is mandatory so AI can provide focused and accurate analysis.",
    h2_title: "Prepare a Good Photo",
    h2_desc: "Take a photo of the leaf or fruit showing symptoms with good lighting. Ideal distance is 20-30 cm for clear details.",
    h3_title: "Upload or Snap Photo",
    h3_desc: "Drag photo to the drop zone, click \"Upload Photo\" to choose from gallery, or use the camera directly.",
    h4_title: "Wait for AI Analysis",
    h4_desc: "Gemini AI analyzes the image deeply — usually completes in 5-15 seconds depending on internet connection.",
    h5_title: "Read & Take Action",
    h5_desc: "Read the complete diagnosis, understand the causes, and follow the treatment recommendations given by AI."
  }
};

let currentLang = localStorage.getItem('plantscan_lang') || 'id';

function switchLanguageAndReload(lang) {
  if (currentLang === lang) return;
  localStorage.setItem('plantscan_lang', lang);
  location.reload();
}

function applyLang() {
  const lang = currentLang;
  
  // Update buttons
  const btnId = document.getElementById('lang-id');
  const btnEn = document.getElementById('lang-en');
  if(btnId) btnId.classList.toggle('active', lang === 'id');
  if(btnEn) btnEn.classList.toggle('active', lang === 'en');

  // Update simple text
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update HTML content
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
}

document.addEventListener('DOMContentLoaded', applyLang);
