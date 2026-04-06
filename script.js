// ── DATA TANAMAN ──────────────────────────────────────────
const plants = [
  {id:'tomato',   emoji:'🍅', name:'Tomat',      latin:'Solanum lycopersicum',  diseases:9},
  {id:'potato',   emoji:'🥔', name:'Kentang',    latin:'Solanum tuberosum',     diseases:3},
  {id:'corn',     emoji:'🌽', name:'Jagung',     latin:'Zea mays',              diseases:4},
  {id:'apple',    emoji:'🍎', name:'Apel',       latin:'Malus domestica',       diseases:4},
  {id:'grape',    emoji:'🍇', name:'Anggur',     latin:'Vitis vinifera',        diseases:4},
  {id:'pepper',   emoji:'🫑', name:'Cabai',      latin:'Capsicum annuum',       diseases:2},
  {id:'strawb',   emoji:'🍓', name:'Stroberi',   latin:'Fragaria × ananassa',  diseases:2},
  {id:'cherry',   emoji:'🍒', name:'Ceri',       latin:'Prunus avium',          diseases:2},
  {id:'orange',   emoji:'🍊', name:'Jeruk',      latin:'Citrus sinensis',       diseases:1},
  {id:'peach',    emoji:'🍑', name:'Persik',     latin:'Prunus persica',        diseases:2},
  {id:'squash',   emoji:'🎃', name:'Labu',       latin:'Cucurbita pepo',        diseases:1},
  {id:'soybean',  emoji:'🫘', name:'Kedelai',    latin:'Glycine max',           diseases:1},
  {id:'rice',     emoji:'🌾', name:'Padi',       latin:'Oryza sativa',          diseases:3},
  {id:'banana',   emoji:'🍌', name:'Pisang',     latin:'Musa acuminata',        diseases:2},
];

// ── DATA PENYAKIT PER TANAMAN ────────────────────────────
const diseaseDB = {
  tomato:[
    {name:'Hawar Awal (Early Blight)',severity:'warn',confidence:91.4,desc:'Bercak cokelat dengan cincin konsentris pada daun tua. Disebabkan jamur Alternaria solani.',rec:'Semprot fungisida mankozeb atau klorotalonil. Buang daun terinfeksi. Rotasi tanaman setiap musim.'},
    {name:'Daun Sehat',severity:'safe',confidence:97.8,desc:'Tidak ditemukan tanda infeksi. Warna dan tekstur daun normal.',rec:'Pertahankan dengan penyiraman teratur dan pemupukan berimbang N-P-K.'},
    {name:'Bercak Daun Septoria',severity:'warn',confidence:84.2,desc:'Bercak kecil 3–5 mm berwarna cokelat gelap dengan pusat abu-abu. Jamur Septoria lycopersici.',rec:'Singkirkan daun terinfeksi. Fungisida kontak seminggu sekali. Hindari percikan air ke daun.'},
  ],
  potato:[
    {name:'Hawar Akhir (Late Blight)',severity:'danger',confidence:93.1,desc:'Bercak cokelat gelap dengan tepi berair. Disebabkan Phytophthora infestans, sangat menular.',rec:'Gunakan fungisida berbasis tembaga. Pastikan sirkulasi udara baik. Panen segera bila infeksi meluas.'},
    {name:'Hawar Awal (Early Blight)',severity:'warn',confidence:87.5,desc:'Bercak kecil cokelat dengan lingkaran konsentris. Disebabkan Alternaria solani.',rec:'Semprot fungisida mankozeb. Buang daun terinfeksi. Jaga jarak tanam agar udara mengalir baik.'},
    {name:'Daun Sehat',severity:'safe',confidence:96.2,desc:'Tidak ditemukan tanda infeksi. Daun tampak hijau segar dan normal.',rec:'Lanjutkan perawatan rutin. Periksa berkala agar infeksi terdeteksi lebih awal.'},
  ],
  corn:[
    {name:'Karat Umum (Common Rust)',severity:'danger',confidence:88.6,desc:'Pustul cokelat kemerahan di kedua sisi daun. Disebabkan jamur Puccinia sorghi.',rec:'Gunakan varietas tahan karat. Aplikasikan fungisida sistemik triazol. Pantau rutin saat musim hujan.'},
    {name:'Hawar Daun Utara',severity:'warn',confidence:82.3,desc:'Bercak panjang elips berwarna abu-abu kehijauan. Disebabkan Exserohilum turcicum.',rec:'Tanam varietas resisten. Rotasi tanaman. Fungisida propikonazol bila infeksi parah.'},
    {name:'Daun Sehat',severity:'safe',confidence:95.4,desc:'Daun jagung normal, tidak ada tanda infeksi jamur maupun bakteri.',rec:'Pastikan pemupukan nitrogen cukup dan irigasi teratur untuk mempertahankan kondisi sehat.'},
  ],
  apple:[
    {name:'Kudis Apel (Apple Scab)',severity:'warn',confidence:89.7,desc:'Bercak cokelat-abu berminyak pada daun dan buah. Disebabkan jamur Venturia inaequalis.',rec:'Semprot fungisida kaptan atau mancozeb saat musim semi. Buang daun gugur yang terinfeksi.'},
    {name:'Daun Sehat',severity:'safe',confidence:96.8,desc:'Tidak ditemukan tanda infeksi. Daun apel tampak hijau cerah dan segar.',rec:'Lanjutkan program pemupukan dan pengendalian hama terpadu secara rutin.'},
  ],
  grape:[
    {name:'Hawar Daun Anggur',severity:'danger',confidence:86.4,desc:'Bercak kekuningan di sisi atas daun dan lapisan putih di bawah. Plasmopara viticola.',rec:'Fungisida berbasis tembaga. Pangkas kanopi agar udara mengalir. Hindari irigasi overhead.'},
    {name:'Daun Sehat',severity:'safe',confidence:94.1,desc:'Daun anggur normal, warna hijau merata, tidak ada gejala penyakit.',rec:'Jaga kelembaban tanah stabil dan lakukan pemangkasan rutin setiap musim.'},
  ],
  pepper:[
    {name:'Bercak Bakteri',severity:'warn',confidence:85.9,desc:'Bercak kecil berair berwarna cokelat dengan tepi kuning. Bakteri Xanthomonas campestris.',rec:'Gunakan benih bersertifikat bebas penyakit. Hindari penyiraman dari atas. Bakterisida tembaga bila parah.'},
    {name:'Daun Sehat',severity:'safe',confidence:96.5,desc:'Tidak ada tanda infeksi pada daun. Tanaman cabai dalam kondisi prima.',rec:'Pastikan nutrisi seimbang dan hindari stres air untuk menjaga ketahanan tanaman.'},
  ],
  strawb:[
    {name:'Hawar Daun',severity:'warn',confidence:83.7,desc:'Bercak ungu-merah pada daun dengan pusat abu-abu. Disebabkan Mycosphaerella fragariae.',rec:'Buang daun terinfeksi. Fungisida berbasis belerang. Pastikan drainase baik di sekitar bedengan.'},
    {name:'Daun Sehat',severity:'safe',confidence:95.2,desc:'Daun stroberi segar dan hijau. Tidak ada tanda infeksi yang terdeteksi.',rec:'Ganti mulsa secara rutin dan pastikan bedengan tidak terlalu lembab.'},
  ],
  cherry:[
    {name:'Bercak Daun Ceri',severity:'warn',confidence:87.1,desc:'Bercak bulat cokelat-ungu dengan tepi jelas. Disebabkan Blumeriella jaapii.',rec:'Semprot fungisida setelah panen. Buang daun gugur. Hindari pemangkasan saat musim hujan.'},
    {name:'Daun Sehat',severity:'safe',confidence:95.9,desc:'Tidak ditemukan infeksi. Daun ceri tampak normal dan segar.',rec:'Pangkas cabang yang saling bersilang agar sirkulasi udara tetap baik.'},
  ],
  orange:[{name:'Daun Sehat',severity:'safe',confidence:96.0,desc:'Tidak ada tanda penyakit. Daun jeruk hijau mengkilap dan normal.',rec:'Lanjutkan pemupukan rutin dan periksa hama kutu daun secara berkala.'}],
  peach:[
    {name:'Keriting Daun',severity:'danger',confidence:90.3,desc:'Daun mengkerut, tebal, merah muda/merah. Disebabkan jamur Taphrina deformans.',rec:'Semprot fungisida tembaga sebelum kuncup membuka di musim semi. Buang bagian terinfeksi segera.'},
    {name:'Daun Sehat',severity:'safe',confidence:95.6,desc:'Tidak ada tanda infeksi. Daun persik normal.',rec:'Perhatikan kondisi musim semi karena infeksi biasanya dimulai saat kuncup membuka.'},
  ],
  squash:[
    {name:'Embun Tepung',severity:'warn',confidence:88.2,desc:'Lapisan putih seperti bedak pada daun. Disebabkan jamur Podosphaera xanthii.',rec:'Semprot larutan baking soda + sabun cuci piring. Fungisida belerang. Pangkas bagian terparah.'},
    {name:'Daun Sehat',severity:'safe',confidence:94.3,desc:'Daun labu normal, tidak ada tanda infeksi embun tepung atau penyakit lain.',rec:'Pastikan jarak tanam cukup dan sirkulasi udara baik untuk mencegah embun tepung.'},
  ],
  soybean:[{name:'Daun Sehat',severity:'safe',confidence:93.8,desc:'Tidak ada tanda infeksi. Daun kedelai tampak normal and hijau.',rec:'Pantau populasi ulat dan hama pengisap daun secara berkala.'}],
  rice:[
    {name:'Blas Padi',severity:'danger',confidence:91.7,desc:'Bercak belah ketupat abu-abu dengan tepi cokelat. Disebabkan jamur Pyricularia oryzae.',rec:'Gunakan varietas tahan blas. Fungisida trikiklazol. Kurangi dosis nitrogen yang berlebihan.'},
    {name:'Hawar Daun Bakteri',severity:'danger',confidence:86.5,desc:'Tepian daun mengering dan berwarna kuning. Disebabkan bakteri Xanthomonas oryzae.',rec:'Gunakan benih bersertifikat. Kurangi genangan air. Tanam varietas resisten hawar daun.'},
    {name:'Daun Sehat',severity:'safe',confidence:94.5,desc:'Tidak ada tanda infeksi. Padi dalam kondisi normal dan sehat.',rec:'Pertahankan manajemen air yang baik dan pemupukan N-P-K yang berimbang.'},
  ],
  banana:[
    {name:'Sigatoka Hitam',severity:'danger',confidence:89.4,desc:'Bercak hitam memanjang pada daun yang menyatu dan menyebabkan daun mati prematur.',rec:'Fungisida sistemik triazol. Buang daun terinfeksi. Hindari kelebihan nitrogen.'},
    {name:'Daun Sehat',severity:'safe',confidence:95.1,desc:'Daun pisang segar dan hijau cerah. Tidak ada tanda infeksi.',rec:'Pastikan drainase baik dan hindari luka mekanis pada daun yang dapat menjadi pintu infeksi.'},
  ],
};

// ── STATE ─────────────────────────────────────────────────
let selectedPlant = null;
let cameraStream = null;

// ── BUILD GRID ────────────────────────────────────────────
function buildGrid() {
  const grid = document.getElementById('plant-grid');
  grid.innerHTML = plants.map(p => `
    <div class="plant-card" id="pc-${p.id}" onclick="selectPlant('${p.id}')">
      <div class="check-mark">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span class="p-emoji">${p.emoji}</span>
      <span class="p-name">${p.name}</span>
      <span class="p-latin">${p.latin}</span>
      <span class="disease-count">${p.diseases} penyakit</span>
    </div>`).join('');
}
buildGrid();

function selectPlant(id) {
  const p = plants.find(x => x.id === id);
  if (!p) return;
  selectedPlant = p;

  document.querySelectorAll('.plant-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('pc-' + id).classList.add('selected');

  document.getElementById('s-emoji').textContent = p.emoji;
  document.getElementById('s-name').textContent = p.name;
  document.getElementById('s-latin').textContent = p.latin;
  document.getElementById('selected-banner').classList.add('show');

  document.getElementById('btn-upload').disabled = false;
  document.getElementById('btn-camera').disabled = false;
  document.getElementById('upload-hint').classList.add('hidden');

  showToast(p.emoji + ' ' + p.name + ' dipilih — silakan unggah foto daun');
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
    const match = !q || p.name.toLowerCase().includes(q) || p.latin.toLowerCase().includes(q);
    el.classList.toggle('hidden', !match);
    if (match) found++;
  });
  document.getElementById('no-result').style.display = found ? 'none' : 'block';
}

// ── UPLOAD ────────────────────────────────────────────────
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
  h.style.animation = 'none';
  h.offsetHeight;
  h.style.animation = 'fadeIn 0.3s';
  showToast('Pilih jenis tanaman dahulu ya!');
}

const zone = document.getElementById('upload-zone');
const fileInput = document.getElementById('file-input');
zone.addEventListener('dragover', e => { e.preventDefault(); if (selectedPlant) zone.classList.add('drag-over'); });
zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
zone.addEventListener('drop', e => {
  e.preventDefault(); zone.classList.remove('drag-over');
  if (!selectedPlant) { shakeHint(); return; }
  const f = e.dataTransfer.files[0];
  if (f && f.type.startsWith('image/')) processFile(f);
});
fileInput.addEventListener('change', e => {
  if (e.target.files[0]) processFile(e.target.files[0]);
});

function processFile(file) {
  if (file.size > 10 * 1024 * 1024) { showToast('Ukuran file maksimal 10 MB'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('preview-img').src = e.target.result;
    document.getElementById('file-name').textContent = file.name;
    document.getElementById('file-size').textContent = (file.size / 1024).toFixed(0) + ' KB';
    document.getElementById('img-badge').textContent = 'Memproses...';
    document.getElementById('plant-tag-emoji').textContent = selectedPlant.emoji;
    document.getElementById('plant-tag-name').textContent = selectedPlant.name;
    zone.style.display = 'none';
    const rs = document.getElementById('result-section');
    rs.style.display = 'block';
    document.getElementById('tips-card').style.display = 'none';
    document.getElementById('loading-state').style.display = 'flex';
    document.getElementById('diagnosis-content').style.display = 'none';
    document.getElementById('diagnosis-content').innerHTML = '';
    setTimeout(() => rs.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    simulateAnalysis();
  };
  reader.readAsDataURL(file);
}

function simulateAnalysis() {
  const steps = ['Mempersiapkan model...', 'Preprocessing gambar...', 'Menjalankan CNN...', 'Membaca pola penyakit...', 'Menyusun diagnosis...'];
  const pcts = [15, 35, 60, 80, 95];
  let i = 0;
  const bar = document.getElementById('loading-bar');
  const stepEl = document.getElementById('loading-step');
  const iv = setInterval(() => {
    if (i < steps.length) { stepEl.textContent = steps[i]; bar.style.width = pcts[i] + '%'; i++; }
  }, 450);
  setTimeout(() => {
    clearInterval(iv); bar.style.width = '100%';
    const pool = diseaseDB[selectedPlant.id] || diseaseDB.tomato;
    const d = pool[Math.floor(Math.random() * pool.length)];
    const others = pool.filter(x => x !== d).slice(0, 3).map(x => ({ name: x.name, pct: +(Math.random() * 8 + 1).toFixed(1) }));
    setTimeout(() => showResult(d, others), 300);
  }, 2600);
}

function showResult(d, others) {
  document.getElementById('loading-state').style.display = 'none';
  document.getElementById('tips-card').style.display = 'block';
  document.getElementById('img-badge').textContent = d.severity === 'safe' ? 'Sehat' : d.severity === 'warn' ? 'Perhatian' : 'Terinfeksi';
  const svLabel = d.severity === 'safe' ? 'Daun Sehat' : d.severity === 'warn' ? 'Perlu Perhatian' : 'Terinfeksi';
  const svDot = d.severity === 'safe' ? '🟢' : d.severity === 'warn' ? '🟡' : '🔴';
  const otherBars = others.map((o, i) => `
    <div class="pred-item">
      <div class="pred-rank">${i + 2}</div>
      <span class="pred-name">${o.name}</span>
      <div class="pred-bar-bg"><div class="pred-bar-fill" data-w="${o.pct}"></div></div>
      <span class="pred-pct">${o.pct.toFixed(1)}%</span>
    </div>`).join('');
  const c = document.getElementById('diagnosis-content');
  c.innerHTML = `
    <div class="diag-header">
      <div class="diag-badge badge-${d.severity}">${svDot} ${svLabel}</div>
      <div class="diag-name">${d.name}</div>
      <div class="diag-plant">${selectedPlant.emoji} ${selectedPlant.name} · ${selectedPlant.latin}</div>
    </div>
    <div class="diag-body">
      <div>
        <div class="conf-row"><span class="conf-label-txt">Tingkat kepercayaan model</span><span class="conf-pct">${d.confidence.toFixed(1)}%</span></div>
        <div class="conf-bar"><div class="conf-fill" id="cf"></div></div>
      </div>
      <p class="desc-text">${d.desc}</p>
      <div>
        <div class="pred-section-title">Prediksi lainnya</div>
        <div class="pred-list">
          <div class="pred-item">
            <div class="pred-rank" style="background:var(--mist2);color:var(--moss);">1</div>
            <span class="pred-name" style="font-weight:600;">${d.name}</span>
            <div class="pred-bar-bg"><div class="pred-bar-fill top" data-w="${d.confidence}"></div></div>
            <span class="pred-pct" style="color:var(--moss);font-weight:600;">${d.confidence.toFixed(1)}%</span>
          </div>
          ${otherBars}
        </div>
      </div>
      <div class="rec-box">
        <div class="rec-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Rekomendasi Penanganan</div>
        <p class="rec-text">${d.rec}</p>
      </div>
      <div class="action-row">
        <button class="btn-primary" onclick="resetApp()" style="justify-content:center;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:15px;height:15px;"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
          Scan Lagi
        </button>
        <button class="share-btn" onclick="shareResult('${d.name}','${d.confidence.toFixed(1)}')" title="Bagikan hasil">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </button>
      </div>
    </div>`;
  c.style.display = 'block';
  setTimeout(() => {
    document.getElementById('cf').style.width = d.confidence + '%';
    document.querySelectorAll('.pred-bar-fill').forEach(el => { if (el.dataset.w) el.style.width = el.dataset.w + '%'; });
  }, 100);
}

function resetApp() {
  selectedPlant = null;
  zone.style.display = 'block';
  document.getElementById('result-section').style.display = 'none';
  document.getElementById('diagnosis-content').innerHTML = '';
  document.getElementById('loading-bar').style.width = '0%';
  document.getElementById('btn-upload').disabled = true;
  document.getElementById('btn-camera').disabled = true;
  document.getElementById('selected-banner').classList.remove('show');
  document.querySelectorAll('.plant-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('upload-hint').classList.remove('hidden');
  fileInput.value = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shareResult(name, conf) {
  const txt = `Hasil scan PlantScan: ${name} (Kepercayaan: ${conf}%) — cek tanamanmu di PlantScan!`;
  if (navigator.share) { navigator.share({ title: 'Hasil PlantScan', text: txt }).catch(() => {}); }
  else { navigator.clipboard.writeText(txt).then(() => showToast('Hasil disalin ke clipboard!')); }
}

async function openCamera() {
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
    document.getElementById('camera-video').srcObject = cameraStream;
    document.getElementById('camera-modal').classList.add('open');
  } catch { showToast('Tidak dapat mengakses kamera. Coba unggah foto.'); }
}
function closeCamera() {
  if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; }
  document.getElementById('camera-modal').classList.remove('open');
}
function capturePhoto() {
  const v = document.getElementById('camera-video');
  const cv = document.getElementById('snap-canvas');
  cv.width = v.videoWidth; cv.height = v.videoHeight;
  cv.getContext('2d').drawImage(v, 0, 0);
  cv.toBlob(blob => {
    closeCamera();
    processFile(new File([blob], 'kamera.jpg', { type: 'image/jpeg' }));
  }, 'image/jpeg', 0.92);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function toggleNav() { document.getElementById('nav-links').classList.toggle('open'); }
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => document.getElementById('nav-links').classList.remove('open')));

const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) cur = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}, { passive: true });