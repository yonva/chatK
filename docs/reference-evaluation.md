# Evaluasi Referensi PRD

Ditinjau 28 Oktober 2026. Repositori dikloning di `references/` untuk inspeksi lokal; tidak ada kode, aset, atau identitas visual yang disalin ke aplikasi.

| Referensi | Lisensi | Temuan yang relevan | Batas penggunaan di chatK |
| --- | --- | --- | --- |
| [Impeccable](../references/impeccable/README.md) | Apache-2.0 | Memisahkan fakta produk (`PRODUCT.md`) dari arah visual; menyediakan alur audit dan detector mekanis. | Gunakan sebagai proses review UI. Detector bukan pengganti tes aksesibilitas/performa. Skill Copilot terpasang, tetapi belum ada arah visual final. |
| [Taste Skill](../references/taste-skill/README.md) | MIT | Membedakan page dari app screen; menyarankan beberapa arah yang berbeda, data realistis, pemeriksaan browser dan viewport. | Cocok untuk galeri lima preview PRD, bukan untuk memilih arah final otomatis. Gambar contoh dan sumber foto tidak digunakan; setiap aset kelak perlu pemeriksaan kredit/lisensi sendiri. |
| [Ponytail](../references/ponytail/README.md) | MIT | Mengutamakan kode yang sudah ada, validasi batas kepercayaan, aksesibilitas, dan tes kecil untuk logika berisiko. | Dipakai sebagai panduan implementasi, bukan dependency produk atau alasan memangkas kontrol keamanan. |

## Batas review

README, lisensi, dan panduan pemasangan utama diperiksa. Belum seluruh contoh, aset, dan file dokumentasi setiap repositori diaudit satu per satu; karena itu belum ada konten dari repositori tersebut yang diadopsi ke produk.