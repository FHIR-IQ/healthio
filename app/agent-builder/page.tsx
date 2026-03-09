"use client";

import { useState } from "react";
import HealthAgentBuilder from "@/components/HealthAgentBuilder";

export default function AgentBuilderPage() {
  const [started, setStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [nameInput, setNameInput] = useState("");

  const handleStart = () => {
    if (nameInput.trim()) {
      setPlayerName(nameInput.trim());
      setStarted(true);
    }
  };

  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  if (started) {
    return (
      <main className="min-h-screen py-8">
        <div className="text-center mb-8 px-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-lg">🤖</span>
            <span className="text-sm font-bold tracking-wider text-fhir-purple uppercase">
              Healthcare Agent Builder
            </span>
            <span className="text-lg">🤖</span>
          </div>
          <p className="text-white/40 text-sm">
            Designing as{" "}
            <span className="text-white/70 font-semibold">{playerName}</span>
          </p>
        </div>
        <HealthAgentBuilder playerName={playerName} onBack={handleBack} />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="animate-float mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-fhir-deeper flex items-center justify-center">
              <span className="text-5xl">🤖</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xs font-bold tracking-[0.3em] text-fhir-purple uppercase">
              HIMSS 2026
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="agent-gradient-text">Agent Builder</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light mb-2">
            Design your AI healthcare concierge
          </p>
          <p className="text-white/40 max-w-md mx-auto">
            Build a personalized AI agent powered by FHIR + Claude that manages
            your health, navigates the system, and fights for your care.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 animate-slide-up max-w-md">
          {[
            { emoji: "🧭", label: "Navigate" },
            { emoji: "🛡️", label: "Advocate" },
            { emoji: "💪", label: "Coach" },
            { emoji: "🔬", label: "Analyze" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-violet-600/20 border border-purple-500/20 flex items-center justify-center text-lg mx-auto mb-1">
                {item.emoji}
              </div>
              <span className="text-[10px] text-white/40">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="w-full max-w-sm animate-slide-up">
          <div className="glass-strong rounded-2xl p-6">
            <label className="block text-sm text-white/50 mb-2 font-medium">
              Your Name
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleStart()}
              placeholder="Enter your name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-fhir-purple transition-colors mb-4 text-lg"
              maxLength={30}
              autoFocus
            />
            <button
              onClick={handleStart}
              disabled={!nameInput.trim()}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-fhir-purple to-violet-600 text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Start Building 🤖
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-10 max-w-lg animate-fade-in">
          <div className="text-center">
            <div className="text-2xl mb-1">📊</div>
            <p className="text-xs text-white/40">Community Builds</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">💼</div>
            <p className="text-xs text-white/40">Share on LinkedIn</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🔗</div>
            <p className="text-xs text-white/40">FHIR-Powered</p>
          </div>
        </div>

        <div className="mt-8">
          <a
            href="/"
            className="text-sm text-white/30 hover:text-fhir-purple transition-colors"
          >
            ← Back to FHIR IQ Games
          </a>
        </div>
      </div>

      <footer className="text-center py-8 px-4">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <a
              href="https://outofthefhir.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/40 hover:text-fhir-flame transition-colors"
            >
              Out of the FHIR Podcast
            </a>
            <span className="text-white/20">•</span>
            <a
              href="https://fhiriq.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/40 hover:text-fhir-accent transition-colors"
            >
              FHIR IQ Playbook
            </a>
          </div>
          <p className="text-xs text-white/20">
            Built for HIMSS 2026 — Las Vegas, NV
          </p>
        </div>
      </footer>
    </main>
  );
}
