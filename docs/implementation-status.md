# Status Tahapan PRD

Terakhir diperbarui: 2026-10-28

## Checkpoint lanjutan untuk AI berikutnya

Status saat ini: Tahap 2 (`Gallery desain dan autentikasi`) sedang berjalan dan belum selesai. Proyek belum masuk Tahap 3 (`Chat personal dan request`).

Prioritas saat ini:
- Selesaikan arah desain final dari lima preview yang sudah dibuat, lalu pilih satu konsep yang akan diimplementasikan ke aplikasi utama.
- Lengkapi autentikasi nyata ke Supabase: signup/login/logout, callback email, reset password, sesi SSR-safe, dan onboarding profil yang terhubung ke database real.
- Setelah autentikasi dan profil valid, baru masuk ke alur request chat 1-on-1 dan schema percakapan.

Batasan penting:
- Jangan melewati ke chat realtime, grup, media, atau notifikasi sebelum auth dan profil diverifikasi dengan data nyata.
- E2EE masih ditahan dan tidak boleh diklaim aktif.
- Tidak ada klaim production-ready. Status proyek saat ini tetap `prototype / partial implementation`.

Bukti yang sudah valid:
- `npm run test` lulus.
- `npm run lint` lulus.
- `npm run build` lulus.
- Smoke test HTTP 200 untuk halaman `/login`, `/register`, `/forgot-password`, dan `/design-previews`.
- Migrasi `public.profiles` berhasil diuji pada PostgreSQL sementara dengan stub `auth.uid()` dan `auth.users`; aturan RLS, akses pemilik, dan validasi username berjalan sesuai ekspektasi.

Pekerjaan yang masih tertunda:
- Auth end-to-end terhadap Supabase local/cloud yang benar-benar terkonfigurasi.
- Finalisasi dan pemilihan satu konsep visual dari gallery design preview.
- Implementasi real request chat, percakapan personal, dan tahap berikutnya dari PRD.

Karena ini adalah checkpoint lanjutan, AI berikutnya harus memulai dari Tahap 2, bukan langsung ke fitur chat.

| Tahap | Status | Bukti / penghambat |
| --- | --- | --- |
| 0. Discovery dan keputusan arsitektur | Sebagian selesai | Evaluasi referensi, ADR, dan threat model dibuat. Keputusan E2EE, retensi, upload, receipts, dan arah desain tetap terbuka. |
| 1. Fondasi proyek | Sebagian selesai | Next.js App Router/TypeScript, lint, Vitest, tokens dasar, klien Supabase SSR, Cloudinary server-only, Supabase CLI, serta migrasi profil mandiri dengan RLS tersedia. Migrasi diuji pada Postgres sementara; user pemilik dapat membaca profil, user lain ditolak, username invalid ditolak. Auth belum end-to-end; schema pesan/RLS percakapan ditahan sampai keputusan domain tersedia; migrasi belum diterapkan ke Supabase cloud, Cloudinary, dan Vercel belum dikonfigurasi. |
| 2. Gallery desain dan autentikasi | Sebagian selesai | Form email/password, callback verifikasi/reset, onboarding profil, dashboard privat, dan GET smoke test 200 ada. Lima preview belum dibuat; OAuth belum dikonfigurasi; signup/login belum diuji end-to-end supaya tidak membuat akun nyata tanpa persetujuan. |
| 3. Chat personal dan request | Belum dimulai | Menunggu schema, RLS, dan auth. |
| 4. Pesan realtime dan status | Belum dimulai | Menunggu definisi model pesan/receipt dan tes permission. |
| 5. Grup dan interaksi pesan | Belum dimulai | Menunggu membership historis dan keputusan edit/hapus/search. |
| 6. Media dan notifikasi | Belum dimulai | Menunggu kredensial Cloudinary, batas file/retensi, dan otorisasi. |
| 7. E2EE | Ditahan oleh keputusan produk | Pemilik memilih keputusan tetap terbuka; tidak ada klaim E2EE. |
| 8. Hardening dan peluncuran | Belum dimulai | Memerlukan implementasi fitur, audit RLS, konfigurasi lingkungan, dan deployment. |

## Validasi yang sudah dijalankan

- `npm run test`: 2 tes lulus.
- `npm run lint`: lulus setelah folder referensi/skill pihak ketiga dikecualikan.
- `npm run build`: lulus; route `/` dan `/design-previews` terdeteksi.
- `npx supabase db lint --local --fail-on error`: belum berjalan karena database Supabase lokal gagal start (`DbSetupError`). Sebagai pengganti terbatas, migration diterapkan pada PostgreSQL 17 sementara dengan stub `auth.users`/`auth.uid`, dan akses RLS/constraint diuji. Container sementara sudah dihapus.
- Supabase Auth health endpoint dengan URL/publishable key lokal merespons HTTP 200; signup/login belum diuji dan tidak ada akun test dibuat.
- Auth UI smoke test: GET `/login`, `/register`, `/forgot-password`, dan `/design-previews` semuanya HTTP 200.

URL dan publishable key Supabase lokal tersedia; belum ada service-role key, kredensial Cloudinary, atau akses deployment Vercel. Jangan menganggap koneksi end-to-end telah teruji dari health check atau build tersebut.