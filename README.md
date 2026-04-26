

# Bookshelf

**Spatial digital twin system** for mapping a physical book collection into a structured 3D environment.

The system models a bookshelf as a deterministic spatial grid and provides powerful search, visualization, and QR-based navigation between physical and digital representations.

## Overview

Bookshelf is a spatial indexing system that transforms a physical bookshelf into a structured digital twin.

Each book is treated as a spatial entity with deterministic coordinates:

- **Shelf index** — vertical grouping (shelf number)
- **Row index** — horizontal grouping within a shelf
- **Position index** — slot within a specific row

The system supports:

- Deterministic book lookup (`book → position`)
- Reverse lookup (`position → book`)
- QR-based entry points for shelf-level navigation
- Interactive 3D visualization of the spatial structure

The design assumes **manual consistency** of the physical collection (books are returned to their correct positions). This approach deliberately avoids the need for complex hardware tracking systems (RFID, cameras, etc.).

## Tech Stack

- **TypeScript**
- **Next.js** (App Router)
- **React Three Fiber** + **@react-three/drei** (3D rendering)
- **Zustand** (state management)
- **JSON-based persistence** (for MVP)
- **Tailwind CSS** (UI styling)

No backend is required for the initial version. The architecture is designed to be **backend-optional**.

## System Model

The bookshelf is modeled as a discrete 3D grid:

- **Shelf** — top-level container
- **Row** — horizontal partition on a shelf
- **Index** — position within a row

Each book is uniquely mapped to a coordinate:

```ts
Book → Position { shelf: number; row: number; index: number }
```

This creates a deterministic spatial index that enables fast, in-memory lookups.

## Project Structure

```bash
bookshelf/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── shelf/[id]/
│   │   │   └── page.tsx
│   │   └── book/[id]/
│   │       └── page.tsx
│   │
│   ├── features/
│   │   ├── bookshelf/
│   │   │   ├── model.ts
│   │   │   ├── service.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── search/
│   │   │   ├── engine.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── qr/
│   │   │   ├── resolve.ts
│   │   │   └── index.ts
│   │   │
│   │   └── visualization/
│   │       ├── scene.tsx
│   │       ├── shelf.tsx
│   │       ├── book.tsx
│   │       └── camera.ts
│   │
│   ├── core/
│   │   ├── entities/
│   │   │   ├── Book.ts
│   │   │   ├── Shelf.ts
│   │   │   └── Position.ts
│   │   │
│   │   ├── errors/
│   │   └── invariants.ts
│   │
│   ├── infrastructure/
│   │   ├── storage/
│   │   │   └── json.repository.ts
│   │   └── logger.ts
│   │
│   ├── shared/
│   │   ├── types/
│   │   ├── utils/
│   │   └── constants/
│   │
│   └── index.ts
│
├── data/
│   ├── books.json
│   └── shelves.json
│
├── scripts/
│   ├── seed.ts
│   └── generate-qr.ts
│
├── docs/
│   └── architecture.md
│
├── package.json
├── tsconfig.json
├── eslint.config.js
├── prettier.config.js
└── README.md
```

## Data Model

```ts
interface Book {
  id: string;
  title: string;
  author?: string;
  isbn?: string;
  position: {
    shelf: number;
    row: number;
    index: number;
  };
  // Optional metadata: year, genre, tags, notes, etc.
}
```

## QR System

Each shelf has a deterministic URL:

```
/shelf/:id
```

QR codes serve as physical entry points into the digital system. Scanning a QR code resolves the corresponding shelf context and loads:

- 3D visualization of the shelf
- List of books on that shelf
- Positional mapping and navigation

## Features

- Deterministic spatial indexing of books
- Interactive 3D bookshelf visualization
- Full-text and structured search over book metadata
- QR-based navigation to physical shelves
- Manual consistency model (no hardware dependencies)

## Design Principles

- Physical consistency is maintained manually by the user
- Spatial state is a deterministic model, not real-time sensor data
- Clear separation of business logic, UI, and rendering layers
- Emphasis on simplicity, reliability, and long-term extensibility
