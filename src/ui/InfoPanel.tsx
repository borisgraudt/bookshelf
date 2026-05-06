'use client';

import { useBookshelf } from '@/features/bookshelf/model';
import { ACCENT, CARD, INK, LINE, MUTED } from './theme';

export function InfoPanel() {
  const { books, selectedId, select } = useBookshelf();
  if (!selectedId) return null;
  const book = books.find((b) => b.id === selectedId);
  if (!book) return null;

  return (
    <div
      style={{
        ...CARD,
        position: 'fixed',
        right: 28,
        top: 28,
        width: 340,
        padding: 24,
        color: INK,
        animation: 'bs-slide-in 220ms cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: 1.6,
              textTransform: 'uppercase',
              color: ACCENT,
              marginBottom: 12,
            }}
          >
            ● Book details
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: -0.6,
              lineHeight: 1.15,
              color: INK,
            }}
          >
            {book.title}
          </h2>
        </div>
        <button
          onClick={() => select(null)}
          aria-label="Close"
          style={{
            background: '#f5f5f7',
            color: INK,
            border: `1px solid ${LINE}`,
            borderRadius: 10,
            cursor: 'pointer',
            fontSize: 14,
            width: 30,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 140ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ececef';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f5f5f7';
          }}
        >
          ×
        </button>
      </div>
      <p style={{ margin: '14px 0 0', fontSize: 14, color: MUTED }}>{book.author || '—'}</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
        {book.genre && (
          <span
            style={{
              fontSize: 11,
              padding: '6px 12px',
              borderRadius: 999,
              background: `${ACCENT}14`,
              color: ACCENT,
              border: `1px solid ${ACCENT}33`,
              fontWeight: 600,
              letterSpacing: 0.4,
              textTransform: 'uppercase',
            }}
          >
            {book.genre}
          </span>
        )}
        {book.year != null && (
          <span
            style={{
              fontSize: 11,
              padding: '6px 12px',
              borderRadius: 999,
              background: '#f5f5f7',
              color: INK,
              border: `1px solid ${LINE}`,
              fontWeight: 600,
              letterSpacing: 0.4,
            }}
          >
            {book.year}
          </span>
        )}
      </div>
      <div
        style={{
          marginTop: 22,
          padding: 16,
          borderRadius: 14,
          background: '#fafafa',
          border: `1px solid ${LINE}`,
          fontSize: 13,
        }}
      >
        <div
          style={{
            color: MUTED,
            fontSize: 10,
            fontWeight: 600,
            marginBottom: 8,
            letterSpacing: 1.4,
            textTransform: 'uppercase',
          }}
        >
          Position
        </div>
        <div
          style={{
            color: INK,
            fontWeight: 500,
            fontVariantNumeric: 'tabular-nums',
            fontSize: 14,
          }}
        >
          Shelf {book.position.shelf} · {book.position.row === 0 ? 'Front' : 'Back'} row · #
          {book.position.index}
        </div>
      </div>
      <style>{`
        @keyframes bs-slide-in {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
