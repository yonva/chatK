"use client";

import { createBrowserClient } from "@supabase/ssr";
import { requirePublicSupabaseConfig } from "@/lib/env";

export function createSupabaseBrowserClient() {
  const { url, key } = requirePublicSupabaseConfig();
  return createBrowserClient(url, key);
}