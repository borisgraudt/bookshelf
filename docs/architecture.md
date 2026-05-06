# Architecture

## Layers

- **`src/app`** — Next.js App Router entry. Server components compose client features.
- **`src/features/*`** — Feature slices. Each is self-contained (UI, model, service, types).
  - `bookshelf` — 3D scene, zustand store, layout math.
  - `search` — Token-scored matching over book metadata.
  - `qr` — Payload encoding + URL generation for physical labels.
- **`src/core`** — Pure domain primitives (`entities`, `valueObjects`, `errors`). No I/O.
- **`src/infrastructure`** — Adapters: `logger`, `db/jsonRepository`. The boundary to the outside.
- **`config/`** — Static configuration (`env`, `app`, `logger`).
- **`scripts/`** — One-shot CLI tasks (seed data, generate QR index).
- **`data/`** — JSON fixtures (`books.json`, `shelves.json`).

## Rules

1. `core` depends on nothing.
2. `features` may use `core` and `infrastructure`, never each other's internals — only public `index.ts` exports.
3. `infrastructure` is the only place that reads/writes files, sockets, processes.
4. `app` orchestrates features — it does not contain domain logic.

## Frontend

The Three.js scene lives in `features/bookshelf`. Rendering is React Three Fiber; controls are drei's `OrbitControls`. UI overlays (`Toolbar`, `InfoPanel`, `SearchPanel`) are plain React with inline styles using the shared `theme.ts` palette.

Selection state is global (zustand). Keyboard navigation (`Hotkeys`) translates arrow keys → `navigate(direction)` against the same store.

## Search

`features/search/engine.ts` is a deterministic token scorer (title × 3, author × 2, presence × 1). `service.ts` wraps it with genre/author filters for non-text queries.
