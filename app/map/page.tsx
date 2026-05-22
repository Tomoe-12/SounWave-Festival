"use client";

import { useState } from "react";

interface MapLocation {
  id: string;
  name: string;
  type: "stage" | "amenity";
  description: string;
  status: string;
  details: string[];
}

const mapLocations: MapLocation[] = [
  {
    id: "loc-main",
    name: "Main Stage",
    type: "stage",
    description: "The primary festival platform featuring headline acts.",
    status: "🟢 ACTIVE - Cyber Pulse playing next (22:00)",
    details: ["Capacity: 25,000", "State-of-the-art linear laser rig", "Sound Check: 100% complete"]
  },
  {
    id: "loc-neon",
    name: "Neon Jungle",
    type: "stage",
    description: "Our secondary forest-canopy visual sensory experience.",
    status: "🟢 ACTIVE - Luminate Glow performing (21:00)",
    details: ["Capacity: 12,000", "Immersive hologram projection systems", "Acoustic panels: Active"]
  },
  {
    id: "loc-bass",
    name: "Bass Arena",
    type: "stage",
    description: "Heavy low-frequency sanctuary located inside the hangar dome.",
    status: "🟢 ACTIVE - Viper Division on stage (20:00)",
    details: ["Capacity: 10,000", "Specialized dual 18-inch sub-woofer grid", "Ventilation systems: High capacity"]
  },
  {
    id: "loc-food",
    name: "Food Court",
    type: "amenity",
    description: "A delicious multi-vendor directory space.",
    status: "🟡 BUSY - Average Wait 15 minutes",
    details: ["6 Local gourmet vendors", "100% compostable packaging mandate", "Hydration Stations: Available"]
  },
  {
    id: "loc-rest",
    name: "Restrooms Area",
    type: "amenity",
    description: "Premium sanitary facilities with modern facilities.",
    status: "🟢 CLEAR - Average Wait 2 minutes",
    details: ["Eco-friendly facilities", "Dedicated wash bays", "Accessible toilets: 4 units"]
  },
  {
    id: "loc-med",
    name: "First Aid & Safe Haven",
    type: "amenity",
    description: "Emergency responders and security command outpost.",
    status: "🟢 OPERATIONAL - 24/7 Medics Active",
    details: ["Certified doctors on standby", "Rehydration fluids available", "Free safety kits"]
  },
  {
    id: "loc-gate",
    name: "Main Entrance Gate",
    type: "amenity",
    description: "Accreditation and QR scanning ticket portal.",
    status: "🟢 FLUID - Low queues",
    details: ["Fast-pass lanes available", "Bag scanning security gates", "Lost & Found counter link"]
  }
];

export default function MapPage() {
  const [selectedLoc, setSelectedLoc] = useState<MapLocation | null>(null);
  const [activeLayer, setActiveLayer] = useState<"all" | "stage" | "amenity">("all");

  const handleLocationClick = (locId: string) => {
    const loc = mapLocations.find((l) => l.id === locId);
    if (loc) setSelectedLoc(loc);
  };

  // Helper to determine if element should be high-contrast based on filter
  const isFiltered = (type: "stage" | "amenity") => {
    return activeLayer === "all" || activeLayer === type;
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8 text-slate-100">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent sm:text-5xl">
            🗺️ LIVE VENUE MAP
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            Navigate the soundscapes. Click coordinates on our holographic layout for live stats.
          </p>
        </div>

        {/* Map Control Layers */}
        <div className="mb-8 flex flex-col gap-4 rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {["all", "stage", "amenity"].map((layer) => (
              <button
                key={layer}
                onClick={() => {
                  setActiveLayer(layer as "all" | "stage" | "amenity");
                  setSelectedLoc(null);
                }}
                className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize border transition-all ${
                  activeLayer === layer
                    ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                    : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700"
                }`}
              >
                {layer === "all" ? "View All Layers" : layer + "s"}
              </button>
            ))}
          </div>
          <div className="text-xs text-slate-500 font-mono">
            * Interactive Coordinates Enabled
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid gap-8 lg:grid-cols-5 items-start">
          
          {/* SVG Map Container (Left Col) */}
          <div className="lg:col-span-3 rounded-2xl border border-slate-800 bg-slate-900/20 p-6 backdrop-blur-md flex flex-col items-center">
            
            {/* Holographic glowing layout */}
            <div className="relative w-full aspect-[4/3] rounded-xl border border-slate-850 bg-slate-950 p-2 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center">
              {/* Retro HUD grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.3)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none" />

              <svg viewBox="0 0 800 600" className="w-full h-full select-none">
                
                {/* Outlines of venue boundary */}
                <rect x="20" y="20" width="760" height="560" rx="20" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="6,6" />
                
                {/* Grid markings */}
                <text x="30" y="45" fill="#475569" className="font-mono text-xs">SYS_LOC: OK-48</text>
                <text x="690" y="45" fill="#475569" className="font-mono text-xs">GATE_ALPHA</text>

                {/* 1. Main Entrance (Amenities) */}
                <g 
                  onClick={() => handleLocationClick("loc-gate")}
                  className={`cursor-pointer transition-all duration-300 ${isFiltered("amenity") ? "opacity-100" : "opacity-25"}`}
                >
                  <rect x="340" y="500" width="120" height="60" rx="10" 
                    className={`transition-all ${selectedLoc?.id === "loc-gate" ? "fill-cyan-500/20 stroke-cyan-400 stroke-2 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" : "fill-slate-900/90 stroke-slate-800 hover:stroke-slate-500"}`} />
                  <text x="400" y="535" textAnchor="middle" fill="#94a3b8" className="text-xs font-bold tracking-wider">ENTRANCE GATE</text>
                </g>

                {/* 2. Main Stage (Stage) */}
                <g 
                  onClick={() => handleLocationClick("loc-main")}
                  className={`cursor-pointer transition-all duration-300 ${isFiltered("stage") ? "opacity-100" : "opacity-25"}`}
                >
                  <rect x="250" y="50" width="300" height="130" rx="15" 
                    className={`transition-all ${selectedLoc?.id === "loc-main" ? "fill-cyan-500/20 stroke-cyan-400 stroke-2 filter drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]" : "fill-slate-900/90 stroke-slate-800 hover:stroke-cyan-500/40"}`} />
                  <circle cx="400" cy="115" r="30" className="fill-cyan-500/10 stroke-cyan-500/30" />
                  <text x="400" y="110" textAnchor="middle" fill="#ffffff" className="text-sm font-black tracking-widest">MAIN STAGE</text>
                  <text x="400" y="130" textAnchor="middle" fill="#22d3ee" className="text-[10px] font-mono font-bold">ALOK & THE WAVES</text>
                </g>

                {/* 3. Neon Jungle Stage (Stage) */}
                <g 
                  onClick={() => handleLocationClick("loc-neon")}
                  className={`cursor-pointer transition-all duration-300 ${isFiltered("stage") ? "opacity-100" : "opacity-25"}`}
                >
                  <rect x="50" y="220" width="180" height="110" rx="15" 
                    className={`transition-all ${selectedLoc?.id === "loc-neon" ? "fill-purple-500/20 stroke-purple-400 stroke-2 filter drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]" : "fill-slate-900/90 stroke-slate-800 hover:stroke-purple-500/40"}`} />
                  <text x="140" y="270" textAnchor="middle" fill="#ffffff" className="text-xs font-black tracking-widest">NEON JUNGLE</text>
                  <text x="140" y="290" textAnchor="middle" fill="#c084fc" className="text-[10px] font-mono font-bold">LUMINATE GLOW</text>
                </g>

                {/* 4. Bass Arena Stage (Stage) */}
                <g 
                  onClick={() => handleLocationClick("loc-bass")}
                  className={`cursor-pointer transition-all duration-300 ${isFiltered("stage") ? "opacity-100" : "opacity-25"}`}
                >
                  <rect x="570" y="220" width="180" height="110" rx="15" 
                    className={`transition-all ${selectedLoc?.id === "loc-bass" ? "fill-pink-500/20 stroke-pink-400 stroke-2 filter drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]" : "fill-slate-900/90 stroke-slate-800 hover:stroke-pink-500/40"}`} />
                  <text x="660" y="270" textAnchor="middle" fill="#ffffff" className="text-xs font-black tracking-widest">BASS ARENA</text>
                  <text x="660" y="290" textAnchor="middle" fill="#f472b6" className="text-[10px] font-mono font-bold">VIPER DIVISION</text>
                </g>

                {/* 5. Food Court (Amenity) */}
                <g 
                  onClick={() => handleLocationClick("loc-food")}
                  className={`cursor-pointer transition-all duration-300 ${isFiltered("amenity") ? "opacity-100" : "opacity-25"}`}
                >
                  <rect x="310" y="280" width="180" height="100" rx="12" 
                    className={`transition-all ${selectedLoc?.id === "loc-food" ? "fill-amber-500/20 stroke-amber-400 stroke-2 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" : "fill-slate-900/90 stroke-slate-800 hover:stroke-slate-500"}`} />
                  <text x="400" y="335" textAnchor="middle" fill="#f59e0b" className="text-xs font-bold tracking-wider">🍔 FOOD COURT</text>
                </g>

                {/* 6. Restrooms Area (Amenity) */}
                <g 
                  onClick={() => handleLocationClick("loc-rest")}
                  className={`cursor-pointer transition-all duration-300 ${isFiltered("amenity") ? "opacity-100" : "opacity-25"}`}
                >
                  <rect x="130" y="440" width="140" height="70" rx="10" 
                    className={`transition-all ${selectedLoc?.id === "loc-rest" ? "fill-emerald-500/20 stroke-emerald-400 stroke-2 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "fill-slate-900/90 stroke-slate-800 hover:stroke-slate-500"}`} />
                  <text x="200" y="480" textAnchor="middle" fill="#94a3b8" className="text-xs font-bold tracking-wider">🚻 RESTROOMS</text>
                </g>

                {/* 7. First Aid Center (Amenity) */}
                <g 
                  onClick={() => handleLocationClick("loc-med")}
                  className={`cursor-pointer transition-all duration-300 ${isFiltered("amenity") ? "opacity-100" : "opacity-25"}`}
                >
                  <rect x="530" y="440" width="140" height="70" rx="10" 
                    className={`transition-all ${selectedLoc?.id === "loc-med" ? "fill-rose-500/20 stroke-rose-400 stroke-2 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" : "fill-slate-900/90 stroke-slate-800 hover:stroke-slate-500"}`} />
                  <text x="600" y="480" textAnchor="middle" fill="#f43f5e" className="text-xs font-bold tracking-wider">🚨 FIRST AID</text>
                </g>

              </svg>
            </div>
          </div>

          {/* Details Overlay Panel (Right Col) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Dynamic location stats card */}
            {selectedLoc ? (
              <div className="rounded-2xl border border-cyan-500/20 bg-slate-900 p-6 shadow-xl shadow-cyan-500/5 animate-in fade-in slide-in-from-right duration-200">
                <div className="flex items-center justify-between mb-4">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    selectedLoc.type === "stage"
                      ? "bg-purple-500/10 border border-purple-500/20 text-purple-400"
                      : "bg-slate-800 border border-slate-700 text-slate-400"
                  }`}>
                    {selectedLoc.type}
                  </span>
                  <span className="text-xs text-slate-500">Live coordinates OK</span>
                </div>

                <h3 className="text-2xl font-black text-white">{selectedLoc.name}</h3>
                <p className="mt-2 text-slate-400 text-sm leading-relaxed">{selectedLoc.description}</p>

                {/* Status Indicator */}
                <div className="mt-4 rounded-lg bg-slate-950/50 border border-slate-850 px-3 py-2 text-xs font-semibold text-slate-200">
                  {selectedLoc.status}
                </div>

                {/* Custom Landmark Details */}
                <div className="mt-6 border-t border-slate-800 pt-4">
                  <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-3">Live Info</h4>
                  <ul className="space-y-2.5">
                    {selectedLoc.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-8 text-center backdrop-blur-md">
                <svg className="mx-auto h-12 w-12 text-slate-700" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <h4 className="mt-4 text-sm font-bold text-slate-400">Select coordinates</h4>
                <p className="mt-2 text-xs text-slate-500 max-w-xs mx-auto">
                  Click on any stage, facility, or entrance landmark inside the HUD map grid to unlock real-time sensor streams and scheduling feeds.
                </p>
              </div>
            )}
            
          </div>
          
        </div>
      </div>
    </div>
  );
}
