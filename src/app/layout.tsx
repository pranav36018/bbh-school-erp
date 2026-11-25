import type { Metadata } from "next";
import "./globals.css";
import { BoardProvider } from "@/lib/board-context";

export const metadata: Metadata = {
  title: "Sri Vivekananda Vidya Kendra | Unified School Portal (State Board & CBSE)",
  description: "Sri Vivekananda Vidya Kendra, Hoskote - Managed by Swamy Vivekananda Vidya Kendra Trust. Unified Digital Campus for Karnataka State Board (KSEAB) and CBSE Board (Affiliation No. 830680).",
  icons: {
    icon: "/images/svvk-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-amber-600 selection:text-white">
        <BoardProvider>{children}</BoardProvider>
      </body>
    </html>
  );
}
