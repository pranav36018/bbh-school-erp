"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Briefcase, Plus, CheckCircle2, Phone, Mail, Award, Clock, Search, Filter, GraduationCap, Building2, ChevronLeft, ChevronRight, Users, Shield } from "lucide-react";
import { IMPORTED_STAFF } from "@/lib/imported-staff";
import { DEMO_USERS } from "@/lib/mock-data";

export default function AdminTeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 18;
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");

  // Merge base demo teachers with imported staff
  const allStaffMembers = [
    // Include the 148 imported staff from Staff_List.xlsx
    ...IMPORTED_STAFF.map((s) => ({
      id: s.id,
      humanId: s.humanId,
      fullName: s.name,
      role: s.rawRole,
      department: s.department,
      categoryLabel: s.categoryLabel,
      designation: s.designation,
      qualification: s.qualification,
      dob: s.dob,
      phone: s.phone,
      email: s.email,
      address: s.address,
      status: "Active Staff",
    })),
  ];

  // Filter staff by search and department
  const filtered = allStaffMembers.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.humanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.qualification.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === "ALL" || s.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Department counts
  const teachingCount = allStaffMembers.filter((s) => s.department === "ACADEMICS").length;
  const adminCount = allStaffMembers.filter((s) => s.department === "ADMINISTRATION").length;
  const supportCount = allStaffMembers.filter((s) => s.department === "SUPPORT").length;
  const transportCount = allStaffMembers.filter((s) => s.department === "LOGISTICS").length;

  return (
    <PortalLayout
      portal="admin"
      userName="Dr. Sunitha Radhakrishnan"
      userRole="Principal & School Admin"
      userHumanId="ADM-INS000001-000001"
      institutionName="DPS Bengaluru North"
      academicYear="AY-2026-2027"
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Faculty & Staff HR Engine</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
              {allStaffMembers.length} Staff Loaded
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complete personnel directory imported from Staff_List.xlsx with qualifications, designations, and biometric IDs.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => { setSelectedDept("ALL"); setCurrentPage(1); }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedDept === "ALL"
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
          }`}
        >
          <span className={`text-[11px] font-bold uppercase tracking-wider block ${selectedDept === "ALL" ? "text-blue-100" : "text-slate-400"}`}>
            All Personnel
          </span>
          <span className="text-2xl font-extrabold mt-1 block">{allStaffMembers.length}</span>
        </button>

        <button
          onClick={() => { setSelectedDept("ACADEMICS"); setCurrentPage(1); }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedDept === "ACADEMICS"
              ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
          }`}
        >
          <span className={`text-[11px] font-bold uppercase tracking-wider block ${selectedDept === "ACADEMICS" ? "text-emerald-100" : "text-slate-400"}`}>
            Teaching Faculty
          </span>
          <span className="text-2xl font-extrabold mt-1 block">{teachingCount}</span>
        </button>

        <button
          onClick={() => { setSelectedDept("ADMINISTRATION"); setCurrentPage(1); }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedDept === "ADMINISTRATION"
              ? "bg-purple-600 text-white border-purple-600 shadow-md"
              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
          }`}
        >
          <span className={`text-[11px] font-bold uppercase tracking-wider block ${selectedDept === "ADMINISTRATION" ? "text-purple-100" : "text-slate-400"}`}>
            Admin & Clerks
          </span>
          <span className="text-2xl font-extrabold mt-1 block">{adminCount}</span>
        </button>

        <button
          onClick={() => { setSelectedDept("SUPPORT"); setCurrentPage(1); }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedDept === "SUPPORT"
              ? "bg-amber-600 text-white border-amber-600 shadow-md"
              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
          }`}
        >
          <span className={`text-[11px] font-bold uppercase tracking-wider block ${selectedDept === "SUPPORT" ? "text-amber-100" : "text-slate-400"}`}>
            Support, Aayas & Drivers
          </span>
          <span className="text-2xl font-extrabold mt-1 block">{supportCount + transportCount}</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Search by name, role (e.g. Assit Teacher, Clerk, Aaya, H M), qualification (PUC, B.Ed), ID, or phone..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full text-xs bg-transparent focus:outline-none text-slate-800"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="text-xs text-slate-400 hover:text-slate-600 px-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginated.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {t.humanId}
                </span>
                <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                  t.department === "ACADEMICS"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : t.department === "ADMINISTRATION"
                    ? "bg-purple-50 text-purple-700 border-purple-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}>
                  {t.categoryLabel}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{t.fullName}</h3>
              <div className="flex items-center gap-2 mt-0.5 mb-2.5">
                <span className="text-xs font-semibold text-slate-700">{t.role}</span>
                {t.qualification && (
                  <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                    {t.qualification}
                  </span>
                )}
              </div>

              <div className="space-y-1 text-xs text-slate-600 border-t pt-2.5">
                {t.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{t.phone}</span>
                  </div>
                )}
                {t.dob && (
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="text-slate-400">DOB:</span>
                    <span>{t.dob}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{t.email}</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Attendance & Payroll:</span>
              <span className="font-semibold text-emerald-600 text-[11px]">Active • Disbursed</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-xs">
          <span className="text-slate-500">
            Showing <strong className="text-slate-900">{(currentPage - 1) * pageSize + 1}</strong> to{" "}
            <strong className="text-slate-900">{Math.min(currentPage * pageSize, filtered.length)}</strong> of{" "}
            <strong className="text-slate-900">{filtered.length}</strong> staff
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-slate-300 font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <span className="font-bold px-2">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-slate-300 font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2">Register New Staff Member</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter staff credentials to generate an atomic TCH-INS000001-... or ADM-INS000001-... ID code.
            </p>
            <div className="space-y-3 text-xs">
              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
              <input type="text" placeholder="Role / Designation" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
              <input type="email" placeholder="Official Email Address" className="w-full px-3 py-2 border rounded-xl" />
              <input type="text" placeholder="Contact Mobile (+91 ...)" className="w-full px-3 py-2 border rounded-xl" />
            </div>
            <div className="flex justify-end gap-2 text-xs mt-6">
              <button onClick={() => setModalOpen(false)} className="px-3.5 py-2 rounded-xl border text-slate-600">Cancel</button>
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold">Generate ID & Save</button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
