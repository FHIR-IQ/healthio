import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FHIR IQ | HIMSS 2026",
  description:
    "Test your FHIR knowledge with the IQ Challenge and design the future of health IT with the HTI-6 Builder. From the Out of the FHIR podcast & FHIR IQ Playbook.",
  keywords: [
    "FHIR",
    "HIMSS 2026",
    "interoperability",
    "healthcare IT",
    "HL7",
    "badge",
    "quiz",
    "HTI-6",
    "ONC",
    "ASTP",
    "health IT regulation",
  ],
  openGraph: {
    title: "FHIR IQ Badge | HIMSS 2026",
    description:
      "How well do you know FHIR? Take the challenge and earn your badge!",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FHIR IQ Badge Challenge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FHIR IQ Badge | HIMSS 2026",
    description:
      "How well do you know FHIR? Take the challenge and earn your badge!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-fhir-deeper">
        <div className="bg-grid min-h-screen">{children}</div>
      </body>
    </html>
  );
}
