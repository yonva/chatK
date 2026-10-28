import { redirect } from "next/navigation";
import { AuthNotice, AuthShell } from "@/components/auth-shell";
import { SubmitButton } from "@/components/submit-button";
import { updatePassword } from "@/app/actions/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = { title: "Perbarui kata sandi | chatK" };
export const instant = false;

export default async function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login?error=reset_session");
  }

  const { error } = await searchParams;

  return (
    <AuthShell>
      <h1>Perbarui kata sandi</h1>
      <p className="auth-intro">Pilih kata sandi baru untuk akun Anda.</p>
      <AuthNotice error={error} />
      <form className="auth-form" action={updatePassword}>
        <label className="form-field">
          Kata sandi baru
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </label>
        <label className="form-field">
          Ulangi kata sandi
          <input
            name="password_confirmation"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </label>
        <SubmitButton pendingLabel="Menyimpan...">Simpan kata sandi</SubmitButton>
      </form>
    </AuthShell>
  );
}