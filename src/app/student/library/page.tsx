"use client";

import React from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { BookOpen, CheckCircle2, Clock } from "lucide-react";

export default function StudentLibraryPage() {
  const books = [
    { title: "Concepts of Physics (Vol 1)", author: "Dr. H.C. Verma", issuedOn: "28 Oct 2026", dueDate: "18 Nov 2026", status: "BORROWED" },
    { title: "Mathematics for Class 10 (R.D. Sharma)", author: "R.D. Sharma", issuedOn: "10 Oct 2026", dueDate: "25 Oct 2026", status: "RETURNED" },
  ];

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
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Library Books & Issue History</h1>
        <p className="text-xs text-slate-500 mt-1">Track borrowed textbooks, reference manuals, and return due dates.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase">
              <th className="p-4">Book Title & Author</th>
              <th className="p-4">Issued On</th>
              <th className="p-4">Due Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {books.map((b) => (
              <tr key={b.title} className="hover:bg-slate-50/70">
                <td className="p-4">
                  <span className="font-bold text-slate-900 block">{b.title}</span>
                  <span className="text-[11px] text-slate-400">By {b.author}</span>
                </td>
                <td className="p-4 font-mono">{b.issuedOn}</td>
                <td className="p-4 font-mono font-bold text-slate-900">{b.dueDate}</td>
                <td className="p-4">
                  <span className={`inline-block px-2.5 py-1 rounded-full font-bold text-[11px] ${
                    b.status === "BORROWED" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}>
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PortalLayout>
  );
}
