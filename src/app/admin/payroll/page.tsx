"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { DollarSign, Clock, CheckCircle2, XCircle, FileText, Search, Printer, Shield, UserCheck } from "lucide-react";
import { IMPORTED_STAFF } from "@/lib/imported-staff";

export default function AdminPayrollPage() {
  const [activeTab, setActiveTab] = useState<"LEAVES" | "PAYROLL">("LEAVES");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayslipStaff, setSelectedPayslipStaff] = useState<any | null>(null);

  const [leaveRequests, setLeaveRequests] = useState([
    { id: "LV-2026-081", staffName: "Geetha Rajesh K", role: "Assit Teacher", department: "Teaching Faculty", leaveType: "Casual Leave (CL)", fromDate: "14 Nov 2026", toDate: "15 Nov 2026", days: 2, reason: "Family Function", status: "PENDING" },
    { id: "LV-2026-082", staffName: "Shobha S B", role: "Assit Teacher", department: "Teaching Faculty", leaveType: "Medical Leave (ML)", fromDate: "10 Nov 2026", toDate: "12 Nov 2026", days: 3, reason: "Viral Fever with Doctor Cert", status: "APPROVED" },
    { id: "LV-2026-083", staffName: "N.Radhamani", role: "Clerk", department: "Administrative Staff", leaveType: "Earned Leave (EL)", fromDate: "18 Nov 2026", toDate: "20 Nov 2026", days: 3, reason: "Personal Work", status: "PENDING" },
    { id: "LV-2026-084", staffName: "Navaneetha", role: "Attender", department: "Support Staff", leaveType: "Casual Leave (CL)", fromDate: "08 Nov 2026", toDate: "08 Nov 2026", days: 1, reason: "Medical Appointment", status: "APPROVED" },
  ]);

  const handleApprove = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: "APPROVED" } : l))
    );
  };

  const handleReject = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: "REJECTED" } : l))
    );
  };

  const staffRoster = IMPORTED_STAFF.slice(0, 15);

  return (
    <PortalLayout
      portal="admin"
      userName="Dr. Sunitha Radhakrishnan"
      userRole="Principal & School Admin"
      userHumanId="ADM-INS000001-000001"
      institutionName="DPS Bengaluru North"
      academicYear="AY-2026-2027"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Staff Leaves & Payroll Console</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              148 Staff Enrolled
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Faculty leave sanctions, substitute allocations, monthly payroll calculation, and payslip generation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("LEAVES")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "LEAVES"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Leave Sanction Center ({leaveRequests.filter(l => l.status === "PENDING").length} Pending)
          </button>
          <button
            onClick={() => setActiveTab("PAYROLL")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "PAYROLL"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Monthly Payroll (Oct 2026)
          </button>
        </div>
      </div>

      {activeTab === "LEAVES" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leaveRequests.map((l) => (
              <div key={l.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {l.id}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    l.status === "APPROVED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                    l.status === "REJECTED" ? "bg-rose-50 text-rose-700 border-rose-200" :
                    "bg-amber-50 text-amber-700 border-amber-200"
                  }`}>
                    {l.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{l.staffName}</h3>
                  <p className="text-xs text-slate-500">{l.role} • {l.department}</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Leave Type:</span>
                    <strong className="text-slate-800">{l.leaveType}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration:</span>
                    <span className="font-mono">{l.fromDate} to {l.toDate} ({l.days} days)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Reason:</span>
                    <span className="italic text-slate-700">{l.reason}</span>
                  </div>
                </div>

                {l.status === "PENDING" && (
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleApprove(l.id)}
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Sanction Leave</span>
                    </button>
                    <button
                      onClick={() => handleReject(l.id)}
                      className="px-4 py-2 border border-rose-200 hover:bg-rose-50 text-rose-700 rounded-xl font-bold text-xs"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">October 2026 Salary Disbursal Register</h2>
              <p className="text-xs text-slate-500">148 Personnel • 100% Biometric Punch Reconciled</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
              Disbursal Complete
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="p-3.5">Staff Name & Role</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Basic Pay</th>
                  <th className="p-3.5">Allowances</th>
                  <th className="p-3.5">PF Deductions</th>
                  <th className="p-3.5">Net Disbursed</th>
                  <th className="p-3.5">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {staffRoster.map((s, idx) => {
                  const basic = s.department === "ACADEMICS" ? 38500 : s.department === "ADMINISTRATION" ? 32000 : 18500;
                  const allowances = s.department === "ACADEMICS" ? 12000 : 8500;
                  const pf = 3200;
                  const net = basic + allowances - pf;

                  return (
                    <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5">
                        <span className="font-bold text-slate-900 block">{s.name}</span>
                        <span className="text-[11px] text-slate-500">{s.rawRole} {s.qualification ? `(${s.qualification})` : ""}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 border">
                          {s.categoryLabel}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono">₹{basic.toLocaleString("en-IN")}</td>
                      <td className="p-3.5 font-mono text-emerald-600">+₹{allowances.toLocaleString("en-IN")}</td>
                      <td className="p-3.5 font-mono text-rose-600">-₹{pf.toLocaleString("en-IN")}</td>
                      <td className="p-3.5 font-mono font-bold text-slate-900">₹{net.toLocaleString("en-IN")}</td>
                      <td className="p-3.5">
                        <button
                          onClick={() => setSelectedPayslipStaff({ ...s, basic, allowances, pf, net })}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200"
                        >
                          View Payslip
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payslip Modal */}
      {selectedPayslipStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="text-center pb-3 border-b">
              <span className="text-[10px] uppercase font-bold text-blue-700">Delhi Public School Bengaluru North</span>
              <h3 className="text-base font-extrabold text-slate-900">Monthly Salary Statement</h3>
              <p className="text-xs text-slate-500">Month: October 2026</p>
            </div>

            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Employee Name:</span>
                <strong className="text-slate-900">{selectedPayslipStaff.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Designation:</span>
                <span>{selectedPayslipStaff.rawRole}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Department:</span>
                <span>{selectedPayslipStaff.categoryLabel}</span>
              </div>
            </div>

            <div className="border rounded-xl p-3 bg-slate-50 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span>Basic Salary:</span>
                <span>₹{selectedPayslipStaff.basic.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>HRA & Dearness Allowance:</span>
                <span>+₹{selectedPayslipStaff.allowances.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-rose-700">
                <span>Provident Fund (PF):</span>
                <span>-₹{selectedPayslipStaff.pf.toLocaleString("en-IN")}</span>
              </div>
              <div className="pt-2 border-t flex justify-between font-bold text-sm text-slate-900">
                <span>Net Pay Disbursed:</span>
                <span>₹{selectedPayslipStaff.net.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedPayslipStaff(null)}
              className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
            >
              Close Payslip
            </button>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
