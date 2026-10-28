"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState, type FormEvent } from "react";

const concepts = [
  {
    id: "teras",
    name: "Teras",
    line: "Percakapan dimulai dari ruang bersama.",
    reason: "Home personal dengan sapaan ringkas dan transisi alami ke inbox.",
    composition: "Sapaan, daftar percakapan, lalu ruang chat tiga kolom.",
    palette: "Hijau pinus, putih kabut, dan arang lembut.",
    motion: "Perpindahan antar ruang memakai transisi tata letak pendek.",
  },
  {
    id: "ledger",
    name: "Ledger",
    line: "Setiap status pesan mudah dipindai.",
    reason: "Susunan padat, garis tipis, dan hierarki berbasis teks untuk sesi kerja panjang.",
    composition: "Inbox terstruktur dengan thread menjadi area kerja utama.",
    palette: "Putih, tinta netral, dan biru sebagai penanda status.",
    motion: "Perubahan state seperlunya; tidak ada animasi dekoratif.",
  },
  {
    id: "commons",
    name: "Commons",
    line: "Komunitas terlihat sebelum satu pesan dibuka.",
    reason: "Permintaan dan grup mendapat ruang setara dengan percakapan personal.",
    composition: "Navigasi komunitas, daftar orang, dan konteks anggota di sisi thread.",
    palette: "Koral, merah muda pucat, dan arang.",
    motion: "Pergeseran fokus ringan saat berpindah inbox dan permintaan.",
  },
  {
    id: "afterhours",
    name: "Afterhours",
    line: "Ruang chat mengambil alih layar.",
    reason: "Tema gelap datar meminimalkan chrome untuk percakapan malam atau layar OLED.",
    composition: "Thread menjadi bidang utama; daftar dan konteks tetap satu langkah.",
    palette: "Hitam, abu terang, dan mint hanya untuk status.",
    motion: "Transisi antar percakapan singkat dan dapat dikurangi.",
  },
  {
    id: "mosaic",
    name: "Mosaic",
    line: "Percakapan disusun seperti potongan yang saling terhubung.",
    reason: "Kelompok pesan, reply, dan status dibedakan oleh bentuk serta posisi, bukan warna saja.",
    composition: "Inbox bertingkat dengan thread dan ringkasan konteks yang asimetris.",
    palette: "Kobalt cerah, kuning terang, dan putih bersih.",
    motion: "Balasan baru masuk pada posisi thread dengan feedback yang jelas.",
  },
];

const conversations = [
  { id: "nara", name: "Nara", initials: "NA", detail: "online", last: "Masukan sebelum rapat?", time: "10.42", tone: "fern" },
  { id: "team", name: "Ruang Produk", initials: "RP", detail: "8 anggota", last: "Rafi: catatan sudah diunggah", time: "10.18", tone: "blue" },
  { id: "bima", name: "Bima", initials: "BI", detail: "aktif 12 menit lalu", last: "Terima kasih!", time: "09.56", tone: "coral" },
  { id: "sore", name: "Klub Baca Sore", initials: "KS", detail: "5 anggota", last: "Jadwal minggu depan", time: "Kemarin", tone: "gold" },
];

type Message = { id: number; sender: "them" | "me"; text: string; time: string; status?: string };

const initialMessages: Message[] = [
  { id: 1, sender: "them", text: "Aku sudah kirim catatannya. Ada bagian yang ingin dibahas?", time: "10.36" },
  { id: 2, sender: "me", text: "Bagian alur onboarding. Aku tandai dua hal yang perlu kita pastikan.", time: "10.39", status: "Dibaca" },
  { id: 3, sender: "them", text: "Sip. Kita bahas sebelum rapat mulai.", time: "10.41" },
];

type View = "chats" | "requests" | "notifications";

export function PreviewGallery() {
  const [selectedId, setSelectedId] = useState(concepts[0].id);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [activeView, setActiveView] = useState<View>("chats");
  const [activeConversation, setActiveConversation] = useState(conversations[0].id);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [requestState, setRequestState] = useState<"pending" | "accepted" | "declined">("pending");
  const [noticeRead, setNoticeRead] = useState(false);
  const [showContext, setShowContext] = useState(true);
  const reduceMotion = useReducedMotion();
  const concept = concepts.find((item) => item.id === selectedId) ?? concepts[0];
  const selectedConversation = conversations.find((item) => item.id === activeConversation) ?? conversations[0];
  const visibleConversations = conversations.filter((item) =>
    item.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const mobileListOnly = viewport === "mobile" && activeView === "chats" && !activeConversation;

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();

    if (!text) {
      return;
    }

    setMessages((current) => [
      ...current,
      { id: Date.now(), sender: "me", text, time: "Sekarang", status: "Terkirim · demo lokal" },
    ]);
    setDraft("");
  }

  return (
    <main className="gallery-page">
      <header className="topbar gallery-topbar">
        <Link className="brand" href="/" aria-label="chatK, beranda">chatK</Link>
        <nav aria-label="Navigasi utama">
          <Link href="/login">Masuk</Link>
          <Link href="/register">Daftar</Link>
        </nav>
      </header>

      <section className="gallery-heading" aria-labelledby="gallery-title">
        <div>
          <h1 id="gallery-title">Lima arah untuk chatK</h1>
          <p>Bandingkan cara yang berbeda untuk melanjutkan percakapan.</p>
        </div>
        <span className="demo-label">Semua isi preview adalah data demo</span>
      </section>

      <section className="concept-picker" aria-label="Pilih konsep desain">
        {concepts.map((item, index) => (
          <button
            aria-pressed={selectedId === item.id}
            className={`concept-option ${selectedId === item.id ? "is-selected" : ""}`}
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            type="button"
          >
            <span className="concept-index">0{index + 1}</span>
            <span className="concept-option-name">{item.name}</span>
            <span className="concept-option-line">{item.line}</span>
          </button>
        ))}
      </section>

      <section className="concept-notes" aria-label={`Ringkasan konsep ${concept.name}`}>
        <div><h2>{concept.name}</h2><p>{concept.reason}</p></div>
        <dl>
          <div><dt>Komposisi</dt><dd>{concept.composition}</dd></div>
          <div><dt>Palet</dt><dd>{concept.palette}</dd></div>
          <div><dt>Gerak</dt><dd>{concept.motion}</dd></div>
        </dl>
      </section>

      <div className="preview-toolbar">
        <div aria-label="Ukuran preview" className="segmented-control" role="group">
          <button aria-pressed={viewport === "desktop"} onClick={() => setViewport("desktop")} type="button">Desktop</button>
          <button aria-pressed={viewport === "mobile"} onClick={() => setViewport("mobile")} type="button">Mobile</button>
        </div>
        <div aria-label="Tema preview" className="segmented-control" role="group">
          <button aria-pressed={theme === "light"} onClick={() => setTheme("light")} type="button">Terang</button>
          <button aria-pressed={theme === "dark"} onClick={() => setTheme("dark")} type="button">Gelap</button>
        </div>
      </div>

      <motion.section
        animate={{ opacity: 1 }}
        className={`preview-device ${viewport === "mobile" ? "is-mobile" : ""} ${mobileListOnly ? "mobile-list-only" : ""}`}
        data-concept={selectedId}
        data-theme={theme}
        initial={false}
        key={selectedId}
        layout
        transition={{ duration: reduceMotion ? 0 : 0.18 }}
      >
        <div className="concept-app-header">
          <span className="concept-mark">chatK</span>
          <span className="concept-scope">Ruang pribadi</span>
          <span className="concept-demo">DEMO</span>
          <button className="concept-user" type="button" aria-label="Profil demo">AK</button>
        </div>

        <div className="concept-layout">
          <aside className="concept-sidebar" aria-label="Navigasi preview">
            <p className="sidebar-title">chatK</p>
            <button aria-pressed={activeView === "chats"} className="nav-choice" onClick={() => setActiveView("chats")} type="button">Percakapan</button>
            <button aria-pressed={activeView === "requests"} className="nav-choice" onClick={() => setActiveView("requests")} type="button">Permintaan <span>1</span></button>
            <button aria-pressed={activeView === "notifications"} className="nav-choice" onClick={() => { setActiveView("notifications"); setNoticeRead(true); }} type="button">Notifikasi {!noticeRead && <span>1</span>}</button>
            <div className="sidebar-bottom">
              <span className="avatar avatar-fern">AK</span>
              <span><strong>Akun demo</strong><small>Data lokal</small></span>
            </div>
          </aside>

          <section className="conversation-list" aria-label="Daftar percakapan">
            <div className="list-heading">
              <div><p className="eyebrow-text">RUANG PRIBADI</p><h2>Pesan</h2></div>
              <button className="text-action" onClick={() => { setActiveView("chats"); setActiveConversation(""); }} type="button">Kosongkan</button>
            </div>
            <label className="search-field">
              <span className="visually-hidden">Cari percakapan</span>
              <input onChange={(event) => setQuery(event.target.value)} placeholder="Cari orang atau grup" value={query} />
            </label>
            <div className="conversation-items">
              {visibleConversations.map((item) => (
                <button
                  aria-current={activeConversation === item.id ? "true" : undefined}
                  className="conversation-row"
                  key={item.id}
                  onClick={() => { setActiveConversation(item.id); setActiveView("chats"); }}
                  type="button"
                >
                  <span className={`avatar avatar-${item.tone}`}>{item.initials}</span>
                  <span className="conversation-copy"><strong>{item.name}</strong><span>{item.last}</span></span>
                  <span className="conversation-meta"><time>{item.time}</time>{item.detail === "online" && <i aria-label="Online" />}</span>
                </button>
              ))}
              {visibleConversations.length === 0 && <p className="list-empty">Tidak ada hasil untuk “{query}”.</p>}
            </div>
          </section>

          <section className="thread-panel" aria-label="Ruang percakapan demo">
            {activeView === "requests" ? (
              <div className="state-panel">
                <p className="eyebrow-text">PERMINTAAN MASUK</p>
                <h2>{requestState === "pending" ? "Alya ingin memulai chat" : requestState === "accepted" ? "Permintaan diterima" : "Permintaan ditolak"}</h2>
                <p>{requestState === "pending" ? "Terima hanya jika Anda mengenali orang ini. Percakapan belum terbuka sebelum disetujui." : "Status ini hanya berubah di preview demo."}</p>
                {requestState === "pending" && <div className="request-actions"><button onClick={() => setRequestState("accepted")} type="button">Terima</button><button onClick={() => setRequestState("declined")} type="button">Tolak</button></div>}
              </div>
            ) : activeView === "notifications" ? (
              <div className="state-panel">
                <p className="eyebrow-text">NOTIFIKASI DEMO</p>
                <h2>{noticeRead ? "Semua sudah diperiksa" : "Ada pembaruan"}</h2>
                <p>Permintaan chat dari Alya menunggu keputusan Anda.</p>
                <button className="text-action" onClick={() => setActiveView("requests")} type="button">Buka permintaan</button>
              </div>
            ) : activeConversation ? (
              <>
                <header className="thread-header">
                  <button className="mobile-back" onClick={() => setActiveConversation("")} type="button">Daftar</button>
                  <span className={`avatar avatar-${selectedConversation.tone}`}>{selectedConversation.initials}</span>
                  <span><strong>{selectedConversation.name}</strong><small>{selectedConversation.detail}</small></span>
                  <button className="text-action thread-details" onClick={() => setShowContext((value) => !value)} type="button">{showContext ? "Sembunyikan info" : "Tampilkan info"}</button>
                </header>
                <div className="thread-date">Hari ini</div>
                <div aria-live="polite" className="message-list">
                  {messages.map((message) => (
                    <article className={`message message-${message.sender}`} key={message.id}>
                      <p>{message.text}</p>
                      <span>{message.time}{message.status && ` · ${message.status}`}</span>
                    </article>
                  ))}
                </div>
                <form className="composer" onSubmit={sendMessage}>
                  <label className="visually-hidden" htmlFor="demo-message">Tulis pesan demo</label>
                  <input id="demo-message" onChange={(event) => setDraft(event.target.value)} placeholder="Tulis pesan..." value={draft} />
                  <button disabled={!draft.trim()} type="submit">Kirim</button>
                </form>
                <p className="demo-disclaimer">Pesan baru hanya tersimpan di state preview ini.</p>
              </>
            ) : (
              <div className="state-panel empty-thread">
                <p className="eyebrow-text">KOTAK MASUK</p>
                <h2>Ruang untuk percakapan baru</h2>
                <p>Pilih percakapan dari daftar atau tanggapi permintaan chat yang masuk.</p>
                <button className="text-action" onClick={() => setActiveView("requests")} type="button">Lihat permintaan</button>
              </div>
            )}
          </section>

          {showContext && <aside className="thread-context" aria-label="Konteks percakapan">
            <p className="eyebrow-text">TENTANG</p>
            <h2>{activeConversation ? selectedConversation.name : "Percakapan"}</h2>
            <p>{activeConversation ? selectedConversation.detail : "Belum dipilih"}</p>
            <div className="context-divider" />
            <p className="eyebrow-text">STATUS PESAN</p>
            <p>Terkirim, diterima, dan dibaca adalah status yang berbeda.</p>
            <div className="context-divider" />
            <p className="eyebrow-text">ANGGOTA</p>
            <div className="member-stack"><span className="avatar avatar-fern">AK</span><span className={`avatar avatar-${selectedConversation.tone}`}>{selectedConversation.initials}</span></div>
            <small>Data anggota dibuat untuk preview.</small>
          </aside>}
        </div>
      </motion.section>

      <section className="comparison" aria-labelledby="comparison-title">
        <h2 id="comparison-title">Perbandingan konsep</h2>
        <div className="comparison-scroll">
          <table>
            <thead><tr><th>Konsep</th><th>Keterbacaan</th><th>Aksesibilitas</th><th>Mobile</th><th>Keunikan</th><th>Performa</th><th>Kesesuaian chat</th><th>Effort</th></tr></thead>
            <tbody>
              {concepts.map((item) => <tr key={item.id}><th scope="row">{item.name}</th><td>Tinggi</td><td>Kontras & keyboard</td><td>Adaptif</td><td>{item.composition.split(" ").slice(0, 3).join(" ")}</td><td>Ringan</td><td>Tinggi</td><td>Rendah–sedang</td></tr>)}
            </tbody>
          </table>
        </div>
        <p>Perbandingan ini adalah evaluasi desain awal, bukan hasil uji pengguna atau benchmark performa.</p>
      </section>
      <footer className="gallery-footer">Belum ada konsep yang dipilih sebagai desain utama.</footer>
    </main>
  );
}