import { NextRequest, NextResponse } from "next/server";
import { badgeConfig, BadgeTier } from "@/lib/badge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tier = searchParams.get("tier") as BadgeTier | null;
  const name = searchParams.get("name");
  const score = searchParams.get("score");
  const total = searchParams.get("total");
  const badgeId = searchParams.get("id");

  if (!tier || !name || !score || !total || !badgeId) {
    return NextResponse.json(
      { error: "Missing parameters" },
      { status: 400 }
    );
  }

  const config = badgeConfig[tier];
  const percentage = Math.round((parseInt(score) / parseInt(total)) * 100);
  const origin = request.nextUrl.origin;
  const badgeUrl = `${origin}/badge/${badgeId}?t=${tier}&n=${encodeURIComponent(name)}&s=${score}&q=${total}`;

  return NextResponse.json({
    url: badgeUrl,
    text: `🔥 ${name} earned a ${config.emoji} ${config.label} FHIR IQ Badge at HIMSS 2026! Score: ${percentage}% — ${config.title} level!`,
    linkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(badgeUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `🔥 I just earned a ${config.emoji} ${config.label} FHIR IQ Badge at HIMSS 2026! ${percentage}% — ${config.title}! Test yours 👉 ${badgeUrl}`
    )}`,
    sms: `sms:?body=${encodeURIComponent(
      `${config.emoji} I just earned a ${config.label} FHIR IQ Badge at HIMSS 2026! Score: ${percentage}%. Take the challenge: ${badgeUrl}`
    )}`,
  });
}
