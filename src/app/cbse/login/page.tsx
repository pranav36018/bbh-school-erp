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

export default function CBSELoginPage() {
  const [portal, setPortal] = useState<PortalType>("admin");

  const portalConfigs = {
    director: {
      title: "CBSE Director Portal",
      subtitle: "CBSE Trust Governance & Academic Benchmarking",
      badge: "Executive MD & Trustees",
      themeColor: "amber" as const,
    },
    admin: {
      title: "CBSE School Admin Portal",
      subtitle: "CBSE Affiliation 830680, Registrar & Fee Operations",
      badge: "CBSE Principal & Admin",
      themeColor: "blue" as const,
    },
    teacher: {
      title: "CBSE Teacher Portal",
      subtitle: "NCERT Curriculum, Internal Assessments & AI Planner",
      badge: "CBSE Faculty & Class Teachers",
      themeColor: "blue" as const,
    },
    student: {
      title: "CBSE Student & Parent Portal",
      subtitle: "CBSE 9-Point Grade Cards, Timetable & Transit GPS",
      badge: "CBSE Students & Parents",
      themeColor: "purple" as const,
    },
  };

  const current = portalConfigs[portal];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-4">
        <Link
          href="/cbse"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-800 hover:text-blue-950 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to CBSE Board Homepage</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
        <div className="bg-white p-2 rounded-2xl border border-blue-200 shadow-sm flex items-center justify-between text-xs font-bold">
          {(["admin", "teacher", "student", "director"] as PortalType[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPortal(p)}
              className={`flex-1 py-1.5 px-2 rounded-xl capitalize transition-all ${
                portal === p
                  ? "bg-blue-700 text-white shadow-sm"
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
          board="cbse"
        />
      </div>
    </div>
  );
}
