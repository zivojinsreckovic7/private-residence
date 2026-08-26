import { Cormorant_Garamond, Geist } from "next/font/google";

/**
 * Geist is the working voice: navigation, body copy, labels, buttons.
 * A neutral grotesque keeps the interface quiet so the photography and the
 * serif carry the character.
 */
export const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Cormorant Garamond is the brand voice. It matches the letterspaced serif
 * wordmark on the NMS crest, so it is used for the wordmark, for accented
 * words inside headings, and for pull quotes and the rate.
 */
export const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});
