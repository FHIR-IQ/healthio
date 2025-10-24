export const templates = [
  {
    id: 'patient-timeline',
    name: 'Patient Timeline',
    description: 'Display patient health events chronologically with interactive filtering',
    icon: '📅',
    category: 'Patient Care',
    features: ['Event visualization', 'Date filtering', 'Multi-source data']
  },
  {
    id: 'care-gaps',
    name: 'Care Gaps',
    description: 'Identify missing preventive care and recommended screenings',
    icon: '🎯',
    category: 'Quality Improvement',
    features: ['Clinical guidelines', 'Risk scoring', 'Action recommendations']
  },
  {
    id: 'claims-viewer',
    name: 'Claims Viewer',
    description: 'Visualize healthcare costs and utilization patterns',
    icon: '💰',
    category: 'Financial',
    features: ['Cost analysis', 'Utilization trends', 'EOB parsing']
  }
];

export const mockFHIRInput = {
  resourceType: "Patient",
  id: "123",
  name: [
    {
      family: "Smith",
      given: ["Jane"]
    }
  ],
  gender: "female",
  birthDate: "1985-04-15",
  address: [
    {
      line: ["123 Main St"],
      city: "Boston",
      state: "MA",
      postalCode: "02101"
    }
  ],
  telecom: [
    {
      system: "phone",
      value: "555-0123"
    }
  ]
};

export const mockSDKOutput = {
  name: "Jane Smith",
  age: 39,
  gender: "Female",
  dateOfBirth: "April 15, 1985",
  contactPhone: "555-0123",
  address: "123 Main St, Boston, MA 02101"
};

export type Template = typeof templates[0];
