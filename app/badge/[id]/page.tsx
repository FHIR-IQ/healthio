"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BadgeResult, badgeConfig } from "@/lib/badge";
import { getBadgeById } from "@/lib/storage";
import BadgeVisual from "@/components/BadgeVisual";
import SharePanel from "@/components/SharePanel";
import FireIcon from "@/components/FireIcon";

export default function BadgePage() {
  const params = useParams();
  const badgeId = params.id as string;
  const [badge, setBadge] = useState<BadgeResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load from local storage
    const stored = getBadgeById(badgeId);
    if (stored) {
      setBadge(stored);
    } else {
      // Try URL params as fallback
      const urlParams = new URLSearchParams(window.location.search);
      const tier = urlParams.get("t") as BadgeResult["tier"] | null;
      const name = urlParams.get("n");
      const score = urlParams.get("s");
      const total = urlParams.get("q");

      if (tier && name && score && total) {
        setBadge({
          tier,
          name: decodeURIComponent(name),
          score: parseInt(score),
          totalQuestions: parseInt(total),
          percentage: Math.round(
            (parseInt(score) / parseInt(total)) * 100
          ),
          date: new Date().toISOString(),
          badgeId,
        });
      }
    }
    setLoading(false);
  }, [badgeId]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-fhir-flame border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!badge) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <FireIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <h1 className="text-2xl font-bold text-white mb-2">
            Badge Not Found
          </h1>
          <p className="text-white/50 mb-6">
            This badge may have been created on a different device.
          </p>
          <a
            href="/"
            className="inline-block py-3 px-8 rounded-xl bg-gradient-to-r from-fhir-flame to-fhir-ember text-white font-bold hover:opacity-90 transition-opacity"
          >
            Take the FHIR IQ Challenge →
          </a>
        </div>
      </main>
    );
  }

  const config = badgeConfig[badge.tier];

  return (
    <main className="min-h-screen py-8 px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <a href="/" className="inline-flex items-center gap-2 mb-4 group">
          <FireIcon className="w-5 h-5" />
          <span className="text-sm font-bold tracking-wider text-fhir-flame uppercase group-hover:text-fhir-ember transition-colors">
            FHIR IQ
          </span>
        </a>
        <p className="text-white/40 text-xs tracking-wider uppercase">
          HIMSS 2026 Badge
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        {/* Badge holder name */}
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
            {badge.name}
          </h1>
          <p className={`text-lg ${config.textColor}`}>
            {config.emoji} {config.title}
          </p>
        </div>

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <BadgeVisual
            tier={badge.tier}
            name={badge.name}
            score={badge.score}
            total={badge.totalQuestions}
            badgeId={badge.badgeId}
            size="lg"
            animated={false}
          />
        </div>

        {/* Description */}
        <div className="glass-strong rounded-2xl p-6 mb-6 text-center animate-slide-up">
          <p className="text-white/70">{config.description}</p>
        </div>

        {/* CTA */}
        <div className="text-center mb-8 animate-slide-up">
          <a
            href="/"
            className="inline-block py-4 px-8 rounded-xl bg-gradient-to-r from-fhir-flame to-fhir-ember text-white font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Test Your FHIR IQ 🔥
          </a>
        </div>

        {/* Share */}
        <SharePanel badgeResult={badge} />

        {/* Footer links */}
        <div className="text-center mt-10">
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://outofthefhir.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/40 hover:text-fhir-flame transition-colors"
            >
              Out of the FHIR
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
        </div>
      </div>
    </main>
  );
}
