import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Eyebrow } from '@/components/cnz/eyebrow';
import { FundingCalendar } from '@/components/cnz/funding-calendar';
import { getOpenFunds } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Funding calendar',
  description: 'All current and upcoming funding rounds from Creative New Zealand.',
};

export const revalidate = 60;

export default async function FundingCalendarPage() {
  const funds = await getOpenFunds();

  const items = funds.map((f: any) => ({
    slug: f.slug?.current ?? '',
    name: f.name?.en ?? '',
    category: f.category,
    audience: f.audience?.[0]?.en ?? f.audience?.[0] ?? '',
    amount: f.amount ?? null,
    artforms: (f.artforms ?? []).map((a: any) => a?.en ?? a).filter(Boolean),
    closeDate: f.nextRound?.closeDate,
  }));

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Funding and support', href: '/funding-and-support' },
          { label: 'Funding calendar' },
        ]}
      />
      <Container className="py-12 lg:py-16">
        <header className="max-w-3xl">
          <Eyebrow>All opportunities</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">Funding calendar</h1>
          <p className="mt-4 text-lg text-ink/80">
            All current and upcoming rounds in one place. Filter by artform, applicant type, or deadline to
            find what applies to you.
          </p>
        </header>

        <div className="mt-10">
          <FundingCalendar items={items} />
        </div>
      </Container>
    </>
  );
}
