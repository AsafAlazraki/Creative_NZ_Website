import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Eyebrow } from '@/components/cnz/eyebrow';
import { TileCard } from '@/components/cnz/tile-card';
import { LinkButton } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Funding and support',
  description: 'Grants, fellowships, and investment programmes for individual artists, practitioners, and arts organisations across Aotearoa.',
};

export default function FundingLandingPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Funding and support' }]} />
      <Container className="py-16 lg:py-20">
        <header className="max-w-3xl">
          <Eyebrow>Funding and support</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
            Find the right fund for you
          </h1>
          <p className="mt-4 text-lg text-ink/80">
            We offer grants, fellowships, and investment programmes for individual artists,
            practitioners, and arts organisations across <span lang="mi">Aotearoa</span>.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href="/funding-and-support/all-opportunities/funding-calendar" variant="secondary">
              View funding calendar
            </LinkButton>
            <LinkButton href="/about-creative-nz/contact-us" variant="ghost">
              Talk with an adviser
            </LinkButton>
          </div>
        </header>
      </Container>

      <section className="border-t border-border">
        <Container className="py-16 lg:py-20">
          <Eyebrow>I am…</Eyebrow>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <TileCard
              href="/funding-and-support/early-career-artists"
              title="Early career artist"
              description="You’re starting your arts practice."
              colour="orange"
            />
            <TileCard
              href="/funding-and-support/artists-and-practitioners"
              title="An artist or practitioner"
              description="You’re developing your arts practice."
              colour="lime"
            />
            <TileCard
              href="/funding-and-support/arts-organisations"
              title="An arts organisation"
              description="A collective, company, or charity."
              colour="cyan"
            />
          </div>
        </Container>
      </section>

      <section className="bg-paper-alt">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-2xl rounded-lg border border-border bg-paper p-8 text-center">
            <p className="font-serif text-2xl font-semibold">Not sure where to start?</p>
            <p className="mt-3 text-ink/80">
              Our Fund Finder asks five quick questions and points you to the right programmes.
            </p>
            <div className="mt-5">
              <LinkButton href="/funding-and-support/fund-finder">
                Start the Fund Finder →
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
