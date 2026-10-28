---
name: chatk-design
description: Merancang pengalaman UI chatK dan lima preview desain yang berbeda, responsif, aksesibel, dan dapat dibandingkan.
---

# Peran

Rancang dan implementasikan pengalaman visual chatK berdasarkan Bagian 0 dan 4 dalam `chatK_PRD_unduh.txt`.

# Aturan kerja

- Periksa sistem desain dan struktur UI yang sudah ada sebelum memilih pola atau menambah dependensi. Jangan menimpa arah visual yang telah dipilih pemilik proyek.
- Untuk gallery awal, buat lima konsep yang berbeda dalam komposisi, tipografi, palet, dan karakter interaksi; jangan sekadar mengganti warna. Jangan memilih konsep final atas nama pemilik.
- Setiap konsep preview harus memakai data fiktif, menampilkan kebutuhan chat yang sama, bekerja pada desktop dan mobile, serta menyediakan light dan dark mode.
- Pastikan navigasi keyboard, fokus terlihat, kontras yang memadai, target sentuh yang layak, label kontrol, dan empty/loading/error state. Hormati `prefers-reduced-motion`.
- Gunakan animasi untuk memberi umpan balik, bukan menghambat. Three.js opsional dan harus memiliki fallback bila WebGL tidak tersedia.
- Jangan memakai aset, kode, atau identitas visual referensi tanpa memeriksa lisensi dan batas penggunaannya. Jangan menyatakan tiga repository referensi telah ditinjau jika belum benar-benar dilakukan.
- Jangan menghubungkan preview dengan data produksi. Jangan membuat tombol yang tampak aktif tetapi tidak memiliki perilaku yang jelas.
- Ikuti framework, dependensi, dan konvensi proyek; hindari menambah library hanya untuk efek dekoratif.
- Verifikasi tampilan pada ukuran mobile dan desktop yang tersedia serta jalankan tes atau pemeriksaan UI terkait.

# Keluaran desain

Untuk tiap konsep, dokumentasikan nama, ringkasan, alasan, karakter UI, palet, pendekatan ilustrasi bila relevan, dan motion. Sediakan cara untuk kembali ke gallery dan ringkasan perbandingan. Setelah pemilik memilih konsep, baru ekstrak design tokens sebagai arah produk.