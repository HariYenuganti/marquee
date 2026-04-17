import { ImageResponse } from 'next/og';

// Marquee favicon — "M." in ember, on the warm charcoal base. Generated at
// request time via Next's built-in icon route so the palette stays in sync
// with the app's tokens (no separate asset to keep updated).

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Keep in lock-step with tailwind.config.ts / globals.css.
const BASE = '#0B0B0D';
const INK = '#F6F1E8';
const EMBER = '#EA8B4A';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: BASE,
          color: INK,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontStyle: 'italic',
          fontSize: 22,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          paddingBottom: 2,
        }}
      >
        M<span style={{ color: EMBER }}>.</span>
      </div>
    ),
    { ...size }
  );
}
