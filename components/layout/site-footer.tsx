import Link from 'next/link';
import { Container } from './container';
import { NewsletterSignup } from '@/components/cnz/newsletter-signup';

type Props = { settings?: any; locale?: 'en' | 'mi' };

const FALLBACK_COLUMNS = [
  {
    heading: 'Funding',
    links: [
      { label: 'Early career', href: '/funding-and-support/early-career-artists' },
      { label: 'Artists & practitioners', href: '/funding-and-support/artists-and-practitioners' },
      { label: 'Organisations', href: '/funding-and-support/arts-organisations' },
      { label: 'Funding calendar', href: '/funding-and-support/all-opportunities/funding-calendar' },
      { label: 'Results', href: '/funding-and-support/results' },
    ],
  },
  {
    heading: 'Development',
    links: [
      { label: 'Toolkits', href: '/development-and-resources/toolkits' },
      { label: 'Research', href: '/development-and-resources/research' },
      { label: 'Sustainable careers', href: '/development-and-resources/sustainable-careers-resources' },
    ],
  },
  {
    heading: 'Advocating',
    links: [
      { label: 'Advocacy tools', href: '/advocating-for-the-arts/advocacy-tools' },
      { label: 'Our work', href: '/advocating-for-the-arts/our-work' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'What we do', href: '/about-creative-nz/what-we-do' },
      { label: 'Our Council', href: '/about-creative-nz/our-council' },
      { label: 'Contact us', href: '/about-creative-nz/contact-us' },
      { label: 'Work for us', href: '/about-creative-nz/work-for-us' },
    ],
  },
];

export function SiteFooter({ settings, locale = 'en' }: Props) {
  const columns =
    settings?.footerColumns?.map((c: any) => ({
      heading: c.heading?.[locale] ?? c.heading?.en,
      links: (c.links ?? []).map((l: any) => ({
        label: l.label?.[locale] ?? l.label?.en,
        href: l.href,
      })),
    })) ?? FALLBACK_COLUMNS;

  const phone = settings?.contact?.phone ?? '+64 4 473 0880';
  const email = settings?.contact?.email ?? 'info@creativenz.govt.nz';

  return (
    <footer className="mt-24 bg-ink text-paper">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-serif text-xl font-semibold">
              Arts Council of New Zealand<br />
              <span lang="mi">Toi Aotearoa</span>
            </p>
            <address className="mt-4 not-italic text-sm leading-relaxed text-paper/80">
              Level 5, 131 Cuba Street<br />
              <span lang="mi">Te Whanganui-a-Tara</span> Wellington<br />
              <br />
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="no-underline hover:underline">
                {phone}
              </a>
              <br />
              <a href={`mailto:${email}`} className="no-underline hover:underline">
                {email}
              </a>
            </address>
          </div>

          {columns.map((col: any) => (
            <div key={col.heading}>
              <h2 className="text-sm font-semibold uppercase tracking-wide">{col.heading}</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map((l: any) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-paper/80 no-underline hover:underline hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-paper/20 pt-8">
          <NewsletterSignup variant="footer" locale={locale} />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-paper/20 pt-8 text-sm text-paper/70 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Creative New Zealand <span lang="mi">Toi Aotearoa</span></p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li><Link href="/privacy" className="no-underline hover:underline">Privacy</Link></li>
            <li><Link href="/accessibility" className="no-underline hover:underline">Accessibility</Link></li>
            <li><Link href="/copyright" className="no-underline hover:underline">Copyright</Link></li>
            <li><Link href="/site-map" className="no-underline hover:underline">Site map</Link></li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
