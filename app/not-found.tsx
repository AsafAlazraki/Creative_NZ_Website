import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { KoruWatermark } from '@/components/cnz/koru-watermark';
import { LinkButton } from '@/components/ui/button';

export default function NotFound() {
  return (
    <Container className="relative py-24 text-center">
      <KoruWatermark
        colour="coral"
        size={240}
        className="pointer-events-none absolute left-1/2 top-16 -z-10 -translate-x-1/2 opacity-30"
      />
      <p className="font-mono text-sm uppercase tracking-widest text-muted">Error 404</p>
      <h1 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">
        We couldn’t find that page
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-ink/80">
        The page may have moved or the link may be out of date.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <LinkButton href="/" size="lg">Back to home</LinkButton>
        <LinkButton href="/search" variant="secondary" size="lg">Search the site</LinkButton>
      </div>
      <nav aria-label="Popular links" className="mx-auto mt-16 max-w-xl text-left">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Popular links</h2>
        <ul className="mt-3 space-y-2">
          <li><Link href="/funding-and-support">Funding and support</Link></li>
          <li><Link href="/funding-and-support/all-opportunities/funding-calendar">Funding calendar</Link></li>
          <li><Link href="/news-and-blog">News and blog</Link></li>
          <li><Link href="/about-creative-nz/contact-us">Contact us</Link></li>
        </ul>
      </nav>
    </Container>
  );
}
