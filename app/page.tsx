"use client";

import { useState } from "react";
import FireIcon from "@/components/FireIcon";
import QuizEngine from "@/components/QuizEngine";
import HTI6Builder from "@/components/HTI6Builder";

type AppState = "hub" | "quiz-landing" | "quiz" | "hti6-landing" | "hti6";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("hub");
  const [playerName, setPlayerName] = useState("");
  const [nameInput, setNameInput] = useState("");

  const handleStartQuiz = () => {
    if (nameInput.trim()) {
      setPlayerName(nameInput.trim());
      setAppState("quiz");
    }
  };

  const handleStartHTI6 = () => {
    if (nameInput.trim()) {
      setPlayerName(nameInput.trim());
      setAppState("hti6");
    }
  };

  const handleRestart = () => {
    setAppState("hub");
    setPlayerName("");
    setNameInput("");
  };

  // Quiz mode
  if (appState === "quiz") {
    return (
      <main className="min-h-screen py-8">
        <div className="text-center mb-8 px-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FireIcon className="w-6 h-6" />
            <span className="text-sm font-bold tracking-wider text-fhir-flame uppercase">
              FHIR IQ Challenge
            </span>
            <FireIcon className="w-6 h-6" />
          </div>
          <p className="text-white/40 text-sm">
            Playing as <span className="text-white/70 font-semibold">{playerName}</span>
          </p>
        </div>
        <QuizEngine playerName={playerName} onRestart={handleRestart} />
      </main>
    );
  }

  // HTI-6 Builder mode
  if (appState === "hti6") {
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
            Building as <span className="text-white/70 font-semibold">{playerName}</span>
          </p>
        </div>
        <HTI6Builder playerName={playerName} onBack={handleRestart} />
      </main>
    );
  }

  // Quiz landing (name entry for quiz)
  if (appState === "quiz-landing") {
    return (
      <main className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="animate-float mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-fhir-flame to-fhir-ember p-[2px]">
              <div className="w-full h-full rounded-full bg-fhir-deeper flex items-center justify-center">
                <FireIcon className="w-12 h-12" />
              </div>
            </div>
          </div>

          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-black mb-3">
              <span className="gradient-text">FHIR IQ Challenge</span>
            </h1>
            <p className="text-lg text-white/80 font-light mb-2">
              How well do you know FHIR?
            </p>
            <p className="text-white/40 max-w-md mx-auto text-sm">
              10 questions, 3 difficulty levels. Earn your Bronze, Silver, or Gold badge.
            </p>
          </div>

          <div className="flex items-center gap-6 mb-10 animate-slide-up">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 via-amber-600 to-orange-700 p-[2px] mx-auto mb-1">
                <div className="w-full h-full rounded-full bg-fhir-deeper flex items-center justify-center text-base">🥉</div>
              </div>
              <span className="text-[10px] text-white/40">50%+</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 via-slate-300 to-gray-400 p-[2px] mx-auto mb-1">
                <div className="w-full h-full rounded-full bg-fhir-deeper flex items-center justify-center text-base">🥈</div>
              </div>
              <span className="text-[10px] text-white/40">70%+</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 via-amber-400 to-yellow-600 p-[2px] mx-auto mb-1 badge-glow-gold">
                <div className="w-full h-full rounded-full bg-fhir-deeper flex items-center justify-center text-base">🏆</div>
              </div>
              <span className="text-[10px] text-white/40">90%+</span>
            </div>
          </div>

          <div className="w-full max-w-sm animate-slide-up">
            <div className="glass-strong rounded-2xl p-6">
              <label className="block text-sm text-white/50 mb-2 font-medium">
                Your Name (for the badge)
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleStartQuiz()}
                placeholder="Enter your name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-fhir-flame transition-colors mb-4 text-lg"
                maxLength={30}
                autoFocus
              />
              <button
                onClick={handleStartQuiz}
                disabled={!nameInput.trim()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-fhir-flame to-fhir-ember text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Start Challenge 🔥
              </button>
            </div>
          </div>

          <button
            onClick={() => { setAppState("hub"); setNameInput(""); }}
            className="mt-6 text-sm text-white/30 hover:text-white/60 transition-colors"
          >
            ← Back to Games
          </button>
        </div>
      </main>
    );
  }

  // HTI-6 landing (name entry)
  if (appState === "hti6-landing") {
    return (
      <main className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="animate-float mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-[2px]">
              <div className="w-full h-full rounded-full bg-fhir-deeper flex items-center justify-center">
                <span className="text-5xl">🏗️</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-black mb-3">
              <span className="hti6-gradient-text">HTI-6 Builder</span>
            </h1>
            <p className="text-lg text-white/80 font-light mb-2">
              Design the future of health IT regulation
            </p>
            <p className="text-white/40 max-w-md mx-auto text-sm">
              ASTP set the stage with HTI-1 through HTI-5. Now allocate priorities, pick policies, and see what the community wants for HTI-6.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10 animate-slide-up">
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

          <div className="w-full max-w-sm animate-slide-up">
            <div className="glass-strong rounded-2xl p-6">
              <label className="block text-sm text-white/50 mb-2 font-medium">
                Your Name (for the blueprint)
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleStartHTI6()}
                placeholder="Enter your name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-fhir-accent transition-colors mb-4 text-lg"
                maxLength={30}
                autoFocus
              />
              <button
                onClick={handleStartHTI6}
                disabled={!nameInput.trim()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Start Building 🏗️
              </button>
            </div>
          </div>

          <button
            onClick={() => { setAppState("hub"); setNameInput(""); }}
            className="mt-6 text-sm text-white/30 hover:text-white/60 transition-colors"
          >
            ← Back to Games
          </button>
        </div>
      </main>
    );
  }

  // Hub - game selection
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Hero */}
        <div className="animate-float mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-fhir-flame to-fhir-accent p-[2px]">
            <div className="w-full h-full rounded-full bg-fhir-deeper flex items-center justify-center">
              <FireIcon className="w-10 h-10" />
            </div>
          </div>
        </div>

        <div className="text-center mb-10 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xs font-bold tracking-[0.3em] text-fhir-accent uppercase">
              HIMSS 2026
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-3">
            <span className="gradient-text">FHIR IQ</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-light">
            Test your knowledge. Shape the future.
          </p>
        </div>

        {/* Game Cards */}
        <div className="w-full max-w-lg space-y-4 animate-slide-up">
          {/* FHIR IQ Quiz Card */}
          <button
            onClick={() => setAppState("quiz-landing")}
            className="w-full text-left glass-strong rounded-2xl p-6 border border-fhir-flame/20 hover:border-fhir-flame/40 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fhir-flame to-fhir-ember flex items-center justify-center flex-shrink-0">
                <FireIcon className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-black text-white group-hover:text-fhir-flame transition-colors">
                    FHIR IQ Challenge
                  </h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-fhir-flame/20 text-fhir-flame font-bold uppercase">
                    Quiz
                  </span>
                </div>
                <p className="text-white/50 text-sm mb-3">
                  10-question challenge across 3 difficulty levels. Earn your Bronze, Silver, or Gold badge and share it.
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/30 flex items-center gap-1">🥉🥈🏆 Earn Badges</span>
                  <span className="text-white/10">|</span>
                  <span className="text-xs text-white/30">~ 3 min</span>
                </div>
              </div>
              <svg className="w-5 h-5 text-white/20 group-hover:text-white/50 transition-colors mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          {/* HTI-6 Builder Card */}
          <button
            onClick={() => setAppState("hti6-landing")}
            className="w-full text-left glass-strong rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all group relative overflow-hidden"
          >
            {/* NEW badge */}
            <div className="absolute top-3 right-3">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-bold uppercase border border-green-500/30">
                New
              </span>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">🏗️</span>
              </div>
              <div className="flex-1 pr-8">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-black text-white group-hover:text-fhir-accent transition-colors">
                    HTI-6 Builder
                  </h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-fhir-accent font-bold uppercase">
                    Strategy
                  </span>
                </div>
                <p className="text-white/50 text-sm mb-3">
                  Design the next health IT regulation. Allocate priorities across patient empowerment, AI, interoperability, data quality, and burden reduction.
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/30 flex items-center gap-1">📊 Leaderboard</span>
                  <span className="text-white/10">|</span>
                  <span className="text-xs text-white/30 flex items-center gap-1">💼 Share on LinkedIn</span>
                </div>
              </div>
              <svg className="w-5 h-5 text-white/20 group-hover:text-white/50 transition-colors mt-1 flex-shrink-0 absolute right-6 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Quick name entry for HTI-6 (inline) */}

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-10 max-w-lg animate-fade-in">
          <div className="text-center">
            <div className="text-2xl mb-1">📱</div>
            <p className="text-xs text-white/40">Share via Text</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">💼</div>
            <p className="text-xs text-white/40">Post to LinkedIn</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🤖</div>
            <p className="text-xs text-white/40">AI-Powered</p>
          </div>
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
