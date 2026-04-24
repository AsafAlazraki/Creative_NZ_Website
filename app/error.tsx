'use client';

import { useEffect } from 'react';
import { Container } from '@/components/layout/container';
import { Button, LinkButton } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24 text-center">
      <p className="font-mono text-sm uppercase tracking-widest text-muted">Error 500</p>
      <h1 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">
        Something went wrong
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-ink/80">
        Sorry — we hit an error loading this page. Try again, or contact us if it keeps happening.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={() => reset()} size="lg">Try again</Button>
        <LinkButton href="/" variant="secondary" size="lg">Back to home</LinkButton>
      </div>
      {error.digest && (
        <p className="mt-6 font-mono text-xs text-muted">Reference: {error.digest}</p>
      )}
    </Container>
  );
}
