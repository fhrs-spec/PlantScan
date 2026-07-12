export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const { imageB64, mimeType, plantName, plantLatin, plantId } = req.body;

  // ==== MODE SIMULASI (DEMO) ====
  // Jika API Key belum disetel di Vercel, kembalikan hasil mock yang realistis
  if (!apiKey || apiKey.length < 10) {
    console.log("Memasuki Mode Simulasi (API Key tidak ditemukan).");
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 2000));

    const isHealthy = Math.random() > 0.5;
    if (isHealthy) {
      return res.status(200).json({
        scan_type: "daun",
        kondisi: "sehat",
        nama_penyakit: `${plantName} Sehat`,
        pathogen: "Tidak ada infeksi",
        tingkat_kepercayaan: Math.floor(Math.random() * 10) + 88, // 88-97
        ringkasan: `Tanaman ${plantName} ini tampak sangat sehat dan terawat dengan baik.`,
        gejala_terlihat: "Warna daun hijau cerah merata, tidak ada bercak, tidak ada tanda-tanda serangan hama atau penyakit jamur.",
        penyebab: "-",
        dampak: "Tanaman dapat berfotosintesis dengan maksimal dan menghasilkan panen yang optimal.",
        rekomendasi: [
          "Lanjutkan rutinitas penyiraman secara teratur.",
          "Berikan pupuk berimbang sesuai jadwal pemupukan rutin.",
          "Pastikan tanaman mendapatkan sinar matahari yang cukup."
        ],
        urgensi: "tidak perlu tindakan"
      });
    } else {
      return res.status(200).json({
        scan_type: "daun",
        kondisi: "perhatian",
        nama_penyakit: `Bercak Daun Simulasi (${plantName})`,
        pathogen: "Contoh Patogen Fiktif",
        tingkat_kepercayaan: Math.floor(Math.random() * 15) + 75, // 75-89
        ringkasan: "Ini adalah mode demo. Terdeteksi adanya bercak pada daun yang menunjukkan tanda-tanda infeksi.",
        gejala_terlihat: "Terdapat bercak-bercak kecokelatan pada permukaan daun yang berpotensi menyebar.",
        penyebab: "Kelembapan berlebih dan sirkulasi udara yang kurang baik sering kali memicu penyakit seperti ini.",
        dampak: "Jika dibiarkan, bercak dapat meluas dan menyebabkan daun mengering serta rontok sebelum waktunya.",
        rekomendasi: [
          "[SIMULASI] Pangkas daun yang terinfeksi dan buang jauh dari area tanam.",
          "[SIMULASI] Semprotkan fungisida organik (misal: ekstrak nimba) jika gejala menyebar.",
          "Pastikan sirkulasi udara di sekitar tanaman lancar."
        ],
        urgensi: "dalam seminggu"
      });
    }
  }

  // ==== MODE AI GEMINI ASLI ====
  try {
    const GEMINI_MODEL = 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

    const systemPrompt = buildSystemPrompt(plantName, plantLatin, plantId);
    const userText = `Tolong analisis foto ini. Ini adalah foto dari tanaman ${plantName} (${plantLatin}). Periksa apakah ada tanda-tanda penyakit pada daun atau buahnya dan berikan diagnosis lengkap dalam format JSON yang telah ditentukan.`;

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
                data: imageB64
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

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return res.status(response.status).json(errData);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts
      ?.filter(p => p.text)
      ?.map(p => p.text)
      ?.join('') || '';

    if (!rawText) {
      return res.status(500).json({ error: 'Respons AI kosong.' });
    }

    const cleaned = rawText.replace(/```json|```/gi, '').trim();
    let result;
    try {
      result = JSON.parse(cleaned);
    } catch {
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (match) {
        result = JSON.parse(match[0]);
      } else {
        return res.status(500).json({ error: 'Format respons AI tidak valid.' });
      }
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
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

function buildSystemPrompt(name, latin, id) {
  return `Kamu adalah ahli patologi tanaman (plant pathologist) terkemuka yang berspesialisasi dalam mendiagnosis penyakit tanaman berdasarkan foto.

Kamu akan menganalisis foto DAUN atau BUAH dari tanaman ${name} (${latin}).

## TUGAS VALIDASI KRITIS (ANTI-HALUSINASI):
1. Periksa foto dengan saksama. Apakah foto ini benar-benar menampilkan DAUN atau BUAH dari tanaman (terutama ${name})?
2. JIKA FOTO TERSEBUT JELAS BUKAN TANAMAN (misalnya foto manusia, hewan, ruangan, perabotan, atau objek acak lainnya):
   - Kamu WAJIB menghentikan analisis.
   - Isi field "nama_penyakit" dengan: "Objek Tidak Dikenali"
   - Isi field "kondisi" dengan: "error"
   - Isi field "gejala_terlihat" dengan: "Sistem mendeteksi bahwa foto yang diunggah bukan foto tanaman atau tidak relevan."
   - Abaikan field lain atau isi dengan N/A.
3. Jika foto BUKAN tanaman ${name} tapi tanaman lain, kamu boleh memperingatkan di "ringkasan" bahwa itu tampak seperti tanaman lain.

## Penyakit Umum pada ${name}:
${getDiseaseContext(id)}

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
