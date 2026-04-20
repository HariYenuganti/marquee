import { ImageResponse } from 'next/og';

// Marquee favicon — an ember square with a charcoal italic "M" inside. It's
// the header's ember-bullet + wordmark condensed into a single 32×32 mark, so
// the tab icon reads as the same brand at a glance.

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Keep in lock-step with tailwind.config.ts / globals.css.
const BASE = '#0B0B0D';
const EMBER = '#EA8B4A';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: EMBER,
          color: BASE,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: 22,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          paddingBottom: 2,
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
