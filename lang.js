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
    history_title: "Riwayat",
    history_clear: "Hapus",
    modal_login_title: "Masuk ke PlantScan",
    modal_login_desc: "Dapatkan akses scan tanpa batas",
    modal_login_btn: "Masuk Sekarang"
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
    history_title: "History",
    history_clear: "Clear",
    modal_login_title: "Login to PlantScan",
    modal_login_desc: "Get unlimited scanning access",
    modal_login_btn: "Login Now"
  }
};

let currentLang = 'id';

function setLang(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  
  // Update buttons
  document.getElementById('lang-id').classList.toggle('active', lang === 'id');
  document.getElementById('lang-en').classList.toggle('active', lang === 'en');

  // Update simple text
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update HTML content
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
}
