import re

with open('script.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Plants array
code = code.replace("name:'Tomat',      latin:'Solanum lycopersicum',    diseases:12, category:'Sayuran'", "name:'Tomat', name_en:'Tomato', latin:'Solanum lycopersicum', diseases:12, category:'Sayuran', category_en:'Vegetable'")
code = code.replace("name:'Kentang',    latin:'Solanum tuberosum',       diseases:8,  category:'Sayuran'", "name:'Kentang', name_en:'Potato', latin:'Solanum tuberosum', diseases:8, category:'Sayuran', category_en:'Vegetable'")
code = code.replace("name:'Jagung',     latin:'Zea mays',               diseases:7,  category:'Sayuran'", "name:'Jagung', name_en:'Corn', latin:'Zea mays', diseases:7, category:'Sayuran', category_en:'Vegetable'")
code = code.replace("name:'Cabai',      latin:'Capsicum annuum',        diseases:6,  category:'Sayuran'", "name:'Cabai', name_en:'Pepper', latin:'Capsicum annuum', diseases:6, category:'Sayuran', category_en:'Vegetable'")
code = code.replace("name:'Labu',       latin:'Cucurbita pepo',         diseases:5,  category:'Sayuran'", "name:'Labu', name_en:'Squash', latin:'Cucurbita pepo', diseases:5, category:'Sayuran', category_en:'Vegetable'")
code = code.replace("name:'Mentimun',   latin:'Cucumis sativus',        diseases:6,  category:'Sayuran'", "name:'Mentimun', name_en:'Cucumber', latin:'Cucumis sativus', diseases:6, category:'Sayuran', category_en:'Vegetable'")
code = code.replace("name:'Terong',     latin:'Solanum melongena',      diseases:5,  category:'Sayuran'", "name:'Terong', name_en:'Eggplant', latin:'Solanum melongena', diseases:5, category:'Sayuran', category_en:'Vegetable'")
code = code.replace("name:'Bayam',      latin:'Spinacia oleracea',      diseases:4,  category:'Sayuran'", "name:'Bayam', name_en:'Spinach', latin:'Spinacia oleracea', diseases:4, category:'Sayuran', category_en:'Vegetable'")
code = code.replace("name:'Bawang Merah',latin:'Allium cepa aggregatum', diseases:5,  category:'Sayuran'", "name:'Bawang Merah', name_en:'Shallot', latin:'Allium cepa aggregatum', diseases:5, category:'Sayuran', category_en:'Vegetable'")
code = code.replace("name:'Bawang Putih',latin:'Allium sativum',         diseases:5,  category:'Sayuran'", "name:'Bawang Putih', name_en:'Garlic', latin:'Allium sativum', diseases:5, category:'Sayuran', category_en:'Vegetable'")
code = code.replace("name:'Kangkung', latin:'Ipomoea aquatica',    diseases:4,  category:'Sayuran'", "name:'Kangkung', name_en:'Water Spinach', latin:'Ipomoea aquatica', diseases:4, category:'Sayuran', category_en:'Vegetable'")
code = code.replace("name:'Sawi / Pakcoy', latin:'Brassica rapa', diseases:5,  category:'Sayuran'", "name:'Sawi / Pakcoy', name_en:'Mustard Greens / Bok Choy', latin:'Brassica rapa', diseases:5, category:'Sayuran', category_en:'Vegetable'")
code = code.replace("name:'Kubis',      latin:'Brassica oleracea',      diseases:6,  category:'Sayuran'", "name:'Kubis', name_en:'Cabbage', latin:'Brassica oleracea', diseases:6, category:'Sayuran', category_en:'Vegetable'")
code = code.replace("name:'Wortel',     latin:'Daucus carota',          diseases:4,  category:'Sayuran'", "name:'Wortel', name_en:'Carrot', latin:'Daucus carota', diseases:4, category:'Sayuran', category_en:'Vegetable'")

code = code.replace("name:'Kedelai',    latin:'Glycine max',            diseases:5,  category:'Kacang'", "name:'Kedelai', name_en:'Soybean', latin:'Glycine max', diseases:5, category:'Kacang', category_en:'Nut'")
code = code.replace("name:'Kacang Tanah',latin:'Arachis hypogaea',     diseases:5,  category:'Kacang'", "name:'Kacang Tanah', name_en:'Peanut', latin:'Arachis hypogaea', diseases:5, category:'Kacang', category_en:'Nut'")
code = code.replace("name:'Padi',       latin:'Oryza sativa',           diseases:9,  category:'Pangan'", "name:'Padi', name_en:'Rice', latin:'Oryza sativa', diseases:9, category:'Pangan', category_en:'Crop'")
code = code.replace("name:'Gandum',     latin:'Triticum aestivum',      diseases:6,  category:'Pangan'", "name:'Gandum', name_en:'Wheat', latin:'Triticum aestivum', diseases:6, category:'Pangan', category_en:'Crop'")
code = code.replace("name:'Singkong',   latin:'Manihot esculenta',      diseases:5,  category:'Pangan'", "name:'Singkong', name_en:'Cassava', latin:'Manihot esculenta', diseases:5, category:'Pangan', category_en:'Crop'")
code = code.replace("name:'Ubi Jalar', latin:'Ipomoea batatas',     diseases:5,  category:'Pangan'", "name:'Ubi Jalar', name_en:'Sweet Potato', latin:'Ipomoea batatas', diseases:5, category:'Pangan', category_en:'Crop'")

code = code.replace("name:'Apel',       latin:'Malus domestica',        diseases:8,  category:'Buah'", "name:'Apel', name_en:'Apple', latin:'Malus domestica', diseases:8, category:'Buah', category_en:'Fruit'")
code = code.replace("name:'Anggur',     latin:'Vitis vinifera',         diseases:8,  category:'Buah'", "name:'Anggur', name_en:'Grape', latin:'Vitis vinifera', diseases:8, category:'Buah', category_en:'Fruit'")
code = code.replace("name:'Stroberi',   latin:'Fragaria × ananassa',   diseases:6,  category:'Buah'", "name:'Stroberi', name_en:'Strawberry', latin:'Fragaria × ananassa', diseases:6, category:'Buah', category_en:'Fruit'")
code = code.replace("name:'Ceri',       latin:'Prunus avium',           diseases:5,  category:'Buah'", "name:'Ceri', name_en:'Cherry', latin:'Prunus avium', diseases:5, category:'Buah', category_en:'Fruit'")
code = code.replace("name:'Persik',     latin:'Prunus persica',         diseases:6,  category:'Buah'", "name:'Persik', name_en:'Peach', latin:'Prunus persica', diseases:6, category:'Buah', category_en:'Fruit'")
code = code.replace("name:'Pisang',     latin:'Musa acuminata',         diseases:7,  category:'Buah'", "name:'Pisang', name_en:'Banana', latin:'Musa acuminata', diseases:7, category:'Buah', category_en:'Fruit'")
code = code.replace("name:'Mangga',     latin:'Mangifera indica',       diseases:6,  category:'Buah'", "name:'Mangga', name_en:'Mango', latin:'Mangifera indica', diseases:6, category:'Buah', category_en:'Fruit'")
code = code.replace("name:'Jeruk',      latin:'Citrus sinensis',        diseases:7,  category:'Buah'", "name:'Jeruk', name_en:'Orange', latin:'Citrus sinensis', diseases:7, category:'Buah', category_en:'Fruit'")
code = code.replace("name:'Pepaya',     latin:'Carica papaya',          diseases:5,  category:'Buah'", "name:'Pepaya', name_en:'Papaya', latin:'Carica papaya', diseases:5, category:'Buah', category_en:'Fruit'")
code = code.replace("name:'Durian',     latin:'Durio zibethinus',       diseases:6,  category:'Buah'", "name:'Durian', name_en:'Durian', latin:'Durio zibethinus', diseases:6, category:'Buah', category_en:'Fruit'")
code = code.replace("name:'Semangka', latin:'Citrullus lanatus',      diseases:5,  category:'Buah'", "name:'Semangka', name_en:'Watermelon', latin:'Citrullus lanatus', diseases:5, category:'Buah', category_en:'Fruit'")
code = code.replace("name:'Melon',      latin:'Cucumis melo',           diseases:5,  category:'Buah'", "name:'Melon', name_en:'Melon', latin:'Cucumis melo', diseases:5, category:'Buah', category_en:'Fruit'")
code = code.replace("name:'Nanas',      latin:'Ananas comosus',         diseases:4,  category:'Buah'", "name:'Nanas', name_en:'Pineapple', latin:'Ananas comosus', diseases:4, category:'Buah', category_en:'Fruit'")
code = code.replace("name:'Rambutan',   latin:'Nephelium lappaceum',    diseases:4,  category:'Buah'", "name:'Rambutan', name_en:'Rambutan', latin:'Nephelium lappaceum', diseases:4, category:'Buah', category_en:'Fruit'")

code = code.replace("name:'Kelapa Sawit', latin:'Elaeis guineensis',    diseases:7,  category:'Perkebunan'", "name:'Kelapa Sawit', name_en:'Palm Oil', latin:'Elaeis guineensis', diseases:7, category:'Perkebunan', category_en:'Plantation'")
code = code.replace("name:'Kopi',       latin:'Coffea',                 diseases:6,  category:'Perkebunan'", "name:'Kopi', name_en:'Coffee', latin:'Coffea', diseases:6, category:'Perkebunan', category_en:'Plantation'")
code = code.replace("name:'Kakao',      latin:'Theobroma cacao',        diseases:6,  category:'Perkebunan'", "name:'Kakao', name_en:'Cocoa', latin:'Theobroma cacao', diseases:6, category:'Perkebunan', category_en:'Plantation'")
code = code.replace("name:'Karet',      latin:'Hevea brasiliensis',     diseases:5,  category:'Perkebunan'", "name:'Karet', name_en:'Rubber', latin:'Hevea brasiliensis', diseases:5, category:'Perkebunan', category_en:'Plantation'")
code = code.replace("name:'Teh',        latin:'Camellia sinensis',      diseases:5,  category:'Perkebunan'", "name:'Teh', name_en:'Tea', latin:'Camellia sinensis', diseases:5, category:'Perkebunan', category_en:'Plantation'")

code = code.replace("name:'Anggrek',    latin:'Orchidaceae',            diseases:6,  category:'Hias'", "name:'Anggrek', name_en:'Orchid', latin:'Orchidaceae', diseases:6, category:'Hias', category_en:'Ornamental'")
code = code.replace("name:'Monstera',   latin:'Monstera deliciosa',     diseases:4,  category:'Hias'", "name:'Monstera', name_en:'Monstera', latin:'Monstera deliciosa', diseases:4, category:'Hias', category_en:'Ornamental'")
code = code.replace("name:'Aglaonema',  latin:'Aglaonema',              diseases:4,  category:'Hias'", "name:'Aglaonema', name_en:'Aglaonema', latin:'Aglaonema', diseases:4, category:'Hias', category_en:'Ornamental'")
code = code.replace("name:'Mawar',      latin:'Rosa',                   diseases:5,  category:'Hias'", "name:'Mawar', name_en:'Rose', latin:'Rosa', diseases:5, category:'Hias', category_en:'Ornamental'")

code = code.replace("name:'Jahe',       latin:'Zingiber officinale',    diseases:4,  category:'Rempah'", "name:'Jahe', name_en:'Ginger', latin:'Zingiber officinale', diseases:4, category:'Rempah', category_en:'Spice'")
code = code.replace("name:'Kunyit',     latin:'Curcuma longa',          diseases:4,  category:'Rempah'", "name:'Kunyit', name_en:'Turmeric', latin:'Curcuma longa', diseases:4, category:'Rempah', category_en:'Spice'")


# JS Template literals & logic
code = code.replace('<span class="pc-name">${p.name}</span>', '<span class="pc-name">${currentLang === "en" && p.name_en ? p.name_en : p.name}</span>')
code = code.replace("document.getElementById('sb-name').textContent  = p.name;", "document.getElementById('sb-name').textContent = currentLang === 'en' && p.name_en ? p.name_en : p.name;")

# Toasts
code = code.replace("showToast(`${p.emoji} ${p.name} dipilih — silakan unggah foto daun atau buah`);", "showToast(`${p.emoji} ${currentLang === 'en' && p.name_en ? p.name_en : p.name} ${t('toast_selected')}`);")
code = code.replace("showToast('⚠️ Pilih jenis tanaman dahulu ya!');", "showToast(t('toast_select_first'));")
code = code.replace("showToast('Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.');", "showToast(t('toast_format'));")
code = code.replace("showToast('❌ Ukuran file maksimal 10 MB');", "showToast(t('toast_size'));")

# Loaders
code = code.replace("document.getElementById('loader-step').textContent = 'Memuat gambar...';", "document.getElementById('loader-step').textContent = t('loader_1');")
code = code.replace("document.getElementById('loader-step').textContent = 'Menghubungkan ke server cerdas...';", "document.getElementById('loader-step').textContent = t('loader_2');")
code = code.replace("document.getElementById('loader-step').textContent = 'Menganalisis pola penyakit...';", "document.getElementById('loader-step').textContent = t('loader_3');")
code = code.replace("document.getElementById('loader-step').textContent = 'Menyiapkan hasil...';", "document.getElementById('loader-step').textContent = t('loader_4');")

# Diagnosis Rendering
code = code.replace(">Tingkat Kepercayaan AI<", ">${t('ai_confidence')}<")
code = code.replace(">Hasil Observasi<", ">${t('obs_result')}<")
code = code.replace(">Gejala Terlihat<", ">${t('symp')}<")
code = code.replace(">Patogen<", ">${t('pathogen')}<")
code = code.replace(">Penyebab<", ">${t('cause')}<")
code = code.replace(">Dampak<", ">${t('impact')}<")
code = code.replace(">Saran Tindakan<", ">${t('action')}<")
code = code.replace(">Scan Lagi<", ">${t('scan_again')}<")
code = code.replace(">Bagikan<", ">${t('share')}<")

# Error Toasts
code = code.replace("showDiagnosisError('Gagal memproses diagnosis.');", "showDiagnosisError(t('diag_error'));")
code = code.replace("showDiagnosisError('Terjadi kesalahan pada server. Coba beberapa saat lagi.');", "showDiagnosisError(t('err_server'));")
code = code.replace("showToast('❌ Tidak dapat mengakses kamera');", "showToast(t('err_cam'));")
code = code.replace("showToast('⚠️ Anda sedang offline. Fitur scan AI tidak tersedia.');", "showToast(t('toast_offline'));")
code = code.replace("showToast('✅ Kembali terhubung ke internet.');", "showToast(t('toast_online'));")

# History
code = code.replace("${item.plantEmoji} ${item.plantName}", "${item.plantEmoji} ${currentLang === 'en' && plants.find(p=>p.name===item.plantName)?.name_en ? plants.find(p=>p.name===item.plantName).name_en : item.plantName}")

# Others
code = code.replace("showToast('Hasil disalin ke clipboard!');", "showToast(t('copied'));")
code = code.replace("showToast('Silakan masukkan email / Please enter email');", "showToast(t('toast_login_req'));")
code = code.replace("showToast('Berhasil Login! / Login Successful!');", "showToast(t('toast_login_ok'));")
code = code.replace("showToast('Berhasil Logout. / Logout Successful.');", "showToast(t('toast_logout'));")
code = code.replace("showToast('Batas scan gratis (1x) telah habis. Silakan login. / Free scan limit reached. Please login.');", "showToast(t('toast_limit'));")

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(code)

print('Updated successfully')
