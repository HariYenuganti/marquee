'use server';

import prisma from '@/lib/db';
import { bookingSchema, BookingInput } from '@/lib/validations';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import BookingConfirmationEmail from '@/emails/booking-confirmation';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

type BookingResult =
  | { success: true; bookingId: number }
  | { success: false; error: string };

export async function createBooking(
  input: BookingInput
): Promise<BookingResult> {
  // Validate input on the server
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }

  try {
    // Verify the event exists
    const event = await prisma.eventoEvent.findUnique({
      where: { id: parsed.data.eventId },
    });

    if (!event) {
      return { success: false, error: 'Event not found' };
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        quantity: parsed.data.quantity,
        eventId: parsed.data.eventId,
      },
    });

    // Send confirmation email — don't fail the booking if email fails
    const resend = getResend();
    if (resend) {
      try {
        const html = await render(
          BookingConfirmationEmail({
            name: parsed.data.name,
            eventName: event.name,
            eventDate: new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            }),
            eventLocation: event.location,
            quantity: parsed.data.quantity,
            bookingId: booking.id,
          })
        );
        await resend.emails.send({
          from: 'Evento <onboarding@resend.dev>',
          to: parsed.data.email,
          subject: `Booking confirmed: ${event.name}`,
          html,
        });
      } catch (err) {
        console.error('Email send failed:', err);
      }
    }

    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error('Booking creation failed:', error);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}
