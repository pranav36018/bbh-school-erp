import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { AiEngine } from "@/lib/ai-engine";

export async function POST(req: NextRequest) {
  const session = await getSession(req);
  if (!session || (session.role !== "TEACHER" && session.role !== "SCHOOL_ADMIN" && session.role !== "DIRECTOR")) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const assessment = AiEngine.assessStudentRisk({
      attendancePercentage: body.attendancePercentage ?? 72.4,
      recentExamAverage: body.recentExamAverage ?? 48.0,
      consecutiveDeclines: body.consecutiveDeclines ?? 2,
      unsubmittedAssignments: body.unsubmittedAssignments ?? 3,
    });

    return NextResponse.json({ success: true, assessment });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
