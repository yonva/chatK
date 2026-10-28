import Link from "next/link";
import { AuthNotice, AuthShell } from "@/components/auth-shell";
import { SubmitButton } from "@/components/submit-button";
import { requestPasswordReset } from "@/app/actions/auth";

export const metadata = { title: "Reset kata sandi | chatK" };
export const instant = false;

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string }>;
}) {
  const { error, notice } = await searchParams;

  return (
    <AuthShell>
      <h1>Reset kata sandi</h1>
      <p className="auth-intro">Kami akan mengirim tautan reset jika akun tersedia.</p>
      <AuthNotice error={error} notice={notice} />
      <form className="auth-form" action={requestPasswordReset}>
        <label className="form-field">
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <SubmitButton pendingLabel="Mengirim...">Kirim tautan</SubmitButton>
      </form>
      <p className="auth-footnote">
        <Link href="/login">Kembali ke masuk</Link>
      </p>
    </AuthShell>
  );
}