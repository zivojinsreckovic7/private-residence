import type { Copy, Lang } from "@/lib/i18n";

/** A group as a page renders it: one language, already resolved. */
export type PhotoGroup = {
  id: string;
  label: string;
  items: readonly { src: string; alt: string }[];
};

type Source = {
  id: string;
  label: Copy<string>;
  items: readonly { src: string; alt: Copy<string> }[];
};

/**
 * The photography, grouped by subject. One manifest for both languages and
 * both callers: the wall and the grid read the same list, so a photograph
 * cannot be described one way in one place and another way somewhere else.
 *
 * Alt text is written from the photographs themselves, not from the file
 * names. Several names do not describe their shot — `living-and-dining-
 * toward-pool` is the kitchen bar, and `kitchen-island-and-display-shelves` is
 * the living room — so check the image before editing a description here, and
 * translate from the verified English rather than from the file name.
 */
const SOURCE: readonly Source[] = [
  {
    id: "exterior",
    label: { en: "The Residence", sr: "Rezidencija" },
    items: [
      {
        src: "/gallery/exterior/villa-full-view-with-pool.webp",
        alt: {
          en: "MIS Private Residence seen in full, its pool and terrace in the foreground and the open-air cinema screen at the far end.",
          sr: "MIS Private Residence u punom pogledu, sa bazenom i terasom u prvom planu i platnom bioskopa na otvorenom na drugom kraju.",
        },
      },
      {
        src: "/gallery/exterior/villa-facade-from-pool.webp",
        alt: {
          en: "The villa from the far side of the pool, its living room open to the terrace across the full width of the ground floor.",
          sr: "Vila sa druge strane bazena, sa dnevnom sobom otvorenom ka terasi celom širinom prizemlja.",
        },
      },
      {
        src: "/gallery/exterior/villa-facade-pool-bougainvillea.webp",
        alt: {
          en: "The villa facade above the pool, its upper balcony clad in stone and the ground floor opening onto the terrace.",
          sr: "Fasada vile iznad bazena, sa gornjim balkonom obloženim kamenom i prizemljem koje se otvara ka terasi.",
        },
      },
      {
        src: "/gallery/exterior/villa-facade-outdoor-cinema.webp",
        alt: {
          en: "The pool along the length of the facade, with the open-air cinema screen and barbecue set up beside it.",
          sr: "Bazen duž cele fasade, sa platnom bioskopa na otvorenom i roštiljem postavljenim pored njega.",
        },
      },
    ],
  },
  {
    id: "pool-terrace",
    label: { en: "Pool & Terrace", sr: "Bazen i terasa" },
    items: [
      {
        src: "/gallery/pool-terrace/pool-lengthwise-to-villa.webp",
        alt: {
          en: "The pool running lengthwise back toward the villa, flowering planters lining the far edge.",
          sr: "Bazen koji se pruža uzduž nazad prema vili, sa cvetnim žardinjerama duž suprotne ivice.",
        },
      },
      {
        src: "/gallery/pool-terrace/pool-through-bougainvillea.webp",
        alt: {
          en: "The pool and covered lounge seen through bougainvillea, with the long dining table and sun loungers alongside.",
          sr: "Bazen i natkriveni salon viđeni kroz bugenviliju, sa dugačkim trpezarijskim stolom i ležaljkama pored.",
        },
      },
      {
        src: "/gallery/pool-terrace/pool-terrace-lounge-and-dining.webp",
        alt: {
          en: "The covered terrace lounge beside the pool, with the outdoor dining table and hanging chair beyond it.",
          sr: "Natkriveni salon na terasi pored bazena, sa spoljnim trpezarijskim stolom i visećom foteljom u pozadini.",
        },
      },
      {
        src: "/gallery/pool-terrace/covered-terrace-lounge-pool.webp",
        alt: {
          en: "The covered terrace lounge looking out over the pool, with the long dining table on the lawn beyond.",
          sr: "Natkriveni salon na terasi sa pogledom na bazen i dugačkim trpezarijskim stolom na travnjaku iza.",
        },
      },
      {
        src: "/gallery/pool-terrace/pool-from-covered-lounge.webp",
        alt: {
          en: "The pool seen from the covered lounge, the living room's television wall on one side and sun loungers on the other.",
          sr: "Bazen viđen iz natkrivenog salona, sa televizijskim zidom dnevne sobe sa jedne i ležaljkama sa druge strane.",
        },
      },
      {
        src: "/gallery/pool-terrace/pool-and-terrace-from-house.webp",
        alt: {
          en: "The pool and terrace seen from inside the house, the living room opening directly onto the paving.",
          sr: "Bazen i terasa viđeni iz unutrašnjosti kuće, sa dnevnom sobom koja se otvara direktno na popločani deo.",
        },
      },
      {
        src: "/gallery/pool-terrace/pool-outdoor-cinema-screen.webp",
        alt: {
          en: "The outdoor dining table laid with fruit and juice, the pool behind it and the open-air cinema screen at the end of the terrace.",
          sr: "Spoljni trpezarijski sto postavljen sa voćem i sokom, bazen iza njega i platno bioskopa na otvorenom na kraju terase.",
        },
      },
    ],
  },
  {
    id: "living",
    label: { en: "Living & Dining", sr: "Dnevni boravak i trpezarija" },
    items: [
      {
        src: "/gallery/living/living-room-sectional-wide.webp",
        alt: {
          en: "The living room sectional facing a wall of glass that slides open to the pool terrace, with the dining table behind.",
          sr: "Ugaona garnitura u dnevnoj sobi okrenuta ka staklenom zidu koji se otvara ka terasi sa bazenom, sa trpezarijskim stolom iza.",
        },
      },
      {
        src: "/gallery/living/living-room-toward-pool.webp",
        alt: {
          en: "The living room and dining table looking out through the open glass wall to the pool.",
          sr: "Dnevna soba i trpezarijski sto sa pogledom kroz otvoreni stakleni zid na bazen.",
        },
      },
      {
        src: "/gallery/living/living-room-and-staircase.webp",
        alt: {
          en: "The living room sectional with the dining table behind it and the staircase rising beside the entrance.",
          sr: "Ugaona garnitura u dnevnoj sobi sa trpezarijskim stolom iza i stepeništem koje se uzdiže pored ulaza.",
        },
      },
      {
        src: "/gallery/living/dining-table-toward-living-room.webp",
        alt: {
          en: "The dining table in the foreground, looking through to the kitchen on one side and the living room on the other.",
          sr: "Trpezarijski sto u prvom planu, sa pogledom na kuhinju sa jedne i dnevnu sobu sa druge strane.",
        },
      },
      {
        src: "/gallery/living/dining-area-and-shelving-niche.webp",
        alt: {
          en: "The dining table beneath a candelabra, with the shelving niche and the kitchen bar beyond it.",
          sr: "Trpezarijski sto ispod svećnjaka, sa nišom sa policama i kuhinjskim barom u pozadini.",
        },
      },
      {
        src: "/gallery/living/living-and-dining-toward-pool.webp",
        alt: {
          en: "The open-plan kitchen and breakfast bar, seen from the dining table beside the shelving niche.",
          sr: "Otvorena kuhinja i bar za doručak, viđeni od trpezarijskog stola pored niše sa policama.",
        },
      },
    ],
  },
  {
    id: "kitchen",
    label: { en: "Kitchen", sr: "Kuhinja" },
    items: [
      {
        src: "/gallery/kitchen/kitchen-island-open-to-living.webp",
        alt: {
          en: "The kitchen island and breakfast bar, open along its length to the living room beyond.",
          sr: "Kuhinjsko ostrvo i bar za doručak, otvoreni celom dužinom ka dnevnoj sobi.",
        },
      },
      {
        src: "/gallery/kitchen/kitchen-bar-from-dining.webp",
        alt: {
          en: "The kitchen island and induction hob, with the display shelving niche alongside and the galley run behind.",
          sr: "Kuhinjsko ostrvo sa indukcionom pločom, nišom sa policama pored i radnim nizom u pozadini.",
        },
      },
      {
        src: "/gallery/kitchen/kitchen-island-and-entrance.webp",
        alt: {
          en: "The kitchen island and breakfast stools, with the entrance hall and front door beyond.",
          sr: "Kuhinjsko ostrvo sa barskim stolicama, sa ulaznim holom i ulaznim vratima u pozadini.",
        },
      },
      {
        src: "/gallery/kitchen/kitchen-galley-and-extractor.webp",
        alt: {
          en: "The galley kitchen run with its sink and ovens, opening at the far end onto the island and the living room.",
          sr: "Radni niz kuhinje sa sudoperom i rernama, koji se na kraju otvara ka ostrvu i dnevnoj sobi.",
        },
      },
      {
        src: "/gallery/kitchen/kitchen-island-and-display-shelves.webp",
        alt: {
          en: "The living room and dining table looking out through the open glass wall to the pool terrace.",
          sr: "Dnevna soba i trpezarijski sto sa pogledom kroz otvoreni stakleni zid na terasu sa bazenom.",
        },
      },
    ],
  },
  {
    id: "bedrooms",
    label: { en: "Bedrooms", sr: "Spavaće sobe" },
    items: [
      {
        src: "/gallery/bedrooms/double-bedroom-with-balcony.webp",
        alt: {
          en: "A double bedroom with sliding doors onto its own balcony and a framed abstract painting above the bed.",
          sr: "Spavaća soba sa francuskim ležajem, kliznim vratima ka sopstvenom balkonu i uramljenom apstraktnom slikom iznad kreveta.",
        },
      },
      {
        src: "/gallery/bedrooms/twin-bedroom-with-balcony.webp",
        alt: {
          en: "A twin bedroom with fitted wardrobes and sliding doors onto a balcony.",
          sr: "Soba sa dva ležaja, ugradnim ormarima i kliznim vratima ka balkonu.",
        },
      },
    ],
  },
  {
    id: "bathrooms",
    label: { en: "Bathrooms", sr: "Kupatila" },
    items: [
      {
        src: "/gallery/bathrooms/bathroom-walk-in-shower.webp",
        alt: {
          en: "A bathroom finished in large stone-coloured tiles, with a walk-in rain shower and a window beside it.",
          sr: "Kupatilo obloženo velikim pločicama u boji kamena, sa tuš-kabinom bez pregrade i prozorom pored.",
        },
      },
    ],
  },
  {
    id: "details",
    label: { en: "Details", sr: "Detalji" },
    items: [
      {
        src: "/gallery/details/outdoor-dining-through-foliage.webp",
        alt: {
          en: "The outdoor dining table set for a meal, glimpsed through the foliage at the edge of the terrace.",
          sr: "Spoljni trpezarijski sto postavljen za obrok, koji se nazire kroz zelenilo na ivici terase.",
        },
      },
      {
        src: "/gallery/details/poolside-table-juice-and-fruit.webp",
        alt: {
          en: "A jug of juice and bowls of fruit on the poolside table, sun loungers just beyond.",
          sr: "Bokal soka i činije sa voćem na stolu uz bazen, sa ležaljkama odmah iza.",
        },
      },
      {
        src: "/gallery/details/poolside-tray-and-pomegranates.webp",
        alt: {
          en: "A woven tray of glasses and a bowl of pomegranates on a sun lounger at the edge of the pool.",
          sr: "Pleteni poslužavnik sa čašama i činija sa narovima na ležaljci uz ivicu bazena.",
        },
      },
    ],
  },
];

/** The manifest in one language. */
export function galleryGroups(lang: Lang): readonly PhotoGroup[] {
  return SOURCE.map((group) => ({
    id: group.id,
    label: group.label[lang],
    items: group.items.map((item) => ({ src: item.src, alt: item.alt[lang] })),
  }));
}

/** How many photographs the set holds. Used by the wall's progress rail. */
export const PHOTO_COUNT = SOURCE.reduce(
  (total, group) => total + group.items.length,
  0,
);

/**
 * One photograph from the manifest, by path, with its alt text in the given
 * language.
 *
 * Pages that place a single photograph outside the gallery — the about page's
 * plates and strip — go through this rather than repeating a description, so
 * one shot cannot end up described two ways. It throws on an unknown path,
 * which turns a renamed file into a build failure rather than a silent
 * `alt=""`.
 */
export function photo(src: string, lang: Lang) {
  for (const group of SOURCE) {
    for (const item of group.items) {
      if (item.src === src) return { src, alt: item.alt[lang] };
    }
  }
  throw new Error(`No photograph in the manifest for ${src}`);
}
