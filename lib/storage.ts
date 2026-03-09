import { BadgeResult } from "./badge";

const STORAGE_KEY = "fhir-iq-badges";

// In-memory store for server-side (simulates a database)
const badgeStore = new Map<string, BadgeResult>();

export function saveBadgeResult(result: BadgeResult): void {
  if (typeof window !== "undefined") {
    const existing = getBadgeResults();
    existing.push(result);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  }
  badgeStore.set(result.badgeId, result);
}

export function getBadgeResults(): BadgeResult[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getBadgeById(id: string): BadgeResult | null {
  // Check in-memory store first (server-side)
  if (badgeStore.has(id)) {
    return badgeStore.get(id)!;
  }
  // Client-side fallback
  if (typeof window !== "undefined") {
    const results = getBadgeResults();
    return results.find((r) => r.badgeId === id) || null;
  }
  return null;
}

export function getHighestBadge(): BadgeResult | null {
  const results = getBadgeResults();
  if (results.length === 0) return null;

  const tierRank = { gold: 3, silver: 2, bronze: 1 };
  return results.reduce((best, current) =>
    tierRank[current.tier] > tierRank[best.tier] ? current : best
  );
}
