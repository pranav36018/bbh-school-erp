import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { RoleType, UserSessionPayload, PortalType } from "./types";

const JWT_SECRET = process.env.JWT_SECRET || "unified-school-erp-super-secure-jwt-key-2026-production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
export const AUTH_COOKIE_NAME = "school_erp_session";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: UserSessionPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: (JWT_EXPIRES_IN || "7d") as any,
  });
}

export function verifyToken(token: string): UserSessionPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserSessionPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Validates if the user's role is permitted to access a specific portal
 */
export function isRoleAllowedInPortal(role: RoleType, portal: PortalType): boolean {
  switch (portal) {
    case "director":
      return role === "DIRECTOR" || role === "PLATFORM_OWNER";
    case "admin":
      return role === "SCHOOL_ADMIN" || role === "PLATFORM_OWNER";
    case "teacher":
      return role === "TEACHER";
    case "student":
      return role === "STUDENT" || role === "PARENT";
    default:
      return false;
  }
}

/**
 * Extracts and verifies the current session from incoming NextRequest
 */
export async function getSession(req?: NextRequest): Promise<UserSessionPayload | null> {
  let token: string | undefined;

  if (req) {
    // 1. Check Authorization Bearer header
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
    // 2. Check cookies
    if (!token) {
      token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
    }
  } else {
    // Server action or React Server Component context
    const cookieStore = cookies();
    token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  }

  if (!token) return null;
  return verifyToken(token);
}

/**
 * Helper to generate secure HttpOnly cookie options
 */
export function getSessionCookieOptions(maxAgeSeconds = 7 * 24 * 60 * 60) {
  return {
    name: AUTH_COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
