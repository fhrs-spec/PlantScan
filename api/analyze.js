export default async function handler(req, res) {
  // Hanya menerima metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { imageB64, imageBase64, plantName, plantLatin, plantId } = req.body;
  
  const finalImage = imageB64 || imageBase64;

  if (!finalImage) {
    return res.status(400).json({ error: 'No image provided' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // ==== MODE SIMULASI (DEMO) ====
  if (!apiKey || apiKey.length < 10) {
    console.log("Menjalankan Mode Simulasi Serverless...");
    
    // Tunda acak antara 1-3 detik agar terlihat seperti AI asli
    const delay = Math.floor(Math.random() * 2000) + 1000;
    await new Promise(resolve => setTimeout(resolve, delay));

    const isHealthy = Math.random() > 0.5;
    
    let mockResult = {};
    if (isHealthy) {
      mockResult = {
        scan_type: "daun",
        kondisi: "sehat",
        nama_penyakit: `${plantName} Sehat`,
        pathogen: "Tidak ada infeksi",
        tingkat_kepercayaan: Math.floor(Math.random() * 15) + 85,
        ringkasan: `Tanaman ${plantName} ini tampak sangat sehat dan terawat dengan baik.`,
        gejala_terlihat: "Warna daun hijau cerah merata, tidak ada bercak, tidak ada tanda-tanda serangan hama atau penyakit jamur.",
        penyebab: "-",
        dampak: "Tanaman dapat berfotosintesis dengan maksimal dan menghasilkan panen yang optimal.",
        rekomendasi: ["Lanjutkan rutinitas penyiraman secara teratur.", "Berikan pupuk berimbang sesuai fase pertumbuhan tanaman."],
        urgensi: "tidak perlu tindakan"
      };
    } else {
      mockResult = {
        scan_type: "daun",
        kondisi: "perhatian",
        nama_penyakit: `Bercak Daun Simulasi (${plantName})`,
        pathogen: "Fungi simulasi sp.",
        tingkat_kepercayaan: Math.floor(Math.random() * 10) + 80,
        ringkasan: `Ditemukan gejala awal infeksi jamur pada daun ${plantName} Anda.`,
        gejala_terlihat: "Terdapat bercak-bercak kecokelatan kecil dengan lingkaran halo kuning di sekitarnya.",
        penyebab: "Kelembapan yang terlalu tinggi memicu pertumbuhan spora jamur pada permukaan daun.",
        dampak: "Jika dibiarkan, bercak akan menyebar dan menyebabkan daun rontok prematur, menurunkan hasil panen.",
        rekomendasi: ["Kurangi intensitas penyiraman (jangan sampai daun terlalu basah).", "Segera pangkas dan buang daun yang telah terinfeksi ke tempat sampah.", "Aplikasikan fungisida berbahan aktif tembaga jika gejala makin meluas."],
        urgensi: "dalam seminggu"
      };
    }
    
    return res.status(200).json(mockResult);
  }

  // ==== MODE AI GEMINI ASLI ====
  const modelsToTry = [
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
  ];

  const systemPrompt = buildSystemPrompt(plantName, plantLatin, plantId);
  const requestBody = {
    contents: [
      {
        parts: [
          { text: "Lakukan analisis menyeluruh pada gambar tanaman ini berdasarkan instruksi sistem." },
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: finalImage
            }
          }
        ]
      }
    ],
    system_instruction: {
      parts: [{ text: systemPrompt }]
    },
    generationConfig: {
      temperature: 0.4,
      topK: 32,
      topP: 1,
      maxOutputTokens: 2048,
    }
  };

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (!response.ok) {
        lastError = data.error ? data.error.message : 'Unknown API error';
        console.warn(`Model ${model} gagal: ${lastError}`);
        continue; // Lanjut ke model berikutnya
      }

      const textResponse = data.candidates[0].content.parts[0].text;
      
      // Membersihkan markdown JSON jika AI mengembalikannya dengan backticks
      const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      
      let parsed;
      try {
        parsed = JSON.parse(cleanJson);
      } catch(e) {
        throw new Error("Gagal mem-parsing JSON dari AI: " + cleanJson);
      }

      return res.status(200).json(parsed);

    } catch (error) {
      console.error(`Error dengan model ${model}:`, error);
      lastError = error.message;
    }
  }

  // Jika semua model gagal
  return res.status(500).json({ 
    error: `Semua varian model Gemini gagal atau ditolak. Error terakhir: ${lastError}` 
  });
}

function getDiseaseContext(plantId) {
  const ctx = {
    tomato: `? Busuk Buah Antraknosa ?" bercak hitam cekung pada buah
? Busuk Ujung Bunga ?" ujung buah hitam/cokelat
? Bercak Bakteri (Xanthomonas) ?" bercak kecil berair pada daun dan buah
? TYLCV (Tomato Yellow Leaf Curl) ?" daun menggulung, kuning
? Penyakit Layu Bakteri (Ralstonia) ?" layu tiba-tiba tanpa warna kuning
? Daun/Buah Sehat`,
    default: `? Penyakit Jamur ?" bercak cokelat/hitam/putih pada daun atau buah
? Penyakit Bakteri ?" bercak berair, busuk
? Penyakit Virus ?" daun belang, deformasi
? Embun Tepung ?" lapisan putih
? Hawar ?" daun mengering tiba-tiba
? Daun/Buah Sehat`
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
