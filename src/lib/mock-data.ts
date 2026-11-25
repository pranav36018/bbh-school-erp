// Comprehensive Seed & Demo Data Store for India Unified School ERP
// Multi-School | Multi-Board | Multi-Campus

export interface DemoInstitution {
  id: string;
  code: string;
  name: string;
  groupName: string;
  boardType: "CBSE" | "KARNATAKA_STATE_BOARD" | "MAHARASHTRA_STATE_BOARD" | "TAMIL_NADU_STATE_BOARD" | "KERALA_STATE_BOARD";
  affiliationNumber: string;
  state: string;
  district: string;
  address: string;
  pincode: string;
  contactEmail: string;
  contactPhone: string;
  principalName: string;
  medium: string;
  campuses: { id: string; code: string; name: string; address: string }[];
  classes: string[];
}

export const DEMO_INSTITUTIONS: DemoInstitution[] = [
  {
    id: "inst-cbse",
    code: "INS-CBSE-562114",
    name: "Sri Vivekananda Vidya Kendra",
    groupName: "Swamy Vivekananda Vidya Kendra Trust",
    boardType: "CBSE",
    affiliationNumber: "830680",
    state: "Karnataka",
    district: "Bengaluru Rural",
    address: "Hoskote, Bengaluru Rural",
    pincode: "562114",
    contactEmail: "admin.cbse@svvk.edu.in",
    contactPhone: "+91 80 2797 1234",
    principalName: "Principal",
    medium: "English",
    campuses: [
      { id: "cam-cbse", code: "CAM-CBSE-001", name: "Main CBSE Campus", address: "Hoskote, Bengaluru Rural – 562114" },
    ],
    classes: ["LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
  },
  {
    id: "inst-001",
    code: "INS-IND-000001",
    name: "Sri Vivekananda Vidya Kendra (CBSE)",
    groupName: "Swamy Vivekananda Vidya Kendra Trust",
    boardType: "CBSE",
    affiliationNumber: "830680",
    state: "Karnataka",
    district: "Bengaluru Rural",
    address: "Hoskote, Bengaluru Rural",
    pincode: "562114",
    contactEmail: "admin@svvk.edu.in",
    contactPhone: "+91 80 2797 1234",
    principalName: "Principal",
    medium: "English",
    campuses: [
      { id: "cam-001", code: "CAM-INS000001-001", name: "Main Campus (CBSE)", address: "Hoskote, Bengaluru Rural – 562114" },
    ],
    classes: ["LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
  },
  {
    id: "inst-state",
    code: "INS-STATE-562114",
    name: "Sri Vivekananda Vidya Kendra (Karnataka State Board)",
    groupName: "Swamy Vivekananda Vidya Kendra Trust",
    boardType: "KARNATAKA_STATE_BOARD",
    affiliationNumber: "KSEAB/RECOG/BLR/2026/842",
    state: "Karnataka",
    district: "Bengaluru Rural",
    address: "Hoskote, Bengaluru Rural",
    pincode: "562114",
    contactEmail: "admin.state@svvk.edu.in",
    contactPhone: "+91 80 2797 1234",
    principalName: "Headmaster",
    medium: "Kannada & English",
    campuses: [
      { id: "cam-state", code: "CAM-STATE-001", name: "State Board Campus", address: "Hoskote, Bengaluru Rural – 562114" },
    ],
    classes: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
  },
  {
    id: "inst-003",
    code: "INS-IND-000003",
    name: "Sri Vivekananda Vidya Kendra (State Board)",
    groupName: "Swamy Vivekananda Vidya Kendra Trust",
    boardType: "KARNATAKA_STATE_BOARD",
    affiliationNumber: "KSEAB/RECOG/BLR/2026/842",
    state: "Karnataka",
    district: "Bengaluru Rural",
    address: "Hoskote, Bengaluru Rural",
    pincode: "562114",
    contactEmail: "admin.state@svvk.edu.in",
    contactPhone: "+91 80 2797 1234",
    principalName: "Headmaster",
    medium: "Kannada & English",
    campuses: [
      { id: "cam-004", code: "CAM-INS000003-001", name: "State Board Campus", address: "Hoskote, Bengaluru Rural – 562114" },
    ],
    classes: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
  },
];

export interface DemoUser {
  id: string;
  humanId: string;
  email: string;
  passwordText: string;
  role: "PLATFORM_OWNER" | "DIRECTOR" | "SCHOOL_ADMIN" | "TEACHER" | "STUDENT";
  firstName: string;
  lastName: string;
  phoneNumber: string;
  institutionId?: string;
  institutionName?: string;
  campusId?: string;
  designation?: string;
  targetPortal: "director" | "admin" | "teacher" | "student";
  board?: "state" | "cbse";
}

const BASE_DEMO_USERS: DemoUser[] = [
  // 1. Director / Trust Governance
  {
    id: "usr-dir-001",
    humanId: "DIR-SVVK-000001",
    email: "director@svvk.edu.in",
    passwordText: "Director@2026",
    role: "DIRECTOR",
    firstName: "Rajesh",
    lastName: "Singhania",
    phoneNumber: "+91 98450 11223",
    institutionId: "inst-cbse",
    institutionName: "Swamy Vivekananda Vidya Kendra Trust",
    designation: "Managing Trustee & Director",
    targetPortal: "director",
  },
  {
    id: "usr-dir-002",
    humanId: "DIR-INS000001-000001",
    email: "director@indiaunifiederp.edu.in",
    passwordText: "Director@2026",
    role: "DIRECTOR",
    firstName: "Rajesh",
    lastName: "Singhania",
    phoneNumber: "+91 98450 11223",
    institutionId: "inst-cbse",
    institutionName: "Swamy Vivekananda Vidya Kendra Trust",
    designation: "Managing Director & Trustee",
    targetPortal: "director",
  },
  {
    id: "usr-dir-state",
    humanId: "DIR-STATE-000001",
    email: "director.state@svvk.edu.in",
    passwordText: "Director@2026",
    role: "DIRECTOR",
    firstName: "Rajesh",
    lastName: "Singhania",
    phoneNumber: "+91 98450 11223",
    institutionId: "inst-state",
    institutionName: "Sri Vivekananda Vidya Kendra (State Board)",
    designation: "Managing Trustee (State Board Division)",
    targetPortal: "director",
    board: "state",
  },
  {
    id: "usr-dir-cbse",
    humanId: "DIR-CBSE-000001",
    email: "director.cbse@svvk.edu.in",
    passwordText: "Director@2026",
    role: "DIRECTOR",
    firstName: "Rajesh",
    lastName: "Singhania",
    phoneNumber: "+91 98450 11223",
    institutionId: "inst-cbse",
    institutionName: "Sri Vivekananda Vidya Kendra (CBSE)",
    designation: "Managing Trustee (CBSE Division)",
    targetPortal: "director",
    board: "cbse",
  },

  // 2. Admins
  {
    id: "usr-adm-state",
    humanId: "ADM-STATE-000001",
    email: "admin.state@svvk.edu.in",
    passwordText: "Admin@2026",
    role: "SCHOOL_ADMIN",
    firstName: "Mahadevappa",
    lastName: "Kulkarni",
    phoneNumber: "+91 98450 99001",
    institutionId: "inst-state",
    institutionName: "Sri Vivekananda Vidya Kendra (Karnataka State Board)",
    designation: "Headmaster & State Board Admin",
    targetPortal: "admin",
    board: "state",
  },
  {
    id: "usr-adm-cbse",
    humanId: "ADM-CBSE-000001",
    email: "admin.cbse@svvk.edu.in",
    passwordText: "Admin@2026",
    role: "SCHOOL_ADMIN",
    firstName: "Sunitha",
    lastName: "Radhakrishnan",
    phoneNumber: "+91 98450 44556",
    institutionId: "inst-cbse",
    institutionName: "Sri Vivekananda Vidya Kendra (CBSE Board)",
    designation: "Principal & CBSE Admin",
    targetPortal: "admin",
    board: "cbse",
  },
  {
    id: "usr-adm-001",
    humanId: "ADM-INS000001-000001",
    email: "admin.dps@indiaunifiederp.edu.in",
    passwordText: "Admin@2026",
    role: "SCHOOL_ADMIN",
    firstName: "Sunitha",
    lastName: "Radhakrishnan",
    phoneNumber: "+91 98450 44556",
    institutionId: "inst-cbse",
    institutionName: "Sri Vivekananda Vidya Kendra (CBSE)",
    designation: "Principal & School Admin",
    targetPortal: "admin",
    board: "cbse",
  },
  {
    id: "usr-adm-002",
    humanId: "ADM-INS000002-000001",
    email: "admin.nps@indiaunifiederp.edu.in",
    passwordText: "Admin@2026",
    role: "SCHOOL_ADMIN",
    firstName: "Arvind",
    lastName: "Venkatesh",
    phoneNumber: "+91 98450 77889",
    institutionId: "inst-002",
    institutionName: "National Public School Mysuru",
    designation: "Principal",
    targetPortal: "admin",
  },
  {
    id: "usr-adm-003",
    humanId: "ADM-INS000003-000001",
    email: "admin.sahyadri@indiaunifiederp.edu.in",
    passwordText: "Admin@2026",
    role: "SCHOOL_ADMIN",
    firstName: "Mahadevappa",
    lastName: "Kulkarni",
    phoneNumber: "+91 98450 99001",
    institutionId: "inst-state",
    institutionName: "Sri Vivekananda Vidya Kendra (Karnataka State Board)",
    designation: "Headmaster & Admin",
    targetPortal: "admin",
    board: "state",
  },

  // 3. Teachers
  {
    id: "usr-tch-state",
    humanId: "TCH-STATE-000001",
    email: "teacher.state@svvk.edu.in",
    passwordText: "Teacher@2026",
    role: "TEACHER",
    firstName: "Ramesh",
    lastName: "Gowda",
    phoneNumber: "+91 98860 45678",
    institutionId: "inst-state",
    institutionName: "Sri Vivekananda Vidya Kendra (Karnataka State Board)",
    designation: "Kannada First Language & State CCE Evaluator",
    targetPortal: "teacher",
    board: "state",
  },
  {
    id: "usr-tch-cbse",
    humanId: "TCH-CBSE-000001",
    email: "teacher.cbse@svvk.edu.in",
    passwordText: "Teacher@2026",
    role: "TEACHER",
    firstName: "Ananya",
    lastName: "Sharma",
    phoneNumber: "+91 98860 12345",
    institutionId: "inst-cbse",
    institutionName: "Sri Vivekananda Vidya Kendra (CBSE Board)",
    designation: "Senior Mathematics Teacher & CBSE Exam In-Charge",
    targetPortal: "teacher",
    board: "cbse",
  },
  {
    id: "usr-tch-001",
    humanId: "TCH-INS000001-000001",
    email: "teacher.ananya@indiaunifiederp.edu.in",
    passwordText: "Teacher@2026",
    role: "TEACHER",
    firstName: "Ananya",
    lastName: "Sharma",
    phoneNumber: "+91 98860 12345",
    institutionId: "inst-cbse",
    institutionName: "Sri Vivekananda Vidya Kendra (CBSE)",
    designation: "Senior Mathematics Teacher & Class 10A Teacher",
    targetPortal: "teacher",
    board: "cbse",
  },
  {
    id: "usr-tch-002",
    humanId: "TCH-INS000001-000002",
    email: "teacher.vikram@indiaunifiederp.edu.in",
    passwordText: "Teacher@2026",
    role: "TEACHER",
    firstName: "Vikram",
    lastName: "Hegde",
    phoneNumber: "+91 98860 23456",
    institutionId: "inst-001",
    institutionName: "DPS Bengaluru North",
    designation: "Physics PGT",
    targetPortal: "teacher",
  },
  {
    id: "usr-tch-003",
    humanId: "TCH-INS000001-000003",
    email: "teacher.priya@indiaunifiederp.edu.in",
    passwordText: "Teacher@2026",
    role: "TEACHER",
    firstName: "Priya",
    lastName: "Nair",
    phoneNumber: "+91 98860 34567",
    institutionId: "inst-001",
    institutionName: "DPS Bengaluru North",
    designation: "English PGT",
    targetPortal: "teacher",
  },
  {
    id: "usr-tch-004",
    humanId: "TCH-INS000001-000004",
    email: "teacher.ramesh@indiaunifiederp.edu.in",
    passwordText: "Teacher@2026",
    role: "TEACHER",
    firstName: "Ramesh",
    lastName: "Bhat",
    phoneNumber: "+91 98860 45678",
    institutionId: "inst-001",
    institutionName: "DPS Bengaluru North",
    designation: "Kannada Language Teacher",
    targetPortal: "teacher",
  },
  {
    id: "usr-tch-005",
    humanId: "TCH-INS000001-000005",
    email: "teacher.meenakshi@indiaunifiederp.edu.in",
    passwordText: "Teacher@2026",
    role: "TEACHER",
    firstName: "Meenakshi",
    lastName: "Sundaram",
    phoneNumber: "+91 98860 56789",
    institutionId: "inst-001",
    institutionName: "DPS Bengaluru North",
    designation: "Chemistry PGT",
    targetPortal: "teacher",
  },
  {
    id: "usr-tch-006",
    humanId: "TCH-INS000002-000001",
    email: "teacher.suresh@indiaunifiederp.edu.in",
    passwordText: "Teacher@2026",
    role: "TEACHER",
    firstName: "Suresh",
    lastName: "Patil",
    phoneNumber: "+91 98860 67890",
    institutionId: "inst-002",
    institutionName: "National Public School Mysuru",
    designation: "Mathematics Teacher",
    targetPortal: "teacher",
  },
  {
    id: "usr-tch-007",
    humanId: "TCH-INS000002-000002",
    email: "teacher.kavita@indiaunifiederp.edu.in",
    passwordText: "Teacher@2026",
    role: "TEACHER",
    firstName: "Kavita",
    lastName: "Deshmukh",
    phoneNumber: "+91 98860 78901",
    institutionId: "inst-002",
    institutionName: "National Public School Mysuru",
    designation: "Social Sciences Teacher",
    targetPortal: "teacher",
  },
  {
    id: "usr-tch-008",
    humanId: "TCH-INS000003-000001",
    email: "teacher.basavaraj@indiaunifiederp.edu.in",
    passwordText: "Teacher@2026",
    role: "TEACHER",
    firstName: "Basavaraj",
    lastName: "Hiremath",
    phoneNumber: "+91 98860 89012",
    institutionId: "inst-003",
    institutionName: "Sahyadri Vidya Kendra Hubballi",
    designation: "Kannada First Language HOD",
    targetPortal: "teacher",
  },
  {
    id: "usr-tch-009",
    humanId: "TCH-INS000003-000002",
    email: "teacher.santosh@indiaunifiederp.edu.in",
    passwordText: "Teacher@2026",
    role: "TEACHER",
    firstName: "Santosh",
    lastName: "Jadhav",
    phoneNumber: "+91 98860 90123",
    institutionId: "inst-003",
    institutionName: "Sahyadri Vidya Kendra Hubballi",
    designation: "General Science Teacher",
    targetPortal: "teacher",
  },
  {
    id: "usr-tch-010",
    humanId: "TCH-INS000001-000006",
    email: "teacher.sneha@indiaunifiederp.edu.in",
    passwordText: "Teacher@2026",
    role: "TEACHER",
    firstName: "Sneha",
    lastName: "Reddy",
    phoneNumber: "+91 98860 01234",
    institutionId: "inst-001",
    institutionName: "DPS Bengaluru North",
    designation: "Biology & Health Sciences PGT",
    targetPortal: "teacher",
  },
  // 4. Students
  {
    id: "usr-stu-state",
    humanId: "STU-STATE-000042",
    email: "student.state@svvk.edu.in",
    passwordText: "Student@2026",
    role: "STUDENT",
    firstName: "Kiran",
    lastName: "Kumar",
    phoneNumber: "+91 98440 11042",
    institutionId: "inst-state",
    institutionName: "Sri Vivekananda Vidya Kendra (Karnataka State Board)",
    designation: "Class 8 EM (Karnataka State Board) | Roll #8",
    targetPortal: "student",
    board: "state",
  },
  {
    id: "usr-stu-cbse",
    humanId: "STU-CBSE-000012",
    email: "student.cbse@svvk.edu.in",
    passwordText: "Student@2026",
    role: "STUDENT",
    firstName: "Aarav",
    lastName: "Kashyap",
    phoneNumber: "+91 98440 11001",
    institutionId: "inst-cbse",
    institutionName: "Sri Vivekananda Vidya Kendra (CBSE Board)",
    designation: "Class 10 A (CBSE Affiliation: 830680) | Roll #12",
    targetPortal: "student",
    board: "cbse",
  },
  {
    id: "usr-stu-001",
    humanId: "STU-INS000001-000001",
    email: "student.aarav@indiaunifiederp.edu.in",
    passwordText: "Student@2026",
    role: "STUDENT",
    firstName: "Aarav",
    lastName: "Kashyap",
    phoneNumber: "+91 98440 11001",
    institutionId: "inst-cbse",
    institutionName: "Sri Vivekananda Vidya Kendra (CBSE)",
    designation: "Class 10 - Section A | Roll #12",
    targetPortal: "student",
    board: "cbse",
  },
  {
    id: "usr-stu-002",
    humanId: "STU-INS000001-000002",
    email: "student.diya@indiaunifiederp.edu.in",
    passwordText: "Student@2026",
    role: "STUDENT",
    firstName: "Diya",
    lastName: "Menon",
    phoneNumber: "+91 98440 11002",
    institutionId: "inst-001",
    institutionName: "DPS Bengaluru North",
    designation: "Class 10 - Section A | Roll #14",
    targetPortal: "student",
  },
  {
    id: "usr-stu-003",
    humanId: "STU-INS000001-000003",
    email: "student.rohan@indiaunifiederp.edu.in",
    passwordText: "Student@2026",
    role: "STUDENT",
    firstName: "Rohan",
    lastName: "Gupta",
    phoneNumber: "+91 98440 11003",
    institutionId: "inst-001",
    institutionName: "DPS Bengaluru North",
    designation: "Class 10 - Section A | Roll #18",
    targetPortal: "student",
  },
];

export interface DemoStudentTransport {
  opted: boolean;
  routeId?: string;
  routeName?: string;
  vehicleNumber?: string;
  busNumber?: string;
  pickupStop?: string;
  pickupTime?: string;
  dropTime?: string;
  driverName?: string;
  driverPhone?: string;
  attendantName?: string;
  attendantPhone?: string;
  gpsTrackingId?: string;
  currentLocationName?: string;
  latitude?: number;
  longitude?: number;
  speedKmh?: number;
  etaMinutes?: number;
  status?: "ON_ROUTE" | "REACHED_SCHOOL" | "EVENING_DROP" | "PARKED";
}

export interface DemoStudentDetail {
  id: string;
  humanId: string;
  admissionNo: string;
  fullName: string;
  className: string;
  section: string;
  rollNumber: number;
  gender: "Male" | "Female";
  dob: string;
  bloodGroup: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  institutionId: string;
  attendancePct: number;
  overallGrade: string;
  feeStatus: "PAID" | "PENDING" | "PARTIAL";
  feeBalance: number;
  transport: DemoStudentTransport;
  board?: "state" | "cbse";
}

const BASE_DEMO_STUDENTS: DemoStudentDetail[] = [
  {
    id: "stu-state-001",
    humanId: "STU-STATE-000042",
    admissionNo: "SB-2026-0042",
    fullName: "Kiran Kumar S",
    className: "Class 8",
    section: "EM",
    rollNumber: 8,
    gender: "Male",
    dob: "2012-05-18",
    bloodGroup: "B+",
    guardianName: "Suresh Kumar (Father)",
    guardianPhone: "+91 98451 22334",
    guardianEmail: "suresh.kumar@gmail.com",
    institutionId: "inst-state",
    board: "state",
    attendancePct: 92.4,
    overallGrade: "A+",
    feeStatus: "PAID",
    feeBalance: 0,
    transport: {
      opted: true,
      routeId: "route-state-1",
      routeName: "Route 01 - Hoskote Town to State Campus",
      vehicleNumber: "KA-53-M-2024",
      busNumber: "Bus #01",
      pickupStop: "Hoskote Bus Stand Signal",
      pickupTime: "08:00 AM",
      dropTime: "03:40 PM",
      driverName: "Manjunatha Gowda",
      driverPhone: "+91 98455 12340",
      attendantName: "Lakshmamma",
      attendantPhone: "+91 98455 12341",
      gpsTrackingId: "AIS140-GPS-KA53M2024",
      currentLocationName: "Near KEB Circle, Hoskote",
      latitude: 13.0712,
      longitude: 77.7981,
      speedKmh: 30,
      etaMinutes: 5,
      status: "ON_ROUTE",
    },
  },
  {
    id: "stu-001",
    humanId: "STU-CBSE-000012",
    admissionNo: "CBSE-2026-0012",
    fullName: "Aarav Kashyap",
    className: "Class 10",
    section: "A",
    rollNumber: 12,
    gender: "Male",
    dob: "2010-04-14",
    bloodGroup: "O+",
    guardianName: "Manish Kashyap (Father)",
    guardianPhone: "+91 98440 11001",
    guardianEmail: "manish.kashyap@gmail.com",
    institutionId: "inst-cbse",
    board: "cbse",
    attendancePct: 94.5,
    overallGrade: "A1",
    feeStatus: "PAID",
    feeBalance: 0,
    transport: {
      opted: true,
      routeId: "route-14",
      routeName: "Route 14 - Hebbal to Yelahanka Main Campus",
      vehicleNumber: "KA-01-AB-1234",
      busNumber: "Bus #14",
      pickupStop: "Sahakarnagar Main Signal (Stop 2)",
      pickupTime: "07:45 AM",
      dropTime: "03:45 PM",
      driverName: "Somanna Gowda",
      driverPhone: "+91 98450 33441",
      attendantName: "Rukmini Bai",
      attendantPhone: "+91 98450 33449",
      gpsTrackingId: "AIS140-GPS-KA01AB1234",
      currentLocationName: "Near Kogilu Junction Flyover (1.4 km from campus)",
      latitude: 13.0924,
      longitude: 77.5976,
      speedKmh: 36,
      etaMinutes: 7,
      status: "ON_ROUTE",
    },
  },
  {
    id: "stu-002",
    humanId: "STU-INS000001-000002",
    admissionNo: "ADM-2026-0002",
    fullName: "Diya Menon",
    className: "Class 10",
    section: "A",
    rollNumber: 14,
    gender: "Female",
    dob: "2010-09-22",
    bloodGroup: "B+",
    guardianName: "Siddharth Menon (Father)",
    guardianPhone: "+91 98440 11002",
    guardianEmail: "siddharth.menon@outlook.com",
    institutionId: "inst-001",
    attendancePct: 98.2,
    overallGrade: "A1",
    feeStatus: "PAID",
    feeBalance: 0,
    transport: {
      opted: true,
      routeId: "route-14",
      routeName: "Route 14 - Hebbal to Yelahanka Main Campus",
      vehicleNumber: "KA-01-AB-1234",
      busNumber: "Bus #14",
      pickupStop: "Hebbal Baptist Hospital Stop (Stop 1)",
      pickupTime: "07:30 AM",
      dropTime: "04:00 PM",
      driverName: "Somanna Gowda",
      driverPhone: "+91 98450 33441",
      attendantName: "Rukmini Bai",
      attendantPhone: "+91 98450 33449",
      gpsTrackingId: "AIS140-GPS-KA01AB1234",
      currentLocationName: "Near Kogilu Junction Flyover (1.4 km from campus)",
      latitude: 13.0924,
      longitude: 77.5976,
      speedKmh: 36,
      etaMinutes: 7,
      status: "ON_ROUTE",
    },
  },
  {
    id: "stu-003",
    humanId: "STU-INS000001-000003",
    admissionNo: "ADM-2026-0003",
    fullName: "Rohan Gupta",
    className: "Class 10",
    section: "A",
    rollNumber: 18,
    gender: "Male",
    dob: "2010-01-05",
    bloodGroup: "A+",
    guardianName: "Alok Gupta (Father)",
    guardianPhone: "+91 98440 11003",
    guardianEmail: "alok.gupta@corp.in",
    institutionId: "inst-001",
    attendancePct: 88.0,
    overallGrade: "B1",
    feeStatus: "PARTIAL",
    feeBalance: 14500,
    transport: {
      opted: false, // Private pickup / Parent drop
    },
  },
  {
    id: "stu-004",
    humanId: "STU-INS000001-000004",
    admissionNo: "ADM-2026-0004",
    fullName: "Ananya Iyer",
    className: "Class 10",
    section: "A",
    rollNumber: 21,
    gender: "Female",
    dob: "2010-11-19",
    bloodGroup: "AB+",
    guardianName: "Raghav Iyer",
    guardianPhone: "+91 98440 11004",
    guardianEmail: "raghav.iyer@gmail.com",
    institutionId: "inst-001",
    attendancePct: 96.0,
    overallGrade: "A2",
    feeStatus: "PAID",
    feeBalance: 0,
    transport: {
      opted: true,
      routeId: "route-21",
      routeName: "Route 21 - Manyata Tech Park to Campus",
      vehicleNumber: "KA-01-EF-5678",
      busNumber: "Bus #21",
      pickupStop: "Thanisandra Main Road",
      pickupTime: "07:35 AM",
      dropTime: "03:55 PM",
      driverName: "Manjunath K",
      driverPhone: "+91 98450 33442",
      attendantName: "Sunanda Devi",
      attendantPhone: "+91 98450 33450",
      gpsTrackingId: "AIS140-GPS-KA01EF5678",
      currentLocationName: "Jakkur Double Road",
      latitude: 13.0782,
      longitude: 77.6045,
      speedKmh: 32,
      etaMinutes: 12,
      status: "ON_ROUTE",
    },
  },
  {
    id: "stu-005",
    humanId: "STU-INS000001-000005",
    admissionNo: "ADM-2026-0005",
    fullName: "Karan Johar Patel",
    className: "Class 10",
    section: "A",
    rollNumber: 25,
    gender: "Male",
    dob: "2010-07-30",
    bloodGroup: "O-",
    guardianName: "Hitesh Patel",
    guardianPhone: "+91 98440 11005",
    guardianEmail: "hitesh.patel@yahoo.com",
    institutionId: "inst-001",
    attendancePct: 72.4, // At-risk indicator!
    overallGrade: "C1",
    feeStatus: "PENDING",
    feeBalance: 42000,
    transport: {
      opted: false,
    },
  },
];

export const DEMO_TIMETABLE_TODAY = [
  { period: 1, time: "08:30 - 09:15", subject: "Mathematics", teacher: "Ms. Ananya Sharma", room: "Room 101" },
  { period: 2, time: "09:15 - 10:00", subject: "Physics", teacher: "Mr. Vikram Hegde", room: "Science Lab 2" },
  { period: 3, time: "10:15 - 11:00", subject: "English Literature", teacher: "Ms. Priya Nair", room: "Room 101" },
  { period: 4, time: "11:00 - 11:45", subject: "Chemistry", teacher: "Dr. Meenakshi Sundaram", room: "Chem Lab" },
  { period: 5, time: "12:30 - 01:15", subject: "Kannada / Second Lang", teacher: "Mr. Ramesh Bhat", room: "Room 101" },
  { period: 6, time: "01:15 - 02:00", subject: "Physical Education", teacher: "Coach Sanjeev", room: "Sports Ground" },
  { period: 7, time: "02:00 - 02:45", subject: "Artificial Intelligence Lab", teacher: "Ms. Sneha Reddy", room: "Computer Lab 3" },
];

export const DEMO_ANNOUNCEMENTS = [
  {
    id: "ann-001",
    title: "CBSE Class 10 & 12 Pre-Board Examination Schedule Released",
    date: "10 Nov 2026",
    priority: "URGENT",
    target: "Students & Parents",
    author: "Principal's Desk",
    content: "The timetable for Pre-Board Summative Assessments is finalized. Hall tickets will be issued digitally through the student portal next Monday.",
  },
  {
    id: "ann-002",
    title: "Annual Sports Meet 'Pratibha 2026' Inauguration",
    date: "08 Nov 2026",
    priority: "NORMAL",
    target: "All Campuses",
    author: "Sports Department",
    content: "The Inter-House Athletic Championships will kick off on November 20th. Track and field trials start tomorrow afternoon.",
  },
  {
    id: "ann-003",
    title: "Karnataka State Foundation Day (Kannada Rajyotsava) Cultural Exhibition",
    date: "01 Nov 2026",
    priority: "NORMAL",
    target: "All Institutions",
    author: "Cultural Committee",
    content: "Students from all sections showcased traditional Karnataka handicrafts, literature recitations, and historical tableaux.",
  },
];

import { IMPORTED_STUDENTS, IMPORTED_STUDENT_USERS } from "./imported-students";
import { IMPORTED_STAFF, IMPORTED_STAFF_USERS } from "./imported-staff";

export { IMPORTED_STUDENTS, IMPORTED_STAFF };

export const DEMO_USERS: DemoUser[] = [
  ...BASE_DEMO_USERS,
  ...IMPORTED_STAFF_USERS,
  ...IMPORTED_STUDENT_USERS,
];

export const DEMO_STUDENTS: DemoStudentDetail[] = [
  ...BASE_DEMO_STUDENTS,
  ...IMPORTED_STUDENTS,
];

export interface SubjectEvaluation {
  code: string;
  name: string;
  maxMarks: number;
  obtainedMarks: number;
  grade: string;
  gradePoint: number;
  remarks: string;
  isLanguage?: boolean;
  components?: { name: string; max: number; scored: number }[];
}

export interface BoardAcademicReport {
  studentName: string;
  admissionNo: string;
  rollNumber: string;
  className: string;
  board: "Karnataka State Board" | "Central Board of Secondary Education (CBSE)";
  boardCode: string;
  affiliationNo: string;
  schoolName: string;
  campusName: string;
  academicYear: string;
  evaluationScheme: string;
  gradingScale: string;
  subjects: SubjectEvaluation[];
  totalMax: number;
  totalObtained: number;
  percentage: number;
  overallGrade: string;
  resultStatus: string;
  attendanceDays: number;
  totalWorkingDays: number;
  attendancePercentage: number;
  coScholastic: { skill: string; grade: string; remarks: string }[];
}

export const STATE_ACADEMIC_REPORT: BoardAcademicReport = {
  studentName: "Kiran Kumar S",
  admissionNo: "SB-2026-0042",
  rollNumber: "8",
  className: "Standard 8 - Section EM (English Medium)",
  board: "Karnataka State Board",
  boardCode: "KSEAB",
  affiliationNo: "KSEAB/RECOG/BLR/2026/842",
  schoolName: "Sri Vivekananda Vidya Kendra",
  campusName: "State Board Campus, Hoskote",
  academicYear: "2026-2027",
  evaluationScheme: "Continuous and Comprehensive Evaluation (CCE - FA1, FA2, SA1, FA3, FA4, SA2)",
  gradingScale: "A+ (90-100%), A (80-89%), B+ (70-79%), B (60-69%), C+ (50-59%), C (35-49%), D (Below 35%)",
  totalMax: 625,
  totalObtained: 574,
  percentage: 91.84,
  overallGrade: "A+",
  resultStatus: "DISTINCTION - PASSED",
  attendanceDays: 198,
  totalWorkingDays: 215,
  attendancePercentage: 92.09,
  subjects: [
    {
      code: "01K",
      name: "First Language: Kannada",
      maxMarks: 125,
      obtainedMarks: 118,
      grade: "A+",
      gradePoint: 10.0,
      remarks: "Outstanding linguistic proficiency and literature appreciation",
      isLanguage: true,
      components: [
        { name: "FA-1 + FA-2", max: 25, scored: 24 },
        { name: "SA-1 Term Exam", max: 50, scored: 47 },
        { name: "FA-3 + FA-4", max: 25, scored: 24 },
        { name: "SA-2 Annual Exam", max: 50, scored: 47 },
      ],
    },
    {
      code: "02E",
      name: "Second Language: English",
      maxMarks: 100,
      obtainedMarks: 91,
      grade: "A+",
      gradePoint: 10.0,
      remarks: "Excellent grammar, composition, and verbal fluency",
      isLanguage: true,
      components: [
        { name: "Formative (FA1-FA4)", max: 20, scored: 19 },
        { name: "Summative (SA1-SA2)", max: 80, scored: 72 },
      ],
    },
    {
      code: "03H",
      name: "Third Language: Hindi",
      maxMarks: 100,
      obtainedMarks: 88,
      grade: "A",
      gradePoint: 8.5,
      remarks: "Commendable understanding and handwriting",
      isLanguage: true,
      components: [
        { name: "Formative (FA1-FA4)", max: 20, scored: 18 },
        { name: "Summative (SA1-SA2)", max: 80, scored: 70 },
      ],
    },
    {
      code: "81M",
      name: "Core Subject: Mathematics",
      maxMarks: 100,
      obtainedMarks: 95,
      grade: "A+",
      gradePoint: 10.0,
      remarks: "Flawless problem solving and conceptual clarity in Algebra and Geometry",
      components: [
        { name: "Formative (FA1-FA4)", max: 20, scored: 20 },
        { name: "Summative (SA1-SA2)", max: 80, scored: 75 },
      ],
    },
    {
      code: "83S",
      name: "Core Subject: General Science",
      maxMarks: 100,
      obtainedMarks: 92,
      grade: "A+",
      gradePoint: 10.0,
      remarks: "Thorough experimental deduction in Physics, Chemistry & Biology",
      components: [
        { name: "Formative (FA1-FA4)", max: 20, scored: 19 },
        { name: "Summative (SA1-SA2)", max: 80, scored: 73 },
      ],
    },
    {
      code: "85SS",
      name: "Core Subject: Social Science",
      maxMarks: 100,
      obtainedMarks: 90,
      grade: "A+",
      gradePoint: 10.0,
      remarks: "Strong historical analysis and map skills",
      components: [
        { name: "Formative (FA1-FA4)", max: 20, scored: 18 },
        { name: "Summative (SA1-SA2)", max: 80, scored: 72 },
      ],
    },
  ],
  coScholastic: [
    { skill: "Physical and Health Education (PHE)", grade: "A", remarks: "Active participant in school sports & yoga" },
    { skill: "Value Education & Moral Science", grade: "A", remarks: "Exemplary moral character and discipline" },
    { skill: "Work Experience & SUPW", grade: "A", remarks: "Creative initiative in community projects" },
    { skill: "Art, Music & Drama", grade: "A", remarks: "Participates enthusiastically in cultural events" },
  ],
};

export const CBSE_ACADEMIC_REPORT: BoardAcademicReport = {
  studentName: "Aarav Kashyap",
  admissionNo: "CBSE-2026-0012",
  rollNumber: "12",
  className: "Class 10 - Section A",
  board: "Central Board of Secondary Education (CBSE)",
  boardCode: "CBSE",
  affiliationNo: "830680",
  schoolName: "Sri Vivekananda Vidya Kendra",
  campusName: "Main CBSE Campus, Hoskote",
  academicYear: "2026-2027",
  evaluationScheme: "CBSE Annual Assessment Scheme (80 Marks Board Exam + 20 Marks Internal Assessment)",
  gradingScale: "A1 (Top 1/8th, 91-100%), A2 (Next 1/8th, 81-90%), B1 (71-80%), B2 (61-70%), C1 (51-60%), C2 (41-50%), D (33-40%), E (Essential Repeat)",
  totalMax: 500,
  totalObtained: 467,
  percentage: 93.4,
  overallGrade: "A1",
  resultStatus: "QUALIFIED - PASSED",
  attendanceDays: 208,
  totalWorkingDays: 220,
  attendancePercentage: 94.55,
  subjects: [
    {
      code: "184",
      name: "English Language & Literature",
      maxMarks: 100,
      obtainedMarks: 93,
      grade: "A1",
      gradePoint: 10.0,
      remarks: "Superior analytical reading and structured essay composition",
      isLanguage: true,
      components: [
        { name: "Annual Board / School Exam", max: 80, scored: 74 },
        { name: "Internal Assessment (PT/MA/Portfolio/Enrichment)", max: 20, scored: 19 },
      ],
    },
    {
      code: "002",
      name: "Hindi Course-A / Second Language",
      maxMarks: 100,
      obtainedMarks: 90,
      grade: "A2",
      gradePoint: 9.0,
      remarks: "Commendable literary interpretation and grammatical precision",
      isLanguage: true,
      components: [
        { name: "Annual Board / School Exam", max: 80, scored: 71 },
        { name: "Internal Assessment", max: 20, scored: 19 },
      ],
    },
    {
      code: "041",
      name: "Mathematics Standard",
      maxMarks: 100,
      obtainedMarks: 97,
      grade: "A1",
      gradePoint: 10.0,
      remarks: "Exceptional mathematical reasoning, proofs, and algebraic rigor",
      components: [
        { name: "Annual Board / School Exam", max: 80, scored: 77 },
        { name: "Internal Assessment (Lab Activities & Periodic)", max: 20, scored: 20 },
      ],
    },
    {
      code: "086",
      name: "Science (Physics, Chemistry, Biology)",
      maxMarks: 100,
      obtainedMarks: 94,
      grade: "A1",
      gradePoint: 10.0,
      remarks: "Insightful experimental analysis and comprehensive theoretical knowledge",
      components: [
        { name: "Annual Board / School Exam", max: 80, scored: 75 },
        { name: "Practical / Subject Enrichment Assessment", max: 20, scored: 19 },
      ],
    },
    {
      code: "087",
      name: "Social Science (Hist, Geo, Pol Sci, Econ)",
      maxMarks: 100,
      obtainedMarks: 93,
      grade: "A1",
      gradePoint: 10.0,
      remarks: "Impressive case study evaluation and cartographic accuracy",
      components: [
        { name: "Annual Board / School Exam", max: 80, scored: 74 },
        { name: "Portfolio & Project Assessment", max: 20, scored: 19 },
      ],
    },
  ],
  coScholastic: [
    { skill: "501 - Work Education (SUPW)", grade: "A", remarks: "Proactive involvement in electrical circuits and crafting" },
    { skill: "502 - Art Education (Visual & Performing)", grade: "A", remarks: "Creative expression in painting and traditional folk design" },
    { skill: "503 - Health & Physical Education", grade: "A", remarks: "Captaincy in basketball, excellent fitness and sportsmanship" },
    { skill: "504 - General Discipline & Ethics", grade: "A", remarks: "Role model in peer leadership, punctuality, and civic values" },
  ],
};
