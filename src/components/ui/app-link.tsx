import Link from "next/link";

/**
 * A link that picks its own mechanism.
 *
 * Real routes go through `next/link`, so moving between pages is a client
 * navigation and never replays the loading curtain. Fragments stay plain
 * anchors: the App Router forces an instant jump on hash navigation, which
 * would throw away the `scroll-behavior: smooth` the nav relies on. Anything
 * external or `mailto:` is an anchor too.
 *
 * The nav is a mixed list of the two, so the decision belongs here rather than
 * at each call site.
 */
export function AppLink({
  href,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { href: string }) {
  const isRoute = href.startsWith("/") && !href.includes("#");
  if (isRoute) return <Link href={href} {...props} />;
  return <a href={href} {...props} />;
}
