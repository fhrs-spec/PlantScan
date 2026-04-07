// ══════════════════════════════════════════════════════════
//  PlantScan — script.js  (Claude AI Vision Edition)
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

## Penyakit Umum pada ${plant.name}:
${getDiseaseContext(plant.id)}

## Tugas Analisis:
1. Identifikasi apakah foto menunjukkan daun atau buah tanaman
2. Periksa gejala visual: perubahan warna, bercak, tekstur, deformasi, layu, bercak berair, dll.
3. Tentukan kondisi: Sehat, Perlu Perhatian (penyakit ringan-sedang), atau Terinfeksi Parah
4. Berikan diagnosis spesifik berdasarkan gejala yang terlihat
5. Berikan rekomendasi penanganan yang praktis

## Format Respons (WAJIB JSON murni, tanpa markdown, tanpa komentar):
{
  "scan_type": "daun" atau "buah",
  "kondisi": "sehat" atau "perhatian" atau "parah",
  "nama_penyakit": "Nama penyakit spesifik atau 'Daun/Buah Sehat'",
  "pathogen": "Nama ilmiah patogen atau 'Tidak ada infeksi'",
  "tingkat_kepercayaan": angka 70-98,
  "ringkasan": "1-2 kalimat ringkas tentang kondisi",
  "gejala_terlihat": "Deskripsi gejala visual yang terlihat pada foto (2-3 kalimat)",
  "penyebab": "Penjelasan penyebab penyakit dan bagaimana menyebar (2-3 kalimat)",
  "dampak": "Dampak pada tanaman dan potensi kerugian jika tidak ditangani",
  "rekomendasi": [
    "Langkah penanganan 1 yang spesifik",
    "Langkah penanganan 2",
    "Langkah pencegahan 1",
    "Langkah pencegahan 2"
  ],
  "urgensi": "segera" atau "dalam seminggu" atau "pantau saja" atau "tidak perlu tindakan"
}

Jika foto BUKAN foto tanaman sama sekali, isi nama_penyakit dengan "Bukan Foto Tanaman" dan kondisi "perhatian".
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
    const dataUrl = e.target.result;
    // Extract base64 (remove "data:image/...;base64,")
    currentImageB64 = dataUrl.split(',')[1];

    // Setup preview
    document.getElementById('preview-img').src = dataUrl;
    document.getElementById('meta-fname').textContent = file.name;
    document.getElementById('meta-fsize').textContent = (file.size / 1024).toFixed(0) + ' KB';
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
  reader.readAsDataURL(file);
}

// ── AI ANALYSIS (Claude API) ──────────────────────────────
async function runAIAnalysis() {
  const steps = [
    'Memuat gambar...',
    'Mendeteksi objek tanaman...',
    'Menganalisis gejala...',
    'Membandingkan dengan database penyakit...',
    'Menyusun diagnosis...',
  ];
  const pcts  = [15, 35, 58, 80, 95];
  let stepIdx = 0;
  const stepEl = document.getElementById('loader-step');
  const fillEl = document.getElementById('progress-fill');

  const iv = setInterval(() => {
    if (stepIdx < steps.length) {
      stepEl.textContent      = steps[stepIdx];
      fillEl.style.width      = pcts[stepIdx] + '%';
      stepIdx++;
    }
  }, 700);

  try {
    // Determine image media type
    const imgEl    = document.getElementById('preview-img');
    const src      = imgEl.src;
    let mediaType  = 'image/jpeg';
    if (src.includes('data:image/png'))  mediaType = 'image/png';
    if (src.includes('data:image/webp')) mediaType = 'image/webp';
    if (src.includes('data:image/gif'))  mediaType = 'image/gif';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: buildSystemPrompt(selectedPlant),
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: currentImageB64
              }
            },
            {
              type: 'text',
              text: `Tolong analisis foto ini. Ini adalah foto dari tanaman ${selectedPlant.name} (${selectedPlant.latin}). Periksa apakah ada tanda-tanda penyakit pada daun atau buahnya dan berikan diagnosis lengkap dalam format JSON yang telah ditentukan.`
            }
          ]
        }]
      })
    });

    clearInterval(iv);
    fillEl.style.width = '100%';

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `HTTP ${response.status}`);
    }

    const data    = await response.json();
    const rawText = data.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');

    // Parse JSON — strip any markdown fences if present
    const cleaned = rawText.replace(/```json|```/gi, '').trim();
    let result;
    try {
      result = JSON.parse(cleaned);
    } catch {
      // Try to extract JSON from anywhere in the string
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (match) {
        result = JSON.parse(match[0]);
      } else {
        throw new Error('Format respons AI tidak valid');
      }
    }

    setTimeout(() => showDiagnosis(result), 400);

  } catch (err) {
    clearInterval(iv);
    console.error('AI Analysis error:', err);
    showError(err.message);
  }
}

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
