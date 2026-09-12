const translations = {
  id: {
    nav_deteksi: "Deteksi",
    nav_fitur: "Fitur",
    nav_panduan: "Panduan",
    nav_login: "Login",
    nav_scan: "Mulai Scan",
    hero_title: "Deteksi <em>Penyakit</em><br>Tanamanmu",
    hero_desc: "Upload foto daun atau buah tanamanmu untuk memeriksa kondisinya, mengidentifikasi potensi penyakit, dan mendapatkan saran penanganan praktis.",
    pill_1: "Daun & Buah",
    pill_2: "Vision API",
    pill_3: "20+ Tanaman",
    pill_4: "Hasil Cepat",
    
    // Auth & Dashboard
    picker_title: "Pilih Jenis Tanaman",
    search_placeholder: "Cari tanaman...",
    upload_title: "Unggah Foto",
    upload_desc: "Tarik & lepas foto di sini, atau klik untuk memilih",
    camera_btn: "Gunakan Kamera",
    scan_btn: "Analisis Foto",
    history_title: "Riwayat Pemindaian",
    history_sub: "Catatan diagnosis tanaman Anda sebelumnya",
    history_clear: "Hapus",
    modal_login_title: "Masuk ke PlantScan",
    modal_login_desc: "Dapatkan akses scan tanpa batas",
    modal_login_btn: "Masuk Sekarang",
    placeholder_email: "Alamat Email",
    placeholder_password: "Kata Sandi",
    
    // Fitur Section
    feat_title: "Fitur Utama",
    feat_sub: "Bantu menjaga tanaman tetap sehat dan terawat",
    f1_title: "Pemeriksaan Visual",
    f1_desc: "Menganalisis foto daun dan buah untuk mengidentifikasi gejala penyakit yang tampak pada tanaman.",
    f2_title: "Daun & Buah",
    f2_desc: "Bisa memeriksa daun maupun buah tanaman untuk deteksi gejala yang lebih menyeluruh.",
    f3_title: "20+ Jenis Tanaman",
    f3_desc: "Mencakup sayuran, buah-buahan, tanaman pangan, dan tanaman hias populer.",
    f4_title: "Laporan Diagnosis Jelas",
    f4_desc: "Menampilkan nama kondisi, penyebab umum, gejala visual, tingkat keparahan, serta langkah penanganan.",
    f5_title: "Mudah Digunakan di Semua Perangkat",
    f5_desc: "Tampilan responsif dan nyaman digunakan di ponsel, tablet, maupun komputer.",
    f6_title: "Privasi Terjaga",
    f6_desc: "Foto hanya diproses saat analisis berlangsung dan tidak disimpan di server setelah selesai.",

    // Cara Pakai Section
    how_title: "Cara Menggunakan",
    how_sub: "Lima langkah mudah menuju diagnosis tanaman",
    picker_req: "WAJIB",
    picker_title: "Pilih Jenis Tanaman",
    h1_title: "Pilih Jenis Tanaman",
    h1_desc: "Pilih jenis tanaman dari daftar agar sistem dapat mencocokkan gejala dengan referensi yang tepat.",
    h2_title: "Siapkan Foto yang Jelas",
    h2_desc: "Ambil foto daun atau buah yang menunjukkan gejala dengan pencahayaan cukup dan jarak ideal 20–30 cm.",
    h3_title: "Unggah atau Ambil Foto",
    h3_desc: "Pilih foto dari galeri atau gunakan kamera langsung untuk mengambil gambar tanaman.",
    h4_title: "Tunggu Hasil Analisis",
    h4_desc: "Sistem memeriksa pola pada gambar tanaman Anda — biasanya selesai dalam 5–15 detik.",
    h5_title: "Tinjau Saran Perawatan",
    h5_desc: "Pelajari hasil diagnosis, pahami faktor penyebabnya, dan terapkan saran perawatan yang direkomendasikan.",

    // UI Elements
    page_title: "PlantScan — Deteksi Penyakit Tanaman",
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
    tip4: "Seluruh objek (daun/buah) masuk ke dalam frame",
    ai_analyzing: "Menganalisis Foto...",
    ai_note: "Analisis visual berbasis Vision API",
    footer_desc: "Aplikasi Deteksi Penyakit Tanaman<br>Analisis foto dan panduan perawatan tanaman.",
    cam_title: "📷 Ambil Foto Tanaman",
    cam_snap: "Ambil Foto",
    cam_cancel: "Batal",

    // Script texts
    toast_select_first: "⚠️ Silakan pilih jenis tanaman terlebih dahulu.",
    toast_format: "Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.",
    toast_size: "❌ Ukuran file maksimal 10 MB.",
    toast_selected: "dipilih — silakan unggah foto daun atau buah",
    loader_1: "Memuat gambar...",
    loader_2: "Menghubungkan ke server analisis...",
    loader_3: "Memeriksa gejala pada tanaman...",
    loader_4: "Menyusun ringkasan diagnosis...",
    ai_confidence: "Tingkat Keyakinan Analisis",
    obs_result: "Hasil Pengamatan",
    symp: "Gejala Terlihat",
    pathogen: "Patogen / Agen",
    cause: "Penyebab",
    impact: "Dampak Lanjutan",
    action: "Saran Penanganan",
    scan_again: "Analisis Lagi",
    share: "Bagikan",
    diag_error: "Gagal memproses diagnosis.",
    err_server: "Terjadi gangguan saat memproses analisis. Silakan coba sesaat lagi.",
    err_cam: "❌ Tidak dapat mengakses kamera perangkat",
    toast_offline: "⚠️ Perangkat sedang offline. Sambungkan internet untuk menganalisis foto.",
    toast_online: "✅ Kembali terhubung ke internet.",
    toast_limit: "Batas pemindaian tamu (1x) telah digunakan. Silakan masuk untuk melanjutkan.",
    toast_login_req: "Silakan masukkan alamat email.",
    toast_login_invalid: "Sertakan tanda '@' pada alamat email.",
    toast_login_ok: "Berhasil masuk. Akses analisis aktif.",
    toast_logout: "Berhasil keluar.",
    copied: "Hasil disalin ke clipboard.",
    export_pdf: "Unduh PDF",
    toast_pdf_gen: "📄 Menyiapkan dokumen laporan...",
    toast_pdf_done: "✅ Laporan PDF berhasil diunduh.",
    chat_title: "Konsultasi Dokter Tanaman",
    chat_badge: "🌿 Panduan Perawatan Tanaman",
    chat_subtitle: "Tanyakan dosis obat, jadwal siram, pemupukan, atau pencegahan.",
    chat_placeholder: "Tanyakan sesuatu tentang tanaman ini...",
    chat_send: "Kirim",
    chat_chip1: "💊 Berapa takaran obat atau fungisida yang tepat?",
    chat_chip2: "🦠 Apakah penyakit ini berisiko menular ke tanaman lain?",
    chat_chip3: "🛡️ Bagaimana langkah pencegahan agar tidak terulang?",
    chat_guard_refusal: "Maaf, asisten ini dirancang khusus untuk topik seputar kesehatan tanaman, perawatan, pemupukan, dan pengendalian hama/penyakit. Silakan ajukan pertanyaan terkait tanaman Anda! 🌿",
    chat_thinking: "🌿 Menyiapkan saran perawatan...",
    chat_open: "Tanya Dokter Tanaman",
    chat_close: "Tutup",
    chat_context_label: "Konteks Diagnosis Aktif",
    chat_no_context: "Belum ada diagnosis aktif. Anda tetap bisa bertanya seputar perawatan tanaman secara umum.",
    chat_welcome_general: "Halo! Saya <strong>Asisten Dokter Tanaman</strong> PlantScan. Tanyakan hal seputar perawatan, pupuk, penyiraman, atau penanganan penyakit tanaman Anda! 🌿",
    chat_chip4: "💧 Berapa frekuensi penyiraman yang ideal?",
    chat_chip5: "🧪 Pupuk apa yang cocok untuk fase ini?",
    hero_cta_scan: "Mulai Periksa Tanaman",
    hero_cta_chat: "Tanya Dokter Tanaman",
    non_plant_title: "Foto Tidak Dikenali Sebagai Tanaman",
    non_plant_desc: "Sistem mendeteksi bahwa foto yang diunggah bukan daun atau buah tanaman. Silakan unggah foto tanaman yang jelas untuk mendapatkan diagnosis yang tepat.",
    non_plant_btn: "Pilih Foto Lain",
    footer_admin: "Dashboard Admin (Demo)",
    fab_chat_btn: "Tanya Tanaman"
  },
  en: {
    nav_deteksi: "Analyze",
    nav_fitur: "Features",
    nav_panduan: "Guide",
    nav_login: "Login",
    nav_scan: "Start Analysis",
    hero_title: "Identify <em>Plant</em><br>Diseases",
    hero_desc: "Upload a photo of a leaf or fruit to check for plant diseases and get practical treatment recommendations.",
    pill_1: "Leaves & Fruits",
    pill_2: "Vision API",
    pill_3: "20+ Plants",
    pill_4: "Fast Results",
    
    // Auth & Dashboard
    picker_title: "Select Plant Type",
    search_placeholder: "Search plants...",
    upload_title: "Upload Photo",
    upload_desc: "Drag & drop a photo here, or click to browse",
    camera_btn: "Use Camera",
    scan_btn: "Analyze Photo",
    history_title: "Scan History",
    history_sub: "Your previous plant health records",
    history_clear: "Clear",
    modal_login_title: "Sign in to PlantScan",
    modal_login_desc: "Get unlimited access to plant analysis",
    modal_login_btn: "Sign In",
    placeholder_email: "Email Address",
    placeholder_password: "Password",

    // Fitur Section
    feat_title: "Key Features",
    feat_sub: "Practical tools to keep your plants healthy and productive",
    f1_title: "Visual Image Analysis",
    f1_desc: "Examines visual symptoms on leaves and fruits using vision APIs to identify common plant health issues.",
    f2_title: "Leaves & Fruits",
    f2_desc: "Check both leaves and fruits for a more complete understanding of plant health.",
    f3_title: "20+ Plant Varieties",
    f3_desc: "Covers popular vegetables, fruits, staple crops, and ornamental plants.",
    f4_title: "Clear Diagnosis Summary",
    f4_desc: "Review the detected condition, visible symptoms, possible causes, urgency, and step-by-step care guidelines.",
    f5_title: "Works on Any Device",
    f5_desc: "Clean, responsive layout that works comfortably on mobile phones, tablets, or desktop browsers.",
    f6_title: "Private & Ephemeral",
    f6_desc: "Uploaded photos are processed only for the analysis request and are not stored on any server.",

    // Cara Pakai Section
    how_title: "How It Works",
    how_sub: "Five straightforward steps to check your plant's health",
    picker_req: "REQUIRED",
    picker_title: "Select Plant Type",
    h1_title: "Choose Plant Type",
    h1_desc: "Select your plant from the list so the system can reference the relevant diseases and symptoms.",
    h2_title: "Take a Clear Photo",
    h2_desc: "Capture a well-lit photo of the affected leaf or fruit from a distance of 20–30 cm.",
    h3_title: "Upload or Snap a Picture",
    h3_desc: "Choose an image from your gallery or use your device camera directly in the app.",
    h4_title: "Review the Analysis",
    h4_desc: "The system inspects your photo — analysis usually takes 5 to 15 seconds depending on your connection.",
    h5_title: "Follow Care Recommendations",
    h5_desc: "Read the diagnosis, understand the causes, and apply the suggested care steps to nurse your plant back to health.",

    // UI Elements
    page_title: "PlantScan — Plant Disease Detection",
    no_result: "🌿 Plant not found",
    drop_text: "Drag photo here",
    drop_sub1: "JPG · PNG · WEBP · max 5 MB",
    drop_sub2: "Accepts photos of plant <strong>leaves</strong> or <strong>fruits</strong>",
    btn_upload: "Choose Photo",
    btn_camera: "Camera",
    upload_hint: "Select a plant type first",
    processing: "Processing...",
    change_photo: "Change Photo",
    tips_title: "💡 Tips for Best Results",
    tip1: "Focus clearly on one affected leaf or fruit",
    tip2: "Use good natural lighting and avoid heavy shadows",
    tip3: "Hold the camera about 20–30 cm away",
    tip4: "Keep the whole leaf or fruit inside the frame",
    ai_analyzing: "Analyzing Image...",
    ai_note: "Image analysis using vision API",
    footer_desc: "Plant Disease Detection Web Application<br>Image analysis and plant care guidance.",
    cam_title: "📷 Take Plant Photo",
    cam_snap: "Capture",
    cam_cancel: "Cancel",

    // Script texts
    toast_select_first: "⚠️ Please choose a plant type first.",
    toast_format: "Unsupported format. Please upload JPG, PNG, or WEBP.",
    toast_size: "❌ Maximum file size is 10 MB.",
    toast_selected: "selected — please upload a photo of the leaf or fruit",
    loader_1: "Uploading image...",
    loader_2: "Connecting to analysis service...",
    loader_3: "Checking for visual symptoms...",
    loader_4: "Preparing diagnosis summary...",
    ai_confidence: "Analysis Confidence",
    obs_result: "Observations",
    symp: "Visible Symptoms",
    pathogen: "Pathogen / Cause Agent",
    cause: "Probable Cause",
    impact: "Potential Impact",
    action: "Recommended Care",
    scan_again: "Analyze Another Photo",
    share: "Share",
    diag_error: "Could not complete diagnosis.",
    err_server: "Server error occurred. Please try again in a few moments.",
    err_cam: "❌ Could not access device camera",
    toast_offline: "⚠️ You are offline. Reconnect to the internet to analyze photos.",
    toast_online: "✅ Reconnected to the internet.",
    toast_limit: "Guest scan limit (1x) reached. Please sign in to continue.",
    toast_login_req: "Please enter your email address.",
    toast_login_invalid: "Please include an '@' in your email address.",
    toast_login_ok: "Signed in successfully. Unlimited scans active.",
    toast_logout: "Signed out successfully.",
    copied: "Results copied to clipboard.",
    export_pdf: "Download PDF",
    toast_pdf_gen: "📄 Generating PDF report...",
    toast_pdf_done: "✅ PDF report downloaded.",
    chat_title: "Plant Care Assistant",
    chat_badge: "🌿 Plant Health Guidance",
    chat_subtitle: "Ask about treatment dosages, watering schedules, or prevention.",
    chat_placeholder: "Ask a question about this plant...",
    chat_send: "Send",
    chat_chip1: "💊 What dosage of treatment should I apply?",
    chat_chip2: "🦠 Is this disease likely to spread to nearby plants?",
    chat_chip3: "🛡️ How can I prevent this from recurring?",
    chat_guard_refusal: "Sorry, this assistant focuses specifically on plant health, plant pathology, fertilizer guidance, and garden care. Please feel free to ask questions about your plants or diagnosis results! 🌿",
    chat_thinking: "🌿 Preparing care recommendations...",
    chat_open: "Ask Plant Care Assistant",
    chat_close: "Close",
    chat_context_label: "Active Diagnosis Context",
    chat_no_context: "No active diagnosis yet. You can still ask general plant care questions.",
    chat_welcome_general: "Hello! I'm your <strong>Plant Care Assistant</strong> on PlantScan. Ask me anything about plant care routines, fertilizers, pest management, or plant health! 🌿",
    chat_chip4: "💧 What is the ideal watering schedule for this plant?",
    chat_chip5: "🧪 What fertilizer blend is best for this stage?",
    hero_cta_scan: "Analyze Plant Photo",
    hero_cta_chat: "Ask Plant Care",
    non_plant_title: "Unrecognized Photo",
    non_plant_desc: "The uploaded image does not appear to show a plant leaf or fruit. Please upload a clear photo of the affected plant part.",
    non_plant_btn: "Choose Another Photo",
    footer_admin: "Admin Dashboard (Demo)",
    fab_chat_btn: "Plant Care Chat"
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
