import Link from "next/link";

export default function Home() {
  return (
    <main className="workspace">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="chatK, beranda">
          chatK
        </Link>
        <nav aria-label="Navigasi utama">
          <Link href="/login">Masuk</Link>
          <Link href="/register">Daftar</Link>
          <Link href="/design-previews">Preview desain</Link>
        </nav>
      </header>

      <section className="page-heading" aria-labelledby="page-title">
        <div>
          <h1 id="page-title">Kerangka chatK</h1>
          <p>
            Fondasi untuk percakapan personal dan grup yang responsif, dengan
            akses yang dibatasi sesuai keanggotaan.
          </p>
        </div>
        <span className="status-label">Tahap fondasi</span>
      </section>

      <section className="foundation" aria-labelledby="foundation-title">
        <h2 id="foundation-title">Status integrasi</h2>
        <dl className="status-list">
          <div>
            <dt>Supabase Auth dan RLS</dt>
            <dd>Klien SSR siap; autentikasi dan kebijakan belum dihubungkan.</dd>
          </div>
          <div>
            <dt>Realtime dan pesan</dt>
            <dd>Belum diimplementasikan.</dd>
          </div>
          <div>
            <dt>Media Cloudinary</dt>
            <dd>Klien server tersedia; upload bertanda tangan belum diaktifkan.</dd>
          </div>
          <div>
            <dt>Enkripsi end-to-end</dt>
            <dd>Keputusan produk masih terbuka; tidak diklaim aktif.</dd>
          </div>
        </dl>
      </section>

      <section className="empty-state" aria-labelledby="empty-title">
        <h2 id="empty-title">Belum ada percakapan</h2>
        <p>
          Data akun dan pesan belum tersambung. Preview desain menjadi tahap
          berikutnya sebelum arah visual aplikasi dipilih.
        </p>
        <Link className="text-link" href="/design-previews">
          Lihat status preview desain
        </Link>
      </section>
    </main>
  );
}
