import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "India Unified School ERP Platform",
  description: "Enterprise Multi-School, Multi-Board, Multi-Campus Digital Campus ERP for India (CBSE, KSEAB, MSBSHSE, TNSB, KBPE)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
