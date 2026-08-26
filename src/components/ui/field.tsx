import { cn } from "@/lib/cn";

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  /** Renders a textarea instead of an input. */
  multiline?: boolean;
  className?: string;
};

const control =
  "rounded-surface w-full border border-line-strong bg-canvas px-4 py-3 " +
  "text-body text-ink placeholder:text-ink-subtle " +
  "transition-colors duration-(--dur-fast) " +
  "hover:border-ink-faint focus:border-accent focus:outline-none";

/**
 * Label above control, always. No placeholder-as-label: the placeholder is a
 * hint and disappears on typing, so it cannot carry the field's name.
 */
export function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  multiline = false,
  className,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={name} className="text-meta text-ink">
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-accent">
            *
          </span>
        )}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          required={required}
          placeholder={placeholder}
          className={cn(control, "resize-y")}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={control}
        />
      )}
    </div>
  );
}
