"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import {
  Building2,
  Users,
  GraduationCap,
  TrendingUp,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  School,
  Award,
  Layers,
  Filter,
  CheckSquare,
} from "lucide-react";
import { DEMO_INSTITUTIONS } from "@/lib/mock-data";

export default function DirectorDashboard() {
  const [selectedSchool, setSelectedSchool] = useState("ALL");
  const [selectedBoard, setSelectedBoard] = useState("ALL");

  const totalSchools = DEMO_INSTITUTIONS.length;
  const totalCampuses = DEMO_INSTITUTIONS.reduce((acc, inst) => acc + inst.campuses.length, 0);

  // Filtered schools
  const filteredSchools = DEMO_INSTITUTIONS.filter((s) => {
    if (selectedSchool !== "ALL" && s.id !== selectedSchool) return false;
    if (selectedBoard !== "ALL" && s.boardType !== selectedBoard) return false;
    return true;
  });

  return (
    <PortalLayout
      portal="director"
      userName="Dr. Rajesh Singhania"
      userRole="Managing Director & Trustee"
      userHumanId="DIR-SVVK-000001"
      institutionName="Swamy Vivekananda Vidya Kendra Trust"
      academicYear="AY-2026-2027"
    >
      {/* Top Banner & Filters */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
            Executive Governance Console
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Group Strategic Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Cross-campus analytics for {totalSchools} institutions and {totalCampuses} affiliated campuses across India.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="bg-transparent text-slate-700 font-medium focus:outline-none text-xs"
            >
              <option value="ALL">All Group Schools</option>
              {DEMO_INSTITUTIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="bg-transparent text-slate-700 font-medium focus:outline-none text-xs"
            >
              <option value="ALL">All Boards (CBSE & State)</option>
              <option value="CBSE">CBSE Schools</option>
              <option value="KARNATAKA_STATE_BOARD">Karnataka State Board</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Total Enrolled Students</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">4,850</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +14.2%
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">vs previous academic session</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Fee Collection Velocity</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">₹18.42 Cr</span>
            <span className="text-xs font-semibold text-emerald-600">89.4% Collected</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Outstanding: ₹2.18 Cr across campuses</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Faculty & Staff Strength</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">284</span>
            <span className="text-xs font-semibold text-blue-600">1:17 Ratio</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">240 Teaching, 44 Admin/Transport</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Group Attendance Rate</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">93.8%</span>
            <span className="text-xs font-semibold text-emerald-600">Optimal</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Faculty: 97.4% • Students: 93.8%</span>
        </div>
      </div>

      {/* Cross-Institution Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Institution & Campus Breakdown</h2>
            <p className="text-xs text-slate-500">Autonomous performance metrics by board and location</p>
          </div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {filteredSchools.length} Institutions Displayed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="p-4">School Details</th>
                <th className="p-4">Board & Affiliation</th>
                <th className="p-4">Campuses</th>
                <th className="p-4">Medium</th>
                <th className="p-4">Student Count</th>
                <th className="p-4">Fee Collection</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredSchools.map((school, i) => (
                <tr key={school.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{school.name}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{school.code}</span>
                  </td>
                  <td className="p-4">
                    <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[11px] border border-blue-200">
                      {school.boardType.replace(/_/g, " ")}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1">{school.affiliationNumber}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-slate-900">{school.campuses.length} Campuses</span>
                    <span className="text-[11px] text-slate-500 block truncate max-w-xs">
                      {school.campuses.map((c) => c.name).join(", ")}
                    </span>
                  </td>
                  <td className="p-4">{school.medium}</td>
                  <td className="p-4 font-bold text-slate-900">
                    {i === 0 ? "2,450" : i === 1 ? "1,520" : "880"}
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-emerald-600 block">
                      {i === 0 ? "₹9.8 Cr (92%)" : i === 1 ? "₹5.4 Cr (88%)" : "₹3.2 Cr (85%)"}
                    </span>
                    <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: i === 0 ? "92%" : i === 1 ? "88%" : "85%" }}
                      ></div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium text-[11px] border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Strategic Panels: Pending Approvals & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Strategic Approval Center</h3>
              <p className="text-xs text-slate-500">Expenditure and administrative authorizations</p>
            </div>
            <span className="px-2.5 py-1 bg-amber-50 text-amber-700 font-bold text-xs rounded-full border border-amber-200">
              3 Pending
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">Physics & Robotics Lab Modernization</span>
                <span className="text-[11px] text-slate-500">Sri Vivekananda Vidya Kendra (CBSE) • ₹4,50,000</span>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700">
                  Approve
                </button>
                <button className="px-3 py-1.5 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300">
                  Review
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">2 New School Bus Fleet Additions (GPS Enabled)</span>
                <span className="text-[11px] text-slate-500">NPS Mysuru Campus • ₹38,00,000</span>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700">
                  Approve
                </button>
                <button className="px-3 py-1.5 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300">
                  Review
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">Appointment: PGT Computer Science & AI</span>
                <span className="text-[11px] text-slate-500">Sahyadri Vidya Kendra • Monthly CTC ₹65,000</span>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700">
                  Approve
                </button>
                <button className="px-3 py-1.5 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300">
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Board Compliance & Inspection Status */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Board Regulatory Compliance</h3>
              <p className="text-xs text-slate-500">CBSE Affiliation Bye-Laws & State Board Recognition</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200">
              100% Compliant
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-800">CBSE Mandatory Public Disclosure (SARAS 5.0)</span>
                <span className="text-emerald-600 font-semibold">Verified</span>
              </div>
              <p className="text-[11px] text-slate-500">Fire safety, building safety, and water testing certificates up to date for 2026-27.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-800">Karnataka State KSEAB Recognition Renewal</span>
                <span className="text-emerald-600 font-semibold">Valid till 2029</span>
              </div>
              <p className="text-[11px] text-slate-500">Department of School Education and Literacy renewal order active.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-800">DPDP Act 2023 Child Data Safeguard Audit</span>
                <span className="text-blue-600 font-semibold">Passed</span>
              </div>
              <p className="text-[11px] text-slate-500">Parental consent management, biometric masking, and zero third-party telemetry verified.</p>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
