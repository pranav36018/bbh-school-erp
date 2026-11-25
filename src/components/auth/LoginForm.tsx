"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  School,
  Building2,
  BookOpen,
  GraduationCap,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { PortalType, BoardSlug } from "@/lib/types";
import { useBoard } from "@/lib/board-context";

interface LoginFormProps {
  portal: PortalType;
  title: string;
  subtitle: string;
  badge: string;
  themeColor: "amber" | "blue" | "emerald" | "purple";
  defaultEmail?: string;
  defaultPass?: string;
  board?: BoardSlug;
}

function LoginFormContent({
  portal,
  title,
  subtitle,
  badge,
  themeColor,
  defaultEmail: propDefaultEmail,
  defaultPass: propDefaultPass,
  board: initialBoardProp,
}: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const boardContext = useBoard();

  // Determine active board: prop > query param > context > fallback
  const queryBoard = searchParams?.get("board") as BoardSlug | null;
  const isBoardLocked = Boolean(
    initialBoardProp ||
      (typeof window !== "undefined" &&
        (window.location.pathname.startsWith("/state") ||
          window.location.pathname.startsWith("/cbse")))
  );
  const [activeBoard, setActiveBoard] = useState<BoardSlug>(
    initialBoardProp || queryBoard || boardContext.board || "cbse"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Compute board-specific demo credentials
  const getBoardDemoCredentials = (b: BoardSlug, p: PortalType) => {
    switch (p) {
      case "director":
        return {
          email: b === "state" ? "director.state@svvk.edu.in" : "director.cbse@svvk.edu.in",
          pass: "Director@2026",
          roleLabel: "Executive Director & Managing Trustee",
        };
      case "admin":
        return {
          email: b === "state" ? "admin.state@svvk.edu.in" : "admin.cbse@svvk.edu.in",
          pass: "Admin@2026",
          roleLabel: b === "state" ? "Headmaster & State Board Admin" : "Principal & CBSE Admin",
        };
      case "teacher":
        return {
          email: b === "state" ? "teacher.state@svvk.edu.in" : "teacher.cbse@svvk.edu.in",
          pass: "Teacher@2026",
          roleLabel: b === "state" ? "Senior Faculty • State Board CCE" : "PGT Faculty • CBSE Division",
        };
      case "student":
        return {
          email: b === "state" ? "student.state@svvk.edu.in" : "student.cbse@svvk.edu.in",
          pass: "Student@2026",
          roleLabel: b === "state" ? "Standard 8 Student • State Board" : "Class 10 Student • CBSE Board",
        };
    }
  };

  // Official Excel Roster credentials
  const getRosterDemoCredentials = (p: PortalType) => {
    switch (p) {
      case "student":
        return {
          name: "Kaarshika V (Class 10)",
          email: "student.kaarshika.030@svvk.demo",
          pass: "Dolphin-Nectar-River-30",
        };
      case "teacher":
        return {
          name: "Arathi Baradi (Faculty)",
          email: "arathi@svvk.demo",
          pass: "River-Honey-Forest-34",
        };
      case "admin":
        return {
          name: "Anita Sanjiv (Admin/Clerk)",
          email: "anita@svvk.demo",
          pass: "Rocket-Marble-Anchor-36",
        };
      case "director":
        return {
          name: "Managing Trustee",
          email: "director@svvk.demo",
          pass: "Lion-Summit-Trust-88",
        };
    }
  };

  const currentDemo = getBoardDemoCredentials(activeBoard, portal);
  const rosterDemo = getRosterDemoCredentials(portal);
  const effectiveEmail = propDefaultEmail || currentDemo.email;
  const effectivePass = propDefaultPass || currentDemo.pass;

  const fillDemo = () => {
    setEmail(effectiveEmail);
    setPassword(effectivePass);
    setError(null);
  };

  const fillRoster = () => {
    setEmail(rosterDemo.email);
    setPassword(rosterDemo.pass);
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, portal, board: activeBoard }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Login failed. Please verify credentials.");
        setLoading(false);
        return;
      }

      boardContext.setBoard(activeBoard);

      // Redirect to designated dashboard
      router.push(data.redirectTo || `/${portal}/dashboard?board=${activeBoard}`);
    } catch (err: any) {
      setError(err.message || "Network error. Please try again.");
      setLoading(false);
    }
  };

  const getThemeClasses = () => {
    switch (themeColor) {
      case "amber":
        return {
          icon: Building2,
          gradient: "from-amber-600 to-orange-700",
          ring: "focus:ring-amber-500",
          btn: "bg-amber-600 hover:bg-amber-700 shadow-amber-500/20",
          tag: "bg-amber-50 text-amber-700 border-amber-200",
        };
      case "emerald":
        return {
          icon: BookOpen,
          gradient: "from-emerald-600 to-teal-800",
          ring: "focus:ring-emerald-500",
          btn: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20",
          tag: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };
      case "purple":
        return {
          icon: GraduationCap,
          gradient: "from-purple-600 to-indigo-900",
          ring: "focus:ring-purple-500",
          btn: "bg-purple-600 hover:bg-purple-700 shadow-purple-500/20",
          tag: "bg-purple-50 text-purple-700 border-purple-200",
        };
      case "blue":
      default:
        return {
          icon: School,
          gradient: "from-blue-600 to-indigo-800",
          ring: "focus:ring-blue-500",
          btn: "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20",
          tag: "bg-blue-50 text-blue-700 border-blue-200",
        };
    }
  };

  const theme = getThemeClasses();
  const Icon = theme.icon;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Header Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-5">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to School Homepage</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-3xl sm:px-10 border border-slate-200">
          {/* Header */}
          <div className="text-center mb-6">
            <Link href="/" title="Sri Vivekananda Vidya Kendra">
              <img
                src="/images/svvk-logo.png"
                alt="Sri Vivekananda Vidya Kendra"
                className="mx-auto w-16 h-16 rounded-full object-contain mb-2.5 border-2 border-amber-500/40 shadow-md bg-amber-50/70"
              />
            </Link>
            <p className="text-[10px] font-bold tracking-widest text-amber-800">॥ विद्या ददाति विनयम् ॥</p>
            <h1 className="text-sm font-black tracking-tight text-slate-900 uppercase">
              Sri Vivekananda Vidya Kendra
            </h1>
            <p className="text-[10px] text-slate-500 font-medium mb-3">
              Managed by Swamy Vivekananda Vidya Kendra Trust • Hoskote
            </p>

            {/* Board Indicator or Selector */}
            {isBoardLocked ? (
              <div
                className={`mb-4 py-2 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold ${
                  activeBoard === "state"
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                    : "bg-blue-50 border-blue-300 text-blue-900"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${activeBoard === "state" ? "bg-emerald-600" : "bg-blue-600"}`}></span>
                <span>
                  {activeBoard === "state"
                    ? "Karnataka State Board (KSEAB) Portal"
                    : "CBSE Board (Affiliation: 830680) Portal"}
                </span>
              </div>
            ) : (
              <div className="mb-4 p-1 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setActiveBoard("state");
                    setError(null);
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all ${
                    activeBoard === "state"
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  State Board (KSEAB)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveBoard("cbse");
                    setError(null);
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all ${
                    activeBoard === "cbse"
                      ? "bg-blue-700 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  CBSE (Affil: 830680)
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-2">
              <span className={`inline-block text-[11px] font-semibold px-3 py-1 rounded-full border ${theme.tag}`}>
                {badge}
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 mt-2">{title}</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeBoard === "state" ? "Karnataka State Board Portal" : "CBSE Board Portal"} · {subtitle}
            </p>
          </div>

          {/* Demo Autofill Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-bold text-slate-800 text-xs">Quick Demo Autofill</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 truncate">
                  {currentDemo.roleLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={fillDemo}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-xs text-xs shrink-0 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Autofill</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono bg-white p-2.5 rounded-xl border border-slate-200 mb-2">
              <div className="truncate">
                <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">Email:</span>
                <span className="text-slate-800 font-semibold truncate block" title={effectiveEmail}>{effectiveEmail}</span>
              </div>
              <div className="truncate">
                <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">Password:</span>
                <span className="text-emerald-700 font-bold block" title={effectivePass}>{effectivePass}</span>
              </div>
            </div>

            {/* Official Excel Roster Option */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-200">
              <span className="truncate">Or Excel Roster: <strong className="text-slate-700">{rosterDemo.name}</strong></span>
              <button
                type="button"
                onClick={fillRoster}
                className="text-emerald-700 font-bold hover:underline shrink-0 ml-2"
              >
                Autofill Roster
              </button>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Official Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@svvk.edu.in"
                  className={`block w-full pl-10 pr-3 py-2.5 sm:text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent text-slate-900 bg-white`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotOpen(true)}
                  className="text-[11px] font-medium text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`block w-full pl-10 pr-10 py-2.5 sm:text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent text-slate-900 bg-white`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-white font-medium text-sm transition-all shadow-md ${theme.btn} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to {title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Switch Portal Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400 block mb-2">Switch to another role portal</span>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {portal !== "director" && (
                <Link
                  href={`/${activeBoard}/director/login`}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  Director
                </Link>
              )}
              {portal !== "admin" && (
                <Link
                  href={`/${activeBoard}/admin/login`}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  Admin
                </Link>
              )}
              {portal !== "teacher" && (
                <Link
                  href={`/${activeBoard}/teacher/login`}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  Teacher
                </Link>
              )}
              {portal !== "student" && (
                <Link
                  href={`/${activeBoard}/student/login`}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  Student
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm mb-2">Password Reset Assistance</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your registered official email address. An OTP will be sent to reset your password.
            </p>

            {resetSent ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs mb-4">
                Password recovery link sent to your email. Check your inbox.
              </div>
            ) : (
              <input
                type="email"
                placeholder="name@svvk.edu.in"
                className="w-full px-3 py-2 border rounded-xl text-xs mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}

            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => {
                  setForgotOpen(false);
                  setResetSent(false);
                }}
                className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              {!resetSent && (
                <button
                  onClick={() => setResetSent(true)}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                >
                  Send Reset Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginForm(props: LoginFormProps) {
  return (
    <React.Suspense
      fallback={
        <div className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl border border-slate-200 shadow-sm text-center text-xs text-slate-400">
          Loading portal gateway...
        </div>
      }
    >
      <LoginFormContent {...props} />
    </React.Suspense>
  );
}
