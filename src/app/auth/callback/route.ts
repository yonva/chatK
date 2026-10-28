import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const allowedDestinations = new Set([
  "/dashboard",
  "/profile/setup",
  "/account/password/update",
]);

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const requestedDestination = request.nextUrl.searchParams.get("next");
  const destination = allowedDestinations.has(requestedDestination ?? "")
    ? requestedDestination!
    : "/dashboard";

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=auth_callback", request.url));
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(destination, request.url));
    }
  } catch {
    // Do not expose provider or database errors in the browser URL.
  }

  return NextResponse.redirect(new URL("/login?error=auth_callback", request.url));
}