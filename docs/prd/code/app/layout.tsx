import type { Metadata } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';
import './globals.css';
 
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});
 
const serif = Source_Serif_4({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});
 
export const metadata: Metadata = {
  metadataBase: new URL('https://creativenz.govt.nz'),
  title: {
    default: 'Creative New Zealand Toi Aotearoa',
    template: '%s — Creative New Zealand',
  },
  description: 'Creative New Zealand Toi Aotearoa supports the arts of Aotearoa.',
  openGraph: {
    type: 'website',
    locale: 'en_NZ',
    siteName: 'Creative New Zealand',
  },
  robots: { index: true, follow: true },
};
 
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: 'en' | 'mi' };
}) {
  const locale = params.locale ?? 'en';
  return (
    <html lang={locale} className={`${inter.variable} ${serif.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          {locale === 'mi' ? 'Peke ki te kiko matua' : 'Skip to main content'}
        </a>
        {children}
      </body>
    </html>
  );
}
