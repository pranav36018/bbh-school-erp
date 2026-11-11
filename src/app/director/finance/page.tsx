"use client";

import React from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { DollarSign, TrendingUp, CreditCard, PieChart, CheckCircle2, ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function DirectorFinancePage() {
  return (
    <PortalLayout
      portal="director"
      userName="Dr. Rajesh Singhania"
      userRole="Managing Director & Trustee"
      userHumanId="DIR-INS000001-000001"
      institutionName="DPS Bengaluru & Group Schools"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Consolidated Financial Operations</h1>
        <p className="text-xs text-slate-500 mt-1">Multi-school fee collection velocity, recurring payroll, and capital expenditure monitoring.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Total Group Revenue (YTD)</span>
          <span className="text-2xl font-extrabold text-emerald-600">₹18,42,50,000</span>
          <span className="text-[11px] text-emerald-600 flex items-center mt-2">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +12.5% vs FY 2025-26
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Total Operational Expenses</span>
          <span className="text-2xl font-extrabold text-slate-900">₹11,60,20,000</span>
          <span className="text-[11px] text-slate-400 block mt-2">Payroll (68%), Labs (14%), Facilities (18%)</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Net Operating Surplus</span>
          <span className="text-2xl font-extrabold text-blue-600">₹6,82,30,000</span>
          <span className="text-[11px] text-blue-600 flex items-center mt-2">
            <CheckCircle2 className="w-3.5 h-3.5 mr-0.5" /> Reinvested in Campus Labs
          </span>
        </div>
      </div>
    </PortalLayout>
  );
}
