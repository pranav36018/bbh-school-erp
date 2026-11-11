import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const startTime = Date.now();
  let dbStatus = "healthy";

  try {
    // Probe database connectivity if URL is reachable
    await db.$queryRaw`SELECT 1`.catch(() => {
      dbStatus = "standalone_mode";
    });
  } catch {
    dbStatus = "standalone_mode";
  }

  const memory = process.memoryUsage();

  return NextResponse.json(
    {
      status: "UP",
      application: "India Unified School ERP Platform",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      database: {
        status: dbStatus,
        provider: "PostgreSQL / Prisma ORM",
      },
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        memoryUsageMB: {
          rss: Math.round(memory.rss / 1024 / 1024),
          heapUsed: Math.round(memory.heapUsed / 1024 / 1024),
          heapTotal: Math.round(memory.heapTotal / 1024 / 1024),
        },
      },
      latencyMs: Date.now() - startTime,
    },
    { status: 200 }
  );
}
