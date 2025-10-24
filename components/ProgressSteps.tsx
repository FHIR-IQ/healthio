'use client';

interface Step {
  label: string;
  status: 'pending' | 'active' | 'complete';
}

interface ProgressStepsProps {
  steps: Step[];
}

export default function ProgressSteps({ steps }: ProgressStepsProps) {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              step.status === 'active'
                ? 'bg-blue-600 animate-pulse'
                : step.status === 'complete'
                ? 'bg-green-600'
                : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            {step.status === 'complete' ? (
              <span className="text-white text-sm font-bold">✓</span>
            ) : step.status === 'active' ? (
              <span className="text-white text-sm font-bold">{index + 1}</span>
            ) : (
              <span className="text-slate-500 text-sm font-bold">{index + 1}</span>
            )}
          </div>
          <span
            className={`font-medium transition-colors ${
              step.status !== 'pending'
                ? 'text-slate-800 dark:text-slate-200'
                : 'text-slate-400 dark:text-slate-600'
            }`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}
