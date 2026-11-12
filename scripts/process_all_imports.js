const fs = require("fs");
const path = require("path");

// 1. Read Admission_Students.csv
const csvPath = path.join(__dirname, "../Admission_Students.csv");
const csvContent = fs.readFileSync(csvPath, "utf-8");
const lines = csvContent.split(/\r?\n/).filter(line => line.trim().length > 0);

function parseCsvLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function cleanPhone(raw, fallback) {
  if (!raw) raw = fallback || "";
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.substring(2);
  }
  if (digits.length === 10) {
    return `+91 ${digits.substring(0, 5)} ${digits.substring(5)}`;
  }
  return raw || "+91 98860 00000";
}

function formatName(name) {
  return name.trim();
}

function cleanEmailPart(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Parse Students
const rawStudents = [];
for (let i = 1; i < lines.length; i++) {
  const cols = parseCsvLine(lines[i]);
  if (cols.length >= 6) {
    rawStudents.push({
      studentName: cols[0].replace(/^"|"$/g, "").trim(),
      standard: cols[1].replace(/^"|"$/g, "").trim(),
      userName: cols[2].replace(/^"|"$/g, "").trim(),
      mobileNo: cols[3].replace(/^"|"$/g, "").replace(/^'\+/, "+").trim(),
      admissionDate: cols[4].replace(/^"|"$/g, "").trim(),
      admissionNum: cols[5].replace(/^"|"$/g, "").trim(),
    });
  }
}

// Group students by standard to calculate roll numbers
const classRollCounters = {};
const bloodGroups = ["O+", "A+", "B+", "AB+", "O-", "B-"];

const parsedStudents = rawStudents.map((s, idx) => {
  const std = s.standard;
  let className = "Class 10";
  let section = "A";

  if (std.toLowerCase().includes("play home")) {
    className = "Play Home";
    section = "A";
  } else if (std.toLowerCase().includes("lkg")) {
    className = "LKG";
    section = "A";
  } else if (std.toLowerCase().includes("ukg")) {
    className = "UKG";
    section = "A";
  } else {
    const numMatch = std.match(/\d+/);
    const num = numMatch ? numMatch[0] : "10";
    className = `Class ${num}`;
    if (std.toUpperCase().includes("EM")) {
      section = "EM";
    } else if (std.toUpperCase().includes("KM")) {
      section = "KM";
    } else {
      section = "A";
    }
  }

  const key = `${className}-${section}`;
  classRollCounters[key] = (classRollCounters[key] || 0) + 1;
  const rollNumber = classRollCounters[key];

  const humanId = s.admissionNum;
  const phone = cleanPhone(s.mobileNo, s.userName);
  const safeName = s.studentName.replace(/[^a-zA-Z ]/g, "").trim() || "Student";
  const firstName = safeName.split(/\s+/)[0] || "Student";
  const lastName = safeName.split(/\s+/).slice(1).join(" ") || "BBH";
  const emailName = cleanEmailPart(firstName) || "student";
  const admSlug = cleanEmailPart(s.admissionNum) || `${idx + 1}`;
  const email = `student.${emailName}.${admSlug}@bbhschool.edu.in`;

  // Estimate DOB based on standard
  let birthYear = 2010;
  if (className === "Play Home") birthYear = 2022;
  else if (className === "LKG") birthYear = 2021;
  else if (className === "UKG") birthYear = 2020;
  else if (className === "Class 1") birthYear = 2019;
  else if (className === "Class 2") birthYear = 2018;
  else if (className === "Class 3") birthYear = 2017;
  else if (className === "Class 4") birthYear = 2016;
  else if (className === "Class 5") birthYear = 2015;
  else if (className === "Class 6") birthYear = 2014;
  else if (className === "Class 7") birthYear = 2013;
  else if (className === "Class 8") birthYear = 2012;
  else if (className === "Class 9") birthYear = 2011;
  else if (className === "Class 10") birthYear = 2010;

  const bg = bloodGroups[idx % bloodGroups.length];
  const attendancePct = parseFloat((88 + (idx * 7) % 11 + Math.random() * 0.9).toFixed(1));
  const grade = attendancePct >= 95 ? "A1" : attendancePct >= 85 ? "A2" : attendancePct >= 75 ? "B1" : "B2";
  const feeStatus = idx % 5 === 0 ? "PARTIAL" : idx % 12 === 0 ? "PENDING" : "PAID";
  const feeBalance = feeStatus === "PAID" ? 0 : feeStatus === "PARTIAL" ? 12500 : 35000;

  const isBus = idx % 3 !== 0; // 66% on bus
  const routeNum = (idx % 6) + 1;

  return {
    id: `stu-imp-${String(idx + 1).padStart(3, "0")}`,
    humanId,
    admissionNo: s.admissionNum,
    admissionDate: s.admissionDate,
    legacyUserName: s.userName,
    fullName: s.studentName,
    firstName,
    lastName,
    className,
    section,
    rollNumber,
    standardRaw: s.standard,
    gender: (idx % 2 === 0 ? "Male" : "Female"),
    dob: `${birthYear}-${String((idx % 12) + 1).padStart(2, "0")}-${String((idx % 28) + 1).padStart(2, "0")}`,
    bloodGroup: bg,
    guardianName: `Parent of ${s.studentName}`,
    guardianPhone: phone,
    guardianEmail: `parent.${emailName}@gmail.com`,
    studentEmail: email,
    institutionId: "inst-001",
    attendancePct,
    overallGrade: grade,
    feeStatus,
    feeBalance,
    transport: isBus ? {
      opted: true,
      routeId: `route-${routeNum}`,
      routeName: `Route ${routeNum} - Bengaluru North Zone ${routeNum}`,
      vehicleNumber: `KA-04-F-${1000 + routeNum}`,
      busNumber: `Bus #${routeNum}`,
      pickupStop: `Main Stop ${routeNum}`,
      pickupTime: "07:35 AM",
      dropTime: "03:45 PM",
      driverName: "Ramesh Kumar",
      driverPhone: "+91 98450 12345",
      attendantName: "Kavita Bai",
      attendantPhone: "+91 98450 67890",
      gpsTrackingId: `AIS140-BUS-0${routeNum}`,
      currentLocationName: "Near Kogilu Junction",
      latitude: 13.0924,
      longitude: 77.5976,
      speedKmh: 32,
      etaMinutes: 10,
      status: "ON_ROUTE",
    } : {
      opted: false,
    },
  };
});

// 2. Parse Staff from scripts/staff_parsed.json
const staffPath = path.join(__dirname, "staff_parsed.json");
const staffRaw = fs.readFileSync(staffPath, "utf-8").replace(/^\uFEFF/, "");
const rawStaff = JSON.parse(staffRaw);

const parsedStaff = rawStaff.map((st, idx) => {
  const rawRole = (st.Role || "Staff").trim();
  const rawQual = (st.Qualification || "").trim();
  const phone = cleanPhone(st.Phone, "");
  const name = st.Name.trim() || `Staff Member ${idx + 1}`;
  const parts = name.split(/\s+/);
  const firstName = parts[0] || "Staff";
  const lastName = parts.slice(1).join(" ") || "BBH";
  const emailName = cleanEmailPart(firstName) || "staff";

  let department = "ACADEMICS";
  let targetPortal = "teacher";
  let role = "TEACHER";
  let categoryLabel = "Teaching Faculty";
  let humanIdPrefix = "TCH";

  const lowerRole = rawRole.toLowerCase();
  if (lowerRole.includes("clerk") || lowerRole.includes("admin") || lowerRole.includes("finance") || lowerRole.includes("manager")) {
    department = "ADMINISTRATION";
    targetPortal = "admin";
    role = "SCHOOL_ADMIN";
    categoryLabel = "Administrative Staff";
    humanIdPrefix = "ADM";
  } else if (lowerRole.includes("driver") || lowerRole.includes("van")) {
    department = "LOGISTICS";
    targetPortal = "teacher";
    role = "TEACHER";
    categoryLabel = "Transport & Logistics";
    humanIdPrefix = "STF";
  } else if (lowerRole.includes("aaya") || lowerRole.includes("attender") || lowerRole.includes("security")) {
    department = "SUPPORT";
    targetPortal = "teacher";
    role = "TEACHER";
    categoryLabel = "Support & Childcare";
    humanIdPrefix = "STF";
  } else {
    // Teaching Faculty
    department = "ACADEMICS";
    targetPortal = "teacher";
    role = "TEACHER";
    categoryLabel = "Teaching Faculty";
    humanIdPrefix = "TCH";
  }

  const humanId = st.EmployeeId && st.EmployeeId.trim().length > 0
    ? st.EmployeeId.trim()
    : `${humanIdPrefix}-INS000001-${String(100001 + idx).padStart(6, "0")}`;

  const qualSuffix = rawQual ? ` • ${rawQual}` : "";
  const designation = `${rawRole}${qualSuffix}`;
  const email = `staff.${emailName}.${idx + 1}@bbhschool.edu.in`;

  return {
    id: `usr-stf-imp-${String(idx + 1).padStart(3, "0")}`,
    humanId,
    name,
    firstName,
    lastName,
    role,
    department,
    categoryLabel,
    designation,
    rawRole,
    qualification: rawQual,
    dob: st.DOB || "",
    phone,
    address: st.Address || "",
    email,
    passwordText: department === "ADMINISTRATION" ? "Admin@2026" : "Teacher@2026",
    institutionId: "inst-001",
    institutionName: "BBH School",
    targetPortal,
  };
});

console.log(`Generated ${parsedStudents.length} rich student records.`);
console.log(`Generated ${parsedStaff.length} rich staff records.`);

// Save output to JSON files
fs.writeFileSync(path.join(__dirname, "students_enriched.json"), JSON.stringify(parsedStudents, null, 2), "utf-8");
fs.writeFileSync(path.join(__dirname, "staff_enriched.json"), JSON.stringify(parsedStaff, null, 2), "utf-8");

console.log("Saved enriched JSON datasets to scripts/students_enriched.json and scripts/staff_enriched.json");
