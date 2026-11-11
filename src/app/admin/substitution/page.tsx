"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import {
  UserCheck,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Send,
  Users,
  Search,
  BookOpen,
  Sparkles,
} from "lucide-react";

interface VacancyPeriod {
  id: string;
  absentTeacher: string;
  leaveType: string;
  className: string;
  subject: string;
  periodNumber: number;
  timeSlot: string;
  roomNumber: string;
  assignedSubstitute?: string;
  substituteId?: string;
  status: "PENDING_ASSIGNMENT" | "ASSIGNED";
}

interface FreeTeacher {
  id: string;
  name: string;
  subjectSpecialization: string;
  currentWorkloadPeriods: number;
  freePeriod: boolean;
}

export default function AdminSubstitutionPage() {
  const [vacancies, setVacancies] = useState<VacancyPeriod[]>([
    {
      id: "vac-001",
      absentTeacher: "Mr. Vikram Rao",
      leaveType: "Medical Leave (Fever)",
      className: "Class 9-B",
      subject: "Science (Chemistry)",
      periodNumber: 2,
      timeSlot: "09:15 AM - 10:00 AM",
      roomNumber: "Room 204",
      status: "PENDING_ASSIGNMENT",
    },
    {
      id: "vac-002",
      absentTeacher: "Mr. Vikram Rao",
      leaveType: "Medical Leave (Fever)",
      className: "Class 10-C",
      subject: "Science (Chemistry Practical)",
      periodNumber: 4,
      timeSlot: "11:00 AM - 11:45 AM",
      roomNumber: "Chemistry Lab",
      status: "PENDING_ASSIGNMENT",
    },
    {
      id: "vac-003",
      absentTeacher: "Mrs. Meenakshi Sundaram",
      leaveType: "Casual Leave",
      className: "Class 8-A",
      subject: "Social Science",
      periodNumber: 5,
      timeSlot: "12:30 PM - 01:15 PM",
      roomNumber: "Room 108",
      assignedSubstitute: "Mr. Suresh Kulkarni",
      substituteId: "TCH-005",
      status: "ASSIGNED",
    },
  ]);

  const freeTeachersList: FreeTeacher[] = [
    {
      id: "tch-001",
      name: "Ms. Ananya Sharma",
      subjectSpecialization: "Mathematics & Physical Sciences",
      currentWorkloadPeriods: 3,
      freePeriod: true,
    },
    {
      id: "tch-003",
      name: "Mr. Rajesh Nair",
      subjectSpecialization: "Physics & Chemistry",
      currentWorkloadPeriods: 4,
      freePeriod: true,
    },
    {
      id: "tch-006",
      name: "Dr. Deepa Shenoy",
      subjectSpecialization: "Biology & General Science",
      currentWorkloadPeriods: 2,
      freePeriod: true,
    },
  ];

  const [selectedVacancy, setSelectedVacancy] = useState<VacancyPeriod | null>(null);
  const [assignedTeacher, setAssignedTeacher] = useState<string>("");
  const [notificationDispatched, setNotificationDispatched] = useState(false);

  const handleAssignSubstitute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVacancy || !assignedTeacher) return;

    setVacancies((prev) =>
      prev.map((v) =>
        v.id === selectedVacancy.id
          ? {
              ...v,
              assignedSubstitute: assignedTeacher,
              status: "ASSIGNED",
            }
          : v
      )
    );

    setNotificationDispatched(true);
    setTimeout(() => {
      setSelectedVacancy(null);
      setAssignedTeacher("");
      setNotificationDispatched(false);
    }, 2000);
  };

  const pendingCount = vacancies.filter((v) => v.status === "PENDING_ASSIGNMENT").length;

  return (
    <PortalLayout
      portal="admin"
      userName="Admin S. R. Venkatraman"
      userRole="Chief Administrative Officer"
      userHumanId="ADM-INS000001-000001"
      institutionName="DPS Bengaluru North"
      academicYear="AY-2026-2027"
    >
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              Edubricz Smart Substitution Engine
            </span>
            <span className="text-xs text-slate-400 font-mono">Wednesday, 11 Nov 2026</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Teacher Substitution & Period Coverage
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Detect absent faculty, view vacant classroom periods, match available subject teachers, and dispatch 1-click substitute orders.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs">
          <span className="font-semibold text-slate-600">Period Vacancy Status:</span>
          <span
            className={`px-2.5 py-0.5 rounded-full font-bold ${
              pendingCount > 0 ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {pendingCount > 0 ? `${pendingCount} Vacant Periods` : "100% Covered"}
          </span>
        </div>
      </div>

      {/* Grid: Vacancy Periods & Action Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vacant Periods List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-600" />
            <span>Today&apos;s Vacant Periods Requiring Substitution</span>
          </h2>

          <div className="space-y-3">
            {vacancies.map((vac) => {
              const isSelected = selectedVacancy?.id === vac.id;
              const isAssigned = vac.status === "ASSIGNED";

              return (
                <div
                  key={vac.id}
                  className={`bg-white rounded-2xl border p-5 shadow-sm transition-all ${
                    isSelected
                      ? "border-blue-500 ring-2 ring-blue-100"
                      : isAssigned
                      ? "border-emerald-200 bg-emerald-50/20"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                          isAssigned ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        P{vac.periodNumber}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm">
                            {vac.className} • {vac.subject}
                          </h3>
                          <span className="font-mono text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 font-bold rounded">
                            {vac.roomNumber}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Timing: <strong>{vac.timeSlot}</strong>
                        </p>
                      </div>
                    </div>

                    <div>
                      {isAssigned ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Substitute: {vac.assignedSubstitute}
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          Uncovered
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                    <span className="text-slate-600">
                      Regular Faculty: <strong>{vac.absentTeacher}</strong> ({vac.leaveType})
                    </span>

                    {!isAssigned && (
                      <button
                        onClick={() => setSelectedVacancy(vac)}
                        className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all text-xs flex items-center gap-1"
                      >
                        <span>Select Free Teacher</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Free Teachers & 1-Click Assignment Box */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Smart Substitute Recommendation</span>
            </h3>
            <p className="text-[11px] text-slate-500 mb-4">
              Faculty with zero class commitments during Period {selectedVacancy ? selectedVacancy.periodNumber : "2"}.
            </p>

            {selectedVacancy ? (
              <form onSubmit={handleAssignSubstitute} className="space-y-4 text-xs">
                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200">
                  <span className="font-bold text-blue-900 block">Assigning Coverage for:</span>
                  <p className="text-blue-800 mt-1">
                    <strong>{selectedVacancy.className}</strong> ({selectedVacancy.subject}) • Period {selectedVacancy.periodNumber} ({selectedVacancy.timeSlot})
                  </p>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-2">Available Free Teachers:</label>
                  <div className="space-y-2">
                    {freeTeachersList.map((teacher) => (
                      <label
                        key={teacher.id}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          assignedTeacher === teacher.name
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="substituteTeacher"
                            value={teacher.name}
                            checked={assignedTeacher === teacher.name}
                            onChange={(e) => setAssignedTeacher(e.target.value)}
                            className="text-blue-600"
                          />
                          <div>
                            <strong className="text-slate-900 block">{teacher.name}</strong>
                            <span className="text-[11px] text-slate-500">{teacher.subjectSpecialization}</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {teacher.currentWorkloadPeriods} P Today
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {notificationDispatched && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Substitution confirmed! SMS & Teacher App notification dispatched.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!assignedTeacher}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Confirm Substitution & Notify Teacher</span>
                </button>
              </form>
            ) : (
              <div className="p-6 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed">
                <UserCheck className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs font-semibold">Select a vacant period on the left to assign a substitute faculty.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
