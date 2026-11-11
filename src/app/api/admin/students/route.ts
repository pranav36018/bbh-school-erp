import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { IdEngine } from "@/lib/id-engine";
import { DEMO_STUDENTS } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  const session = await getSession(req);
  if (!session || (session.role !== "SCHOOL_ADMIN" && session.role !== "PLATFORM_OWNER" && session.role !== "DIRECTOR")) {
    return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 403 });
  }

  return NextResponse.json({
    success: true,
    total: DEMO_STUDENTS.length,
    students: DEMO_STUDENTS,
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession(req);
  if (!session || (session.role !== "SCHOOL_ADMIN" && session.role !== "PLATFORM_OWNER")) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const instId = session.institutionId || "inst-001";

    // Generate atomic, collision-free human ID and admission number
    const humanId = await IdEngine.generateId(instId, "STUDENT", "INS-IND-000001");
    const admissionNo = await IdEngine.generateId(instId, "ADMISSION");

    const newStudent = {
      id: `stu-${Date.now()}`,
      humanId,
      admissionNo,
      fullName: body.fullName || "New Student",
      className: body.className || "Class 10",
      section: body.section || "A",
      rollNumber: body.rollNumber || (DEMO_STUDENTS.length + 1),
      gender: body.gender || "Male",
      dob: body.dob || "2010-01-01",
      bloodGroup: body.bloodGroup || "O+",
      guardianName: body.guardianName || "Guardian",
      guardianPhone: body.guardianPhone || "+91 98450 00000",
      guardianEmail: body.guardianEmail || "guardian@example.com",
      institutionId: instId,
      attendancePct: 100,
      overallGrade: "A1",
      feeStatus: "PENDING" as const,
      feeBalance: 125000,
      transport: body.transport || {
        opted: false,
        mode: "PRIVATE_PICKUP" as const,
      },
    };

    DEMO_STUDENTS.push(newStudent);

    return NextResponse.json({
      success: true,
      message: "Student registered successfully with auto-generated unique ID.",
      student: newStudent,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
