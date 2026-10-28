import { describe, expect, it } from "vitest";
import {
  isValidPassword,
  normalizeDisplayName,
  normalizeEmail,
  normalizeUsername,
} from "@/lib/auth/validation";

describe("auth input validation", () => {
  it("normalizes valid emails and rejects malformed values", () => {
    expect(normalizeEmail(" Person@Example.com ")).toBe("person@example.com");
    expect(normalizeEmail("not-an-email")).toBeNull();
  });

  it("requires a password of at least eight characters", () => {
    expect(isValidPassword("short")).toBe(false);
    expect(isValidPassword("long-enough")).toBe(true);
  });

  it("normalizes usernames to the profile constraint", () => {
    expect(normalizeUsername(" Alice_1 ")).toBe("alice_1");
    expect(normalizeUsername("a! ")).toBeNull();
  });

  it("trims display names and enforces the profile limit", () => {
    expect(normalizeDisplayName(" Alice ")).toBe("Alice");
    expect(normalizeDisplayName(" ")).toBeNull();
  });
});