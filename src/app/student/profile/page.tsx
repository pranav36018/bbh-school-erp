"use client";

import React, { useEffect, useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { IdCard, CheckCircle2, Printer } from "lucide-react";
import { useBoard } from "@/lib/board-context";
import { resolveStudentProfile } from "@/lib/student-records";
import { UserSessionPayload } from "@/lib/types";
import StudentIdRecordView from "@/components/students/StudentIdRecordView";

export default function StudentProfilePage() {
  const { board } = useBoard();
  const [sessionUser, setSessionUser] = useState<UserSessionPayload | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data?.success && data.session) {
          setSessionUser(data.session);
        }
      })
      .catch(() => {
        // Fallback smoothly to active board showcase student
      });
    return () => {
      active = false;
    };
  }, []);

  const profile = resolveStudentProfile(sessionUser, board);
  const isState = profile.board === "state";

  return (
    <PortalLayout
      portal="student"
      userName={profile.fullName}
      userRole={`Student • ${profile.className}-${profile.section}`}
      userHumanId={profile.humanId}
      institutionName={`Sri Vivekananda Vidya Kendra (${isState ? "State Board" : "CBSE"})`}
      academicYear={profile.academicYear}
    >
      {/* Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                isState
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : "bg-blue-50 text-blue-800 border-blue-300"
              }`}
            >
              <IdCard className="w-3.5 h-3.5" />
              Official Student Identity &amp; Complete Record
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" /> {profile.enrollmentStatus}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Student ID Card, Complete Details &amp; Academic History
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete verified {isState ? "Karnataka State Board (KSEAB)" : "CBSE Board (Affil: 830680)"} student profile, parent particulars, academic progression, attendance &amp; fee history.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-white rounded-xl text-xs font-bold shadow-sm transition-all shrink-0 ${
            isState ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>Print Student ID &amp; History</span>
        </button>
      </div>

      {/* Complete Student ID Card (No QR) + Entire Details + Full History */}
      <StudentIdRecordView profile={profile} />
    </PortalLayout>
  );
}
