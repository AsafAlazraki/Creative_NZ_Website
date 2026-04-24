import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Eyebrow } from '@/components/cnz/eyebrow';
import { Prose } from '@/components/layout/prose';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How Creative New Zealand handles your personal information.',
};

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy' }]} />
      <Container className="py-12 lg:py-16">
        <header className="max-w-3xl">
          <Eyebrow>Policy</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">Privacy</h1>
        </header>
        <Prose className="mt-8">
          <p>
            Creative New Zealand <span lang="mi">Toi Aotearoa</span> collects personal information
            only when necessary to deliver our services. This draft content will be migrated
            verbatim from the existing site. <strong>[CONFIRM]</strong>
          </p>
          <h2>Information we collect</h2>
          <p>[Migrate from current site]</p>
          <h2>How we use it</h2>
          <p>[Migrate from current site]</p>
          <h2>Your rights</h2>
          <p>[Migrate from current site]</p>
          <h2>Contact us</h2>
          <p>
            For any privacy enquiry, email{' '}
            <a href="mailto:info@creativenz.govt.nz">info@creativenz.govt.nz</a>.
          </p>
        </Prose>
      </Container>
    </>
  );
}
