import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { signToken, isRoleAllowedInPortal, getSessionCookieOptions, AUTH_COOKIE_NAME } from "@/lib/auth";
import { DEMO_USERS } from "@/lib/mock-data";
import { PortalType, UserSessionPayload } from "@/lib/types";

const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(1, "Password is required"),
  portal: z.enum(["director", "admin", "teacher", "student"] as const),
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

    const { email, password, portal } = validation.data;

    // Search for user in Demo Users list or DB
    const user = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email credentials or user not found." },
        { status: 401 }
      );
    }

    // Check password
    if (user.passwordText !== password) {
      return NextResponse.json(
        { success: false, error: "Incorrect password. Please try again or use demo credentials." },
        { status: 401 }
      );
    }

    // Role verification for this specific portal
    if (!isRoleAllowedInPortal(user.role, portal as PortalType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Access Denied: Your account role (${user.role}) is not authorized to access the ${portal.toUpperCase()} portal.`,
        },
        { status: 403 }
      );
    }

    // Construct session payload
    const sessionPayload: UserSessionPayload = {
      userId: user.id,
      humanId: user.humanId,
      email: user.email,
      role: user.role,
      institutionId: user.institutionId,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    // Sign JWT
    const token = signToken(sessionPayload);

    // Build JSON response with HttpOnly cookie
    const response = NextResponse.json({
      success: true,
      message: `Welcome back, ${user.firstName} ${user.lastName}!`,
      user: {
        id: user.id,
        humanId: user.humanId,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        role: user.role,
        institutionId: user.institutionId,
        institutionName: user.institutionName,
        designation: user.designation,
      },
      redirectTo: `/${portal}/dashboard`,
    });

    const cookieOpts = getSessionCookieOptions();
    response.cookies.set(AUTH_COOKIE_NAME, token, cookieOpts);

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
