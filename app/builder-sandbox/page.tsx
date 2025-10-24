'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import { templates, mockFHIRInput, mockSDKOutput, Template } from '@/lib/mock-data/templates';

type DeploymentStep = 'idle' | 'connecting' | 'connected' | 'subscribing' | 'subscribed' | 'listing' | 'complete';

export default function BuilderSandboxPage() {
  const [apiKey] = useState('sk_test_fhir1234abcd');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [deploymentStep, setDeploymentStep] = useState<DeploymentStep>('idle');
  const [showFHIRData, setShowFHIRData] = useState(false);

  const deployToSandbox = async () => {
    if (!selectedTemplate) return;

    setDeploymentStep('connecting');
    await delay(1000);

    setDeploymentStep('connected');
    await delay(800);

    setDeploymentStep('subscribing');
    await delay(1000);

    setDeploymentStep('subscribed');
    await delay(800);

    setDeploymentStep('listing');
    await delay(1000);

    setDeploymentStep('complete');
    setShowFHIRData(true);
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const resetDemo = () => {
    setDeploymentStep('idle');
    setShowFHIRData(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Developer Sandbox
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Select a template, deploy to sandbox, and see how the platform transforms FHIR into simple, usable data structures.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left Column - Setup */}
          <div className="space-y-6">
            {/* API Key */}
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">API Key</h3>
              <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800 rounded font-mono text-sm">
                <span className="text-slate-700 dark:text-slate-300">{apiKey}</span>
                <button className="ml-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 text-xs">
                  Copy
                </button>
              </div>
            </div>

            {/* Template Selection */}
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Select Template</h3>
              <div className="space-y-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTemplate?.id === template.id
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{template.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                          {template.name}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {template.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {template.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deploy Button */}
            <button
              onClick={deployToSandbox}
              disabled={!selectedTemplate || (deploymentStep !== 'idle' && deploymentStep !== 'complete')}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {deploymentStep === 'idle' ? 'Deploy to Sandbox' : deploymentStep === 'complete' ? 'Deployed!' : 'Deploying...'}
            </button>

            {deploymentStep === 'complete' && (
              <button
                onClick={resetDemo}
                className="w-full px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors"
              >
                Reset Demo
              </button>
            )}
          </div>

          {/* Right Column - Progress & Data */}
          <div className="space-y-6">
            {/* Deployment Progress */}
            {deploymentStep !== 'idle' && (
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Deployment Progress</h3>
                <div className="space-y-3">
                  {/* Step 1: Connecting */}
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      deploymentStep === 'connecting'
                        ? 'bg-blue-600 animate-pulse'
                        : ['connected', 'subscribing', 'subscribed', 'listing', 'complete'].includes(deploymentStep)
                        ? 'bg-green-600'
                        : 'bg-slate-300 dark:bg-slate-700'
                    }`}>
                      {['connected', 'subscribing', 'subscribed', 'listing', 'complete'].includes(deploymentStep) && (
                        <span className="text-white text-sm">✓</span>
                      )}
                    </div>
                    <span className={`font-medium ${
                      ['connecting', 'connected', 'subscribing', 'subscribed', 'listing', 'complete'].includes(deploymentStep)
                        ? 'text-slate-800 dark:text-slate-200'
                        : 'text-slate-400 dark:text-slate-600'
                    }`}>
                      Connected to Platform
                    </span>
                  </div>

                  {/* Step 2: Subscribing */}
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      deploymentStep === 'subscribing'
                        ? 'bg-blue-600 animate-pulse'
                        : ['subscribed', 'listing', 'complete'].includes(deploymentStep)
                        ? 'bg-green-600'
                        : 'bg-slate-300 dark:bg-slate-700'
                    }`}>
                      {['subscribed', 'listing', 'complete'].includes(deploymentStep) && (
                        <span className="text-white text-sm">✓</span>
                      )}
                    </div>
                    <span className={`font-medium ${
                      ['subscribing', 'subscribed', 'listing', 'complete'].includes(deploymentStep)
                        ? 'text-slate-800 dark:text-slate-200'
                        : 'text-slate-400 dark:text-slate-600'
                    }`}>
                      Subscribed to Events
                    </span>
                  </div>

                  {/* Step 3: Listed */}
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      deploymentStep === 'listing'
                        ? 'bg-blue-600 animate-pulse'
                        : deploymentStep === 'complete'
                        ? 'bg-green-600'
                        : 'bg-slate-300 dark:bg-slate-700'
                    }`}>
                      {deploymentStep === 'complete' && (
                        <span className="text-white text-sm">✓</span>
                      )}
                    </div>
                    <span className={`font-medium ${
                      ['listing', 'complete'].includes(deploymentStep)
                        ? 'text-slate-800 dark:text-slate-200'
                        : 'text-slate-400 dark:text-slate-600'
                    }`}>
                      Listed in Marketplace
                    </span>
                  </div>
                </div>

                {deploymentStep === 'complete' && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
                    <p className="text-sm text-green-800 dark:text-green-300">
                      🎉 Your app is live! Users can now connect their data.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* FHIR Data Transformation */}
            {showFHIRData && (
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">
                  Data Transformation
                </h3>

                {/* FHIR Input */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      FHIR Input (from EHR)
                    </h4>
                    <span className="text-xs text-slate-500 dark:text-slate-500">Complex 😰</span>
                  </div>
                  <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-xs overflow-x-auto max-h-48 overflow-y-auto">
                    <code className="text-slate-800 dark:text-slate-200">
                      {JSON.stringify(mockFHIRInput, null, 2)}
                    </code>
                  </pre>
                </div>

                {/* Arrow */}
                <div className="text-center my-3">
                  <div className="text-2xl text-blue-600 dark:text-blue-400">↓</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    Platform SDK Auto-Maps
                  </div>
                </div>

                {/* SDK Output */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Your App Gets
                    </h4>
                    <span className="text-xs text-green-600 dark:text-green-400">Simple! 😊</span>
                  </div>
                  <pre className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 rounded text-xs overflow-x-auto">
                    <code className="text-slate-800 dark:text-slate-200">
                      {JSON.stringify(mockSDKOutput, null, 2)}
                    </code>
                  </pre>
                </div>
              </div>
            )}

            {/* Key Features */}
            {deploymentStep === 'idle' && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                  What Happens When You Deploy?
                </h3>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">1.</span>
                    <span>Platform validates your app and API credentials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">2.</span>
                    <span>Subscribes to patient consent and data events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">3.</span>
                    <span>Lists your app in the marketplace for users to discover</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">4.</span>
                    <span>Starts receiving FHIR data as simple JSON</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Instant Integration
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              No need to learn FHIR resources, profiles, or extensions. The SDK handles everything.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Real-time Events
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Subscribe to patient events, new lab results, appointments, and more via webhooks.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800">
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Universal Access
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Works with all data holders in the catalog. One integration, unlimited reach.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
