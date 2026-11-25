import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { signToken, isRoleAllowedInPortal, getSessionCookieOptions, AUTH_COOKIE_NAME } from "@/lib/auth";
import { DEMO_USERS } from "@/lib/mock-data";
import { ALL_ROSTER_USERS } from "@/lib/school-roster";
import { PortalType, UserSessionPayload } from "@/lib/types";

const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(1, "Password is required"),
  portal: z.enum(["director", "admin", "teacher", "student"] as const),
  board: z.enum(["state", "cbse"] as const).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, password, portal, board: requestedBoard } = validation.data;
    const cleanEmail = email.toLowerCase().trim();

    // 1. Search in Demo Users list
    const demoUser = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === cleanEmail
    );

    // 2. Search in Official Excel Roster (592 students, 36 teachers, 5 admins, 1 director)
    const rosterUser = !demoUser
      ? ALL_ROSTER_USERS.find((u) => u.email.toLowerCase() === cleanEmail)
      : null;

    if (!demoUser && !rosterUser) {
      return NextResponse.json(
        { success: false, error: "Invalid email credentials or user not found." },
        { status: 401 }
      );
    }

    // Check password
    const expectedPassword = demoUser ? demoUser.passwordText : rosterUser!.password;
    if (expectedPassword !== password) {
      return NextResponse.json(
        { success: false, error: "Incorrect password. Please try again or use demo credentials." },
        { status: 401 }
      );
    }

    const userRole = demoUser ? demoUser.role : rosterUser!.role;

    // Role verification for this specific portal
    if (!isRoleAllowedInPortal(userRole, portal as PortalType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Access Denied: Your account role (${userRole}) is not authorized to access the ${portal.toUpperCase()} portal.`,
        },
        { status: 403 }
      );
    }

    // Strict Board Isolation & Role-Based Access Control
    const isDirectorOrTrustee = userRole === "DIRECTOR" || userRole === "PLATFORM_OWNER";
    const userBoard = demoUser
      ? (demoUser.board || (demoUser.institutionId?.includes("state") ? "state" : "cbse"))
      : (requestedBoard || "state");

    if (demoUser && requestedBoard && !isDirectorOrTrustee && demoUser.board && demoUser.board !== requestedBoard) {
      const registeredLabel = demoUser.board === "state" ? "Karnataka State Board" : "CBSE Board (Affiliation: 830680)";
      const requestedLabel = requestedBoard === "state" ? "Karnataka State Board" : "CBSE Board";
      return NextResponse.json(
        {
          success: false,
          error: `Cross-Board Security Violation: Your account belongs to ${registeredLabel}. You are strictly forbidden from accessing ${requestedLabel} records.`,
        },
        { status: 403 }
      );
    }

    const effectiveBoard = requestedBoard || userBoard || "state";

    // Construct user info
    const userId = demoUser ? demoUser.id : rosterUser!.id;
    const humanId = demoUser ? demoUser.humanId : rosterUser!.schoolId;
    const nameParts = demoUser
      ? { first: demoUser.firstName, last: demoUser.lastName }
      : { first: rosterUser!.name.split(" ")[0] || rosterUser!.name, last: rosterUser!.name.split(" ").slice(1).join(" ") || "" };
    const designation = demoUser
      ? demoUser.designation
      : (rosterUser!.designation || (rosterUser!.role === "STUDENT" ? rosterUser!.classNameWithSec : "Faculty"));
    const institutionId = demoUser ? demoUser.institutionId : (effectiveBoard === "state" ? "inst-state" : "inst-cbse");
    const institutionName = demoUser ? demoUser.institutionName : "Sri Vivekananda Vidya Kendra";

    // Construct session payload
    const sessionPayload: UserSessionPayload = {
      userId,
      humanId,
      email: cleanEmail,
      role: userRole,
      institutionId,
      firstName: nameParts.first,
      lastName: nameParts.last,
      board: effectiveBoard,
    };

    // Sign JWT
    const token = signToken(sessionPayload);

    // Build JSON response with HttpOnly cookie
    const response = NextResponse.json({
      success: true,
      message: `Welcome back, ${nameParts.first} ${nameParts.last}!`,
      user: {
        id: userId,
        humanId,
        email: cleanEmail,
        name: `${nameParts.first} ${nameParts.last}`,
        role: userRole,
        institutionId,
        institutionName,
        designation,
        board: effectiveBoard,
      },
      redirectTo: `/${portal}/dashboard?board=${effectiveBoard}`,
    });

    const cookieOpts = getSessionCookieOptions();
    response.cookies.set(AUTH_COOKIE_NAME, token, cookieOpts);
    response.cookies.set("school_erp_board", effectiveBoard, {
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
