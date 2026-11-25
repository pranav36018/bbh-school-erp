import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function extractYoutubeId(input: string): string | null {
  const trimmed = (input || "").trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  if (match) return match[1];
  const loose = trimmed.match(/[\w-]{11}/);
  return loose ? loose[0] : null;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("url") || searchParams.get("id") || "";

    const youtubeId = extractYoutubeId(query);

    if (!youtubeId || youtubeId.length !== 11) {
      return NextResponse.json(
        { success: false, error: "Invalid YouTube URL or ID" },
        { status: 400 }
      );
    }

    // Fetch the public watch page to parse the original duration
    const response = await fetch(`https://www.youtube.com/watch?v=${youtubeId}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json({
        success: true,
        youtubeId,
        duration: "Video",
        durationSeconds: 0,
        title: "",
      });
    }

    const html = await response.text();

    const lenMatch =
      html.match(/"lengthSeconds":"(\d+)"/) || html.match(/"approxDurationMs":"(\d+)"/);

    let durationSeconds = 0;
    let formattedDuration = "Video";

    if (lenMatch) {
      durationSeconds = lenMatch[0].includes("approxDurationMs")
        ? Math.floor(parseInt(lenMatch[1], 10) / 1000)
        : parseInt(lenMatch[1], 10);

      const hours = Math.floor(durationSeconds / 3600);
      const mins = Math.floor((durationSeconds % 3600) / 60);
      const secs = durationSeconds % 60;

      if (hours > 0) {
        formattedDuration = `${hours}h ${mins}m`;
      } else if (mins > 0) {
        formattedDuration = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
      } else {
        formattedDuration = `0:${secs < 10 ? "0" : ""}${secs}`;
      }
    }

    // Also extract video title for convenience
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    let title = "";
    if (titleMatch) {
      title = titleMatch[1].replace(" - YouTube", "").trim();
    }

    return NextResponse.json({
      success: true,
      youtubeId,
      duration: formattedDuration,
      durationSeconds,
      title,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch video info", duration: "Video" },
      { status: 500 }
    );
  }
}
