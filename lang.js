const translations = {
  id: {
    nav_deteksi: "Deteksi",
    nav_fitur: "Fitur",
    nav_panduan: "Panduan",
    nav_login: "Login",
    nav_scan: "Mulai Scan",
    hero_title: "Deteksi <em>Penyakit</em><br>Tanamanmu",
    hero_desc: "Upload foto daun atau buah tanamanmu — AI menganalisis kondisinya secara mendalam, memberikan diagnosis akurat dan rekomendasi penanganan.",
    pill_1: "Daun & Buah",
    pill_3: "20+ Tanaman",
    pill_4: "Instan",
    
    // Auth & Dashboard
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
    placeholder_email: "Alamat Email",
    placeholder_password: "Kata Sandi",
    
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
    picker_req: "WAJIB",
    picker_title: "Pilih Jenis Tanaman",
    h1_title: "Pilih Jenis Tanaman",
    h1_desc: "Pilih jenis tanaman dari daftar yang tersedia. Langkah ini wajib agar AI dapat memberikan analisis yang lebih terfokus dan akurat.",
    h2_title: "Siapkan Foto yang Baik",
    h2_desc: "Ambil foto daun atau buah yang menunjukkan gejala dengan pencahayaan cukup. Jarak ideal 20–30 cm agar detail terlihat jelas.",
    h3_title: "Unggah atau Ambil Foto",
    h3_desc: "Seret foto ke area drop zone, klik \"Pilih Foto\" untuk memilih dari galeri, atau gunakan kamera langsung dari aplikasi.",
    h4_title: "Tunggu Analisis AI",
    h4_desc: "Gemini AI menganalisis gambar secara mendalam — biasanya selesai dalam 5–15 detik tergantung koneksi internet.",
    h5_title: "Baca & Tindak Lanjuti",
    h5_desc: "Baca diagnosis lengkap, pahami penyebab penyakit, dan ikuti rekomendasi penanganan yang diberikan AI.",
    // UI Elements
    page_title: "PlantScan — Deteksi Penyakit Tanaman AI",
    no_result: "🌿 Tanaman tidak ditemukan",
    drop_text: "Seret foto ke sini",
    drop_sub1: "JPG · PNG · WEBP · maks 5 MB",
    drop_sub2: "Bisa foto <strong>daun</strong> maupun <strong>buah</strong> tanaman",
    btn_upload: "Pilih Foto",
    btn_camera: "Kamera",
    upload_hint: "Pilih jenis tanaman terlebih dahulu",
    processing: "Memproses...",
    change_photo: "Ganti Foto",
    tips_title: "💡 Tips Foto Terbaik",
    tip1: "Fokus pada satu daun atau buah yang jelas terlihat",
    tip2: "Pastikan pencahayaan cukup, hindari bayangan gelap",
    tip3: "Jarak ideal 20–30 cm dari objek foto",
    tip4: "Seluruh objek (daun/buah) harus masuk dalam frame",
    ai_analyzing: "AI Menganalisis Foto...",
    ai_note: "Menggunakan Google Gemini AI untuk deteksi akurat",
    footer_desc: "Aplikasi AI Deteksi Penyakit Tanaman<br>Analisis visual ditenagai oleh Google Gemini AI melalui Vercel Serverless.",
    cam_title: "📷 Ambil Foto Tanaman",
    cam_snap: "Ambil Foto",
    cam_cancel: "Batal",

    // Script texts
    toast_select_first: "⚠️ Pilih jenis tanaman dahulu ya!",
    toast_format: "Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.",
    toast_size: "❌ Ukuran file maksimal 10 MB",
    toast_selected: "dipilih — silakan unggah foto daun atau buah",
    loader_1: "Memuat gambar...",
    loader_2: "Menghubungkan ke server cerdas...",
    loader_3: "Menganalisis pola penyakit...",
    loader_4: "Menyiapkan hasil...",
    ai_confidence: "Tingkat Kepercayaan AI",
    obs_result: "Hasil Observasi",
    symp: "Gejala Terlihat",
    pathogen: "Patogen",
    cause: "Penyebab",
    impact: "Dampak",
    action: "Saran Tindakan",
    scan_again: "Scan Lagi",
    share: "Bagikan",
    diag_error: "Gagal memproses diagnosis.",
    err_server: "Terjadi kesalahan pada server. Coba beberapa saat lagi.",
    err_cam: "❌ Tidak dapat mengakses kamera",
    toast_offline: "⚠️ Anda sedang offline. Fitur scan AI tidak tersedia.",
    toast_online: "✅ Kembali terhubung ke internet.",
    toast_limit: "Batas scan gratis (1x) telah habis. Silakan login.",
    toast_login_req: "Silakan masukkan email",
    toast_login_invalid: "Silakan sertakan '@' dalam alamat email",
    toast_login_ok: "Berhasil Login! Akses scan tanpa batas terbuka.",
    toast_logout: "Berhasil Logout.",
    copied: "Hasil disalin ke clipboard!",
    export_pdf: "Download PDF",
    toast_pdf_gen: "📄 Menyiapkan dokumen PDF...",
    toast_pdf_done: "✅ Laporan PDF berhasil diunduh!",
    chat_title: "Asisten Dokter Tanaman AI",
    chat_badge: "🌿 Khusus Kesehatan Tanaman",
    chat_subtitle: "Tanyakan dosis obat, perawatan, pencegahan, atau risiko penularan.",
    chat_placeholder: "Ketik pertanyaan seputar tanamanmu...",
    chat_send: "Kirim",
    chat_chip1: "💊 Berapa dosis obat yang digunakan?",
    chat_chip2: "🦠 Apakah ini menular ke tanaman lain?",
    chat_chip3: "🛡️ Bagaimana cara pencegahan agar tidak terulang?",
    chat_guard_refusal: "Maaf, saya adalah AI Dokter Tanaman yang khusus dirancang untuk menjawab topik seputar kesehatan tanaman, penyakit tumbuhan, pemupukan, dan perawatan pertanian. Silakan tanyakan hal-hal yang berkaitan dengan tanaman atau hasil pemindaian Anda! 🌿",
    chat_thinking: "🌿 Asisten dokter tanaman sedang berpikir...",
    chat_open: "Tanya Dokter Tanaman AI",
    chat_close: "Tutup",
    chat_context_label: "Konteks Diagnosis Aktif",
    chat_no_context: "Belum ada diagnosis aktif. Anda tetap bisa bertanya seputar perawatan tanaman secara umum.",
    chat_welcome_general: "Halo! Saya <strong>Asisten Dokter Tanaman AI</strong> PlantScan. Silakan tanyakan apa saja seputar perawatan tanaman, pupuk, hama, atau penyakit tanaman Anda! 🌿",
    chat_chip4: "💧 Bagaimana cara menyiram yang benar?",
    chat_chip5: "🧪 Pupuk apa yang cocok untuk tanaman saya?",
    chat_clear: "Hapus Chat",
    toast_chat_cleared: "Riwayat chat telah dihapus."
  },
  en: {
    nav_deteksi: "Scan",
    nav_fitur: "Features",
    nav_panduan: "Guide",
    nav_login: "Login",
    nav_scan: "Start Scan",
    hero_title: "Detect <em>Plant</em><br>Diseases",
    hero_desc: "Upload a photo of your plant's leaf or fruit — AI analyzes its condition deeply, providing accurate diagnosis and treatment recommendations.",
    pill_1: "Leaves & Fruits",
    pill_3: "20+ Plants",
    pill_4: "Instant",
    
    // Auth & Dashboard
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
    placeholder_email: "Email Address",
    placeholder_password: "Password",

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
    picker_req: "REQUIRED",
    picker_title: "Select Plant Type",
    h1_title: "Select Plant Type",
    h1_desc: "Choose a plant type from the list. This step is mandatory so AI can provide focused and accurate analysis.",
    h2_title: "Prepare a Good Photo",
    h2_desc: "Take a photo of the leaf or fruit showing symptoms with good lighting. Ideal distance is 20-30 cm for clear details.",
    h3_title: "Upload or Snap Photo",
    h3_desc: "Drag photo to the drop zone, click \"Upload Photo\" to choose from gallery, or use the camera directly.",
    h4_title: "Wait for AI Analysis",
    h4_desc: "Gemini AI analyzes the image deeply — usually completes in 5-15 seconds depending on internet connection.",
    h5_title: "Read & Take Action",
    h5_desc: "Read the complete diagnosis, understand the causes, and follow the treatment recommendations given by AI.",
    // UI Elements
    page_title: "PlantScan — AI Plant Disease Detection",
    no_result: "🌿 Plant not found",
    drop_text: "Drag photo here",
    drop_sub1: "JPG · PNG · WEBP · max 5 MB",
    drop_sub2: "Can be photo of plant <strong>leaf</strong> or <strong>fruit</strong>",
    btn_upload: "Choose Photo",
    btn_camera: "Camera",
    upload_hint: "Select plant type first",
    processing: "Processing...",
    change_photo: "Change Photo",
    tips_title: "💡 Best Photo Tips",
    tip1: "Focus clearly on one leaf or fruit",
    tip2: "Ensure good lighting, avoid dark shadows",
    tip3: "Ideal distance is 20–30 cm from the object",
    tip4: "The entire object (leaf/fruit) must be in frame",
    ai_analyzing: "AI Analyzing Photo...",
    ai_note: "Powered by Google Gemini AI for accurate detection",
    footer_desc: "AI Plant Disease Detection Application<br>Visual analysis powered by Google Gemini AI via Vercel Serverless.",
    cam_title: "📷 Take Plant Photo",
    cam_snap: "Take Photo",
    cam_cancel: "Cancel",

    // Script texts
    toast_select_first: "⚠️ Please select a plant type first!",
    toast_format: "Unsupported file format. Use JPG, PNG, or WEBP.",
    toast_size: "❌ Max file size is 10 MB",
    toast_selected: "selected — please upload a photo of the leaf or fruit",
    loader_1: "Loading image...",
    loader_2: "Connecting to smart server...",
    loader_3: "Analyzing disease patterns...",
    loader_4: "Preparing results...",
    ai_confidence: "AI Confidence Level",
    obs_result: "Observation Results",
    symp: "Visible Symptoms",
    pathogen: "Pathogen",
    cause: "Cause",
    impact: "Impact",
    action: "Action Recommendations",
    scan_again: "Scan Again",
    share: "Share",
    diag_error: "Failed to process diagnosis.",
    err_server: "Server error occurred. Please try again later.",
    err_cam: "❌ Cannot access camera",
    toast_offline: "⚠️ You are offline. AI scan is not available.",
    toast_online: "✅ Back online.",
    toast_limit: "Free scan limit (1x) reached. Please login.",
    toast_login_req: "Please enter your email",
    toast_login_invalid: "Please include an '@' in the email address",
    toast_login_ok: "Login Successful! Unlimited scan access unlocked.",
    toast_logout: "Logout Successful.",
    copied: "Results copied to clipboard!",
    export_pdf: "Download PDF",
    toast_pdf_gen: "📄 Preparing PDF document...",
    toast_pdf_done: "✅ PDF report downloaded successfully!",
    chat_title: "AI Plant Doctor Assistant",
    chat_badge: "🌿 Plant Health Specialized",
    chat_subtitle: "Ask about treatment dosage, care routines, prevention, or contagion risks.",
    chat_placeholder: "Ask a question about your plant...",
    chat_send: "Send",
    chat_chip1: "💊 What medication dosage should I use?",
    chat_chip2: "🦠 Is this contagious to other plants?",
    chat_chip3: "🛡️ How to prevent this from recurring?",
    chat_guard_refusal: "Sorry, I am an AI Plant Doctor specifically designed to answer questions related to plant health, pathology, fertilization, and crop care. Please feel free to ask anything about plants or your scan results! 🌿",
    chat_thinking: "🌿 Plant doctor assistant is thinking...",
    chat_open: "Ask AI Plant Doctor",
    chat_close: "Close",
    chat_context_label: "Active Diagnosis Context",
    chat_no_context: "No active diagnosis. You can still ask general plant care questions.",
    chat_welcome_general: "Hello! I'm your <strong>AI Plant Doctor Assistant</strong> from PlantScan. Ask me anything about plant care, fertilizers, pests, or plant diseases! 🌿",
    chat_chip4: "💧 What's the proper way to water my plant?",
    chat_chip5: "🧪 What fertilizer suits my plant?",
    chat_clear: "Clear Chat",
    toast_chat_cleared: "Chat history cleared."
  }
};

let currentLang = localStorage.getItem('plantscan_lang') || 'id';

function switchLanguageAndReload(lang) {
  if (currentLang === lang) return;
  localStorage.setItem('plantscan_lang', lang);
  location.reload();
}

// Dropdown Menu Toggle
function toggleLangMenu() {
  document.getElementById('lang-dropdown').classList.toggle('open');
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('lang-dropdown');
  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});

function applyLang() {
  const lang = currentLang;
  document.documentElement.lang = lang;
  
  // Update button label
  const label = document.getElementById('current-lang-label');
  if(label) label.textContent = lang === 'en' ? 'EN' : 'ID';

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

// Global translator function for script.js
window.t = function(key) {
  return (translations[currentLang] && translations[currentLang][key]) || key;
};

document.addEventListener('DOMContentLoaded', applyLang);
