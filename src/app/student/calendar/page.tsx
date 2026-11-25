"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Award,
  ChevronLeft,
  ChevronRight,
  Camera,
  CheckCircle2,
} from "lucide-react";
import { DEMO_STUDENTS } from "@/lib/mock-data";
import { useBoard } from "@/lib/board-context";

interface CalendarEvent {
  id: string;
  date: string;
  day: string;
  title: string;
  category: "EXAM" | "HOLIDAY" | "EVENT" | "PTM";
  time: string;
  venue: string;
  description: string;
}

export default function StudentCalendarPage() {
  const { board, getBoardName, getSchoolName } = useBoard();
  const isState = board === "state";
  const student = isState ? (DEMO_STUDENTS.find((s) => s.board === "state") || DEMO_STUDENTS[0]) : DEMO_STUDENTS[0];

  const events: CalendarEvent[] = [
    {
      id: "ev-001",
      date: "14 Nov 2026",
      day: "Saturday",
      title: "Children's Day Celebrations & Inter-House Carnival",
      category: "EVENT",
      time: "08:30 AM - 01:30 PM",
      venue: "Main Campus Grounds",
      description: "Cultural games, food stalls, science exhibits, and talent showcase organized by faculty.",
    },
    {
      id: "ev-002",
      date: "20 Nov 2026",
      day: "Friday",
      title: "Class 10 CBSE Pre-Board Practical Assessment Starts",
      category: "EXAM",
      time: "09:00 AM - 12:30 PM",
      venue: "Physics & Chemistry Labs",
      description: "CBSE mandatory internal practical evaluations and Viva-Voce.",
    },
    {
      id: "ev-003",
      date: "28 Nov 2026",
      day: "Saturday",
      title: "Term 2 Parent-Teacher Consultation (PTM)",
      category: "PTM",
      time: "08:30 AM - 02:00 PM",
      venue: "Class 10-A Classroom (Room 101)",
      description: "One-on-one review of student academic progress, attendance, and CBSE board readiness.",
    },
    {
      id: "ev-004",
      date: "25 Dec 2026",
      day: "Friday",
      title: "Christmas & Winter Vacation",
      category: "HOLIDAY",
      time: "All Day",
      venue: "School Closed",
      description: "Gazetted institution holiday for Christmas and commencement of winter break.",
    },
  ];

  const galleryShowcases = [
    { title: "Annual Science Exhibition 2026", photos: 24, tag: "Academics" },
    { title: "Karnataka Rajyotsava Celebrations", photos: 36, tag: "Cultural" },
    { title: "Inter-School Football Championship", photos: 18, tag: "Sports" },
    { title: "CBSE National Robotics Workshop", photos: 15, tag: "Innovation" },
  ];

  return (
    <PortalLayout
      portal="student"
      userName={student.fullName}
      userRole={`Student • ${student.className}-${student.section} (${getBoardName()})`}
      userHumanId={student.humanId}
      institutionName={`${getSchoolName()} (${getBoardName()})`}
      academicYear="AY-2026-2027"
    >
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              Edubricz Campus Almanac & Showcase
            </span>
            <span className="text-xs text-slate-400 font-mono">Academic Year 2026-2027</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Institutional Calendar & Event Showcase
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Official academic schedule, board examination timetables, holidays, sports days, and campus photo gallery.
          </p>
        </div>
      </div>

      {/* Events Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Events List */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Upcoming Academic Milestones & Events</span>
          </h2>

          <div className="space-y-3">
            {events.map((ev) => {
              const badgeColors = {
                EXAM: "bg-rose-50 text-rose-700 border-rose-200",
                HOLIDAY: "bg-emerald-50 text-emerald-700 border-emerald-200",
                EVENT: "bg-blue-50 text-blue-700 border-blue-200",
                PTM: "bg-purple-50 text-purple-700 border-purple-200",
              };

              return (
                <div key={ev.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-xs">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center font-bold">
                        <span className="text-[10px] text-amber-400 uppercase leading-none">{ev.day.slice(0, 3)}</span>
                        <span className="text-base leading-tight">{ev.date.split(" ")[0]}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm">{ev.title}</h3>
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] border ${badgeColors[ev.category]}`}>
                            {ev.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>{ev.date}</span> • <span>{ev.time}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-700 font-medium leading-relaxed mb-3">{ev.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      Venue: <strong>{ev.venue}</strong>
                    </span>
                    <button
                      onClick={() => alert(`Adding ${ev.title} to your personal Google / Outlook Calendar.`)}
                      className="text-blue-700 font-bold hover:underline"
                    >
                      + Add to Calendar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Campus Gallery Showcase */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-1">
              <Camera className="w-4 h-4 text-purple-600" />
              <span>Campus Moments Gallery</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">Official institutional photo and video albums.</p>

            <div className="space-y-3">
              {galleryShowcases.map((album, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between cursor-pointer transition-all text-xs"
                >
                  <div>
                    <h4 className="font-bold text-slate-900">{album.title}</h4>
                    <span className="text-[11px] text-slate-500">{album.photos} Photos • {album.tag}</span>
                  </div>
                  <span className="text-blue-600 font-bold text-xs">View →</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
