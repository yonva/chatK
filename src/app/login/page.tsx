import Link from "next/link";
import { AuthNotice, AuthShell } from "@/components/auth-shell";
import { SubmitButton } from "@/components/submit-button";
import { login } from "@/app/actions/auth";

export const metadata = { title: "Masuk | chatK" };
export const instant = false;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string }>;
}) {
  const { error, notice } = await searchParams;

  return (
    <AuthShell>
      <h1>Masuk ke chatK</h1>
      <p className="auth-intro">Lanjutkan ke percakapan Anda.</p>
      <AuthNotice error={error} notice={notice} />
      <form className="auth-form" action={login}>
        <label className="form-field">
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="form-field">
          Kata sandi
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </label>
        <SubmitButton pendingLabel="Memeriksa...">Masuk</SubmitButton>
      </form>
      <div className="auth-links">
        <Link href="/forgot-password">Lupa kata sandi?</Link>
        <Link href="/register">Buat akun</Link>
      </div>
    </AuthShell>
  );
}