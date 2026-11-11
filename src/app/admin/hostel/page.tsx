"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import {
  Home,
  Users,
  Bed,
  Utensils,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Plus,
  AlertCircle,
} from "lucide-react";

interface HostelRoom {
  roomNo: string;
  block: string;
  floor: string;
  type: "DOUBLE" | "TRIPLE" | "FOUR_BED";
  capacity: number;
  occupied: number;
  monthlyFee: number;
  students: string[];
}

interface WardenInfo {
  name: string;
  wing: string;
  phone: string;
  email: string;
  dutyHours: string;
}

export default function AdminHostelPage() {
  const [activeTab, setActiveTab] = useState<"ROOMS" | "MESS_MENU" | "ROLL_CALL">("ROOMS");

  const [rooms, setRooms] = useState<HostelRoom[]>([
    {
      roomNo: "B-101",
      block: "Aravalli Boys Wing",
      floor: "1st Floor",
      type: "DOUBLE",
      capacity: 2,
      occupied: 2,
      monthlyFee: 12500,
      students: ["Aarav Kashyap (10-A)", "Rohan Gupta (10-A)"],
    },
    {
      roomNo: "B-102",
      block: "Aravalli Boys Wing",
      floor: "1st Floor",
      type: "TRIPLE",
      capacity: 3,
      occupied: 2,
      monthlyFee: 10500,
      students: ["Karan Johar Patel (10-A)", "Siddharth Nair (10-B)"],
    },
    {
      roomNo: "G-201",
      block: "Nilgiri Girls Wing",
      floor: "2nd Floor",
      type: "DOUBLE",
      capacity: 2,
      occupied: 2,
      monthlyFee: 12500,
      students: ["Diya Menon (10-A)", "Ananya Iyer (10-A)"],
    },
    {
      roomNo: "G-202",
      block: "Nilgiri Girls Wing",
      floor: "2nd Floor",
      type: "FOUR_BED",
      capacity: 4,
      occupied: 3,
      monthlyFee: 9000,
      students: ["Pooja Hegde (9-A)", "Kavya Murthy (9-B)", "Ritu Sen (9-B)"],
    },
  ]);

  const wardens: WardenInfo[] = [
    {
      name: "Mr. Chandrasekhar Reddy",
      wing: "Chief Warden (Aravalli Boys Wing)",
      phone: "+91 98450 66771",
      email: "warden.boys@dpsnorth.edu.in",
      dutyHours: "06:00 PM - 08:00 AM",
    },
    {
      name: "Mrs. Shobha Kulkarni",
      wing: "Senior Warden (Nilgiri Girls Wing)",
      phone: "+91 98450 66772",
      email: "warden.girls@dpsnorth.edu.in",
      dutyHours: "06:00 PM - 08:00 AM",
    },
  ];

  const messMenu = [
    { day: "Monday", breakfast: "Idli, Vada, Sambar & Chutney", lunch: "Chapati, Dal Tadka, Paneer Butter Masala, Rice, Curd", snacks: "Veg Puff & Tea/Milk", dinner: "Methi Roti, Mixed Veg Curry, Jeera Rice, Rasam" },
    { day: "Tuesday", breakfast: "Poha, Boiled Eggs / Banana, Tea", lunch: "Phulka, Rajma Masala, Steamed Rice, Boondi Raita", snacks: "Samosa & Masala Chai", dinner: "Tandoori Roti, Dal Makhani, Pulao, Gulab Jamun" },
    { day: "Wednesday", breakfast: "Aloo Paratha with White Butter & Curd", lunch: "Poori, Chole Masala, Veg Biryani, Cucumber Salad", snacks: "Biscuits & Bournvita/Milk", dinner: "Roti, Bhindi Masala, Steamed Rice, Tomato Rasam" },
    { day: "Thursday", breakfast: "Masala Dosa with Coconut Chutney", lunch: "Chapati, Palak Paneer, Yellow Dal, Steamed Rice", snacks: "Corn Chaat & Lemonade", dinner: "Roti, Egg Curry / Malai Kofta, Peas Pulao, Curd" },
    { day: "Friday", breakfast: "Upma, Kesari Bath, Sambar", lunch: "Phulka, Dal Fry, Gobi Manchurian, Fried Rice", snacks: "Pav Bhaji & Hot Chocolate", dinner: "Roti, Kadai Paneer, Rice, Mysore Rasam, Ice Cream" },
  ];

  const totalBeds = rooms.reduce((acc, r) => acc + r.capacity, 0);
  const occupiedBeds = rooms.reduce((acc, r) => acc + r.occupied, 0);

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
              <Home className="w-3.5 h-3.5 text-blue-600" />
              Edubricz Hostel & Boarding Management
            </span>
            <span className="text-xs text-slate-400 font-mono">Aravalli & Nilgiri Campus Dormitories</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Hostel & Dormitory Operations
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage student room allocations, warden duty schedules, weekly nutritious mess menus, and nightly boarding attendance.
          </p>
        </div>

        <button
          onClick={() => alert("Room allotment wizard opened.")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Allocate Bed to Student</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Total Bed Capacity</span>
          <span className="text-2xl font-extrabold text-slate-900">{totalBeds} Beds</span>
          <span className="text-[10px] text-slate-500 block mt-1">Across 2 Resident Wings</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Current Occupancy</span>
          <span className="text-2xl font-extrabold text-emerald-600">
            {occupiedBeds} ({Math.round((occupiedBeds / totalBeds) * 100)}%)
          </span>
          <span className="text-[10px] text-emerald-700 font-bold block mt-1">
            {totalBeds - occupiedBeds} Beds Available
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Boarding Student Strength</span>
          <span className="text-2xl font-extrabold text-blue-700">{occupiedBeds} Boarders</span>
          <span className="text-[10px] text-slate-500 block mt-1">CBSE Classes 6 to 12</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Hostel Fee Collection</span>
          <span className="text-2xl font-extrabold text-purple-600">96.4%</span>
          <span className="text-[10px] text-slate-500 block mt-1">All mess dues settled</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab("ROOMS")}
          className={`pb-3 transition-colors ${
            activeTab === "ROOMS"
              ? "border-b-2 border-blue-600 text-blue-700"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Room & Bed Allotment Matrix
        </button>
        <button
          onClick={() => setActiveTab("MESS_MENU")}
          className={`pb-3 transition-colors ${
            activeTab === "MESS_MENU"
              ? "border-b-2 border-blue-600 text-blue-700"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Weekly Dining & Mess Menu
        </button>
      </div>

      {activeTab === "ROOMS" ? (
        <div className="space-y-6">
          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rooms.map((room) => {
              const isFull = room.occupied >= room.capacity;

              return (
                <div key={room.roomNo} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-sm">
                        {room.roomNo}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{room.block}</h3>
                        <p className="text-[11px] text-slate-500">{room.floor} • {room.type.replace("_", " ")}</p>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        isFull
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {isFull ? "FULL (0 VACANT)" : `${room.capacity - room.occupied} BED VACANT`}
                    </span>
                  </div>

                  <div className="space-y-2 mb-3">
                    <span className="font-bold text-slate-700 block">Resident Students:</span>
                    <div className="space-y-1">
                      {room.students.map((st, i) => (
                        <div key={i} className="p-2 bg-slate-50 rounded-lg flex items-center justify-between text-slate-800">
                          <span>• {st}</span>
                          <span className="text-[10px] text-emerald-700 font-bold">Verified Boarder</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t text-[11px] text-slate-500">
                    <span>Monthly Boarding Fee: <strong className="text-slate-800">₹{room.monthlyFee.toLocaleString("en-IN")}</strong></span>
                    <button
                      onClick={() => alert(`Opening student ledger for Room ${room.roomNo}`)}
                      className="text-blue-700 font-bold hover:underline"
                    >
                      Manage Allotments
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Warden Directory */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-1">Hostel Resident Wardens</h3>
            <p className="text-xs text-slate-500 mb-4">Round-the-clock emergency support and student counseling.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {wardens.map((w, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm">{w.name}</h4>
                  <span className="text-blue-700 font-semibold block mt-0.5">{w.wing}</span>
                  <div className="mt-3 space-y-1 text-slate-600 text-[11px]">
                    <div>Phone: <a href={`tel:${w.phone}`} className="font-bold text-emerald-700 hover:underline">{w.phone}</a></div>
                    <div>Email: <span className="font-mono">{w.email}</span></div>
                    <div>Duty Shift: <strong>{w.dutyHours}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Tab 2: Mess Menu */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-amber-600" />
              <span>Weekly Institutional Dining Schedule (Nutritionist Certified)</span>
            </h3>
            <p className="text-xs text-slate-500">100% vegetarian, balanced diet compliant with FSSAI hygiene standards.</p>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b">
                <tr>
                  <th className="p-3">Day</th>
                  <th className="p-3">Breakfast (07:00 - 08:00 AM)</th>
                  <th className="p-3">Lunch (12:30 - 01:30 PM)</th>
                  <th className="p-3">Evening Snacks (04:30 - 05:15 PM)</th>
                  <th className="p-3">Dinner (07:30 - 08:45 PM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {messMenu.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="p-3 font-bold text-slate-900">{m.day}</td>
                    <td className="p-3 text-slate-700">{m.breakfast}</td>
                    <td className="p-3 text-slate-700">{m.lunch}</td>
                    <td className="p-3 text-slate-700">{m.snacks}</td>
                    <td className="p-3 text-slate-700">{m.dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
