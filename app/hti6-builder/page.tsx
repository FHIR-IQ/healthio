"use client";

import { useState } from "react";
import HTI6Builder from "@/components/HTI6Builder";
import FireIcon from "@/components/FireIcon";

export default function HTI6BuilderPage() {
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
    // Navigate to main page
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  if (started) {
    return (
      <main className="min-h-screen py-8">
        <div className="text-center mb-8 px-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-lg">🏗️</span>
            <span className="text-sm font-bold tracking-wider text-fhir-accent uppercase">
              HTI-6 Builder
            </span>
            <span className="text-lg">🏗️</span>
          </div>
          <p className="text-white/40 text-sm">
            Building as{" "}
            <span className="text-white/70 font-semibold">{playerName}</span>
          </p>
        </div>
        <HTI6Builder playerName={playerName} onBack={handleBack} />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Floating icon */}
        <div className="animate-float mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-fhir-deeper flex items-center justify-center">
              <span className="text-5xl">🏗️</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xs font-bold tracking-[0.3em] text-fhir-accent uppercase">
              HIMSS 2026
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="hti6-gradient-text">HTI-6 Builder</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light mb-2">
            Design the future of health IT regulation
          </p>
          <p className="text-white/40 max-w-md mx-auto">
            HTI-5 set the foundation. Now shape what comes next — allocate
            priorities, pick policies, and see what the community wants for
            HTI-6.
          </p>
        </div>

        {/* Pillar preview */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 animate-slide-up max-w-md">
          {[
            { emoji: "🧑‍⚕️", label: "Patients" },
            { emoji: "🤖", label: "AI" },
            { emoji: "🔗", label: "Interop" },
            { emoji: "✅", label: "Quality" },
            { emoji: "⚡", label: "Burden" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center text-lg mx-auto mb-1">
                {item.emoji}
              </div>
              <span className="text-[10px] text-white/40">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Name input & start */}
        <div className="w-full max-w-sm animate-slide-up">
          <div className="glass-strong rounded-2xl p-6">
            <label className="block text-sm text-white/50 mb-2 font-medium">
              Your Name (for the blueprint)
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleStart()}
              placeholder="Enter your name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-fhir-accent transition-colors mb-4 text-lg"
              maxLength={30}
              autoFocus
            />
            <button
              onClick={handleStart}
              disabled={!nameInput.trim()}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Start Building 🏗️
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-10 max-w-lg animate-fade-in">
          <div className="text-center">
            <div className="text-2xl mb-1">📊</div>
            <p className="text-xs text-white/40">Community Leaderboard</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">💼</div>
            <p className="text-xs text-white/40">Share on LinkedIn</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🏛️</div>
            <p className="text-xs text-white/40">Shape Policy</p>
          </div>
        </div>

        {/* Link to FHIR IQ */}
        <div className="mt-8">
          <a
            href="/"
            className="text-sm text-white/30 hover:text-fhir-flame transition-colors"
          >
            ← Back to FHIR IQ Games
          </a>
        </div>
      </div>

      {/* Footer */}
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
