"use client";

import { BadgeTier, badgeConfig } from "@/lib/badge";

interface BadgeVisualProps {
  tier: BadgeTier;
  name: string;
  score: number;
  total: number;
  badgeId: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export default function BadgeVisual({
  tier,
  name,
  score,
  total,
  badgeId,
  size = "md",
  animated = true,
}: BadgeVisualProps) {
  const config = badgeConfig[tier];
  const percentage = Math.round((score / total) * 100);

  const sizeClasses = {
    sm: "w-48 h-48",
    md: "w-72 h-72",
    lg: "w-96 h-96",
  };

  const textSizes = {
    sm: { title: "text-xs", score: "text-lg", name: "text-[10px]", id: "text-[8px]" },
    md: { title: "text-sm", score: "text-2xl", name: "text-xs", id: "text-[10px]" },
    lg: { title: "text-base", score: "text-3xl", name: "text-sm", id: "text-xs" },
  };

  const ts = textSizes[size];

  return (
    <div
      className={`${sizeClasses[size]} relative ${animated ? "animate-badge-spin" : ""}`}
      id="badge-visual"
    >
      {/* Outer glow ring */}
      <div
        className={`absolute inset-0 rounded-full badge-glow-${tier} opacity-60`}
      />

      {/* Main badge circle */}
      <div
        className={`relative ${sizeClasses[size]} rounded-full bg-gradient-to-br ${config.gradient} p-[3px]`}
      >
        <div className="w-full h-full rounded-full bg-fhir-deeper flex flex-col items-center justify-center relative overflow-hidden">
          {/* Inner gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-[0.07]`}
          />

          {/* Decorative ring */}
          <div
            className={`absolute inset-3 rounded-full border ${config.borderColor} opacity-30`}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <span className={`${ts.title} font-bold uppercase tracking-[0.2em] ${config.textColor} mb-1`}>
              {config.label}
            </span>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-2xl">{config.emoji}</span>
            </div>
            <span className={`${ts.score} font-black ${config.textColor}`}>
              {percentage}%
            </span>
            <span className={`${ts.title} text-white/60 mb-1`}>
              {score}/{total} correct
            </span>

            {/* Divider */}
            <div className={`w-12 h-px bg-gradient-to-r from-transparent via-current to-transparent ${config.textColor} opacity-40 my-1`} />

            <span className={`${ts.name} font-semibold text-white/90 truncate max-w-full`}>
              {name}
            </span>
            <span className={`${ts.title} text-white/40 mt-0.5`}>
              FHIR IQ • HIMSS 2026
            </span>
            <span className={`${ts.id} text-white/30 font-mono mt-0.5`}>
              {badgeId}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
