"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Clock, Plus, CheckCircle2, Calendar } from "lucide-react";

export default function TeacherLeavesPage() {
  const [leaves, setLeaves] = useState([
    { id: "lv-1", type: "CASUAL_LEAVE", dates: "18 Oct 2026 - 19 Oct 2026", days: 2, reason: "Family event", status: "APPROVED" },
    { id: "lv-2", type: "MEDICAL_LEAVE", dates: "02 Sep 2026", days: 1, reason: "Viral fever", status: "APPROVED" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    setLeaves([
      { id: `lv-${Date.now()}`, type: "CASUAL_LEAVE", dates: "24 Nov 2026", days: 1, reason: "Personal obligation", status: "PENDING" },
      ...leaves,
    ]);
    setApplied(true);
    setModalOpen(false);
    setTimeout(() => setApplied(false), 3000);
  };

  return (
    <PortalLayout
      portal="teacher"
      userName="Ms. Ananya Sharma"
      userRole="Senior Mathematics Faculty & Class 10-A In-Charge"
      userHumanId="TCH-INS000001-000001"
      institutionName="DPS Bengaluru North"
      academicYear="AY-2026-2027"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Leave Management & Substitution</h1>
          <p className="text-xs text-slate-500 mt-1">Submit formal leave applications and track institutional approvals.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for Leave</span>
        </button>
      </div>

      {applied && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Leave application submitted to Principal&apos;s Desk for substitution planning.</span>
        </div>
      )}

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Casual Leave (CL) Balance</span>
          <span className="text-2xl font-extrabold text-slate-900">8 / 12 Days</span>
          <span className="text-[11px] text-slate-400 block mt-1">4 Days Utilized</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Medical Leave (ML) Balance</span>
          <span className="text-2xl font-extrabold text-emerald-600">9 / 10 Days</span>
          <span className="text-[11px] text-slate-400 block mt-1">1 Day Utilized</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Earned Vacation Leave</span>
          <span className="text-2xl font-extrabold text-blue-600">30 Days</span>
          <span className="text-[11px] text-slate-400 block mt-1">Applicable during Term Vacations</span>
        </div>
      </div>

      {/* Past Leaves Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-xs font-bold text-slate-900">Leave History</h2>
        </div>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase">
              <th className="p-4">Type</th>
              <th className="p-4">Dates</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Approval Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {leaves.map((l) => (
              <tr key={l.id} className="hover:bg-slate-50/70">
                <td className="p-4 font-semibold text-slate-900">{l.type.replace(/_/g, " ")}</td>
                <td className="p-4 font-mono">{l.dates}</td>
                <td className="p-4">{l.days} Day{l.days > 1 ? "s" : ""}</td>
                <td className="p-4 text-slate-600">{l.reason}</td>
                <td className="p-4">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                    l.status === "APPROVED" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2">Apply for Faculty Leave</h3>
            <div className="space-y-3 text-xs">
              <select className="w-full px-3 py-2 border rounded-xl bg-white">
                <option>Casual Leave (CL)</option>
                <option>Medical Leave (ML)</option>
                <option>Earned Leave (EL)</option>
              </select>
              <input type="date" className="w-full px-3 py-2 border rounded-xl bg-white" />
              <textarea rows={3} placeholder="Reason for leave and substitution arrangements..." className="w-full px-3 py-2 border rounded-xl" />
            </div>
            <div className="flex justify-end gap-2 text-xs mt-6">
              <button onClick={() => setModalOpen(false)} className="px-3.5 py-2 rounded-xl border text-slate-600">Cancel</button>
              <button onClick={handleApply} className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold">Submit Leave Request</button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
