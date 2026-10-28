import { redirect } from "next/navigation";
import { AuthNotice, AuthShell } from "@/components/auth-shell";
import { SubmitButton } from "@/components/submit-button";
import { saveProfile } from "@/app/actions/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = { title: "Lengkapi profil | chatK" };
export const instant = false;

export default async function ProfileSetupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  const { error } = await searchParams;

  return (
    <AuthShell>
      <h1>Lengkapi profil</h1>
      <p className="auth-intro">Pilih username dan nama yang akan terlihat oleh pengguna lain.</p>
      <AuthNotice error={error} />
      <form className="auth-form" action={saveProfile}>
        <label className="form-field">
          Username
          <input
            name="username"
            autoComplete="username"
            minLength={3}
            maxLength={24}
            pattern="[A-Za-z0-9_]{3,24}"
            required
          />
          <span className="field-help">3–24 karakter: huruf, angka, atau garis bawah.</span>
        </label>
        <label className="form-field">
          Nama tampilan
          <input name="display_name" autoComplete="name" maxLength={60} required />
        </label>
        <SubmitButton pendingLabel="Menyimpan profil...">Simpan profil</SubmitButton>
      </form>
    </AuthShell>
  );
}