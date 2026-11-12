"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { BookOpen, Search, Plus, CheckCircle2, AlertCircle, Clock, BookMarked, Filter } from "lucide-react";
import { DEMO_STUDENTS } from "@/lib/mock-data";

export default function AdminLibraryPage() {
  const [activeTab, setActiveTab] = useState<"ISSUES" | "CATALOG">("ISSUES");
  const [searchTerm, setSearchTerm] = useState("");

  const [activeCirculation, setActiveCirculation] = useState([
    { id: "cir-01", bookTitle: "Concepts of Physics (Vol 1)", author: "Dr. H.C. Verma", studentName: DEMO_STUDENTS[0]?.fullName || "Aarav Kashyap", admissionNo: DEMO_STUDENTS[0]?.admissionNo || "ADM-001", className: "Class 10-A", issuedDate: "28 Oct 2026", dueDate: "18 Nov 2026", status: "ISSUED" },
    { id: "cir-02", bookTitle: "Mathematics for Class 10 (R.D. Sharma)", author: "R.D. Sharma", studentName: DEMO_STUDENTS[1]?.fullName || "Diya Menon", admissionNo: DEMO_STUDENTS[1]?.admissionNo || "ADM-002", className: "Class 10-A", issuedDate: "15 Oct 2026", dueDate: "30 Oct 2026", status: "OVERDUE" },
    { id: "cir-03", bookTitle: "NCERT Science Exemplar Class 9", author: "NCERT Editorial", studentName: DEMO_STUDENTS[2]?.fullName || "Rohan Gupta", admissionNo: DEMO_STUDENTS[2]?.admissionNo || "ADM-003", className: "Class 9-EM", issuedDate: "05 Nov 2026", dueDate: "20 Nov 2026", status: "ISSUED" },
    { id: "cir-04", bookTitle: "Kannada Sahitya Sangraha", author: "Kuvempu Bhasha Bharati", studentName: DEMO_STUDENTS[3]?.fullName || "Ananya Iyer", admissionNo: DEMO_STUDENTS[3]?.admissionNo || "ADM-004", className: "Class 8-KM", issuedDate: "02 Nov 2026", dueDate: "17 Nov 2026", status: "ISSUED" },
    { id: "cir-05", bookTitle: "India After Gandhi", author: "Ramachandra Guha", studentName: DEMO_STUDENTS[4]?.fullName || "Vihaan Reddy", admissionNo: DEMO_STUDENTS[4]?.admissionNo || "ADM-005", className: "Class 10-EM", issuedDate: "12 Oct 2026", dueDate: "26 Oct 2026", status: "RETURNED" },
  ]);

  const [catalog] = useState([
    { isbn: "978-81-7709-187-8", title: "Concepts of Physics (Vol 1)", author: "Dr. H.C. Verma", category: "Science / Physics", copies: 25, available: 18 },
    { isbn: "978-81-7709-188-5", title: "Concepts of Physics (Vol 2)", author: "Dr. H.C. Verma", category: "Science / Physics", copies: 20, available: 14 },
    { isbn: "978-93-5253-156-4", title: "Mathematics for Class 10", author: "R.D. Sharma", category: "Mathematics", copies: 30, available: 12 },
    { isbn: "978-81-7450-492-0", title: "Social Science Contemporary India", author: "NCERT", category: "Social Sciences", copies: 40, available: 32 },
    { isbn: "978-81-260-1234-5", title: "Kannada Sahitya Sangraha", author: "Kuvempu Trust", category: "Regional Languages", copies: 35, available: 28 },
    { isbn: "978-0-143-03103-1", title: "India After Gandhi", author: "Ramachandra Guha", category: "General Reference", copies: 15, available: 9 },
  ]);

  const filteredIssues = activeCirculation.filter(
    (c) =>
      c.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.admissionNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Central Campus Library</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
              Circulation Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Book cataloging, student checkout circulation, barcode/RFID tracking, and overdue fine management.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("ISSUES")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "ISSUES"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Circulation & Issues ({activeCirculation.length})
          </button>
          <button
            onClick={() => setActiveTab("CATALOG")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "CATALOG"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Book Catalog (165 Copies)
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Total Titles</span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block">1,450 Titles</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Currently Issued</span>
          <span className="text-2xl font-extrabold text-blue-600 mt-1 block">48 Books</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Overdue Returns</span>
          <span className="text-2xl font-extrabold text-rose-600 mt-1 block">1 Alert</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Return Rate</span>
          <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">97.8%</span>
        </div>
      </div>

      {activeTab === "ISSUES" ? (
        <div className="space-y-4">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student name, admission number, or book title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs bg-transparent focus:outline-none text-slate-800"
            />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="p-3.5">Book Title & Author</th>
                  <th className="p-3.5">Borrowing Student</th>
                  <th className="p-3.5">Admission No.</th>
                  <th className="p-3.5">Issue Date</th>
                  <th className="p-3.5">Due Date</th>
                  <th className="p-3.5">Circulation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredIssues.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5">
                      <span className="font-bold text-slate-900 block">{c.bookTitle}</span>
                      <span className="text-[11px] text-slate-400">By {c.author}</span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-800">
                      {c.studentName}
                      <span className="text-[11px] text-slate-400 block font-normal">{c.className}</span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-blue-700">{c.admissionNo}</td>
                    <td className="p-3.5 font-mono text-slate-600">{c.issuedDate}</td>
                    <td className="p-3.5 font-mono font-bold text-slate-900">{c.dueDate}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        c.status === "ISSUED" ? "bg-blue-50 text-blue-700 border-blue-200" :
                        c.status === "RETURNED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        "bg-rose-50 text-rose-700 border-rose-200"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="p-3.5">ISBN Reference</th>
                <th className="p-3.5">Book Title</th>
                <th className="p-3.5">Author</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Total Copies</th>
                <th className="p-3.5">Available on Shelf</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {catalog.map((b) => (
                <tr key={b.isbn} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-mono text-slate-500">{b.isbn}</td>
                  <td className="p-3.5 font-bold text-slate-900">{b.title}</td>
                  <td className="p-3.5 text-slate-700">{b.author}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                      {b.category}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-slate-800">{b.copies}</td>
                  <td className="p-3.5 font-bold text-emerald-600">{b.available} In Stock</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PortalLayout>
  );
}
