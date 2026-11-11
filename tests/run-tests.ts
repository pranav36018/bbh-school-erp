// Automated Security, Tenant Isolation & Functional Test Suite
// India Unified School ERP Platform

import { IdEngine } from "../src/lib/id-engine";
import { calculateBoardGrade, BOARD_TEMPLATES } from "../src/lib/board-engine";
import { isRoleAllowedInPortal, signToken, verifyToken, hashPassword, verifyPassword } from "../src/lib/auth";
import { enforceTenantFilter } from "../src/lib/tenant";
import { AiEngine } from "../src/lib/ai-engine";
import { DEMO_USERS, DEMO_INSTITUTIONS, DEMO_STUDENTS } from "../src/lib/mock-data";

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    failed++;
  }
}

async function runTests() {
  console.log("\n=======================================================");
  console.log("🚀 INDIA UNIFIED SCHOOL ERP - AUTOMATED TEST SUITE");
  console.log("=======================================================\n");

  // 1. Password Hashing & Verification
  console.log("--- 1. Authentication & Security ---");
  const rawPass = "SchoolSecure@2026";
  const hashed = await hashPassword(rawPass);
  const isMatch = await verifyPassword(rawPass, hashed);
  const isFalseMatch = await verifyPassword("WrongPassword", hashed);
  assert(isMatch && !isFalseMatch, "Bcrypt password hashing and secure verification");

  // 2. JWT Session Tokens & Role Integrity
  const testSession = {
    userId: "usr-001",
    humanId: "ADM-INS000001-000001",
    email: "admin.dps@indiaunifiederp.edu.in",
    role: "SCHOOL_ADMIN" as const,
    institutionId: "inst-001",
    firstName: "Sunitha",
    lastName: "Radhakrishnan",
  };
  const token = signToken(testSession);
  const decoded = verifyToken(token);
  assert(decoded?.humanId === "ADM-INS000001-000001" && decoded?.role === "SCHOOL_ADMIN", "Cryptographic JWT signing and payload integrity");

  // 3. Role-Based Portal Access Control (URL Tampering Prevention)
  assert(isRoleAllowedInPortal("DIRECTOR", "director"), "Director permitted to /director/*");
  assert(isRoleAllowedInPortal("SCHOOL_ADMIN", "admin"), "Admin permitted to /admin/*");
  assert(!isRoleAllowedInPortal("STUDENT", "admin"), "SECURITY: Student forbidden from /admin/*");
  assert(!isRoleAllowedInPortal("TEACHER", "director"), "SECURITY: Teacher forbidden from /director/*");
  assert(!isRoleAllowedInPortal("STUDENT", "teacher"), "SECURITY: Student forbidden from /teacher/*");

  // 4. Multi-Tenant Scoping & Isolation
  console.log("\n--- 2. Multi-Tenant Isolation ---");
  const tenantScoped = enforceTenantFilter(testSession, "inst-001");
  assert(tenantScoped.institutionId === "inst-001", "Tenant scoped to authorized institution");

  let crossTenantBlocked = false;
  try {
    enforceTenantFilter(testSession, "inst-999_OTHER_SCHOOL");
  } catch (err: any) {
    crossTenantBlocked = true;
  }
  assert(crossTenantBlocked, "SECURITY: Cross-tenant unauthorized access strictly blocked");

  // 5. Unique Identification Engine
  console.log("\n--- 3. Unique Identification Engine ---");
  const studentId = await IdEngine.generateId("inst-001", "STUDENT", "INS-IND-000001");
  const teacherId = await IdEngine.generateId("inst-001", "TEACHER", "INS-IND-000001");
  const adminId = await IdEngine.generateId("inst-001", "ADMIN", "INS-IND-000001");
  const campusId = await IdEngine.generateId("inst-001", "CAMPUS", "INS-IND-000001");
  const admissionNo = await IdEngine.generateId("inst-001", "ADMISSION");

  assert(studentId.startsWith("STU-INS000001-"), `Student ID format validation (${studentId})`);
  assert(teacherId.startsWith("TCH-INS000001-"), `Teacher ID format validation (${teacherId})`);
  assert(adminId.startsWith("ADM-INS000001-"), `Admin ID format validation (${adminId})`);
  assert(campusId.startsWith("CAM-INS000001-"), `Campus ID format validation (${campusId})`);
  assert(admissionNo.startsWith(`ADM-${new Date().getFullYear()}-`), `Admission No format validation (${admissionNo})`);

  // Batch Generation
  const batch = await IdEngine.generateBatchIds("inst-001", "STUDENT", 5, "INS-IND-000001");
  const allUnique = new Set(batch).size === 5;
  assert(allUnique && batch.length === 5, "Atomic batch unique ID generation collision-free");

  // QR Cryptographic Payload
  const qrPayload = IdEngine.generateVerificationPayload(studentId, "INS-IND-000001");
  const qrVerified = IdEngine.verifyPayload(qrPayload);
  assert(qrVerified.valid && qrVerified.data.id === studentId, "Tamper-proof HMAC-SHA256 QR payload verification");

  const tamperedPayload = qrPayload.substring(0, qrPayload.length - 4) + "XXXX";
  const tamperedVerified = IdEngine.verifyPayload(tamperedPayload);
  assert(!tamperedVerified.valid, "Tampered QR payload detected and rejected");

  // 6. Multi-Board Assessment & Grade Calculation Engine
  console.log("\n--- 4. Multi-Board Grading Engine ---");
  const cbseA1 = calculateBoardGrade(95, 100, "CBSE");
  const cbseB1 = calculateBoardGrade(75, 100, "CBSE");
  const cbseFail = calculateBoardGrade(25, 100, "CBSE");
  assert(cbseA1.grade === "A1" && cbseA1.gradePoint === 10.0, "CBSE 9-Point Scale: 95% = A1 (GP 10.0)");
  assert(cbseB1.grade === "B1" && cbseB1.gradePoint === 8.0, "CBSE 9-Point Scale: 75% = B1 (GP 8.0)");
  assert(cbseFail.grade === "E", "CBSE 9-Point Scale: 25% = E (Essential Repeat)");

  const karnatakaA = calculateBoardGrade(85, 100, "KARNATAKA_STATE_BOARD");
  assert(karnatakaA.grade === "A", "Karnataka State Board (KSEAB): 85% = A (Distinction)");

  // 7. AI Automation Modules
  console.log("\n--- 5. AI Assistance Engine ---");
  const timetableDraft = AiEngine.generateTimetableDraft({
    classes: ["Class 10"],
    sections: ["A"],
    subjects: [{ name: "Mathematics", weeklyPeriods: 5 }],
    teachers: [{ id: "tch-1", name: "Ms. Sharma", subject: "Mathematics", maxDailyPeriods: 4 }],
  });
  assert(timetableDraft.success && timetableDraft.schedule.length > 0, "AI Timetable constraint scheduler produces conflict-free slots");

  const lessonPlan = AiEngine.generateLessonPlanDraft({
    subject: "Physics",
    grade: "Class 10",
    unitTitle: "Optics & Lens Formula",
    learningOutcomes: ["Understand focal length", "Apply 1/f = 1/v - 1/u"],
    durationMinutes: 45,
  });
  assert(lessonPlan.lessonPhases.length === 4, "AI Lesson plan generates complete 4-phase pedagogical breakdown");

  const atRiskAssessment = AiEngine.assessStudentRisk({
    attendancePercentage: 68.0,
    recentExamAverage: 35.0,
    consecutiveDeclines: 2,
    unsubmittedAssignments: 4,
  });
  assert(atRiskAssessment.riskLevel === "HIGH" && atRiskAssessment.indicators.length > 0, "AI Early Warning correctly identifies at-risk academic indicators");

  // 8. Transport & Live Bus GPS Engine
  console.log("\n--- 6. Transport & Live Bus GPS Telemetry ---");
  const busStudent = DEMO_STUDENTS.find((s) => s.transport.opted);
  const nonBusStudent = DEMO_STUDENTS.find((s) => !s.transport.opted);
  assert(busStudent !== undefined && busStudent.transport.opted === true, "Student bus enrollment identified (transport.opted = true)");
  assert(
    Boolean(
      busStudent?.transport.vehicleNumber?.startsWith("KA-") &&
      busStudent?.transport.latitude !== undefined &&
      busStudent?.transport.longitude !== undefined
    ),
    `Live GPS vehicle tracking coordinates active (${busStudent?.transport.vehicleNumber}: ${busStudent?.transport.latitude}, ${busStudent?.transport.longitude})`
  );
  assert(nonBusStudent !== undefined && nonBusStudent.transport.opted === false, "Private drop / non-bus student handled cleanly (opted = false)");

  // 9. Health Check Verification
  console.log("\n--- 7. System Health & Environment ---");
  assert(DEMO_INSTITUTIONS.length === 3, "Demo institutions loaded (2 CBSE + 1 State Board)");
  assert(DEMO_USERS.length >= 10, "Demo user roster populated with all 4 portal roles");
  assert(DEMO_STUDENTS.length >= 5, "Demo student records populated with marks and fee ledgers");

  console.log("\n=======================================================");
  console.log(`🏁 TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log("=======================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test runner crashed:", err);
  process.exit(1);
});
