export type BadgeTier = "bronze" | "silver" | "gold";

export interface BadgeResult {
  tier: BadgeTier;
  score: number;
  totalQuestions: number;
  percentage: number;
  name: string;
  date: string;
  badgeId: string;
}

export function calculateBadgeTier(
  score: number,
  total: number
): BadgeTier | null {
  const pct = (score / total) * 100;
  if (pct >= 90) return "gold";
  if (pct >= 70) return "silver";
  if (pct >= 50) return "bronze";
  return null;
}

export function generateBadgeId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "FHIR-";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export const badgeConfig = {
  gold: {
    label: "Gold",
    title: "FHIR Expert",
    subtitle: "Mastery Level",
    threshold: "90%+",
    gradient: "from-yellow-400 via-amber-400 to-yellow-600",
    glowColor: "rgba(255, 215, 0, 0.4)",
    borderColor: "border-yellow-400",
    textColor: "text-yellow-400",
    bgAccent: "bg-yellow-400/10",
    emoji: "🏆",
    description: "You've demonstrated expert-level FHIR knowledge. You're ready to lead interoperability initiatives!",
  },
  silver: {
    label: "Silver",
    title: "FHIR Practitioner",
    subtitle: "Advanced Level",
    threshold: "70-89%",
    gradient: "from-gray-300 via-slate-300 to-gray-400",
    glowColor: "rgba(192, 192, 192, 0.4)",
    borderColor: "border-gray-300",
    textColor: "text-gray-300",
    bgAccent: "bg-gray-300/10",
    emoji: "🥈",
    description: "Strong FHIR knowledge! You're well-equipped to contribute to interoperability projects.",
  },
  bronze: {
    label: "Bronze",
    title: "FHIR Explorer",
    subtitle: "Foundation Level",
    threshold: "50-69%",
    gradient: "from-orange-400 via-amber-600 to-orange-700",
    glowColor: "rgba(205, 127, 50, 0.4)",
    borderColor: "border-orange-400",
    textColor: "text-orange-400",
    bgAccent: "bg-orange-400/10",
    emoji: "🥉",
    description: "Great start on your FHIR journey! Keep learning to level up your interoperability skills.",
  },
};

export function getBadgeUrl(result: BadgeResult, baseUrl: string): string {
  const params = new URLSearchParams({
    t: result.tier,
    n: result.name,
    s: String(result.score),
    q: String(result.totalQuestions),
  });
  return `${baseUrl}/badge/${result.badgeId}?${params.toString()}`;
}

export function getShareText(result: BadgeResult): string {
  const config = badgeConfig[result.tier];
  return `🔥 I just earned a ${config.emoji} ${config.label} FHIR IQ Badge at HIMSS 2026! Scored ${result.percentage}% — ${config.title} level!\n\nTest your FHIR knowledge too 👉`;
}

export function getLinkedInShareUrl(result: BadgeResult, baseUrl: string): string {
  const url = getBadgeUrl(result, baseUrl);
  const config = badgeConfig[result.tier];
  const title = `${config.emoji} ${config.label} FHIR IQ Badge — ${config.title}`;
  const summary = `I scored ${result.percentage}% on the FHIR IQ Challenge at HIMSS 2026! ${config.description}`;
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`;
}
