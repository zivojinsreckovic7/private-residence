import { InstagramLogo } from "@phosphor-icons/react/ssr";
import { AppLink } from "@/components/ui/app-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Wordmark } from "@/components/ui/wordmark";
import { legalLinks, navigation, site } from "@/lib/site";

export function SiteFooter() {
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
              {site.tagline}
            </p>
            <a
              href={site.contact.instagram}
              className="text-meta mt-8 inline-flex items-center gap-2 text-on-dark-muted transition-colors duration-(--dur-fast) hover:text-accent-bright"
            >
              <InstagramLogo size={18} weight="light" aria-hidden />
              Instagram
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-4">
            {navigation.map((item) => (
              <AppLink
                key={item.href}
                href={item.href}
                className="text-meta text-on-dark-muted transition-colors duration-(--dur-fast) hover:text-accent-bright"
              >
                {item.label}
              </AppLink>
            ))}
          </nav>

          <div className="flex flex-col gap-8">
            <FooterContact
              label="Reservations"
              value={site.contact.reservations}
            />
            <FooterContact
              label="General Enquiries"
              value={site.contact.general}
            />
            <div>
              <p className="text-label uppercase text-on-dark/45">Address</p>
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
                Open in Google Maps
              </a>
            </div>

            <a
              href={site.url}
              className="text-meta text-on-dark-muted transition-colors duration-(--dur-fast) hover:text-accent-bright"
            >
              www.misprivateresidence.com
            </a>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-line-on-dark pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <AppLink
                  href={link.href}
                  className="text-meta text-on-dark-muted transition-colors duration-(--dur-fast) hover:text-accent-bright"
                >
                  {link.label}
                </AppLink>
              </li>
            ))}
          </ul>
          <p className="text-meta text-on-dark-muted">
            &copy; {new Date().getFullYear()} {site.fullName}. All rights
            reserved.
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
