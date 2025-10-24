export const mockPatient = {
  id: "patient-123",
  name: "Sarah Johnson",
  age: 34,
  gender: "female",
  dateOfBirth: "1990-03-15",
  conditions: [
    { id: "1", name: "Type 2 Diabetes", status: "active", onsetDate: "2018-06-01" },
    { id: "2", name: "Hypertension", status: "active", onsetDate: "2019-01-15" }
  ],
  medications: [
    { id: "1", name: "Metformin 500mg", dosage: "Twice daily", prescribedDate: "2018-06-01" },
    { id: "2", name: "Lisinopril 10mg", dosage: "Once daily", prescribedDate: "2019-01-15" }
  ],
  allergies: [
    { id: "1", allergen: "Penicillin", severity: "severe", reaction: "Anaphylaxis" }
  ],
  vitalSigns: {
    bloodPressure: "128/82 mmHg",
    heartRate: "72 bpm",
    temperature: "98.6°F",
    weight: "165 lbs",
    height: "5'6\"",
    bmi: "26.6",
    lastUpdated: "2025-10-20"
  },
  labResults: [
    { id: "1", test: "HbA1c", value: "6.8%", date: "2025-10-15", status: "normal" },
    { id: "2", test: "Glucose (fasting)", value: "112 mg/dL", date: "2025-10-15", status: "borderline" },
    { id: "3", test: "Cholesterol (total)", value: "195 mg/dL", date: "2025-10-15", status: "normal" }
  ],
  appointments: [
    { id: "1", date: "2025-11-05", time: "10:00 AM", provider: "Dr. Michael Chen", type: "Follow-up" },
    { id: "2", date: "2025-12-15", time: "2:30 PM", provider: "Dr. Sarah Williams", type: "Annual Physical" }
  ],
  dataHolders: [
    { id: "1", name: "City General Hospital", type: "EHR", status: "connected" },
    { id: "2", name: "LabCorp", type: "Laboratory", status: "connected" },
    { id: "3", name: "MyHealth PHR", type: "Personal Health Record", status: "connected" }
  ]
};

export type Patient = typeof mockPatient;
