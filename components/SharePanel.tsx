"use client";

import { useState } from "react";
import { BadgeResult, getShareText, getShareableBadgeUrl, getLinkedInShareUrl, badgeConfig } from "@/lib/badge";

interface SharePanelProps {
  badgeResult: BadgeResult;
}

export default function SharePanel({ badgeResult }: SharePanelProps) {
  const [copied, setCopied] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSmsInput, setShowSmsInput] = useState(false);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const badgeUrl = getShareableBadgeUrl(badgeResult, baseUrl);
  const shareText = getShareText(badgeResult);
  const fullShareText = `${shareText} ${badgeUrl}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(badgeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement("textarea");
      el.value = badgeUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLinkedIn = () => {
    const url = getLinkedInShareUrl(badgeResult, baseUrl);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSMS = () => {
    if (phoneNumber) {
      const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(fullShareText)}`;
      window.open(smsUrl);
    } else {
      // Open native SMS with pre-filled text
      const smsUrl = `sms:?body=${encodeURIComponent(fullShareText)}`;
      window.open(smsUrl);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `FHIR IQ ${badgeConfig[badgeResult.tier].label} Badge`,
          text: shareText,
          url: badgeUrl,
        });
      } catch {
        // User cancelled
      }
    }
  };

  const handleTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullShareText)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="animate-slide-up">
      <h3 className="text-lg font-bold text-white mb-4">Share Your Badge</h3>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* LinkedIn */}
        <button
          onClick={handleLinkedIn}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </button>

        {/* Twitter/X */}
        <button
          onClick={handleTwitter}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-black border border-white/20 hover:bg-white/10 text-white font-semibold transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Post
        </button>

        {/* SMS */}
        <button
          onClick={() => setShowSmsInput(!showSmsInput)}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Text
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl glass hover:bg-white/10 text-white font-semibold transition-colors ${
            copied ? "bg-green-500/20 border-green-500/50" : ""
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* SMS Input */}
      {showSmsInput && (
        <div className="glass rounded-xl p-4 mb-4 animate-slide-up">
          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="Phone number (optional)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-fhir-accent"
            />
            <button
              onClick={handleSMS}
              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
            >
              Send
            </button>
          </div>
          <p className="text-white/30 text-xs mt-2">
            Leave blank to open your default messaging app
          </p>
        </div>
      )}

      {/* Native Share (mobile) */}
      {typeof navigator !== "undefined" && "share" in navigator && (
        <button
          onClick={handleNativeShare}
          className="w-full py-3 rounded-xl glass hover:bg-white/10 text-white/70 font-medium transition-colors text-sm"
        >
          More sharing options...
        </button>
      )}
    </div>
  );
}
