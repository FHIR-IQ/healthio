import { NextRequest, NextResponse } from "next/server";
import { BadgeResult, badgeConfig } from "@/lib/badge";

export async function POST(request: NextRequest) {
  try {
    const body: BadgeResult = await request.json();
    const { tier, name, score, totalQuestions, percentage, badgeId } = body;

    if (!tier || !name || !badgeId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const config = badgeConfig[tier];
    const badgeUrl = `${request.nextUrl.origin}/badge/${badgeId}`;

    // Generate share URLs
    const shareData = {
      badgeUrl,
      shareText: `🔥 I just earned a ${config.emoji} ${config.label} FHIR IQ Badge at HIMSS 2026! Scored ${percentage}% — ${config.title} level!\n\nTest your FHIR knowledge too 👉 ${badgeUrl}`,
      linkedInUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(badgeUrl)}`,
      twitterUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `🔥 I just earned a ${config.emoji} ${config.label} FHIR IQ Badge at HIMSS 2026! Scored ${percentage}% — ${config.title} level!\n\nTest your FHIR knowledge too 👉 ${badgeUrl}`
      )}`,
      smsBody: `${config.emoji} Check out my FHIR IQ Badge! I scored ${percentage}% at HIMSS 2026. Take the challenge: ${badgeUrl}`,
      badge: {
        tier,
        name,
        score,
        totalQuestions,
        percentage,
        badgeId,
        title: config.title,
        label: config.label,
      },
    };

    return NextResponse.json(shareData);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate badge data" },
      { status: 500 }
    );
  }
}
