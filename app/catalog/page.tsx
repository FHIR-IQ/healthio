'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import { mockCatalog, DataHolder } from '@/lib/mock-data/catalog';

export default function CatalogPage() {
  const [selectedHolder, setSelectedHolder] = useState<DataHolder | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const types = ['all', ...Array.from(new Set(mockCatalog.map(h => h.type)))];

  const filteredCatalog = filterType === 'all'
    ? mockCatalog
    : mockCatalog.filter(h => h.type === filterType);

  const totalPatients = mockCatalog.reduce((sum, h) => sum + h.patients, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Join the Network. Reach Every App.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-6">
            Register once with the FHIR Platform. Instantly connect to all approved applications.
            No custom integrations. No per-app negotiations.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {mockCatalog.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Data Holders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {(totalPatients / 1000000).toFixed(1)}M+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Patients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                100%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">FHIR R4</div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                filterType === type
                  ? 'bg-green-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCatalog.map(holder => (
            <div
              key={holder.id}
              onClick={() => setSelectedHolder(holder)}
              className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{holder.logo}</div>
                <span className={`text-xs px-2 py-1 rounded ${
                  holder.status === 'active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                }`}>
                  {holder.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                {holder.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-500 mb-3">
                {holder.type}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {holder.description}
              </p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  {(holder.patients / 1000).toLocaleString()}K patients
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  View Details →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-200 mb-8">
            Why Join the Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                Instant App Marketplace
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Connect to hundreds of pre-approved apps instantly. No custom API work per app.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                Platform Security
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Centralized security, audit logs, and compliance monitoring. OAuth 2.0 + SMART on FHIR.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                Analytics & Insights
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                See which apps your patients use. Track API usage. Monitor data quality metrics.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800">
              <div className="text-3xl mb-3">🔧</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                Managed Infrastructure
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Platform handles versioning, deprecations, and upgrades. Stay current with zero downtime.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 p-8 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Ready to Join?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Register your organization and start connecting to the ecosystem today.
          </p>
          <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Register Your Organization
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedHolder && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedHolder(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{selectedHolder.logo}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                      {selectedHolder.name}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">{selectedHolder.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedHolder(null)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Description</h3>
                <p className="text-slate-600 dark:text-slate-400">{selectedHolder.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Capabilities</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedHolder.capabilities.map((cap, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">API Version</h3>
                  <p className="text-slate-600 dark:text-slate-400">{selectedHolder.apiVersion}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Patients</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {selectedHolder.patients.toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Integration Method</h3>
                <p className="text-slate-600 dark:text-slate-400">{selectedHolder.integrationMethod}</p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedHolder.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
