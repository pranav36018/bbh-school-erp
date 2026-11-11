import Link from "next/link";
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
  QrCode,
  FileCheck,
} from "lucide-react";

export default function HomePage() {
  const portals = [
    {
      title: "Director Portal",
      subtitle: "Executive Governance & Multi-Campus Analytics",
      route: "/director/login",
      color: "from-amber-600 to-orange-700",
      accent: "border-amber-500/20 bg-amber-50/50 hover:border-amber-500",
      badge: "Executive MD & Trustees",
      icon: Building2,
      features: [
        "Consolidated Multi-School KPIs",
        "Campus-Wise Financials & Fee Velocity",
        "CBSE vs State Board Comparisons",
        "Strategic Approval Center",
      ],
      demoCred: "director@indiaunifiederp.edu.in / Director@2026",
    },
    {
      title: "School Admin Portal",
      subtitle: "Comprehensive Campus Operations & Registrar",
      route: "/admin/login",
      color: "from-blue-600 to-indigo-800",
      accent: "border-blue-500/20 bg-blue-50/50 hover:border-blue-500",
      badge: "Principal & Admin",
      icon: School,
      features: [
        "Online Admission CRM & Auto-Enrollment",
        "Unique ID Engine (INS/CAM/STU/TCH)",
        "CBSE & State Board Grading Engine",
        "Automated UPI & Fee Collection",
      ],
      demoCred: "admin.dps@indiaunifiederp.edu.in / Admin@2026",
    },
    {
      title: "Teacher Portal",
      subtitle: "Classroom Productivity & AI Teaching Diary",
      route: "/teacher/login",
      color: "from-emerald-600 to-teal-800",
      accent: "border-emerald-500/20 bg-emerald-50/50 hover:border-emerald-500",
      badge: "Faculty & Class Teachers",
      icon: BookOpen,
      features: [
        "1-Click Attendance & Instant Absence Alerts",
        "Marks Entry with Board Rule Validation",
        "AI Lesson Planner & Quiz Generator",
        "Digital Teaching Diary & Homework",
      ],
      demoCred: "teacher.ananya@indiaunifiederp.edu.in / Teacher@2026",
    },
    {
      title: "Student & Parent Portal",
      subtitle: "Personalized Learning & Digital Credentials",
      route: "/student/login",
      color: "from-purple-600 to-indigo-900",
      accent: "border-purple-500/20 bg-purple-50/50 hover:border-purple-500",
      badge: "Students & Guardians",
      icon: GraduationCap,
      features: [
        "Digital ID Card with Live QR Verification",
        "Daily Timetable & Attendance Analytics",
        "Board Progress Reports & Marks Sheets",
        "Seamless UPI Fee Payments & Receipts",
      ],
      demoCred: "student.aarav@indiaunifiederp.edu.in / Student@2026",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-0.5 font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
              DPDP Act 2023 Compliant
            </span>
            <span>Empowering Schools Across India with NEP 2020 Multi-Board Standards</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>CBSE</span>
            <span>•</span>
            <span>Karnataka (KSEAB)</span>
            <span>•</span>
            <span>Maharashtra</span>
            <span>•</span>
            <span>Tamil Nadu</span>
            <span>•</span>
            <span>Kerala</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
              <School className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-950">
                INDIA UNIFIED SCHOOL ERP
              </span>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                Multi-School • Multi-Board • Multi-Campus SaaS
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/login"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
            >
              Admin Sign In
            </Link>
            <Link
              href="/student/login"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-all shadow-blue-600/25"
            >
              <span>Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Enterprise Education Management</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              One Unified ERP for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">Every Indian School</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
              Designed from the ground up for Indian institutions. Manage multi-campus trusts, diverse curriculum boards (CBSE, KSEAB, MSBSHSE, TNSB), millions of student records, automated UPI fee collection, and AI-powered classroom scheduling.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Collision-Resistant Unique ID Engine
              </span>
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Strict Tenant Isolation
              </span>
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Zero Dummy UI – Real Backend & DB
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Specialized Portals Grid */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Select Your Role-Dedicated Portal
          </h2>
          <p className="mt-2 text-slate-600 text-sm">
            Strict role enforcement ensures users can only access their authorized workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portals.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 bg-white transition-all duration-200 shadow-sm hover:shadow-xl ${p.accent}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${p.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 mb-4 leading-normal">{p.subtitle}</p>

                  <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                    {p.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-4 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                    <span className="font-semibold text-slate-800 block mb-0.5">Demo Credentials:</span>
                    <code className="text-blue-700 break-all select-all">{p.demoCred}</code>
                  </div>

                  <Link
                    href={p.route}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-medium text-sm transition-all shadow-sm"
                  >
                    <span>Launch Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Unique Identification Engine Highlight */}
      <section className="py-16 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Core Innovation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Centralized Collision-Resistant ID Engine
              </h2>
              <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
                Every student, teacher, campus, and receipt receives an immutable internal UUID paired with an automatic, tamper-proof human-readable sequence. School admission sequences remain autonomous while supporting inter-school student transfers seamlessly.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                  <span className="text-slate-400 block">Student Identity</span>
                  <span className="text-emerald-400 font-mono font-bold text-sm">STU-INS000001-000042</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                  <span className="text-slate-400 block">Teacher Code</span>
                  <span className="text-blue-400 font-mono font-bold text-sm">TCH-INS000001-000015</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                  <span className="text-slate-400 block">Institution Group</span>
                  <span className="text-amber-400 font-mono font-bold text-sm">INS-IND-000001</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                  <span className="text-slate-400 block">Campus Branch</span>
                  <span className="text-purple-400 font-mono font-bold text-sm">CAM-INS000001-001</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-blue-400" />
                  <span>Digital Identity Card & QR Payload</span>
                </span>
                <span className="text-emerald-400 font-medium">HMAC-SHA256 Verified</span>
              </div>
              <div className="mt-6 flex flex-col items-center justify-center text-center p-6 bg-slate-900/80 rounded-xl border border-slate-700/60">
                <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center shadow-lg">
                  <QrCode className="w-20 h-20 text-slate-900" />
                </div>
                <p className="mt-4 text-sm font-semibold text-white">Aarav Kashyap</p>
                <p className="text-xs text-slate-400 font-mono">STU-INS000001-000001 • Class 10-A</p>
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Active CBSE Enrolled Student</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <School className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-slate-700">India Unified School ERP Platform</span>
            <span>• Production-Ready Multi-Board Architecture</span>
          </div>
          <div>
            <span>Version 1.0.0 • Digital Personal Data Protection (DPDP) Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
