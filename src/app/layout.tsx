import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sri Vivekananda Vidya Kendra | CBSE Digital Campus ERP",
  description: "Sri Vivekananda Vidya Kendra, Hoskote (CBSE Affiliation: 830680) - Managed by Swamy Vivekananda Vidya Kendra Trust. Digital Campus Management System.",
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
      <body className="antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
