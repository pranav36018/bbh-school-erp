import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { NotificationEngine } from "@/lib/notifications";

export async function POST(req: NextRequest) {
  const session = await getSession(req);
  if (!session || (session.role !== "SCHOOL_ADMIN" && session.role !== "TEACHER")) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { absentStudents, date, schoolName } = body;

    // Simulate sending absence notifications via Indian DLT SMS & WhatsApp
    let alertsSent = 0;
    if (absentStudents && Array.isArray(absentStudents)) {
      for (const s of absentStudents) {
        const msg = NotificationEngine.formatAbsenceMessage(s.name, date || "Today", schoolName || "Sri Vivekananda Vidya Kendra");
        await NotificationEngine.dispatch({
          recipientPhone: s.phone || "+919845011001",
          recipientName: s.parentName || "Parent",
          title: "Attendance Notification",
          message: msg,
          type: "ATTENDANCE_ABSENCE",
        });
        alertsSent++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Attendance synchronized successfully. Dispatched ${alertsSent} absence alerts.`,
      alertsSent,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
