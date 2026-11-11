# REST API SPECIFICATION
## India Unified School ERP Platform

All API endpoints return standard JSON responses following the schema:
```json
{
  "success": true,
  "data": { ... },
  "message": "Human readable description",
  "error": "Error message if success is false"
}
```

---

### 1. Authentication & Session Endpoints

#### `POST /api/auth/login`
Authenticates email and password against the user's role and portal permissions. Sets an HttpOnly session cookie (`school_erp_session`).
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "admin.dps@indiaunifiederp.edu.in",
    "password": "Admin@2026",
    "portal": "admin"
  }
  ```
- **Responses**:
  - `200 OK`: Authenticated, returns user session claims and `redirectTo`.
  - `401 Unauthorized`: Bad credentials.
  - `403 Forbidden`: Role not authorized for requested portal (e.g., student attempting admin login).

#### `POST /api/auth/logout`
Clears the session cookie (`school_erp_session`) with `maxAge: 0`.

#### `GET /api/auth/me`
Retrieves authenticated user session and associated profile.

---

### 2. Administrative Endpoints

#### `GET /api/admin/students`
Lists students scoped strictly to the authenticated administrator's institution (`institutionId`).
- **Query Params**: `page`, `limit`, `search`, `classId`
- **Security**: Requires `SCHOOL_ADMIN`, `DIRECTOR`, or `PLATFORM_OWNER`.

#### `POST /api/admin/students`
Enrolls a new student. Atomically invokes the **Unique Identification Engine** to generate:
- `humanId` (e.g. `STU-INS000001-000042`)
- `admissionNo` (e.g. `ADM-2026-0042`)
- Stores student document metadata.

#### `POST /api/admin/attendance`
Synchronizes daily roll-call attendance and triggers automated notifications for absent students.
- **Request Body**:
  ```json
  {
    "date": "2026-11-11",
    "schoolName": "DPS Bengaluru North",
    "absentStudents": [
      {
        "id": "stu-005",
        "name": "Karan Johar Patel",
        "phone": "+919844011005",
        "parentName": "Hitesh Patel"
      }
    ]
  }
  ```
- **Responses**:
  - `200 OK`: Dispatches DLT-compliant SMS and WhatsApp alerts.

---

### 3. AI Automation Endpoints

#### `POST /api/ai/timetable`
Generates conflict-free timetable drafts using constraint satisfaction logic.
- **Security**: Human approval required before publishing (`status: DRAFT_PENDING_APPROVAL`).

#### `POST /api/ai/lesson-plan`
Drafts structured pedagogical lesson plans adhering to Indian NCF guidelines.
- **Request Body**:
  ```json
  {
    "subject": "Mathematics Standard",
    "grade": "Class 10",
    "unitTitle": "Quadratic Equations",
    "durationMinutes": 45
  }
  ```

#### `POST /api/ai/question-paper`
Synthesizes examination papers balanced across Bloom's Taxonomy (MCQ, Short Answer, Long Answer).

#### `POST /api/ai/risk-analysis`
Analyzes student performance indicators to flag academic risk early without transmitting PII.

---

### 4. Verification & Health Endpoints

#### `POST /api/certificates/verify`
Verifies cryptographic QR payloads from report cards, Bonafide certificates, and student ID cards.
- **Request Body**:
  ```json
  {
    "qrData": "eyJwYXlsb2FkIjo...IsInNpZ25hdHVyZSI6Ii..."
  }
  ```
- **Responses**:
  - `200 OK`: Valid HMAC-SHA256 signature, decodes issuance payload.
  - `400 Bad Request`: Signature mismatch (tampering detected).

#### `GET /api/health`
Probes platform uptime, database status, and memory metrics.
