"use client";

import { useState, useCallback, useEffect } from "react";
import {
  HTI6_PILLARS,
  TOTAL_POINTS,
  MAX_POLICIES_TOTAL,
  HTI6Blueprint,
  generateBlueprintId,
  saveBlueprint,
  getLeaderboardData,
  getShareTextForBlueprint,
  getLinkedInShareUrlForBlueprint,
} from "@/lib/hti6-data";

type GamePhase = "intro" | "allocate" | "policies" | "result" | "leaderboard";

interface HTI6BuilderProps {
  playerName: string;
  onBack: () => void;
}

export default function HTI6Builder({ playerName, onBack }: HTI6BuilderProps) {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [allocations, setAllocations] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    HTI6_PILLARS.forEach((p) => (initial[p.id] = 20)); // even split
    return initial;
  });
  const [selectedPolicies, setSelectedPolicies] = useState<Set<string>>(
    new Set()
  );
  const [blueprint, setBlueprint] = useState<HTI6Blueprint | null>(null);
  const [copied, setCopied] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const pointsUsed = Object.values(allocations).reduce((a, b) => a + b, 0);
  const pointsRemaining = TOTAL_POINTS - pointsUsed;

  const handleAllocation = useCallback(
    (pillarId: string, delta: number) => {
      setAllocations((prev) => {
        const current = prev[pillarId];
        const newVal = current + delta;
        if (newVal < 0 || newVal > 50) return prev;
        const newTotal =
          Object.values(prev).reduce((a, b) => a + b, 0) - current + newVal;
        if (newTotal > TOTAL_POINTS) return prev;
        return { ...prev, [pillarId]: newVal };
      });
    },
    []
  );

  const togglePolicy = useCallback(
    (policyId: string) => {
      setSelectedPolicies((prev) => {
        const next = new Set(prev);
        if (next.has(policyId)) {
          next.delete(policyId);
        } else if (next.size < MAX_POLICIES_TOTAL) {
          next.add(policyId);
        }
        return next;
      });
    },
    []
  );

  const handleSubmitBlueprint = () => {
    const topPillarId = Object.entries(allocations).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

    const bp: HTI6Blueprint = {
      id: generateBlueprintId(),
      name: playerName,
      date: new Date().toISOString(),
      allocations,
      selectedPolicies: Array.from(selectedPolicies),
      topPillar: topPillarId,
    };

    saveBlueprint(bp);
    setBlueprint(bp);
    setPhase("result");
  };

  const canSubmitPolicies = selectedPolicies.size >= 3;

  // Intro phase
  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto px-4 animate-fade-in">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏗️</div>
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            <span className="hti6-gradient-text">HTI-6 Builder</span>
          </h2>
          <p className="text-white/60 text-lg">
            Design the next era of health IT regulation
          </p>
        </div>

        <div className="glass-strong rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-bold text-white mb-3">The Challenge</h3>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            ASTP (formerly ONC) released <strong className="text-fhir-accent">HTI-1</strong> to
            modernize health IT, followed by <strong className="text-fhir-accent">HTI-2</strong> through{" "}
            <strong className="text-fhir-accent">HTI-5</strong>, progressively expanding FHIR
            requirements, AI governance, and patient access. Now it&apos;s your turn.
          </p>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            <strong className="text-fhir-flame">HTI-6 is on the horizon</strong> — and
            FHIR is poised to become the definitive standard for all health data
            exchange. But what should HTI-6 prioritize?
          </p>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-white/80 text-sm font-medium mb-2">How it works:</p>
            <ol className="text-white/60 text-sm space-y-1 list-decimal list-inside">
              <li>
                Allocate <strong className="text-white/90">100 priority points</strong> across 5 policy pillars
              </li>
              <li>
                Select up to <strong className="text-white/90">8 specific policies</strong> you want in HTI-6
              </li>
              <li>
                Get your <strong className="text-white/90">HTI-6 Blueprint</strong> — share it and see what others prioritize
              </li>
            </ol>
          </div>
        </div>

        <button
          onClick={() => setPhase("allocate")}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:opacity-90 transition-all"
        >
          Start Building HTI-6
        </button>

        <button
          onClick={onBack}
          className="w-full py-3 mt-3 rounded-xl glass text-white/50 hover:text-white/80 font-medium transition-colors text-sm"
        >
          Back to Games
        </button>
      </div>
    );
  }

  // Allocation phase
  if (phase === "allocate") {
    return (
      <div className="max-w-2xl mx-auto px-4 animate-fade-in">
        <div className="text-center mb-6">
          <p className="text-xs font-bold tracking-widest text-fhir-accent uppercase mb-1">
            Step 1 of 2
          </p>
          <h2 className="text-2xl font-black text-white mb-1">
            Allocate Priorities
          </h2>
          <p className="text-white/50 text-sm">
            Distribute {TOTAL_POINTS} points across 5 pillars. What matters
            most?
          </p>
        </div>

        {/* Points remaining indicator */}
        <div
          className={`glass-strong rounded-xl p-3 mb-6 text-center ${
            pointsRemaining === 0
              ? "border-green-500/30"
              : pointsRemaining < 0
              ? "border-red-500/30"
              : ""
          }`}
        >
          <span className="text-sm text-white/50">Points remaining: </span>
          <span
            className={`text-2xl font-black ${
              pointsRemaining === 0
                ? "text-green-400"
                : pointsRemaining < 0
                ? "text-red-400"
                : "text-white"
            }`}
          >
            {pointsRemaining}
          </span>
          <span className="text-sm text-white/50"> / {TOTAL_POINTS}</span>
        </div>

        {/* Pillar sliders */}
        <div className="space-y-4 mb-6">
          {HTI6_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className={`glass rounded-xl p-4 ${pillar.borderColor} border`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{pillar.emoji}</span>
                  <span className="font-bold text-white text-sm">
                    {pillar.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAllocation(pillar.id, -5)}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors flex items-center justify-center text-lg"
                  >
                    -
                  </button>
                  <span className="text-xl font-black text-white w-10 text-center">
                    {allocations[pillar.id]}
                  </span>
                  <button
                    onClick={() => handleAllocation(pillar.id, 5)}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors flex items-center justify-center text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
              {/* Visual bar */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${pillar.color} transition-all duration-300`}
                  style={{
                    width: `${(allocations[pillar.id] / 50) * 100}%`,
                  }}
                />
              </div>
              <p className="text-white/40 text-xs mt-2">{pillar.description}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setPhase("policies")}
          disabled={pointsRemaining !== 0}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {pointsRemaining === 0
            ? "Next: Choose Policies"
            : `Allocate ${pointsRemaining} more points`}
        </button>

        <button
          onClick={() => setPhase("intro")}
          className="w-full py-3 mt-3 rounded-xl glass text-white/50 hover:text-white/80 font-medium transition-colors text-sm"
        >
          Back
        </button>
      </div>
    );
  }

  // Policy selection phase
  if (phase === "policies") {
    // Sort pillars by allocation (highest first)
    const sortedPillars = [...HTI6_PILLARS].sort(
      (a, b) => (allocations[b.id] || 0) - (allocations[a.id] || 0)
    );

    return (
      <div className="max-w-2xl mx-auto px-4 animate-fade-in">
        <div className="text-center mb-6">
          <p className="text-xs font-bold tracking-widest text-fhir-accent uppercase mb-1">
            Step 2 of 2
          </p>
          <h2 className="text-2xl font-black text-white mb-1">
            Select Policies
          </h2>
          <p className="text-white/50 text-sm">
            Pick 3-{MAX_POLICIES_TOTAL} policies for your HTI-6 blueprint
          </p>
        </div>

        {/* Selection counter */}
        <div className="glass-strong rounded-xl p-3 mb-6 text-center">
          <span className="text-sm text-white/50">Policies selected: </span>
          <span
            className={`text-2xl font-black ${
              selectedPolicies.size >= 3
                ? "text-green-400"
                : "text-white"
            }`}
          >
            {selectedPolicies.size}
          </span>
          <span className="text-sm text-white/50"> / {MAX_POLICIES_TOTAL}</span>
        </div>

        {/* Policies by pillar */}
        <div className="space-y-6 mb-6">
          {sortedPillars.map((pillar) => (
            <div key={pillar.id}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{pillar.emoji}</span>
                <span className="font-bold text-white text-sm">
                  {pillar.title}
                </span>
                <span className="text-xs text-white/40 ml-auto">
                  {allocations[pillar.id]} pts
                </span>
              </div>
              <div className="space-y-2">
                {pillar.policies.map((policy) => {
                  const isSelected = selectedPolicies.has(policy.id);
                  const isDisabled =
                    !isSelected && selectedPolicies.size >= MAX_POLICIES_TOTAL;
                  return (
                    <button
                      key={policy.id}
                      onClick={() => togglePolicy(policy.id)}
                      disabled={isDisabled}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        isSelected
                          ? `${pillar.bgColor} ${pillar.borderColor} border`
                          : isDisabled
                          ? "glass border-white/5 opacity-40 cursor-not-allowed"
                          : "glass border-white/10 hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-white/20 border-white/60"
                              : "border-white/20"
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth="3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white text-sm">
                              {policy.title}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/50 font-medium">
                              {policy.impact}
                            </span>
                          </div>
                          <p className="text-white/50 text-xs leading-relaxed">
                            {policy.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmitBlueprint}
          disabled={!canSubmitPolicies}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {canSubmitPolicies
            ? "Generate My HTI-6 Blueprint"
            : `Select ${3 - selectedPolicies.size} more policies`}
        </button>

        <button
          onClick={() => setPhase("allocate")}
          className="w-full py-3 mt-3 rounded-xl glass text-white/50 hover:text-white/80 font-medium transition-colors text-sm"
        >
          Back to Priorities
        </button>
      </div>
    );
  }

  // Result phase
  if (phase === "result" && blueprint) {
    const topPillar = HTI6_PILLARS.find((p) => p.id === blueprint.topPillar)!;
    const sortedAllocations = Object.entries(blueprint.allocations)
      .sort((a, b) => b[1] - a[1])
      .map(([pillarId, points]) => ({
        pillar: HTI6_PILLARS.find((p) => p.id === pillarId)!,
        points,
      }));

    const selectedPolicyDetails = blueprint.selectedPolicies.map((pid) => {
      for (const pillar of HTI6_PILLARS) {
        const policy = pillar.policies.find((p) => p.id === pid);
        if (policy) return { policy, pillar };
      }
      return null;
    }).filter(Boolean) as { policy: typeof HTI6_PILLARS[0]["policies"][0]; pillar: typeof HTI6_PILLARS[0] }[];

    const baseUrl =
      typeof window !== "undefined" ? window.location.origin : "";
    const shareText = getShareTextForBlueprint(blueprint);
    const fullShareText = `${shareText} ${baseUrl}/hti6-builder`;

    const handleLinkedIn = () => {
      const url = getLinkedInShareUrlForBlueprint(blueprint, baseUrl);
      window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleTwitter = () => {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        fullShareText
      )}`;
      window.open(twitterUrl, "_blank", "noopener,noreferrer");
    };

    const handleCopyLink = async () => {
      try {
        await navigator.clipboard.writeText(
          `${shareText}\n\n${baseUrl}/hti6-builder`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    return (
      <div className="max-w-2xl mx-auto px-4 animate-fade-in">
        {/* Blueprint Card */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3 animate-badge-spin">🏗️</div>
          <h2 className="text-2xl font-black text-white mb-1">
            Your HTI-6 Blueprint
          </h2>
          <p className="text-white/50 text-sm">
            Designed by{" "}
            <span className="text-white/70 font-semibold">{blueprint.name}</span>
          </p>
          <p className="text-white/30 text-xs mt-1 font-mono">
            {blueprint.id}
          </p>
        </div>

        {/* Top priority highlight */}
        <div
          className={`glass-strong rounded-2xl p-5 mb-5 border ${topPillar.borderColor}`}
        >
          <div className="text-center">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
              #1 Priority
            </p>
            <div className="text-3xl mb-1">{topPillar.emoji}</div>
            <h3 className="text-xl font-black text-white">{topPillar.title}</h3>
            <p
              className={`text-3xl font-black bg-gradient-to-r ${topPillar.color} bg-clip-text text-transparent`}
            >
              {blueprint.allocations[topPillar.id]} pts
            </p>
          </div>
        </div>

        {/* All allocations bar chart */}
        <div className="glass rounded-xl p-4 mb-5">
          <h4 className="text-sm font-bold text-white/70 mb-3">
            Priority Breakdown
          </h4>
          <div className="space-y-3">
            {sortedAllocations.map(({ pillar, points }) => (
              <div key={pillar.id} className="flex items-center gap-3">
                <span className="text-lg w-7">{pillar.emoji}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-white/60">{pillar.title}</span>
                    <span className="text-xs text-white/80 font-bold">
                      {points} pts
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${pillar.color} transition-all duration-700`}
                      style={{ width: `${(points / 50) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected policies */}
        <div className="glass rounded-xl p-4 mb-6">
          <h4 className="text-sm font-bold text-white/70 mb-3">
            Selected Policies ({selectedPolicyDetails.length})
          </h4>
          <div className="space-y-2">
            {selectedPolicyDetails.map(({ policy, pillar }) => (
              <div
                key={policy.id}
                className="flex items-start gap-2 text-sm"
              >
                <span className="text-sm mt-0.5">{pillar.emoji}</span>
                <div>
                  <span className="text-white/80 font-medium">
                    {policy.title}
                  </span>
                  <span className="text-white/30 ml-2 text-xs">
                    {policy.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className="animate-slide-up">
          <h3 className="text-lg font-bold text-white mb-4">
            Share Your Blueprint
          </h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button
              onClick={handleLinkedIn}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </button>
            <button
              onClick={handleTwitter}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-black border border-white/20 hover:bg-white/10 text-white font-semibold transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Post
            </button>
            <button
              onClick={handleCopyLink}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl glass hover:bg-white/10 text-white font-semibold transition-colors text-sm ${
                copied ? "bg-green-500/20 border-green-500/50" : ""
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* View leaderboard */}
        <button
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-fhir-flame to-fhir-ember text-white font-bold text-lg hover:opacity-90 transition-all"
        >
          {showLeaderboard ? "Hide" : "View"} Community Leaderboard 📊
        </button>

        {showLeaderboard && <LeaderboardView />}

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4 mb-8">
          <button
            onClick={() => {
              setPhase("intro");
              setSelectedPolicies(new Set());
              setBlueprint(null);
              const initial: Record<string, number> = {};
              HTI6_PILLARS.forEach((p) => (initial[p.id] = 20));
              setAllocations(initial);
            }}
            className="py-3 rounded-xl glass hover:bg-white/10 text-white/70 font-semibold transition-colors text-sm"
          >
            Build Another
          </button>
          <button
            onClick={onBack}
            className="py-3 rounded-xl glass hover:bg-white/10 text-white/70 font-semibold transition-colors text-sm"
          >
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  return null;
}

// Leaderboard subcomponent
function LeaderboardView() {
  const [data, setData] = useState<ReturnType<typeof getLeaderboardData> | null>(null);

  useEffect(() => {
    setData(getLeaderboardData());
  }, []);

  if (!data || data.totalSubmissions === 0) {
    return (
      <div className="glass rounded-xl p-6 mt-4 text-center animate-slide-up">
        <p className="text-white/50 text-sm">
          No blueprints submitted yet. You could be the first!
        </p>
      </div>
    );
  }

  const maxAvg = Math.max(...data.pillarAverages.map((p) => p.average), 1);

  return (
    <div className="glass rounded-xl p-5 mt-4 animate-slide-up">
      <div className="text-center mb-4">
        <h4 className="text-lg font-bold text-white">Community Consensus</h4>
        <p className="text-white/40 text-xs">
          Based on {data.totalSubmissions} blueprint{data.totalSubmissions !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Average priorities */}
      <div className="mb-5">
        <h5 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">
          Average Priority Allocation
        </h5>
        <div className="space-y-3">
          {data.pillarAverages.map((p, i) => (
            <div key={p.pillarId} className="flex items-center gap-3">
              <span className="text-lg w-6 text-center font-black text-white/30">
                {i + 1}
              </span>
              <span className="text-lg">{p.emoji}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-white/60">{p.title}</span>
                  <span className="text-xs text-white/80 font-bold">
                    {p.average} avg pts
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${p.color} transition-all duration-700`}
                    style={{ width: `${(p.average / maxAvg) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top policies */}
      {data.topPolicies.length > 0 && (
        <div>
          <h5 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">
            Most Popular Policies
          </h5>
          <div className="space-y-2">
            {data.topPolicies.map((p, i) => (
              <div
                key={p.policyId}
                className="flex items-center gap-3 glass rounded-lg p-2"
              >
                <span className="text-sm font-black text-fhir-accent w-6 text-center">
                  #{i + 1}
                </span>
                <div className="flex-1">
                  <span className="text-sm text-white/80 font-medium">
                    {p.title}
                  </span>
                  <span className="text-xs text-white/30 ml-2">
                    {p.pillarTitle}
                  </span>
                </div>
                <span className="text-xs text-white/50 font-bold">
                  {p.votes} vote{p.votes !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
