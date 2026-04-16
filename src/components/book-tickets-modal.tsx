'use client';

import { createBooking } from '@/app/event/[slug]/actions';
import { bookingSchema } from '@/lib/validations';
import { useState, useEffect, useRef, useCallback } from 'react';

type BookTicketsModalProps = {
  eventId: number;
  eventName: string;
};

type ModalState = 'form' | 'submitting' | 'success';

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

  // Focus trap + escape to close
  useEffect(() => {
    if (!isOpen) return;

    nameInputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
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

    // Client-side validation
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
        className="bg-white/20 text-lg capitalize bg-blur mt-5 lg:mt-auto w-[95vw] rounded-md border-white/10 border-2 sm:w-full py-2 state-effects"
      >
        Book tickets
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Book tickets for ${eventName}`}
            className="relative bg-gray-900 border border-white/10 rounded-xl w-full max-w-md p-6 shadow-2xl"
          >
            {state === 'success' ? (
              // Success state
              <div className="text-center py-4">
                <div className="text-5xl mb-4">
                  <svg
                    className="w-16 h-16 mx-auto text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-2">
                  Booking confirmed!
                </h2>
                <p className="text-white/75 mb-1">
                  {quantity} {quantity === 1 ? 'ticket' : 'tickets'} for{' '}
                  <span className="text-white font-medium">{eventName}</span>
                </p>
                <p className="text-white/50 text-sm mb-1">
                  Confirmation sent to {email}
                </p>
                <p className="text-white/40 text-xs mb-6">
                  Booking #{bookingId}
                </p>
                <button
                  onClick={handleClose}
                  className="bg-accent text-gray-900 font-semibold px-6 py-2 rounded-md hover:bg-accent/90 transition"
                >
                  Done
                </button>
              </div>
            ) : (
              // Form state
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Book tickets</h2>
                  <button
                    onClick={handleClose}
                    className="text-white/50 hover:text-white transition"
                    aria-label="Close modal"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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

                <p className="text-white/60 text-sm mb-6">{eventName}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Quantity selector */}
                  <div>
                    <label className="block text-sm text-white/75 mb-2">
                      Number of tickets
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setQuantity(num)}
                          className={`w-10 h-10 rounded-md text-sm font-medium transition ${
                            quantity === num
                              ? 'bg-accent text-gray-900'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="booking-name"
                      className="block text-sm text-white/75 mb-2"
                    >
                      Full name
                    </label>
                    <input
                      ref={nameInputRef}
                      id="booking-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-2 rounded-md bg-white/[7%] border border-white/10 outline-none ring-accent/50 transition focus:ring-2 focus:bg-white/10 text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="booking-email"
                      className="block text-sm text-white/75 mb-2"
                    >
                      Email address
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-2 rounded-md bg-white/[7%] border border-white/10 outline-none ring-accent/50 transition focus:ring-2 focus:bg-white/10 text-sm"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-red-400 text-sm" role="alert">
                      {error}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="w-full bg-accent text-gray-900 font-semibold py-2.5 rounded-md hover:bg-accent/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {state === 'submitting' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
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
                        Confirming...
                      </span>
                    ) : (
                      `Confirm ${quantity} ${quantity === 1 ? 'ticket' : 'tickets'}`
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
