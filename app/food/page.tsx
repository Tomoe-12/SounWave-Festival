"use client";

import { useState, useMemo } from "react";
import { Vendor } from "@/src/types";

// Premium mock data of food vendors
const mockVendors: Vendor[] = [
  {
    id: "v-1",
    name: "Neon Noodle Bar",
    menu: [
      { item: "Shoyu Cyber Ramen", price: 14 },
      { item: "Vegan Gyoza (5pcs)", price: 8 },
      { item: "Spicy Tofu Udon", price: 13 }
    ],
    waitTime: 8,
    dietary: ["vegan"]
  },
  {
    id: "v-2",
    name: "Gluten-Free Bass Burgers",
    menu: [
      { item: "The Bassline Double Burger", price: 16 },
      { item: "Sweet Potato Waffle Fries", price: 6 },
      { item: "Hala-Glow Chicken Burger", price: 14 }
    ],
    waitTime: 28,
    dietary: ["gluten-free", "halal"]
  },
  {
    id: "v-3",
    name: "Taco Matrix",
    menu: [
      { item: "Jackfruit Al Pastor Tacos (3x)", price: 11 },
      { item: "Crispy Avocado Quesadilla", price: 12 },
      { item: "Churro Fries w/ Chocolate Sauce", price: 7 }
    ],
    waitTime: 18,
    dietary: ["vegan", "gluten-free"]
  },
  {
    id: "v-4",
    name: "Vibe Kebab Grid",
    menu: [
      { item: "Lamb Doner Wrap", price: 15 },
      { item: "Falafel & Hummus Platter", price: 12 },
      { item: "Halloumi Fries w/ Pomegranate", price: 8 }
    ],
    waitTime: 5,
    dietary: ["halal", "vegan"]
  },
  {
    id: "v-5",
    name: "Sweet Wave Desserts",
    menu: [
      { item: "Acai Glow Bowl", price: 10 },
      { item: "Matcha Lava Cake (GF)", price: 9 },
      { item: "Coconut Cream Waffles", price: 11 }
    ],
    waitTime: 12,
    dietary: ["gluten-free", "vegan"]
  },
  {
    id: "v-6",
    name: "Electro Tikka Stalls",
    menu: [
      { item: "Butter Chicken Rice Box", price: 14 },
      { item: "Paneer Tikka Roll", price: 12 },
      { item: "Masala Fries (Large)", price: 6 }
    ],
    waitTime: 32,
    dietary: ["halal"]
  }
];

export default function FoodPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [sortByWaitTime, setSortByWaitTime] = useState<boolean>(false);

  // Filters and sorts the vendors dynamically using useMemo
  const processedVendors = useMemo(() => {
    let result = [...mockVendors];

    // Filter by dietary choice
    if (activeFilter !== "All") {
      const lowerFilter = activeFilter.toLowerCase() as "vegan" | "gluten-free" | "halal";
      result = result.filter((vendor) => vendor.dietary.includes(lowerFilter));
    }

    // Sort by wait time if activated
    if (sortByWaitTime) {
      result.sort((a, b) => a.waitTime - b.waitTime);
    }

    return result;
  }, [activeFilter, sortByWaitTime]);

  const getWaitBadgeColor = (minutes: number) => {
    if (minutes < 10) {
      return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
    } else if (minutes <= 25) {
      return "bg-amber-500/10 border-amber-500/20 text-amber-400";
    } else {
      return "bg-rose-500/10 border-rose-500/20 text-rose-400";
    }
  };

  const getDietaryLabel = (diet: string) => {
    switch (diet) {
      case "vegan":
        return { text: "🌱 Vegan", class: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" };
      case "gluten-free":
        return { text: "🌾 Gluten-Free", class: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" };
      case "halal":
        return { text: "☪️ Halal", class: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" };
      default:
        return { text: diet, class: "bg-slate-800 text-slate-400" };
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent sm:text-5xl">
            🍔 FOOD COURT DIRECTORY
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            Fuel up between sets with premium culinary offerings from around the world.
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="mb-8 flex flex-col gap-4 rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          {/* Category/Dietary Filters */}
          <div className="flex flex-wrap gap-2">
            {["All", "Vegan", "Gluten-Free", "Halal"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all border ${
                  activeFilter === filter
                    ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                    : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700"
                }`}
              >
                {filter === "All" ? "All Options" : filter}
              </button>
            ))}
          </div>

          {/* Wait Time Sorting Toggle */}
          <div>
            <button
              onClick={() => setSortByWaitTime(!sortByWaitTime)}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-all ${
                sortByWaitTime
                  ? "border-purple-500/50 bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                  : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700"
              }`}
            >
              ⏱️ Sort by Shortest Wait
            </button>
          </div>
        </div>

        {/* Vendors Grid */}
        {processedVendors.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl bg-slate-900/10">
            <p className="text-slate-500 text-lg">No vendors match your dietary preferences.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processedVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/30 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_4px_30px_rgba(6,182,212,0.06)]"
              >
                <div>
                  {/* Vendor Title & Wait Time Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                      {vendor.name}
                    </h3>
                    <span
                      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${getWaitBadgeColor(
                        vendor.waitTime
                      )}`}
                    >
                      ⏱️ {vendor.waitTime}m wait
                    </span>
                  </div>

                  {/* Dietary Badges */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {vendor.dietary.map((diet) => {
                      const badge = getDietaryLabel(diet);
                      return (
                        <span key={diet} className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${badge.class}`}>
                          {badge.text}
                        </span>
                      );
                    })}
                  </div>

                  {/* Menu Items */}
                  <div className="mt-6 border-t border-slate-800/50 pt-4">
                    <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-3">
                      Popular Menu
                    </h4>
                    <ul className="space-y-3">
                      {vendor.menu.map((menuItem, idx) => (
                        <li key={idx} className="flex justify-between items-center text-sm">
                          <span className="font-semibold text-slate-200">{menuItem.item}</span>
                          <span className="font-mono text-cyan-400 font-bold">${menuItem.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Simulated Order Button */}
                <div className="mt-6">
                  <button
                    onClick={() =>
                      alert(`Mock Order Placed! Head to ${vendor.name} in approx. ${vendor.waitTime} minutes!`)
                    }
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 py-2.5 text-xs font-bold text-slate-300 transition-all hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 hover:text-white hover:border-transparent hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  >
                    ⚡ Fast-Pass Order Mock
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
