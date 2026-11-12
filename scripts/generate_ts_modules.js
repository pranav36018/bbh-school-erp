const fs = require("fs");
const path = require("path");

const students = JSON.parse(fs.readFileSync(path.join(__dirname, "students_enriched.json"), "utf-8"));
const staff = JSON.parse(fs.readFileSync(path.join(__dirname, "staff_enriched.json"), "utf-8"));

// 1. Generate src/lib/imported-students.ts
const studentFileContent = `import type { DemoStudentDetail, DemoUser } from "./mock-data";

export interface ImportedStudentItem extends DemoStudentDetail {
  admissionDate: string;
  legacyUserName: string;
  studentEmail: string;
  standardRaw: string;
  firstName: string;
  lastName: string;
}

export const IMPORTED_STUDENTS: ImportedStudentItem[] = ${JSON.stringify(students, null, 2)};

export const IMPORTED_STUDENT_USERS: DemoUser[] = IMPORTED_STUDENTS.map((s) => ({
  id: "usr-" + s.id,
  humanId: s.humanId,
  email: s.studentEmail,
  passwordText: "Student@2026",
  role: "STUDENT",
  firstName: s.firstName,
  lastName: s.lastName,
  phoneNumber: s.guardianPhone,
  institutionId: s.institutionId,
  institutionName: "DPS Bengaluru North",
  designation: \`\${s.className} - \${s.section} | Adm #\${s.admissionNo}\`,
  targetPortal: "student",
}));
`;

fs.writeFileSync(path.join(__dirname, "../src/lib/imported-students.ts"), studentFileContent, "utf-8");
console.log("Wrote src/lib/imported-students.ts");

// 2. Generate src/lib/imported-staff.ts
const staffFileContent = `import type { DemoUser } from "./mock-data";

export interface ImportedStaffItem {
  id: string;
  humanId: string;
  name: string;
  firstName: string;
  lastName: string;
  role: "TEACHER" | "SCHOOL_ADMIN";
  department: "ACADEMICS" | "ADMINISTRATION" | "SUPPORT" | "LOGISTICS";
  categoryLabel: string;
  designation: string;
  rawRole: string;
  qualification: string;
  dob: string;
  phone: string;
  address: string;
  email: string;
  passwordText: string;
  institutionId: string;
  institutionName: string;
  targetPortal: "teacher" | "admin";
}

export const IMPORTED_STAFF: ImportedStaffItem[] = ${JSON.stringify(staff, null, 2)};

export const IMPORTED_STAFF_USERS: DemoUser[] = IMPORTED_STAFF.map((st) => ({
  id: st.id,
  humanId: st.humanId,
  email: st.email,
  passwordText: st.passwordText,
  role: st.role,
  firstName: st.firstName,
  lastName: st.lastName,
  phoneNumber: st.phone,
  institutionId: st.institutionId,
  institutionName: st.institutionName,
  designation: st.designation,
  targetPortal: st.targetPortal,
}));
`;

fs.writeFileSync(path.join(__dirname, "../src/lib/imported-staff.ts"), staffFileContent, "utf-8");
console.log("Wrote src/lib/imported-staff.ts");
