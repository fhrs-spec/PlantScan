// ══════════════════════════════════════════════════════════
//  PlantScan — script.js  (Gemini AI Edition)
// ══════════════════════════════════════════════════════════

// ── DATA TANAMAN (expanded) ───────────────────────────────
const plants = [
  // Sayuran
  { id:'tomato',   emoji:'🍅', name:'Tomat',      latin:'Solanum lycopersicum',    diseases:12, category:'Sayuran' },
  { id:'potato',   emoji:'🥔', name:'Kentang',    latin:'Solanum tuberosum',       diseases:8,  category:'Sayuran' },
  { id:'corn',     emoji:'🌽', name:'Jagung',     latin:'Zea mays',               diseases:7,  category:'Sayuran' },
  { id:'pepper',   emoji:'🫑', name:'Cabai',      latin:'Capsicum annuum',        diseases:6,  category:'Sayuran' },
  { id:'squash',   emoji:'🎃', name:'Labu',       latin:'Cucurbita pepo',         diseases:5,  category:'Sayuran' },
  { id:'cucumber', emoji:'🥒', name:'Mentimun',   latin:'Cucumis sativus',        diseases:6,  category:'Sayuran' },
  { id:'eggplant', emoji:'🍆', name:'Terong',     latin:'Solanum melongena',      diseases:5,  category:'Sayuran' },
  { id:'spinach',  emoji:'🥬', name:'Bayam',      latin:'Spinacia oleracea',      diseases:4,  category:'Sayuran' },
  { id:'soybean',  emoji:'🫘', name:'Kedelai',    latin:'Glycine max',            diseases:5,  category:'Kacang' },
  { id:'peanut',   emoji:'🥜', name:'Kacang Tanah',latin:'Arachis hypogaea',     diseases:5,  category:'Kacang' },
  { id:'rice',     emoji:'🌾', name:'Padi',       latin:'Oryza sativa',           diseases:9,  category:'Pangan' },
  { id:'wheat',    emoji:'🌾', name:'Gandum',     latin:'Triticum aestivum',      diseases:6,  category:'Pangan' },
  { id:'cassava',  emoji:'🍠', name:'Singkong',   latin:'Manihot esculenta',      diseases:5,  category:'Pangan' },
  // Buah
  { id:'apple',    emoji:'🍎', name:'Apel',       latin:'Malus domestica',        diseases:8,  category:'Buah' },
  { id:'grape',    emoji:'🍇', name:'Anggur',     latin:'Vitis vinifera',         diseases:8,  category:'Buah' },
  { id:'strawb',   emoji:'🍓', name:'Stroberi',   latin:'Fragaria × ananassa',   diseases:6,  category:'Buah' },
  { id:'cherry',   emoji:'🍒', name:'Ceri',       latin:'Prunus avium',           diseases:5,  category:'Buah' },
  { id:'peach',    emoji:'🍑', name:'Persik',     latin:'Prunus persica',         diseases:6,  category:'Buah' },
  { id:'banana',   emoji:'🍌', name:'Pisang',     latin:'Musa acuminata',         diseases:7,  category:'Buah' },
  { id:'mango',    emoji:'🥭', name:'Mangga',     latin:'Mangifera indica',       diseases:6,  category:'Buah' },
  { id:'orange',   emoji:'🍊', name:'Jeruk',      latin:'Citrus sinensis',        diseases:7,  category:'Buah' },
  { id:'papaya',   emoji:'🍈', name:'Pepaya',     latin:'Carica papaya',          diseases:5,  category:'Buah' },
];

// ── SYSTEM PROMPT UNTUK AI ────────────────────────────────
// Dihapus karena kita sekarang menggunakan TensorFlow.js murni (Lokal)

// ── STATE ─────────────────────────────────────────────────
let selectedPlant = null;
let cameraStream  = null;
let currentImageB64 = null;

// ── BUILD PLANT GRID ──────────────────────────────────────
function buildGrid() {
  const grid = document.getElementById('plant-grid');
  grid.innerHTML = plants.map(p => `
    <div class="plant-card" id="pc-${p.id}" onclick="selectPlant('${p.id}')">
      <div class="pc-check">
        <svg viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <span class="pc-emoji">${p.emoji}</span>
      <span class="pc-name">${p.name}</span>
      <span class="pc-latin">${p.latin}</span>
    </div>`).join('');
}
buildGrid();

function selectPlant(id) {
  const p = plants.find(x => x.id === id);
  if (!p) return;
  selectedPlant = p;

  document.querySelectorAll('.plant-card').forEach(c => c.classList.remove('selected'));
  const card = document.getElementById('pc-' + id);
  if (card) card.classList.add('selected');

  document.getElementById('sb-emoji').textContent = p.emoji;
  document.getElementById('sb-name').textContent  = p.name;
  document.getElementById('sb-latin').textContent = p.latin;
  document.getElementById('selected-banner').classList.add('show');

  document.getElementById('btn-upload').disabled = false;
  document.getElementById('btn-camera').disabled = false;
  document.getElementById('upload-hint').classList.add('hidden');

  showToast(`${p.emoji} ${p.name} dipilih — silakan unggah foto daun atau buah`);
}

function clearPlant() {
  selectedPlant = null;
  document.querySelectorAll('.plant-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('selected-banner').classList.remove('show');
  document.getElementById('btn-upload').disabled = true;
  document.getElementById('btn-camera').disabled = true;
  document.getElementById('upload-hint').classList.remove('hidden');
}

function filterPlants(val) {
  const q = val.toLowerCase().trim();
  let found = 0;
  plants.forEach(p => {
    const el = document.getElementById('pc-' + p.id);
    if (!el) return;
    const match = !q
      || p.name.toLowerCase().includes(q)
      || p.latin.toLowerCase().includes(q)
      || p.category.toLowerCase().includes(q);
    el.classList.toggle('hidden', !match);
    if (match) found++;
  });
  const noResult = document.getElementById('no-result');
  if (noResult) noResult.style.display = found ? 'none' : 'block';
}

// ── UPLOAD & CAMERA ───────────────────────────────────────
function tryUpload() {
  if (!selectedPlant) { shakeHint(); return; }
  document.getElementById('file-input').click();
}
function tryCamera() {
  if (!selectedPlant) { shakeHint(); return; }
  openCamera();
}
function shakeHint() {
  const h = document.getElementById('upload-hint');
  h.classList.remove('hidden');
  showToast('⚠️ Pilih jenis tanaman dahulu ya!');
}

const zone      = document.getElementById('upload-zone');
const fileInput = document.getElementById('file-input');

zone.addEventListener('dragover', e => {
  e.preventDefault();
  if (selectedPlant) zone.classList.add('drag-over');
  else shakeHint();
});
zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
zone.addEventListener('drop', e => {
  e.preventDefault(); zone.classList.remove('drag-over');
  if (!selectedPlant) { shakeHint(); return; }
  const f = e.dataTransfer.files[0];
  if (f && f.type.startsWith('image/')) processFile(f);
  else showToast('Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.');
});
fileInput.addEventListener('change', e => {
  if (e.target.files[0]) processFile(e.target.files[0]);
});

function processFile(file) {
  if (file.size > 10 * 1024 * 1024) {
    showToast('❌ Ukuran file maksimal 10 MB');
    return;
  }
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 1024;
      const MAX_HEIGHT = 1024;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height = Math.round(height *= MAX_WIDTH / width);
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width = Math.round(width *= MAX_HEIGHT / height);
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.85); // Compress to 85% quality JPEG
      currentImageB64 = dataUrl.split(',')[1];

      // Setup preview
      document.getElementById('preview-img').src = dataUrl;
      document.getElementById('meta-fname').textContent = file.name;
      // Calculate approximate size of compressed base64
      const compressedSize = Math.round((currentImageB64.length * 3 / 4) / 1024);
      document.getElementById('meta-fsize').textContent = compressedSize + ' KB (Compressed)';
    document.getElementById('img-tag-emoji').textContent = selectedPlant.emoji;
    document.getElementById('img-tag-name').textContent  = selectedPlant.name;
    document.getElementById('img-status-badge').textContent = 'Menganalisis...';

    // Show result section
    zone.style.display = 'none';
    const rs = document.getElementById('result-section');
    rs.style.display = 'block';
    document.getElementById('tips-box').style.display = 'none';
    document.getElementById('loading-panel').style.display = 'flex';
    document.getElementById('diag-content').style.display = 'none';
    document.getElementById('diag-content').innerHTML = '';

    // Scan line animation active
    document.getElementById('scan-overlay').classList.remove('done');

    setTimeout(() => rs.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);

    // Start AI analysis
    runAIAnalysis();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// ── TENSORFLOW.JS (TEACHABLE MACHINE) ─────────────────────
// Ganti URL ini dengan URL model dari Teachable Machine Anda
const URL_MODEL_TEACHABLE_MACHINE = "https://teachablemachine.withgoogle.com/models/PLACEHOLDER_ID/";
let tmModel, tmMaxPredictions;

async function initModel() {
  if (tmModel) return;
  try {
    const modelURL = URL_MODEL_TEACHABLE_MACHINE + "model.json";
    const metadataURL = URL_MODEL_TEACHABLE_MACHINE + "metadata.json";
    tmModel = await tmImage.load(modelURL, metadataURL);
    tmMaxPredictions = tmModel.getTotalClasses();
    console.log("Model Teachable Machine berhasil dimuat!");
  } catch (error) {
    console.error("Gagal memuat model:", error);
    // Kita tidak langsung showError agar tidak mengganggu UI jika belum di-scan
  }
}

// Panggil init saat halaman dimuat
document.addEventListener('DOMContentLoaded', initModel);

async function runTFJSAnalysis() {
  const steps = [
    'Menyiapkan model lokal...',
    'Mengekstrak ciri visual daun...',
    'Mengklasifikasikan pola...',
    'Menghitung tingkat keyakinan...',
    'Menyusun diagnosis akhir...',
  ];
  const pcts = [20, 40, 60, 85, 100];
  let stepIdx = 0;
  const stepEl = document.getElementById('loader-step');
  const fillEl = document.getElementById('progress-fill');

  const iv = setInterval(() => {
    if (stepIdx < steps.length) {
      stepEl.textContent = steps[stepIdx];
      fillEl.style.width = pcts[stepIdx] + '%';
      stepIdx++;
    }
  }, 500);

  try {
    if (!tmModel) {
      await initModel();
    }
    
    if (!tmModel) {
      throw new Error("Tautan model Teachable Machine masih kosong atau tidak valid. Silakan latih model Anda dan perbarui variabel URL di script.js.");
    }

    const imgEl = document.getElementById('preview-img');
    const predictions = await tmModel.predict(imgEl);
    
    clearInterval(iv);
    fillEl.style.width = '100%';

    // Cari prediksi dengan probabilitas tertinggi
    let highestProb = 0;
    let bestClass = "";
    
    predictions.forEach(p => {
      if (p.probability > highestProb) {
        highestProb = p.probability;
        bestClass = p.className;
      }
    });

    if (highestProb < 0.3) {
      throw new Error("AI ragu (akurasi < 30%). Objek mungkin bukan tanaman atau sangat buram.");
    }

    // Tentukan kondisi berdasarkan teks klasifikasi
    const classNameLower = bestClass.toLowerCase();
    let kondisi = 'perhatian';
    if (classNameLower.includes('sehat') || classNameLower.includes('healthy')) {
      kondisi = 'sehat';
    } else if (highestProb > 0.8 && !classNameLower.includes('sehat')) {
      // Jika yakin bukan sehat, anggap parah
      kondisi = 'parah';
    }

    const result = {
      nama_penyakit: bestClass,
      tingkat_kepercayaan: highestProb * 100,
      kondisi: kondisi,
      scan_type: 'Tanaman',
      gejala_terlihat: `Terdeteksi kemiripan visual dengan kelas: ${bestClass}.`,
      rekomendasi: [
        "Pisahkan tanaman dari yang sehat (jika sakit).",
        "Pangkas bagian yang terinfeksi parah.",
        "Pantau perkembangan dalam beberapa hari ke depan."
      ]
    };

    setTimeout(() => showDiagnosis(result), 400);

  } catch (err) {
    clearInterval(iv);
    console.error('TFJS Analysis error:', err);
    showError(err.message);
  }
}

// Ganti nama fungsi trigger dari runAIAnalysis ke runTFJSAnalysis (karena di-call oleh input onChange)
const runAIAnalysis = runTFJSAnalysis;

// ── RENDER DIAGNOSIS ──────────────────────────────────────
function showDiagnosis(r) {
  document.getElementById('loading-panel').style.display = 'none';
  document.getElementById('scan-overlay').classList.add('done');
  document.getElementById('tips-box').style.display = 'block';

  const cond = (r.kondisi || 'perhatian').toLowerCase();
  
  const sevClass  = cond === 'sehat' ? 'sev-safe' : cond === 'parah' ? 'sev-danger' : 'sev-warn';
  const sevLabel  = cond === 'sehat' ? '🟢 Sehat' : cond === 'parah' ? '🔴 Terinfeksi Parah' : '🟡 Perlu Perhatian';
  const badgeText = cond === 'sehat' ? 'Sehat' : cond === 'parah' ? 'Terinfeksi' : 'Perhatian';

  document.getElementById('img-status-badge').textContent = badgeText;

  // Rekomendasi steps
  const recSteps = Array.isArray(r.rekomendasi)
    ? r.rekomendasi.map(s => `<div class="rec-step"><div class="rec-dot"></div><span>${s}</span></div>`).join('')
    : `<div class="rec-step"><div class="rec-dot"></div><span>${r.rekomendasi || 'Lihat petunjuk umum perawatan tanaman.'}</span></div>`;

  const html = `
    <div class="diag-head">
      <div class="diag-sev-badge ${sevClass}">${sevLabel}</div>
      <div class="diag-disease-name">${r.nama_penyakit || 'Tidak Teridentifikasi'}</div>
      <div class="diag-plant-label">${selectedPlant.emoji} ${selectedPlant.name} · <em>${selectedPlant.latin}</em></div>
      <div class="diag-scan-type">⚡ Analisis AI Lokal (TFJS)</div>
    </div>
    <div class="diag-body">
      <div class="conf-section">
        <div class="conf-row">
          <span class="conf-label">Tingkat Kepercayaan Model</span>
          <span class="conf-val">${(r.tingkat_kepercayaan || 85).toFixed(0)}%</span>
        </div>
        <div class="conf-track"><div class="conf-bar" id="conf-bar"></div></div>
      </div>

      <div class="info-block">
        <div class="info-block-title">🔍 Klasifikasi Terbaca</div>
        <div class="info-block-body">${r.gejala_terlihat || '—'}</div>
      </div>

      <div class="rec-block">
        <div class="rec-title">
          <svg viewBox="0 0 20 20" fill="none"><path d="M10 18s7-3.5 7-8.75V4.5l-7-2.5-7 2.5v4.75C3 14.5 10 18 10 18z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Saran Tindakan Umum
        </div>
        <div class="rec-steps">${recSteps}</div>
      </div>

      <div class="act-row">
        <button class="btn-scan-again" onclick="resetApp()">
          <svg viewBox="0 0 20 20" fill="none"><path d="M3 10a7 7 0 0114 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M3 10L1 8l2-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Scan Lagi
        </button>
        <button class="btn-share" onclick="shareResult('${(r.nama_penyakit||'').replace(/'/g,"\\'")}','${(r.tingkat_kepercayaan||85).toFixed(0)}')" title="Bagikan hasil">
          <svg viewBox="0 0 20 20" fill="none"><circle cx="15" cy="4" r="2" stroke="currentColor" stroke-width="1.8"/><circle cx="5" cy="10" r="2" stroke="currentColor" stroke-width="1.8"/><circle cx="15" cy="16" r="2" stroke="currentColor" stroke-width="1.8"/><line x1="7" y1="11" x2="13" y2="15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="13" y1="5" x2="7" y2="9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </button>
      </div>
    </div>`;

  const content = document.getElementById('diag-content');
  content.innerHTML = html;
  content.style.display = 'block';

  // Save to history
  saveToHistory({
    date: new Date().toISOString(),
    plantName: selectedPlant.name,
    plantEmoji: selectedPlant.emoji,
    diseaseName: r.nama_penyakit || 'Tidak Teridentifikasi',
    severity: cond,
    image: document.getElementById('preview-img').src
  });

  setTimeout(() => {
    const cb = document.getElementById('conf-bar');
    if (cb) cb.style.width = (r.tingkat_kepercayaan || 85) + '%';
  }, 150);
}

function showError(msg) {
  document.getElementById('loading-panel').style.display = 'none';
  document.getElementById('scan-overlay').classList.add('done');
  document.getElementById('img-status-badge').textContent = 'Error';

  const content = document.getElementById('diag-content');
  content.innerHTML = `
    <div class="error-state">
      <div class="error-icon">⚠️</div>
      <div class="error-title">Analisis Gagal</div>
      <div class="error-msg">${msg || 'Terjadi kesalahan saat menganalisis gambar. Pastikan koneksi internet aktif dan coba lagi.'}</div>
      <button class="btn-retry" onclick="resetApp()">Coba Lagi</button>
    </div>`;
  content.style.display = 'block';
}

// ── RESET ─────────────────────────────────────────────────
function resetApp() {
  selectedPlant    = null;
  currentImageB64  = null;
  zone.style.display = 'block';

  const rs = document.getElementById('result-section');
  rs.style.display = 'none';
  document.getElementById('diag-content').innerHTML = '';
  document.getElementById('diag-content').style.display = 'none';
  document.getElementById('loading-panel').style.display = 'flex';
  document.getElementById('progress-fill').style.width = '0%';
  document.getElementById('btn-upload').disabled = true;
  document.getElementById('btn-camera').disabled = true;
  document.getElementById('selected-banner').classList.remove('show');
  document.querySelectorAll('.plant-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('upload-hint').classList.remove('hidden');
  fileInput.value = '';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── SHARE ─────────────────────────────────────────────────
function shareResult(name, conf) {
  const txt = `🌿 Hasil Scan PlantScan:\n"${name}" terdeteksi pada ${selectedPlant ? selectedPlant.name : 'tanaman'} dengan kepercayaan ${conf}%.\n\nCek tanamanmu di PlantScan!`;
  if (navigator.share) {
    navigator.share({ title: 'Hasil PlantScan', text: txt }).catch(() => {});
  } else {
    navigator.clipboard.writeText(txt).then(() => showToast('✅ Hasil disalin ke clipboard!'));
  }
}

// ── CAMERA ────────────────────────────────────────────────
async function openCamera() {
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
      audio: false
    });
    document.getElementById('cam-video').srcObject = cameraStream;
    document.getElementById('camera-modal').classList.add('open');
  } catch {
    showToast('❌ Tidak dapat mengakses kamera. Coba unggah foto.');
  }
}
function closeCamera() {
  if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; }
  document.getElementById('camera-modal').classList.remove('open');
}
function capturePhoto() {
  const v  = document.getElementById('cam-video');
  const cv = document.getElementById('snap-canvas');
  cv.width  = v.videoWidth;
  cv.height = v.videoHeight;
  cv.getContext('2d').drawImage(v, 0, 0);
  cv.toBlob(blob => {
    closeCamera();
    processFile(new File([blob], 'kamera.jpg', { type: 'image/jpeg' }));
  }, 'image/jpeg', 0.92);
}

// ── TOAST ─────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── NAV ───────────────────────────────────────────────────
function toggleNav() {
  document.getElementById('nav-links').classList.toggle('open');
}
document.querySelectorAll('.nl').forEach(a => {
  a.addEventListener('click', () => document.getElementById('nav-links').classList.remove('open'));
});

// Nav scroll behavior
const mainNav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 20);
  // Active link highlight
  let cur = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (window.scrollY >= s.offsetTop - 90) cur = s.id;
  });
  document.querySelectorAll('.nl').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === '#' + cur);
  });
}, { passive: true });

// ── SCROLL REVEAL ─────────────────────────────────────────
const revealEls = document.querySelectorAll('.feat-card, .howto-item, .pill');
const observer  = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 6) * 0.07 + 's';
  observer.observe(el);
});

// ── HISTORY ───────────────────────────────────────────────
function saveToHistory(record) {
  let history = JSON.parse(localStorage.getItem('plantscan_history') || '[]');
  history.unshift(record);
  if (history.length > 20) history = history.slice(0, 20); // Simpan maks 20 riwayat
  localStorage.setItem('plantscan_history', JSON.stringify(history));
  loadHistory();
}

function loadHistory() {
  const container = document.getElementById('history-list');
  if (!container) return; // Jika elemen belum ada di HTML
  const history = JSON.parse(localStorage.getItem('plantscan_history') || '[]');
  
  if (history.length === 0) {
    container.innerHTML = '<div class="no-history">Belum ada riwayat pemindaian.</div>';
    document.getElementById('history-section').style.display = 'none';
    return;
  }
  
  document.getElementById('history-section').style.display = 'block';
  container.innerHTML = history.map((item, idx) => {
    const date = new Date(item.date).toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
    const sevLabel = item.severity === 'sehat' ? 'Sehat' : item.severity === 'parah' ? 'Parah' : 'Perhatian';
    const sevColor = item.severity === 'sehat' ? '#27864F' : item.severity === 'parah' ? '#C0392B' : '#C97A12';
    
    return `
      <div class="hist-card">
        <img src="${item.image}" alt="Scan" class="hist-img">
        <div class="hist-info">
          <div class="hist-title">${item.plantEmoji} ${item.plantName}</div>
          <div class="hist-disease" style="color: ${sevColor}">${item.diseaseName}</div>
          <div class="hist-date">${date}</div>
        </div>
      </div>
    `;
  }).join('');
}

function clearHistory() {
  if(confirm('Hapus semua riwayat pemindaian?')) {
    localStorage.removeItem('plantscan_history');
    loadHistory();
  }
}

// ── INIT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadHistory();
});

// ── SERVICE WORKER REGISTRATION ───────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Service Worker registered', reg))
      .catch(err => console.error('Service Worker registration failed', err));
  });
}

// ── OFFLINE HANDLING ──────────────────────────────────────
window.addEventListener('offline', () => {
  showToast('⚠️ Anda sedang offline. Fitur scan AI tidak tersedia.');
});
window.addEventListener('online', () => {
  showToast('✅ Kembali terhubung ke internet.');
});

