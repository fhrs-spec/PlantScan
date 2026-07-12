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
function buildSystemPrompt(plant) {
  return `Kamu adalah ahli patologi tanaman (plant pathologist) terkemuka yang berspesialisasi dalam mendiagnosis penyakit tanaman berdasarkan foto.

Kamu akan menganalisis foto DAUN atau BUAH dari tanaman ${plant.name} (${plant.latin}).

## TUGAS VALIDASI KRITIS (ANTI-HALUSINASI):
1. Periksa foto dengan saksama. Apakah foto ini benar-benar menampilkan DAUN atau BUAH dari tanaman (terutama ${plant.name})?
2. JIKA FOTO TERSEBUT JELAS BUKAN TANAMAN (misalnya foto manusia, hewan, ruangan, perabotan, atau objek acak lainnya):
   - Kamu WAJIB menghentikan analisis.
   - Isi field "nama_penyakit" dengan: "Objek Tidak Dikenali"
   - Isi field "kondisi" dengan: "error"
   - Isi field "gejala_terlihat" dengan: "Sistem mendeteksi bahwa foto yang diunggah bukan foto tanaman atau tidak relevan."
   - Abaikan field lain atau isi dengan N/A.
3. Jika foto BUKAN tanaman ${plant.name} tapi tanaman lain, kamu boleh memperingatkan di "ringkasan" bahwa itu tampak seperti tanaman lain.

## Penyakit Umum pada ${plant.name}:
${getDiseaseContext(plant.id)}

## Tugas Analisis (JIKA VALID):
1. Identifikasi apakah foto menunjukkan daun atau buah tanaman.
2. Periksa gejala visual: perubahan warna, bercak, tekstur, deformasi, layu, dll.
3. Tentukan kondisi: Sehat, Perlu Perhatian (penyakit ringan), atau Terinfeksi Parah.
4. Berikan diagnosis spesifik berdasarkan gejala yang terlihat.
5. Berikan rekomendasi penanganan yang praktis.

## Format Respons (WAJIB JSON murni, tanpa markdown, tanpa komentar):
{
  "scan_type": "daun" atau "buah" atau "bukan tanaman",
  "kondisi": "sehat" atau "perhatian" atau "parah" atau "error",
  "nama_penyakit": "Nama penyakit spesifik, 'Daun Sehat', atau 'Objek Tidak Dikenali'",
  "pathogen": "Nama ilmiah patogen atau 'Tidak ada infeksi'",
  "tingkat_kepercayaan": angka 70-98,
  "ringkasan": "1-2 kalimat ringkas tentang kondisi",
  "gejala_terlihat": "Deskripsi gejala visual yang terlihat pada foto (2-3 kalimat)",
  "penyebab": "Penjelasan penyebab penyakit dan bagaimana menyebar (2-3 kalimat)",
  "dampak": "Dampak pada tanaman dan potensi kerugian jika tidak ditangani",
  "rekomendasi": [
    "Langkah penanganan 1 yang spesifik",
    "Langkah penanganan 2"
  ],
  "urgensi": "segera" atau "dalam seminggu" atau "pantau saja" atau "tidak perlu tindakan"
}

Jika foto tidak jelas / blur, tetap berikan analisis terbaik berdasarkan yang bisa terlihat.
Selalu respons dalam Bahasa Indonesia.`;
}

function getDiseaseContext(plantId) {
  const ctx = {
    tomato: `• Hawar Awal (Alternaria solani) — bercak cokelat cincin konsentris
• Hawar Akhir (Phytophthora infestans) — bercak berair, layu cepat  
• Bercak Septoria (Septoria lycopersici) — bercak kecil pusat abu-abu
• Virus Mosaik Tomat (TMV) — daun mengkerut, warna belang kuning-hijau
• Penyakit Layu Fusarium — layu, batang cokelat dalam
• Embun Tepung (Leveillula taurica) — lapisan putih pada daun
• Busuk Buah Antraknosa — bercak hitam cekung pada buah
• Busuk Ujung Bunga — ujung buah hitam/cokelat
• Bercak Bakteri (Xanthomonas) — bercak kecil berair pada daun dan buah
• TYLCV (Tomato Yellow Leaf Curl) — daun menggulung, kuning
• Penyakit Layu Bakteri (Ralstonia) — layu tiba-tiba tanpa warna kuning
• Daun/Buah Sehat`,
    potato: `• Hawar Akhir (Phytophthora infestans) — paling berbahaya, bercak berair
• Hawar Awal (Alternaria solani) — bercak cokelat konsentris
• Virus Daun Menggulung (PLRV) — daun menggulung, kaku
• Kudis Biasa (Streptomyces scabies) — bintik kasar pada umbi
• Busuk Umbi Bakteri — umbi lunak berlendir
• Penyakit Layu Verticillium — layu bertahap dari bawah
• Embun Tepung — lapisan putih
• Daun Sehat`,
    corn: `• Karat Umum (Puccinia sorghi) — pustul cokelat-merah
• Hawar Daun Utara (Exserohilum turcicum) — bercak panjang abu-abu
• Hawar Daun Selatan (Bipolaris maydis) — bercak kecil oval
• Penyakit Bulai/Downy Mildew — garis kuning, spora putih
• Karat Selatan (Puccinia polysora) — pustul cokelat lebih kecil
• Gosong Tongkol (Smut) — massa hitam menggantikan biji
• Daun Sehat`,
    pepper: `• Bercak Bakteri (Xanthomonas campestris) — bercak cokelat tepi kuning
• Antraknosa Buah (Colletotrichum) — bercak hitam cekung pada buah
• Layu Phytophthora — batang busuk, layu mendadak
• Virus Mosaik Mentimun (CMV) — daun belang, buah deformasi
• Embun Tepung — lapisan putih pada daun
• Busuk Buah Botrytis — jamur abu-abu pada buah  
• Daun/Buah Sehat`,
    apple: `• Kudis Apel (Venturia inaequalis) — bercak berminyak, gelap
• Embun Tepung (Podosphaera leucotricha) — lapisan putih
• Hawar Api (Erwinia amylovora) — cabang seperti terbakar
• Bercak Daun Cedar-Apple Rust — bercak oranye
• Busuk Buah (Monilinia) — buah busuk dengan cincin
• Busuk Mahkota dan Akar — layu, batang cokelat
• Bercak Sooty Blotch — noda abu-abu pada buah
• Daun/Buah Sehat`,
    banana: `• Sigatoka Hitam (Mycosphaerella fijiensis) — bercak hitam memanjang
• Layu Panama/Fusarium Wilt — layu total, tidak bisa disembuhkan
• Penyakit Moko (Ralstonia) — layu bakteri pada pisang
• Bercak Daun (Sigatoka Kuning) — bercak kuning-cokelat
• Virus Kuncup Pisang (BBrMV) — daun muda gagal membuka
• Busuk Mahkota (Crown Rot) — ujung sisir busuk
• Daun Sehat`,
    rice: `• Blas Padi (Pyricularia oryzae) — bercak belah ketupat abu-abu
• Hawar Daun Bakteri (Xanthomonas oryzae) — pinggir daun kuning, mengering
• Bercak Cokelat (Bipolaris oryzae) — bercak oval cokelat  
• Tungro (RTSV+RTBV) — daun kuning-oranye, pertumbuhan terhambat
• Busuk Batang (Sclerotium oryzae) — busuk pada pangkal batang
• Blas Leher — malai tidak berisi, leher patah
• Busuk Pelepah (Rhizoctonia solani) — bercak tidak beraturan
• Ganjur — batang bengkak tidak berbuah
• Daun Sehat`,
    grape: `• Embun Berbulu (Plasmopara viticola) — bercak kuning atas, spora putih bawah
• Embun Tepung (Uncinula necator) — lapisan abu-abu putih
• Hawar Botrytis (Botrytis cinerea) — jamur abu-abu pada buah
• Bercak Daun Isariopsis — bercak angular cokelat
• Antraknosa — bercak hitam cekung bertepi merah  
• Hawar Api — bagian mati seperti terbakar
• Busuk Buah Hitam (Guignardia bidwellii) — buah keriput hitam
• Daun Sehat`,
    mango: `• Antraknosa (Colletotrichum gloeosporioides) — bercak hitam pada daun/buah  
• Embun Tepung (Oidium mangiferae) — lapisan putih saat berbunga
• Bercak Bakteri (Xanthomonas campestris) — bercak berair bertepi kuning
• Busuk Buah Pasca-panen — buah membusuk setelah dipetik
• Die-Back — ujung ranting mati dari ujung ke pangkal
• Kudis Mangga (Elsinoe mangiferae) — bercak kasar pada buah
• Daun Sehat`,
    orange: `• Citrus Greening/HLB (Candidatus Liberibacter) — daun belang, buah asam
• Kudis Jeruk (Elsinoe fawcettii) — bintik kasar pada kulit buah
• Busuk Akar Phytophthora — pangkal batang busuk, daun kuning
• Embun Jelaga — lapisan hitam dari serangga
• Virus Tristeza (CTV) — pitting batang, daun kuning
• Kanker Jeruk (Xanthomonas citri) — bintik kasar bertepi kuning
• Bercak Daun Alternaria — bercak cokelat  
• Daun/Buah Sehat`,
    cucumber: `• Embun Tepung (Sphaerotheca fuliginea) — lapisan putih
• Embun Berbulu (Pseudoperonospora cubensis) — bercak kuning atas, spora ungu bawah
• Antraknosa (Colletotrichum orbiculare) — bercak cokelat cekung  
• Virus Mosaik Mentimun (CMV) — daun belang, buah deformasi
• Layu Bakteri (Erwinia tracheiphila) — layu tiba-tiba
• Bercak Angular (Pseudomonas syringae) — bercak berair angular
• Daun/Buah Sehat`,
    default: `• Penyakit Jamur — bercak cokelat/hitam/putih pada daun atau buah
• Penyakit Bakteri — bercak berair, busuk
• Penyakit Virus — daun belang, deformasi
• Embun Tepung — lapisan putih
• Hawar — daun mengering tiba-tiba
• Daun/Buah Sehat`
  };
  return ctx[plantId] || ctx.default;
}

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
      <span class="pc-count">${p.diseases} penyakit</span>
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

// ── GEMINI API KEY MANAGEMENT ─────────────────────────────
// Menggunakan Google Gemini — GRATIS 1500 request/hari
// Daftar di: https://aistudio.google.com/app/apikey

function getApiKey() {
  return localStorage.getItem('plantscan_gemini_key') || '';
}
function saveApiKey(key) {
  localStorage.setItem('plantscan_gemini_key', key.trim());
}

function promptApiKey(callback) {
  const existing = document.getElementById('apikey-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'apikey-modal';
  modal.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.65);backdrop-filter:blur(6px);
    z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem;
  `;
  modal.innerHTML = `
    <div style="background:#fff;border-radius:20px;padding:2rem;max-width:440px;width:100%;
                box-shadow:0 24px 64px rgba(0,0,0,0.25);font-family:'DM Sans',sans-serif;">
      <div style="text-align:center;margin-bottom:0.75rem;">
        <span style="font-size:2.25rem;">🤖</span>
      </div>
      <h3 style="text-align:center;margin:0 0 0.4rem;color:#1A3D0C;font-family:'Lora',serif;font-size:1.25rem;">
        Masukkan Gemini API Key
      </h3>
      <p style="text-align:center;color:#666;font-size:0.85rem;margin:0 0 0.5rem;line-height:1.55;">
        PlantScan menggunakan <strong style="color:#1A3D0C;">Google Gemini</strong> — <strong style="color:#27864F;">GRATIS</strong> 1.500 scan/hari.<br>
        Key disimpan di browser kamu saja.
      </p>

      <div style="background:#E8F5DC;border-radius:10px;padding:0.75rem 1rem;margin-bottom:1rem;font-size:0.8rem;color:#1A3D0C;line-height:1.5;">
        <strong>Cara dapat API Key gratis:</strong><br>
        1. Buka <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:#2D6017;font-weight:600;">aistudio.google.com/app/apikey</a><br>
        2. Login dengan akun Google<br>
        3. Klik <em>"Create API Key"</em><br>
        4. Copy & paste di bawah ini
      </div>

      <input id="apikey-input" type="password" placeholder="AIza..." autocomplete="off"
        style="width:100%;box-sizing:border-box;padding:0.75rem 1rem;border:1.5px solid #d0e8c5;
               border-radius:10px;font-size:0.9rem;outline:none;margin-bottom:0.5rem;
               font-family:'DM Sans',sans-serif;color:#1A3D0C;">
      <p style="font-size:0.75rem;color:#aaa;margin:0 0 1.25rem;">
        Key tidak dikirim ke server manapun — tersimpan hanya di browser kamu.
      </p>
      <div style="display:flex;gap:0.75rem;">
        <button id="apikey-cancel"
          style="flex:1;padding:0.7rem;border:1.5px solid #d0e8c5;border-radius:10px;
                 background:transparent;color:#5FA34E;font-size:0.875rem;cursor:pointer;
                 font-family:'DM Sans',sans-serif;">
          Batal
        </button>
        <button id="apikey-save"
          style="flex:2;padding:0.7rem;border:none;border-radius:10px;
                 background:linear-gradient(135deg,#3D7A1E,#5FA34E);color:white;
                 font-size:0.875rem;font-weight:600;cursor:pointer;
                 font-family:'DM Sans',sans-serif;">
          ✅ Simpan & Mulai Scan
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const input = modal.querySelector('#apikey-input');
  const savedKey = getApiKey();
  if (savedKey) input.value = savedKey;
  input.focus();

  modal.querySelector('#apikey-cancel').onclick = () => {
    modal.remove();
    resetApp();
  };

  const doSave = () => {
    const key = input.value.trim();
    if (key.length < 10) {
      input.style.borderColor = '#C0392B';
      input.style.background = '#FDEEEC';
      setTimeout(() => {
        input.style.borderColor = '#d0e8c5';
        input.style.background = '';
      }, 2000);
      showToast('⚠️ API Key tidak valid, coba lagi');
      return;
    }
    saveApiKey(key);
    modal.remove();
    callback(key);
  };

  modal.querySelector('#apikey-save').onclick = doSave;
  input.addEventListener('keydown', e => { if (e.key === 'Enter') doSave(); });
}

// ── AI ANALYSIS (Google Gemini — GRATIS) ─────────────────
async function runAIAnalysis() {
  if (!navigator.onLine) {
    showError('Anda sedang offline. Koneksi internet dibutuhkan untuk melakukan pemindaian AI.');
    return;
  }
  const apiKey = getApiKey();
  if (!apiKey) {
    promptApiKey((key) => runAIAnalysisWithKey(key));
    return;
  }
  runAIAnalysisWithKey(apiKey);
}

async function runAIAnalysisWithKey(apiKey) {
  const steps = [
    'Memuat gambar...',
    'Mendeteksi objek tanaman...',
    'Menganalisis gejala visual...',
    'Membandingkan dengan database penyakit...',
    'Menyusun diagnosis lengkap...',
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
    // Menggunakan gemini-1.5-flash karena lebih stabil untuk free tier
    const GEMINI_MODEL = 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

    // Determine media type
    const imgEl   = document.getElementById('preview-img');
    const src     = imgEl.src;
    let mimeType  = 'image/jpeg';
    if (src.includes('data:image/png'))  mimeType = 'image/png';
    if (src.includes('data:image/webp')) mimeType = 'image/webp';
    if (src.includes('data:image/gif'))  mimeType = 'image/gif';

    const systemPrompt = buildSystemPrompt(selectedPlant);
    const userText = `Tolong analisis foto ini. Ini adalah foto dari tanaman ${selectedPlant.name} (${selectedPlant.latin}). Periksa apakah ada tanda-tanda penyakit pada daun atau buahnya dan berikan diagnosis lengkap dalam format JSON yang telah ditentukan.`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{
          role: 'user',
          parts: [
            {
              inline_data: {
                mime_type: mimeType,
                data: currentImageB64
              }
            },
            { text: userText }
          ]
        }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1024,
          responseMimeType: 'application/json'
        }
      })
    });

    clearInterval(iv);
    fillEl.style.width = '100%';

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      if (response.status === 400) {
        const errMsg = errData?.error?.message || '';
        if (errMsg.toLowerCase().includes('api key')) {
          localStorage.removeItem('plantscan_gemini_key');
          throw new Error('API Key Gemini tidak valid. Klik "Coba Lagi" dan masukkan key yang benar.');
        }
        throw new Error('Format permintaan tidak valid: ' + errMsg);
      }
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('plantscan_gemini_key');
        throw new Error('API Key tidak valid atau ditolak. Pastikan Anda memasukkan teks key yang benar (tidak ada spasi yang tertinggal). Klik "Coba Lagi" untuk memasukkan ulang.');
      }
      if (response.status === 429) {
        const rawMsg = errData?.error?.message || '';
        throw new Error(`Error 429 (Too Many Requests): ${rawMsg}. Tunggu sebentar lalu coba lagi.`);
      }
      throw new Error(errData?.error?.message || `Error HTTP ${response.status}`);
    }

    const data = await response.json();

    // Gemini response structure
    const rawText = data?.candidates?.[0]?.content?.parts
      ?.filter(p => p.text)
      ?.map(p => p.text)
      ?.join('') || '';

    if (!rawText) {
      throw new Error('Respons AI kosong. Pastikan foto jelas dan coba lagi.');
    }

    // Parse JSON — Gemini dengan responseMimeType json langsung clean
    const cleaned = rawText.replace(/```json|```/gi, '').trim();
    let result;
    try {
      result = JSON.parse(cleaned);
    } catch {
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (match) {
        result = JSON.parse(match[0]);
      } else {
        throw new Error('Format respons AI tidak valid. Coba lagi.');
      }
    }

    setTimeout(() => showDiagnosis(result), 400);

  } catch (err) {
    clearInterval(iv);
    console.error('Gemini Analysis error:', err);
    // Jika fetch gagal total (network error)
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      showError('Tidak dapat terhubung ke server AI. Periksa koneksi internet kamu.');
    } else {
      showError(err.message);
    }
  }
}

// ── RENDER DIAGNOSIS ──────────────────────────────────────
function showDiagnosis(r) {
  document.getElementById('loading-panel').style.display = 'none';
  document.getElementById('scan-overlay').classList.add('done');
  document.getElementById('tips-box').style.display = 'block';

  const cond = (r.kondisi || 'perhatian').toLowerCase();
  
  if (cond === 'error') {
    showError(r.gejala_terlihat || 'Objek dalam foto tidak dikenali sebagai tanaman. Harap unggah foto daun atau buah yang jelas.');
    return;
  }

  const sevClass  = cond === 'sehat' ? 'sev-safe' : cond === 'parah' ? 'sev-danger' : 'sev-warn';
  const sevLabel  = cond === 'sehat' ? '🟢 Sehat' : cond === 'parah' ? '🔴 Terinfeksi Parah' : '🟡 Perlu Perhatian';
  const badgeText = cond === 'sehat' ? 'Sehat' : cond === 'parah' ? 'Terinfeksi' : 'Perhatian';

  document.getElementById('img-status-badge').textContent = badgeText;

  // Urgency display
  const urgMap = {
    'segera'            : { icon:'⚠️', text:'Tangani Segera', cls:'sev-danger' },
    'dalam seminggu'    : { icon:'🕐', text:'Tangani Dalam Seminggu', cls:'sev-warn' },
    'pantau saja'       : { icon:'👁', text:'Pantau Berkala', cls:'sev-warn' },
    'tidak perlu tindakan':{ icon:'✅', text:'Tidak Perlu Tindakan Khusus', cls:'sev-safe' },
  };
  const urg = urgMap[(r.urgensi||'').toLowerCase()] || { icon:'ℹ️', text: r.urgensi||'', cls:'sev-warn' };

  // Rekomendasi steps
  const recSteps = Array.isArray(r.rekomendasi)
    ? r.rekomendasi.map(s => `<div class="rec-step"><div class="rec-dot"></div><span>${s}</span></div>`).join('')
    : `<div class="rec-step"><div class="rec-dot"></div><span>${r.rekomendasi || 'Lihat petunjuk umum perawatan tanaman.'}</span></div>`;

  const scanTypeLabel = r.scan_type === 'buah' ? '🍎 Analisis Buah' : '🌿 Analisis Daun';

  const html = `
    <div class="diag-head">
      <div class="diag-sev-badge ${sevClass}">${sevLabel}</div>
      <div class="diag-disease-name">${r.nama_penyakit || 'Tidak Teridentifikasi'}</div>
      <div class="diag-plant-label">${selectedPlant.emoji} ${selectedPlant.name} · <em>${selectedPlant.latin}</em></div>
      <div class="diag-scan-type">${scanTypeLabel}</div>
    </div>
    <div class="diag-body">
      <div class="conf-section">
        <div class="conf-row">
          <span class="conf-label">Tingkat kepercayaan AI</span>
          <span class="conf-val">${(r.tingkat_kepercayaan || 85).toFixed(0)}%</span>
        </div>
        <div class="conf-track"><div class="conf-bar" id="conf-bar"></div></div>
      </div>

      <div class="info-block">
        <div class="info-block-title">🔍 Gejala yang Terdeteksi</div>
        <div class="info-block-body">${r.gejala_terlihat || r.ringkasan || '—'}</div>
      </div>

      ${r.pathogen && r.pathogen !== 'Tidak ada infeksi' ? `
      <div class="info-block">
        <div class="info-block-title">🦠 Patogen Penyebab</div>
        <div class="info-block-body"><em>${r.pathogen}</em><br>${r.penyebab || ''}</div>
      </div>` : ''}

      ${r.dampak ? `
      <div class="info-block">
        <div class="info-block-title">📊 Dampak & Risiko</div>
        <div class="info-block-body">${r.dampak}</div>
      </div>` : ''}

      <div class="rec-block">
        <div class="rec-title">
          <svg viewBox="0 0 20 20" fill="none"><path d="M10 18s7-3.5 7-8.75V4.5l-7-2.5-7 2.5v4.75C3 14.5 10 18 10 18z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Rekomendasi Penanganan
        </div>
        <div class="rec-steps">${recSteps}</div>
      </div>

      <div class="info-block" style="background:transparent;border:1.5px solid rgba(95,163,78,0.2);padding:0.7rem 1rem;">
        <div class="info-block-title">${urg.icon} Urgensi Tindakan</div>
        <div class="info-block-body" style="font-weight:500;">${urg.text}</div>
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

