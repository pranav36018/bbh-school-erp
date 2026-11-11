# INDIA UNIFIED SCHOOL ERP PLATFORM
## Technical Architecture Specification
**Multi-School | Multi-Board | Multi-Campus | AI-Powered | Production-Ready**

---

### 1. Architectural Overview & Design Principles

The India Unified School ERP Platform is architected as a **Multi-Tenant Software-as-a-Service (SaaS)** platform engineered for high concurrency, rock-solid tenant isolation, compliance with the Indian **Digital Personal Data Protection (DPDP) Act, 2023**, and seamless support for pan-Indian educational boards (CBSE, ICSE, Karnataka KSEAB, Maharashtra MSBSHSE, Tamil Nadu TNSB, Kerala KBPE, and other State Boards).

```
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|  +-------------------+  +----------------+  +-----------------+  +--------------+ |
|  |  Director Portal  |  |  Admin Portal  |  | Teacher Portal  |  |Student Portal| |
|  |  /director/login  |  |  /admin/login  |  | /teacher/login  |  |/student/login| |
|  +-------------------+  +----------------+  +-----------------+  +--------------+ |
|            \                     |                   |                  /         |
|             \                    |                   |                 /          |
+-----------------------------------------------------------------------------------+
                                   | HTTPS / REST / JSON
+-----------------------------------------------------------------------------------+
|                        APPLICATION LAYER (Next.js 14/15 App Router)               |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  |                 Security & Tenant Isolation Middleware                       |  |
|  |  - JWT Session Auth  - Role Guard  - Tenant Context Resolution              |  |
|  |  - Rate Limiter      - Anti-Tamper - DPDP Privacy & Consent Enforcer        |  |
|  +-----------------------------------------------------------------------------+  |
|                                        |                                          |
|  +-----------------------------------------------------------------------------+  |
|  |                             Core Subsystems                                 |  |
|  |  [Unique ID Engine]        [Multi-Board Engine]   [Academic Engine]         |  |
|  |  [Admission CRM & Flow]    [Attendance & Bio/QR]  [Exam & Grading Engine]   |  |
|  |  [Fee & Indian Payment GW] [Staff & Payroll]      [Transport & GPS Engine]  |  |
|  |  [Document Vault & QR]     [AI Assistance Engine] [Communication (WA/SMS)]  |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
|                              PERSISTENCE & DATA LAYER                             |
|  +-----------------------------------------------------------------------------+  |
|  |               Prisma ORM with Multi-Tenant Row Isolation                    |  |
|  |  - Tenant Scoping on All Queries   - ACID Transactions   - Audit Logging    |  |
|  +-----------------------------------------------------------------------------+  |
|                                        |                                          |
|  +-----------------------------------------------------------------------------+  |
|  |                     PostgreSQL Database Server                              |  |
|  |  - Foreign Key Constraints  - Tenant Indexes  - Sequence Tables             |  |
|  |  - JSONB Board Rule Store   - Full Text Search - Encrypted Audit Trails     |  |
|  +-----------------------------------------------------------------------------+  |
|  +-----------------------------------------------------------------------------+  |
|  |                     Object Store (S3 / Local Encrypted Vault)               |  |
|  |  - Certificates & Marks Cards  - Student Documents  - Identity Badges       |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

### 2. Multi-Tenant SaaS Hierarchy

The platform implements a **Logical Shared-Database, Row-Level Isolated Multi-Tenancy** architecture:

```
[PLATFORM OWNER / SUPER ADMIN]
       |
       +---> [INSTITUTION GROUP] (e.g., Delhi Public School Society / Karnataka Education Trust)
                    |
                    |---> [DIRECTOR] (Cross-campus governance, aggregate analytics, budget approvals)
                    |
                    +---> [INSTITUTION / SCHOOL] (e.g., DPS Bengaluru North - CBSE)
                    |            |---> [CAMPUS A - Main Campus]
                    |            |---> [CAMPUS B - Primary Wing]
                    |            |---> [SCHOOL ADMIN]
                    |            |---> [TEACHERS]
                    |            |---> [STUDENTS & GUARDIANS]
                    |
                    +---> [INSTITUTION / SCHOOL] (e.g., DPS Pune - Maharashtra State Board)
                                 |---> [CAMPUS 1]
                                 |---> [SCHOOL ADMIN]
                                 |---> [TEACHERS]
                                 |---> [STUDENTS & GUARDIANS]
```

#### Isolation Guarantees:
1. **Zero URL-Based Role Elevation**: A student altering `/student/dashboard` to `/admin/dashboard` is intercepted at the middleware layer; tokens specify cryptographically signed claims (`role`, `tenantId`, `userId`, `campusIds`).
2. **Mandatory Tenant Scoping in Database Queries**: Every school-specific query is programmatically bound with `tenantId` (Institution ID) extracted exclusively from the authenticated, verified session token—never from query parameters or user-controlled payload bodies.
3. **Cross-Tenant Leakage Prevention**: Directors can query multiple institutions within their assigned `InstitutionGroup`. School Admins, Teachers, and Students are strictly confined to their authorized `institutionId` and assigned `campusId`.

---

### 3. Four Specialized Portals & Access Control

| Portal | Route Prefix | Primary Persona | Key Capabilities |
|---|---|---|---|
| **Director** | `/director` | Board Chairman, Trustees, Managing Directors | Group KPIs, multi-campus comparison, revenue vs expenses, academic benchmarking across boards, fee collection velocity, high-level approvals. |
| **Admin** | `/admin` | Principal, School Admin, Registrar, Accounts | Student lifecycle, admissions CRM, staff & payroll, fee structures & receipts, timetable generation, exam creation & marks publishing, circulars, transport & inventory. |
| **Teacher** | `/teacher` | Subject Teachers, Class Teachers, HODs | Daily attendance, homework & study material publishing, marks entry, syllabus tracker, teaching diary, leave applications, AI lesson planning & quiz assistance. |
| **Student** | `/student` | Students, Parents / Guardians | Digital identity card with QR, real-time timetable, attendance analytics, homework submissions, exam schedules, report card downloads, online fee payment, notices. |

---

### 4. Unique Identification Engine Specification

Collision-resistant, human-readable IDs paired with underlying immutable UUIDs:

| Entity | Pattern | Example | Generation Mechanism |
|---|---|---|---|
| **Institution** | `INS-IND-[6-digit]` | `INS-IND-000001` | Global sequence counter in PostgreSQL |
| **Campus** | `CAM-INS[6-digit]-[3-digit]` | `CAM-INS000001-001` | Institution-scoped campus sequence |
| **Director** | `DIR-INS[6-digit]-[6-digit]` | `DIR-INS000001-000001` | Group / Institution sequence |
| **Admin** | `ADM-INS[6-digit]-[6-digit]` | `ADM-INS000001-000001` | Institution-scoped sequence |
| **Teacher** | `TCH-INS[6-digit]-[6-digit]` | `TCH-INS000001-000001` | Institution-scoped sequence |
| **Staff** | `STF-INS[6-digit]-[6-digit]` | `STF-INS000001-000001` | Institution-scoped sequence |
| **Student** | `STU-INS[6-digit]-[6-digit]` | `STU-INS000001-000001` | Institution-scoped student sequence |
| **Admission No.** | `ADM-[YYYY]-[4-digit]` | `ADM-2026-0001` | Institution-scoped annual admission sequence |
| **Academic Year** | `AY-[YYYY]-[YYYY]` | `AY-2026-2027` | Standardized annual convention |

#### Student Transfer Protocol:
- If Student `STU-INS000001-000042` transfers from School 1 to School 2:
  - Global Person UUID remains intact.
  - Previous enrollment is marked `TRANSFERRED` with timestamp and TC reference.
  - A new local enrollment is created under School 2 with a fresh local admission number (e.g. `ADM-2026-0158`).
  - Historical marks cards remain sealed under School 1's tenant record; transfer requires Director/Admin authorization workflow.

---

### 5. Multi-Board Management Engine

The engine abstracts board-specific academic rules into dynamic schemas:

1. **CBSE Pattern**:
   - Continuous assessment: Periodic Tests (PT 1, 2, 3), Multiple Assessments, Portfolio, Subject Enrichment (Total 20 marks Internal Assessment + 80 marks Annual Examination).
   - 9-point grading scale (A1, A2, B1, B2, C1, C2, D, E1, E2).
   - Co-scholastic activities (Work Education, Art Education, Health & Physical Education - graded on 5-point scale A to E).
2. **Karnataka State Board (KSEAB)**:
   - Formative Assessment (FA 1, 2, 3, 4) + Summative Assessment (SA 1, SA 2).
   - Three-language system (First Language 125 marks, Second Language 100 marks, Third Language 100 marks; Core subjects 100 marks each).
   - CCE grade boundaries.
3. **Maharashtra State Board (MSBSHSE)**:
   - Unit Tests, Semester 1, Semester 2, Oral/Practical marks components.
4. **Tamil Nadu State Board (TNSB)** & **Kerala State Board (KBPE)**:
   - Term 1, Term 2, Term 3 examination patterns with CE (Continuous Evaluation) and TE (Terminal Evaluation).
5. **Configurable Template Schema**:
   - JSON-driven rules versioned by `academicYearId`.
   - Multilingual support: English, Hindi, Kannada, Tamil, Telugu, Malayalam, Marathi.

---

### 6. AI Assistance Engine Architecture

All AI features operate under strict **Human-in-the-Loop (HITL)** governance and privacy guardrails:
- **No PII Transmission**: AI prompts are stripped of student names, Aadhaar/government IDs, phone numbers, and addresses. Only anonymized, aggregated academic metrics and curriculum descriptors are supplied.
- **Draft Status Only**: AI Timetables, AI Lesson Plans, AI Question Papers, and At-Risk Student Indicators are generated with status `DRAFT_PENDING_REVIEW` and must be explicitly approved by an authorized teacher or administrator.
- **Modules**:
  1. *AI Timetable Scheduler*: Constraint satisfaction algorithm with teacher workload limits, room availability, and subject period caps.
  2. *AI Lesson Planner*: Structured lesson outcomes aligned with board syllabus units.
  3. *AI Question Bank & Quiz Generator*: Bloom's Taxonomy categorized questions (Knowledge, Comprehension, Application, Analysis).
  4. *AI Early Warning Engine*: Rules and statistical indicators highlighting students dipping below attendance thresholds or showing consecutive score declines.

---

### 7. Security, DPDP Compliance & DevOps

- **Password Hashing**: `bcrypt` (12 salt rounds) or Argon2id.
- **Session Tokens**: Cryptographically signed HttpOnly cookies or Authorization Bearer tokens with strict expiration and refresh rotation.
- **Rate Limiting**: In-memory token bucket on authentication endpoints (`/api/auth/login`) to thwart brute-force attempts.
- **Audit Logging**: Comprehensive `audit_logs` tracking IP address, user agent, actor ID, action type, target entity, timestamp, and changes diff.
- **Deployment**:
  - Containerized with Docker and Docker Compose.
  - One-command startup via `docker-compose up -d`.
  - Production-ready PostgreSQL with volume persistence and backup/restore automation scripts.
