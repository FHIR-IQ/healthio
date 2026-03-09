export interface HTI6Policy {
  id: string;
  title: string;
  description: string;
  pillarId: string;
  impact: string; // short label like "High Impact" etc
}

export interface HTI6Pillar {
  id: string;
  title: string;
  emoji: string;
  color: string; // tailwind gradient classes
  bgColor: string;
  borderColor: string;
  description: string;
  policies: HTI6Policy[];
}

export interface HTI6Blueprint {
  id: string;
  name: string;
  date: string;
  allocations: Record<string, number>; // pillarId -> points
  selectedPolicies: string[]; // policy IDs
  topPillar: string; // pillarId with highest allocation
}

export interface LeaderboardEntry {
  pillarId: string;
  totalPoints: number;
  voteCount: number;
  averagePoints: number;
  topPolicies: { policyId: string; count: number }[];
}

export const HTI6_PILLARS: HTI6Pillar[] = [
  {
    id: "patient-empowerment",
    title: "Patient Empowerment",
    emoji: "🧑‍⚕️",
    color: "from-emerald-400 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    description:
      "Give patients real control over their health data — transparent access, granular consent, and patient-facing FHIR APIs that work everywhere.",
    policies: [
      {
        id: "pe-1",
        title: "Universal Patient FHIR API",
        description:
          "Mandate every certified EHR expose a full patient-facing FHIR R4/R5 API — not just USCDI, but all computable data.",
        pillarId: "patient-empowerment",
        impact: "Foundational",
      },
      {
        id: "pe-2",
        title: "Granular Consent Standards",
        description:
          "Require FHIR Consent resources with fine-grained data sharing controls patients can manage from any app.",
        pillarId: "patient-empowerment",
        impact: "High Impact",
      },
      {
        id: "pe-3",
        title: "Real-Time Health Notifications",
        description:
          "Mandate FHIR Subscriptions so patients get instant alerts for new lab results, medication changes, and referrals.",
        pillarId: "patient-empowerment",
        impact: "Patient-First",
      },
      {
        id: "pe-4",
        title: "Patient-Contributed Data Standard",
        description:
          "Create an IG for patient-reported outcomes (PROs), wearable data, and social determinants patients want to share.",
        pillarId: "patient-empowerment",
        impact: "Innovative",
      },
    ],
  },
  {
    id: "ai-clinical",
    title: "AI & Clinical Decision Support",
    emoji: "🤖",
    color: "from-violet-400 to-purple-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    description:
      "Bring AI safely into clinical workflows with standardized CDS Hooks, model transparency requirements, and FHIR-native ML pipelines.",
    policies: [
      {
        id: "ai-1",
        title: "CDS Hooks v2 Mandate",
        description:
          "Require all certified systems to support CDS Hooks v2 with standardized AI/ML service integration points.",
        pillarId: "ai-clinical",
        impact: "Foundational",
      },
      {
        id: "ai-2",
        title: "AI Model Transparency Cards",
        description:
          "Mandate a FHIR-based 'AI Model Card' resource for every clinical AI — training data, bias metrics, and performance benchmarks.",
        pillarId: "ai-clinical",
        impact: "Safety-Critical",
      },
      {
        id: "ai-3",
        title: "Ambient AI Documentation Standard",
        description:
          "Standardize how ambient listening AI creates FHIR DocumentReference and clinical notes with provenance tracking.",
        pillarId: "ai-clinical",
        impact: "High Impact",
      },
      {
        id: "ai-4",
        title: "FHIR-Native ML Pipelines",
        description:
          "Define a standard for bulk FHIR export → ML training → inference result writeback, enabling population health AI.",
        pillarId: "ai-clinical",
        impact: "Future-Forward",
      },
    ],
  },
  {
    id: "interoperability",
    title: "Data Interoperability",
    emoji: "🔗",
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    description:
      "Make FHIR the universal language — complete USCDI coverage, payer-provider exchange, and cross-border data flows that actually work.",
    policies: [
      {
        id: "io-1",
        title: "USCDI v5 Full Coverage",
        description:
          "Expand USCDI to cover 95%+ of clinical data classes with mandatory FHIR resource mappings for each element.",
        pillarId: "interoperability",
        impact: "Foundational",
      },
      {
        id: "io-2",
        title: "FHIR-First Payer Exchange",
        description:
          "Sunset X12 for clinical data. Require Prior Auth, Claims, and Eligibility via Da Vinci FHIR IGs by 2028.",
        pillarId: "interoperability",
        impact: "Transformative",
      },
      {
        id: "io-3",
        title: "National FHIR Directory",
        description:
          "Create a federated national endpoint directory so any FHIR client can discover and connect to any provider or payer.",
        pillarId: "interoperability",
        impact: "Infrastructure",
      },
      {
        id: "io-4",
        title: "Cross-Border FHIR Framework",
        description:
          "Align with International Patient Summary (IPS) and establish FHIR-based data exchange treaties with allied nations.",
        pillarId: "interoperability",
        impact: "Global",
      },
    ],
  },
  {
    id: "data-quality",
    title: "Data Quality & Standards",
    emoji: "✅",
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    description:
      "Clean data saves lives. Enforce terminology standards, validation, and provenance so the data flowing through FHIR is actually trustworthy.",
    policies: [
      {
        id: "dq-1",
        title: "Mandatory Terminology Binding",
        description:
          "Require all FHIR resources use SNOMED CT, LOINC, and RxNorm with validated CodeableConcept bindings — no free-text escapes.",
        pillarId: "data-quality",
        impact: "Foundational",
      },
      {
        id: "dq-2",
        title: "Real-Time FHIR Validation",
        description:
          "Mandate server-side FHIR profile validation on write. Reject non-conformant resources before they pollute the data lake.",
        pillarId: "data-quality",
        impact: "High Impact",
      },
      {
        id: "dq-3",
        title: "Provenance-by-Default",
        description:
          "Auto-generate FHIR Provenance resources for every create/update, tracking who, when, why, and from what source.",
        pillarId: "data-quality",
        impact: "Trust-Building",
      },
      {
        id: "dq-4",
        title: "Data Quality Scoring API",
        description:
          "Define a standard FHIR operation ($data-quality-score) that returns completeness, accuracy, and timeliness metrics.",
        pillarId: "data-quality",
        impact: "Innovative",
      },
    ],
  },
  {
    id: "burden-reduction",
    title: "Burden Reduction",
    emoji: "⚡",
    color: "from-rose-400 to-pink-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    description:
      "Cut the administrative bloat. Automate prior auth, simplify reporting, and give clinicians time back with smart FHIR workflows.",
    policies: [
      {
        id: "br-1",
        title: "Automated Prior Auth via FHIR",
        description:
          "Mandate real-time prior auth decisions via Da Vinci CRD/DTR/PAS — max 24hr response for urgent, instant for standard.",
        pillarId: "burden-reduction",
        impact: "Transformative",
      },
      {
        id: "br-2",
        title: "FHIR-Based Quality Reporting",
        description:
          "Replace manual chart abstraction with automated FHIR-based eCQM extraction. One data flow, all quality programs.",
        pillarId: "burden-reduction",
        impact: "High Impact",
      },
      {
        id: "br-3",
        title: "Smart Prior Auth Learning",
        description:
          "Require payers to publish gold-carding rules as computable FHIR PlanDefinitions — auto-approve known-good patterns.",
        pillarId: "burden-reduction",
        impact: "Innovative",
      },
      {
        id: "br-4",
        title: "Unified Credentialing Standard",
        description:
          "Create a FHIR-based provider credentialing IG that eliminates redundant paperwork across payers and facilities.",
        pillarId: "burden-reduction",
        impact: "Administrative",
      },
    ],
  },
];

export const TOTAL_POINTS = 100;
export const MIN_POLICIES_PER_PILLAR = 1;
export const MAX_POLICIES_TOTAL = 8;

// Generate a unique blueprint ID
export function generateBlueprintId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "HTI6-";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

// Storage keys
const BLUEPRINT_STORAGE_KEY = "hti6-blueprints";
const LEADERBOARD_STORAGE_KEY = "hti6-leaderboard";

// In-memory aggregate for leaderboard
const leaderboardStore: {
  totalSubmissions: number;
  pillarTotals: Record<string, number>;
  policyVotes: Record<string, number>;
} = {
  totalSubmissions: 0,
  pillarTotals: {},
  policyVotes: {},
};

export function saveBlueprint(blueprint: HTI6Blueprint): void {
  // Save to localStorage
  if (typeof window !== "undefined") {
    const existing = getBlueprints();
    existing.push(blueprint);
    localStorage.setItem(BLUEPRINT_STORAGE_KEY, JSON.stringify(existing));

    // Update leaderboard aggregates
    updateLeaderboard(blueprint);
  }
}

export function getBlueprints(): HTI6Blueprint[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(BLUEPRINT_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function updateLeaderboard(blueprint: HTI6Blueprint): void {
  // Update in-memory totals
  leaderboardStore.totalSubmissions++;
  for (const [pillarId, points] of Object.entries(blueprint.allocations)) {
    leaderboardStore.pillarTotals[pillarId] =
      (leaderboardStore.pillarTotals[pillarId] || 0) + points;
  }
  for (const policyId of blueprint.selectedPolicies) {
    leaderboardStore.policyVotes[policyId] =
      (leaderboardStore.policyVotes[policyId] || 0) + 1;
  }

  // Persist to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem(
      LEADERBOARD_STORAGE_KEY,
      JSON.stringify(leaderboardStore)
    );
  }
}

export function getLeaderboardData(): {
  totalSubmissions: number;
  pillarAverages: { pillarId: string; title: string; emoji: string; average: number; color: string }[];
  topPolicies: { policyId: string; title: string; pillarTitle: string; votes: number }[];
} {
  let data = leaderboardStore;

  // Try to hydrate from localStorage on first call
  if (data.totalSubmissions === 0 && typeof window !== "undefined") {
    const stored = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      Object.assign(leaderboardStore, parsed);
      data = leaderboardStore;
    }

    // If still empty, rebuild from saved blueprints
    if (data.totalSubmissions === 0) {
      const blueprints = getBlueprints();
      for (const bp of blueprints) {
        leaderboardStore.totalSubmissions++;
        for (const [pillarId, points] of Object.entries(bp.allocations)) {
          leaderboardStore.pillarTotals[pillarId] =
            (leaderboardStore.pillarTotals[pillarId] || 0) + points;
        }
        for (const policyId of bp.selectedPolicies) {
          leaderboardStore.policyVotes[policyId] =
            (leaderboardStore.policyVotes[policyId] || 0) + 1;
        }
      }
    }
  }

  const total = data.totalSubmissions || 1;

  const pillarAverages = HTI6_PILLARS.map((p) => ({
    pillarId: p.id,
    title: p.title,
    emoji: p.emoji,
    average: Math.round((data.pillarTotals[p.id] || 0) / total),
    color: p.color,
  })).sort((a, b) => b.average - a.average);

  // Flatten all policies for lookup
  const allPolicies = HTI6_PILLARS.flatMap((p) =>
    p.policies.map((pol) => ({ ...pol, pillarTitle: p.title }))
  );

  const topPolicies = Object.entries(data.policyVotes)
    .map(([policyId, votes]) => {
      const policy = allPolicies.find((p) => p.id === policyId);
      return {
        policyId,
        title: policy?.title || policyId,
        pillarTitle: policy?.pillarTitle || "",
        votes: votes as number,
      };
    })
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);

  return { totalSubmissions: data.totalSubmissions, pillarAverages, topPolicies };
}

export function getShareTextForBlueprint(blueprint: HTI6Blueprint): string {
  const topPillar = HTI6_PILLARS.find((p) => p.id === blueprint.topPillar);
  const policyCount = blueprint.selectedPolicies.length;
  const topPoints = blueprint.allocations[blueprint.topPillar] || 0;

  return `🏗️ I just designed my HTI-6 Blueprint!\n\nMy #1 priority: ${topPillar?.emoji} ${topPillar?.title} (${topPoints} pts)\nSelected ${policyCount} key policies to shape the future of health IT.\n\nWhat would YOUR HTI-6 look like? Build yours 👉`;
}

export function getLinkedInShareUrlForBlueprint(
  blueprint: HTI6Blueprint,
  baseUrl: string
): string {
  const topPillar = HTI6_PILLARS.find((p) => p.id === blueprint.topPillar);
  const url = `${baseUrl}/hti6-builder`;
  const title = `My HTI-6 Blueprint: ${topPillar?.emoji} ${topPillar?.title} is #1`;
  const summary = getShareTextForBlueprint(blueprint);

  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`;
}
