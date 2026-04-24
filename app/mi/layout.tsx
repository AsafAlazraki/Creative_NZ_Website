import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { AnnouncementBanner } from '@/components/layout/announcement-banner';
import { getGlobalSettings } from '@/lib/sanity';

export default async function MiLayout({ children }: { children: React.ReactNode }) {
  const settings = await getGlobalSettings();
  return (
    <div lang="mi">
      {settings?.announcementBanner?.enabled && (
        <AnnouncementBanner {...settings.announcementBanner} locale="mi" />
      )}
      <SiteHeader settings={settings} locale="mi" />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter settings={settings} locale="mi" />
    </div>
  );
}
