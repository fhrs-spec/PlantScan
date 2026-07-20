import { diseaseContexts } from './diseaseData.js';

// ============================================================
// 🛡️ SISTEM KEAMANAN — Rate Limiter, CORS, Payload Limit
// ============================================================

// Konfigurasi keamanan
const MAX_REQUESTS = 5;           // Maksimal 5 request...
const WINDOW_MS = 5 * 60 * 1000;  // ...per 5 menit (300.000 ms)
const MAX_PAYLOAD_BYTES = 5 * 1024 * 1024; // Batas ukuran gambar: 5 MB

// Penyimpanan rate limit di memori (bertahan selama container Vercel "warm")
const rateLimitMap = new Map();

/**
 * Mengambil alamat IP pengguna dari header request Vercel.
 * Vercel meneruskan IP asli pengguna lewat header 'x-forwarded-for'.
 */
function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

/**
 * Memeriksa apakah IP sudah melewati batas request.
 * Mengembalikan objek: { allowed: boolean, remaining: number, resetInSeconds: number }
 */
function checkRateLimit(ip) {
  const now = Date.now();
  
  // Bersihkan entri yang sudah kadaluarsa
  for (const [key, value] of rateLimitMap.entries()) {
    if (now - value.windowStart > WINDOW_MS) {
      rateLimitMap.delete(key);
    }
  }

  const record = rateLimitMap.get(ip);

  if (!record) {
    // IP baru, buat catatan pertama
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetInSeconds: 0 };
  }

  // Jika jendela waktu sudah lewat, reset
  if (now - record.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetInSeconds: 0 };
  }

  // Masih dalam jendela waktu
  if (record.count >= MAX_REQUESTS) {
    const resetIn = Math.ceil((WINDOW_MS - (now - record.windowStart)) / 1000);
    return { allowed: false, remaining: 0, resetInSeconds: resetIn };
  }

  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS - record.count, resetInSeconds: 0 };
}

// ============================================================
// 🚀 HANDLER UTAMA
// ============================================================

export default async function handler(req, res) {
  // --- Keamanan 1: Hanya izinkan metode POST ---
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // --- Keamanan 2: CORS — Blokir request dari domain asing ---
  const host = req.headers.host || '';
  const origin = req.headers['origin'] || req.headers['referer'] || '';

  if (origin && host && !origin.includes(host)) {
    // Sebagai tambahan, izinkan URL spesifik Vercel dan localhost
    const isVercelUrl = process.env.VERCEL_URL && origin.includes(process.env.VERCEL_URL);
    const isProdUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL && origin.includes(process.env.VERCEL_PROJECT_PRODUCTION_URL);
    const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');

    if (!isVercelUrl && !isProdUrl && !isLocalhost) {
      console.warn(`CORS blocked: origin=${origin} host=${host}`);
      return res.status(403).json({ error: 'Akses ditolak. Domain Anda tidak diizinkan menggunakan API ini.' });
    }
  }

  // --- Keamanan 3: Rate Limiting (5 scan per 5 menit per IP) ---
  const clientIP = getClientIP(req);
  const rateCheck = checkRateLimit(clientIP);

  // Sisipkan header informasi sisa kuota ke response
  res.setHeader('X-RateLimit-Limit', MAX_REQUESTS);
  res.setHeader('X-RateLimit-Remaining', rateCheck.remaining);

  if (!rateCheck.allowed) {
    const minutes = Math.floor(rateCheck.resetInSeconds / 60);
    const seconds = rateCheck.resetInSeconds % 60;
    const waitText = minutes > 0 ? `${minutes} menit ${seconds} detik` : `${seconds} detik`;
    return res.status(429).json({
      error: `Anda sudah melakukan ${MAX_REQUESTS}x scan. Silakan tunggu ${waitText} lagi sebelum mencoba kembali.`,
      retryAfterSeconds: rateCheck.resetInSeconds
    });
  }

  const { imageB64, imageBase64, plantName, plantLatin, plantId } = req.body;
  
  const finalImage = imageB64 || imageBase64;

  if (!finalImage) {
    return res.status(400).json({ error: 'No image provided' });
  }

  // --- Keamanan 4: Payload Size Limit (maks 5 MB) ---
  const imageSizeBytes = Buffer.byteLength(finalImage, 'base64');
  if (imageSizeBytes > MAX_PAYLOAD_BYTES) {
    const sizeMB = (imageSizeBytes / (1024 * 1024)).toFixed(1);
    return res.status(413).json({ 
      error: `Ukuran gambar terlalu besar (${sizeMB} MB). Maksimal ${MAX_PAYLOAD_BYTES / (1024 * 1024)} MB.` 
    });
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
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-flash-latest',
    'gemini-flash-lite-latest'
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
  return diseaseContexts[plantId] || diseaseContexts.default;
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
