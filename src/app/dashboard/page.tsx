import { redirect } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = { title: "Percakapan | chatK" };
export const instant = false;

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", authData.user.id)
    .maybeSingle();

  if (!profile && !error) {
    redirect("/profile/setup");
  }

  return (
    <main className="workspace">
      <header className="topbar">
        <span className="brand">chatK</span>
        <form action={logout}>
          <SubmitButton pendingLabel="Keluar...">Keluar</SubmitButton>
        </form>
      </header>
      <section className="page-heading">
        <div>
          <h1>Halo, {profile?.display_name ?? "pengguna"}</h1>
          <p>Ruang percakapan akan muncul di sini setelah tahap chat diaktifkan.</p>
        </div>
      </section>
      <section className="empty-state" aria-labelledby="empty-title">
        <h2 id="empty-title">Belum ada percakapan</h2>
        <p>
          {error
            ? "Tabel profil belum tersedia. Terapkan migrasi Supabase sebelum melanjutkan."
            : "Anda dapat memulai percakapan setelah penemuan pengguna dan permintaan chat tersedia."}
        </p>
      </section>
    </main>
  );
}