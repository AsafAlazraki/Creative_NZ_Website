import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Eyebrow } from '@/components/cnz/eyebrow';
import { Prose } from '@/components/layout/prose';

export const metadata: Metadata = {
  title: 'Accessibility',
  description: 'Our commitment to an accessible web experience.',
};

export default function AccessibilityPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Accessibility' }]} />
      <Container className="py-12 lg:py-16">
        <header className="max-w-3xl">
          <Eyebrow>Commitment</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">Accessibility</h1>
        </header>
        <Prose className="mt-8">
          <p>
            Creative New Zealand <span lang="mi">Toi Aotearoa</span> is committed to meeting the{' '}
            New Zealand Government Web Accessibility Standard 1.2 and WCAG 2.2 AA.
          </p>
          <h2>If something doesn’t work for you</h2>
          <p>
            Email <a href="mailto:info@creativenz.govt.nz">info@creativenz.govt.nz</a>. Please
            tell us the page, what you were trying to do, and any assistive technology you use.
          </p>
          <h2>Known issues</h2>
          <p>[CONFIRM — maintain a live register on this page]</p>
        </Prose>
      </Container>
    </>
  );
}
