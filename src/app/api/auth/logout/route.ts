import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, getSessionCookieOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });

  // Clear cookie with maxAge = 0
  const cookieOpts = getSessionCookieOptions(0);
  response.cookies.set(AUTH_COOKIE_NAME, "", cookieOpts);

  return response;
}
