"use client";

import { useState, useEffect } from "react";
import { Ticket } from "@/src/types";

// Base pre-populated tickets database
const initialTickets: Ticket[] = [
  { ticketId: "SW-2026-101", attendeeName: "Alice Smith", status: "valid" },
  { ticketId: "SW-2026-102", attendeeName: "Bob Johnson", status: "checked-in", scannedAt: "2026-05-22T12:30:00Z" },
  { ticketId: "SW-2026-103", attendeeName: "Carla Gomez", status: "valid" },
  { ticketId: "SW-2026-104", attendeeName: "David Kim", status: "valid" },
  { ticketId: "SW-2026-105", attendeeName: "Emily Watson", status: "valid" },
  { ticketId: "SW-2026-106", attendeeName: "Frank Miller", status: "checked-in", scannedAt: "2026-05-22T13:15:00Z" },
  { ticketId: "SW-2026-107", attendeeName: "Grace Hopper", status: "valid" }
];

interface ScanLog {
  id: string;
  ticketId: string;
  attendeeName: string;
  status: "success" | "already-checked-in" | "not-found";
  timestamp: string;
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [scanLogs, setScanLogs] = useState<ScanLog[]>([]);
  const [manualInput, setManualInput] = useState<string>("");
  const [activeAlert, setActiveAlert] = useState<{
    type: "success" | "warning" | "error";
    message: string;
    sub?: string;
  } | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // Initialize localStorage database on page load
  useEffect(() => {
    const stored = localStorage.getItem("soundwave_tickets");
    if (stored) {
      setTickets(JSON.parse(stored));
    } else {
      localStorage.setItem("soundwave_tickets", JSON.stringify(initialTickets));
      setTickets(initialTickets);
    }

    const storedLogs = localStorage.getItem("soundwave_scan_logs");
    if (storedLogs) {
      setScanLogs(JSON.parse(storedLogs));
    }
  }, []);

  // Sync tickets & logs state helper
  const updateDatabase = (updatedTickets: Ticket[], updatedLogs: ScanLog[]) => {
    setTickets(updatedTickets);
    setScanLogs(updatedLogs);
    localStorage.setItem("soundwave_tickets", JSON.stringify(updatedTickets));
    localStorage.setItem("soundwave_scan_logs", JSON.stringify(updatedLogs));
  };

  const executeCheckIn = (ticketId: string) => {
    setIsScanning(true);
    setActiveAlert(null);

    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
      const cleanId = ticketId.trim().toUpperCase();
      const updatedTickets = [...tickets];
      const ticketIdx = updatedTickets.findIndex((t) => t.ticketId === cleanId);

      const timestamp = new Date().toLocaleTimeString();

      if (ticketIdx !== -1) {
        const ticket = updatedTickets[ticketIdx];
        if (ticket.status === "valid") {
          // Successful check-in
          ticket.status = "checked-in";
          ticket.scannedAt = new Date().toISOString();
          
          const newLog: ScanLog = {
            id: `log-${Date.now()}`,
            ticketId: cleanId,
            attendeeName: ticket.attendeeName,
            status: "success",
            timestamp
          };
          
          const updatedLogs = [newLog, ...scanLogs];
          updateDatabase(updatedTickets, updatedLogs);
          setActiveAlert({
            type: "success",
            message: "SUCCESS - TICKET VALIDATED",
            sub: `Welcome, ${ticket.attendeeName}! Gate open.`
          });
        } else {
          // Already checked-in
          const newLog: ScanLog = {
            id: `log-${Date.now()}`,
            ticketId: cleanId,
            attendeeName: ticket.attendeeName,
            status: "already-checked-in",
            timestamp
          };
          const updatedLogs = [newLog, ...scanLogs];
          updateDatabase(updatedTickets, updatedLogs);
          setActiveAlert({
            type: "warning",
            message: "DUPLICATE ENTRY - ALREADY SCANNED",
            sub: `${ticket.attendeeName} scanned at ${new Date(ticket.scannedAt || "").toLocaleTimeString()}`
          });
        }
      } else {
        // Invalid ticket
        const newLog: ScanLog = {
          id: `log-${Date.now()}`,
          ticketId: cleanId,
          attendeeName: "Unknown Attendee",
          status: "not-found",
          timestamp
        };
        const updatedLogs = [newLog, ...scanLogs];
        updateDatabase(updatedTickets, updatedLogs);
        setActiveAlert({
          type: "error",
          message: "INVALID TICKET - ENTRY DENIED",
          sub: "QR Code not found in database registry."
        });
      }
    }, 1200);
  };

  // Pre-mocked scan simulators
  const simulateScan = (type: "valid" | "duplicate" | "invalid") => {
    if (type === "valid") {
      // Find first valid ticket
      const valid = tickets.find((t) => t.status === "valid");
      if (valid) {
        executeCheckIn(valid.ticketId);
      } else {
        alert("All mock tickets have been checked in! Reset the database below to test again.");
      }
    } else if (type === "duplicate") {
      const checked = tickets.find((t) => t.status === "checked-in");
      if (checked) {
        executeCheckIn(checked.ticketId);
      } else {
        alert("No checked-in tickets are available to scan! Scan a valid ticket first.");
      }
    } else {
      executeCheckIn("SW-2026-999");
    }
  };

  // Reset database helper
  const resetDatabase = () => {
    localStorage.removeItem("soundwave_tickets");
    localStorage.removeItem("soundwave_scan_logs");
    setTickets(initialTickets);
    setScanLogs([]);
    setActiveAlert(null);
    alert("Database and logs reset successfully!");
  };

  // Calculations for stats
  const totalIssued = tickets.length;
  const checkedInCount = tickets.filter((t) => t.status === "checked-in").length;
  const remainingCount = totalIssued - checkedInCount;
  const checkInRate = totalIssued > 0 ? Math.round((checkedInCount / totalIssued) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8 text-slate-100">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent sm:text-5xl">
            🛡️ SECURITY GATE CHECK-IN
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            Simulated gate scanner dashboard for ticket check-in and scan logging.
          </p>
        </div>

        {/* Gate Statistics Cards */}
        <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-md">
            <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase">Total Tickets</h4>
            <p className="text-3xl font-black mt-2 text-white">{totalIssued}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-md">
            <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase">Checked In</h4>
            <p className="text-3xl font-black mt-2 text-emerald-400">{checkedInCount}</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full transition-all duration-500" style={{ width: `${checkInRate}%` }} />
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-md">
            <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase">Remaining</h4>
            <p className="text-3xl font-black mt-2 text-cyan-400">{remainingCount}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-md">
            <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase">Check-In Speed</h4>
            <p className="text-3xl font-black mt-2 text-purple-400">96.4%</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-5">
          
          {/* Scanner Simulation Portal (Left Col) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-4">🚨 Entry Scanner View</h3>

              {/* Holographic simulated camera container */}
              <div className="relative aspect-video w-full rounded-xl border border-slate-700 bg-slate-950 overflow-hidden flex items-center justify-center shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
                {/* Background scanning pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

                {/* Laser scan lines */}
                {isScanning && (
                  <div className="absolute left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] z-20 animate-[bounce_1.2s_infinite]" />
                )}

                {/* Grid Overlay frame */}
                <div className={`relative h-44 w-44 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center bg-slate-900/30 ${
                  isScanning 
                    ? "border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-pulse" 
                    : activeAlert?.type === "success"
                    ? "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    : activeAlert?.type === "warning"
                    ? "border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    : activeAlert?.type === "error"
                    ? "border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                    : "border-slate-800"
                }`}>
                  {/* Outer corner lines */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-slate-400" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-slate-400" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-slate-400" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-slate-400" />

                  {/* Icon */}
                  {isScanning ? (
                    <div className="text-cyan-400 animate-pulse font-mono text-xs">ANALYZING...</div>
                  ) : (
                    <svg className={`h-16 w-16 ${
                      activeAlert?.type === "success" 
                        ? "text-emerald-400" 
                        : activeAlert?.type === "warning"
                        ? "text-amber-400"
                        : activeAlert?.type === "error"
                        ? "text-rose-400"
                        : "text-slate-600"
                    }`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5zM13.5 16.5a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM13.5 19.5a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM16.5 13.5a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM16.5 16.5a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM16.5 19.5a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM19.5 13.5a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM19.5 16.5a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM19.5 19.5a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Alert Feedback Panel */}
              {activeAlert && (
                <div className={`mt-5 rounded-xl border p-4 backdrop-blur-md animate-in fade-in duration-300 ${
                  activeAlert.type === "success"
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : activeAlert.type === "warning"
                    ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                    : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                }`}>
                  <h4 className="font-extrabold tracking-wide">{activeAlert.message}</h4>
                  <p className="text-xs opacity-90 mt-1">{activeAlert.sub}</p>
                </div>
              )}
            </div>

            {/* Test Simulation Controls */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-5 backdrop-blur-md">
              <h4 className="text-sm font-bold text-slate-300 mb-3">🛠️ Scanner Simulation Controls</h4>
              <div className="grid gap-3 sm:grid-cols-3">
                <button
                  disabled={isScanning}
                  onClick={() => simulateScan("valid")}
                  className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 text-sm font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all disabled:opacity-55"
                >
                  ⚡ Scan Valid Ticket
                </button>
                <button
                  disabled={isScanning}
                  onClick={() => simulateScan("duplicate")}
                  className="rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-2 text-sm font-bold text-amber-400 hover:bg-amber-500/20 transition-all disabled:opacity-55"
                >
                  ⚠️ Scan Duplicate Ticket
                </button>
                <button
                  disabled={isScanning}
                  onClick={() => simulateScan("invalid")}
                  className="rounded-lg bg-rose-500/10 border border-rose-500/30 px-3 py-2 text-sm font-bold text-rose-400 hover:bg-rose-500/20 transition-all disabled:opacity-55"
                >
                  🛑 Scan Invalid Ticket
                </button>
              </div>
            </div>
          </div>

          {/* Manual Input & Registry Logs (Right Col) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Manual Ticket Entry */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-5 backdrop-blur-md">
              <h4 className="text-sm font-bold text-slate-300 mb-3">⌨️ Manual Entry Override</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Ticket ID (e.g. SW-2026-101)"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-cyan-500/50 focus:outline-none"
                />
                <button
                  onClick={() => {
                    if (manualInput.trim()) {
                      executeCheckIn(manualInput);
                      setManualInput("");
                    }
                  }}
                  className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400 transition-all"
                >
                  Enter
                </button>
              </div>
            </div>

            {/* Registry List / Logs */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-5 backdrop-blur-md flex flex-col max-h-[350px]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-slate-300">📋 Recent Scan History</h4>
                <button
                  onClick={resetDatabase}
                  className="text-xs text-slate-500 hover:text-rose-400 transition-colors"
                >
                  Reset DB
                </button>
              </div>

              <div className="overflow-y-auto space-y-3 flex-1 pr-1">
                {scanLogs.length === 0 ? (
                  <div className="text-center py-10 text-slate-600 text-xs">
                    No scan activities registered yet.
                  </div>
                ) : (
                  scanLogs.map((log) => (
                    <div
                      key={log.id}
                      className="rounded-lg bg-slate-950/40 p-3 border border-slate-800/40 flex justify-between items-center text-xs"
                    >
                      <div>
                        <div className="font-mono font-bold text-slate-300">{log.ticketId}</div>
                        <div className="text-slate-500 mt-0.5">{log.attendeeName}</div>
                      </div>
                      <div className="text-right">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          log.status === "success"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : log.status === "already-checked-in"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-rose-500/10 text-rose-400"
                        }`}>
                          {log.status === "success" 
                            ? "PASS" 
                            : log.status === "already-checked-in"
                            ? "DUPLICATE"
                            : "DENIED"}
                        </span>
                        <div className="text-slate-650 mt-1">{log.timestamp}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
