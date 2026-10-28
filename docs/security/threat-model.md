# Threat model awal chatK

Status: hipotesis untuk memandu Tahap 1, bukan audit keamanan produksi.

## Aset dan batas kepercayaan

- Aset: sesi auth, profil, permintaan chat, membership, pesan, receipts, media, notifikasi, serta metadata akun.
- Browser pengguna tidak tepercaya. Identitas, timestamp, file, route parameter, dan status UI dari klien harus divalidasi ulang di sisi server/database.
- Next.js server memegang cookie sesi dan rahasia integrasi. Supabase menjadi otoritas auth/database/RLS/realtime. Cloudinary menyimpan media; URL biasa dapat dibagikan dan bukan kontrol akses.
- Kanal Realtime harus mengikuti membership percakapan; data preview tidak boleh memakai tabel atau kredensial produksi.

## Ancaman utama dan kontrol yang disyaratkan

| Ancaman | Kontrol yang harus ada sebelum produksi | Status saat ini |
| --- | --- | --- |
| IDOR atau anggota nonaktif membaca percakapan | RLS untuk setiap tabel, membership aktif pada query/write/channel, tes negatif lintas dua akun dan akun ketiga | Belum ada schema, RLS, atau tes permission |
| Kebocoran key server | Hanya URL/key publik pada browser; service-role dan Cloudinary secret server-only; `.env*` di-ignore; redaksi log | `.env` di-ignore; helper Cloudinary `server-only`; tidak ada route yang memakai service role |
| Pemalsuan pengirim/waktu atau pesan ganda saat retry | Ambil identitas dan timestamp di server; UUID idempotency dengan constraint database; validasi payload | Belum ada API pesan atau schema |
| Refresh/session salah atau pengalihan akses | Cookie SSR; verifikasi klaim/user pada operasi tepercaya; Proxy bukan pengganti otorisasi di route | Klien SSR dan proxy refresh ada; auth flow/route protection belum ada |
| Upload file berbahaya atau upload oleh nonanggota | Auth + membership sebelum signature, allowlist MIME/ukuran/durasi, server signature, validasi metadata | Klien server tersedia; upload/signature belum ada |
| URL media dipakai ulang atau race pada view-once | Asset privat, akses singkat, operasi konsumsi atomik, uji akses ulang dan konkurensi; jangan klaim anti-screenshot | Belum ada media table, endpoint, atau kebijakan retensi |
| Kebocoran Realtime, notifikasi, log atau pencarian | Otorisasi channel, minimisasi metadata, jangan log plaintext, query dibatasi RLS | Belum diimplementasikan |
| E2EE palsu atau manajemen kunci gagal | Protokol terpelihara dan ditinjau, threat model perangkat/grup/recovery, audit independen | E2EE adalah keputusan terbuka; tidak diiklankan |

## Kriteria sebelum melanjutkan fitur domain

- Tulis matriks akses per tabel dan uji akses ditolak untuk user tak terkait.
- Review migrasi sebelum penerapan; jangan membuat migrasi destruktif otomatis.
- Jangan memasukkan nilai rahasia, isi pesan, atau private key ke analytics/log/dokumentasi.
- Pisahkan proyek Supabase development/staging dari production dan tetapkan retensi sebelum mengirim data nyata.

## Belum tercakup

Belum dilakukan penetration test, review konfigurasi Supabase/Cloudinary jarak jauh, atau audit deployment. Dokumen ini tidak menyatakan aplikasi aman untuk produksi.