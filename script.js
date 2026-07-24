// ══════════════════════════════════════════════════════════
//  PlantScan — script.js  (Gemini AI Edition)
// ══════════════════════════════════════════════════════════

// ── DATA TANAMAN (expanded) ───────────────────────────────
const plants = [
  // Sayuran & Umbi
  { id:'tomato',   emoji:'🍅', name:'Tomat', name_en:'Tomato', latin:'Solanum lycopersicum', diseases:12, category:'Sayuran', category_en:'Vegetable' },
  { id:'potato',   emoji:'🥔', name:'Kentang', name_en:'Potato', latin:'Solanum tuberosum', diseases:8, category:'Sayuran', category_en:'Vegetable' },
  { id:'corn',     emoji:'🌽', name:'Jagung', name_en:'Corn', latin:'Zea mays', diseases:7, category:'Sayuran', category_en:'Vegetable' },
  { id:'pepper',   emoji:'🫑', name:'Cabai', name_en:'Pepper', latin:'Capsicum annuum', diseases:6, category:'Sayuran', category_en:'Vegetable' },
  { id:'squash',   emoji:'🎃', name:'Labu', name_en:'Squash', latin:'Cucurbita pepo', diseases:5, category:'Sayuran', category_en:'Vegetable' },
  { id:'cucumber', emoji:'🥒', name:'Mentimun', name_en:'Cucumber', latin:'Cucumis sativus', diseases:6, category:'Sayuran', category_en:'Vegetable' },
  { id:'eggplant', emoji:'🍆', name:'Terong', name_en:'Eggplant', latin:'Solanum melongena', diseases:5, category:'Sayuran', category_en:'Vegetable' },
  { id:'spinach',  emoji:'🥬', name:'Bayam', name_en:'Spinach', latin:'Spinacia oleracea', diseases:4, category:'Sayuran', category_en:'Vegetable' },
  { id:'shallot',  emoji:'🧅', name:'Bawang Merah', name_en:'Shallot', latin:'Allium cepa aggregatum', diseases:5, category:'Sayuran', category_en:'Vegetable' },
  { id:'garlic',   emoji:'🧄', name:'Bawang Putih', name_en:'Garlic', latin:'Allium sativum', diseases:5, category:'Sayuran', category_en:'Vegetable' },
  { id:'water_spinach', emoji:'🥬', name:'Kangkung', name_en:'Water Spinach', latin:'Ipomoea aquatica', diseases:4, category:'Sayuran', category_en:'Vegetable' },
  { id:'mustard_greens', emoji:'🥬', name:'Sawi / Pakcoy', name_en:'Mustard Greens / Bok Choy', latin:'Brassica rapa', diseases:5, category:'Sayuran', category_en:'Vegetable' },
  { id:'cabbage',  emoji:'🥬', name:'Kubis', name_en:'Cabbage', latin:'Brassica oleracea', diseases:6, category:'Sayuran', category_en:'Vegetable' },
  { id:'carrot',   emoji:'🥕', name:'Wortel', name_en:'Carrot', latin:'Daucus carota', diseases:4, category:'Sayuran', category_en:'Vegetable' },
  
  // Kacang & Pangan
  { id:'soybean',  emoji:'🫘', name:'Kedelai', name_en:'Soybean', latin:'Glycine max', diseases:5, category:'Kacang', category_en:'Nut' },
  { id:'peanut',   emoji:'🥜', name:'Kacang Tanah', name_en:'Peanut', latin:'Arachis hypogaea', diseases:5, category:'Kacang', category_en:'Nut' },
  { id:'rice',     emoji:'🌾', name:'Padi', name_en:'Rice', latin:'Oryza sativa', diseases:9, category:'Pangan', category_en:'Crop' },
  { id:'wheat',    emoji:'🌾', name:'Gandum', name_en:'Wheat', latin:'Triticum aestivum', diseases:6, category:'Pangan', category_en:'Crop' },
  { id:'cassava',  emoji:'🍠', name:'Singkong', name_en:'Cassava', latin:'Manihot esculenta', diseases:5, category:'Pangan', category_en:'Crop' },
  { id:'sweet_potato', emoji:'🍠', name:'Ubi Jalar', name_en:'Sweet Potato', latin:'Ipomoea batatas', diseases:5, category:'Pangan', category_en:'Crop' },
  
  // Buah
  { id:'apple',    emoji:'🍎', name:'Apel', name_en:'Apple', latin:'Malus domestica', diseases:8, category:'Buah', category_en:'Fruit' },
  { id:'grape',    emoji:'🍇', name:'Anggur', name_en:'Grape', latin:'Vitis vinifera', diseases:8, category:'Buah', category_en:'Fruit' },
  { id:'strawb',   emoji:'🍓', name:'Stroberi', name_en:'Strawberry', latin:'Fragaria × ananassa', diseases:6, category:'Buah', category_en:'Fruit' },
  { id:'cherry',   emoji:'🍒', name:'Ceri', name_en:'Cherry', latin:'Prunus avium', diseases:5, category:'Buah', category_en:'Fruit' },
  { id:'peach',    emoji:'🍑', name:'Persik', name_en:'Peach', latin:'Prunus persica', diseases:6, category:'Buah', category_en:'Fruit' },
  { id:'banana',   emoji:'🍌', name:'Pisang', name_en:'Banana', latin:'Musa acuminata', diseases:7, category:'Buah', category_en:'Fruit' },
  { id:'mango',    emoji:'🥭', name:'Mangga', name_en:'Mango', latin:'Mangifera indica', diseases:6, category:'Buah', category_en:'Fruit' },
  { id:'orange',   emoji:'🍊', name:'Jeruk', name_en:'Orange', latin:'Citrus sinensis', diseases:7, category:'Buah', category_en:'Fruit' },
  { id:'papaya',   emoji:'🍈', name:'Pepaya', name_en:'Papaya', latin:'Carica papaya', diseases:5, category:'Buah', category_en:'Fruit' },
  { id:'durian',   emoji:'🍈', name:'Durian', name_en:'Durian', latin:'Durio zibethinus', diseases:6, category:'Buah', category_en:'Fruit' },
  { id:'watermelon', emoji:'🍉', name:'Semangka', name_en:'Watermelon', latin:'Citrullus lanatus', diseases:5, category:'Buah', category_en:'Fruit' },
  { id:'melon',    emoji:'🍈', name:'Melon', name_en:'Melon', latin:'Cucumis melo', diseases:5, category:'Buah', category_en:'Fruit' },
  { id:'pineapple',emoji:'🍍', name:'Nanas', name_en:'Pineapple', latin:'Ananas comosus', diseases:4, category:'Buah', category_en:'Fruit' },
  { id:'rambutan', emoji:'🍒', name:'Rambutan', name_en:'Rambutan', latin:'Nephelium lappaceum', diseases:4, category:'Buah', category_en:'Fruit' },

  // Perkebunan Komersial
  { id:'palm_oil', emoji:'🌴', name:'Kelapa Sawit', name_en:'Palm Oil', latin:'Elaeis guineensis', diseases:7, category:'Perkebunan', category_en:'Plantation' },
  { id:'coffee',   emoji:'☕', name:'Kopi', name_en:'Coffee', latin:'Coffea', diseases:6, category:'Perkebunan', category_en:'Plantation' },
  { id:'cocoa',    emoji:'🍫', name:'Kakao', name_en:'Cocoa', latin:'Theobroma cacao', diseases:6, category:'Perkebunan', category_en:'Plantation' },
  { id:'rubber',   emoji:'🌳', name:'Karet', name_en:'Rubber', latin:'Hevea brasiliensis', diseases:5, category:'Perkebunan', category_en:'Plantation' },
  { id:'tea',      emoji:'🍵', name:'Teh', name_en:'Tea', latin:'Camellia sinensis', diseases:5, category:'Perkebunan', category_en:'Plantation' },

  // Tanaman Hias
  { id:'orchid',   emoji:'🌸', name:'Anggrek', name_en:'Orchid', latin:'Orchidaceae', diseases:6, category:'Hias', category_en:'Ornamental' },
  { id:'monstera', emoji:'🪴', name:'Monstera', name_en:'Monstera', latin:'Monstera deliciosa', diseases:4, category:'Hias', category_en:'Ornamental' },
  { id:'aglaonema',emoji:'🪴', name:'Aglaonema', name_en:'Aglaonema', latin:'Aglaonema', diseases:4, category:'Hias', category_en:'Ornamental' },
  { id:'rose',     emoji:'🌹', name:'Mawar', name_en:'Rose', latin:'Rosa', diseases:5, category:'Hias', category_en:'Ornamental' },

  // Rempah
  { id:'ginger',   emoji:'🫚', name:'Jahe', name_en:'Ginger', latin:'Zingiber officinale', diseases:4, category:'Rempah', category_en:'Spice' },
  { id:'turmeric', emoji:'🫚', name:'Kunyit', name_en:'Turmeric', latin:'Curcuma longa', diseases:4, category:'Rempah', category_en:'Spice' },
];

// ── SYSTEM PROMPT UNTUK AI ────────────────────────────────
// System prompt telah dipindahkan ke backend (api/analyze.js) agar aman dari inspeksi browser.

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
      <span class="pc-name">${currentLang === "en" && p.name_en ? p.name_en : p.name}</span>
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
  document.getElementById('sb-name').textContent = currentLang === 'en' && p.name_en ? p.name_en : p.name;
  document.getElementById('sb-latin').textContent = p.latin;
  document.getElementById('selected-banner').classList.add('show');

  document.getElementById('btn-upload').disabled = false;
  document.getElementById('btn-camera').disabled = false;
  document.getElementById('upload-hint').classList.add('hidden');

  showToast(`${p.emoji} ${currentLang === 'en' && p.name_en ? p.name_en : p.name} ${t('toast_selected')}`);
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
  if (!checkAuthBeforeScan()) return;
  if (!selectedPlant) { shakeHint(); return; }
  document.getElementById('file-input').click();
}
function tryCamera() {
  if (!checkAuthBeforeScan()) return;
  if (!selectedPlant) { shakeHint(); return; }
  openCamera();
}
function shakeHint() {
  const h = document.getElementById('upload-hint');
  h.classList.remove('hidden');
  showToast(t('toast_select_first'));
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
  else showToast(t('toast_format'));
});
fileInput.addEventListener('change', e => {
  if (e.target.files[0]) processFile(e.target.files[0]);
});

function processFile(file) {
  if (file.size > 10 * 1024 * 1024) {
    showToast(t('toast_size'));
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
    document.getElementById('img-status-badge').textContent = t('processing');

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

// ── AI ANALYSIS (SERVERLESS) ──────────────────────────────
async function runAIAnalysis() {
  if (!navigator.onLine) {
    showError(t('toast_offline'));
    return;
  }

  const steps = [
    t('loader_1'),
    t('loader_2'),
    t('loader_3'),
    t('loader_4'),
    t('loader_4'),
    t('loader_4')
  ];
  const pcts = [15, 35, 55, 80, 95];
  let stepIdx = 0;
  const stepEl = document.getElementById('loader-step');
  const fillEl = document.getElementById('progress-fill');

  const iv = setInterval(() => {
    if (stepIdx < steps.length) {
      stepEl.textContent = steps[stepIdx];
      fillEl.style.width = pcts[stepIdx] + '%';
      stepIdx++;
    }
  }, 700);

  try {
    // Determine media type
    const imgEl   = document.getElementById('preview-img');
    const src     = imgEl.src;
    let mimeType  = 'image/jpeg';
    if (src.includes('data:image/png'))  mimeType = 'image/png';
    if (src.includes('data:image/webp')) mimeType = 'image/webp';
    if (src.includes('data:image/gif'))  mimeType = 'image/gif';

    // Memanggil Vercel Serverless Function
    // Jika berjalan lokal tanpa 'vercel dev', ini mungkin gagal (404),
    // namun sangat aman untuk environment production
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageB64: currentImageB64,
        mimeType: mimeType,
        plantName: selectedPlant.name,
        plantLatin: selectedPlant.latin,
        plantId: selectedPlant.id,
        lang: typeof currentLang !== 'undefined' ? currentLang : 'id'
      })
    });

    clearInterval(iv);
    fillEl.style.width = '100%';

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      
      // Jika server mengembalikan pesan error spesifik, prioritaskan itu
      if (errData?.error?.message) {
        throw new Error(errData.error.message);
      } else if (errData?.error) {
        throw new Error(errData.error);
      }

      // Fallback pesan berdasarkan status HTTP
      if (response.status === 401 || response.status === 403) {
        throw new Error('Akses ditolak (Error 401/403). Pastikan mengakses dari domain yang benar atau cek konfigurasi server.');
      }
      if (response.status === 429) {
        throw new Error('Terlalu banyak permintaan. Tunggu beberapa menit lalu coba lagi.');
      }
      if (response.status === 404) {
        throw new Error('Endpoint API tidak ditemukan (404). Jika berjalan di lokal, pastikan menggunakan vercel dev.');
      }
      throw new Error(`Error HTTP ${response.status}`);
    }

    const result = await response.json();

    if (typeof currentUser !== 'undefined' && !currentUser) {
      guestScans++;
      localStorage.setItem('plantscan_guest_scans', guestScans.toString());
    }

    // Pastikan UI tidak macet sebelum merender
    setTimeout(() => showDiagnosis(result), 400);

  } catch (err) {
    clearInterval(iv);
    console.error('Serverless Analysis error:', err);
    if (err.message.includes('Unexpected token') || err.message.includes('NetworkError')) {
      showError('Tidak dapat terhubung ke server Vercel. Pastikan Anda menjalankan proyek ini menggunakan Vercel CLI (vercel dev) atau sudah di-deploy.');
    } else {
      showError(err.message);
    }
  }
}

// ── RENDER DIAGNOSIS ──────────────────────────────────────
function showDiagnosis(r, isHistory = false) {
  document.getElementById('loading-panel').style.display = 'none';
  document.getElementById('scan-overlay').classList.add('done');
  document.getElementById('tips-box').style.display = 'block';

  const cond = (r.kondisi || 'perhatian').toLowerCase();
  
  const sevClass  = cond === 'sehat' ? 'sev-safe' : cond === 'parah' ? 'sev-danger' : 'sev-warn';
  const sevLabel  = cond === 'sehat' ? (currentLang==='en'?'🟢 Healthy':'🟢 Sehat') : cond === 'parah' ? (currentLang==='en'?'🔴 Severely Infected':'🔴 Terinfeksi Parah') : (currentLang==='en'?'🟡 Needs Attention':'🟡 Perlu Perhatian');
  const badgeText = cond === 'sehat' ? (currentLang==='en'?'Healthy':'Sehat') : cond === 'parah' ? (currentLang==='en'?'Infected':'Terinfeksi') : (currentLang==='en'?'Attention':'Perhatian');

  document.getElementById('img-status-badge').textContent = badgeText;

  // Rekomendasi steps
  const recSteps = Array.isArray(r.rekomendasi)
    ? r.rekomendasi.map(s => `<div class="rec-step"><div class="rec-dot"></div><span>${s}</span></div>`).join('')
    : `<div class="rec-step"><div class="rec-dot"></div><span>${r.rekomendasi || 'Lihat petunjuk umum perawatan tanaman.'}</span></div>`;

  const html = `
    <div class="diag-head">
      <div class="diag-sev-badge ${sevClass}">${sevLabel}</div>
      <div class="diag-disease-name">${r.nama_penyakit || (currentLang==='en'?'Unidentified':'Tidak Teridentifikasi')}</div>
      <div class="diag-plant-label">${selectedPlant.emoji} ${selectedPlant.name} · <em>${selectedPlant.latin}</em></div>
      <div class="diag-scan-type">${currentLang==='en'?'⚡ Gemini Serverless AI Analysis':'⚡ Analisis AI Serverless Gemini'}</div>
    </div>
    <div class="diag-body">
      <div class="conf-section">
        <div class="conf-row">
          <span class="conf-label">${t('ai_confidence')}</span>
          <span class="conf-val">${(r.tingkat_kepercayaan || 85).toFixed(0)}%</span>
        </div>
        <div class="conf-track"><div class="conf-bar" id="conf-bar"></div></div>
        <div class="diag-summary">"${r.ringkasan || (currentLang==='en'?'Diagnosis completed.':'Diagnosis selesai.')}"</div>
      </div>

      <div class="info-block">
        <div class="info-block-title">🔍 ${t('obs_result')}</div>
        <div class="info-block-body">
          <p><strong>${t('symp')}:</strong> ${r.gejala_terlihat || '—'}</p>
          <p><strong>${t('pathogen')}:</strong> ${r.pathogen || '—'}</p>
          <p><strong>${t('cause')}:</strong> ${r.penyebab || '—'}</p>
          <p><strong>${t('impact')}:</strong> ${r.dampak || '—'}</p>
        </div>
      </div>

      <div class="rec-block">
        <div class="rec-title">
          <svg viewBox="0 0 20 20" fill="none"><path d="M10 18s7-3.5 7-8.75V4.5l-7-2.5-7 2.5v4.75C3 14.5 10 18 10 18z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          ${t('action')} (${(r.urgensi||'').toUpperCase()})
        </div>
        <div class="rec-steps">${recSteps}</div>
      </div>

      <div class="act-row">
        <button class="btn-scan-again" onclick="resetApp()">
          <svg viewBox="0 0 20 20" fill="none"><path d="M3 10a7 7 0 0114 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M3 10L1 8l2-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          ${t('scan_again')}
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
  if (!isHistory) {
    saveToHistory({
      date: new Date().toISOString(),
      plantName: selectedPlant.name,
      plantEmoji: selectedPlant.emoji,
      plantLatin: selectedPlant.latin,
      diseaseName: r.nama_penyakit || (currentLang==='en'?'Unidentified':'Tidak Teridentifikasi'),
      severity: cond,
      image: document.getElementById('preview-img').src,
      fullResult: r
    });
  }

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
      <div class="error-title">${currentLang==='en'?'Analysis Failed':'Analisis Gagal'}</div>
      <div class="error-msg">${msg || (currentLang==='en'?'An error occurred while analyzing the image. Make sure your internet connection is active and try again.':'Terjadi kesalahan saat menganalisis gambar. Pastikan koneksi internet aktif dan coba lagi.')}</div>
      <button class="btn-retry" onclick="resetApp()">${currentLang==='en'?'Try Again':'Coba Lagi'}</button>
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
  const plantDisplayName = selectedPlant ? (currentLang === 'en' && selectedPlant.name_en ? selectedPlant.name_en : selectedPlant.name) : (currentLang==='en'?'plant':'tanaman');
  const txt = currentLang === 'en'
    ? `🌿 PlantScan Result:\n"${name}" detected on ${plantDisplayName} with ${conf}% confidence.\n\nCheck your plants at PlantScan!`
    : `🌿 Hasil Scan PlantScan:\n"${name}" terdeteksi pada ${plantDisplayName} dengan kepercayaan ${conf}%.\n\nCek tanamanmu di PlantScan!`;
  if (navigator.share) {
    navigator.share({ title: currentLang==='en'?'PlantScan Result':'Hasil PlantScan', text: txt }).catch(() => {});
  } else {
    navigator.clipboard.writeText(txt).then(() => showToast(t('copied')));
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
    container.innerHTML = `<div class="no-history">${currentLang==='en'?'No scan history yet.':'Belum ada riwayat pemindaian.'}</div>`;
    document.getElementById('history-section').style.display = 'none';
    return;
  }
  
  document.getElementById('history-section').style.display = 'block';
  container.innerHTML = history.map((item, idx) => {
    const date = new Date(item.date).toLocaleDateString(currentLang==='en'?'en-US':'id-ID', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
    const sevLabel = item.severity === 'sehat' ? (currentLang==='en'?'Healthy':'Sehat') : item.severity === 'parah' ? (currentLang==='en'?'Severe':'Parah') : (currentLang==='en'?'Attention':'Perhatian');
    const sevColor = item.severity === 'sehat' ? '#27864F' : item.severity === 'parah' ? '#C0392B' : '#C97A12';
    
    return `
      <div class="hist-card" onclick="viewHistory(${idx})" style="cursor:pointer;" title="${currentLang==='en'?'Click to view diagnosis detail':'Klik untuk melihat detail diagnosis'}">
        <img src="${item.image}" alt="Scan" class="hist-img">
        <div class="hist-info">
          <div class="hist-title">${item.plantEmoji} ${currentLang === 'en' && plants.find(p=>p.name===item.plantName)?.name_en ? plants.find(p=>p.name===item.plantName).name_en : item.plantName}</div>
          <div class="hist-disease" style="color: ${sevColor}">${item.diseaseName}</div>
          <div class="hist-date">${date}</div>
        </div>
      </div>
    `;
  }).join('');
}

function clearHistory() {
  if(confirm(currentLang==='en'?'Delete all scan history?':'Hapus semua riwayat pemindaian?')) {
    localStorage.removeItem('plantscan_history');
    loadHistory();
  }
}

function viewHistory(idx) {
  const history = JSON.parse(localStorage.getItem('plantscan_history') || '[]');
  const item = history[idx];
  if (!item || !item.fullResult) {
    showToast(currentLang==='en'?'❌ Old history details unavailable (no full AI log saved). Please re-scan.':'❌ Detail riwayat lama tidak tersedia (karena tidak menyimpan log AI penuh). Silakan scan ulang.');
    return;
  }
  
  // Set the "selectedPlant" artificially for the view
  selectedPlant = {
    name: item.plantName,
    emoji: item.plantEmoji,
    latin: item.plantLatin || (currentLang==='en'?'Unknown species':'Spesies tidak diketahui')
  };

  // Switch UI to result view
  const zone = document.getElementById('upload-zone');
  if (zone) zone.style.display = 'none';
  const rs = document.getElementById('result-section');
  rs.style.display = 'block';
  
  document.getElementById('preview-img').src = item.image;
  document.getElementById('meta-fname').textContent = currentLang==='en'?'Scan History':'Riwayat Scan';
  const dateStr = new Date(item.date).toLocaleDateString(currentLang==='en'?'en-US':'id-ID', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
  document.getElementById('meta-fsize').textContent = dateStr;
  document.getElementById('img-tag-emoji').textContent = item.plantEmoji;
  document.getElementById('img-tag-name').textContent = item.plantName;
  
  // Render the diagnosis without saving to history again
  showDiagnosis(item.fullResult, true);
  
  // Scroll to results
  setTimeout(() => rs.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
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
  showToast(t('toast_offline'));
});
window.addEventListener('online', () => {
  showToast(t('toast_online'));
});

// ── AUTH LOGIC ───────────────────────────────────────────
let currentUser = localStorage.getItem('plantscan_user');
let guestScans = parseInt(localStorage.getItem('plantscan_guest_scans') || '0');

function updateAuthUI() {
  const loginBtn = document.getElementById('nav-login-btn');
  if (loginBtn) {
    if (currentUser) {
      loginBtn.textContent = 'Logout';
      loginBtn.removeAttribute('data-i18n');
      loginBtn.onclick = performLogout;
    } else {
      loginBtn.textContent = (typeof translations !== 'undefined' && translations[currentLang]?.nav_login) || 'Login';
      loginBtn.setAttribute('data-i18n', 'nav_login');
      loginBtn.onclick = openLoginModal;
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();
  const emailInput = document.getElementById('login-email');
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      emailInput.setCustomValidity('');
    });
  }
});

function openLoginModal(e) {
  if (e) e.preventDefault();
  document.getElementById('login-modal').classList.add('open');
}
function closeLoginModal() {
  document.getElementById('login-modal').classList.remove('open');
}
function performLogin(e) {
  if (e) e.preventDefault();
  const emailInput = document.getElementById('login-email');
  if (!emailInput) return;
  const email = emailInput.value.trim();

  if (!email) {
    const reqMsg = (typeof currentLang !== 'undefined' && currentLang === 'en') ? 'Please fill out this field.' : 'Silakan isi bidang ini.';
    emailInput.setCustomValidity(reqMsg);
    emailInput.reportValidity();
    showToast(t('toast_login_req'));
    return;
  }

  if (!email.includes('@')) {
    const invalidMsg = (typeof currentLang !== 'undefined' && currentLang === 'en')
      ? `Please include an '@' in the email address. '${email}' is missing an '@'.`
      : `Sertakan '@' dalam alamat email. '${email}' kehilangan '@'.`;
    emailInput.setCustomValidity(invalidMsg);
    emailInput.reportValidity();
    showToast(t('toast_login_invalid'));
    return;
  }

  emailInput.setCustomValidity('');
  localStorage.setItem('plantscan_user', email);
  currentUser = email;
  closeLoginModal();
  updateAuthUI();
  showToast(t('toast_login_ok'));
}
function performLogout(e) {
  if (e) e.preventDefault();
  localStorage.removeItem('plantscan_user');
  currentUser = null;
  updateAuthUI();
  showToast(t('toast_logout'));
}

function checkAuthBeforeScan() {
  if (currentUser) return true;
  if (guestScans >= 1) {
    openLoginModal();
    showToast(t('toast_limit'));
    return false;
  }
  return true;
}
