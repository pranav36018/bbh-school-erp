// Comprehensive Seed Script for India Unified School ERP (PostgreSQL + Prisma ORM)
import { PrismaClient, BoardType, SchoolType, MediumOfInstruction, UserRoleType, Gender } from "@prisma/client";
import bcrypt from "bcryptjs";
import { BOARD_TEMPLATES } from "../src/lib/board-engine";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting India Unified School ERP Database Seeding...");

  // 1. Platform Settings
  await prisma.platformSetting.upsert({
    where: { id: "default-setting" },
    update: {},
    create: {
      id: "default-setting",
      platformName: "India Unified School ERP",
      supportEmail: "support@indiaunifiederp.edu.in",
      activeVersion: "1.0.0",
      maintenanceMode: false,
    },
  });

  // 2. Institution Group
  const group = await prisma.institutionGroup.upsert({
    where: { code: "GRP-IND-000001" },
    update: {},
    create: {
      code: "GRP-IND-000001",
      name: "Delhi Public School Society",
      trustName: "Delhi Public School Educational Trust",
      headOffice: "East of Kailash, New Delhi",
      contactEmail: "info@dpsgroup.edu.in",
    },
  });

  // 3. Institution 1: DPS Bengaluru North (CBSE)
  const inst1 = await prisma.institution.upsert({
    where: { code: "INS-IND-000001" },
    update: {},
    create: {
      code: "INS-IND-000001",
      name: "Delhi Public School Bengaluru North",
      groupId: group.id,
      boardType: BoardType.CBSE,
      affiliationNumber: "CBSE/AFF/830123/2026",
      schoolType: SchoolType.CO_EDUCATIONAL,
      medium: MediumOfInstruction.ENGLISH,
      state: "Karnataka",
      district: "Bengaluru Urban",
      address: "Survey No. 35/1A, Kogilu Main Road, Yelahanka",
      pincode: "560064",
      contactEmail: "admin@dpsnorthbengaluru.edu.in",
      contactPhone: "+91 80 2987 6543",
      principalName: "Dr. Sunitha Radhakrishnan",
    },
  });

  // Campuses for Inst 1
  const campus1 = await prisma.campus.upsert({
    where: { code: "CAM-INS000001-001" },
    update: {},
    create: {
      code: "CAM-INS000001-001",
      institutionId: inst1.id,
      name: "Main Campus (Grades 6-12)",
      address: "Kogilu Road, Yelahanka",
    },
  });

  // Academic Year
  const ay2026 = await prisma.academicYear.upsert({
    where: {
      institutionId_code: {
        institutionId: inst1.id,
        code: "AY-2026-2027",
      },
    },
    update: {},
    create: {
      code: "AY-2026-2027",
      institutionId: inst1.id,
      name: "2026-2027",
      startDate: new Date("2026-06-01"),
      endDate: new Date("2027-04-15"),
      isCurrent: true,
    },
  });

  // Board Configuration for CBSE
  await prisma.boardConfiguration.upsert({
    where: {
      institutionId_academicYearId_boardType: {
        institutionId: inst1.id,
        academicYearId: ay2026.id,
        boardType: BoardType.CBSE,
      },
    },
    update: {},
    create: {
      institutionId: inst1.id,
      academicYearId: ay2026.id,
      boardType: BoardType.CBSE,
      versionNumber: "2026.1",
      gradingRules: JSON.stringify(BOARD_TEMPLATES.CBSE.gradingRules),
      assessmentPattern: JSON.stringify(BOARD_TEMPLATES.CBSE.assessmentPattern),
      languageScheme: JSON.stringify(BOARD_TEMPLATES.CBSE.languageScheme),
      coScholasticCriteria: JSON.stringify(BOARD_TEMPLATES.CBSE.coScholasticCriteria),
    },
  });

  // 4. Default Seed Password
  const passwordHash = await bcrypt.hash("Admin@2026", 10);
  const teacherPassHash = await bcrypt.hash("Teacher@2026", 10);
  const studentPassHash = await bcrypt.hash("Student@2026", 10);
  const directorPassHash = await bcrypt.hash("Director@2026", 10);

  // Director User
  const dirUser = await prisma.user.upsert({
    where: { email: "director@indiaunifiederp.edu.in" },
    update: {},
    create: {
      humanId: "DIR-INS000001-000001",
      email: "director@indiaunifiederp.edu.in",
      passwordHash: directorPassHash,
      role: UserRoleType.DIRECTOR,
      firstName: "Rajesh",
      lastName: "Singhania",
      institutionId: inst1.id,
      director: {
        create: {
          groupId: group.id,
          designation: "Managing Director & Trustee",
        },
      },
    },
  });

  // Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: "admin.dps@indiaunifiederp.edu.in" },
    update: {},
    create: {
      humanId: "ADM-INS000001-000001",
      email: "admin.dps@indiaunifiederp.edu.in",
      passwordHash,
      role: UserRoleType.SCHOOL_ADMIN,
      firstName: "Sunitha",
      lastName: "Radhakrishnan",
      institutionId: inst1.id,
      schoolAdmin: {
        create: {
          institutionId: inst1.id,
          designation: "Principal & School Admin",
        },
      },
    },
  });

  // Classes & Sections
  const class10 = await prisma.class.upsert({
    where: {
      institutionId_name: {
        institutionId: inst1.id,
        name: "Class 10",
      },
    },
    update: {},
    create: {
      institutionId: inst1.id,
      name: "Class 10",
      stage: "Secondary",
      displayOrder: 10,
    },
  });

  const section10A = await prisma.section.upsert({
    where: {
      classId_name: {
        classId: class10.id,
        name: "A",
      },
    },
    update: {},
    create: {
      classId: class10.id,
      name: "A",
      roomNumber: "Room 101",
      maxCapacity: 40,
    },
  });

  // Teacher User
  const teacherUser = await prisma.user.upsert({
    where: { email: "teacher.ananya@indiaunifiederp.edu.in" },
    update: {},
    create: {
      humanId: "TCH-INS000001-000001",
      email: "teacher.ananya@indiaunifiederp.edu.in",
      passwordHash: teacherPassHash,
      role: UserRoleType.TEACHER,
      firstName: "Ananya",
      lastName: "Sharma",
      institutionId: inst1.id,
      teacher: {
        create: {
          institutionId: inst1.id,
          employeeCode: "TCH-INS000001-000001",
          department: "Mathematics",
          qualification: "M.Sc Mathematics, B.Ed",
          joiningDate: new Date("2020-05-15"),
        },
      },
    },
  });

  // Student User
  const studentUser = await prisma.user.upsert({
    where: { email: "student.aarav@indiaunifiederp.edu.in" },
    update: {},
    create: {
      humanId: "STU-INS000001-000001",
      email: "student.aarav@indiaunifiederp.edu.in",
      passwordHash: studentPassHash,
      role: UserRoleType.STUDENT,
      firstName: "Aarav",
      lastName: "Kashyap",
      institutionId: inst1.id,
      student: {
        create: {
          institutionId: inst1.id,
          campusId: campus1.id,
          studentCode: "STU-INS000001-000001",
          currentAdmissionNo: "ADM-2026-0001",
          dateOfBirth: new Date("2010-04-14"),
          gender: Gender.MALE,
          bloodGroup: "O+",
        },
      },
    },
  });

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
