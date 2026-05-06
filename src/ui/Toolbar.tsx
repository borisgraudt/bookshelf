'use client';

import { ACCENT, INK, MUTED } from './theme';

export function Toolbar() {
  return (
    <div style={{ position: 'fixed', top: 28, left: 28, color: INK, pointerEvents: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${ACCENT} 0%, #1f4ed8 100%)`,
            boxShadow: `0 0 0 1px rgba(0,0,0,0.04), 0 8px 24px ${ACCENT}55`,
          }}
        />
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 19,
              fontWeight: 600,
              letterSpacing: -0.4,
              lineHeight: 1.1,
              color: INK,
            }}
          >
            Bookshelf
          </h1>
          <div
            style={{
              fontSize: 10,
              color: MUTED,
              fontWeight: 600,
              letterSpacing: 1.4,
              marginTop: 4,
              textTransform: 'uppercase',
            }}
          >
            Spatial index · v0.1
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 11,
          color: MUTED,
          letterSpacing: 1.6,
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        drag · scroll · click a book
      </div>
    </div>
  );
}
