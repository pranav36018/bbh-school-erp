# INDIA UNIFIED SCHOOL ERP PLATFORM
## Multi-School | Multi-Board | Multi-Campus | AI-Powered | Production-Ready

[![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-Passing-emerald)](https://github.com)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.18-blue)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791)](https://www.postgresql.org)
[![Prisma ORM](https://img.shields.io/badge/ORM-Prisma-2D3748)](https://www.prisma.io)
[![DPDP Act](https://img.shields.io/badge/Compliance-DPDP%20Act%202023-emerald)](https://www.meity.gov.in)
[![Tests](https://img.shields.io/badge/Automated%20Tests-27%20Passed-emerald)](./tests)

---

### Project Vision & Overview

The **India Unified School ERP Platform** is an enterprise-grade, multi-tenant Software-as-a-Service (SaaS) platform built for thousands of independent educational institutions across India. It natively supports **CBSE-affiliated schools, Karnataka State Board (KSEAB), Maharashtra (MSBSHSE), Tamil Nadu (TNSB), Kerala (KBPE), and all other Indian State Boards**, compliant with the **National Education Policy (NEP 2020)** and the **Digital Personal Data Protection (DPDP) Act, 2023**.

The application is a **complete, working full-stack implementation** with a centralized PostgreSQL database, automated collision-free unique identification engine, four specialized role-locked portals, robust tenant isolation, and AI-powered classroom automation.

---

### Key Architectural Pillars

```
+-----------------------------------------------------------------------------------+
|                           INDIA UNIFIED SCHOOL ERP                                |
+-----------------------------------------------------------------------------------+
|  [Director Portal]    [School Admin Portal]   [Teacher Portal]   [Student Portal] |
|   /director/login        /admin/login          /teacher/login     /student/login  |
+-----------------------------------------------------------------------------------+
|                        Next.js 14 App Router (52 Routes)                          |
|  - Cryptographic JWT Sessions    - Anti-Role Tampering    - Tenant Isolation     |
|  - Unique ID Sequence Engine     - Multi-Board Engine     - AI Timetable/Planner  |
+-----------------------------------------------------------------------------------+
|                      PostgreSQL 16 + Prisma ORM (63 Tables)                       |
|  - Platform & Multi-Tenancy      - Academics & Timetables - Attendance & Biometrics|
|  - Examination & CBSE Grades     - Fees & UPI Gateway     - Transport & Logistics |
+-----------------------------------------------------------------------------------+
```

1. **Multi-Tenant SaaS with Zero URL Tampering**: A student changing `/student/dashboard` to `/admin/dashboard` is strictly blocked by token-level claim verification. All queries enforce `institutionId` extracted exclusively from the authenticated session.
2. **Centralized Collision-Resistant Unique ID Engine**:
   - **Institution**: `INS-IND-000001`
   - **Campus**: `CAM-INS000001-001`
   - **Student**: `STU-INS000001-000001`
   - **Teacher**: `TCH-INS000001-000001`
   - **Director**: `DIR-INS000001-000001`
   - **Admin**: `ADM-INS000001-000001`
   - **Staff**: `STF-INS000001-000001`
   - **Admission No**: `ADM-2026-0001`
   - **Academic Year**: `AY-2026-2027`
3. **Multi-Board Assessment Engine**: Configurable templates for CBSE 9-point grading (`A1`, `A2`, `B1`...), Karnataka CCE (`A+`, `A`, `B+`...), internal assessments (20 marks breakdown), and multilingual report card rendering.
4. **AI Automation Subsystem (HITL Governed)**:
   - **AI Timetable Generator**: Constraint satisfaction avoiding teacher overlaps and room clashes.
   - **AI Lesson Planner**: 4-phase pedagogical breakdown linked to board syllabus units.
   - **AI Question Paper Synthesizer**: Bloom's Taxonomy balanced exams (MCQ, Short, Long).
   - **AI Student Early Warning**: Identifies attendance and marks declines without exposing PII.
5. **Fee & Payment Subsystem**: Indian UPI and payment gateway abstraction, multi-head fee slabs, and instant numbered receipts with QR validation.

---

### Four Independent Portals & Demo Accounts

| Portal | Route | Demo Credentials | Key Responsibilities |
|---|---|---|---|
| **Director** | `/director/login` | `director@indiaunifiederp.edu.in`<br>`Director@2026` | Multi-school executive governance, campus benchmarks, consolidated fee velocity, capital expenditure authorizations. |
| **School Admin** | `/admin/login` | `admin.dps@indiaunifiederp.edu.in`<br>`Admin@2026` | Admissions CRM, student records, teacher HR, CBSE rules, daily attendance, examination publishing, UPI fee collection, transport fleet. |
| **Teacher** | `/teacher/login` | `teacher.ananya@indiaunifiederp.edu.in`<br>`Teacher@2026` | Daily schedule, 1-click attendance, marks entry, AI lesson planner, AI question generator, teaching diary, leave requests. |
| **Student** | `/student/login` | `student.aarav@indiaunifiederp.edu.in`<br>`Student@2026` | Digital ID card with HMAC QR seal, class timetable, attendance percentage tracker, board report cards, UPI fee payments, homework. |

---

### Quickstart & Local Setup

#### Prerequisites
- Node.js `20.x` or `25.x`
- npm `10.x` or higher
- Optional: Docker & Docker Compose (for containerized PostgreSQL)

#### 1. Installation
```bash
# Clone and enter workspace
cd "c:\BBH SCHOOL"

# Install dependencies
npm install
```

#### 2. Configure Environment
```bash
cp .env.example .env
```

#### 3. Run Automated Tests
Execute the automated test suite verifying security, tenant isolation, ID generation, and grading algorithms:
```bash
npm test
```
*Output: 27 of 27 unit and security test scenarios passing.*

#### 4. Build for Production
```bash
npm run build
```
*Output: All 52 static and dynamic routes compiled and optimized.*

#### 5. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portal gateway.

---

### Docker & Production Deployment

#### One-Command Docker Compose:
```bash
docker compose up -d --build
docker compose exec app npx prisma migrate deploy
docker compose exec app npm run db:seed
```

The application will run on port `3000` with PostgreSQL persistent storage.

---

### Repository Structure

```
c:\BBH SCHOOL/
├── src/
│   ├── app/                      # Next.js App Router (52 Routes)
│   │   ├── page.tsx              # Public Gateway & Portal Switcher
│   │   ├── director/             # Director Executive Portal (7 Pages)
│   │   ├── admin/                # School Admin Portal (11 Modules)
│   │   ├── teacher/              # Teacher Academic Portal (7 Pages)
│   │   ├── student/              # Student & Parent Portal (7 Pages)
│   │   └── api/                  # REST APIs (Auth, Admin, AI, QR Verify)
│   ├── components/
│   │   ├── auth/                 # Role-Specific Login Forms
│   │   └── layout/               # Sidebar, Header, Notification Center
│   └── lib/
│       ├── db.ts                 # Prisma Client Singleton
│       ├── auth.ts               # Password Hashing & JWT Sessions
│       ├── tenant.ts             # Tenant Isolation Scoping
│       ├── id-engine.ts          # Atomic Unique ID Sequence Generator
│       ├── board-engine.ts       # CBSE & State Board Grade Rules
│       ├── ai-engine.ts          # AI Timetable & Pedagogical Generator
│       ├── notifications.ts      # DLT SMS & WhatsApp Dispatches
│       └── mock-data.ts          # Rich Pan-Indian Demo Data Store
├── prisma/
│   ├── schema.prisma             # Comprehensive Normalized Schema (63 Tables)
│   └── seed.ts                   # Production Database Seeding Script
├── docs/
│   ├── ARCHITECTURE.md           # Technical Architecture Specification
│   ├── DATABASE_DIAGRAM.md       # Full Entity-Relationship (ER) Documentation
│   ├── IMPLEMENTATION_ROADMAP.md # Phase-by-Phase Roadmap
│   ├── DEPLOYMENT.md             # Production Docker & Cloud Deployments
│   └── API.md                    # Complete REST API Specification
├── tests/
│   └── run-tests.ts              # 27 Automated Security & Functional Tests
├── scripts/
│   ├── backup.sh & backup.ps1    # Automated PostgreSQL Database Backups
│   └── restore.sh                # Disaster Recovery Restore Script
├── .github/workflows/
│   └── ci.yml                    # Automated GitHub Actions CI/CD Pipeline
├── Dockerfile                    # Multi-stage production container
├── docker-compose.yml            # PostgreSQL + App orchestration
├── DEVELOPMENT_STATUS.md         # Phase Completion Tracker
└── README.md                     # Master Documentation
```

---

### DPDP Act 2023 & Indian Compliance

- **No Public PII Exposure**: Student profiles, contact information, and government identity references are masked and protected behind authenticated JWT sessions.
- **Biometric & RFID Protection**: Biometric punch logs and RFID gate pass timestamps are stored strictly in private tenant storage without third-party telemetry.
- **Cryptographic QR Validation**: Digital ID cards and progress report cards feature HMAC-SHA256 encrypted verification tokens verifiable on `/api/certificates/verify`.
