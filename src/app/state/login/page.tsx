"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  School,
  Building2,
  BookOpen,
  GraduationCap,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import { PortalType } from "@/lib/types";

export default function StateLoginPage() {
  const [portal, setPortal] = useState<PortalType>("admin");

  const portalConfigs = {
    director: {
      title: "State Director Portal",
      subtitle: "State Board Trust Governance & Analytics",
      badge: "Executive MD & Trustees",
      themeColor: "amber" as const,
    },
    admin: {
      title: "State School Admin Portal",
      subtitle: "KSEAB Admissions, CCE Grading & Staff Management",
      badge: "State Board Principal & Admin",
      themeColor: "emerald" as const,
    },
    teacher: {
      title: "State Teacher Portal",
      subtitle: "Kannada & Core Subjects, CCE Marks Entry & Diary",
      badge: "State Board Faculty",
      themeColor: "emerald" as const,
    },
    student: {
      title: "State Student & Parent Portal",
      subtitle: "CCE Progress Reports, SSLC Preparation & Timetables",
      badge: "State Board Students & Parents",
      themeColor: "purple" as const,
    },
  };

  const current = portalConfigs[portal];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-4">
        <Link
          href="/state"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to State Board Homepage</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
        <div className="bg-white p-2 rounded-2xl border border-emerald-200 shadow-sm flex items-center justify-between text-xs font-bold">
          {(["admin", "teacher", "student", "director"] as PortalType[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPortal(p)}
              className={`flex-1 py-1.5 px-2 rounded-xl capitalize transition-all ${
                portal === p
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm
          key={portal}
          portal={portal}
          title={current.title}
          subtitle={current.subtitle}
          badge={current.badge}
          themeColor={current.themeColor}
          board="state"
        />
      </div>
    </div>
  );
}
