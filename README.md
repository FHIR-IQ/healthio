# FHIR Platform Sandbox

> **From Plumbing to Possibility — FHIR as the Platform**

A working prototype demonstrating how developers can build health apps without knowing FHIR using a unified sandbox and SDK experience.

Created by **Eugene Vestel (FHIR IQ)** for the "FHIR as the Platform" lightning talk.

## 🎯 Project Goal

This prototype showcases a platform approach to FHIR interoperability where:
- **Builders** focus on UX, not FHIR specifications
- **Data Holders** register once and connect to all apps
- **The Platform** handles all the complexity of FHIR, mapping, and integration

## 🚀 Live Demo

Visit the deployed application: [Deploy to Vercel]

## ✨ Features

### Landing Page (`/`)
- Hero section with platform vision
- Interactive ASCII architecture diagram
- Value propositions for builders and data holders
- Navigation to builder and catalog experiences

### Builder Sandbox (`/builder-sandbox`)
- **Template Selection:** Choose from Patient Timeline, Care Gaps, or Claims Viewer templates
- **Deployment Simulation:** Watch 3-step deployment process (Connected → Subscribed → Listed)
- **FHIR Transformation Demo:** See complex FHIR JSON automatically mapped to simple objects
- **API Key Display:** Mock sandbox API key (`sk_test_fhir1234abcd`)
- **Visual Progress:** Animated deployment steps with checkmarks
- Perfect for demonstrating "no FHIR knowledge needed"

### Builder SDK Demo (`/builder`)
- Interactive SDK demonstration with live data
- Real-time data fetching with mock FHIR data
- Event log showing platform interactions
- Code examples for each feature
- Simulated real-time events (new lab results)
- Multiple tabs: Patient Summary, Vital Signs, Labs, Appointments
- Connected data holders display

### Data Holder Catalog (`/catalog`)
- Browse connected data holders (EHRs, labs, PHRs, etc.)
- Filter by type
- View detailed information about each data holder
- Statistics: 6+ data holders, 6.9M+ patients
- Benefits of joining the platform

### App Catalog (`/app-catalog`) ⭐ NEW!
- **Governed Marketplace:** Browse pre-approved health applications
- **3 Featured Apps:** Patient Timeline (Free), Care Gaps AI ($0.05/call), Claims Visualizer (Enterprise)
- **Star Ratings:** Mock ratings and review counts for each app
- **One-Click Enable:** "Enable for My Org" button with toast notifications
- **Governance Features:** App review, audit logs, kill-switch capabilities
- **Policy Engine:** Simulated automated policy application

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Data:** Mock JSON (client-side only)
- **Deployment:** Vercel-ready

## 🏃 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd healthio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 📁 Project Structure

\`\`\`
healthio/
├── app/                           # Next.js app directory
│   ├── page.tsx                  # Landing page
│   ├── builder-sandbox/page.tsx  # Builder sandbox (template deployment)
│   ├── builder/page.tsx          # Builder SDK demo (data interaction)
│   ├── catalog/page.tsx          # Data holder catalog
│   ├── app-catalog/page.tsx      # App marketplace ⭐ NEW
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── NavBar.tsx                # Navigation bar ⭐ NEW
│   ├── Toast.tsx                 # Toast notifications ⭐ NEW
│   ├── ProgressSteps.tsx         # Progress indicator ⭐ NEW
│   └── ArchitectureDiagram.tsx
├── lib/                          # Utilities and mock data
│   ├── fhir-sdk.ts              # Mock FHIR Platform SDK
│   └── mock-data/
│       ├── patient.ts            # Mock patient data
│       ├── catalog.ts            # Mock data holder catalog
│       └── templates.ts          # Template definitions & mock FHIR data
├── data/                         # Mock FHIR JSON files ⭐ NEW
│   ├── patient.json              # FHIR Patient resource
│   ├── condition.json            # FHIR Condition resource
│   ├── observation.json          # FHIR Observation resource
│   └── caregap-event.json        # Care gap event data
├── public/                       # Static assets
└── package.json
\`\`\`

## 🎨 Key Components

### FHIR Platform SDK (`lib/fhir-sdk.ts`)
A mock SDK that simulates how developers would interact with the FHIR Platform:
- Simple, intuitive API methods
- No FHIR knowledge required
- Event-driven architecture
- Automatic data mapping from FHIR resources

### Mock Data
- **Patient Data:** Comprehensive mock patient including conditions, medications, allergies, vitals, labs, and appointments
- **Data Holder Catalog:** 6 different types of healthcare data holders with realistic capabilities and certifications

## 🌟 Highlights

1. **No FHIR Knowledge Required:** The SDK abstracts all FHIR complexity
2. **Client-Side Only:** Perfect for demos, no backend needed
3. **Interactive:** Real-time event simulation and data loading
4. **Production-Ready:** Optimized for Vercel deployment
5. **Responsive:** Works on desktop, tablet, and mobile
6. **Dark Mode:** Supports system dark mode preference

## 🚢 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

Or manually:

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy (no configuration needed)

### Deploy to Other Platforms

This is a standard Next.js 14 application and can be deployed to:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Any platform supporting Next.js

## 📝 License

MIT License - feel free to use this for your own demos and presentations!

## 👤 Author

**Eugene Vestel**
FHIR IQ

---

## 🎤 Lightning Talk Notes

This prototype supports the "FHIR as the Platform" concept by demonstrating:

1. **Platform Value for Builders:**
   - Simple SDK with intuitive methods
   - No FHIR expertise needed
   - Real-time events and subscriptions
   - Works across all connected data holders

2. **Platform Value for Data Holders:**
   - Register once, reach all apps
   - No custom integrations per app
   - Managed security and compliance
   - Analytics and insights

3. **Network Effect:**
   - More apps = more value for patients
   - More data holders = more reach for builders
   - Platform grows the ecosystem exponentially

**Key Message:** "If you can prompt an LLM, you can build a health app — because the platform does the FHIR."
