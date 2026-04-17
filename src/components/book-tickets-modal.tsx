'use client';

import { createBooking } from '@/app/event/[slug]/actions';
import { bookingSchema } from '@/lib/validations';
import { useState, useEffect, useRef, useCallback } from 'react';

type BookTicketsModalProps = {
  eventId: number;
  eventName: string;
};

type ModalState = 'form' | 'submitting' | 'success';

const INPUT =
  'w-full h-11 rounded-lg bg-white/[0.04] border border-white/10 px-3.5 text-sm text-ink placeholder:text-ink/40 outline-none transition focus:border-ember/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-ember/25';

export default function BookTicketsModal({
  eventId,
  eventName,
}: BookTicketsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<ModalState>('form');
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingId, setBookingId] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setState('form');
    setError('');
    setQuantity(1);
    setName('');
    setEmail('');
    setBookingId(null);
  }, []);

  // Focus the first field + ESC to close + lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;

    nameInputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const parsed = bookingSchema.safeParse({ name, email, quantity, eventId });
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }

    setState('submitting');

    const result = await createBooking({ name, email, quantity, eventId });

    if (result.success) {
      setBookingId(result.bookingId);
      setState('success');
    } else {
      setError(result.error);
      setState('form');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ember px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#0B0B0D] transition hover:brightness-110 active:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-base"
      >
        Book tickets
        <span
          aria-hidden
          className="transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-base/80 backdrop-blur-md"
            aria-hidden
          />

          {/* Modal */}
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Book tickets for ${eventName}`}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#121216] p-7 shadow-2xl shadow-black/60"
          >
            {state === 'success' ? (
              // ----------------------------- Success
              <div className="py-2 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-ember/40 bg-ember/10">
                  <svg
                    className="h-6 w-6 text-ember"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="mb-2 text-[11px] uppercase tracking-[0.22em] text-ember">
                  You&rsquo;re on the list
                </div>
                <h2 className="font-display text-[28px] italic leading-tight text-ink">
                  See you there.
                </h2>
                <p className="mx-auto mt-4 max-w-xs text-sm text-ink/70">
                  {quantity} {quantity === 1 ? 'ticket' : 'tickets'} for{' '}
                  <span className="text-ink">{eventName}</span>
                </p>
                <p className="mt-3 text-xs text-ink/45">
                  Confirmation sent to {email}
                </p>
                <p className="mt-1 text-xs text-ink/35">
                  Booking #{bookingId}
                </p>
                <button
                  onClick={handleClose}
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-ember px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0B0B0D] transition hover:brightness-110"
                >
                  Done
                </button>
              </div>
            ) : (
              // ----------------------------- Form
              <>
                <div className="mb-1 flex items-start justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-ember">
                      Reserve
                    </div>
                    <h2 className="mt-1 font-display text-2xl italic text-ink">
                      Book tickets
                    </h2>
                  </div>
                  <button
                    onClick={handleClose}
                    className="rounded-md p-1 text-ink/45 transition hover:bg-white/[0.04] hover:text-ink"
                    aria-label="Close"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <p className="mt-4 mb-6 truncate text-sm text-ink/55">
                  {eventName}
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-ink/55">
                      Number of tickets
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setQuantity(num)}
                          className={
                            quantity === num
                              ? 'h-11 w-11 rounded-lg bg-ember text-[13px] font-semibold text-[#0B0B0D] transition'
                              : 'h-11 w-11 rounded-lg border border-white/10 bg-white/[0.02] text-[13px] text-ink/75 transition hover:border-ember/40 hover:text-ink'
                          }
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="booking-name"
                      className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-ink/55"
                    >
                      Full name
                    </label>
                    <input
                      ref={nameInputRef}
                      id="booking-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className={INPUT}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="booking-email"
                      className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-ink/55"
                    >
                      Email
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className={INPUT}
                    />
                  </div>

                  {error && (
                    <p
                      className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ember px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#0B0B0D] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {state === 'submitting' ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Confirming…
                      </>
                    ) : (
                      <>
                        Confirm {quantity}{' '}
                        {quantity === 1 ? 'ticket' : 'tickets'}
                        <span aria-hidden>→</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
