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
    const result = AiEngine.generateQuestionPaperDraft({
      subject: body.subject || "Mathematics Standard",
      grade: body.grade || "Class 10",
      topics: body.topics || ["Polynomials", "Quadratic Equations", "Triangles"],
      totalMarks: body.totalMarks || 40,
      distribution: body.distribution || {
        mcq: 5,
        shortAnswer: 5,
        longAnswer: 4,
      },
    });

    return NextResponse.json({ success: true, paper: result });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
