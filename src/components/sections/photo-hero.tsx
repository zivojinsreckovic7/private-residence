import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";

/**
 * The standing-page hero: one photograph, a scrim, and the title sitting on
 * its lower edge.
 *
 * The landing page's hero is a scrubbed walkthrough and stays its own thing.
 * This is the quieter version the standalone pages share, so `/gallery` and
 * `/experiences` open the same way without either owning the markup.
 *
 * The scrim is deliberately heaviest at the bottom, where the type is. It is
 * exposed as a prop because it serves the photograph rather than the layout:
 * a shot that is bright where the copy lands needs more than one that is
 * already dark there.
 */
export function PhotoHero({
  eyebrow,
  title,
  lead,
  src,
  alt,
  scrim = "from-surface-deep/90 via-surface-deep/55 to-surface-deep/20",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  src: string;
  alt: string;
  scrim?: string;
}) {
  return (
    <section className="relative flex min-h-[80svh] items-end overflow-clip">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-t ${scrim}`}
      />

      <Container className="relative pt-40 pb-20 md:pb-24">
        <Reveal variant="still">
          <Eyebrow className="text-on-dark/65">{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal variant="drape" className="mt-5">
          <Heading as="h1" size="display" className="max-w-[14ch] text-on-dark">
            {title}
          </Heading>
        </Reveal>
        <Reveal delay={140}>
          <p className="text-lead mt-7 max-w-[48ch] text-on-dark/85">{lead}</p>
        </Reveal>
      </Container>
    </section>
  );
}
