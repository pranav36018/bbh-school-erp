import { NextRequest, NextResponse } from "next/server";
import { IdEngine } from "@/lib/id-engine";

export async function POST(req: NextRequest) {
  try {
    const { qrData } = await req.json();

    if (!qrData) {
      return NextResponse.json({ success: false, error: "QR Data is required" }, { status: 400 });
    }

    const verification = IdEngine.verifyPayload(qrData);

    if (!verification.valid) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: "Cryptographic signature mismatch. Certificate may have been tampered with or is invalid.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      message: "Certificate authenticity verified successfully.",
      payload: verification.data,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
