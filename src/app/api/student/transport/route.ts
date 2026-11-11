import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { DEMO_STUDENTS } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  const session = await getSession(req);

  // Default to student 0 (Aarav Kashyap) if not specified or session matches
  const student = DEMO_STUDENTS.find((s) => s.humanId === session?.humanId) || DEMO_STUDENTS[0];

  if (!student.transport || !student.transport.opted) {
    return NextResponse.json({
      success: true,
      opted: false,
      message: "Student has not opted for school bus transport.",
    });
  }

  // Simulated live telemetry reading from vehicle GPS tracker (AIS-140 device)
  const telemetry = {
    ...student.transport,
    speedKmh: Math.floor(32 + Math.random() * 8),
    latitude: (student.transport.latitude || 13.0924) + (Math.random() - 0.5) * 0.001,
    longitude: (student.transport.longitude || 77.5976) + (Math.random() - 0.5) * 0.001,
    lastPingTimestamp: new Date().toISOString(),
    compliance: {
      standard: "AIS-140",
      speedGovernorStatus: "ACTIVE_LIMIT_40KMH",
      panicButtonStatus: "NORMAL",
      cctvStatus: "RECORDING",
    },
  };

  return NextResponse.json({
    success: true,
    opted: true,
    telemetry,
  });
}
