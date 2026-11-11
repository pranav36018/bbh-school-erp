"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { CreditCard, CheckCircle2, QrCode, ArrowRight, Printer } from "lucide-react";

export default function StudentFeesPage() {
  const [showReceipt, setShowReceipt] = useState(false);

  return (
    <PortalLayout
      portal="student"
      userName="Aarav Kashyap"
      userRole="Student • Class 10-A"
      userHumanId="STU-INS000001-000001"
      institutionName="DPS Bengaluru North"
      academicYear="AY-2026-2027"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Fee Ledger & Payment Portal</h1>
        <p className="text-xs text-slate-500 mt-1">Direct online settlements via Indian Unified Payments Interface (UPI) and instant e-receipts.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Annual Composite Fee</span>
          <span className="text-2xl font-extrabold text-slate-900">₹1,25,000</span>
          <span className="text-[11px] text-slate-400 block mt-1">Tuition, Practical Labs & Sports</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Total Amount Paid</span>
          <span className="text-2xl font-extrabold text-emerald-600">₹1,25,000</span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">Paid in 2 Installments</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Outstanding Balance</span>
          <span className="text-2xl font-extrabold text-blue-600">₹0 Dues</span>
          <span className="text-[11px] text-slate-400 block mt-1">All Term Fees Cleared</span>
        </div>
      </div>

      {/* Receipts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xs font-bold text-slate-900">Payment Transactions & Receipts</h2>
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
              <td className="p-4 font-mono font-bold text-blue-700">REC-2026-0042</td>
              <td className="p-4 font-semibold text-slate-900">Term 1 Composite School Fee</td>
              <td className="p-4 font-bold text-slate-900">₹62,500</td>
              <td className="p-4">UPI (UTR: 61892019482)</td>
              <td className="p-4">12 Jun 2026</td>
              <td className="p-4">
                <button
                  onClick={() => setShowReceipt(true)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  View Receipt
                </button>
              </td>
            </tr>
            <tr className="hover:bg-slate-50/70">
              <td className="p-4 font-mono font-bold text-blue-700">REC-2026-0891</td>
              <td className="p-4 font-semibold text-slate-900">Term 2 Composite School Fee</td>
              <td className="p-4 font-bold text-slate-900">₹62,500</td>
              <td className="p-4">UPI (UTR: 62901849102)</td>
              <td className="p-4">05 Oct 2026</td>
              <td className="p-4">
                <button
                  onClick={() => setShowReceipt(true)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  View Receipt
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
              <span className="text-[10px] font-bold uppercase text-slate-400">DPS Bengaluru North</span>
              <h3 className="text-base font-extrabold text-slate-900">Fee Payment Receipt</h3>
              <p className="text-xs font-mono font-bold text-blue-700">REC-2026-0891</p>
            </div>
            <div className="space-y-2 text-xs text-slate-700 mb-4 bg-slate-50 p-3 rounded-xl border">
              <div className="flex justify-between">
                <span>Student:</span>
                <strong className="text-slate-900">Aarav Kashyap</strong>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <strong className="text-emerald-700 font-bold">₹62,500</strong>
              </div>
              <div className="flex justify-between">
                <span>Mode:</span>
                <span>UPI Payment</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>05 Oct 2026</span>
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <QrCode className="w-16 h-16 text-slate-800" />
            </div>
            <button onClick={() => setShowReceipt(false)} className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold">
              Done
            </button>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
