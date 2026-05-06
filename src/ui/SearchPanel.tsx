'use client';

import { useMemo, useState } from 'react';
import { useBookshelf } from '@/features/bookshelf/model';
import { searchBooks } from '@/features/search';
import { ACCENT, CARD, INK, LINE, MUTED } from './theme';

export function SearchPanel() {
  const { books, select } = useBookshelf();
  const [q, setQ] = useState('');
  const hits = useMemo(() => searchBooks(books, q), [books, q]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 28,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 520,
        maxWidth: 'calc(100vw - 48px)',
      }}
    >
      {q && hits.length > 0 && (
        <div
          style={{
            ...CARD,
            marginBottom: 10,
            padding: 6,
            maxHeight: 280,
            overflowY: 'auto',
            animation: 'bs-rise 180ms ease-out',
          }}
        >
          {hits.map((h) => (
            <button
              key={h.book.id}
              onClick={() => select(h.book.id)}
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                gap: 12,
                padding: '11px 12px',
                background: 'transparent',
                border: 'none',
                borderRadius: 12,
                cursor: 'pointer',
                textAlign: 'left',
                color: INK,
                transition: 'background 140ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f7')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div
                style={{
                  width: 6,
                  height: 30,
                  borderRadius: 3,
                  background: h.book.color,
                  boxShadow: `0 0 8px ${h.book.color}66`,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: INK,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {h.book.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: MUTED,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginTop: 2,
                  }}
                >
                  {h.book.author || '—'}
                </div>
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: MUTED,
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                S{h.book.position.shelf}·{h.book.position.row === 0 ? 'F' : 'B'}·{h.book.position.index}
              </div>
            </button>
          ))}
        </div>
      )}
      {q && hits.length === 0 && (
        <div
          style={{
            ...CARD,
            marginBottom: 10,
            padding: '14px 18px',
            fontSize: 13,
            color: MUTED,
          }}
        >
          Nothing found for "{q}"
        </div>
      )}
      <div
        style={{
          ...CARD,
          padding: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderRadius: 999,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: ACCENT,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </div>
        <input
          data-search-input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search title, author, genre…"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: 14,
            color: INK,
            fontFamily: 'inherit',
            padding: '8px 0',
          }}
        />
        {q ? (
          <button
            onClick={() => setQ('')}
            style={{
              background: ACCENT,
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              padding: '8px 16px',
              borderRadius: 999,
              letterSpacing: 0.4,
              textTransform: 'uppercase',
              boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 6px 18px ${ACCENT}55`,
            }}
          >
            clear
          </button>
        ) : (
          <div
            style={{
              fontSize: 10,
              color: MUTED,
              border: `1px solid ${LINE}`,
              padding: '5px 9px',
              borderRadius: 6,
              fontWeight: 600,
              letterSpacing: 0.6,
              marginRight: 8,
            }}
          >
            ⌘K
          </div>
        )}
      </div>
      <style>{`
        @keyframes bs-rise {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input::placeholder { color: ${MUTED}; }
      `}</style>
    </div>
  );
}
