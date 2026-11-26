"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, IdCard, Printer, ShieldCheck } from "lucide-react";
import { findStudentByIdentifier } from "@/lib/student-records";
import StudentIdRecordView from "@/components/students/StudentIdRecordView";

export default function ScannedStudentIdPage({
  params,
}: {
  params: { studentId: string };
}) {
  const studentId = params?.studentId || "";
  const profile = findStudentByIdentifier(studentId);

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-md w-full p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto">
            <IdCard className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900">Student Record Not Found</h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            No matching student profile was found for identifier{" "}
            <strong className="font-mono text-slate-900">{studentId || "—"}</strong>. Please re-scan an official Sri Vivekananda Vidya Kendra QR ID card.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/admin/students"
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all"
            >
              Open Student Registry
            </Link>
            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-all"
            >
              School Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isState = profile.board === "state";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Verified School Institution Header */}
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-30 print:static">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/images/svvk-logo.png"
              alt="Sri Vivekananda Vidya Kendra"
              className="w-10 h-10 rounded-full object-contain bg-amber-500/10 p-0.5 border border-amber-400/40 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase">
                  Sri Vivekananda Vidya Kendra • Hoskote
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3" /> QR Scan Verified
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-extrabold text-white truncate">
                {profile.fullName} — Official Student ID, Parent Details &amp; History
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={() => window.print()}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-all ${
                isState ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Record</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content — Complete Student Details, Parents Details on Top, & Required History */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Digital Verification Active for <strong>{profile.fullName}</strong> (Admission No:{" "}
              <strong className="font-mono text-blue-700">{profile.admissionNo}</strong> •{" "}
              {profile.boardBadge})
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">{profile.academicYear}</span>
        </div>

        <StudentIdRecordView profile={profile} />
      </main>
    </div>
  );
}
