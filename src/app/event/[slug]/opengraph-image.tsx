import { ImageResponse } from 'next/og';
import { getEvent } from '@/lib/server-utils';

export const alt = 'Marquee event';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Marquee palette — kept in sync with tailwind.config / globals.css.
const BASE = '#0B0B0D';
const INK = '#F6F1E8';
const INK_55 = 'rgba(246, 241, 232, 0.55)';
const EMBER = '#EA8B4A';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);

  const longDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: BASE,
          color: INK,
          padding: '72px 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 26,
            fontStyle: 'italic',
            color: INK,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 3,
              background: EMBER,
            }}
          />
          Marquee
        </div>

        {/* Title + meta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: EMBER,
              fontFamily: 'system-ui, sans-serif',
              display: 'flex',
            }}
          >
            {longDate} &nbsp;·&nbsp; {event.city}
          </div>
          <div
            style={{
              fontSize: 80,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: INK,
              maxWidth: 980,
              display: 'flex',
            }}
          >
            {event.name}
          </div>
          <div
            style={{
              fontSize: 26,
              color: INK_55,
              fontFamily: 'system-ui, sans-serif',
              display: 'flex',
            }}
          >
            presented by&nbsp;
            <span style={{ fontStyle: 'italic', color: INK }}>
              {event.organizerName}
            </span>
          </div>
        </div>
      </div>
    )
  );
}
