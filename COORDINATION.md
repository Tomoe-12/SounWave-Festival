# SoundWave Festival App - Coordination Plan

## 1. Agent Design & Task Allocation

We deploy 3 parallel AI subagents within Antigravity to simultaneously build the five required features under human CTO/PM supervision.

- **Subagent 1 (Frontend & Schedule):**
  - Path: `/src/app/lineup/` and `/src/app/food/`
  - Responsibilities: Timeline views, stage filtering, vendor dietary selectors.

- **Subagent 2 (Security & Logic):**
  - Path: `/src/app/tickets/`
  - Responsibilities: Camera/Webcam interaction, Mock local database lookup for QR validation.

- **Subagent 3 (Spatial & Forms):**
  - Path: `/src/app/map/` and `/src/app/lost-found/`
  - Responsibilities: Interactive SVG layout deployment and standard input forms tracking.

## 2. Shared Data and Component Contracts

- Data schemas are enforced universally using configurations in `src/types/index.ts`.
- State storage utilizes global web browser `localStorage` as a unified mock database layer.

## 3. Branching and Merging Sequence

- Direct conflicts are avoided by enforcing functional directory isolation.
- Integration sequence upon parallel feature completion:
  1. Merge Subagent 1 (Schedule Presentation)
  2. Merge Subagent 3 (Spatial Layouts)
  3. Merge Subagent 2 (Verification Backend Mechanics)
