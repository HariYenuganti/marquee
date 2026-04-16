import { ImageResponse } from 'next/og';
import { getEvent } from '@/lib/server-utils';

// Image metadata
export const alt = 'Evento Event';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#030712',
          color: 'white',
          padding: 60,
        }}
      >
        <h1 style={{ fontSize: 64, margin: 0 }}>{event.name}</h1>
        <p style={{ fontSize: 32, color: '#a4f839', margin: '16px 0' }}>
          {event.location}
        </p>
        <p style={{ fontSize: 24, opacity: 0.7 }}>
          {new Date(event.date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    )
  );
}
