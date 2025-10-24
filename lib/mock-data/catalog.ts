export const mockCatalog = [
  {
    id: "1",
    name: "City General Hospital",
    type: "EHR System",
    description: "Major metropolitan hospital network with 500+ beds",
    capabilities: ["Patient Records", "Lab Results", "Imaging", "Medications"],
    patients: 125000,
    status: "active",
    apiVersion: "FHIR R4",
    certifications: ["ONC 2015", "CARIN BB"],
    integrationMethod: "SMART on FHIR",
    logo: "🏥"
  },
  {
    id: "2",
    name: "LabCorp",
    type: "Laboratory Network",
    description: "National laboratory testing and diagnostic services",
    capabilities: ["Lab Results", "Pathology Reports", "Test Ordering"],
    patients: 2500000,
    status: "active",
    apiVersion: "FHIR R4",
    certifications: ["CLIA", "CAP"],
    integrationMethod: "Direct FHIR API",
    logo: "🔬"
  },
  {
    id: "3",
    name: "MyHealth PHR",
    type: "Personal Health Record",
    description: "Consumer-facing personal health record platform",
    capabilities: ["Patient-Entered Data", "Device Sync", "Care Plans"],
    patients: 850000,
    status: "active",
    apiVersion: "FHIR R4",
    certifications: ["HIPAA Compliant"],
    integrationMethod: "OAuth 2.0 + FHIR",
    logo: "📱"
  },
  {
    id: "4",
    name: "Regional Care Clinic",
    type: "Ambulatory Practice",
    description: "Multi-specialty outpatient care network",
    capabilities: ["Appointments", "Clinical Notes", "Medications"],
    patients: 45000,
    status: "active",
    apiVersion: "FHIR R4",
    certifications: ["ONC 2015"],
    integrationMethod: "SMART on FHIR",
    logo: "🏨"
  },
  {
    id: "5",
    name: "Pharmacy Plus",
    type: "Pharmacy Chain",
    description: "National retail pharmacy network",
    capabilities: ["Medication History", "Prescription Fill", "Drug Interactions"],
    patients: 3200000,
    status: "active",
    apiVersion: "FHIR R4",
    certifications: ["NABP", "HIPAA Compliant"],
    integrationMethod: "NCPDP SCRIPT + FHIR Bridge",
    logo: "💊"
  },
  {
    id: "6",
    name: "Genomics Lab International",
    type: "Genomics Provider",
    description: "Specialized genetic testing and analysis",
    capabilities: ["Genetic Testing", "Variant Reports", "Family History"],
    patients: 180000,
    status: "beta",
    apiVersion: "FHIR R4 + Genomics IG",
    certifications: ["CLIA", "CAP"],
    integrationMethod: "FHIR Genomics API",
    logo: "🧬"
  }
];

export type DataHolder = typeof mockCatalog[0];
