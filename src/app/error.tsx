'use client'; // Error components must be Client Components

import H1 from '@/components/h1';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="text-center py-24">
      <H1 className="mb-5">Something went wrong!</H1>
      <p className="text-white/75 mb-2">
        An unexpected error occurred. Please try again.
      </p>
      {error.digest ? (
        <p className="text-white/50 mb-8 text-sm">Reference ID: {error.digest}</p>
      ) : (
        <div className="mb-8" />
      )}
      <button
        onClick={reset}
        className="bg-white/10 px-5 py-3 rounded-md text-sm hover:bg-white/20 transition"
      >
        Try again
      </button>
    </main>
  );
}
