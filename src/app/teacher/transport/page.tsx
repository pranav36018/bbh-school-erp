"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import PortalLayout from "@/components/layout/PortalLayout";
import {
  Bus,
  MapPin,
  Phone,
  ShieldCheck,
  Clock,
  Navigation,
  AlertTriangle,
  CheckCircle2,
  Radio,
  ArrowRight,
  UserCheck,
  Compass,
  Bell,
  RefreshCw,
  PhoneCall,
  Send,
  Users,
} from "lucide-react";

const LiveBusMap = dynamic(() => import("@/components/transport/LiveBusMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-slate-300 gap-3 border border-slate-800">
      <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-xs font-semibold">Initializing AIS-140 OpenStreetMap Transit Feed...</span>
    </div>
  ),
});

interface BusRouteFleet {
  routeId: string;
  busNumber: string;
  vehicleNumber: string;
  routeName: string;
  driverName: string;
  driverPhone: string;
  attendantName: string;
  attendantPhone: string;
  capacity: number;
  enrolledStudents: number;
  boardedCount: number;
  status: "ON_ROUTE" | "INSIDE_CAMPUS" | "DELAYED";
  etaMinutes: number;
  currentLocation: string;
  initialCoords: [number, number];
}

const FLEET_ROUTES: BusRouteFleet[] = [
  {
    routeId: "route-14",
    busNumber: "Bus #14",
    vehicleNumber: "KA-01-AB-1234",
    routeName: "Route 14 - Hebbal to Yelahanka Main Campus",
    driverName: "Somanna Gowda",
    driverPhone: "+91 98450 33441",
    attendantName: "Rukmini Bai",
    attendantPhone: "+91 98450 33449",
    capacity: 40,
    enrolledStudents: 36,
    boardedCount: 34,
    status: "ON_ROUTE",
    etaMinutes: 7,
    currentLocation: "Near Kogilu Junction Flyover (1.4 km from campus)",
    initialCoords: [13.0924, 77.5976],
  },
  {
    routeId: "route-21",
    busNumber: "Bus #21",
    vehicleNumber: "KA-01-CD-5678",
    routeName: "Route 21 - Manyata Tech Park to Yelahanka",
    driverName: "Manjunath K",
    driverPhone: "+91 98451 44552",
    attendantName: "Savitha Devi",
    attendantPhone: "+91 98451 44558",
    capacity: 40,
    enrolledStudents: 38,
    boardedCount: 38,
    status: "INSIDE_CAMPUS",
    etaMinutes: 2,
    currentLocation: "Entering DPS Gate 2 Terminal Bay",
    initialCoords: [13.1180, 77.6150],
  },
  {
    routeId: "route-08",
    busNumber: "Bus #08",
    vehicleNumber: "KA-01-EF-9012",
    routeName: "Route 08 - Jakkur Airfield to Yelahanka",
    driverName: "Ramesh Babu",
    driverPhone: "+91 98452 77883",
    attendantName: "Parvathi K",
    attendantPhone: "+91 98452 77889",
    capacity: 35,
    enrolledStudents: 28,
    boardedCount: 26,
    status: "ON_ROUTE",
    etaMinutes: 14,
    currentLocation: "Passing Vidyaranyapura Signal",
    initialCoords: [13.0805, 77.5862],
  },
];

export default function TeacherTransportPage() {
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const route = FLEET_ROUTES[selectedRouteIndex];

  // Student bus roster for Class 10-A
  const [studentsRoster, setStudentsRoster] = useState([
    { id: "stu-001", name: "Aarav Kashyap", roll: "10-A-01", stop: "Sahakarnagar Main Signal", boarded: true },
    { id: "stu-002", name: "Diya Menon", roll: "10-A-02", stop: "Hebbal Baptist Hospital", boarded: true },
    { id: "stu-003", name: "Ananya Iyer", roll: "10-A-04", stop: "Thanisandra Main Road", boarded: true },
    { id: "stu-004", name: "Karan Johar Patel", roll: "10-A-05", stop: "Kogilu Cross", boarded: false },
  ]);

  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);

  const toggleBoarding = (studentId: string) => {
    setStudentsRoster((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, boarded: !s.boarded } : s))
    );
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastMessage("");
      setBroadcastSent(false);
    }, 3000);
  };

  return (
    <PortalLayout
      portal="teacher"
      userName="Ms. Ananya Sharma"
      userRole="Senior Mathematics Faculty & Bus Duty In-Charge"
      userHumanId="TCH-INS000001-000001"
      institutionName="DPS Bengaluru North"
      academicYear="AY-2026-2027"
    >
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5">
              <Bus className="w-3.5 h-3.5 text-amber-600" />
              Faculty Transit & Bus Fleet Console
            </span>
            <span className="text-xs text-slate-400 font-mono">AIS-140 Fleet Tracking</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            School Bus Live Tracking & Duty Desk
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor real-time morning/evening bus arrivals, verify Class 10-A passenger manifests, and broadcast route alerts.
          </p>
        </div>

        {/* Route Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs">
          {FLEET_ROUTES.map((r, idx) => (
            <button
              key={r.routeId}
              onClick={() => setSelectedRouteIndex(idx)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedRouteIndex === idx
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {r.busNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Selected Vehicle</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900">{route.busNumber}</span>
            <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
              {route.vehicleNumber}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">{route.routeName}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Gate 2 Arrival ETA</span>
          <span className="text-xl font-extrabold text-blue-700">~{route.etaMinutes} Mins</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">
            {route.status === "INSIDE_CAMPUS" ? "✓ Inside Geofence" : "En Route (Normal Traffic)"}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Student Headcount</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-slate-900">{route.boardedCount}</span>
            <span className="text-xs text-slate-400">/ {route.enrolledStudents} Onboard</span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">Total Capacity: {route.capacity} Seats</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Crew Onboard</span>
          <div className="text-xs font-bold text-slate-900">
            {route.driverName} <span className="text-slate-400 font-normal">(Driver)</span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            Attendant: <strong>{route.attendantName}</strong>
          </span>
        </div>
      </div>

      {/* Interactive Leaflet OpenStreetMap */}
      <LiveBusMap
        busNumber={route.busNumber}
        vehicleNumber={route.vehicleNumber}
        driverName={route.driverName}
        driverPhone={route.driverPhone}
        pickupStopName="DPS Bengaluru North Gate 2"
        pickupStopCoords={[13.1205, 77.6180]}
        initialBusCoords={route.initialCoords}
        studentName="Class 10-A Bus Batch"
      />

      {/* Lower Section: Student Boarding Manifest & Route Broadcast */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Bus Manifest */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Class 10-A Student Bus Boarding Manifest</span>
              </h2>
              <p className="text-xs text-slate-500">
                Click toggle to confirm morning pickup attendance for {route.busNumber}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {studentsRoster.filter((s) => s.boarded).length} of {studentsRoster.length} Boarded
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {studentsRoster.map((student) => (
              <div key={student.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      student.boarded ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {student.roll.split("-")[2]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{student.name}</h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {student.stop}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      student.boarded
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                    }`}
                  >
                    {student.boarded ? "BOARDED" : "ABSENT / PRIVATE"}
                  </span>
                  <button
                    onClick={() => toggleBoarding(student.id)}
                    className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-semibold text-[11px] text-slate-700 transition-all"
                  >
                    {student.boarded ? "Mark Absent" : "Mark Boarded"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Route Broadcast & Driver Call */}
        <div className="space-y-4">
          {/* Driver Contact Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Direct Contact</span>
            <h3 className="font-bold text-slate-900 text-sm">{route.driverName}</h3>
            <p className="text-slate-500 text-xs mb-3">Vehicle: {route.vehicleNumber}</p>
            <a
              href={`tel:${route.driverPhone}`}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Driver ({route.driverPhone})</span>
            </a>
          </div>

          {/* Instant Parent Alert Dispatcher */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 mb-1">
              <Bell className="w-3.5 h-3.5 text-blue-600" />
              Broadcast Route Notice to Parents
            </h3>
            <p className="text-[11px] text-slate-500 mb-3">
              Sends automated WhatsApp & SMS alert to all parents registered for {route.busNumber}.
            </p>

            <form onSubmit={handleSendBroadcast} className="space-y-3">
              <textarea
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="e.g. Bus #14 is delayed by 10 mins due to traffic congestion on Kogilu flyover."
                rows={3}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
              />

              {broadcastSent && (
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Alert dispatched to 36 parent mobile numbers!
                </div>
              )}

              <button
                type="submit"
                disabled={!broadcastMessage.trim()}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch Route Broadcast</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
