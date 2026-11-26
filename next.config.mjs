import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @type {(phase: string) => import('next').NextConfig} */
export default function nextConfig(phase) {
  return {
    // Isolate dev artifacts so running `next build` never corrupts a running `next dev` CSS/chunk cache
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
    reactStrictMode: true,
    poweredByHeader: false,
  };
}
