export type PublicSupabaseConfig = {
  url: string;
  key: string;
};

type SupabaseEnvironment = {
  url?: string;
  anonKey?: string;
  publishableKey?: string;
};

export function readPublicSupabaseConfig(
  environment: SupabaseEnvironment,
): PublicSupabaseConfig | null {
  const url = environment.url?.trim();
  const key = environment.publishableKey?.trim() || environment.anonKey?.trim();

  return url && key ? { url, key } : null;
}

export function getPublicSupabaseConfig(): PublicSupabaseConfig | null {
  return readPublicSupabaseConfig({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  });
}

export function requirePublicSupabaseConfig(): PublicSupabaseConfig {
  const config = getPublicSupabaseConfig();

  if (!config) {
    throw new Error(
      "Set NEXT_PUBLIC_SUPABASE_URL and a Supabase anon or publishable key.",
    );
  }

  return config;
}