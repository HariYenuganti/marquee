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
      <Preview>
        Your booking for {eventName} is confirmed!
      </Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>EVENTO</Text>
          </Section>

          {/* Checkmark */}
          <Section style={checkmarkSection}>
            <Text style={checkmark}>✓</Text>
          </Section>

          {/* Main content */}
          <Heading style={heading}>Booking confirmed!</Heading>
          <Text style={greeting}>Hey {name},</Text>
          <Text style={paragraph}>
            Your tickets for <strong>{eventName}</strong> have been confirmed.
            Here are your booking details:
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
            Show this email at the venue entrance. We hope you have an amazing
            time!
          </Text>

          {/* Footer */}
          <Hr style={divider} />
          <Text style={footer}>
            Evento - Find events around you
          </Text>
          <Text style={footerSmall}>
            This is an automated confirmation email. Please do not reply.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const body = {
  backgroundColor: '#030712',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '480px',
};

const header = {
  textAlign: 'center' as const,
  marginBottom: '32px',
};

const logo = {
  color: '#a4f839',
  fontSize: '24px',
  fontWeight: 'bold' as const,
  letterSpacing: '2px',
  margin: '0',
};

const checkmarkSection = {
  textAlign: 'center' as const,
  marginBottom: '16px',
};

const checkmark = {
  display: 'inline-block',
  width: '48px',
  height: '48px',
  lineHeight: '48px',
  borderRadius: '50%',
  backgroundColor: '#a4f839',
  color: '#030712',
  fontSize: '24px',
  fontWeight: 'bold' as const,
  textAlign: 'center' as const,
  margin: '0 auto',
};

const heading = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold' as const,
  textAlign: 'center' as const,
  margin: '0 0 24px',
};

const greeting = {
  color: '#ffffff',
  fontSize: '16px',
  margin: '0 0 8px',
};

const paragraph = {
  color: 'rgba(255, 255, 255, 0.75)',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0 0 24px',
};

const detailsCard = {
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '12px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '24px',
  marginBottom: '24px',
};

const detailLabel = {
  color: 'rgba(255, 255, 255, 0.5)',
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  margin: '0 0 4px',
};

const detailValue = {
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '500' as const,
  margin: '0 0 16px',
};

const bookingRef = {
  color: '#a4f839',
  fontSize: '20px',
  fontWeight: 'bold' as const,
  margin: '0',
};

const divider = {
  borderColor: 'rgba(255, 255, 255, 0.1)',
  margin: '16px 0',
};

const footer = {
  color: 'rgba(255, 255, 255, 0.5)',
  fontSize: '13px',
  textAlign: 'center' as const,
  margin: '0 0 4px',
};

const footerSmall = {
  color: 'rgba(255, 255, 255, 0.3)',
  fontSize: '11px',
  textAlign: 'center' as const,
  margin: '0',
};
