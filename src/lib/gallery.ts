export type PhotoGroup = {
  id: string;
  label: string;
  items: readonly { src: string; alt: string }[];
};

/**
 * The photography, grouped by subject.
 *
 * Alt text is written from the photographs themselves, not from the file
 * names. Several names do not describe their shot — `living-and-dining-
 * toward-pool` is the kitchen bar, and `kitchen-island-and-display-shelves` is
 * the living room — so check the image before editing a description here.
 */
export const GROUPS: readonly PhotoGroup[] = [
  {
    id: "exterior",
    label: "The Residence",
    items: [
      {
        src: "/gallery/exterior/villa-full-view-with-pool.jpeg",
        alt: "MIS Private Residence seen in full, its pool and terrace in the foreground and the open-air cinema screen at the far end.",
      },
      {
        src: "/gallery/exterior/villa-facade-from-pool.jpeg",
        alt: "The villa from the far side of the pool, its living room open to the terrace across the full width of the ground floor.",
      },
      {
        src: "/gallery/exterior/villa-facade-pool-bougainvillea.jpeg",
        alt: "The villa facade above the pool, its upper balcony clad in stone and the ground floor opening onto the terrace.",
      },
      {
        src: "/gallery/exterior/villa-facade-outdoor-cinema.jpeg",
        alt: "The pool along the length of the facade, with the open-air cinema screen and barbecue set up beside it.",
      },
    ],
  },
  {
    id: "pool-terrace",
    label: "Pool & Terrace",
    items: [
      {
        src: "/gallery/pool-terrace/pool-lengthwise-to-villa.jpeg",
        alt: "The pool running lengthwise back toward the villa, flowering planters lining the far edge.",
      },
      {
        src: "/gallery/pool-terrace/pool-through-bougainvillea.jpeg",
        alt: "The pool and covered lounge seen through bougainvillea, with the long dining table and sun loungers alongside.",
      },
      {
        src: "/gallery/pool-terrace/pool-terrace-lounge-and-dining.jpeg",
        alt: "The covered terrace lounge beside the pool, with the outdoor dining table and hanging chair beyond it.",
      },
      {
        src: "/gallery/pool-terrace/covered-terrace-lounge-pool.jpeg",
        alt: "The covered terrace lounge looking out over the pool, with the long dining table on the lawn beyond.",
      },
      {
        src: "/gallery/pool-terrace/pool-from-covered-lounge.jpeg",
        alt: "The pool seen from the covered lounge, the living room's television wall on one side and sun loungers on the other.",
      },
      {
        src: "/gallery/pool-terrace/pool-and-terrace-from-house.jpeg",
        alt: "The pool and terrace seen from inside the house, the living room opening directly onto the paving.",
      },
      {
        src: "/gallery/pool-terrace/pool-outdoor-cinema-screen.jpeg",
        alt: "The outdoor dining table laid with fruit and juice, the pool behind it and the open-air cinema screen at the end of the terrace.",
      },
    ],
  },
  {
    id: "living",
    label: "Living & Dining",
    items: [
      {
        src: "/gallery/living/living-room-sectional-wide.jpeg",
        alt: "The living room sectional facing a wall of glass that slides open to the pool terrace, with the dining table behind.",
      },
      {
        src: "/gallery/living/living-room-toward-pool.jpeg",
        alt: "The living room and dining table looking out through the open glass wall to the pool.",
      },
      {
        src: "/gallery/living/living-room-and-staircase.jpeg",
        alt: "The living room sectional with the dining table behind it and the staircase rising beside the entrance.",
      },
      {
        src: "/gallery/living/dining-table-toward-living-room.jpeg",
        alt: "The dining table in the foreground, looking through to the kitchen on one side and the living room on the other.",
      },
      {
        src: "/gallery/living/dining-area-and-shelving-niche.jpeg",
        alt: "The dining table beneath a candelabra, with the shelving niche and the kitchen bar beyond it.",
      },
      {
        src: "/gallery/living/living-and-dining-toward-pool.jpeg",
        alt: "The open-plan kitchen and breakfast bar, seen from the dining table beside the shelving niche.",
      },
    ],
  },
  {
    id: "kitchen",
    label: "Kitchen",
    items: [
      {
        src: "/gallery/kitchen/kitchen-island-open-to-living.jpeg",
        alt: "The kitchen island and breakfast bar, open along its length to the living room beyond.",
      },
      {
        src: "/gallery/kitchen/kitchen-bar-from-dining.jpeg",
        alt: "The kitchen island and induction hob, with the display shelving niche alongside and the galley run behind.",
      },
      {
        src: "/gallery/kitchen/kitchen-island-and-entrance.jpeg",
        alt: "The kitchen island and breakfast stools, with the entrance hall and front door beyond.",
      },
      {
        src: "/gallery/kitchen/kitchen-galley-and-extractor.jpeg",
        alt: "The galley kitchen run with its sink and ovens, opening at the far end onto the island and the living room.",
      },
      {
        src: "/gallery/kitchen/kitchen-island-and-display-shelves.jpeg",
        alt: "The living room and dining table looking out through the open glass wall to the pool terrace.",
      },
    ],
  },
  {
    id: "bedrooms",
    label: "Bedrooms",
    items: [
      {
        src: "/gallery/bedrooms/double-bedroom-with-balcony.jpeg",
        alt: "A double bedroom with sliding doors onto its own balcony and a framed abstract painting above the bed.",
      },
      {
        src: "/gallery/bedrooms/twin-bedroom-with-balcony.jpeg",
        alt: "A twin bedroom with fitted wardrobes and sliding doors onto a balcony.",
      },
    ],
  },
  {
    id: "bathrooms",
    label: "Bathrooms",
    items: [
      {
        src: "/gallery/bathrooms/bathroom-walk-in-shower.jpeg",
        alt: "A bathroom finished in large stone-coloured tiles, with a walk-in rain shower and a window beside it.",
      },
    ],
  },
  {
    id: "details",
    label: "Details",
    items: [
      {
        src: "/gallery/details/outdoor-dining-through-foliage.jpeg",
        alt: "The outdoor dining table set for a meal, glimpsed through the foliage at the edge of the terrace.",
      },
      {
        src: "/gallery/details/poolside-table-juice-and-fruit.jpeg",
        alt: "A jug of juice and bowls of fruit on the poolside table, sun loungers just beyond.",
      },
      {
        src: "/gallery/details/poolside-tray-and-pomegranates.jpeg",
        alt: "A woven tray of glasses and a bowl of pomegranates on a sun lounger at the edge of the pool.",
      },
    ],
  },
];
