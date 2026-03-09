"use client";

import { useState } from "react";
import FireIcon from "@/components/FireIcon";
import QuizEngine from "@/components/QuizEngine";

type AppState = "landing" | "quiz";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [playerName, setPlayerName] = useState("");
  const [nameInput, setNameInput] = useState("");

  const handleStart = () => {
    if (nameInput.trim()) {
      setPlayerName(nameInput.trim());
      setAppState("quiz");
    }
  };

  const handleRestart = () => {
    setAppState("landing");
    setPlayerName("");
    setNameInput("");
  };

  if (appState === "quiz") {
    return (
      <main className="min-h-screen py-8">
        {/* Header */}
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

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Floating badge preview */}
        <div className="animate-float mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-fhir-flame to-fhir-ember p-[2px]">
            <div className="w-full h-full rounded-full bg-fhir-deeper flex items-center justify-center">
              <FireIcon className="w-12 h-12" />
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
            <span className="gradient-text">FHIR IQ</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light mb-2">
            How well do you know FHIR?
          </p>
          <p className="text-white/40 max-w-md mx-auto">
            Take the 10-question challenge, earn your badge, and share it with
            the world. Bronze, Silver, or Gold — where do you rank?
          </p>
        </div>

        {/* Badge tiers preview */}
        <div className="flex items-center gap-6 mb-10 animate-slide-up">
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 via-amber-600 to-orange-700 p-[2px] mx-auto mb-2">
              <div className="w-full h-full rounded-full bg-fhir-deeper flex items-center justify-center text-lg">
                🥉
              </div>
            </div>
            <span className="text-xs text-white/40">50%+</span>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-300 via-slate-300 to-gray-400 p-[2px] mx-auto mb-2">
              <div className="w-full h-full rounded-full bg-fhir-deeper flex items-center justify-center text-lg">
                🥈
              </div>
            </div>
            <span className="text-xs text-white/40">70%+</span>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 via-amber-400 to-yellow-600 p-[2px] mx-auto mb-2 badge-glow-gold">
              <div className="w-full h-full rounded-full bg-fhir-deeper flex items-center justify-center text-lg">
                🏆
              </div>
            </div>
            <span className="text-xs text-white/40">90%+</span>
          </div>
        </div>

        {/* Name input & start */}
        <div className="w-full max-w-sm animate-slide-up">
          <div className="glass-strong rounded-2xl p-6">
            <label className="block text-sm text-white/50 mb-2 font-medium">
              Your Name (for the badge)
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleStart()}
              placeholder="Enter your name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-fhir-flame transition-colors mb-4 text-lg"
              maxLength={30}
              autoFocus
            />
            <button
              onClick={handleStart}
              disabled={!nameInput.trim()}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-fhir-flame to-fhir-ember text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Start Challenge 🔥
            </button>
          </div>
        </div>

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
