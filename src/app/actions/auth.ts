"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  isValidPassword,
  normalizeDisplayName,
  normalizeEmail,
  normalizeUsername,
} from "@/lib/auth/validation";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function login(formData: FormData) {
  const email = normalizeEmail(formData.get("email"));
  const password = formData.get("password");

  if (!email || typeof password !== "string" || password.length === 0) {
    redirect("/login?error=invalid_input");
  }

  let result: "ok" | "invalid" | "unavailable" = "unavailable";

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    result = error ? "invalid" : "ok";
  } catch {
    result = "unavailable";
  }

  if (result === "invalid") {
    redirect("/login?error=credentials");
  }
  if (result === "unavailable") {
    redirect("/login?error=unavailable");
  }

  redirect("/dashboard");
}

export async function register(formData: FormData) {
  const email = normalizeEmail(formData.get("email"));
  const password = formData.get("password");

  if (!email || !isValidPassword(password)) {
    redirect("/register?error=invalid_input");
  }

  let result: "created" | "confirmation" | "failed" = "failed";

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback?next=/profile/setup`,
      },
    });

    if (!error) {
      result = data.session ? "created" : "confirmation";
    }
  } catch {
    result = "failed";
  }

  if (result === "created") {
    redirect("/profile/setup");
  }
  if (result === "confirmation") {
    redirect("/register?notice=check_email");
  }

  redirect("/register?error=registration_failed");
}

export async function requestPasswordReset(formData: FormData) {
  const email = normalizeEmail(formData.get("email"));

  if (!email) {
    redirect("/forgot-password?error=invalid_input");
  }

  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/auth/callback?next=/account/password/update`,
    });
  } catch {
    // Keep the response generic so account existence is not disclosed.
  }

  redirect("/forgot-password?notice=check_email");
}

export async function updatePassword(formData: FormData) {
  const password = formData.get("password");
  const confirmation = formData.get("password_confirmation");

  if (!isValidPassword(password) || password !== confirmation) {
    redirect("/account/password/update?error=invalid_input");
  }

  let result: "ok" | "unauthorized" | "failed" = "failed";

  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      result = "unauthorized";
    } else {
      const { error } = await supabase.auth.updateUser({ password });
      result = error ? "failed" : "ok";
    }
  } catch {
    result = "failed";
  }

  if (result === "unauthorized") {
    redirect("/login?error=reset_session");
  }
  if (result === "failed") {
    redirect("/account/password/update?error=update_failed");
  }

  redirect("/login?notice=password_updated");
}

export async function saveProfile(formData: FormData) {
  const username = normalizeUsername(formData.get("username"));
  const displayName = normalizeDisplayName(formData.get("display_name"));

  if (!username || !displayName) {
    redirect("/profile/setup?error=invalid_input");
  }

  let result: "ok" | "unauthorized" | "username_taken" | "failed" = "failed";

  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      result = "unauthorized";
    } else {
      const { error } = await supabase.from("profiles").upsert(
        {
          id: data.user.id,
          username,
          display_name: displayName,
        },
        { onConflict: "id" },
      );

      if (!error) {
        result = "ok";
      } else if (error.code === "23505") {
        result = "username_taken";
      }
    }
  } catch {
    result = "failed";
  }

  if (result === "unauthorized") {
    redirect("/login");
  }
  if (result === "username_taken") {
    redirect("/profile/setup?error=username_taken");
  }
  if (result === "failed") {
    redirect("/profile/setup?error=profile_unavailable");
  }

  redirect("/dashboard");
}

export async function logout() {
  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  } catch {
    // The login route remains the safe destination even if session cleanup fails.
  }

  redirect("/login?notice=signed_out");
}