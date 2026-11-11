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
    id: "inst-001",
    code: "INS-IND-000001",
    name: "Delhi Public School Bengaluru North",
    groupName: "Delhi Public School Society",
    boardType: "CBSE",
    affiliationNumber: "CBSE/AFF/830123/2026",
    state: "Karnataka",
    district: "Bengaluru Urban",
    address: "Survey No. 35/1A, Kogilu Main Road, Yelahanka",
    pincode: "560064",
    contactEmail: "admin@dpsnorthbengaluru.edu.in",
    contactPhone: "+91 80 2987 6543",
    principalName: "Dr. Sunitha Radhakrishnan",
    medium: "English",
    campuses: [
      { id: "cam-001", code: "CAM-INS000001-001", name: "Main Campus (Grades 6-12)", address: "Kogilu Road, Yelahanka" },
      { id: "cam-002", code: "CAM-INS000001-002", name: "Junior Wing (Nursery-Grade 5)", address: "Judicial Layout, Yelahanka" },
    ],
    classes: ["Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"],
  },
  {
    id: "inst-002",
    code: "INS-IND-000002",
    name: "National Public School Mysuru",
    groupName: "Delhi Public School Society",
    boardType: "CBSE",
    affiliationNumber: "CBSE/AFF/830456/2026",
    state: "Karnataka",
    district: "Mysuru",
    address: "Plot 12, Outer Ring Road, Vijayanagar 4th Stage",
    pincode: "570032",
    contactEmail: "principal@npsmysuru.edu.in",
    contactPhone: "+91 821 245 9870",
    principalName: "Prof. Arvind Venkatesh",
    medium: "English",
    campuses: [
      { id: "cam-003", code: "CAM-INS000002-001", name: "Heritage Campus", address: "Vijayanagar 4th Stage, Mysuru" },
    ],
    classes: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
  },
  {
    id: "inst-003",
    code: "INS-IND-000003",
    name: "Sahyadri Vidya Kendra Hubballi",
    groupName: "Karnataka State Rural Education Trust",
    boardType: "KARNATAKA_STATE_BOARD",
    affiliationNumber: "KSEAB/RECOG/DWD/2026/902",
    state: "Karnataka",
    district: "Dharwad",
    address: "Bhairidevarakoppa, PB Road, Hubballi",
    pincode: "580025",
    contactEmail: "admin@sahyadrividya.org",
    contactPhone: "+91 836 228 1144",
    principalName: "Shri Mahadevappa Kulkarni",
    medium: "Kannada & English",
    campuses: [
      { id: "cam-004", code: "CAM-INS000003-001", name: "Central Vidyalaya Campus", address: "PB Road, Hubballi" },
    ],
    classes: ["Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
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
}

export const DEMO_USERS: DemoUser[] = [
  // 1. Director
  {
    id: "usr-dir-001",
    humanId: "DIR-INS000001-000001",
    email: "director@indiaunifiederp.edu.in",
    passwordText: "Director@2026",
    role: "DIRECTOR",
    firstName: "Rajesh",
    lastName: "Singhania",
    phoneNumber: "+91 98450 11223",
    institutionId: "inst-001",
    institutionName: "DPS Bengaluru & Group Schools",
    designation: "Managing Director & Trustee",
    targetPortal: "director",
  },
  // 2. Admins
  {
    id: "usr-adm-001",
    humanId: "ADM-INS000001-000001",
    email: "admin.dps@indiaunifiederp.edu.in",
    passwordText: "Admin@2026",
    role: "SCHOOL_ADMIN",
    firstName: "Sunitha",
    lastName: "Radhakrishnan",
    phoneNumber: "+91 98450 44556",
    institutionId: "inst-001",
    institutionName: "DPS Bengaluru North",
    designation: "Principal & School Admin",
    targetPortal: "admin",
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
    institutionId: "inst-003",
    institutionName: "Sahyadri Vidya Kendra Hubballi",
    designation: "Headmaster & Admin",
    targetPortal: "admin",
  },
  // 3. Teachers
  {
    id: "usr-tch-001",
    humanId: "TCH-INS000001-000001",
    email: "teacher.ananya@indiaunifiederp.edu.in",
    passwordText: "Teacher@2026",
    role: "TEACHER",
    firstName: "Ananya",
    lastName: "Sharma",
    phoneNumber: "+91 98860 12345",
    institutionId: "inst-001",
    institutionName: "DPS Bengaluru North",
    designation: "Senior Mathematics Teacher & Class 10A Teacher",
    targetPortal: "teacher",
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
    id: "usr-stu-001",
    humanId: "STU-INS000001-000001",
    email: "student.aarav@indiaunifiederp.edu.in",
    passwordText: "Student@2026",
    role: "STUDENT",
    firstName: "Aarav",
    lastName: "Kashyap",
    phoneNumber: "+91 98440 11001",
    institutionId: "inst-001",
    institutionName: "DPS Bengaluru North",
    designation: "Class 10 - Section A | Roll #12",
    targetPortal: "student",
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
}

export const DEMO_STUDENTS: DemoStudentDetail[] = [
  {
    id: "stu-001",
    humanId: "STU-INS000001-000001",
    admissionNo: "ADM-2026-0001",
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
    institutionId: "inst-001",
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
