"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { CheckSquare, CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";

export default function DirectorApprovalsPage() {
  const [approvals, setApprovals] = useState([
    {
      id: "app-1",
      title: "Physics & Robotics Lab Modernization (Equipment procurement)",
      school: "Sri Vivekananda Vidya Kendra (CBSE Campus)",
      amount: "₹4,50,000",
      type: "CAPEX",
      requestedBy: "Dr. Sunitha Radhakrishnan (Principal)",
      status: "PENDING",
    },
    {
      id: "app-2",
      title: "2 New School Bus Fleet Additions (GPS & Speed Governor Installed)",
      school: "Sri Vivekananda Vidya Kendra (State Board Campus)",
      amount: "₹38,00,000",
      type: "TRANSPORT",
      requestedBy: "Sri H. N. Ramaswamy (Principal)",
      status: "PENDING",
    },
    {
      id: "app-3",
      title: "Appointment: PGT Computer Science & Artificial Intelligence",
      school: "Sri Vivekananda Vidya Kendra (Dual Board Central)",
      amount: "₹65,000 / month",
      type: "HR_APPOINTMENT",
      requestedBy: "Board of Trustees (SVVK Trust)",
      status: "PENDING",
    },
  ]);

  const handleAction = (id: string, status: "APPROVED" | "REJECTED") => {
    setApprovals(approvals.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  return (
    <PortalLayout
      portal="director"
      userName="Dr. Rajesh Singhania"
      userRole="Managing Director & Trustee"
      userHumanId="DIR-INS000001-000001"
      institutionName="Swamy Vivekananda Vidya Kendra Trust"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Director Strategic Approval Center</h1>
        <p className="text-xs text-slate-500 mt-1">Review and action institutional budgets, staff recruitments, and capital grants.</p>
      </div>

      <div className="space-y-4">
        {approvals.map((app) => (
          <div key={app.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {app.type}
                </span>
                <span className="text-xs font-semibold text-blue-600">{app.school}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{app.title}</h3>
              <p className="text-xs text-slate-500 mt-1">
                Requested by: <strong className="text-slate-700">{app.requestedBy}</strong> • Financial Impact: <strong className="text-emerald-700">{app.amount}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              {app.status === "PENDING" ? (
                <>
                  <button
                    onClick={() => handleAction(app.id, "APPROVED")}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
                  >
                    Authorize & Approve
                  </button>
                  <button
                    onClick={() => handleAction(app.id, "REJECTED")}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all"
                  >
                    Decline
                  </button>
                </>
              ) : app.status === "APPROVED" ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Authorized
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200">
                  <XCircle className="w-4 h-4 text-red-600" /> Declined
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </PortalLayout>
  );
}
