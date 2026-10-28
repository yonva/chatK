export function normalizeEmail(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const email = value.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

export function isValidPassword(value: FormDataEntryValue | null): value is string {
  return typeof value === "string" && value.length >= 8;
}

export function normalizeUsername(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const username = value.trim().toLowerCase();
  return /^[a-z0-9_]{3,24}$/.test(username) ? username : null;
}

export function normalizeDisplayName(
  value: FormDataEntryValue | null,
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const displayName = value.trim();
  return displayName.length >= 1 && displayName.length <= 60
    ? displayName
    : null;
}