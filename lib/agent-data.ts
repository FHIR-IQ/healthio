export interface AgentCapability {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  icon: string;
  complexity: "essential" | "advanced" | "visionary";
}

export interface AgentCategory {
  id: string;
  title: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  capabilities: AgentCapability[];
}

export interface AgentPersona {
  id: string;
  title: string;
  emoji: string;
  description: string;
  traits: string[];
}

export interface AgentDataSource {
  id: string;
  title: string;
  emoji: string;
  description: string;
  fhirRelevance: string;
}

export interface AgentBlueprint {
  id: string;
  name: string;
  agentName: string;
  date: string;
  persona: string; // persona ID
  dataSources: string[]; // data source IDs
  capabilities: string[]; // capability IDs
  topCategory: string; // category with most capabilities selected
}

// Agent personas — the personality/approach of the AI concierge
export const AGENT_PERSONAS: AgentPersona[] = [
  {
    id: "navigator",
    title: "The Navigator",
    emoji: "🧭",
    description:
      "A proactive guide that anticipates needs, finds the right providers, and steers patients through the healthcare maze.",
    traits: ["Proactive", "Resourceful", "System-savvy"],
  },
  {
    id: "advocate",
    title: "The Advocate",
    emoji: "🛡️",
    description:
      "A fierce patient champion that fights denied claims, challenges billing errors, and ensures patients get the care they deserve.",
    traits: ["Assertive", "Detail-oriented", "Rights-focused"],
  },
  {
    id: "coach",
    title: "The Coach",
    emoji: "💪",
    description:
      "A supportive wellness partner that helps patients build healthy habits, track goals, and stay on top of chronic conditions.",
    traits: ["Motivational", "Empathetic", "Goal-oriented"],
  },
  {
    id: "analyst",
    title: "The Analyst",
    emoji: "🔬",
    description:
      "A data-driven advisor that synthesizes research, compares treatment options, and delivers evidence-based recommendations.",
    traits: ["Analytical", "Evidence-based", "Thorough"],
  },
];

// Data sources the agent can connect to
export const AGENT_DATA_SOURCES: AgentDataSource[] = [
  {
    id: "ehr",
    title: "EHR / Patient Portal",
    emoji: "🏥",
    description:
      "Full medical records — conditions, medications, allergies, lab results, clinical notes via FHIR Patient Access API.",
    fhirRelevance: "FHIR R4 Patient Access API, US Core IG",
  },
  {
    id: "claims",
    title: "Insurance & Claims",
    emoji: "💳",
    description:
      "Claims history, EOBs, coverage details, formulary, and prior auth status via CARIN Blue Button and Da Vinci IGs.",
    fhirRelevance: "CARIN BB, Da Vinci PDex, Formulary IG",
  },
  {
    id: "wearables",
    title: "Wearables & IoT",
    emoji: "⌚",
    description:
      "Continuous health data — heart rate, sleep, activity, glucose, blood pressure from personal devices.",
    fhirRelevance: "FHIR Observation, Device resources",
  },
  {
    id: "research",
    title: "Clinical Research & Trials",
    emoji: "📚",
    description:
      "Access to clinical trial registries, PubMed evidence, treatment guidelines, and drug interaction databases.",
    fhirRelevance: "FHIR ResearchStudy, Evidence resources",
  },
  {
    id: "sdoh",
    title: "Social Determinants",
    emoji: "🏘️",
    description:
      "Food access, transportation, housing stability, and community resources that impact health outcomes.",
    fhirRelevance: "Gravity SDOH IG, FHIR Questionnaire",
  },
  {
    id: "genomics",
    title: "Genomics & Precision Medicine",
    emoji: "🧬",
    description:
      "Pharmacogenomic profiles, genetic risk factors, and hereditary condition screening results.",
    fhirRelevance: "FHIR Genomics IG, MolecularSequence",
  },
];

// Capability categories
export const AGENT_CATEGORIES: AgentCategory[] = [
  {
    id: "health-mgmt",
    title: "Health Management",
    emoji: "❤️",
    color: "from-rose-400 to-red-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    description:
      "Day-to-day health tracking, medication management, and preventive care.",
    capabilities: [
      {
        id: "hm-1",
        title: "Medication Concierge",
        description:
          "Tracks all medications, sends smart refill reminders, flags interactions, and finds lowest-cost pharmacy options using FHIR MedicationRequest.",
        categoryId: "health-mgmt",
        icon: "💊",
        complexity: "essential",
      },
      {
        id: "hm-2",
        title: "Lab Result Interpreter",
        description:
          "Translates lab results into plain language, shows trends over time, and flags values that need attention using FHIR Observation.",
        categoryId: "health-mgmt",
        icon: "🔬",
        complexity: "essential",
      },
      {
        id: "hm-3",
        title: "Chronic Condition Copilot",
        description:
          "Personalized management plans for diabetes, hypertension, asthma, etc. with daily check-ins and adaptive goal setting.",
        categoryId: "health-mgmt",
        icon: "📋",
        complexity: "advanced",
      },
      {
        id: "hm-4",
        title: "Predictive Health Alerts",
        description:
          "Uses wearable + EHR data patterns to predict flare-ups, hospitalizations, or deterioration before they happen.",
        categoryId: "health-mgmt",
        icon: "🔮",
        complexity: "visionary",
      },
    ],
  },
  {
    id: "navigation",
    title: "System Navigation",
    emoji: "🗺️",
    color: "from-blue-400 to-indigo-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    description:
      "Finding providers, scheduling, referrals, and navigating the healthcare system.",
    capabilities: [
      {
        id: "nav-1",
        title: "Smart Provider Matching",
        description:
          "Finds in-network providers based on condition, location, ratings, availability, and your insurance — books appointments directly.",
        categoryId: "navigation",
        icon: "🔍",
        complexity: "essential",
      },
      {
        id: "nav-2",
        title: "Referral Orchestrator",
        description:
          "Automates the referral chain — gets the order, finds specialists, transfers records, and follows up on appointments via FHIR ServiceRequest.",
        categoryId: "navigation",
        icon: "🔄",
        complexity: "advanced",
      },
      {
        id: "nav-3",
        title: "Care Transition Manager",
        description:
          "Seamlessly coordinates hospital-to-home transitions — medication reconciliation, follow-up scheduling, and home care setup.",
        categoryId: "navigation",
        icon: "🏠",
        complexity: "advanced",
      },
      {
        id: "nav-4",
        title: "Cross-System Record Unifier",
        description:
          "Aggregates records from every provider you have ever seen into one unified health timeline using FHIR queries across multiple systems.",
        categoryId: "navigation",
        icon: "🌐",
        complexity: "visionary",
      },
    ],
  },
  {
    id: "insurance",
    title: "Insurance & Financial",
    emoji: "💰",
    color: "from-emerald-400 to-green-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    description:
      "Claims management, billing disputes, cost estimation, and coverage optimization.",
    capabilities: [
      {
        id: "ins-1",
        title: "Real-Time Cost Estimator",
        description:
          "Before any procedure, shows estimated out-of-pocket costs based on your specific plan, deductible status, and in-network rates.",
        categoryId: "insurance",
        icon: "💵",
        complexity: "essential",
      },
      {
        id: "ins-2",
        title: "Claim Denial Fighter",
        description:
          "Auto-detects denied claims, drafts appeal letters with clinical evidence from your FHIR records, and tracks appeal status.",
        categoryId: "insurance",
        icon: "⚔️",
        complexity: "advanced",
      },
      {
        id: "ins-3",
        title: "Prior Auth Autopilot",
        description:
          "Handles prior authorization requests end-to-end using Da Vinci PAS — submits, tracks, and escalates automatically.",
        categoryId: "insurance",
        icon: "🤖",
        complexity: "advanced",
      },
      {
        id: "ins-4",
        title: "Benefits Optimizer",
        description:
          "Analyzes your utilization patterns and recommends the best plan during open enrollment, including HSA/FSA strategies.",
        categoryId: "insurance",
        icon: "📊",
        complexity: "visionary",
      },
    ],
  },
  {
    id: "research-ai",
    title: "Research & AI Insights",
    emoji: "🧠",
    color: "from-purple-400 to-violet-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    description:
      "Evidence-based decision support, clinical trials, and personalized medicine.",
    capabilities: [
      {
        id: "ra-1",
        title: "Treatment Option Comparator",
        description:
          "Compares treatment options with latest evidence, showing efficacy rates, side effects, and cost — personalized to your profile.",
        categoryId: "research-ai",
        icon: "⚖️",
        complexity: "advanced",
      },
      {
        id: "ra-2",
        title: "Clinical Trial Matchmaker",
        description:
          "Continuously scans trial registries against your FHIR health profile to surface eligible trials — handles pre-screening.",
        categoryId: "research-ai",
        icon: "🎯",
        complexity: "advanced",
      },
      {
        id: "ra-3",
        title: "Second Opinion Synthesizer",
        description:
          "Prepares comprehensive case summaries from your FHIR records for second opinions — finds specialists and facilitates review.",
        categoryId: "research-ai",
        icon: "👥",
        complexity: "advanced",
      },
      {
        id: "ra-4",
        title: "Genomic-Guided Care",
        description:
          "Integrates pharmacogenomic data to flag drug sensitivities, recommend personalized dosing, and identify hereditary risks.",
        categoryId: "research-ai",
        icon: "🧬",
        complexity: "visionary",
      },
    ],
  },
  {
    id: "family",
    title: "Family & Caregiving",
    emoji: "👨‍👩‍👧‍👦",
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    description:
      "Managing care for children, aging parents, and family health coordination.",
    capabilities: [
      {
        id: "fam-1",
        title: "Family Health Dashboard",
        description:
          "Unified view of the whole family — immunization schedules, upcoming appointments, medication lists, and care gaps for each member.",
        categoryId: "family",
        icon: "👨‍👩‍👧",
        complexity: "essential",
      },
      {
        id: "fam-2",
        title: "Caregiver Coordinator",
        description:
          "Manages caregiving duties for aging parents — shares updates with family, coordinates home health, and tracks decline patterns.",
        categoryId: "family",
        icon: "🤝",
        complexity: "advanced",
      },
      {
        id: "fam-3",
        title: "Pediatric Growth Tracker",
        description:
          "Monitors developmental milestones, growth charts, vaccination schedules, and school health requirements for children.",
        categoryId: "family",
        icon: "📈",
        complexity: "essential",
      },
      {
        id: "fam-4",
        title: "Emergency Health Packet",
        description:
          "Always-ready emergency summary — allergies, medications, conditions, emergency contacts, and advance directives in FHIR IPS format.",
        categoryId: "family",
        icon: "🚨",
        complexity: "essential",
      },
    ],
  },
];

export const MAX_CAPABILITIES = 10;
export const MIN_DATA_SOURCES = 2;

export function generateAgentId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "AGT-";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

// Storage
const AGENT_STORAGE_KEY = "health-agent-blueprints";
const AGENT_LEADERBOARD_KEY = "health-agent-leaderboard";

const agentLeaderboard: {
  totalBuilds: number;
  personaVotes: Record<string, number>;
  dataSourceVotes: Record<string, number>;
  capabilityVotes: Record<string, number>;
  categoryTotals: Record<string, number>;
} = {
  totalBuilds: 0,
  personaVotes: {},
  dataSourceVotes: {},
  capabilityVotes: {},
  categoryTotals: {},
};

export function saveAgentBlueprint(blueprint: AgentBlueprint): void {
  if (typeof window !== "undefined") {
    const existing = getAgentBlueprints();
    existing.push(blueprint);
    localStorage.setItem(AGENT_STORAGE_KEY, JSON.stringify(existing));
    updateAgentLeaderboard(blueprint);
  }
}

export function getAgentBlueprints(): AgentBlueprint[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(AGENT_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function updateAgentLeaderboard(blueprint: AgentBlueprint): void {
  agentLeaderboard.totalBuilds++;
  agentLeaderboard.personaVotes[blueprint.persona] =
    (agentLeaderboard.personaVotes[blueprint.persona] || 0) + 1;

  for (const ds of blueprint.dataSources) {
    agentLeaderboard.dataSourceVotes[ds] =
      (agentLeaderboard.dataSourceVotes[ds] || 0) + 1;
  }

  for (const cap of blueprint.capabilities) {
    agentLeaderboard.capabilityVotes[cap] =
      (agentLeaderboard.capabilityVotes[cap] || 0) + 1;
    // Find category
    for (const cat of AGENT_CATEGORIES) {
      if (cat.capabilities.some((c) => c.id === cap)) {
        agentLeaderboard.categoryTotals[cat.id] =
          (agentLeaderboard.categoryTotals[cat.id] || 0) + 1;
      }
    }
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(AGENT_LEADERBOARD_KEY, JSON.stringify(agentLeaderboard));
  }
}

export function getAgentLeaderboardData() {
  // Hydrate from localStorage if needed
  if (agentLeaderboard.totalBuilds === 0 && typeof window !== "undefined") {
    const stored = localStorage.getItem(AGENT_LEADERBOARD_KEY);
    if (stored) {
      Object.assign(agentLeaderboard, JSON.parse(stored));
    }
    if (agentLeaderboard.totalBuilds === 0) {
      const blueprints = getAgentBlueprints();
      for (const bp of blueprints) {
        agentLeaderboard.totalBuilds++;
        agentLeaderboard.personaVotes[bp.persona] =
          (agentLeaderboard.personaVotes[bp.persona] || 0) + 1;
        for (const ds of bp.dataSources) {
          agentLeaderboard.dataSourceVotes[ds] =
            (agentLeaderboard.dataSourceVotes[ds] || 0) + 1;
        }
        for (const cap of bp.capabilities) {
          agentLeaderboard.capabilityVotes[cap] =
            (agentLeaderboard.capabilityVotes[cap] || 0) + 1;
          for (const cat of AGENT_CATEGORIES) {
            if (cat.capabilities.some((c) => c.id === cap)) {
              agentLeaderboard.categoryTotals[cat.id] =
                (agentLeaderboard.categoryTotals[cat.id] || 0) + 1;
            }
          }
        }
      }
    }
  }

  const total = agentLeaderboard.totalBuilds || 1;

  // Top personas
  const topPersonas = AGENT_PERSONAS.map((p) => ({
    ...p,
    votes: agentLeaderboard.personaVotes[p.id] || 0,
    percentage: Math.round(
      ((agentLeaderboard.personaVotes[p.id] || 0) / total) * 100
    ),
  })).sort((a, b) => b.votes - a.votes);

  // Top data sources
  const topDataSources = AGENT_DATA_SOURCES.map((ds) => ({
    ...ds,
    votes: agentLeaderboard.dataSourceVotes[ds.id] || 0,
  })).sort((a, b) => b.votes - a.votes);

  // Top capabilities
  const allCaps = AGENT_CATEGORIES.flatMap((cat) =>
    cat.capabilities.map((c) => ({ ...c, catTitle: cat.title, catEmoji: cat.emoji }))
  );
  const topCapabilities = allCaps
    .map((c) => ({
      ...c,
      votes: agentLeaderboard.capabilityVotes[c.id] || 0,
    }))
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 6);

  // Category popularity
  const categoryRanking = AGENT_CATEGORIES.map((cat) => ({
    id: cat.id,
    title: cat.title,
    emoji: cat.emoji,
    color: cat.color,
    total: agentLeaderboard.categoryTotals[cat.id] || 0,
  })).sort((a, b) => b.total - a.total);

  return {
    totalBuilds: agentLeaderboard.totalBuilds,
    topPersonas,
    topDataSources,
    topCapabilities,
    categoryRanking,
  };
}

export function getAgentShareText(blueprint: AgentBlueprint): string {
  const persona = AGENT_PERSONAS.find((p) => p.id === blueprint.persona);
  const capCount = blueprint.capabilities.length;
  const dsCount = blueprint.dataSources.length;

  return `🤖 I just designed my ideal Healthcare AI Agent!\n\nAgent: "${blueprint.agentName}"\nPersona: ${persona?.emoji} ${persona?.title}\nCapabilities: ${capCount} features across ${dsCount} data sources\n\nPowered by FHIR + Claude AI. Build yours 👉`;
}

export function getAgentLinkedInUrl(
  blueprint: AgentBlueprint,
  baseUrl: string
): string {
  const persona = AGENT_PERSONAS.find((p) => p.id === blueprint.persona);
  const url = `${baseUrl}/agent-builder`;
  const title = `My Healthcare AI Agent: "${blueprint.agentName}" — ${persona?.emoji} ${persona?.title}`;
  const summary = getAgentShareText(blueprint);

  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`;
}
