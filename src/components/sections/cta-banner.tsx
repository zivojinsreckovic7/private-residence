import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { localePath, type Lang } from "@/lib/i18n";
import { RESERVE_CTA, RESERVE_PATH } from "@/lib/site";

/**
 * The booking card.
 *
 * The landing page runs long, so the reservation is offered three times on the
 * way down rather than only at the end. For that to work the card has to be
 * unmistakable at a glance and stay unmistakable when it appears again twenty
 * screens later, so it is always the same shape: a white card lifted off a
 * grey band, everything centred, one pill.
 *
 * Two deliberate breaks with the house rules, both by request:
 * - it is the only white surface that sits *on* another surface, which is what
 *   makes it read as an offer rather than as another chapter;
 * - it is the only element with a mid radius. The shape lock elsewhere is
 *   pills for controls, 2px for surfaces; this card is the stated exception,
 *   so do not "correct" it back to `rounded-surface`.
 *
 * The copy follows whatever section it sits under, so each placement in
 * `app/[lang]/page.tsx` carries its own line, in both languages. Only the
 * label is fixed: `RESERVE_CTA` is the single booking label.
 */
export function CtaBanner({
  lang,
  line,
  note,
}: {
  lang: Lang;
  line: string;
  note: string;
}) {
  return (
    <Section tone="surface" space="none" className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-[860px] rounded-2xl bg-canvas px-6 py-14 text-center shadow-lift sm:px-12 md:px-16">
            <p className="font-serif text-headline mx-auto max-w-[20ch] font-light text-ink">
              {line}
            </p>
            <p className="text-body mx-auto mt-5 max-w-[52ch] text-ink-muted">
              {note}
            </p>
            <Magnetic className="mt-10 inline-block">
              <Button href={localePath(RESERVE_PATH, lang)} size="lg" icon>
                {RESERVE_CTA[lang]}
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
