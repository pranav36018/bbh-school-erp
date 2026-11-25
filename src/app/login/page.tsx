"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  School,
  Building2,
  BookOpen,
  GraduationCap,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import { PortalType, BoardSlug } from "@/lib/types";

export default function UnifiedLoginPage() {
  const [selectedBoard, setSelectedBoard] = useState<BoardSlug>("cbse");
  const [selectedPortal, setSelectedPortal] = useState<PortalType>("admin");

  const portalConfigs = {
    director: {
      title: "Director Portal",
      subtitle: "Trust Governance & Executive Analytics",
      badge: "Executive MD & Trustees",
      themeColor: "amber" as const,
      icon: Building2,
    },
    admin: {
      title: "School Admin Portal",
      subtitle: "Campus Operations, Registrar & Examinations",
      badge: "Principal & Administrators",
      themeColor: "blue" as const,
      icon: School,
    },
    teacher: {
      title: "Teacher Portal",
      subtitle: "Attendance, Marks, AI Lesson Plans & Diary",
      badge: "Faculty & Class Teachers",
      themeColor: "emerald" as const,
      icon: BookOpen,
    },
    student: {
      title: "Student & Parent Portal",
      subtitle: "Timetables, Exam Results, Live Bus GPS & UPI Fees",
      badge: "Students & Guardians",
      themeColor: "purple" as const,
      icon: GraduationCap,
    },
  };

  const currentConfig = portalConfigs[selectedPortal];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Header Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Sri Vivekananda Vidya Kendra Homepage</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        {/* Step 1 & 2 Selector Bar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Step 1: Select Your School Board
              </span>
              <h2 className="text-sm font-extrabold text-slate-900 mt-1">Which Board are you enrolled in?</h2>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedBoard("state")}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                  selectedBoard === "state"
                    ? "bg-emerald-700 text-white border-emerald-700 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Karnataka State Board</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedBoard("cbse")}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                  selectedBoard === "cbse"
                    ? "bg-blue-700 text-white border-blue-700 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>CBSE (Affil: 830680)</span>
              </button>
            </div>
          </div>

          <div className="pt-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Step 2: Choose Your User Role
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(portalConfigs) as PortalType[]).map((key) => {
                const conf = portalConfigs[key];
                const Icon = conf.icon;
                const isSelected = selectedPortal === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedPortal(key)}
                    className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-amber-400" : "text-slate-500"}`} />
                    <span className="text-xs font-bold block leading-tight">{conf.title.replace(" Portal", "")}</span>
                    <span className={`text-[10px] block mt-0.5 truncate ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                      {conf.badge.split("&")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Login Form for the selected combination */}
        <LoginForm
          key={`${selectedBoard}-${selectedPortal}`}
          portal={selectedPortal}
          title={currentConfig.title}
          subtitle={currentConfig.subtitle}
          badge={`${selectedBoard === "state" ? "State Board" : "CBSE Board"} · ${currentConfig.badge}`}
          themeColor={currentConfig.themeColor}
          board={selectedBoard}
        />
      </div>
    </div>
  );
}
