"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import {
  Bus,
  MapPin,
  Navigation,
  Play,
  Pause,
  RotateCcw,
  ShieldCheck,
  Radio,
  LocateFixed,
  Layers,
  Sparkles,
} from "lucide-react";

export interface BusMapProps {
  busNumber?: string;
  vehicleNumber?: string;
  driverName?: string;
  driverPhone?: string;
  pickupStopName?: string;
  pickupStopCoords?: [number, number];
  initialBusCoords?: [number, number];
  studentName?: string;
}

// Real road waypoints along Bellary Road / NH 44 (Hebbal to DPS Bengaluru North)
const ROUTE_WAYPOINTS: Array<{
  name: string;
  coords: [number, number];
  speed: number;
  isStop?: boolean;
  stopName?: string;
}> = [
  { name: "Hebbal Baptist Hospital", coords: [13.0358, 77.5891], speed: 28, isStop: true, stopName: "Hebbal Baptist Hospital (Stop 1)" },
  { name: "Kodigehalli Gate Junction", coords: [13.0492, 77.5921], speed: 38 },
  { name: "Sahakarnagar Approach", coords: [13.0585, 77.5908], speed: 32 },
  { name: "Sahakarnagar Main Signal", coords: [13.0632, 77.5898], speed: 15, isStop: true, stopName: "Sahakarnagar Main Signal (Aarav's Stop)" },
  { name: "Byatarayanapura Police Station", coords: [13.0728, 77.5878], speed: 36 },
  { name: "Judicial Layout Entry", coords: [13.0805, 77.5862], speed: 25, isStop: true, stopName: "Judicial Layout 2nd Block (Stop 3)" },
  { name: "GKVK University Outer Gate", coords: [13.0882, 77.5912], speed: 40 },
  { name: "Kogilu Junction Flyover", coords: [13.0924, 77.5976], speed: 35 },
  { name: "Kogilu Cross Signal", coords: [13.1021, 77.6045], speed: 20, isStop: true, stopName: "Kogilu Cross Junction (Stop 4)" },
  { name: "Yelahanka Mother Dairy Circle", coords: [13.1115, 77.6118], speed: 34 },
  { name: "DPS Bengaluru North Main Gate", coords: [13.1205, 77.6180], speed: 10, isStop: true, stopName: "DPS Bengaluru North Campus Gate 2" },
];

// Helper to calculate distance in meters (Haversine formula)
function getDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

export default function LiveBusMap({
  busNumber = "Bus #14",
  vehicleNumber = "KA-01-AB-1234",
  driverName = "Somanna Gowda",
  driverPhone = "+91 98450 33441",
  pickupStopName = "Sahakarnagar Main Signal",
  pickupStopCoords = [13.0632, 77.5898],
  initialBusCoords = [13.0924, 77.5976],
  studentName = "Aarav Kashyap",
}: BusMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const busMarkerRef = useRef<L.Marker | null>(null);
  const geofenceCircleRef = useRef<L.Circle | null>(null);

  // Waypoint animation index (defaulting to waypoint 7: near Kogilu Junction)
  const [waypointIndex, setWaypointIndex] = useState(7);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGeofence, setShowGeofence] = useState(true);

  const currentWaypoint = ROUTE_WAYPOINTS[waypointIndex];
  const busCoords = currentWaypoint.coords;
  const speed = currentWaypoint.speed;

  // Calculate distance from bus to student's pickup stop
  const distanceToPickup = getDistanceMeters(
    busCoords[0],
    busCoords[1],
    pickupStopCoords[0],
    pickupStopCoords[1]
  );
  const isInsideGeofence = distanceToPickup <= 600;
  const etaMinutes = Math.max(1, Math.round((distanceToPickup / 1000) / 0.4)); // approx 24 km/h in city traffic

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Create Map
    const map = L.map(mapContainerRef.current, {
      center: [13.078, 77.600],
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: true,
    });
    mapRef.current = map;

    // Add OpenStreetMap Tile Layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors | India Unified School ERP AIS-140',
      maxZoom: 19,
    }).addTo(map);

    // Full Route Polyline (Road Network)
    const polylineCoords = ROUTE_WAYPOINTS.map((w) => w.coords);
    L.polyline(polylineCoords, {
      color: "#2563eb",
      weight: 5,
      opacity: 0.8,
      dashArray: "8, 8",
    }).addTo(map);

    // 600-meter Geofence Radius around student's pickup stop
    const geofence = L.circle(pickupStopCoords, {
      radius: 600,
      color: "#f59e0b",
      fillColor: "#fbbf24",
      fillOpacity: 0.18,
      weight: 2,
      dashArray: "4, 4",
    }).addTo(map);
    geofenceCircleRef.current = geofence;

    // Student Pickup Stop Marker (Gold Star Custom Icon)
    const studentStopIcon = L.divIcon({
      className: "custom-stop-marker",
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
          <div style="background: #f59e0b; color: #0f172a; font-weight: 800; font-size: 11px; padding: 4px 8px; border-radius: 9999px; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.4); border: 2px solid #ffffff; white-space: nowrap; display: flex; align-items: center; gap: 4px;">
            <span>★</span>
            <span>${studentName.split(" ")[0]}'s Pickup Stop</span>
          </div>
          <div style="width: 14px; height: 14px; background: #f59e0b; border: 3px solid #ffffff; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3); margin-top: 2px;"></div>
        </div>
      `,
      iconSize: [0, 0],
    });

    const stopMarker = L.marker(pickupStopCoords, { icon: studentStopIcon }).addTo(map);
    stopMarker.bindPopup(`
      <div style="font-family: inherit; font-size: 12px; line-height: 1.4; min-width: 180px;">
        <strong style="color: #d97706; font-size: 13px;">${pickupStopName}</strong><br/>
        <span style="color: #64748b;">Designated Stop for ${studentName}</span><br/>
        <div style="margin-top: 6px; padding: 4px 8px; background: #fef3c7; border-radius: 6px; color: #92400e; font-weight: 700;">
          Pickup: 07:45 AM | Drop: 03:45 PM
        </div>
        <div style="margin-top: 4px; font-size: 11px; color: #059669; font-weight: 600;">
          ✓ 600m Geofence Alert Active
        </div>
      </div>
    `);

    // School Destination Marker
    const campusCoords = ROUTE_WAYPOINTS[ROUTE_WAYPOINTS.length - 1].coords;
    const campusIcon = L.divIcon({
      className: "custom-campus-marker",
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
          <div style="background: #0f172a; color: #ffffff; font-weight: 700; font-size: 10px; padding: 3px 8px; border-radius: 9999px; border: 1.5px solid #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.3); white-space: nowrap;">
            🏫 DPS Bengaluru North
          </div>
          <div style="width: 12px; height: 12px; background: #059669; border: 2px solid #ffffff; border-radius: 50%; margin-top: 2px;"></div>
        </div>
      `,
      iconSize: [0, 0],
    });
    L.marker(campusCoords, { icon: campusIcon })
      .addTo(map)
      .bindPopup("<strong>DPS Bengaluru North Campus Gate 2</strong><br/>Final Route Destination");

    // Other Stops along the route
    ROUTE_WAYPOINTS.forEach((wp, idx) => {
      if (wp.isStop && wp.coords !== pickupStopCoords && wp.coords !== campusCoords) {
        const otherStopIcon = L.divIcon({
          className: "custom-waypoint-marker",
          html: `
            <div style="width: 10px; height: 10px; background: #64748b; border: 2px solid #ffffff; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>
          `,
          iconSize: [10, 10],
        });
        L.marker(wp.coords, { icon: otherStopIcon })
          .addTo(map)
          .bindPopup(`<strong>${wp.stopName}</strong><br/>Scheduled Route Stop`);
      }
    });

    // Create Initial Live Bus Marker (Yellow Indian School Bus with pulse animation)
    const busIcon = createBusIcon(speed);
    const busMarker = L.marker(busCoords, { icon: busIcon, zIndexOffset: 1000 }).addTo(map);
    busMarker.bindPopup(`
      <div style="font-family: inherit; font-size: 12px; min-width: 190px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
          <strong style="font-size: 14px; color: #0f172a;">${busNumber}</strong>
          <span style="background: #fef08a; color: #854d0e; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">${vehicleNumber}</span>
        </div>
        <div style="color: #475569; font-size: 11px;">Driver: <strong>${driverName}</strong></div>
        <div style="color: #475569; font-size: 11px;">Speed: <strong style="color: #2563eb;">${speed} km/h</strong> (AIS-140 OK)</div>
        <div style="margin-top: 6px; padding: 4px 6px; background: #ecfdf5; border-radius: 6px; color: #065f46; font-size: 11px; font-weight: 600;">
          Live Telemetry • Satellite Synced
        </div>
      </div>
    `);
    busMarkerRef.current = busMarker;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Helper function to build custom bus HTML icon with speed & pulsing radar wave
  function createBusIcon(currentSpeed: number) {
    return L.divIcon({
      className: "live-school-bus-marker",
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%); cursor: pointer;">
          <!-- Pulsing Radar Waves -->
          <div style="position: absolute; width: 44px; height: 44px; background: rgba(245, 158, 11, 0.35); border-radius: 50%; animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;"></div>
          
          <!-- Yellow School Bus Body -->
          <div style="position: relative; width: 34px; height: 34px; background: #facc15; border: 2.5px solid #0f172a; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 6px 16px rgba(0,0,0,0.35); z-index: 2;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 6 2 7 2 15 4 15"></path>
              <path d="M10 6 14 6"></path>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <circle cx="7" cy="18" r="2"></circle>
              <circle cx="17" cy="18" r="2"></circle>
            </svg>
          </div>

          <!-- Real-Time Speed Badge -->
          <div style="margin-top: 3px; background: #0f172a; color: #facc15; font-size: 9px; font-weight: 800; padding: 1px 6px; border-radius: 9999px; border: 1px solid #facc15; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.3); z-index: 2;">
            ${currentSpeed} km/h
          </div>
        </div>
        <style>
          @keyframes pulse-ring {
            0% { transform: scale(0.6); opacity: 0.9; }
            100% { transform: scale(1.6); opacity: 0; }
          }
        </style>
      `,
      iconSize: [0, 0],
    });
  }

  // Update marker position & icon when waypointIndex changes
  useEffect(() => {
    if (!busMarkerRef.current || !mapRef.current) return;

    const newCoords = ROUTE_WAYPOINTS[waypointIndex].coords;
    const newSpeed = ROUTE_WAYPOINTS[waypointIndex].speed;

    busMarkerRef.current.setLatLng(newCoords);
    busMarkerRef.current.setIcon(createBusIcon(newSpeed));

    // Smoothly pan map to follow bus if simulation is playing
    if (isPlaying) {
      mapRef.current.panTo(newCoords, { animate: true, duration: 1 });
    }
  }, [waypointIndex, isPlaying]);

  // Handle simulation play loop (steps forward every 2.5s)
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setWaypointIndex((prev) => {
        if (prev >= ROUTE_WAYPOINTS.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Center on Bus
  const handleCenterOnBus = () => {
    if (mapRef.current) {
      mapRef.current.setView(busCoords, 15, { animate: true });
    }
  };

  // Center on Student Stop
  const handleCenterOnStop = () => {
    if (mapRef.current) {
      mapRef.current.setView(pickupStopCoords, 15, { animate: true });
    }
  };

  // Toggle Geofence visibility
  const handleToggleGeofence = () => {
    if (!geofenceCircleRef.current || !mapRef.current) return;
    if (showGeofence) {
      mapRef.current.removeLayer(geofenceCircleRef.current);
    } else {
      geofenceCircleRef.current.addTo(mapRef.current);
    }
    setShowGeofence(!showGeofence);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Map Control Toolbar */}
      <div className="p-3 sm:p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <Bus className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white">{busNumber} Live OpenStreetMap</span>
              <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                ACTIVE GPS FEED
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Bellary Road NH-44 Corridor • OpenStreetMap Tile Layer</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Simulation Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all text-xs ${
              isPlaying
                ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause Drive
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Simulate Live Drive
              </>
            )}
          </button>

          {/* Reset Route */}
          <button
            onClick={() => {
              setIsPlaying(false);
              setWaypointIndex(0);
            }}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
            title="Reset to Route Start"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Center on Bus */}
          <button
            onClick={handleCenterOnBus}
            className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium flex items-center gap-1 text-[11px]"
          >
            <LocateFixed className="w-3.5 h-3.5 text-amber-400" />
            <span>Bus</span>
          </button>

          {/* Center on Stop */}
          <button
            onClick={handleCenterOnStop}
            className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium flex items-center gap-1 text-[11px]"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>My Stop</span>
          </button>

          {/* Geofence Toggle */}
          <button
            onClick={handleToggleGeofence}
            className={`px-2.5 py-1.5 rounded-lg font-medium text-[11px] border ${
              showGeofence
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-white/5 text-slate-400 border-white/10"
            }`}
          >
            Geofence (600m)
          </button>
        </div>
      </div>

      {/* Geofence Alert Banner */}
      <div
        className={`px-4 py-2.5 flex items-center justify-between text-xs transition-all ${
          isInsideGeofence
            ? "bg-amber-100 text-amber-950 border-b border-amber-300 font-bold animate-pulse"
            : "bg-slate-100 text-slate-700 border-b border-slate-200"
        }`}
      >
        <div className="flex items-center gap-2">
          {isInsideGeofence ? (
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-ping"></span>
          ) : (
            <Radio className="w-3.5 h-3.5 text-blue-600" />
          )}
          <span>
            {isInsideGeofence ? (
              <>
                <strong>🚨 GEOFENCE ALERT:</strong> Bus #14 has entered your 600m pickup zone! Please proceed to{" "}
                <strong>{pickupStopName}</strong>.
              </>
            ) : (
              <>
                <strong>Bus Position:</strong> {currentWaypoint.name} • <strong>{distanceToPickup}m away</strong> from your
                pickup stop.
              </>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="text-slate-500">ETA:</span>
          <strong className="text-blue-700 text-xs">~{etaMinutes} min</strong>
        </div>
      </div>

      {/* Leaflet Map Canvas */}
      <div className="relative">
        <div ref={mapContainerRef} className="w-full h-[420px] sm:h-[480px] z-0" />

        {/* Floating Telemetry HUD Card over the map */}
        <div className="absolute bottom-4 left-4 z-[500] bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200/80 shadow-lg text-xs max-w-xs pointer-events-auto">
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
              Live Telemetry HUD
            </span>
            <span className="font-mono text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
              AIS-140
            </span>
          </div>
          <div className="mt-2 space-y-1 font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Latitude:</span>
              <strong className="text-slate-800">{busCoords[0].toFixed(4)}° N</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Longitude:</span>
              <strong className="text-slate-800">{busCoords[1].toFixed(4)}° E</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Instant Speed:</span>
              <strong className="text-blue-600">{speed} km/h</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Distance to Stop:</span>
              <strong className={isInsideGeofence ? "text-amber-600 font-extrabold" : "text-slate-800"}>
                {distanceToPickup} meters
              </strong>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-100">
              <span className="text-slate-500">Driver Phone:</span>
              <a href={`tel:${driverPhone}`} className="text-emerald-700 font-bold hover:underline">
                {driverPhone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
