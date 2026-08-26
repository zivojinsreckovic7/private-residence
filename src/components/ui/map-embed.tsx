import { cn } from "@/lib/cn";
import type { Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

const TITLE = {
  en: (locality: string) =>
    `Map showing the location of ${site.fullName} in ${locality}, Cyprus`,
  sr: (locality: string) =>
    `Mapa sa lokacijom rezidencije ${site.fullName} u mestu ${locality}, Kipar`,
} as const;

/**
 * The residence on a Google map.
 *
 * The one third-party frame on the site, so it is deferred with
 * `loading="lazy"` and given a real `title`: an untitled frame is announced as
 * "frame" and nothing else. It carries no address of its own — a map tile is
 * invisible to a crawler and to anyone blocking third-party frames, so the
 * address is always set as text beside it. See `sections/find-us.tsx`.
 */
export function MapEmbed({
  lang,
  className,
}: {
  lang: Lang;
  className?: string;
}) {
  const { address } = site;

  return (
    <div
      className={cn(
        "rounded-surface relative aspect-[4/3] overflow-hidden bg-surface ring-1 ring-line sm:aspect-[16/10]",
        className,
      )}
    >
      <iframe
        src={address.embedUrl}
        title={TITLE[lang](address.locality)}
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
