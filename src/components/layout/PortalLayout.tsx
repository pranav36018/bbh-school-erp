import React from "react";
import PortalSidebar from "./PortalSidebar";
import PortalHeader from "./PortalHeader";
import { PortalType } from "@/lib/types";

interface PortalLayoutProps {
  portal: PortalType;
  userName: string;
  userRole: string;
  userHumanId: string;
  institutionName?: string;
  academicYear?: string;
  children: React.ReactNode;
}

export default function PortalLayout({
  portal,
  userName,
  userRole,
  userHumanId,
  institutionName,
  academicYear,
  children,
}: PortalLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900">
      <PortalSidebar portal={portal} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <PortalHeader
          userName={userName}
          userRole={userRole}
          userHumanId={userHumanId}
          institutionName={institutionName}
          academicYear={academicYear}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
