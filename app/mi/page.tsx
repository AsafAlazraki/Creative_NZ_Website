import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/cnz/eyebrow';
import { LinkButton } from '@/components/ui/button';
import { KoruWatermark } from '@/components/cnz/koru-watermark';

// Draft te reo Māori copy — [CONFIRM] by human translator before publish.

export default function MiHomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Container className="py-20 lg:py-28">
          <div className="relative z-10 max-w-3xl">
            <Eyebrow>Toi Aotearoa</Eyebrow>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-[1.05] md:text-6xl lg:text-7xl">
              E tautoko ana i ngā toi o Aotearoa
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink/80">
              E pūtea ana mātou i ngā ringatoi, ngā kaimahi toi, me ngā whakahaere.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/mi/pūtea-me-te-tautoko" size="lg">
                Kimihia he pūtea →
              </LinkButton>
            </div>
            <p className="mt-6 text-sm text-muted">
              [CONFIRM] Draft te reo Māori translations. Awaiting human translator sign-off.
            </p>
          </div>
          <KoruWatermark
            colour="orange"
            size={420}
            className="pointer-events-none absolute -bottom-16 -right-10 hidden opacity-60 md:block"
          />
        </Container>
      </section>
    </>
  );
}
