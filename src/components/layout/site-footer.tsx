import { InstagramLogo } from "@phosphor-icons/react/ssr";
import { AppLink } from "@/components/ui/app-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Wordmark } from "@/components/ui/wordmark";
import { localePath, type Lang } from "@/lib/i18n";
import { SHARED, TAGLINE, navigation, site } from "@/lib/site";

const COPY = {
  en: { footer: "Footer" },
  sr: { footer: "Podnožje stranice" },
} as const;

export function SiteFooter({ lang }: { lang: Lang }) {
  const shared = SHARED[lang];

  return (
    <Section
      as="footer"
      tone="deep"
      className="relative z-10 py-24 shadow-[0_-40px_90px_-30px_rgb(20_22_25/0.55)] md:py-28"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1.2fr] lg:gap-20">
          <div>
            <Wordmark size="lg" tone="onDark" />
            <p className="text-body mt-6 max-w-[32ch] text-on-dark-muted">
              {TAGLINE[lang]}
            </p>
            <a
              href={site.contact.instagram}
              className="text-meta mt-8 inline-flex items-center gap-2 text-on-dark-muted transition-colors duration-(--dur-fast) hover:text-accent-bright"
            >
              <InstagramLogo size={18} weight="light" aria-hidden />
              Instagram
            </a>
          </div>

          <nav aria-label={COPY[lang].footer} className="flex flex-col gap-4">
            {navigation.map((item) => (
              <AppLink
                key={item.href}
                href={localePath(item.href, lang)}
                className="text-meta text-on-dark-muted transition-colors duration-(--dur-fast) hover:text-accent-bright"
              >
                {item.label[lang]}
              </AppLink>
            ))}
          </nav>

          <div className="flex flex-col gap-8">
            <FooterContact
              label={shared.reservations}
              value={site.contact.reservations}
            />
            <FooterContact
              label={shared.general}
              value={site.contact.general}
            />
            <div>
              <p className="text-label uppercase text-on-dark/45">
                {shared.address}
              </p>
              <address className="text-meta mt-2 not-italic text-on-dark-muted">
                {site.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-meta mt-3 inline-block text-on-dark-muted underline underline-offset-4 transition-colors duration-(--dur-fast) hover:text-accent-bright"
              >
                {shared.openInMaps}
              </a>
            </div>

            {/*
              The domain, as the domain — but linked to this edition's home
              page rather than to the absolute URL. Written out it was the
              site's one internal link that left the app: a full page load on
              click, and, from the Serbian edition, a link into English.
            */}
            <AppLink
              href={localePath("/", lang)}
              className="text-meta text-on-dark-muted transition-colors duration-(--dur-fast) hover:text-accent-bright"
            >
              www.misprivateresidence.com
            </AppLink>
          </div>
        </div>

        <div className="mt-20 border-t border-line-on-dark pt-8">
          <p className="text-meta text-on-dark-muted">
            {shared.copyright(new Date().getFullYear())}
          </p>
        </div>
      </Container>
    </Section>
  );
}

function FooterContact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-label uppercase text-on-dark/45">{label}</p>
      <a
        href={`mailto:${value}`}
        className="text-meta mt-2 block text-on-dark-muted transition-colors duration-(--dur-fast) hover:text-accent-bright"
      >
        {value}
      </a>
    </div>
  );
}
