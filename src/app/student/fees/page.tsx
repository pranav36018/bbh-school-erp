"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { CreditCard, CheckCircle2, QrCode, ArrowRight, Printer, ShieldCheck } from "lucide-react";
import { useBoard } from "@/lib/board-context";

export default function StudentFeesPage() {
  const { board, getBoardName, getSchoolName } = useBoard();
  const [showReceipt, setShowReceipt] = useState(false);

  const isState = board === "state";
  const studentName = isState ? "Kiran Kumar S" : "Aarav Kashyap";
  const studentRole = isState ? "Student • Standard 8-EM (KSEAB)" : "Student • Class 10-A (CBSE)";
  const studentHumanId = isState ? "STU-SVVK-STA-000008" : "STU-SVVK-CBSE-000001";
  const institutionName = `${getSchoolName()} (${getBoardName()})`;

  const feeData = isState
    ? {
        annual: "₹42,000",
        breakdown: "Tuition, Computer Lab, Kannada Reader & Sports",
        paid: "₹42,000",
        installment1: "₹21,000",
        installment2: "₹21,000",
        term1Utr: "UPI (UTR: 61892019482)",
        term2Utr: "UPI (UTR: 62901849102)",
        date1: "12 Jun 2026",
        date2: "05 Oct 2026",
      }
    : {
        annual: "₹68,000",
        breakdown: "Tuition, STEM Labs, Smart Class & Sports",
        paid: "₹68,000",
        installment1: "₹34,000",
        installment2: "₹34,000",
        term1Utr: "UPI (UTR: 71892019482)",
        term2Utr: "UPI (UTR: 72901849102)",
        date1: "15 Jun 2026",
        date2: "08 Oct 2026",
      };

  return (
    <PortalLayout
      portal="student"
      userName={studentName}
      userRole={studentRole}
      userHumanId={studentHumanId}
      institutionName={institutionName}
      academicYear="AY-2026-2027"
    >
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
            isState ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-sky-100 text-sky-900 border border-sky-300"
          }`}>
            {getBoardName()}
          </span>
          <span className="text-xs text-slate-500 font-medium">Verified E-Receipts</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Fee Ledger & Payment Portal</h1>
        <p className="text-xs text-slate-500 mt-1">Direct online settlements via Indian Unified Payments Interface (UPI) with instant digital e-receipts and QR clearance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Annual Composite Fee</span>
          <span className="text-2xl font-extrabold text-slate-900">{feeData.annual}</span>
          <span className="text-[11px] text-slate-400 block mt-1">{feeData.breakdown}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Total Amount Paid</span>
          <span className="text-2xl font-extrabold text-emerald-600">{feeData.paid}</span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">Paid in 2 Term Installments</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Outstanding Balance</span>
          <span className="text-2xl font-extrabold text-blue-600">₹0 Dues</span>
          <span className="text-[11px] text-slate-400 block mt-1">All Term Fees Cleared (No Arrears)</span>
        </div>
      </div>

      {/* Receipts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Payment Transactions & Verified Receipts</h2>
          <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Cleared
          </span>
        </div>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase">
              <th className="p-4">Receipt Number</th>
              <th className="p-4">Description</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment Method</th>
              <th className="p-4">Date</th>
              <th className="p-4">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            <tr className="hover:bg-slate-50/70">
              <td className="p-4 font-mono font-bold text-blue-700">{isState ? "REC-STA-2026-0042" : "REC-CBSE-2026-0042"}</td>
              <td className="p-4 font-semibold text-slate-900">Term 1 School Fee ({getBoardName()})</td>
              <td className="p-4 font-bold text-slate-900">{feeData.installment1}</td>
              <td className="p-4">{feeData.term1Utr}</td>
              <td className="p-4">{feeData.date1}</td>
              <td className="p-4">
                <button
                  onClick={() => setShowReceipt(true)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold inline-flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" /> View Receipt
                </button>
              </td>
            </tr>
            <tr className="hover:bg-slate-50/70">
              <td className="p-4 font-mono font-bold text-blue-700">{isState ? "REC-STA-2026-0891" : "REC-CBSE-2026-0891"}</td>
              <td className="p-4 font-semibold text-slate-900">Term 2 School Fee ({getBoardName()})</td>
              <td className="p-4 font-bold text-slate-900">{feeData.installment2}</td>
              <td className="p-4">{feeData.term2Utr}</td>
              <td className="p-4">{feeData.date2}</td>
              <td className="p-4">
                <button
                  onClick={() => setShowReceipt(true)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold inline-flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" /> View Receipt
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {showReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="text-center border-b pb-3 mb-3">
              <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Swamy Vivekananda Vidya Kendra Trust</span>
              <h3 className="text-base font-extrabold text-slate-900">{getSchoolName()}</h3>
              <p className="text-[11px] text-slate-600 font-medium">{getBoardName()}</p>
              <p className="text-xs font-mono font-bold text-blue-700 mt-1">{isState ? "REC-STA-2026-0891" : "REC-CBSE-2026-0891"}</p>
            </div>
            <div className="space-y-2 text-xs text-slate-700 mb-4 bg-slate-50 p-3 rounded-xl border">
              <div className="flex justify-between">
                <span>Student:</span>
                <strong className="text-slate-900">{studentName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Class & Board:</span>
                <strong className="text-slate-900">{studentRole}</strong>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <strong className="text-emerald-700 font-bold">{feeData.installment2}</strong>
              </div>
              <div className="flex justify-between">
                <span>Mode:</span>
                <span>UPI Payment (Verified)</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{feeData.date2}</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center mb-4">
              <QrCode className="w-20 h-20 text-slate-800" />
              <span className="text-[10px] font-mono text-slate-400 mt-1">UPI E-SIGNATURE VERIFIED</span>
            </div>
            <button onClick={() => setShowReceipt(false)} className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors">
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
