'use server';

import prisma from '@/lib/db';
import { bookingSchema, BookingInput } from '@/lib/validations';

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

    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error('Booking creation failed:', error);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}
