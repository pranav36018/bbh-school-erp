import React from "react";
import Link from "next/link";
import StudentQrCode from "@/components/students/StudentQrCode";
import {
  GraduationCap,
  Building2,
  Users,
  ShieldCheck,
  BookOpen,
  Sparkles,
  ArrowRight,
  School,
  CheckCircle2,
  CreditCard,
  IdCard,
  FileCheck,
  Award,
  Layers,
  ArrowLeft,
} from "lucide-react";

export default function StateBoardHomePage() {
  const portals = [
    {
      title: "Director Portal",
      subtitle: "Executive Governance & Multi-Campus Analytics",
      route: "/state/director/login",
      color: "from-amber-600 to-orange-700",
      accent: "border-amber-500/20 bg-amber-50/50 hover:border-amber-500",
      badge: "Executive MD & Trustees",
      icon: Building2,
      features: [
        "Consolidated Multi-School KPIs",
        "Campus-Wise Financials & Fee Velocity",
        "Karnataka State Board Reports",
        "Strategic Approval Center",
      ],
      demoCred: "director.state@svvk.edu.in / Director@2026",
    },
    {
      title: "School Admin Portal",
      subtitle: "Comprehensive Campus Operations & Registrar",
      route: "/state/admin/login",
      color: "from-emerald-600 to-teal-800",
      accent: "border-emerald-500/20 bg-emerald-50/50 hover:border-emerald-500",
      badge: "Principal & Admin",
      icon: School,
      features: [
        "Online Admission CRM & Auto-Enrollment",
        "Unique ID Engine (INS/CAM/STU/TCH)",
        "State Board Grading Engine (CCE)",
        "Automated UPI & Fee Collection",
      ],
      demoCred: "admin.state@svvk.edu.in / Admin@2026",
    },
    {
      title: "Teacher Portal",
      subtitle: "Classroom Productivity & AI Teaching Diary",
      route: "/state/teacher/login",
      color: "from-teal-600 to-emerald-800",
      accent: "border-teal-500/20 bg-teal-50/50 hover:border-teal-500",
      badge: "Faculty & Class Teachers",
      icon: BookOpen,
      features: [
        "1-Click Attendance & Instant Absence Alerts",
        "Marks Entry with Board Rule Validation",
        "AI Lesson Planner & Quiz Generator",
        "Digital Teaching Diary & Homework",
      ],
      demoCred: "teacher.state@svvk.edu.in / Teacher@2026",
    },
    {
      title: "Student & Parent Portal",
      subtitle: "Personalized Learning & Digital Credentials",
      route: "/state/student/login",
      color: "from-purple-600 to-indigo-900",
      accent: "border-purple-500/20 bg-purple-50/50 hover:border-purple-500",
      badge: "Students & Guardians",
      icon: GraduationCap,
      features: [
        "Complete Student ID Profile & Academic History",
        "Daily Timetable & Attendance Analytics",
        "Board Progress Reports & Marks Sheets",
        "Seamless UPI Fee Payments & Receipts",
      ],
      demoCred: "student.state@svvk.edu.in / Student@2026",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 text-white text-xs py-2 px-4 border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-serif tracking-widest text-emerald-300 font-bold text-xs sm:text-sm">
              ॥ विद्या ददाति विनयम् ॥
            </span>
            <span className="hidden sm:inline text-emerald-200/50">•</span>
            <span className="text-emerald-100/90 text-[11px] hidden sm:inline">
              Managed by Swamy Vivekananda Vidya Kendra Trust · Hoskote, Bengaluru Rural – 562114
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-medium text-emerald-200 ring-1 ring-inset ring-emerald-500/30 text-[10px]">
              Karnataka State Board
            </span>
            <Link
              href="/"
              className="text-[11px] text-emerald-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" /> Unified Home
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <Link href="/" title="Back to Home">
              <img
                src="/images/svvk-logo.png"
                alt="Sri Vivekananda Vidya Kendra Logo"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-contain border-2 border-emerald-500/30 shadow-md bg-emerald-50/50 shrink-0"
              />
            </Link>
            <div className="min-w-0">
              <span className="text-base sm:text-xl font-black tracking-tight text-slate-900 block leading-tight truncate">
                SRI VIVEKANANDA VIDYA KENDRA
              </span>
              <p className="text-[11px] text-emerald-800 font-bold tracking-tight truncate flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
                Karnataka State Board • Hoskote
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/cbse"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold border border-blue-200 transition-colors"
            >
              <span>Switch to CBSE</span>
            </Link>
            <Link
              href="/state/admin/login"
              className="px-3 sm:px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Admin Sign In
            </Link>
            <Link
              href="/state/student/login"
              className="px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-sm transition-all"
            >
              Student Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-slate-200 bg-gradient-to-b from-emerald-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-semibold mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>॥ विद्या ददाति विनयम् ॥ • Karnataka State Board</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Sri Vivekananda{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-800">
                Vidya Kendra
              </span>
            </h1>
            <p className="mt-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-900">
              Managed by Swamy Vivekananda Vidya Kendra Trust • Hoskote, Bengaluru Rural – 562114
            </p>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Empowering students through values-driven, State Board-aligned holistic education. Complete digital campus management for students, parents, faculty, and administrative excellence.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Karnataka State Board Curriculum & Evaluation
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Live Attendance & SMS Alerts
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Verified Digital Records & TC
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Role Portals Grid */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Select Your Role-Dedicated Portal
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Strict role enforcement ensures users can only access their authorized State Board workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portals.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className={`rounded-2xl border bg-white p-6 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md ${p.accent}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${p.color} flex items-center justify-center text-white shadow-sm`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {p.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">{p.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">{p.subtitle}</p>

                    <div className="space-y-2 mb-6">
                      {p.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 font-mono mb-4 break-all">
                      <span className="block text-[10px] uppercase font-bold text-slate-400 not-mono mb-0.5">
                        Demo Credentials:
                      </span>
                      {p.demoCred}
                    </div>

                    <Link
                      href={p.route}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-all shadow-sm"
                    >
                      <span>Launch Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* State Board CCE Grading & Curriculum Highlights */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                Academic Framework
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                Karnataka State Board CCE Grading Engine
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Our State Board curriculum is systematically mapped to the Karnataka School Examination and Assessment 
                Board (KSEAB) guidelines. Every student is evaluated across 4 Formative Assessments and 2 Summative 
                Assessments throughout the academic year.
              </p>

              <div className="mt-6 space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                    <span>625 Total Marks Scheme (SSLC Pattern)</span>
                    <span className="text-emerald-700">6 Core Subjects</span>
                  </div>
                  <p className="text-slate-600">
                    First Language Kannada (125 Marks), Second Language English (100M), Third Language Hindi (100M), 
                    Mathematics (100M), Science (100M), and Social Science (100M).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                    <span>Distinction & Grading Scales</span>
                    <span className="text-emerald-700">A+ Distinction</span>
                  </div>
                  <p className="text-slate-600">
                    A+ (90-100% Distinction), A (80-89.9% First Class with Distinction), B+ (70-79.9%), B (60-69.9%), 
                    C+ (50-59.9%), C (35-49.9% Pass).
                  </p>
                </div>
              </div>
            </div>

            {/* Sample State Board Digital ID Card */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-inner">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
                <span>Verified State Student Identity &amp; History</span>
                <span className="text-emerald-700 font-bold">Active • AY-2026-2027</span>
              </div>

              <div className="bg-white rounded-2xl border-2 border-emerald-500/30 p-5 shadow-md space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <img
                    src="/images/svvk-logo.png"
                    alt="Logo"
                    className="w-11 h-11 rounded-full object-contain border border-emerald-200"
                  />
                  <div>
                    <span className="font-black text-sm text-slate-900 block leading-tight">
                      SRI VIVEKANANDA VIDYA KENDRA
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold block">
                      Karnataka State Board Division · Hoskote
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">Kiran Kumar S</span>
                    <span className="text-[11px] text-slate-600 block">Standard 8 · Section EM • Roll #8</span>
                    <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
                      Admission No: SB-2026-0042 • DOB: 2012-05-18 • B+
                    </span>
                    <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Grade A+ (91.8%)
                    </span>
                  </div>
                  <StudentQrCode
                    studentId="stu-state-001"
                    studentName="Kiran Kumar S"
                    admissionNo="SB-2026-0042"
                    variant="mini"
                    size={64}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px]">
                  <div className="col-span-2 pb-1.5 border-b border-slate-200/70">
                    <span className="text-[9px] uppercase font-bold text-emerald-700 block">Parent / Guardian Details</span>
                    <span className="font-semibold text-slate-900">Suresh Kumar (Father) • +91 98451 22334</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Attendance History</span>
                    <span className="font-semibold text-emerald-700">92.4% (198/215 Days)</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Fee Ledger Status</span>
                    <span className="font-semibold text-emerald-700">₹0 Dues (Term 1 &amp; 2 Paid)</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-600 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                  <strong className="text-emerald-900 block mb-0.5">Academic History:</strong>
                  Standard 6 (88.5% · A) → Standard 7 (90.4% · A+) → Standard 8 Current (91.8%)
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Student ID: STU-STATE-000042</span>
                  <span>Bus #01 (Hoskote Town)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2.5">
            <img src="/images/svvk-logo.png" alt="SVVK" className="w-6 h-6 rounded-full object-contain" />
            <span className="font-semibold text-slate-800">Sri Vivekananda Vidya Kendra</span>
            <span>• Karnataka State Board • Hoskote</span>
          </div>
          <div>
            <span>Managed by Swamy Vivekananda Vidya Kendra Trust • Hoskote, Bengaluru Rural – 562114</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
