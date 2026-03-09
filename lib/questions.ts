export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
}

export const questionBank: Question[] = [
  // BEGINNER - Foundations
  {
    id: 1,
    question: "What does FHIR stand for?",
    options: [
      "Fast Healthcare Interoperability Resources",
      "Federal Health Information Registry",
      "Flexible Health Integration Records",
      "Federated Healthcare Interchange Requirements",
    ],
    correctAnswer: 0,
    explanation:
      "FHIR (Fast Healthcare Interoperability Resources) is a standard for exchanging healthcare information electronically, developed by HL7.",
    difficulty: "beginner",
    category: "Fundamentals",
  },
  {
    id: 2,
    question: "Which organization developed FHIR?",
    options: ["WHO", "HL7 International", "IEEE", "HIMSS"],
    correctAnswer: 1,
    explanation:
      "HL7 International developed FHIR as the next generation of their healthcare interoperability standards.",
    difficulty: "beginner",
    category: "Fundamentals",
  },
  {
    id: 3,
    question: "What is the primary data format used by FHIR?",
    options: ["CSV", "XML only", "JSON and XML", "YAML"],
    correctAnswer: 2,
    explanation:
      "FHIR supports both JSON and XML as primary data formats, with JSON being more commonly used in modern implementations.",
    difficulty: "beginner",
    category: "Fundamentals",
  },
  {
    id: 4,
    question: "What is a FHIR Resource?",
    options: [
      "A database table",
      "A basic unit of interoperability with a known identity",
      "A medical device",
      "A hospital department",
    ],
    correctAnswer: 1,
    explanation:
      "A FHIR Resource is the basic building block - a unit of interoperability that represents a clinical or administrative concept.",
    difficulty: "beginner",
    category: "Resources",
  },
  {
    id: 5,
    question:
      "Which HTTP method is used to create a new resource in FHIR RESTful API?",
    options: ["GET", "PUT", "POST", "PATCH"],
    correctAnswer: 2,
    explanation:
      "POST is used to create new resources in the FHIR RESTful API, following standard HTTP conventions.",
    difficulty: "beginner",
    category: "REST API",
  },
  {
    id: 6,
    question: "What FHIR resource represents a person receiving healthcare?",
    options: ["Person", "Patient", "Individual", "Subject"],
    correctAnswer: 1,
    explanation:
      "The Patient resource is the core FHIR resource representing a person receiving healthcare services.",
    difficulty: "beginner",
    category: "Resources",
  },
  {
    id: 7,
    question: "What does the FHIR Capability Statement describe?",
    options: [
      "Patient capabilities",
      "Network bandwidth",
      "A server's FHIR functionality and supported resources",
      "User permissions",
    ],
    correctAnswer: 2,
    explanation:
      "The CapabilityStatement resource describes the FHIR functionality supported by a server, including supported resources and operations.",
    difficulty: "beginner",
    category: "Infrastructure",
  },

  // INTERMEDIATE - Implementation
  {
    id: 8,
    question: "What is a FHIR Bundle used for?",
    options: [
      "Compressing data",
      "Grouping multiple resources into a single instance",
      "Encrypting patient data",
      "Creating user interfaces",
    ],
    correctAnswer: 1,
    explanation:
      "A Bundle is a container for a collection of resources, used for transactions, search results, documents, and messages.",
    difficulty: "intermediate",
    category: "Resources",
  },
  {
    id: 9,
    question: "What is SMART on FHIR?",
    options: [
      "A database technology",
      "An app launch and authorization framework for FHIR",
      "A medical device protocol",
      "A UI component library",
    ],
    correctAnswer: 1,
    explanation:
      "SMART on FHIR is an open standards-based technology platform enabling apps to launch from EHRs using OAuth 2.0 for authorization.",
    difficulty: "intermediate",
    category: "Security",
  },
  {
    id: 10,
    question: "What is a FHIR Profile?",
    options: [
      "A user account",
      "A set of constraints on a resource for a specific use case",
      "A login page",
      "A network configuration",
    ],
    correctAnswer: 1,
    explanation:
      "A FHIR Profile (StructureDefinition) constrains a base resource to meet specific implementation requirements.",
    difficulty: "intermediate",
    category: "Conformance",
  },
  {
    id: 11,
    question: "What is the US Core Implementation Guide?",
    options: [
      "A hardware specification",
      "A set of FHIR profiles for US healthcare data exchange",
      "A database schema",
      "A network protocol",
    ],
    correctAnswer: 1,
    explanation:
      "US Core defines a set of FHIR profiles based on USCDI for nationwide health data exchange in the United States.",
    difficulty: "intermediate",
    category: "Implementation Guides",
  },
  {
    id: 12,
    question: "What is CDS Hooks in the context of FHIR?",
    options: [
      "A fishing equipment standard",
      "Clinical Decision Support integration with EHR workflows",
      "A code versioning system",
      "A network monitoring tool",
    ],
    correctAnswer: 1,
    explanation:
      "CDS Hooks is a standard for integrating clinical decision support into EHR workflows at specific trigger points.",
    difficulty: "intermediate",
    category: "Clinical Decision Support",
  },
  {
    id: 13,
    question: "What is a FHIR extension?",
    options: [
      "A file extension like .fhir",
      "A way to add additional data elements not in the base spec",
      "A browser plugin",
      "A server upgrade",
    ],
    correctAnswer: 1,
    explanation:
      "Extensions allow adding data elements beyond what's defined in the base FHIR specification, enabling customization while maintaining interoperability.",
    difficulty: "intermediate",
    category: "Data Modeling",
  },
  {
    id: 14,
    question: "What is the FHIR $everything operation?",
    options: [
      "Deletes all data",
      "Returns all resources related to a patient",
      "Backs up the server",
      "Resets the database",
    ],
    correctAnswer: 1,
    explanation:
      "The $everything operation retrieves all information related to a specific patient, creating a comprehensive patient record.",
    difficulty: "intermediate",
    category: "Operations",
  },
  {
    id: 15,
    question:
      "What is the purpose of FHIR Subscriptions?",
    options: [
      "Managing magazine subscriptions",
      "Real-time notifications when data changes on the server",
      "Billing patients",
      "Creating user accounts",
    ],
    correctAnswer: 1,
    explanation:
      "FHIR Subscriptions allow clients to receive real-time notifications when resources matching specified criteria are created or updated.",
    difficulty: "intermediate",
    category: "Infrastructure",
  },

  // ADVANCED - Architecture & Strategy
  {
    id: 16,
    question: "What is Bulk FHIR Data Export primarily used for?",
    options: [
      "Exporting single patient records",
      "Large-scale population-level data export for analytics",
      "Creating backups",
      "Printing medical records",
    ],
    correctAnswer: 1,
    explanation:
      "Bulk Data Export enables population-level data extraction using NDJSON format, essential for analytics, research, and value-based care.",
    difficulty: "advanced",
    category: "Data Exchange",
  },
  {
    id: 17,
    question: "What is TEFCA in relation to FHIR?",
    options: [
      "A testing framework",
      "Trusted Exchange Framework and Common Agreement for nationwide interoperability",
      "A FHIR extension type",
      "A clinical terminology",
    ],
    correctAnswer: 1,
    explanation:
      "TEFCA establishes a universal governance and technical framework for nationwide health information exchange, built on FHIR standards.",
    difficulty: "advanced",
    category: "Policy & Governance",
  },
  {
    id: 18,
    question: "What does the ONC HTI-1 Final Rule mandate regarding FHIR?",
    options: [
      "Optional FHIR adoption",
      "FHIR R4 as the standard API for certified health IT",
      "Replacement of FHIR with a new standard",
      "Only XML format support",
    ],
    correctAnswer: 1,
    explanation:
      "ONC's HTI-1 Final Rule mandates FHIR R4 as the standardized API for certified health IT, advancing interoperability requirements.",
    difficulty: "advanced",
    category: "Policy & Governance",
  },
  {
    id: 19,
    question: "What is a FHIR Facade pattern?",
    options: [
      "A UI design pattern",
      "An API layer that translates existing systems to FHIR on-the-fly",
      "A database migration tool",
      "A testing methodology",
    ],
    correctAnswer: 1,
    explanation:
      "A FHIR Facade translates legacy system data to FHIR format in real-time without requiring a native FHIR data store.",
    difficulty: "advanced",
    category: "Architecture",
  },
  {
    id: 20,
    question: "What is the Da Vinci Project focused on?",
    options: [
      "Art history in healthcare",
      "Value-based care data exchange using FHIR",
      "Medical imaging standards",
      "Hospital construction",
    ],
    correctAnswer: 1,
    explanation:
      "Da Vinci develops FHIR implementation guides for value-based care use cases including prior authorization, coverage, and quality reporting.",
    difficulty: "advanced",
    category: "Implementation Guides",
  },
  {
    id: 21,
    question: "What is FHIR Shorthand (FSH)?",
    options: [
      "A shorthand notation for clinical notes",
      "A domain-specific language for defining FHIR profiles and IGs",
      "An abbreviation system for FHIR resources",
      "A compressed FHIR format",
    ],
    correctAnswer: 1,
    explanation:
      "FHIR Shorthand (FSH) is a domain-specific language that makes it easier to author FHIR profiles, extensions, and implementation guides.",
    difficulty: "advanced",
    category: "Tooling",
  },
  {
    id: 22,
    question:
      "In FHIR R5, what replaced the Subscription resource model from R4?",
    options: [
      "WebSockets only",
      "Topic-based subscriptions with SubscriptionTopic",
      "Polling only",
      "Email notifications",
    ],
    correctAnswer: 1,
    explanation:
      "FHIR R5 introduced topic-based subscriptions using SubscriptionTopic resources, providing a more scalable and flexible notification model.",
    difficulty: "advanced",
    category: "Standards Evolution",
  },
  {
    id: 23,
    question: "What is the purpose of a FHIR Consent resource?",
    options: [
      "Server configuration",
      "Recording patient privacy choices and data sharing agreements",
      "Database optimization",
      "Network routing",
    ],
    correctAnswer: 1,
    explanation:
      "The Consent resource records a patient's choices regarding privacy and data sharing, enabling granular access control aligned with patient preferences.",
    difficulty: "advanced",
    category: "Security",
  },
  {
    id: 24,
    question: "What is the FHIR Mapping Language used for?",
    options: [
      "Geographic mapping of hospitals",
      "Defining structural transformations between different data models",
      "Creating floor plans",
      "Network topology",
    ],
    correctAnswer: 1,
    explanation:
      "The FHIR Mapping Language provides a formal way to define transformations between FHIR resources and other data formats or FHIR versions.",
    difficulty: "advanced",
    category: "Data Modeling",
  },
  {
    id: 25,
    question:
      "What role does FHIR play in the CMS Interoperability and Prior Authorization Final Rule (CMS-0057)?",
    options: [
      "No role",
      "Mandates FHIR-based APIs for payer-to-payer data exchange and prior auth",
      "Only for billing",
      "Optional recommendation",
    ],
    correctAnswer: 1,
    explanation:
      "CMS-0057 mandates FHIR-based APIs for patient access, provider directory, prior authorization, and payer-to-payer data exchange.",
    difficulty: "advanced",
    category: "Policy & Governance",
  },
];

export function getQuizQuestions(count: number = 10): Question[] {
  const beginnerCount = 3;
  const intermediateCount = 4;
  const advancedCount = 3;

  const beginners = questionBank.filter((q) => q.difficulty === "beginner");
  const intermediates = questionBank.filter(
    (q) => q.difficulty === "intermediate"
  );
  const advanced = questionBank.filter((q) => q.difficulty === "advanced");

  const shuffle = <T>(arr: T[]): T[] => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return [
    ...shuffle(beginners).slice(0, beginnerCount),
    ...shuffle(intermediates).slice(0, intermediateCount),
    ...shuffle(advanced).slice(0, advancedCount),
  ].slice(0, count);
}
