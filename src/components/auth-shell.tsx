import Link from "next/link";
import type { ReactNode } from "react";

const errorMessages: Record<string, string> = {
  auth_callback: "Tautan verifikasi tidak valid atau sudah kedaluwarsa.",
  credentials: "Email atau kata sandi tidak cocok.",
  invalid_input: "Periksa kembali format email dan kata sandi.",
  profile_unavailable: "Profil belum tersimpan. Pastikan migrasi profiles sudah diterapkan.",
  registration_failed: "Akun belum dapat dibuat. Coba lagi beberapa saat.",
  reset_session: "Sesi reset tidak ditemukan. Minta tautan reset baru.",
  unavailable: "Layanan autentikasi belum tersedia. Periksa konfigurasi Supabase.",
  update_failed: "Kata sandi belum dapat diperbarui. Minta tautan reset baru.",
  username_taken: "Username sudah digunakan. Pilih username lain.",
};

const noticeMessages: Record<string, string> = {
  check_email: "Jika alamat tersebut terdaftar, instruksi akan dikirim melalui email.",
  password_updated: "Kata sandi berhasil diperbarui. Silakan masuk.",
  signed_out: "Anda sudah keluar dari akun.",
};

export function AuthNotice({
  error,
  notice,
}: {
  error?: string;
  notice?: string;
}) {
  const errorMessage = error ? errorMessages[error] : undefined;
  const noticeMessage = notice ? noticeMessages[notice] : undefined;

  if (errorMessage) {
    return <p className="form-notice form-notice-error" role="alert">{errorMessage}</p>;
  }
  if (noticeMessage) {
    return <p className="form-notice" role="status">{noticeMessage}</p>;
  }

  return null;
}

export function AuthShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="auth-page">
      <header className="topbar auth-topbar">
        <Link className="brand" href="/" aria-label="chatK, beranda">
          chatK
        </Link>
        <Link href="/design-previews">Preview desain</Link>
      </header>
      <section className="auth-content">{children}</section>
    </main>
  );
}