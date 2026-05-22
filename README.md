# 🔊 SoundWave Music Festival App

Welcome to the **SoundWave Music Festival** Next.js application! Built under a strict 48-hour deadline using an advanced multi-agent orchestration pattern inside the Antigravity workspace, this application coordinates real-time event analytics, schedule planners, interactive SVG coordinates, security gate validations, and security claims.

---

## 🚀 App Modules

The application is structured into 6 highly responsive, dark cyberpunk/glassmorphism feature routes:

1.  **Operations Dashboard (`/`):** Home operations screen featuring a live-ticking festival countdown timer and real-time statistics stream synced to client-side localStorage.
2.  **Lineup & Schedule (`/lineup`):** Stage schedules and chronological timelines. Supports bookmarking sets to a custom list and launching detail previews.
3.  **Food Court Directory (`/food`):** Vendor directory with wait-time indicators, dietary category filters, wait-time sorting, and simulated fast-pass ordering.
4.  **Security Gate Scanner (`/tickets`):** simulated QR code scanning gate stream with verification logs and gate check-in statistics.
5.  **Interactive Venue Map (`/map`):** Interactive SVG landmark vector coordinate layout with live telemetry overlays for stage scheduling, medical services, and entrance gates.
6.  **Lost & Found Register (`/lost-found`):** A secure directory to report misplaced items and verify/claim found belongings using security passcode keys.

---

## 🛠️ Project Setup & Installation

### Prereqs
Ensure you have Node.js (v18+) and npm installed.

### Setup
Clone the repository, install dependencies, and start the development server:
```bash
# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

### Production Build Compile
Run a production build check to ensure zero TypeScript, linting, or styling compilation failures:
```bash
npm run build
```

---

## 📄 Deliverable Documentation

This project was built step-by-step using parallel agent workflows. Refer to the corresponding logs in the root directory:

*   **Step 1 Setup:** [COORDINATION.md](./COORDINATION.md) (Architecture design, data contracts, and task allocation).
*   **Step 2 & 3 Process:** [MERGE_LOG.md](./MERGE_LOG.md) (Parallel subagent sessions tracker, quota limit interventions, and conflict resolution logs).
*   **Step 4 Takeaways:** [RETROSPECTIVE.md](./RETROSPECTIVE.md) (Technical orchestration recap, takeaways, and lessons learned).

