"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PortalLayout from "@/components/layout/PortalLayout";

const LiveBusMap = dynamic(() => import("@/components/transport/LiveBusMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-slate-300 gap-3 border border-slate-800">
      <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-xs font-semibold">Initializing AIS-140 OpenStreetMap Feed...</span>
    </div>
  ),
});
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
  Gauge,
  PhoneCall,
} from "lucide-react";
import { DEMO_STUDENTS } from "@/lib/mock-data";
import { useBoard } from "@/lib/board-context";

export default function StudentTransportPage() {
  const { board, getBoardName, getSchoolName } = useBoard();
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(0);
  const student = DEMO_STUDENTS[selectedStudentIndex];
  const transport = student.transport;

  // Live telemetry state simulation
  const [liveLocation, setLiveLocation] = useState({
    latitude: transport?.latitude || 13.0924,
    longitude: transport?.longitude || 77.5976,
    speed: transport?.speedKmh || 36,
    eta: transport?.etaMinutes || 7,
    locationName: transport?.currentLocationName || "Near Kogilu Junction Flyover (1.4 km away)",
    lastPing: "Just now",
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notifyParent, setNotifyParent] = useState(true);
  const [skipPickupSent, setSkipPickupSent] = useState(false);

  // Simulated live telemetry updates
  const refreshLocation = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLiveLocation((prev) => ({
        ...prev,
        speed: Math.floor(32 + Math.random() * 8),
        eta: Math.max(1, prev.eta - 1),
        lastPing: "Just now (Synced with AIS-140 GPS)",
      }));
      setIsRefreshing(false);
    }, 600);
  };

  const routeStops = [
    {
      stopNumber: 1,
      name: "Hebbal Baptist Hospital Stop",
      scheduledTime: "07:30 AM",
      status: "DEPARTED",
      isStudentStop: false,
    },
    {
      stopNumber: 2,
      name: "Sahakarnagar Main Signal",
      scheduledTime: "07:45 AM",
      status: "NEXT_STOP",
      isStudentStop: true, // Aarav's stop
    },
    {
      stopNumber: 3,
      name: "Judicial Layout 2nd Block",
      scheduledTime: "08:00 AM",
      status: "UPCOMING",
      isStudentStop: false,
    },
    {
      stopNumber: 4,
      name: "Kogilu Cross Junction",
      scheduledTime: "08:15 AM",
      status: "UPCOMING",
      isStudentStop: false,
    },
    {
      stopNumber: 5,
      name: "Sri Vivekananda Vidya Kendra Hoskote Campus Gate 1",
      scheduledTime: "08:25 AM",
      status: "DESTINATION",
      isStudentStop: false,
    },
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
      {/* Header & Student Persona Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5">
              <Bus className="w-3.5 h-3.5 text-amber-600" />
              AIS-140 Certified GPS Telemetry
            </span>
            <span className="text-xs text-slate-400 font-mono">KA RTO Approved</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            School Bus Live Tracking
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time GPS vehicle tracking, route stops, speed monitoring, and driver communications.
          </p>
        </div>

        {/* Demo Switcher: Opted vs Not Opted */}
        <div className="flex items-center gap-2 text-xs bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium pl-1">Student:</span>
          <select
            value={selectedStudentIndex}
            onChange={(e) => setSelectedStudentIndex(Number(e.target.value))}
            className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 font-bold text-slate-800 focus:outline-none"
          >
            <option value={0}>Aarav Kashyap (Bus #14 Opted)</option>
            <option value={1}>Diya Menon (Bus #14 Opted)</option>
            <option value={2}>Rohan Gupta (Not Opted)</option>
            <option value={3}>Ananya Iyer (Bus #21 Opted)</option>
            <option value={4}>Karan Patel (Not Opted)</option>
          </select>
        </div>
      </div>

      {transport?.opted ? (
        <div className="space-y-6">
          {/* Live GPS Telemetry Dashboard */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Top Bar */}
            <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-base">
                  <Bus className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base tracking-tight">{transport.busNumber}</span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/10 text-amber-300 font-bold border border-white/10">
                      {transport.vehicleNumber}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 block">{transport.routeName}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    LIVE TRANSMITTING
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{liveLocation.lastPing}</span>
                </div>
                <button
                  onClick={refreshLocation}
                  disabled={isRefreshing}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all text-xs font-semibold flex items-center gap-1.5"
                  title="Refresh GPS Coordinates"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  <span className="hidden md:inline">Refresh</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-100 border-b text-xs">
              <div className="p-4">
                <span className="text-slate-400 block mb-1">Estimated Arrival</span>
                <span className="text-2xl font-extrabold text-amber-600 block">{liveLocation.eta} Mins</span>
                <span className="text-[10px] text-slate-500">To: {transport.pickupStop}</span>
              </div>
              <div className="p-4">
                <span className="text-slate-400 block mb-1">Current Speed</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-slate-900">{liveLocation.speed}</span>
                  <span className="text-xs font-semibold text-slate-500">km/h</span>
                </div>
                <span className="text-[10px] text-emerald-600 font-medium">Safe Limit: 40 km/h</span>
              </div>
              <div className="p-4">
                <span className="text-slate-400 block mb-1">Your Pickup Window</span>
                <span className="text-2xl font-extrabold text-blue-700 block">{transport.pickupTime}</span>
                <span className="text-[10px] text-slate-500">Evening Drop: {transport.dropTime}</span>
              </div>
              <div className="p-4">
                <span className="text-slate-400 block mb-1">Safety & Governance</span>
                <span className="text-xs font-bold text-emerald-700 block mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> AIS-140 OK
                </span>
                <span className="text-[10px] text-slate-500">CCTV & Panic Button Online</span>
              </div>
            </div>

            {/* Interactive Leaflet OpenStreetMap Live Tracking */}
            <div className="p-4 sm:p-6 bg-slate-50/50 border-b">
              <div className="mb-4">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-blue-600" />
                  <span>Real-Time GIS Satellite Road Tracking</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Interactive OpenStreetMap with live bus telemetry, Bellary Road NH-44 waypoints, and 600m geofence detection.
                </p>
              </div>

              <LiveBusMap
                busNumber={transport.busNumber || "Bus #14"}
                vehicleNumber={transport.vehicleNumber || "KA-01-AB-1234"}
                driverName={transport.driverName || "Somanna Gowda"}
                driverPhone={transport.driverPhone || "+91 98450 33441"}
                pickupStopName={transport.pickupStop || "Sahakarnagar Main Signal"}
                pickupStopCoords={[13.0632, 77.5898]}
                initialBusCoords={[liveLocation.latitude, liveLocation.longitude]}
                studentName={student.fullName}
              />
            </div>

            {/* Scheduled Route Stops Timeline */}
            <div className="p-4 sm:p-6 bg-white border-b">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-600" />
                    <span>Scheduled Route Stops Timeline</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">Sequential checkpoints along Route 14 corridor</p>
                </div>
                <span className="text-xs font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border">
                  Total 5 Designated Stops
                </span>
              </div>

              <div className="relative bg-slate-50/70 rounded-2xl border p-6">
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-2">
                  <div className="absolute top-1/2 left-4 right-4 h-1.5 bg-slate-200 -translate-y-1/2 hidden md:block"></div>

                  {routeStops.map((stop) => {
                    const isNext = stop.status === "NEXT_STOP";
                    const isPast = stop.status === "DEPARTED";

                    return (
                      <div key={stop.stopNumber} className="relative z-10 flex flex-col items-center text-center max-w-[140px]">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-md ${
                            stop.isStudentStop
                              ? "bg-amber-500 text-slate-950 ring-4 ring-amber-200"
                              : isPast
                              ? "bg-emerald-600 text-white"
                              : isNext
                              ? "bg-blue-600 text-white ring-4 ring-blue-100"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {isPast ? <CheckCircle2 className="w-4 h-4" /> : stop.stopNumber}
                        </div>

                        <span className="font-bold text-xs text-slate-900 mt-2 line-clamp-2">
                          {stop.name}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">{stop.scheduledTime}</span>

                        {stop.isStudentStop && (
                          <span className="mt-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[9px] font-extrabold uppercase tracking-wider border border-amber-300">
                            Your Pickup Stop
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Crew Contacts & Emergency Quick Actions */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Driver Details */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Designated Driver</span>
                <h4 className="font-bold text-slate-900 text-sm">{transport.driverName}</h4>
                <p className="text-slate-500 text-[11px] mt-0.5 mb-3">Commercial Badge #DL-KA01-2018</p>
                <a
                  href={`tel:${transport.driverPhone}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Driver ({transport.driverPhone})</span>
                </a>
              </div>

              {/* Attendant Details */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Bus Care Attendant</span>
                <h4 className="font-bold text-slate-900 text-sm">{transport.attendantName}</h4>
                <p className="text-slate-500 text-[11px] mt-0.5 mb-3">Student Safety & Boarding Assistant</p>
                <a
                  href={`tel:${transport.attendantPhone}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Attendant ({transport.attendantPhone})</span>
                </a>
              </div>

              {/* Transport Control Room & Quick Skip */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Transport Desk Helpline</span>
                  <p className="font-bold text-slate-900">+91 80 2987 6543 (Ext. 404)</p>
                  <span className="text-[11px] text-slate-500 block mt-1">DPS Central Transport Control</span>
                </div>

                <div className="pt-3 border-t mt-3">
                  {skipPickupSent ? (
                    <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Driver Notified: Not boarding today
                    </span>
                  ) : (
                    <button
                      onClick={() => setSkipPickupSent(true)}
                      className="w-full py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg text-[11px]"
                    >
                      Notify Driver: Not Boarding Today
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Not Opted State: Information & Opt-In Form */
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <Bus className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            School Bus Transport Not Opted
          </h2>
          <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
            Student <strong>{student.fullName}</strong> ({student.humanId}) is currently marked under <strong>Private Drop / Pickup</strong>.
          </p>

          <div className="mt-6 p-4 bg-slate-50 rounded-xl border text-left text-xs space-y-2 text-slate-700">
            <span className="font-bold text-slate-900 block">Available Bus Routes for Your Area:</span>
            <div className="flex justify-between items-center py-1 border-b">
              <span>Route 14: Hebbal $\rightarrow$ Sahakarnagar $\rightarrow$ Yelahanka</span>
              <strong className="text-blue-700">₹18,000 / Term</strong>
            </div>
            <div className="flex justify-between items-center py-1 border-b">
              <span>Route 21: Manyata Tech Park $\rightarrow$ Thanisandra</span>
              <strong className="text-blue-700">₹16,500 / Term</strong>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>Route 08: Jakkur Airfield $\rightarrow$ Vidyaranyapura</span>
              <strong className="text-blue-700">₹17,000 / Term</strong>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => alert("Transport enrollment request submitted to school administration!")}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Bus className="w-4 h-4" />
              <span>Submit Transport Opt-In Request</span>
            </button>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
