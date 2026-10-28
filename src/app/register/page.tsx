import Link from "next/link";
import { AuthNotice, AuthShell } from "@/components/auth-shell";
import { SubmitButton } from "@/components/submit-button";
import { register } from "@/app/actions/auth";

export const metadata = { title: "Buat akun | chatK" };
export const instant = false;

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string }>;
}) {
  const { error, notice } = await searchParams;

  return (
    <AuthShell>
      <h1>Buat akun chatK</h1>
      <p className="auth-intro">Mulai dengan email dan kata sandi.</p>
      <AuthNotice error={error} notice={notice} />
      <form className="auth-form" action={register}>
        <label className="form-field">
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="form-field">
          Kata sandi
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
          <span className="field-help">Minimal 8 karakter.</span>
        </label>
        <SubmitButton pendingLabel="Membuat akun...">Daftar</SubmitButton>
      </form>
      <p className="auth-footnote">
        Sudah punya akun? <Link href="/login">Masuk</Link>
      </p>
    </AuthShell>
  );
}