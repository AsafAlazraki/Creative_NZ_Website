import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { AnnouncementBanner } from '@/components/layout/announcement-banner';
import { getGlobalSettings } from '@/lib/sanity';
 
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getGlobalSettings();
  return (
    <>
      {settings.announcementBanner?.enabled && (
        <AnnouncementBanner {...settings.announcementBanner} />
      )}
      <SiteHeader settings={settings} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter settings={settings} />
    </>
  );
}
