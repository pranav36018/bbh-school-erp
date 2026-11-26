import {
  DEMO_STUDENTS,
  STATE_ACADEMIC_REPORT,
  CBSE_ACADEMIC_REPORT,
  DemoStudentDetail,
  DemoStudentTransport,
} from "./mock-data";
import { ROSTER_STUDENTS, RosterUser } from "./school-roster";
import { BoardSlug, UserSessionPayload } from "./types";

export interface AcademicHistoryEntry {
  academicYear: string;
  className: string;
  board: string;
  percentage: string;
  grade: string;
  status: string;
  remarks: string;
}

export interface SubjectScoreEntry {
  code: string;
  subject: string;
  maxMarks: number;
  obtainedMarks: number;
  grade: string;
}

export interface AttendanceMonthEntry {
  month: string;
  workingDays: number;
  present: number;
  absent: number;
  pct: string;
}

export interface FeeLedgerEntry {
  receiptNo: string;
  term: string;
  amount: number;
  method: string;
  date: string;
  status: "PAID" | "PARTIAL" | "PENDING";
}

export interface CompleteStudentProfile {
  // Identity & Admission
  id: string;
  humanId: string;
  admissionNo: string;
  admissionDate: string;
  academicYear: string;
  enrollmentStatus: string;
  fullName: string;
  initial: string;
  className: string;
  section: string;
  medium: string;
  rollNumber: number;
  board: BoardSlug;
  boardBadge: string;
  boardFullName: string;
  campus: string;
  classTeacher: string;
  // Personal
  dob: string;
  gender: string;
  bloodGroup: string;
  nationality: string;
  motherTongue: string;
  aadhaarMasked: string;
  studentEmail: string;
  // Guardian & Address
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  address: string;
  // Transport
  transport: DemoStudentTransport;
  // Required History
  overallGrade: string;
  overallPct: string;
  academicHistory: AcademicHistoryEntry[];
  subjectPerformance: SubjectScoreEntry[];
  attendanceSummary: {
    percentage: number;
    workingDays: number;
    presentDays: number;
    absentDays: number;
    eligible: boolean;
  };
  attendanceHistory: AttendanceMonthEntry[];
  feeSummary: {
    annualFee: number;
    paidAmount: number;
    balance: number;
    status: "PAID" | "PARTIAL" | "PENDING";
  };
  feeHistory: FeeLedgerEntry[];
  conductAndMilestones: {
    conductRating: string;
    disciplinaryRemarks: string;
    libraryStatus: string;
    coScholasticHighlights: { area: string; grade: string; detail: string }[];
  };
}

const STANDARD_LADDER = [
  "Pre-KG",
  "LKG",
  "UKG",
  "Standard 1",
  "Standard 2",
  "Standard 3",
  "Standard 4",
  "Standard 5",
  "Standard 6",
  "Standard 7",
  "Standard 8",
  "Standard 9",
  "Standard 10",
];

function normalizeClassIndex(rawClass: string): number {
  const c = (rawClass || "").trim().toLowerCase();
  if (c.includes("pre-kg") || c.includes("pre kg")) return 0;
  if (c.includes("lkg")) return 1;
  if (c.includes("ukg")) return 2;
  const numMatch = c.match(/\d+/);
  if (numMatch) {
    const num = parseInt(numMatch[0], 10);
    if (num >= 1 && num <= 10) return num + 2;
  }
  return 10; // Default Standard 8
}

function deterministicHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) % 100000;
  }
  return Math.abs(h);
}

/**
 * Converts a 592-entry official Excel roster record into a full student registry entry
 * with deterministic personal, guardian, attendance, and fee fields.
 */
export function mapRosterStudentToDetail(rs: RosterUser, idx: number): DemoStudentDetail & {
  admissionDate: string;
  legacyUserName: string;
  studentEmail: string;
  board: BoardSlug;
} {
  const bloodGroups = ["O+", "B+", "A+", "AB+", "O-", "B-"];
  const grades = ["A+", "A1", "A", "A2", "B+"];
  const clsIdx = normalizeClassIndex(rs.className || "Standard 1");
  const birthYear = Math.max(2009, 2023 - clsIdx);
  const birthMonth = String(((idx * 3) % 12) + 1).padStart(2, "0");
  const birthDay = String(((idx * 7) % 27) + 1).padStart(2, "0");
  const attend = Number((90 + ((idx * 13) % 9) + ((idx % 10) / 10)).toFixed(1));
  const admYear = Math.max(2018, 2026 - Math.min(clsIdx, 6));

  return {
    id: rs.id,
    humanId: rs.schoolId,
    fullName: rs.name,
    className: rs.className || "Standard 1",
    section: rs.section || "A",
    rollNumber: idx + 1,
    admissionNo: rs.admNo || `ADM-${1000 + idx}`,
    admissionDate: `01-06-${admYear}`,
    gender: idx % 2 === 0 ? "Male" : "Female",
    dob: `${birthYear}-${birthMonth}-${birthDay}`,
    bloodGroup: bloodGroups[idx % bloodGroups.length],
    guardianName: `Parent / Guardian of ${rs.name.split(" ")[0]}`,
    guardianPhone: "+91 98450 " + String(10000 + ((idx * 137) % 89999)).padStart(5, "0"),
    guardianEmail: rs.email.replace("svvk.demo", "guardian.svvk.demo"),
    institutionId: "inst-state",
    attendancePct: Math.min(99.2, attend),
    overallGrade: grades[idx % grades.length],
    feeStatus: "PAID",
    feeBalance: 0,
    legacyUserName: rs.email,
    studentEmail: rs.email,
    board: "state",
    transport: { opted: false },
  };
}

/**
 * Returns the combined unified registry of official Excel roster students + demo/imported students.
 */
export function getAllRegistryStudents() {
  const rosterMapped = ROSTER_STUDENTS.map((rs, idx) => mapRosterStudentToDetail(rs, idx));
  return [...rosterMapped, ...DEMO_STUDENTS];
}

/**
 * Builds complete student profile details and multi-category required history
 * for display without QR codes.
 */
export function buildCompleteStudentProfile(
  raw: any,
  preferredBoard?: BoardSlug
): CompleteStudentProfile {
  const id = raw.id || "stu-state-001";
  const seed = deterministicHash(String(raw.admissionNo || raw.humanId || raw.fullName || id));
  const board: BoardSlug =
    raw.board === "cbse" || raw.institutionId?.includes("cbse")
      ? "cbse"
      : raw.board === "state" || raw.institutionId?.includes("state")
      ? "state"
      : preferredBoard || "state";

  const isState = board === "state";
  const className = raw.className || (isState ? "Standard 8" : "Class 10");
  const section = raw.section || (isState ? "EM" : "A");
  const medium =
    section === "KM"
      ? "Kannada Medium (KM)"
      : section === "EM"
      ? "English Medium (EM)"
      : "English Medium";

  const clsIdx = normalizeClassIndex(className);
  const overallGrade = raw.overallGrade || (isState ? "A+" : "A1");
  const overallPctNum =
    raw.id === "stu-state-001"
      ? STATE_ACADEMIC_REPORT.percentage
      : raw.id === "stu-001"
      ? CBSE_ACADEMIC_REPORT.percentage
      : Number((84 + (seed % 14) + (seed % 10) / 10).toFixed(1));

  // Build Academic Progression History (up to 3 prior academic years that fit standard ladder)
  const academicHistory: AcademicHistoryEntry[] = [];
  const startOffset = Math.min(2, clsIdx);
  for (let offset = startOffset; offset >= 1; offset--) {
    const prevIdx = clsIdx - offset;
    const yrStart = 2026 - offset;
    const prevClass = STANDARD_LADDER[prevIdx] || `Standard ${Math.max(1, prevIdx - 2)}`;
    const prevPct = Math.max(72, Number((overallPctNum - offset * 1.4).toFixed(1)));
    academicHistory.push({
      academicYear: `AY ${yrStart}-${String((yrStart + 1) % 100).padStart(2, "0")}`,
      className: prevClass,
      board: isState ? "Karnataka State (KSEAB)" : "CBSE New Delhi",
      percentage: `${prevPct}%`,
      grade: prevPct >= 90 ? (isState ? "A+" : "A1") : prevPct >= 80 ? (isState ? "A" : "A2") : "B+",
      status: "Promoted",
      remarks: prevPct >= 90 ? "Passed with Distinction" : "Passed in First Class",
    });
  }
  academicHistory.push({
    academicYear: "AY 2026-27 (Current)",
    className: `${className} (${section})`,
    board: isState ? "Karnataka State (KSEAB)" : "CBSE (830680)",
    percentage: `${overallPctNum}%`,
    grade: overallGrade,
    status: "Active • Enrolled",
    remarks: isState ? "Ongoing CCE Evaluation (FA1–SA2)" : "Ongoing CBSE Assessment Cycle",
  });

  // Build Subject Performance Summary
  let subjectPerformance: SubjectScoreEntry[] = [];
  if (raw.id === "stu-state-001" || raw.humanId === "STU-STATE-000042") {
    subjectPerformance = STATE_ACADEMIC_REPORT.subjects.map((s) => ({
      code: s.code,
      subject: s.name,
      maxMarks: s.maxMarks,
      obtainedMarks: s.obtainedMarks,
      grade: s.grade,
    }));
  } else if (raw.id === "stu-001" || raw.humanId === "STU-CBSE-000012") {
    subjectPerformance = CBSE_ACADEMIC_REPORT.subjects.map((s) => ({
      code: s.code,
      subject: s.name,
      maxMarks: s.maxMarks,
      obtainedMarks: s.obtainedMarks,
      grade: s.grade,
    }));
  } else if (clsIdx <= 2) {
    // Pre-Primary (Kreedo) Activity Domains
    subjectPerformance = [
      { code: "KR-01", subject: "Phonics & Early Literacy", maxMarks: 100, obtainedMarks: 90 + (seed % 8), grade: overallGrade },
      { code: "KR-02", subject: "Numeracy & Spatial Logic", maxMarks: 100, obtainedMarks: 89 + (seed % 9), grade: overallGrade },
      { code: "KR-03", subject: "Environmental Awareness (EVS)", maxMarks: 100, obtainedMarks: 91 + (seed % 7), grade: overallGrade },
      { code: "KR-04", subject: "Motor Skills, Art & Rhythm", maxMarks: 100, obtainedMarks: 93 + (seed % 6), grade: overallGrade },
    ];
  } else if (isState) {
    const base = Math.round(overallPctNum);
    subjectPerformance = [
      { code: "01K", subject: "First Language: Kannada", maxMarks: 125, obtainedMarks: Math.min(123, Math.round(base * 1.25)), grade: overallGrade },
      { code: "02E", subject: "Second Language: English", maxMarks: 100, obtainedMarks: Math.min(98, base - 1), grade: overallGrade },
      { code: "03H", subject: "Third Language: Hindi", maxMarks: 100, obtainedMarks: Math.min(96, base - 3), grade: "A" },
      { code: "81M", subject: "Mathematics", maxMarks: 100, obtainedMarks: Math.min(99, base + 2), grade: overallGrade },
      { code: "83S", subject: "General Science", maxMarks: 100, obtainedMarks: Math.min(98, base + 1), grade: overallGrade },
      { code: "85SS", subject: "Social Science", maxMarks: 100, obtainedMarks: Math.min(97, base), grade: overallGrade },
    ];
  } else {
    const base = Math.round(overallPctNum);
    subjectPerformance = [
      { code: "184", subject: "English Language & Literature", maxMarks: 100, obtainedMarks: Math.min(98, base), grade: overallGrade },
      { code: "002", subject: "Second Language (Hindi / Kannada)", maxMarks: 100, obtainedMarks: Math.min(96, base - 2), grade: "A2" },
      { code: "041", subject: "Mathematics", maxMarks: 100, obtainedMarks: Math.min(99, base + 2), grade: overallGrade },
      { code: "086", subject: "Science", maxMarks: 100, obtainedMarks: Math.min(98, base + 1), grade: overallGrade },
      { code: "087", subject: "Social Science", maxMarks: 100, obtainedMarks: Math.min(97, base - 1), grade: overallGrade },
    ];
  }

  // Build Attendance History consistent with attendancePct
  const attPct = Number(raw.attendancePct ?? 94.2);
  const workingDays = 120;
  const presentDays = Math.min(workingDays, Math.round((attPct / 100) * workingDays));
  const absentDays = workingDays - presentDays;

  const monthTemplates = [
    { month: "June 2026", workingDays: 22 },
    { month: "July 2026", workingDays: 24 },
    { month: "August 2026", workingDays: 21 },
    { month: "September 2026", workingDays: 23 },
    { month: "October 2026", workingDays: 20 },
    { month: "November 2026 (MTD)", workingDays: 10 },
  ];
  let remainingAbsent = absentDays;
  const attendanceHistory: AttendanceMonthEntry[] = monthTemplates.map((mt, idx) => {
    const abs =
      idx === monthTemplates.length - 1
        ? remainingAbsent
        : remainingAbsent > 0 && idx % 2 === 0
        ? Math.min(remainingAbsent, Math.ceil(absentDays / 4))
        : remainingAbsent > 0
        ? 1
        : 0;
    const boundedAbs = Math.min(mt.workingDays - 1, Math.max(0, abs));
    remainingAbsent = Math.max(0, remainingAbsent - boundedAbs);
    const pres = mt.workingDays - boundedAbs;
    return {
      month: mt.month,
      workingDays: mt.workingDays,
      present: pres,
      absent: boundedAbs,
      pct: `${((pres / mt.workingDays) * 100).toFixed(1)}%`,
    };
  });

  // Build Fee Ledger History
  const annualFee = isState ? 42000 : 68000;
  const balance = Number(raw.feeBalance ?? 0);
  const feeStatus: "PAID" | "PARTIAL" | "PENDING" =
    raw.feeStatus || (balance === 0 ? "PAID" : balance < annualFee ? "PARTIAL" : "PENDING");
  const paidAmount = Math.max(0, annualFee - balance);
  const half = Math.round(annualFee / 2);
  const admSuffix = String(raw.admissionNo || "0042").replace(/[^a-zA-Z0-9]/g, "").slice(-4);

  const feeHistory: FeeLedgerEntry[] = [
    {
      receiptNo: `REC-${isState ? "STA" : "CBSE"}-26-${admSuffix}-T1`,
      term: `Term 1 Composite Fee (${isState ? "State" : "CBSE"})`,
      amount: half,
      method: paidAmount >= half ? `UPI (UTR: 61892${1000 + (seed % 8999)})` : "Pending Settlement",
      date: "12 Jun 2026",
      status: paidAmount >= half ? "PAID" : paidAmount > 0 ? "PARTIAL" : "PENDING",
    },
    {
      receiptNo: `REC-${isState ? "STA" : "CBSE"}-26-${admSuffix}-T2`,
      term: `Term 2 Composite Fee (${isState ? "State" : "CBSE"})`,
      amount: annualFee - half,
      method: balance === 0 ? `UPI (UTR: 62901${1000 + (seed % 8999)})` : "Due Balance",
      date: balance === 0 ? "05 Oct 2026" : "Due 15 Dec 2026",
      status: balance === 0 ? "PAID" : paidAmount > half ? "PARTIAL" : "PENDING",
    },
  ];

  const defaultAdmYear = Math.max(2019, 2026 - Math.min(clsIdx, 6));
  const admissionDate = raw.admissionDate || `01-06-${defaultAdmYear}`;
  const fullName = raw.fullName || "Kiran Kumar S";

  return {
    id,
    humanId: raw.humanId || raw.admissionNo || "STU-SVVK-0001",
    admissionNo: raw.admissionNo || raw.humanId || "SVVK-2026-0001",
    admissionDate,
    academicYear: "AY-2026-2027",
    enrollmentStatus: "Active • Regular",
    fullName,
    initial: fullName.charAt(0).toUpperCase(),
    className,
    section,
    medium,
    rollNumber: raw.rollNumber || 1,
    board,
    boardBadge: isState ? "Karnataka State Board (KSEAB)" : "CBSE Affil: 830680",
    boardFullName: isState
      ? "Karnataka State Board (KSEAB / DSERT)"
      : "Central Board of Secondary Education (CBSE Affil: 830680)",
    campus: "Sri Vivekananda Vidya Kendra • Hoskote, Bengaluru Rural – 562114",
    classTeacher: isState ? "Sri Ramesh Gowda (Senior Faculty)" : "Ms. Ananya Sharma (PGT Faculty)",
    dob: raw.dob || "2012-05-18",
    gender: raw.gender || "Male",
    bloodGroup: raw.bloodGroup || "O+",
    nationality: "Indian",
    motherTongue: isState ? "Kannada" : "English / Hindi",
    aadhaarMasked: `XXXX-XXXX-${String(1000 + (seed % 8999))} (UIDAI Verified)`,
    studentEmail:
      raw.studentEmail ||
      raw.legacyUserName ||
      `${fullName.toLowerCase().replace(/[^a-z0-9]/g, ".").replace(/\.+/g, ".")}@svvk.edu.in`,
    guardianName: raw.guardianName || `Parent / Guardian of ${fullName.split(" ")[0]}`,
    guardianPhone: raw.guardianPhone || "+91 98451 22334",
    guardianEmail: raw.guardianEmail || "guardian@svvk.edu.in",
    address: "Hoskote Taluk, Bengaluru Rural District – 562114, Karnataka",
    transport: raw.transport || { opted: false },
    overallGrade,
    overallPct: `${overallPctNum}%`,
    academicHistory,
    subjectPerformance,
    attendanceSummary: {
      percentage: attPct,
      workingDays,
      presentDays,
      absentDays,
      eligible: attPct >= 75,
    },
    attendanceHistory,
    feeSummary: {
      annualFee,
      paidAmount,
      balance,
      status: feeStatus,
    },
    feeHistory,
    conductAndMilestones: {
      conductRating: "Exemplary & Well-Disciplined",
      disciplinaryRemarks: "0 Negative Remarks • Clean Conduct History",
      libraryStatus: "No Overdue Books • Active Member",
      coScholasticHighlights: [
        { area: "Physical & Health Education", grade: "A", detail: "Regular participant in athletics & yoga" },
        { area: "Value Education & Ethics", grade: "A", detail: "Respectful conduct and peer leadership" },
        { area: "Science, Logic & Projects", grade: "A", detail: "Active in Brain Spark Mind Games & fairs" },
        { area: "Art & Cultural Participation", grade: "A", detail: "Participates in school annual celebrations" },
      ],
    },
  };
}

/**
 * Resolves the appropriate CompleteStudentProfile from a session payload or active board showcase.
 */
export function resolveStudentProfile(
  session: UserSessionPayload | null,
  activeBoard: BoardSlug
): CompleteStudentProfile {
  if (session && session.role === "STUDENT") {
    const cleanEmail = session.email.toLowerCase();

    // 1. Check BASE & IMPORTED DEMO_STUDENTS
    const matchedDemo = DEMO_STUDENTS.find(
      (s: any) =>
        s.humanId === session.humanId ||
        s.id === session.userId.replace(/^usr-/, "") ||
        (s.studentEmail && s.studentEmail.toLowerCase() === cleanEmail) ||
        (cleanEmail === "student.state@svvk.edu.in" && s.id === "stu-state-001") ||
        (cleanEmail === "student.cbse@svvk.edu.in" && s.id === "stu-001") ||
        (cleanEmail === "student.aarav@indiaunifiederp.edu.in" && s.id === "stu-001")
    );
    if (matchedDemo) {
      return buildCompleteStudentProfile(matchedDemo, session.board || activeBoard);
    }

    // 2. Check 592 ROSTER_STUDENTS
    const rosterIdx = ROSTER_STUDENTS.findIndex(
      (r) =>
        r.id === session.userId ||
        r.email.toLowerCase() === cleanEmail ||
        r.schoolId === session.humanId
    );
    if (rosterIdx >= 0) {
      return buildCompleteStudentProfile(
        mapRosterStudentToDetail(ROSTER_STUDENTS[rosterIdx], rosterIdx),
        session.board || activeBoard
      );
    }
  }

  // Fallback to showcase student for active board
  const showcase =
    activeBoard === "state"
      ? DEMO_STUDENTS.find((s) => s.id === "stu-state-001") || DEMO_STUDENTS[0]
      : DEMO_STUDENTS.find((s) => s.id === "stu-001") || DEMO_STUDENTS[1] || DEMO_STUDENTS[0];

  return buildCompleteStudentProfile(showcase, activeBoard);
}

/**
 * Looks up any student across all 592+ Excel roster students, 100 imported students,
 * and base demo students by ID, Human ID, or Admission Number for QR scan resolution.
 */
export function findStudentByIdentifier(identifier: string): CompleteStudentProfile | null {
  if (!identifier) return null;
  let decoded = identifier;
  try {
    decoded = decodeURIComponent(identifier);
  } catch {
    decoded = identifier;
  }
  const normalized = decoded.trim().toLowerCase();

  const allStudents = getAllRegistryStudents();
  const matched =
    allStudents.find((s: any) => String(s.id || "").toLowerCase() === normalized) ||
    allStudents.find(
      (s: any) =>
        String(s.humanId || "").toLowerCase() === normalized ||
        String(s.admissionNo || "").toLowerCase() === normalized
    );

  if (!matched) return null;
  return buildCompleteStudentProfile(matched);
}

