import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Eyebrow } from '@/components/cnz/eyebrow';
import { StatusPill, deriveStatus } from '@/components/cnz/status-pill';
import { LinkButton } from '@/components/ui/button';
import { Prose } from '@/components/layout/prose';
import { PortableText } from '@portabletext/react';
import { getFund } from '@/lib/sanity';

export const revalidate = 60;

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const fund = await getFund(slug);
  if (!fund) return { title: slug };
  return {
    title: fund.name?.en ?? slug,
    description: fund.summary?.en,
  };
}

export default async function FundDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const fund = await getFund(slug);

  if (!fund) notFound();

  const nextRound =
    (fund.rounds ?? [])
      .filter((r: any) => r.closeDate && new Date(r.closeDate) > new Date())
      .sort((a: any, b: any) => new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime())[0] ??
    null;

  const status = deriveStatus(nextRound?.closeDate, nextRound?.openDate);
  const daysLeft = nextRound?.closeDate
    ? Math.max(0, Math.ceil((new Date(nextRound.closeDate).getTime() - Date.now()) / 86_400_000))
    : 0;
  const statusLabel =
    status === 'open' ? 'Open'
    : status === 'closing' ? `Closing in ${daysLeft} days`
    : status === 'upcoming' ? 'Upcoming'
    : 'Closed';

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Funding and support', href: '/funding-and-support' },
          { label: fund.name?.en ?? '' },
        ]}
      />
      <Container className="py-12 lg:py-16">
        <header className="max-w-3xl">
          <Eyebrow>{fund.category ?? 'Fund'}</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">{fund.name?.en}</h1>
          {fund.summary?.en && <p className="mt-4 text-lg text-ink/80">{fund.summary.en}</p>}
          <div className="mt-6">
            <StatusPill status={status} label={statusLabel} />
          </div>
        </header>

        {/* Key facts */}
        <dl className="mt-10 grid gap-4 rounded-lg border border-border bg-paper-alt p-6 md:grid-cols-4">
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">Amount</dt>
            <dd className="mt-1 font-serif text-lg">
              {fund.amount?.max ? `Up to $${fund.amount.max.toLocaleString()}` : '—'}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">Close date</dt>
            <dd className="mt-1 font-serif text-lg">
              {nextRound?.closeDate
                ? new Date(nextRound.closeDate).toLocaleDateString('en-NZ', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : '—'}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">Who it’s for</dt>
            <dd className="mt-1 font-serif text-lg">
              {(fund.audience ?? []).map((a: any) => a.name?.en ?? a.name).join(', ') || '—'}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">Artform</dt>
            <dd className="mt-1 font-serif text-lg">
              {(fund.artforms ?? []).map((a: any) => a.name?.en ?? a.name).join(', ') || 'All artforms'}
            </dd>
          </div>
        </dl>

        {/* Primary CTA */}
        {status === 'open' && fund.portalUrl && (
          <div className="mt-8">
            <LinkButton href={fund.portalUrl} size="lg" external>
              Apply on the CNZ portal →
            </LinkButton>
          </div>
        )}

        {/* Two column body */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[18rem_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">On this page</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#overview">Overview</a></li>
              <li><a href="#eligibility">Who can apply</a></li>
              <li><a href="#what-we-fund">What we fund</a></li>
              <li><a href="#how-to-apply">How to apply</a></li>
              <li><a href="#assessment">Assessment</a></li>
              <li><a href="#faqs">FAQs</a></li>
            </ul>
            {fund.contactPerson && (
              <div className="mt-8 border-t border-border pt-6 text-sm">
                <p className="font-semibold">Contact</p>
                <p className="mt-1">{fund.contactPerson.name}</p>
                {fund.contactPerson.role?.en && <p className="text-muted">{fund.contactPerson.role.en}</p>}
                {fund.contactPerson.email && (
                  <a className="mt-1 block" href={`mailto:${fund.contactPerson.email}`}>
                    {fund.contactPerson.email}
                  </a>
                )}
              </div>
            )}
          </aside>

          <div className="space-y-12">
            <section id="overview">
              <h2 className="font-serif text-2xl font-semibold">Overview</h2>
              <Prose className="mt-4">
                <p>{fund.summary?.en}</p>
              </Prose>
            </section>

            {fund.eligibility && (
              <section id="eligibility">
                <h2 className="font-serif text-2xl font-semibold">Who can apply</h2>
                <Prose className="mt-4"><PortableText value={fund.eligibility} /></Prose>
              </section>
            )}

            {fund.whatWeFund && (
              <section id="what-we-fund">
                <h2 className="font-serif text-2xl font-semibold">What we fund</h2>
                <Prose className="mt-4"><PortableText value={fund.whatWeFund} /></Prose>
              </section>
            )}

            {fund.whatWeDoNotFund && (
              <section>
                <h2 className="font-serif text-2xl font-semibold">What we don’t fund</h2>
                <Prose className="mt-4"><PortableText value={fund.whatWeDoNotFund} /></Prose>
              </section>
            )}

            {fund.howToApply && (
              <section id="how-to-apply">
                <h2 className="font-serif text-2xl font-semibold">How to apply</h2>
                <Prose className="mt-4"><PortableText value={fund.howToApply} /></Prose>
              </section>
            )}

            {fund.assessmentCriteria && (
              <section id="assessment">
                <h2 className="font-serif text-2xl font-semibold">Assessment criteria</h2>
                <Prose className="mt-4"><PortableText value={fund.assessmentCriteria} /></Prose>
              </section>
            )}

            {fund.faqs?.length > 0 && (
              <section id="faqs">
                <h2 className="font-serif text-2xl font-semibold">Frequently asked</h2>
                <ul className="mt-4 divide-y divide-border rounded-lg border border-border">
                  {fund.faqs.map((faq: any, i: number) => (
                    <li key={i} className="p-5">
                      <details>
                        <summary className="cursor-pointer font-semibold">
                          {faq.question?.en}
                        </summary>
                        <div className="mt-2 text-ink/80">{faq.answer?.en}</div>
                      </details>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
