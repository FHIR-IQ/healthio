import Link from 'next/link';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import NavBar from '@/components/NavBar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <NavBar />
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            From Plumbing to Possibility
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
            FHIR as the Platform
          </p>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            If you can prompt an LLM, you can build a health app —<br />
            <span className="font-semibold text-slate-700 dark:text-slate-300">because the platform does the FHIR.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up">
            <Link
              href="/builder-sandbox"
              className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px]"
            >
              <span className="relative z-10">I&apos;m a Builder</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="/catalog"
              className="group relative px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px]"
            >
              <span className="relative z-10">I&apos;m a Data Holder</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>

        {/* Architecture Diagram */}
        <div className="mb-16 animate-slide-up">
          <ArchitectureDiagram />
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-200">For Builders</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Focus on UX, not FHIR specs. The SDK handles data mapping, context, and events automatically.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🔌</div>
            <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-200">For Data Holders</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Join the catalog once. Instantly available to all apps. No custom integrations needed.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-200">Network Effect</h3>
            <p className="text-slate-600 dark:text-slate-400">
              More apps = more value for patients. More data holders = more reach for builders.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-slate-500 dark:text-slate-500 border-t border-slate-200 dark:border-slate-800 pt-8">
          <p className="text-sm">
            FHIR IQ Sandbox Demo © 2025
          </p>
        </footer>
      </main>
    </div>
  );
}
