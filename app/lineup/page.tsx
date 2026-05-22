"use client";

import { useState } from "react";
import { Artist } from "@/src/types";

// Premium mock data of artists
const mockArtists: Artist[] = [
  {
    id: "a-1",
    name: "Alok & The Waves",
    stage: "Main Stage",
    startTime: "16:00",
    endTime: "17:30",
    bio: "Pioneering the modern melodic techno revolution in Southeast Asia. Alok brings massive soundscapes combined with deep tribal beats."
  },
  {
    id: "a-2",
    name: "Neon Horizon",
    stage: "Neon Jungle",
    startTime: "17:00",
    endTime: "18:30",
    bio: "Synthesized sounds from the grid. Neon Horizon takes you on a high-speed cyberpunk dream-synth journey under neon arches."
  },
  {
    id: "a-3",
    name: "Sub Bass Junkies",
    stage: "Bass Arena",
    startTime: "18:00",
    endTime: "19:30",
    bio: "Heavy, low-frequency pressure. Known for chest-rattling sub-bass drops that shake the stadium foundations."
  },
  {
    id: "a-4",
    name: "Amara Lin",
    stage: "Main Stage",
    startTime: "19:00",
    endTime: "20:30",
    bio: "Vocalist powerhouse blending acoustic melodies with high-energy electronic backing tracks. A festival crowd favorite."
  },
  {
    id: "a-5",
    name: "Viper Division",
    stage: "Bass Arena",
    startTime: "20:00",
    endTime: "21:30",
    bio: "Hard drum and bass pioneers. Lightning-fast tempos mixed with sharp synthetic stabs and breakbeats."
  },
  {
    id: "a-6",
    name: "Luminate Glow",
    stage: "Neon Jungle",
    startTime: "21:00",
    endTime: "22:30",
    bio: "Immersive audio-visual performance art. Their sets are synchronized with high-tech laser coordinates and holographic models."
  },
  {
    id: "a-7",
    name: "Cyber Pulse",
    stage: "Main Stage",
    startTime: "22:00",
    endTime: "00:00",
    bio: "The ultimate headline act. Blends heavy industrial beats with melodic synth progressions for a phenomenal multi-stage closing show."
  }
];

// Extra details for the modal
const artistTracks: Record<string, string[]> = {
  "a-1": ["Ocean Drift", "Melodic Sunset", "Deep Horizon"],
  "a-2": ["Grid Runner", "Vector Stream", "Synth Heart"],
  "a-3": ["Sub-Octave", "Rupture", "Ground Shake"],
  "a-4": ["Voices In The Wind", "Ethereal Echoes", "Rising Tide"],
  "a-5": ["Reaper", "Sonic Boom", "Velocity"],
  "a-6": ["Hologram Dream", "Reflections", "Spectrum Colors"],
  "a-7": ["Cybernetic Soul", "Midnight Override", "System Reboot"]
};

export default function LineupPage() {
  const [selectedStage, setSelectedStage] = useState<string>("All");
  const [selectedDay, setSelectedDay] = useState<string>("Day 1");
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [mySchedule, setMySchedule] = useState<string[]>([]);

  // Filtered artists based on stage filter
  // (In a real app, Days would also filter, but we simulate interactive shifts nicely!)
  const filteredArtists = mockArtists.filter((artist) => {
    const stageMatch = selectedStage === "All" || artist.stage === selectedStage;
    // Simulate day changes by filtering odd/even id just for variation
    const dayMatch =
      selectedDay === "Day 1" ||
      (selectedDay === "Day 2" && artist.id !== "a-1" && artist.id !== "a-7") ||
      (selectedDay === "Day 3" && artist.id !== "a-2" && artist.id !== "a-4");
    return stageMatch && dayMatch;
  });

  const toggleMySchedule = (artistId: string) => {
    setMySchedule((prev) =>
      prev.includes(artistId)
        ? prev.filter((id) => id !== artistId)
        : [...prev, artistId]
    );
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Main Stage":
        return "text-cyan-400 border-cyan-500/30 bg-cyan-500/5";
      case "Neon Jungle":
        return "text-purple-400 border-purple-500/30 bg-purple-500/5";
      case "Bass Arena":
        return "text-pink-400 border-pink-500/30 bg-pink-500/5";
      default:
        return "text-slate-400 border-slate-700 bg-slate-800/20";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent sm:text-5xl">
            🔊 FESTIVAL LINEUP
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            Customize your schedule across our three multi-sensory stages.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="mb-8 flex flex-col gap-4 rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          {/* Day Filters */}
          <div className="flex gap-2">
            {["Day 1", "Day 2", "Day 3"].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                  selectedDay === day
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-750"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Stage Filters */}
          <div className="flex flex-wrap gap-2">
            {["All", "Main Stage", "Neon Jungle", "Bass Arena"].map((stage) => (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold border transition-all ${
                  selectedStage === stage
                    ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                    : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700"
                }`}
              >
                {stage === "All" ? "All Stages" : stage}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule List */}
        <div className="relative space-y-6 border-l-2 border-slate-800/60 pl-6 ml-4">
          {filteredArtists.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-900/10">
              <p className="text-slate-500">No artists match your filters for this day.</p>
            </div>
          ) : (
            filteredArtists.map((artist) => {
              const inSchedule = mySchedule.includes(artist.id);
              return (
                <div
                  key={artist.id}
                  onClick={() => setSelectedArtist(artist)}
                  className="group relative rounded-xl border border-slate-800/60 bg-slate-900/30 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:border-cyan-500/30 hover:bg-slate-900/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.05)] cursor-pointer"
                >
                  {/* Timeline Glow Indicator */}
                  <span className="absolute -left-[33px] top-8 h-4 w-4 rounded-full border-2 border-slate-950 bg-slate-800 transition-colors group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(6,182,212,0.8)]" />

                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      {/* Time and Stage row */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-bold tracking-wider text-cyan-400">
                          ⏱️ {artist.startTime} - {artist.endTime}
                        </span>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStageColor(
                            artist.stage
                          )}`}
                        >
                          {artist.stage}
                        </span>
                        {inSchedule && (
                          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 text-xs font-bold shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                            ★ Saved
                          </span>
                        )}
                      </div>
                      {/* Artist Name */}
                      <h3 className="mt-2 text-2xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                        {artist.name}
                      </h3>
                      {/* Teaser */}
                      <p className="mt-2 text-slate-400 text-sm max-w-2xl line-clamp-2">
                        {artist.bio}
                      </p>
                    </div>

                    {/* View Details Button */}
                    <div className="self-end sm:self-center">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-300 hover:border-cyan-500/30 hover:text-white transition-all">
                        Bio & Tracks →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Interactive Artist Detail Modal */}
        {selectedArtist && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
            <div
              className="relative w-full max-w-lg rounded-2xl border border-cyan-500/20 bg-slate-900 p-8 shadow-2xl shadow-cyan-500/5 animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedArtist(null)}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Stage Badge */}
              <span
                className={`inline-block rounded-full border px-3 py-1 text-xs font-bold tracking-wider mb-4 ${getStageColor(
                  selectedArtist.stage
                )}`}
              >
                {selectedArtist.stage}
              </span>

              {/* Artist Name & Time */}
              <h2 className="text-3xl font-black text-white">{selectedArtist.name}</h2>
              <p className="mt-1 text-sm font-bold text-cyan-400">
                ⏱️ Set Time: {selectedArtist.startTime} - {selectedArtist.endTime}
              </p>

              {/* Bio */}
              <div className="mt-6">
                <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase">About</h4>
                <p className="mt-2 text-slate-300 text-sm leading-relaxed">{selectedArtist.bio}</p>
              </div>

              {/* Popular Tracks */}
              <div className="mt-6">
                <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase">Popular Tracks</h4>
                <div className="mt-2 space-y-1.5">
                  {(artistTracks[selectedArtist.id] || []).map((track, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg bg-slate-950/40 px-3 py-2 text-sm border border-slate-800/40 text-slate-300"
                    >
                      <span className="font-bold text-cyan-400/80">0{i + 1}</span>
                      <span className="flex-1 font-medium">{track}</span>
                      <span className="text-xs text-slate-500">▶ Play Preview</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule Add/Remove CTA */}
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => toggleMySchedule(selectedArtist.id)}
                  className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold tracking-wide transition-all ${
                    mySchedule.includes(selectedArtist.id)
                      ? "bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20"
                      : "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02]"
                  }`}
                >
                  {mySchedule.includes(selectedArtist.id)
                    ? "★ Remove from My Schedule"
                    : "★ Add to My Schedule"}
                </button>
                <button
                  onClick={() => setSelectedArtist(null)}
                  className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-400 hover:text-white transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
