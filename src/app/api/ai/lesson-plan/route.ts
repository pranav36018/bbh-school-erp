import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { AiEngine } from "@/lib/ai-engine";

export async function POST(req: NextRequest) {
  const session = await getSession(req);
  if (!session || (session.role !== "TEACHER" && session.role !== "SCHOOL_ADMIN")) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const result = AiEngine.generateLessonPlanDraft({
      subject: body.subject || "Mathematics Standard",
      grade: body.grade || "Class 10",
      unitTitle: body.unitTitle || "Quadratic Equations",
      learningOutcomes: body.learningOutcomes || [
        "Master the standard form ax^2 + bx + c = 0",
        "Apply the quadratic formula to engineering and financial problems",
      ],
      durationMinutes: body.durationMinutes || 45,
    });

    return NextResponse.json({ success: true, lessonPlan: result });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
