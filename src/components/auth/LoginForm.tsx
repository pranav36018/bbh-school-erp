"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
} from "lucide-react";
import { PortalType } from "@/lib/types";

interface LoginFormProps {
  portal: PortalType;
  title: string;
  subtitle: string;
  badge: string;
  themeColor: "amber" | "blue" | "emerald" | "purple";
  defaultEmail: string;
  defaultPass: string;
}

export default function LoginForm({
  portal,
  title,
  subtitle,
  badge,
  themeColor,
  defaultEmail,
  defaultPass,
}: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const fillDemo = () => {
    setEmail(defaultEmail);
    setPassword(defaultPass);
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
        body: JSON.stringify({ email, password, portal }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Login failed. Please verify credentials.");
        setLoading(false);
        return;
      }

      // Redirect to portal dashboard
      router.push(data.redirectTo || `/${portal}/dashboard`);
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Top Header Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors">
          <span>← Back to ERP Platform Gateway</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-2xl sm:px-10 border border-slate-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className={`mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center text-white shadow-lg mb-4`}>
              <Icon className="w-7 h-7" />
            </div>
            <span className={`inline-block text-[11px] font-semibold px-3 py-1 rounded-full border mb-2 ${theme.tag}`}>
              {badge}
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
            <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
          </div>

          {/* Demo Autofill Banner */}
          <div className="mb-6 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-slate-700 block">Quick Demo Access</span>
              <span className="text-slate-500 text-[11px]">{defaultEmail}</span>
            </div>
            <button
              type="button"
              onClick={fillDemo}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-medium text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition-all shadow-sm text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Autofill</span>
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
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
                  placeholder="name@indiaunifiederp.edu.in"
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
            <span className="text-[11px] text-slate-400 block mb-2">Switch to another portal</span>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {portal !== "director" && (
                <Link href="/director/login" className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">
                  Director
                </Link>
              )}
              {portal !== "admin" && (
                <Link href="/admin/login" className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">
                  Admin
                </Link>
              )}
              {portal !== "teacher" && (
                <Link href="/teacher/login" className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">
                  Teacher
                </Link>
              )}
              {portal !== "student" && (
                <Link href="/student/login" className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">
                  Student
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2">Reset Password</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your registered school email to receive an official password recovery link.
            </p>
            {resetSent ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Password reset link dispatched to your email!</span>
              </div>
            ) : (
              <input
                type="email"
                defaultValue={email || defaultEmail}
                placeholder="registered@indiaunifiederp.edu.in"
                className="w-full px-3 py-2 border rounded-xl text-xs mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <div className="flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setForgotOpen(false);
                  setResetSent(false);
                }}
                className="px-3 py-1.5 rounded-lg border text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              {!resetSent && (
                <button
                  type="button"
                  onClick={() => setResetSent(true)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
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
