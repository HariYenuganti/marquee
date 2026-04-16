import { z } from 'zod';
import { EventCategory } from '@prisma/client';

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

export const EVENT_CATEGORIES = [
  'MUSIC',
  'FOOD',
  'TECH',
  'ART',
  'WELLNESS',
  'COMEDY',
  'FASHION',
  'FILM',
  'WORKSHOP',
] as const satisfies readonly EventCategory[];

const categoryEnum = z.enum(EVENT_CATEGORIES);

const optionalTrimmedString = z
  .string()
  .trim()
  .min(1)
  .optional()
  .catch(undefined);

const optionalDate = z
  .string()
  .optional()
  .transform((val) => (val ? new Date(val) : undefined))
  .refine((val) => val === undefined || !isNaN(val.getTime()), {
    message: 'Invalid date',
  })
  .catch(undefined);

export const searchEventsParamsSchema = z.object({
  q: optionalTrimmedString,
  city: optionalTrimmedString,
  category: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(',')
            .map((c) => c.trim().toUpperCase())
            .filter((c): c is EventCategory =>
              (EVENT_CATEGORIES as readonly string[]).includes(c)
            )
        : []
    )
    .pipe(z.array(categoryEnum)),
  from: optionalDate,
  to: optionalDate,
  page: z.coerce.number().int().positive().catch(1).default(1),
});

export type SearchEventsParams = z.infer<typeof searchEventsParamsSchema>;
