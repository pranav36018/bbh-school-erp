import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { DEMO_USERS } from "@/lib/mock-data";
import { ALL_ROSTER_USERS } from "@/lib/school-roster";

export async function GET(req: NextRequest) {
  const session = await getSession(req);

  if (!session) {
    return NextResponse.json(
      { success: false, error: "Not authenticated" },
      { status: 401 }
    );
  }

  const userDetail = DEMO_USERS.find((u) => u.id === session.userId);
  const rosterDetail = !userDetail
    ? ALL_ROSTER_USERS.find((u) => u.id === session.userId || u.email.toLowerCase() === session.email.toLowerCase())
    : null;

  return NextResponse.json({
    success: true,
    session,
    user: userDetail || rosterDetail || session,
  });
}
