import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Preview } from '@react-email/preview';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';

type BookingConfirmationEmailProps = {
  name: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  quantity: number;
  bookingId: number;
};

export default function BookingConfirmationEmail({
  name,
  eventName,
  eventDate,
  eventLocation,
  quantity,
  bookingId,
}: BookingConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{`You're on the list for ${eventName} — booking #${bookingId}`}</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Wordmark */}
          <Section style={header}>
            <Text style={logo}>
              <span style={logoDot}>■</span>
              <span style={logoWord}>Marquee</span>
            </Text>
          </Section>

          {/* Eyebrow + headline */}
          <Text style={eyebrow}>You&rsquo;re on the list</Text>
          <Heading style={heading}>See you there.</Heading>

          <Text style={paragraph}>
            Hey {name}, your tickets for <strong style={strongInk}>{eventName}</strong>{' '}
            are confirmed. Show this email at the door.
          </Text>

          {/* Booking details card */}
          <Section style={detailsCard}>
            <Text style={detailLabel}>Event</Text>
            <Text style={detailValue}>{eventName}</Text>

            <Text style={detailLabel}>Date</Text>
            <Text style={detailValue}>{eventDate}</Text>

            <Text style={detailLabel}>Location</Text>
            <Text style={detailValue}>{eventLocation}</Text>

            <Text style={detailLabel}>Tickets</Text>
            <Text style={detailValue}>{quantity}</Text>

            <Hr style={divider} />

            <Text style={detailLabel}>Booking reference</Text>
            <Text style={bookingRef}>#{bookingId}</Text>
          </Section>

          <Text style={paragraph}>
            Doors open 30 minutes before showtime. If plans change, reply to
            this email and we&rsquo;ll sort it out.
          </Text>

          {/* Footer */}
          <Hr style={divider} />
          <Text style={footer}>
            Marquee — a hand-kept index of nights worth leaving the house for.
          </Text>
          <Text style={footerSmall}>
            This is an automated confirmation email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// -- styles -----------------------------------------------------------------

const EMBER = '#EA8B4A';
const BASE = '#0B0B0D';
const INK = '#F6F1E8';
const INK_70 = 'rgba(246, 241, 232, 0.70)';
const INK_45 = 'rgba(246, 241, 232, 0.45)';
const HAIRLINE = 'rgba(255, 255, 255, 0.10)';

const body = {
  backgroundColor: BASE,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  margin: 0,
  padding: 0,
};

const container = {
  margin: '0 auto',
  padding: '48px 24px',
  maxWidth: '520px',
};

const header = {
  marginBottom: '40px',
};

const logo = {
  display: 'inline-block',
  margin: 0,
  verticalAlign: 'middle',
};

const logoDot = {
  color: EMBER,
  fontSize: '18px',
  marginRight: '10px',
  letterSpacing: '-2px',
  verticalAlign: 'middle',
};

const logoWord = {
  color: INK,
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontStyle: 'italic' as const,
  fontSize: '22px',
  letterSpacing: '-0.5px',
  verticalAlign: 'middle',
};

const eyebrow = {
  color: EMBER,
  fontSize: '11px',
  textTransform: 'uppercase' as const,
  letterSpacing: '3px',
  margin: '0 0 12px',
};

const heading = {
  color: INK,
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontStyle: 'italic' as const,
  fontSize: '38px',
  fontWeight: 400 as const,
  lineHeight: '1.05',
  margin: '0 0 28px',
};

const paragraph = {
  color: INK_70,
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0 0 24px',
};

const strongInk = {
  color: INK,
  fontWeight: 600 as const,
};

const detailsCard = {
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  borderRadius: '12px',
  border: `1px solid ${HAIRLINE}`,
  padding: '26px',
  marginBottom: '28px',
};

const detailLabel = {
  color: INK_45,
  fontSize: '11px',
  textTransform: 'uppercase' as const,
  letterSpacing: '1.6px',
  margin: '0 0 4px',
};

const detailValue = {
  color: INK,
  fontSize: '16px',
  fontWeight: 500 as const,
  margin: '0 0 18px',
};

const bookingRef = {
  color: EMBER,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: '18px',
  fontWeight: 600 as const,
  margin: '0',
};

const divider = {
  borderColor: HAIRLINE,
  margin: '18px 0',
};

const footer = {
  color: INK_45,
  fontSize: '12px',
  margin: '0 0 6px',
};

const footerSmall = {
  color: 'rgba(246, 241, 232, 0.3)',
  fontSize: '11px',
  margin: '0',
};
