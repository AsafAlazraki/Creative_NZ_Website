import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/cnz/eyebrow';
import { TileCard } from '@/components/cnz/tile-card';
import { DeadlineStrip } from '@/components/cnz/deadline-strip';
import { NewsCard } from '@/components/cnz/news-card';
import { NewsletterSignup } from '@/components/cnz/newsletter-signup';
import { KoruWatermark } from '@/components/cnz/koru-watermark';
import { LinkButton } from '@/components/ui/button';
import { getUpcomingDeadlines, getLatestNews } from '@/lib/sanity';

export const revalidate = 60;

export default async function HomePage() {
  const [deadlines, news] = await Promise.all([
    getUpcomingDeadlines(45),
    getLatestNews(3),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Container className="py-20 lg:py-28">
          <div className="relative z-10 max-w-3xl">
            <Eyebrow>Toi Aotearoa</Eyebrow>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-[1.05] md:text-6xl lg:text-7xl">
              Supporting the arts of <span lang="mi">Aotearoa</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink/80">
              We fund artists, practitioners, and organisations making the art that defines this place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/funding-and-support" size="lg">Find funding →</LinkButton>
              <LinkButton href="/about-creative-nz/what-we-do" variant="secondary" size="lg">
                Read our strategy
              </LinkButton>
            </div>
          </div>
          <KoruWatermark
            colour="orange"
            size={420}
            className="pointer-events-none absolute -bottom-16 -right-10 hidden opacity-60 md:block"
          />
        </Container>
      </section>

      {/* Three-door grid */}
      <section className="border-t border-border">
        <Container className="py-16 lg:py-24">
          <div className="max-w-2xl">
            <Eyebrow>Find funding</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">Three doors in</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <TileCard
              href="/funding-and-support/early-career-artists"
              title="Early career artists"
              description="New to funding? Start here."
              colour="orange"
              cta="Start here"
            />
            <TileCard
              href="/funding-and-support/artists-and-practitioners"
              title="Artists &amp; practitioners"
              description="Working artists developing your practice."
              colour="lime"
              cta="See funds"
            />
            <TileCard
              href="/funding-and-support/arts-organisations"
              title="Organisations &amp; groups"
              description="Arts orgs, collectives, and groups."
              colour="cyan"
              cta="See funds"
            />
          </div>
        </Container>
      </section>

      {/* Deadlines */}
      {deadlines.length > 0 && (
        <section className="bg-paper-alt">
          <Container className="py-16 lg:py-20">
            <Eyebrow>Closing soon</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-semibold">Upcoming deadlines</h2>
            <div className="mt-8">
              <DeadlineStrip items={deadlines} />
            </div>
            <div className="mt-6">
              <LinkButton href="/funding-and-support/all-opportunities/funding-calendar" variant="secondary">
                See all funding opportunities →
              </LinkButton>
            </div>
          </Container>
        </section>
      )}

      {/* Featured stories */}
      {news.length > 0 && (
        <section>
          <Container className="py-16 lg:py-20">
            <Eyebrow>Latest from Creative NZ</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-semibold">Featured stories</h2>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {news.map((item: any, i: number) => (
                <NewsCard
                  key={item._id}
                  slug={item.slug?.current ?? ''}
                  title={item.title?.en ?? item.title ?? ''}
                  standfirst={item.standfirst?.en}
                  category={item.category?.en ?? item.category}
                  publishedAt={item.publishedAt}
                  feature={i === 0}
                />
              ))}
            </div>
            <div className="mt-8">
              <LinkButton href="/news-and-blog" variant="secondary">
                All news and blog →
              </LinkButton>
            </div>
          </Container>
        </section>
      )}

      {/* Advocate band */}
      <section className="bg-navy text-paper">
        <Container className="py-16 text-center lg:py-24">
          <h2 className="mx-auto max-w-3xl font-serif text-3xl font-semibold md:text-5xl">
            Advocate for the arts in <span lang="mi">Aotearoa</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-paper/80">
            Use our tools and research to make the case for the arts.
          </p>
          <div className="mt-8">
            <LinkButton
              href="/advocating-for-the-arts/advocacy-tools"
              variant="secondary"
              size="lg"
              className="border-paper text-paper hover:bg-paper hover:text-ink"
            >
              Get the advocate toolkit →
            </LinkButton>
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section>
        <Container className="py-16 lg:py-20">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-semibold">Stay in the loop</h2>
            <p className="mt-3 text-lg text-ink/80">
              Get arts news and funding deadlines in your inbox monthly.
            </p>
            <div className="mt-6">
              <NewsletterSignup />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
