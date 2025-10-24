'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import Toast from '@/components/Toast';

interface App {
  id: string;
  name: string;
  description: string;
  pricing: string;
  rating: number;
  totalReviews: number;
  icon: string;
  category: string;
  features: string[];
}

const mockApps: App[] = [
  {
    id: 'patient-timeline',
    name: 'Patient Timeline',
    description: 'Visualize patient health journey with interactive timeline showing conditions, procedures, medications, and key events.',
    pricing: 'Free',
    rating: 4.5,
    totalReviews: 127,
    icon: '📅',
    category: 'Patient Care',
    features: ['Real-time updates', 'Multi-source aggregation', 'Export to PDF']
  },
  {
    id: 'care-gaps-ai',
    name: 'Care Gaps AI Widget',
    description: 'AI-powered care gap detection using clinical guidelines. Identifies missing preventive care and generates action recommendations.',
    pricing: '$0.05/call',
    rating: 4.8,
    totalReviews: 243,
    icon: '🎯',
    category: 'Quality Improvement',
    features: ['AI-powered analysis', 'Clinical guidelines', 'Automated alerts']
  },
  {
    id: 'claims-visualizer',
    name: 'Claims Visualizer',
    description: 'Enterprise-grade claims and cost analytics. Identify utilization patterns, high-cost patients, and opportunities for intervention.',
    pricing: 'Enterprise',
    rating: 4.2,
    totalReviews: 89,
    icon: '💰',
    category: 'Financial Analytics',
    features: ['Cost tracking', 'Utilization insights', 'Custom reports']
  }
];

export default function AppCatalogPage() {
  const [enabledApps, setEnabledApps] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{ message: string; show: boolean } | null>(null);

  const handleEnableApp = (appId: string, appName: string) => {
    // Simulate policy engine check
    setTimeout(() => {
      setEnabledApps(prev => new Set([...prev, appId]));
      setToast({
        message: `✅ Policy engine applied — ${appName} activated`,
        show: true
      });
    }, 500);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-500">⭐</span>
        ))}
        {hasHalfStar && <span className="text-yellow-500">⭐</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-slate-300 dark:text-slate-700">⭐</span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <NavBar />

      {/* Toast Notification */}
      {toast?.show && (
        <Toast
          message={toast.message}
          type="success"
          onClose={() => setToast(null)}
        />
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            FHIR Platform App Catalog
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Governed marketplace of pre-approved health apps. Enable apps for your organization with one click.
          </p>
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mockApps.map((app) => {
            const isEnabled = enabledApps.has(app.id);

            return (
              <div
                key={app.id}
                className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl transition-shadow"
              >
                {/* App Icon & Name */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{app.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                        {app.name}
                      </h3>
                      <span className="text-sm text-slate-500 dark:text-slate-500">
                        {app.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {app.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {app.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  {renderStars(app.rating)}
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    ({app.totalReviews} reviews)
                  </span>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                    {app.pricing}
                  </span>
                </div>

                {/* Enable Button */}
                <button
                  onClick={() => handleEnableApp(app.id, app.name)}
                  disabled={isEnabled}
                  className={`w-full px-4 py-3 rounded-lg font-semibold transition-all ${
                    isEnabled
                      ? 'bg-green-600 text-white cursor-default'
                      : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
                  }`}
                >
                  {isEnabled ? '✓ Enabled for My Org' : 'Enable for My Org'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Governance Features */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-950/30 dark:to-blue-950/30 rounded-lg border border-teal-200 dark:border-teal-800 p-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 text-center">
            Platform Governance Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                App Review
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                All apps undergo security, privacy, and clinical safety review before catalog listing.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Audit Logs
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Complete audit trail of all data access, app usage, and administrative actions.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">🔴</div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Kill-Switch
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Instantly revoke app access platform-wide in case of security incidents or policy violations.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
              Additional Governance Controls:
            </h4>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 dark:text-teal-400">✓</span>
                <span>Automated policy enforcement based on organization rules</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 dark:text-teal-400">✓</span>
                <span>Rate limiting and usage quotas per app</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 dark:text-teal-400">✓</span>
                <span>Data minimization - apps only access necessary data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 dark:text-teal-400">✓</span>
                <span>Patient consent management integrated</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 dark:text-teal-400">✓</span>
                <span>Real-time monitoring and anomaly detection</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-2xl mx-auto mt-12 text-center bg-white dark:bg-slate-900 p-8 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Want to List Your App?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Submit your app for review and reach thousands of healthcare organizations through the FHIR Platform.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all">
            Submit App for Review
          </button>
        </div>
      </div>
    </div>
  );
}
