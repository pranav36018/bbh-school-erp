import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { AiEngine } from "@/lib/ai-engine";

export async function POST(req: NextRequest) {
  const session = await getSession(req);
  if (!session || (session.role !== "SCHOOL_ADMIN" && session.role !== "DIRECTOR")) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const result = AiEngine.generateTimetableDraft({
      classes: body.classes || ["Class 10"],
      sections: body.sections || ["A"],
      subjects: body.subjects || [
        { name: "Mathematics Standard", weeklyPeriods: 6 },
        { name: "Science (Physics, Chem, Bio)", weeklyPeriods: 6 },
        { name: "English Language & Lit", weeklyPeriods: 5 },
        { name: "Social Science", weeklyPeriods: 5 },
      ],
      teachers: body.teachers || [
        { id: "tch-1", name: "Ms. Ananya Sharma", subject: "Mathematics Standard", maxDailyPeriods: 4 },
        { id: "tch-2", name: "Mr. Vikram Hegde", subject: "Science (Physics, Chem, Bio)", maxDailyPeriods: 4 },
      ],
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
