import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge cannot tell a custom `text-*` font size from a custom
 * `text-*` colour, so without this it treats `text-display` as a colour and
 * lets `text-on-dark` delete it. Declaring the type scale keeps size and
 * colour in separate conflict groups.
 *
 * Keep this list in sync with the `--text-*` tokens in globals.css.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "mega",
            "display",
            "headline",
            "title",
            "lead",
            "body",
            "meta",
            "label",
          ],
        },
      ],
    },
  },
});

/** Merge conditional class names, letting later Tailwind utilities win. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
