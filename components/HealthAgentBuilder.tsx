"use client";

import { useState, useEffect } from "react";
import {
  AGENT_PERSONAS,
  AGENT_DATA_SOURCES,
  AGENT_CATEGORIES,
  MAX_CAPABILITIES,
  MIN_DATA_SOURCES,
  AgentBlueprint,
  generateAgentId,
  saveAgentBlueprint,
  getAgentLeaderboardData,
  getAgentShareText,
  getAgentLinkedInUrl,
} from "@/lib/agent-data";

type Phase = "intro" | "persona" | "data" | "capabilities" | "name-agent" | "result";

interface HealthAgentBuilderProps {
  playerName: string;
  onBack: () => void;
}

export default function HealthAgentBuilder({
  playerName,
  onBack,
}: HealthAgentBuilderProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [selectedSources, setSelectedSources] = useState<Set<string>>(new Set());
  const [selectedCaps, setSelectedCaps] = useState<Set<string>>(new Set());
  const [agentName, setAgentName] = useState("");
  const [blueprint, setBlueprint] = useState<AgentBlueprint | null>(null);
  const [copied, setCopied] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const toggleSource = (id: string) => {
    setSelectedSources((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCap = (id: string) => {
    setSelectedCaps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < MAX_CAPABILITIES) next.add(id);
      return next;
    });
  };

  const handleFinalize = () => {
    const catCounts: Record<string, number> = {};
    for (const capId of selectedCaps) {
      for (const cat of AGENT_CATEGORIES) {
        if (cat.capabilities.some((c) => c.id === capId)) {
          catCounts[cat.id] = (catCounts[cat.id] || 0) + 1;
        }
      }
    }
    const topCat = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || AGENT_CATEGORIES[0].id;

    const bp: AgentBlueprint = {
      id: generateAgentId(),
      name: playerName,
      agentName: agentName.trim() || "My Health Agent",
      date: new Date().toISOString(),
      persona: selectedPersona!,
      dataSources: Array.from(selectedSources),
      capabilities: Array.from(selectedCaps),
      topCategory: topCat,
    };

    saveAgentBlueprint(bp);
    setBlueprint(bp);
    setPhase("result");
  };

  // INTRO
  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto px-4 animate-fade-in">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            <span className="agent-gradient-text">Healthcare Agent Builder</span>
          </h2>
          <p className="text-white/60 text-lg">
            Design your ideal AI-powered patient concierge
          </p>
        </div>

        <div className="glass-strong rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-bold text-white mb-3">The Vision</h3>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            Imagine an AI agent that knows your complete health story — your EHR records,
            insurance claims, wearable data, and family history — all connected through{" "}
            <strong className="text-fhir-accent">FHIR</strong>. Powered by{" "}
            <strong className="text-fhir-purple">Claude</strong>, it acts as your
            full healthcare concierge.
          </p>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            It can fight denied claims, find the right specialist, interpret your labs,
            match you to clinical trials, manage your family&apos;s care, and predict health
            risks before they happen — all with your data, your consent, your control.
          </p>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-white/80 text-sm font-medium mb-2">Build your agent in 4 steps:</p>
            <ol className="text-white/60 text-sm space-y-1 list-decimal list-inside">
              <li>Choose your agent&apos;s <strong className="text-white/90">persona</strong> — how it approaches care</li>
              <li>Connect <strong className="text-white/90">data sources</strong> — EHR, claims, wearables, research</li>
              <li>Select up to <strong className="text-white/90">10 capabilities</strong> across 5 domains</li>
              <li>Name your agent and <strong className="text-white/90">share your vision</strong></li>
            </ol>
          </div>
        </div>

        <button
          onClick={() => setPhase("persona")}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-fhir-purple to-violet-600 text-white font-bold text-lg hover:opacity-90 transition-all"
        >
          Start Building Your Agent
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

  // PERSONA SELECTION
  if (phase === "persona") {
    return (
      <div className="max-w-2xl mx-auto px-4 animate-fade-in">
        <div className="text-center mb-6">
          <p className="text-xs font-bold tracking-widest text-fhir-purple uppercase mb-1">Step 1 of 4</p>
          <h2 className="text-2xl font-black text-white mb-1">Choose a Persona</h2>
          <p className="text-white/50 text-sm">How should your agent approach patient care?</p>
        </div>

        <div className="space-y-3 mb-6">
          {AGENT_PERSONAS.map((persona) => {
            const isSelected = selectedPersona === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() => setSelectedPersona(persona.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-fhir-purple/10 border-fhir-purple/40"
                    : "glass border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                    isSelected ? "bg-fhir-purple/20" : "bg-white/5"
                  }`}>
                    {persona.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">{persona.title}</span>
                      {isSelected && (
                        <svg className="w-4 h-4 text-fhir-purple" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-white/50 text-xs mb-2">{persona.description}</p>
                    <div className="flex gap-2">
                      {persona.traits.map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setPhase("data")}
          disabled={!selectedPersona}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-fhir-purple to-violet-600 text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {selectedPersona ? "Next: Connect Data Sources" : "Select a persona"}
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

  // DATA SOURCE SELECTION
  if (phase === "data") {
    return (
      <div className="max-w-2xl mx-auto px-4 animate-fade-in">
        <div className="text-center mb-6">
          <p className="text-xs font-bold tracking-widest text-fhir-purple uppercase mb-1">Step 2 of 4</p>
          <h2 className="text-2xl font-black text-white mb-1">Connect Data Sources</h2>
          <p className="text-white/50 text-sm">Select at least {MIN_DATA_SOURCES} data sources your agent can access</p>
        </div>

        <div className="glass-strong rounded-xl p-3 mb-6 text-center">
          <span className="text-sm text-white/50">Sources connected: </span>
          <span className={`text-2xl font-black ${selectedSources.size >= MIN_DATA_SOURCES ? "text-green-400" : "text-white"}`}>
            {selectedSources.size}
          </span>
          <span className="text-sm text-white/50"> / {AGENT_DATA_SOURCES.length}</span>
        </div>

        <div className="space-y-3 mb-6">
          {AGENT_DATA_SOURCES.map((ds) => {
            const isSelected = selectedSources.has(ds.id);
            return (
              <button
                key={ds.id}
                onClick={() => toggleSource(ds.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-fhir-purple/10 border-fhir-purple/40"
                    : "glass border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                    isSelected ? "bg-fhir-purple/30 border-fhir-purple" : "border-white/20"
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{ds.emoji}</span>
                      <span className="font-semibold text-white text-sm">{ds.title}</span>
                    </div>
                    <p className="text-white/50 text-xs mb-1">{ds.description}</p>
                    <p className="text-fhir-accent/60 text-[10px] font-mono">{ds.fhirRelevance}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setPhase("capabilities")}
          disabled={selectedSources.size < MIN_DATA_SOURCES}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-fhir-purple to-violet-600 text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {selectedSources.size >= MIN_DATA_SOURCES
            ? "Next: Choose Capabilities"
            : `Connect ${MIN_DATA_SOURCES - selectedSources.size} more source${MIN_DATA_SOURCES - selectedSources.size > 1 ? "s" : ""}`}
        </button>
        <button
          onClick={() => setPhase("persona")}
          className="w-full py-3 mt-3 rounded-xl glass text-white/50 hover:text-white/80 font-medium transition-colors text-sm"
        >
          Back
        </button>
      </div>
    );
  }

  // CAPABILITY SELECTION
  if (phase === "capabilities") {
    return (
      <div className="max-w-2xl mx-auto px-4 animate-fade-in">
        <div className="text-center mb-6">
          <p className="text-xs font-bold tracking-widest text-fhir-purple uppercase mb-1">Step 3 of 4</p>
          <h2 className="text-2xl font-black text-white mb-1">Select Capabilities</h2>
          <p className="text-white/50 text-sm">Pick 3–{MAX_CAPABILITIES} features for your agent</p>
        </div>

        <div className="glass-strong rounded-xl p-3 mb-6 text-center">
          <span className="text-sm text-white/50">Capabilities: </span>
          <span className={`text-2xl font-black ${selectedCaps.size >= 3 ? "text-green-400" : "text-white"}`}>
            {selectedCaps.size}
          </span>
          <span className="text-sm text-white/50"> / {MAX_CAPABILITIES}</span>
        </div>

        <div className="space-y-6 mb-6">
          {AGENT_CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{cat.emoji}</span>
                <span className="font-bold text-white text-sm">{cat.title}</span>
                <span className="text-xs text-white/30 ml-auto">{cat.description}</span>
              </div>
              <div className="space-y-2">
                {cat.capabilities.map((cap) => {
                  const isSelected = selectedCaps.has(cap.id);
                  const isDisabled = !isSelected && selectedCaps.size >= MAX_CAPABILITIES;
                  const complexityColors = {
                    essential: "bg-green-500/10 text-green-400",
                    advanced: "bg-blue-500/10 text-blue-400",
                    visionary: "bg-purple-500/10 text-purple-400",
                  };
                  return (
                    <button
                      key={cap.id}
                      onClick={() => toggleCap(cap.id)}
                      disabled={isDisabled}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        isSelected
                          ? `${cat.bgColor} ${cat.borderColor}`
                          : isDisabled
                          ? "glass border-white/5 opacity-40 cursor-not-allowed"
                          : "glass border-white/10 hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                          isSelected ? "bg-white/20 border-white/60" : "border-white/20"
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm">{cap.icon}</span>
                            <span className="font-semibold text-white text-sm">{cap.title}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${complexityColors[cap.complexity]}`}>
                              {cap.complexity}
                            </span>
                          </div>
                          <p className="text-white/50 text-xs leading-relaxed">{cap.description}</p>
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
          onClick={() => setPhase("name-agent")}
          disabled={selectedCaps.size < 3}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-fhir-purple to-violet-600 text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {selectedCaps.size >= 3 ? "Next: Name Your Agent" : `Select ${3 - selectedCaps.size} more`}
        </button>
        <button
          onClick={() => setPhase("data")}
          className="w-full py-3 mt-3 rounded-xl glass text-white/50 hover:text-white/80 font-medium transition-colors text-sm"
        >
          Back
        </button>
      </div>
    );
  }

  // NAME AGENT
  if (phase === "name-agent") {
    const persona = AGENT_PERSONAS.find((p) => p.id === selectedPersona);
    return (
      <div className="max-w-2xl mx-auto px-4 animate-fade-in">
        <div className="text-center mb-6">
          <p className="text-xs font-bold tracking-widest text-fhir-purple uppercase mb-1">Step 4 of 4</p>
          <h2 className="text-2xl font-black text-white mb-1">Name Your Agent</h2>
          <p className="text-white/50 text-sm">Give your healthcare AI a name</p>
        </div>

        {/* Summary preview */}
        <div className="glass-strong rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fhir-purple to-violet-600 flex items-center justify-center text-3xl">
              {persona?.emoji}
            </div>
            <div>
              <p className="text-white font-bold">{persona?.title} Agent</p>
              <p className="text-white/40 text-xs">{selectedSources.size} data sources • {selectedCaps.size} capabilities</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {Array.from(selectedSources).map((dsId) => {
              const ds = AGENT_DATA_SOURCES.find((d) => d.id === dsId);
              return (
                <span key={dsId} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-white/50">
                  {ds?.emoji} {ds?.title}
                </span>
              );
            })}
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-6 mb-6">
          <label className="block text-sm text-white/50 mb-2 font-medium">
            Agent Name
          </label>
          <input
            type="text"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && agentName.trim() && handleFinalize()}
            placeholder='e.g. "HealthBot", "CareCompanion", "MediGuide"'
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-fhir-purple transition-colors mb-4 text-lg"
            maxLength={30}
            autoFocus
          />
          <button
            onClick={handleFinalize}
            disabled={!agentName.trim()}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-fhir-purple to-violet-600 text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Generate Agent Blueprint
          </button>
        </div>

        <button
          onClick={() => setPhase("capabilities")}
          className="w-full py-3 rounded-xl glass text-white/50 hover:text-white/80 font-medium transition-colors text-sm"
        >
          Back
        </button>
      </div>
    );
  }

  // RESULT
  if (phase === "result" && blueprint) {
    const persona = AGENT_PERSONAS.find((p) => p.id === blueprint.persona)!;
    const topCat = AGENT_CATEGORIES.find((c) => c.id === blueprint.topCategory)!;
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const shareText = getAgentShareText(blueprint);

    const capDetails = blueprint.capabilities.map((capId) => {
      for (const cat of AGENT_CATEGORIES) {
        const cap = cat.capabilities.find((c) => c.id === capId);
        if (cap) return { cap, cat };
      }
      return null;
    }).filter(Boolean) as { cap: typeof AGENT_CATEGORIES[0]["capabilities"][0]; cat: typeof AGENT_CATEGORIES[0] }[];

    const dsDetails = blueprint.dataSources.map((dsId) =>
      AGENT_DATA_SOURCES.find((d) => d.id === dsId)!
    );

    const handleLinkedIn = () => {
      window.open(getAgentLinkedInUrl(blueprint, baseUrl), "_blank", "noopener,noreferrer");
    };
    const handleTwitter = () => {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareText}\n${baseUrl}/agent-builder`)}`,
        "_blank",
        "noopener,noreferrer"
      );
    };
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(`${shareText}\n\n${baseUrl}/agent-builder`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    return (
      <div className="max-w-2xl mx-auto px-4 animate-fade-in">
        {/* Agent Card */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3 animate-badge-spin">🤖</div>
          <h2 className="text-2xl font-black text-white mb-1">
            &ldquo;{blueprint.agentName}&rdquo;
          </h2>
          <p className="text-white/50 text-sm">
            Designed by <span className="text-white/70 font-semibold">{blueprint.name}</span>
          </p>
          <p className="text-white/30 text-xs mt-1 font-mono">{blueprint.id}</p>
        </div>

        {/* Persona highlight */}
        <div className="glass-strong rounded-2xl p-5 mb-5 border border-fhir-purple/30">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-fhir-purple to-violet-600 flex items-center justify-center text-3xl flex-shrink-0">
              {persona.emoji}
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider">Persona</p>
              <h3 className="text-xl font-black text-white">{persona.title}</h3>
              <div className="flex gap-2 mt-1">
                {persona.traits.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-fhir-purple/20 text-fhir-purple">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top focus area */}
        <div className={`glass rounded-xl p-4 mb-4 border ${topCat.borderColor}`}>
          <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Primary Focus</p>
          <div className="flex items-center gap-2">
            <span className="text-xl">{topCat.emoji}</span>
            <span className={`text-lg font-black bg-gradient-to-r ${topCat.color} bg-clip-text text-transparent`}>
              {topCat.title}
            </span>
          </div>
        </div>

        {/* Connected data sources */}
        <div className="glass rounded-xl p-4 mb-4">
          <h4 className="text-sm font-bold text-white/70 mb-3">
            Connected Data Sources ({dsDetails.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {dsDetails.map((ds) => (
              <span key={ds.id} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70">
                {ds.emoji} {ds.title}
              </span>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div className="glass rounded-xl p-4 mb-6">
          <h4 className="text-sm font-bold text-white/70 mb-3">
            Capabilities ({capDetails.length})
          </h4>
          <div className="space-y-2">
            {capDetails.map(({ cap, cat }) => (
              <div key={cap.id} className="flex items-center gap-2 text-sm">
                <span>{cap.icon}</span>
                <span className="text-white/80 font-medium">{cap.title}</span>
                <span className="text-white/20 text-xs ml-auto">{cat.emoji}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Powered by */}
        <div className="text-center mb-6">
          <p className="text-xs text-white/30">
            Powered by <span className="text-fhir-accent">FHIR</span> +{" "}
            <span className="text-fhir-purple">Claude AI</span>
          </p>
        </div>

        {/* Share */}
        <h3 className="text-lg font-bold text-white mb-4">Share Your Agent</h3>
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
            onClick={handleCopy}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl glass hover:bg-white/10 text-white font-semibold transition-colors text-sm ${
              copied ? "bg-green-500/20 border-green-500/50" : ""
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Leaderboard */}
        <button
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-fhir-flame to-fhir-ember text-white font-bold text-lg hover:opacity-90 transition-all"
        >
          {showLeaderboard ? "Hide" : "View"} Community Builds 📊
        </button>

        {showLeaderboard && <AgentLeaderboardView />}

        <div className="grid grid-cols-2 gap-3 mt-4 mb-8">
          <button
            onClick={() => {
              setPhase("intro");
              setSelectedPersona(null);
              setSelectedSources(new Set());
              setSelectedCaps(new Set());
              setAgentName("");
              setBlueprint(null);
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
function AgentLeaderboardView() {
  const [data, setData] = useState<ReturnType<typeof getAgentLeaderboardData> | null>(null);

  useEffect(() => {
    setData(getAgentLeaderboardData());
  }, []);

  if (!data || data.totalBuilds === 0) {
    return (
      <div className="glass rounded-xl p-6 mt-4 text-center animate-slide-up">
        <p className="text-white/50 text-sm">No agents built yet. You could be the first!</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-5 mt-4 animate-slide-up">
      <div className="text-center mb-4">
        <h4 className="text-lg font-bold text-white">Community Agent Builds</h4>
        <p className="text-white/40 text-xs">
          Based on {data.totalBuilds} agent{data.totalBuilds !== 1 ? "s" : ""} built
        </p>
      </div>

      {/* Top personas */}
      <div className="mb-5">
        <h5 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">
          Most Popular Personas
        </h5>
        <div className="grid grid-cols-2 gap-2">
          {data.topPersonas.map((p) => (
            <div key={p.id} className="glass rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">{p.emoji}</div>
              <p className="text-xs text-white/70 font-medium">{p.title}</p>
              <p className="text-xs text-fhir-purple font-bold">{p.percentage}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top data sources */}
      <div className="mb-5">
        <h5 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">
          Most Connected Data Sources
        </h5>
        <div className="space-y-2">
          {data.topDataSources.slice(0, 4).map((ds, i) => (
            <div key={ds.id} className="flex items-center gap-3">
              <span className="text-sm font-black text-fhir-accent w-6 text-center">#{i + 1}</span>
              <span className="text-lg">{ds.emoji}</span>
              <span className="text-sm text-white/70 flex-1">{ds.title}</span>
              <span className="text-xs text-white/40 font-bold">{ds.votes} picks</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top capabilities */}
      {data.topCapabilities.length > 0 && (
        <div>
          <h5 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">
            Most Wanted Capabilities
          </h5>
          <div className="space-y-2">
            {data.topCapabilities.map((c, i) => (
              <div key={c.id} className="flex items-center gap-3 glass rounded-lg p-2">
                <span className="text-sm font-black text-fhir-purple w-6 text-center">#{i + 1}</span>
                <span className="text-sm">{c.icon}</span>
                <div className="flex-1">
                  <span className="text-sm text-white/80 font-medium">{c.title}</span>
                  <span className="text-xs text-white/30 ml-2">{c.catEmoji} {c.catTitle}</span>
                </div>
                <span className="text-xs text-white/40 font-bold">{c.votes}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
