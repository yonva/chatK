# ADR-0001: Fondasi dan keputusan produk yang masih terbuka

- Status: diterima untuk fondasi; keputusan domain berisiko tinggi tetap terbuka
- Tanggal: 2026-10-28

## Konteks

PRD menetapkan Next.js App Router, TypeScript, Supabase, Cloudinary, Vercel, dan Framer Motion. Skema data dinyatakan draft dan harus menunggu desain E2EE serta review sebelum migrasi. Pemilik telah memilih untuk membiarkan keputusan E2EE MVP terbuka.

## Keputusan fondasi

- Aplikasi Next.js berada di root repository dan menggunakan Server Components secara default.
- Supabase memakai `@supabase/ssr` dengan cookie SSR. URL dan anon/publishable key boleh dipakai di klien; service-role key tetap server-only dan tidak diperlukan oleh scaffold.
- Cloudinary hanya dikonfigurasi melalui modul `server-only`. Belum ada route upload atau signature sampai autentikasi dan otorisasi tersedia.
- Tidak ada migrasi percakapan atau pesan sebelum model plaintext/ciphertext, membership historis, dan matriks RLS disetujui.
- Lima konsep preview harus dibandingkan sebelum visual utama dipilih. Sistem autentikasi/otorisasi dan data preview harus tetap terpisah.
- E2EE, media sekali lihat, retensi, batas upload, dan definisi delivered/read tidak diklaim selesai atau aktif.

## Keputusan yang menunggu pemilik

1. E2EE wajib di MVP atau rilis bertahap; jika diterapkan, protokol, perangkat, recovery, grup, notifikasi, dan pencarian.
2. Batas ukuran/durasi media, masa berlaku view-once, dan retensi pesan, akun, metadata, serta log.
3. Definisi delivered/read receipt, kontrol privasi receipt/last-seen, dan kebijakan edit/hapus.
4. Riwayat yang terlihat untuk anggota grup baru dan mantan anggota.
5. OAuth provider/callback, kebijakan verifikasi email, dan konfigurasi deployment Vercel.

## Konsekuensi

Fondasi dapat diuji tanpa secret produksi. Migrasi domain, view-once, pencarian pesan, dan klaim E2EE menunggu keputusan serta pengujian negatif keamanan. Cloudinary/Vercel end-to-end memerlukan kredensial atau akses proyek yang belum tersedia.