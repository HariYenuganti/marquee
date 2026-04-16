import { z } from 'zod';

export const bookingSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  quantity: z
    .number()
    .int()
    .min(1, 'Select at least 1 ticket')
    .max(5, 'Maximum 5 tickets per booking'),
  eventId: z.number().int().positive(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
