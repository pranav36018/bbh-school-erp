"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { CreditCard, Plus, CheckCircle2, QrCode, Search, DollarSign, Printer } from "lucide-react";
import { DEMO_STUDENTS } from "@/lib/mock-data";

export default function AdminFeesPage() {
  const [studentsList, setStudentsList] = useState(DEMO_STUDENTS);
  const [activeReceipt, setActiveReceipt] = useState<any | null>(null);

  const handlePayFee = (id: string) => {
    setStudentsList(
      studentsList.map((s) =>
        s.id === id ? { ...s, feeStatus: "PAID", feeBalance: 0 } : s
      )
    );
    const stu = studentsList.find((s) => s.id === id);
    if (stu) {
      setActiveReceipt({
        receiptNo: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        studentName: stu.fullName,
        humanId: stu.humanId,
        className: `${stu.className} - ${stu.section}`,
        amount: stu.feeBalance || 42000,
        mode: "UPI (VPA: parent@okhdfcbank)",
        date: new Date().toLocaleDateString("en-IN"),
      });
    }
  };

  return (
    <PortalLayout
      portal="admin"
      userName="Dr. Sunitha Radhakrishnan"
      userRole="Principal & School Admin"
      userHumanId="ADM-INS000001-000001"
      institutionName="DPS Bengaluru North"
      academicYear="AY-2026-2027"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Fee Management & Payment Gateway</h1>
          <p className="text-xs text-slate-500 mt-1">Multi-head fee structures, automated UPI collection, and numbered receipts.</p>
        </div>
      </div>

      {/* Fee Slabs Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Class 10 Composite Fee (Annual)</span>
          <span className="text-2xl font-extrabold text-slate-900">₹1,25,000</span>
          <span className="text-[11px] text-slate-400 block mt-1">Tuition (₹90k), Labs (₹20k), Library/Sports (₹15k)</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Total Fee Collected (Term 1 & 2)</span>
          <span className="text-2xl font-extrabold text-emerald-600">₹9,84,50,000</span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">92.4% Target Achieved</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Integrated Payment Gateway</span>
          <span className="text-lg font-bold text-blue-700 block mt-1">UPI, RuPay, NetBanking</span>
          <span className="text-[11px] text-slate-400 block mt-1">VPA: dpsnorthbengaluru@icici</span>
        </div>
      </div>

      {/* Student Fee Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900">Class 10-A Student Fee Ledgers</span>
          <span className="text-xs text-slate-500">{studentsList.length} Accounts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase">
                <th className="p-4">Student</th>
                <th className="p-4">Class</th>
                <th className="p-4">Annual Fee</th>
                <th className="p-4">Outstanding Balance</th>
                <th className="p-4">Status</th>
                <th className="p-4">Collect Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {studentsList.map((stu) => (
                <tr key={stu.id} className="hover:bg-slate-50/70">
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{stu.fullName}</span>
                    <span className="font-mono text-[11px] text-blue-700">{stu.humanId}</span>
                  </td>
                  <td className="p-4 font-semibold">{stu.className} - {stu.section}</td>
                  <td className="p-4">₹1,25,000</td>
                  <td className="p-4 font-bold text-slate-900">₹{stu.feeBalance.toLocaleString("en-IN")}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      stu.feeStatus === "PAID"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : stu.feeStatus === "PARTIAL"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {stu.feeStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    {stu.feeStatus !== "PAID" ? (
                      <button
                        onClick={() => handlePayFee(stu.id)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-all"
                      >
                        Collect via UPI
                      </button>
                    ) : (
                      <span className="text-emerald-600 font-semibold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Settled in Full
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Receipt Modal */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="text-center border-b pb-3 mb-3">
              <span className="text-[10px] font-bold uppercase text-slate-400">DPS Bengaluru North</span>
              <h3 className="text-base font-extrabold text-slate-900">Official Fee Receipt</h3>
              <p className="text-xs font-mono text-blue-700 font-bold">{activeReceipt.receiptNo}</p>
            </div>

            <div className="space-y-2 text-xs text-slate-700 mb-4 bg-slate-50 p-3 rounded-xl border">
              <div className="flex justify-between">
                <span className="text-slate-400">Student:</span>
                <span className="font-bold text-slate-900">{activeReceipt.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Permanent ID:</span>
                <span className="font-mono">{activeReceipt.humanId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="font-bold text-emerald-700 text-sm">₹{activeReceipt.amount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Method:</span>
                <span>{activeReceipt.mode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date:</span>
                <span>{activeReceipt.date}</span>
              </div>
            </div>

            <div className="flex items-center justify-center p-2 bg-slate-50 border rounded-xl mb-4">
              <QrCode className="w-16 h-16 text-slate-800" />
            </div>

            <button
              onClick={() => setActiveReceipt(null)}
              className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
