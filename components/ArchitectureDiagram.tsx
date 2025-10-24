'use client';

export default function ArchitectureDiagram() {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg border-2 border-slate-300 dark:border-slate-700 shadow-xl">
      <div className="font-mono text-xs sm:text-sm leading-relaxed">
        <div className="text-center mb-6 text-slate-700 dark:text-slate-300">
          <div className="text-lg font-bold mb-2">FHIR Platform Architecture</div>
          <div className="text-xs opacity-75">Unified API + SDK + Marketplace</div>
        </div>

        <pre className="text-slate-800 dark:text-slate-200">
{`┌─────────────────────────────────────────────────────────┐
│                    BUILDER APPS                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ Wellness │  │  Care    │  │ Research │             │
│  │   App    │  │  Coord.  │  │   Tool   │  ... + AI   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘             │
└───────┼─────────────┼─────────────┼───────────────────┘
        │             │             │
        └─────────────┴─────────────┘
                      │
        ┌─────────────▼─────────────┐
        │    FHIR PLATFORM SDK      │
        │  ┌─────────────────────┐  │
        │  │ • Patient Context   │  │
        │  │ • Auto-Mapping      │  │
        │  │ • Smart Events      │  │
        │  │ • No FHIR Knowledge │  │
        │  │   Required!         │  │
        │  └─────────────────────┘  │
        └─────────────┬─────────────┘
                      │
        ┌─────────────▼─────────────┐
        │   UNIFIED FHIR API        │
        │   (Platform Gateway)      │
        └─────────────┬─────────────┘
                      │
        ┌─────────────▼─────────────┐
        │  DATA HOLDER CATALOG      │
        │  ┌────┐ ┌────┐ ┌────┐    │
        │  │EHR │ │Lab │ │PHR │    │
        │  │ A  │ │ B  │ │ C  │    │
        │  └────┘ └────┘ └────┘    │
        └───────────────────────────┘`}
        </pre>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded border border-blue-300 dark:border-blue-700">
            <div className="font-bold text-blue-900 dark:text-blue-100">Builders</div>
            <div className="text-blue-700 dark:text-blue-300">Build without FHIR</div>
          </div>
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded border border-purple-300 dark:border-purple-700">
            <div className="font-bold text-purple-900 dark:text-purple-100">Platform</div>
            <div className="text-purple-700 dark:text-purple-300">Handles complexity</div>
          </div>
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded border border-green-300 dark:border-green-700">
            <div className="font-bold text-green-900 dark:text-green-100">Data Holders</div>
            <div className="text-green-700 dark:text-green-300">Plug & play</div>
          </div>
        </div>
      </div>
    </div>
  );
}
