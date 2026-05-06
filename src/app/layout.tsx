import type { ReactNode } from 'react';

export const metadata = { title: 'Bookshelf' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          height: '100vh',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: '#0a0a0a',
          background: '#fafafa',
          overflow: 'hidden',
          letterSpacing: '-0.01em',
        }}
      >
        {children}
      </body>
    </html>
  );
}
