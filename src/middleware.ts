import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Handle State Board Portal Routes: /state/:portal/*
  const stateMatch = pathname.match(/^\/state\/(admin|teacher|student|director)(\/.*)?$/);
  if (stateMatch) {
    const portal = stateMatch[1];
    const subpath = stateMatch[2] || "";
    // If it's the login route, let Next.js serve the actual login page file
    if (subpath === "/login") {
      const res = NextResponse.next();
      res.cookies.set("school_erp_board", "state", { path: "/" });
      return res;
    }
    const targetUrl = new URL(`/${portal}${subpath || "/dashboard"}`, req.url);
    targetUrl.searchParams.set("board", "state");
    const res = NextResponse.rewrite(targetUrl);
    res.cookies.set("school_erp_board", "state", { path: "/" });
    return res;
  }

  // 2. Handle CBSE Board Portal Routes: /cbse/:portal/*
  const cbseMatch = pathname.match(/^\/cbse\/(admin|teacher|student|director)(\/.*)?$/);
  if (cbseMatch) {
    const portal = cbseMatch[1];
    const subpath = cbseMatch[2] || "";
    if (subpath === "/login") {
      const res = NextResponse.next();
      res.cookies.set("school_erp_board", "cbse", { path: "/" });
      return res;
    }
    const targetUrl = new URL(`/${portal}${subpath || "/dashboard"}`, req.url);
    targetUrl.searchParams.set("board", "cbse");
    const res = NextResponse.rewrite(targetUrl);
    res.cookies.set("school_erp_board", "cbse", { path: "/" });
    return res;
  }

  // Set cookie for /state or /cbse home
  if (pathname === "/state" || pathname === "/state/login") {
    const res = NextResponse.next();
    res.cookies.set("school_erp_board", "state", { path: "/" });
    return res;
  }

  if (pathname === "/cbse" || pathname === "/cbse/login") {
    const res = NextResponse.next();
    res.cookies.set("school_erp_board", "cbse", { path: "/" });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/state/:path*",
    "/cbse/:path*",
  ],
};
