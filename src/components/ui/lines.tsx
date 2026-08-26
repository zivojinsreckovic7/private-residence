import { cn } from "@/lib/cn";

type LinesProps = {
  /** One entry per paragraph. The copy voice leans on short standalone lines. */
  children: readonly string[];
  size?: "lead" | "body";
  className?: string;
};

/**
 * A run of short paragraphs.
 *
 * The brand copy is written in single-line statements rather than blocks, so
 * this keeps that rhythm consistent instead of every section hand-rolling a
 * stack of <p> tags.
 */
export function Lines({ children, size = "lead", className }: LinesProps) {
  return (
    <div
      className={cn(
        "space-y-4 text-ink-muted",
        size === "lead" ? "text-lead" : "text-body",
        className,
      )}
    >
      {children.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}
