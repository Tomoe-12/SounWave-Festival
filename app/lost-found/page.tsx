"use client";

import { useState, useEffect, useMemo } from "react";
import { LostItem } from "@/src/types";

// Base pre-populated lost & found database
const initialItems: (LostItem & { location: string; contactInfo: string })[] = [
  {
    id: "lf-1",
    itemName: "iPhone 15 Pro",
    description: "Space black, has a purple transparent case. Lock screen has a picture of a golden retriever.",
    status: "lost",
    location: "Main Stage (Front left rail)",
    reportedAt: "2026-05-22 14:30",
    contactInfo: "alice@gmail.com"
  },
  {
    id: "lf-2",
    itemName: "Black Leather Wallet",
    description: "Contains a driving license under the name 'Robert Miller' and standard keycards.",
    status: "found",
    location: "Food Trucks (Near Neon Noodle)",
    reportedAt: "2026-05-22 15:10",
    contactInfo: "Security Gate Desk"
  },
  {
    id: "lf-3",
    itemName: "SoundWave Limited Jacket",
    description: "Official festival hoodie, size XL. Has custom holographic patch on the sleeve.",
    status: "claimed",
    location: "Bass Arena Entrance",
    reportedAt: "2026-05-22 12:00",
    contactInfo: "claimed"
  }
];

export default function LostFoundPage() {
  const [items, setItems] = useState<typeof initialItems>([]);
  const [activeTab, setActiveTab] = useState<"directory" | "lost-form" | "found-form">("directory");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Form states
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  // Claim Modal States
  const [claimingItem, setClaimingItem] = useState<typeof initialItems[0] | null>(null);
  const [verificationCode, setVerificationCode] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("soundwave_lostfound");
    if (stored) {
      setItems(JSON.parse(stored));
    } else {
      localStorage.setItem("soundwave_lostfound", JSON.stringify(initialItems));
      setItems(initialItems);
    }
  }, []);

  const updateDatabase = (updatedItems: typeof initialItems) => {
    setItems(updatedItems);
    localStorage.setItem("soundwave_lostfound", JSON.stringify(updatedItems));
  };

  // Submit Lost/Found Form Helper
  const handleFormSubmit = (e: React.FormEvent, type: "lost" | "found") => {
    e.preventDefault();
    if (!itemName || !description || !location || !contactInfo) {
      alert("Please fill in all details.");
      return;
    }

    const newItem: typeof initialItems[0] = {
      id: `lf-${Date.now()}`,
      itemName,
      description,
      status: type,
      location,
      reportedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      contactInfo
    };

    const updated = [newItem, ...items];
    updateDatabase(updated);

    // Reset forms and return to list
    setItemName("");
    setDescription("");
    setLocation("");
    setContactInfo("");
    setActiveTab("directory");
    alert(`Success! Item has been reported as ${type}.`);
  };

  // Claim item verification helper
  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.trim() !== "1234") {
      alert("Invalid verification code! Enter the Gate Security passcode: 1234");
      return;
    }

    if (claimingItem) {
      const updated = items.map((item) => {
        if (item.id === claimingItem.id) {
          return { ...item, status: "claimed" as const };
        }
        return item;
      });

      updateDatabase(updated);
      setClaimingItem(null);
      setVerificationCode("");
      alert("Verification successful! Item claimed.");
    }
  };

  // Filtered Items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesStatus = filterStatus === "All" || item.status === filterStatus.toLowerCase();
      const matchesQuery =
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesQuery;
    });
  }, [items, filterStatus, searchQuery]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "lost":
        return "bg-rose-500/10 border-rose-500/20 text-rose-400";
      case "found":
        return "bg-amber-500/10 border-amber-500/20 text-amber-400";
      case "claimed":
        return "bg-slate-800 border-slate-700 text-slate-500";
      default:
        return "bg-slate-850 text-slate-400";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8 text-slate-100">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent sm:text-5xl">
            🔍 LOST & FOUND REGISTER
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            Report, browse, and securely claim misplaced festival belongings.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 gap-6 mb-8 text-sm font-semibold">
          <button
            onClick={() => setActiveTab("directory")}
            className={`pb-4 transition-all ${activeTab === "directory" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-400 hover:text-slate-200"}`}
          >
            📋 Browse Directory
          </button>
          <button
            onClick={() => setActiveTab("lost-form")}
            className={`pb-4 transition-all ${activeTab === "lost-form" ? "text-rose-400 border-b-2 border-rose-400" : "text-slate-400 hover:text-slate-200"}`}
          >
            ❌ Report Lost Item
          </button>
          <button
            onClick={() => setActiveTab("found-form")}
            className={`pb-4 transition-all ${activeTab === "found-form" ? "text-amber-400 border-b-2 border-amber-400" : "text-slate-400 hover:text-slate-200"}`}
          >
            ✅ Report Found Item
          </button>
        </div>

        {/* --- TABS --- */}

        {/* TAB 1: BROWSE DIRECTORY */}
        {activeTab === "directory" && (
          <div className="space-y-6">
            
            {/* Search and Filters */}
            <div className="flex flex-col gap-4 rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search items by name, description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 max-w-md rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-cyan-500/50 focus:outline-none"
              />

              {/* Status Filters */}
              <div className="flex gap-2">
                {["All", "Lost", "Found", "Claimed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold border transition-all ${
                      filterStatus === status
                        ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                        : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid List */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl bg-slate-900/10">
                <p className="text-slate-500">No registry records match your search criteria.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="group rounded-2xl border border-slate-800 bg-slate-900/30 p-6 backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:border-slate-750"
                  >
                    <div>
                      {/* Header Row */}
                      <div className="flex justify-between items-start gap-3">
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {item.itemName}
                        </h3>
                        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${getStatusBadge(item.status)}`}>
                          {item.status}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-slate-400 text-xs leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      {/* Info Row */}
                      <div className="mt-5 space-y-2 border-t border-slate-800/50 pt-4 text-[11px] text-slate-500 font-mono">
                        <div>📍 Lost: {item.location}</div>
                        <div>⏱️ Registered: {item.reportedAt}</div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    {item.status === "found" && (
                      <div className="mt-6 pt-4">
                        <button
                          onClick={() => setClaimingItem(item)}
                          className="w-full rounded-xl bg-amber-500/10 border border-amber-500/30 py-2.5 text-xs font-bold text-amber-400 hover:bg-amber-500/20 transition-all"
                        >
                          🔒 Claim Belonging
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: REPORT LOST ITEM FORM */}
        {activeTab === "lost-form" && (
          <div className="max-w-xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/20 p-8 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white mb-6">❌ File a Lost Item Report</h3>
            <form onSubmit={(e) => handleFormSubmit(e, "lost")} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Item Name</label>
                <input
                  type="text"
                  placeholder="e.g. Blue Backpack"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-rose-500/50 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Description & Markers</label>
                <textarea
                  placeholder="Provide unique identifiers, brand names, color shades, locks..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-rose-500/50 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Estimated Location Lost</label>
                <input
                  type="text"
                  placeholder="e.g. Near Neon Jungle Stage restroom lines"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-rose-500/50 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Your Contact Info</label>
                <input
                  type="text"
                  placeholder="Phone, email or social handle"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-rose-500/50 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/20"
              >
                Submit Lost Report
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: REPORT FOUND ITEM FORM */}
        {activeTab === "found-form" && (
          <div className="max-w-xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/20 p-8 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white mb-6">✅ File a Found Item Report</h3>
            <form onSubmit={(e) => handleFormSubmit(e, "found")} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Item Name</label>
                <input
                  type="text"
                  placeholder="e.g. House Keys w/ Keychain"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-amber-500/50 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Detailed Visual Markers</label>
                <textarea
                  placeholder="Provide precise visual markers but keep some parameters confidential for security..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-amber-500/50 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Location Discovered</label>
                <input
                  type="text"
                  placeholder="e.g. Under food stall benches"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-amber-500/50 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Secured Location Stored</label>
                <input
                  type="text"
                  placeholder="e.g. Dropped off at Security Alpha Counter Desk"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-amber-500/50 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/20"
              >
                Submit Found Report
              </button>
            </form>
          </div>
        )}

        {/* Secure Claim Verification Modal */}
        {claimingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
            <div
              className="relative w-full max-w-md rounded-2xl border border-amber-500/20 bg-slate-900 p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setClaimingItem(null)}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-xl font-bold text-white mb-2">🔒 Secure Belonging Verification</h3>
              <p className="text-xs text-slate-400 mb-6">
                To prevent fraud, items must be claimed with the Gate Security Passcode.
              </p>

              <div className="rounded-lg bg-slate-950/50 p-4 border border-slate-850 text-xs text-slate-300 space-y-2 mb-6">
                <div>Item: <strong>{claimingItem.itemName}</strong></div>
                <div>Storage Location: <em>{claimingItem.contactInfo}</em></div>
              </div>

              <form onSubmit={handleClaimSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Security Verification Passcode</label>
                  <input
                    type="password"
                    placeholder="Enter security code (Try: 1234)"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-amber-500/50 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-amber-500 py-3 text-sm font-bold text-slate-950 hover:bg-amber-400 transition-all"
                  >
                    Verify & Claim
                  </button>
                  <button
                    type="button"
                    onClick={() => setClaimingItem(null)}
                    className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-400 hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
