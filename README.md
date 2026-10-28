# chatK

Fondasi aplikasi Next.js berada di root repository. Lihat [PRD](chatK_PRD_unduh.txt) untuk ruang lingkup dan tahapan produk.

Jalankan `npm install` lalu `npm run dev` dari root. Salin `.env.example` ke `.env.local` dan isi kredensial lokal; jangan commit nilai rahasia.

Untuk menjalankan inspeksi tampilan yang memakai browser, pasang Chromium di Codespace dengan `npx --yes playwright install --with-deps chromium`. Instalasi ini hanya berlaku di Codespace tersebut; jalankan lagi di Codespace baru.

Kerangka Supabase SSR dan Cloudinary server-side sudah tersedia. Email/password, callback email, reset sandi, onboarding profil, dan dashboard privat tersedia; koneksi auth end-to-end belum diuji dengan akun. Migrasi awal `profiles` membatasi data ke pemilik akun; lihat `supabase/migrations/`. Untuk menjalankan Supabase lokal, gunakan `npx supabase start`, lalu lint dengan `npx supabase db lint --local --fail-on error`. OAuth, request chat, grup, pesan realtime, upload, galeri lima preview, dan pencarian belum diimplementasikan. E2EE masih keputusan terbuka dan tidak diklaim aktif.