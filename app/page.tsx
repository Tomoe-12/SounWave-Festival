"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Ticket, LostItem } from "@/src/types";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  const [stats, setStats] = useState({
    checkedInCount: 0,
    totalTickets: 0,
    lostItemsCount: 0,
    vendorsCount: 6,
  });

  // Countdown timer logic
  useEffect(() => {
    // Set target date 48 hours from now
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 48);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch real-time statistics from unified localStorage database
  useEffect(() => {
    const updateStats = () => {
      // 1. Tickets checked-in
      const storedTickets = localStorage.getItem("soundwave_tickets");
      let checkedIn = 2; // default based on initialTickets
      let total = 7;
      if (storedTickets) {
        const ticketsList = JSON.parse(storedTickets) as Ticket[];
        checkedIn = ticketsList.filter((t) => t.status === "checked-in").length;
        total = ticketsList.length;
      }

      // 2. Lost items
      const storedLost = localStorage.getItem("soundwave_lostfound");
      let lostCount = 2; // default lost + found active items
      if (storedLost) {
        const lostList = JSON.parse(storedLost) as LostItem[];
        lostCount = lostList.filter((i) => i.status !== "claimed").length;
      }

      setStats({
        checkedInCount: checkedIn,
        totalTickets: total,
        lostItemsCount: lostCount,
        vendorsCount: 6,
      });
    };

    updateStats();
    // Refresh stats periodically or listen for storage changes
    window.addEventListener("storage", updateStats);
    const interval = setInterval(updateStats, 2000);

    return () => {
      window.removeEventListener("storage", updateStats);
      clearInterval(interval);
    };
  }, []);

  const features = [
    {
      name: "Lineup & Schedule",
      description: "Filter set times across 3 custom stages and construct your personalized timeline.",
      href: "/lineup",
      icon: "📅",
      accent: "from-cyan-500 to-blue-600",
      textAccent: "text-cyan-400",
      borderGlow: "group-hover:border-cyan-500/40",
      shadowGlow: "shadow-cyan-500/5",
      badge: "Stage Timelines",
    },
    {
      name: "Venue HUD Map",
      description: "Navigate stages, food trucks, restrooms, and first-aid centers on a glowing interactive SVG coordinate layout.",
      href: "/map",
      icon: "🗺️",
      accent: "from-purple-500 to-indigo-600",
      textAccent: "text-purple-400",
      borderGlow: "group-hover:border-purple-500/40",
      shadowGlow: "shadow-purple-500/5",
      badge: "Interactive SVG",
    },
    {
      name: "Security Gate Portal",
      description: "Simulated QR code verification & real-time attendance analytics for crowd controllers.",
      href: "/tickets",
      icon: "🛡️",
      accent: "from-emerald-500 to-teal-600",
      textAccent: "text-emerald-400",
      borderGlow: "group-hover:border-emerald-500/40",
      shadowGlow: "shadow-emerald-500/5",
      badge: "Live Scanner",
    },
    {
      name: "Food Court Directory",
      description: "Browse curated culinary vendors, sort by shortest wait-times, and filter dietary menus.",
      href: "/food",
      icon: "🍔",
      accent: "from-amber-500 to-orange-600",
      textAccent: "text-amber-400",
      borderGlow: "group-hover:border-amber-500/40",
      shadowGlow: "shadow-amber-500/5",
      badge: "Order Simulator",
    },
    {
      name: "Lost & Found Register",
      description: "Report misplaced belongings or claim verified objects securely via passcode keys.",
      href: "/lost-found",
      icon: "🔍",
      accent: "from-rose-500 to-pink-600",
      textAccent: "text-rose-400",
      borderGlow: "group-hover:border-rose-500/40",
      shadowGlow: "shadow-rose-500/5",
      badge: "Secure Claiming",
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Immersive background graphics */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-pink-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 text-center sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
          ✨ PHASE 3 LIVE INTEGRATION
        </span>
        
        <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
            SOUNDWAVE FESTIVAL
          </span>
        </h1>
        
        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-medium">
          Welcome to the control center of Southeast Asia's premier digital-music experience. 
          Monitor gate metrics, stages, and venue coordinates in real-time.
        </p>

        {/* Real-time Ticking Countdown Timer */}
        <div className="mt-12 grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div
              key={label}
              className="relative flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4 backdrop-blur-md shadow-lg"
            >
              <span className="font-mono text-2xl sm:text-4xl font-extrabold bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
                {String(value).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase mt-1 tracking-wider">
                {label}
              </span>
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-cyan-500/40 to-purple-500/40 rounded-b-2xl" />
            </div>
          ))}
        </div>
      </section>

      {/* Integrated Live Metric Stream */}
      <section className="px-4 py-6 max-w-6xl mx-auto w-full z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/20 p-4 backdrop-blur-md flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Checked In Rate</span>
              <h3 className="text-lg sm:text-2xl font-black text-emerald-400 mt-1">
                {stats.checkedInCount} / {stats.totalTickets}
              </h3>
            </div>
            <span className="text-2xl">🛡️</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/20 p-4 backdrop-blur-md flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Stages</span>
              <h3 className="text-lg sm:text-2xl font-black text-cyan-400 mt-1">3 / 3</h3>
            </div>
            <span className="text-2xl">🔊</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/20 p-4 backdrop-blur-md flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Food Vendors</span>
              <h3 className="text-lg sm:text-2xl font-black text-amber-400 mt-1">{stats.vendorsCount} Open</h3>
            </div>
            <span className="text-2xl">🍔</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/20 p-4 backdrop-blur-md flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Lost Reports</span>
              <h3 className="text-lg sm:text-2xl font-black text-rose-400 mt-1">{stats.lostItemsCount} Items</h3>
            </div>
            <span className="text-2xl">🔍</span>
          </div>
        </div>
      </section>

      {/* Navigation Feature Hub Grid */}
      <section className="px-4 py-10 max-w-6xl mx-auto w-full z-10 mb-20">
        <h2 className="text-xl font-bold tracking-wider text-slate-400 uppercase mb-8 text-center sm:text-left">
          🎮 Operations Directory
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feat) => (
            <Link
              key={feat.href}
              href={feat.href}
              className={`group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/30 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900/40 hover:shadow-[0_4px_30px_rgba(6,182,212,0.03)] ${feat.borderGlow} ${feat.shadowGlow}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 text-xl group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider rounded-full bg-slate-950 border border-slate-800 px-2.5 py-0.5 text-slate-400`}>
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {feat.name}
                </h3>
                <p className="mt-2 text-slate-400 text-xs leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between text-xs font-bold">
                <span className={`${feat.textAccent} group-hover:underline`}>Access Terminal →</span>
                <span className="text-slate-600 font-mono">SYS_OK</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

