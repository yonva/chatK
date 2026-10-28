import { describe, expect, it } from "vitest";
import { readPublicSupabaseConfig } from "@/lib/env";

describe("readPublicSupabaseConfig", () => {
  it("returns null until both public values are configured", () => {
    expect(readPublicSupabaseConfig({ url: "https://example.supabase.co" })).toBe(
      null,
    );
  });

  it("prefers a publishable key and trims values", () => {
    expect(
      readPublicSupabaseConfig({
        url: " https://example.supabase.co ",
        anonKey: "legacy-key",
        publishableKey: " publishable-key ",
      }),
    ).toEqual({ url: "https://example.supabase.co", key: "publishable-key" });
  });
});