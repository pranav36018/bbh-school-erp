"use client";

import React from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import {
  Calendar,
  Clock,
  MapPin,
  Camera,
  Plus,
  Users,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  date: string;
  day: string;
  title: string;
  category: "EXAM" | "HOLIDAY" | "FACULTY_MEETING" | "PTM";
  time: string;
  venue: string;
  description: string;
}

export default function TeacherCalendarPage() {
  const events: CalendarEvent[] = [
    {
      id: "ev-001",
      date: "14 Nov 2026",
      day: "Saturday",
      title: "Children's Day Celebrations & Student Carnival",
      category: "FACULTY_MEETING",
      time: "08:30 AM - 01:30 PM",
      venue: "Main Campus Grounds",
      description: "Faculty supervision duty for Class 10 activity stalls and cultural games.",
    },
    {
      id: "ev-002",
      date: "18 Nov 2026",
      day: "Wednesday",
      title: "CBSE Mathematics Department Moderation Meeting",
      category: "FACULTY_MEETING",
      time: "03:30 PM - 04:30 PM",
      venue: "Conference Room 1",
      description: "Review of Class 10 Pre-Board Question Paper blueprint and marking scheme.",
    },
    {
      id: "ev-003",
      date: "28 Nov 2026",
      day: "Saturday",
      title: "Term 2 Parent-Teacher Meeting (PTM)",
      category: "PTM",
      time: "08:30 AM - 02:00 PM",
      venue: "Class 10-A Classroom (Room 101)",
      description: "Class 10-A parent consultations. 40 appointment slots scheduled.",
    },
  ];

  return (
    <PortalLayout
      portal="teacher"
      userName="Ms. Ananya Sharma"
      userRole="Senior Mathematics Faculty & Class 10-A In-Charge"
      userHumanId="TCH-INS000001-000001"
      institutionName="DPS Bengaluru North"
      academicYear="AY-2026-2027"
    >
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              Edubricz Faculty Almanac
            </span>
            <span className="text-xs text-slate-400 font-mono">Academic Year 2026-2027</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Academic Calendar & Faculty Schedule
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Departmental meetings, evaluation deadlines, PTM schedules, and institutional events.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center font-bold">
                  <span className="text-[10px] text-amber-400 uppercase leading-none">{ev.day.slice(0, 3)}</span>
                  <span className="text-base leading-tight">{ev.date.split(" ")[0]}</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{ev.title}</h3>
                  <p className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{ev.date}</span> • <span>{ev.time}</span>
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full font-bold text-[10px] bg-blue-50 text-blue-700 border border-blue-200">
                {ev.category}
              </span>
            </div>

            <p className="text-slate-700 font-medium leading-relaxed mb-3">{ev.description}</p>
            <div className="pt-2 border-t text-[11px] text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Venue: <strong>{ev.venue}</strong>
            </div>
          </div>
        ))}
      </div>
    </PortalLayout>
  );
}
