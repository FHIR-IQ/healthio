'use client';

import { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import { fhirSDK } from '@/lib/fhir-sdk';

export default function BuilderPage() {
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'vitals' | 'labs' | 'appointments'>('summary');
  const [patientSummary, setPatientSummary] = useState<any>(null);
  const [vitalSigns, setVitalSigns] = useState<any>(null);
  const [labResults, setLabResults] = useState<any>(null);
  const [appointments, setAppointments] = useState<any>(null);
  const [dataHolders, setDataHolders] = useState<any>(null);
  const [showCode, setShowCode] = useState(false);
  const [eventLog, setEventLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setEventLog(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev.slice(0, 9)]);
  };

  const initializeSDK = async () => {
    setLoading(true);
    addLog('Initializing FHIR Platform SDK...');
    try {
      await fhirSDK.initialize('patient-123');
      setInitialized(true);
      addLog('✓ SDK initialized successfully');
      addLog('✓ Patient context loaded');

      // Subscribe to events
      fhirSDK.on('patientLoaded', (patient) => {
        addLog(`✓ Patient loaded: ${patient.name}`);
      });

      fhirSDK.on('newLabResult', (lab) => {
        addLog(`🔔 New lab result: ${lab.test} = ${lab.value}`);
        loadLabResults(); // Refresh
      });
    } catch (error) {
      addLog('✗ Error initializing SDK');
    } finally {
      setLoading(false);
    }
  };

  const loadPatientSummary = async () => {
    setLoading(true);
    addLog('Loading patient summary...');
    try {
      const data = await fhirSDK.getPatientSummary();
      setPatientSummary(data);
      addLog('✓ Patient summary loaded');
    } catch (error) {
      addLog('✗ Error loading patient summary');
    } finally {
      setLoading(false);
    }
  };

  const loadVitalSigns = async () => {
    setLoading(true);
    addLog('Loading vital signs...');
    try {
      const data = await fhirSDK.getVitalSigns();
      setVitalSigns(data);
      addLog('✓ Vital signs loaded');
    } catch (error) {
      addLog('✗ Error loading vital signs');
    } finally {
      setLoading(false);
    }
  };

  const loadLabResults = async () => {
    setLoading(true);
    addLog('Loading lab results...');
    try {
      const data = await fhirSDK.getLabResults();
      setLabResults(data);
      addLog('✓ Lab results loaded');
    } catch (error) {
      addLog('✗ Error loading lab results');
    } finally {
      setLoading(false);
    }
  };

  const loadAppointments = async () => {
    setLoading(true);
    addLog('Loading appointments...');
    try {
      const data = await fhirSDK.getAppointments();
      setAppointments(data);
      addLog('✓ Appointments loaded');
    } catch (error) {
      addLog('✗ Error loading appointments');
    } finally {
      setLoading(false);
    }
  };

  const loadDataHolders = async () => {
    setLoading(true);
    addLog('Loading connected data holders...');
    try {
      const data = await fhirSDK.getDataHolders();
      setDataHolders(data);
      addLog('✓ Data holders loaded');
    } catch (error) {
      addLog('✗ Error loading data holders');
    } finally {
      setLoading(false);
    }
  };

  const simulateNewLab = async () => {
    addLog('Simulating new lab result arrival...');
    await fhirSDK.simulateNewLabResult();
  };

  useEffect(() => {
    if (initialized && activeTab === 'summary' && !patientSummary) {
      loadPatientSummary();
    } else if (initialized && activeTab === 'vitals' && !vitalSigns) {
      loadVitalSigns();
    } else if (initialized && activeTab === 'labs' && !labResults) {
      loadLabResults();
    } else if (initialized && activeTab === 'appointments' && !appointments) {
      loadAppointments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, activeTab]);

  useEffect(() => {
    if (initialized && !dataHolders) {
      loadDataHolders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  const codeExamples: Record<string, string> = {
    summary: `// Simple, intuitive API
const summary = await fhirSDK.getPatientSummary();

// Returns:
{
  name: "Sarah Johnson",
  age: 34,
  conditions: [...],
  medications: [...],
  allergies: [...]
}

// No FHIR knowledge needed!`,
    vitals: `// Get latest vital signs
const vitals = await fhirSDK.getVitalSigns();

// Platform handles:
// - FHIR Observation resources
// - Unit conversions
// - Data aggregation`,
    labs: `// Subscribe to real-time events
fhirSDK.on('newLabResult', (lab) => {
  console.log('New result:', lab);
});

// Get historical results
const labs = await fhirSDK.getLabResults();`,
    appointments: `// Unified scheduling across systems
const appointments = await fhirSDK.getAppointments();

// Works across all connected
// data holders automatically`
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Build Without Knowing FHIR
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            This interactive sandbox demonstrates how the FHIR Platform SDK simplifies health app development.
            Click the buttons below to see real-time data fetching with simple, intuitive APIs.
          </p>
        </div>

        {/* Initialize Button */}
        {!initialized && (
          <div className="max-w-2xl mx-auto mb-8 text-center">
            <button
              onClick={initializeSDK}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Initializing...' : 'Initialize FHIR Platform SDK'}
            </button>
          </div>
        )}

        {/* Main Content */}
        {initialized && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Data Display */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs */}
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800">
                <div className="border-b border-slate-200 dark:border-slate-800 flex flex-wrap">
                  {(['summary', 'vitals', 'labs', 'appointments'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 font-semibold capitalize transition-colors ${
                        activeTab === tab
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {loading && (
                    <div className="text-center py-12">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                      <p className="mt-4 text-slate-600 dark:text-slate-400">Loading...</p>
                    </div>
                  )}

                  {!loading && activeTab === 'summary' && patientSummary && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                          {patientSummary.name}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          {patientSummary.age} years old • {patientSummary.gender}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Conditions</h4>
                        <div className="space-y-2">
                          {patientSummary.conditions.map((condition: any) => (
                            <div key={condition.id} className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                              <div className="font-medium text-red-900 dark:text-red-200">{condition.name}</div>
                              <div className="text-sm text-red-700 dark:text-red-400">
                                Since {condition.onsetDate} • {condition.status}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Medications</h4>
                        <div className="space-y-2">
                          {patientSummary.medications.map((med: any) => (
                            <div key={med.id} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                              <div className="font-medium text-blue-900 dark:text-blue-200">{med.name}</div>
                              <div className="text-sm text-blue-700 dark:text-blue-400">{med.dosage}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Allergies</h4>
                        <div className="space-y-2">
                          {patientSummary.allergies.map((allergy: any) => (
                            <div key={allergy.id} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                              <div className="font-medium text-yellow-900 dark:text-yellow-200">{allergy.allergen}</div>
                              <div className="text-sm text-yellow-700 dark:text-yellow-400">
                                {allergy.severity} • {allergy.reaction}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {!loading && activeTab === 'vitals' && vitalSigns && (
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(vitalSigns).filter(([key]) => key !== 'lastUpdated').map(([key, value]) => (
                        <div key={key} className="p-4 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                          <div className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-1">
                            {value as string}
                          </div>
                        </div>
                      ))}
                      <div className="col-span-2 text-sm text-slate-500 dark:text-slate-500 text-center mt-2">
                        Last updated: {vitalSigns.lastUpdated}
                      </div>
                    </div>
                  )}

                  {!loading && activeTab === 'labs' && labResults && (
                    <div className="space-y-3">
                      {labResults.map((lab: any) => (
                        <div key={lab.id} className="p-4 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-semibold text-slate-800 dark:text-slate-200">{lab.test}</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">{lab.date}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{lab.value}</div>
                              <span className={`text-xs px-2 py-1 rounded ${
                                lab.status === 'normal'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                              }`}>
                                {lab.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {!loading && activeTab === 'appointments' && appointments && (
                    <div className="space-y-3">
                      {appointments.map((apt: any) => (
                        <div key={apt.id} className="p-4 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-semibold text-slate-800 dark:text-slate-200">{apt.type}</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">with {apt.provider}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-slate-800 dark:text-slate-200">{apt.date}</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">{apt.time}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Code Example */}
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">Code Example</h3>
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {showCode ? 'Hide' : 'Show'} Code
                  </button>
                </div>
                {showCode && (
                  <div className="p-4">
                    <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded overflow-x-auto text-sm">
                      <code className="text-slate-800 dark:text-slate-200">
                        {codeExamples[activeTab]}
                      </code>
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Controls & Info */}
            <div className="space-y-6">
              {/* Connected Data Holders */}
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Connected Data Holders</h3>
                {dataHolders && (
                  <div className="space-y-2">
                    {dataHolders.map((holder: any) => (
                      <div key={holder.id} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-slate-700 dark:text-slate-300">{holder.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Demo Actions */}
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Demo Actions</h3>
                <button
                  onClick={simulateNewLab}
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded transition-colors"
                >
                  Simulate New Lab Result
                </button>
              </div>

              {/* Event Log */}
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Event Log</h3>
                <div className="space-y-1 max-h-64 overflow-y-auto font-mono text-xs">
                  {eventLog.map((log, idx) => (
                    <div key={idx} className="text-slate-600 dark:text-slate-400">
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">SDK Features</h3>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Simple, intuitive API</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Auto-mapping from FHIR</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Real-time event subscriptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>No FHIR knowledge required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Works across all data holders</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
