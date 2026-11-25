import React from "react";
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
  Award,
  Calendar,
  Bus,
  Layers,
  ChevronRight,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Clock,
  Compass,
} from "lucide-react";

export default function UnifiedHomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-600 selection:text-white">
      {/* 1. TOP HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-950/90 to-slate-950 text-white text-xs py-2 px-4 border-b border-amber-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-serif tracking-widest text-amber-300 font-bold text-xs sm:text-sm">
              ॥ विद्या ददाति विनयम् ॥
            </span>
            <span className="hidden md:inline text-amber-200/50">•</span>
            <span className="text-amber-100/90 text-[11px] hidden sm:inline">
              Managed by Swamy Vivekananda Vidya Kendra Trust · Hoskote, Bengaluru Rural – 562114
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-medium text-emerald-200 ring-1 ring-inset ring-emerald-500/30 text-[10px]">
              Karnataka State Board
            </span>
            <span className="inline-flex items-center rounded-full bg-blue-500/20 px-2.5 py-0.5 font-medium text-blue-200 ring-1 ring-inset ring-blue-500/30 text-[10px]">
              CBSE Affiliation: 830680
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <img
              src="/images/svvk-logo.png"
              alt="Sri Vivekananda Vidya Kendra Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-contain border-2 border-amber-500/40 shadow-md bg-amber-50/50 shrink-0"
            />
            <div className="min-w-0">
              <span className="text-base sm:text-lg lg:text-xl font-black tracking-tight text-slate-900 block leading-tight truncate">
                SRI VIVEKANANDA VIDYA KENDRA
              </span>
              <p className="text-[11px] sm:text-xs text-slate-600 font-medium tracking-tight truncate">
                Managed by Swamy Vivekananda Vidya Kendra Trust • Hoskote, Bengaluru Rural
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#boards" className="hover:text-amber-700 transition-colors">
              Choose Board
            </a>
            <Link href="/state" className="hover:text-emerald-700 transition-colors flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              State Board
            </Link>
            <Link href="/cbse" className="hover:text-blue-700 transition-colors flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              CBSE Board
            </Link>
            <a href="#comparison" className="hover:text-slate-900 transition-colors">
              Board Comparison
            </a>
            <a href="#facilities" className="hover:text-slate-900 transition-colors">
              Campus Facilities
            </a>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-sm"
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Unified Login</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200 bg-gradient-to-b from-amber-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>॥ विद्या ददाति विनयम् ॥ • Empowering Generations with Values & Intellect</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Sri Vivekananda{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">
                Vidya Kendra
              </span>
            </h1>
            <p className="mt-3 text-xs sm:text-sm font-semibold uppercase tracking-widest text-amber-800">
              Managed by Swamy Vivekananda Vidya Kendra Trust • Hoskote, Bengaluru Rural – 562114
            </p>
            <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Welcome to our unified campus. We offer complete educational excellence across both{" "}
              <strong className="text-slate-900 font-bold">Karnataka State Board</strong> and{" "}
              <strong className="text-slate-900 font-bold">CBSE Board</strong>. Select your board below to explore
              curriculum, academic grading, faculty, student portals, and complete digital administration.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-700">
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Dual Board Separation & Isolation
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Role-Based Portals (Admin, Teacher, Student, Director)
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Live Attendance, SMS & Verified QR Credentials
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRIMARY BOARD SELECTION CARDS (PROMINENT SIDE-BY-SIDE / STACKED MOBILE) */}
      <section id="boards" className="py-16 lg:py-24 bg-slate-100/70 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300">
              Academic Selection
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Select Your School Board
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Choose your educational curriculum to enter the dedicated board experience with board-specific grading,
              examinations, timetables, and role-based portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* OPTION 1: KARNATAKA STATE BOARD */}
            <div className="relative flex flex-col rounded-3xl bg-white border-2 border-emerald-500/30 hover:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden group">
              <div className="h-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600"></div>
              
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    Karnataka State Board
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">
                    KSEAB · DSERT Curriculum
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                    State Board Portal
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Sri Vivekananda Vidya Kendra · State Board Division · Hoskote
                  </p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Comprehensive Karnataka State Board education adhering to the state CCE evaluation framework, 
                  state-prescribed syllabus, vibrant cultural grounding, and strong 3-language proficiency with Kannada 
                  first language.
                </p>

                {/* Key Features List */}
                <div className="space-y-2.5 mb-8 flex-1">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Continuous & Comprehensive Evaluation (CCE):</strong> FA-1 to FA-4 and SA-1, SA-2</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>State Language Scheme:</strong> First Language Kannada (125M) + English (100M) + Hindi (100M)</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Grading System:</strong> Distinction (A+ 90-100%), First Class (A, B+), CCE Marksheets</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Dedicated State Portals:</strong> Director, School Admin, Teacher, and Student & Parent</span>
                  </div>
                </div>

                {/* Role Quick Links */}
                <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                    Direct State Portal Access:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Link
                      href="/state/admin/login"
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-emerald-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-400 font-medium transition-colors text-center"
                    >
                      Admin Sign In
                    </Link>
                    <Link
                      href="/state/teacher/login"
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-emerald-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-400 font-medium transition-colors text-center"
                    >
                      Teacher Sign In
                    </Link>
                    <Link
                      href="/state/student/login"
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-emerald-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-400 font-medium transition-colors text-center"
                    >
                      Student & Parent
                    </Link>
                    <Link
                      href="/state/director/login"
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-emerald-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-400 font-medium transition-colors text-center"
                    >
                      Director Portal
                    </Link>
                  </div>
                </div>

                {/* Main Action Button */}
                <Link
                  href="/state"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm transition-all shadow-md shadow-emerald-700/20 group-hover:scale-[1.01]"
                >
                  <span>Explore State Board Portal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* OPTION 2: CBSE BOARD */}
            <div className="relative flex flex-col rounded-3xl bg-white border-2 border-blue-500/30 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden group">
              <div className="h-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700"></div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    CBSE Affiliation: 830680
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-xs font-semibold text-blue-700 tracking-wide uppercase">
                    Central Board of Secondary Education · New Delhi
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                    CBSE Board Portal
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Sri Vivekananda Vidya Kendra · Affiliation No. 830680 · Hoskote
                  </p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  National curriculum aligned with NCERT and NEP 2020 standards, focusing on conceptual inquiry, 
                  experiential learning, competitive readiness (NEET/JEE/Olympiads), and holistic assessment.
                </p>

                {/* Key Features List */}
                <div className="space-y-2.5 mb-8 flex-1">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>CBSE Assessment Framework:</strong> 80 Marks Annual Board Exam + 20 Marks Internal</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>National Grading Scale:</strong> A1 (Top 1/8th 91-100%), A2, B1, B2, C1, C2, D, E</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Integrated STEM & AI:</strong> Robotics labs, periodic testing, portfolio & practicals</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Dedicated CBSE Portals:</strong> Director, School Admin, Teacher, and Student & Parent</span>
                  </div>
                </div>

                {/* Role Quick Links */}
                <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-100 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 block mb-2">
                    Direct CBSE Portal Access:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Link
                      href="/cbse/admin/login"
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-blue-200 text-slate-700 hover:text-blue-700 hover:border-blue-400 font-medium transition-colors text-center"
                    >
                      Admin Sign In
                    </Link>
                    <Link
                      href="/cbse/teacher/login"
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-blue-200 text-slate-700 hover:text-blue-700 hover:border-blue-400 font-medium transition-colors text-center"
                    >
                      Teacher Sign In
                    </Link>
                    <Link
                      href="/cbse/student/login"
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-blue-200 text-slate-700 hover:text-blue-700 hover:border-blue-400 font-medium transition-colors text-center"
                    >
                      Student & Parent
                    </Link>
                    <Link
                      href="/cbse/director/login"
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-blue-200 text-slate-700 hover:text-blue-700 hover:border-blue-400 font-medium transition-colors text-center"
                    >
                      Director Portal
                    </Link>
                  </div>
                </div>

                {/* Main Action Button */}
                <Link
                  href="/cbse"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-sm transition-all shadow-md shadow-blue-700/20 group-hover:scale-[1.01]"
                >
                  <span>Explore CBSE Board Portal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOARD COMPARISON TABLE */}
      <section id="comparison" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Clear Board Isolation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              Karnataka State Board vs CBSE Board at SVVK
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Both boards maintain distinct syllabus guidelines, separate exam workflows, and isolated student records.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] w-1/4">Feature / Dimension</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-emerald-300 w-3/8 bg-emerald-950/60">
                    Karnataka State Board (KSEAB)
                  </th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-blue-300 w-3/8 bg-blue-950/60">
                    CBSE Board (Affiliation: 830680)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-slate-900">Curriculum & Body</td>
                  <td className="py-3.5 px-6 text-slate-700 bg-emerald-50/30">
                    DSERT Karnataka Syllabus & KSEAB Evaluation Scheme
                  </td>
                  <td className="py-3.5 px-6 text-slate-700 bg-blue-50/30">
                    NCERT Framework & Central Board of Secondary Education, Delhi
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-slate-900">Grading System</td>
                  <td className="py-3.5 px-6 text-slate-700 bg-emerald-50/30">
                    Continuous and Comprehensive Evaluation (CCE) · A+, A, B+, B, C+, C, D
                  </td>
                  <td className="py-3.5 px-6 text-slate-700 bg-blue-50/30">
                    9-Point Positional Grading Scale · A1, A2, B1, B2, C1, C2, D, E
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-slate-900">Examination Structure</td>
                  <td className="py-3.5 px-6 text-slate-700 bg-emerald-50/30">
                    6 Formative & Summative Terms (FA-1, FA-2, SA-1, FA-3, FA-4, SA-2)
                  </td>
                  <td className="py-3.5 px-6 text-slate-700 bg-blue-50/30">
                    Annual Scheme: 80 Marks Final Exam + 20 Marks Internal Assessments
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-slate-900">Language Formula</td>
                  <td className="py-3.5 px-6 text-slate-700 bg-emerald-50/30">
                    1st Lang: Kannada (125 Marks), 2nd Lang: English (100M), 3rd Lang: Hindi (100M)
                  </td>
                  <td className="py-3.5 px-6 text-slate-700 bg-blue-50/30">
                    1st Lang: English (100M), 2nd Lang: Hindi / Sanskrit (100M)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-slate-900">Total SSLC / 10th Marks</td>
                  <td className="py-3.5 px-6 text-slate-700 bg-emerald-50/30 font-semibold text-emerald-800">
                    625 Total Marks (6 Subjects)
                  </td>
                  <td className="py-3.5 px-6 text-slate-700 bg-blue-50/30 font-semibold text-blue-800">
                    500 Total Marks (5 Core Subjects)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-slate-900">Campus Experience URL</td>
                  <td className="py-3.5 px-6 bg-emerald-50/30">
                    <Link href="/state" className="text-emerald-700 font-bold hover:underline flex items-center gap-1">
                      /state → State Portal <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                  <td className="py-3.5 px-6 bg-blue-50/30">
                    <Link href="/cbse" className="text-blue-700 font-bold hover:underline flex items-center gap-1">
                      /cbse → CBSE Portal <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. SHARED TRUST INFRASTRUCTURE & CAMPUS FEATURES */}
      <section id="facilities" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300">
              Campus Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              World-Class Facilities Across Both Wings
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Swamy Vivekananda Vidya Kendra Trust provides state-of-the-art campus infrastructure for both State Board
              and CBSE students in Hoskote.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <School className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Smart Digital Classrooms</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Interactive smart boards, multimedia audiovisual tools, and AI-assisted teaching diaries in every grade.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Science & Robotics Labs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full-fledged Physics, Chemistry, Biology, Mathematics and Computer Science laboratory setups.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Bus className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">AIS-140 GPS Transport</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Real-time school bus GPS tracking for parents and teachers with emergency speed and geofence alerts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Digital IDs & Instant UPI</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tamper-proof HMAC-SHA256 QR digital identity cards, automated fee collection, and digital report cards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. UNIFIED SCHOOL STATS */}
      <section className="py-12 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400">1,250+</div>
              <div className="text-xs text-slate-300 mt-1 uppercase font-semibold tracking-wider">
                Students Enrolled
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">65+</div>
              <div className="text-xs text-slate-300 mt-1 uppercase font-semibold tracking-wider">
                Certified Educators
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-blue-400">100%</div>
              <div className="text-xs text-slate-300 mt-1 uppercase font-semibold tracking-wider">
                Board Pass Record
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-purple-400">30+</div>
              <div className="text-xs text-slate-300 mt-1 uppercase font-semibold tracking-wider">
                Years Educational Legacy
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. COMMON LOGIN QUICK JUMP */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Secure Entry Point
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
            Role-Based Access for Staff, Students & Trustees
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Strict tenant and role validation ensures you only access records for your designated board and role.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>Unified Role Login</span>
            </Link>
            <Link
              href="/state"
              className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>State Board Experience</span>
            </Link>
            <Link
              href="/cbse"
              className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
            >
              <GraduationCap className="w-4 h-4" />
              <span>CBSE Board Experience</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer id="trust" className="bg-slate-950 text-slate-300 pt-12 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="/images/svvk-logo.png"
                  alt="SVVK"
                  className="w-10 h-10 rounded-full object-contain bg-amber-50 p-0.5"
                />
                <div>
                  <span className="font-extrabold text-white text-base block tracking-tight">
                    SRI VIVEKANANDA VIDYA KENDRA
                  </span>
                  <span className="text-[11px] text-amber-400 font-medium">
                    ॥ विद्या ददाति विनयम् ॥
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                Managed by Swamy Vivekananda Vidya Kendra Trust. Empowering students with moral discipline, academic
                distinction, and holistic development in Hoskote, Bengaluru Rural.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-semibold">
                  Karnataka State Board (KSEAB)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-blue-950/80 text-blue-300 border border-blue-800/60 font-semibold">
                  CBSE Affiliation No. 830680
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Campus Portals</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <Link href="/state" className="hover:text-emerald-400 transition-colors">
                    State Board Homepage
                  </Link>
                </li>
                <li>
                  <Link href="/cbse" className="hover:text-blue-400 transition-colors">
                    CBSE Board Homepage
                  </Link>
                </li>
                <li>
                  <Link href="/state/login" className="hover:text-emerald-400 transition-colors">
                    State Board Login
                  </Link>
                </li>
                <li>
                  <Link href="/cbse/login" className="hover:text-blue-400 transition-colors">
                    CBSE Board Login
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Common Login Entry
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Contact Information</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Hoskote, Bengaluru Rural District, Karnataka – 562114</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>+91 80 2797 1234</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>contact@svvk.edu.in</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <div>
              © 2026 Sri Vivekananda Vidya Kendra. Managed by Swamy Vivekananda Vidya Kendra Trust. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>DPDP Act 2023 Compliant</span>
              <span>•</span>
              <span>ISO 9001:2015 Certified Campus</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
