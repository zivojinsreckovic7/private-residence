import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false },
};

/**
 * Living specimen of the design system. Not part of the public site, but the
 * fastest way to see every token and primitive at once when changing one.
 */
export default function StyleGuide() {
  return (
    <>
      <Section tone="canvas" space="tight" className="pt-32">
        <Container>
          <Eyebrow>Style guide</Eyebrow>
          <Heading as="h1" size="display" className="mt-6 max-w-[14ch]">
            The <Accent>system</Accent>, on one page.
          </Heading>
        </Container>
      </Section>

      <Block title="Typography">
        <div className="space-y-8">
          <Row label="display / Geist Medium + Cormorant italic">
            <Heading as="p" size="display">
              A <Accent>private</Accent> residence.
            </Heading>
          </Row>
          <Row label="headline">
            <Heading as="p" size="headline">
              Facing the <Accent>water</Accent>.
            </Heading>
          </Row>
          <Row label="title">
            <Heading as="p" size="title">
              The upper terrace
            </Heading>
          </Row>
          <Row label="lead">
            <p className="text-lead max-w-[54ch] text-ink-muted">
              Four terraces step down the cliff to a private mooring, finished
              in 2021 by the architect who designed the harbour below.
            </p>
          </Row>
          <Row label="body">
            <p className="text-body max-w-[65ch] text-ink-muted">
              Body copy sits at 65 characters maximum and uses the muted ink
              token, which clears WCAG AA against the white canvas.
            </p>
          </Row>
          <Row label="meta">
            <p className="text-meta text-ink-subtle">House manager, chef, boatman</p>
          </Row>
          <Row label="label / eyebrow">
            <Eyebrow>The residence</Eyebrow>
          </Row>
        </div>
      </Block>

      <Block title="Colour">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-surface border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
          <Swatch name="canvas" className="bg-canvas text-ink" />
          <Swatch name="surface" className="bg-surface text-ink" />
          <Swatch name="surface-deep" className="bg-surface-deep text-on-dark" />
          <Swatch name="ink" className="bg-ink text-on-dark" />
          <Swatch name="ink-muted" className="bg-ink-muted text-on-dark" />
          <Swatch name="ink-subtle" className="bg-ink-subtle text-on-dark" />
          <Swatch name="accent" className="bg-accent text-on-dark" />
          <Swatch name="accent-deep" className="bg-accent-deep text-on-dark" />
          <Swatch name="accent-bright" className="bg-accent-bright text-ink" />
          <Swatch name="accent-tint" className="bg-accent-tint text-ink" />
          <Swatch name="gold" className="bg-gold text-ink" />
          <Swatch name="line" className="bg-line text-ink" />
        </div>
      </Block>

      <Block title="Buttons">
        <div className="space-y-10">
          <Row label="primary / outline / inverse">
            <div className="flex flex-wrap items-center gap-3">
              <Button icon>Enquire</Button>
              <Button variant="outline" icon>
                Read more
              </Button>
              <Button variant="inverse">Inverse</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Row>
          <Row label="large">
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" icon>
                Enquire
              </Button>
              <Button size="lg" variant="outline">
                Read more
              </Button>
            </div>
          </Row>
          <Row label="onDark, over photography">
            <div className="flex flex-wrap items-center gap-3 rounded-surface bg-surface-deep p-8">
              <Button icon>Enquire</Button>
              <Button variant="onDark">See the house</Button>
            </div>
          </Row>
        </div>
      </Block>

      <Block title="Surfaces and shadows">
        <div className="grid gap-6 sm:grid-cols-3">
          <Panel className="shadow-soft">shadow-soft</Panel>
          <Panel className="shadow-lift">shadow-lift</Panel>
          <Panel className="bg-accent text-on-dark shadow-accent">shadow-accent</Panel>
        </div>
      </Block>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Section tone="canvas" space="tight" className="border-t border-line">
      <Container>
        <Eyebrow className="mb-10">{title}</Eyebrow>
        {children}
      </Container>
    </Section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-3 md:grid-cols-[220px_1fr] md:gap-8">
      <p className="text-meta pt-2 text-ink-faint">{label}</p>
      <div>{children}</div>
    </div>
  );
}

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className={cn("text-meta flex h-28 items-end p-4", className)}>{name}</div>
  );
}

function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-meta rounded-surface bg-canvas text-ink flex h-32 items-end p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
