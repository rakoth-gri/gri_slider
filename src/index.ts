import AutoSlider from "./services/AutoSlider.js";

// TYPES
import { T_SLIDELIST_ITEM } from "./types/types";

// const SLIDE_LIST: T_SLIDELIST_ITEM[] = [
//   {
//     slideImg: "./picts/guitars/at_ibanez.jpg",
//     comment: "Andy Timmons CRYING Ibanez",
//     controlImg: "./src/icons/guitar.svg",
//   },
//   {
//     slideImg: "./picts/guitars/ej_strat.jpg",
//     comment: "Eric Johnson's Fender Strat",
//   },
//   {
//     slideImg: "./picts/guitars/sv_JEM777.jpg",
//     comment: "Steve Vai's PRAYING Ibanez JEM777",
//   },
//   {
//     slideImg: "./picts/guitars/ym_fender_strat.jpg",
//     comment: "Yngwee's FLASHING Fender Strat",
//   },
// ];


const DUNA_LIST: T_SLIDELIST_ITEM[] = [
  {
    slideImg: "./picts/dune/1_alia.jpg",
    comment: "Alia <q>suicide</q> Atreides",
    // controlImg: "./src/icons/guitar.svg",
  },
  {
    slideImg: "./picts/dune/2_vladimir.jpg",
    comment: "Baron Vladimir Harkonnen",
  },
  {
    slideImg: "./picts/dune/3_wellington.jpg",
    comment: "Doctor Wellington Yueh",
  },
  {
    slideImg: "./picts/dune/4_gaius.jpg",
    comment: "Mother Gaius Helen Mohiam",
  },
  {
    slideImg: "./picts/dune/5_jessica.jpeg",
    comment: "Jessica of the Atreides",    
  },
  {
    slideImg: "./picts/dune/6_leto.jpg",
    comment: "The Red Duke Leto Atreides",
  },
  {
    slideImg: "./picts/dune/7_feyd.jpg",
    comment: "Heir Feyd-Rautha Harkonnen",
  },
  {
    slideImg: "./picts/dune/8_duncan.jpg",
    comment: "Warrior Duncan Idaho",
  },
  {
    slideImg: "./picts/dune/9_stilgar.jpg",
    comment: "<q>Blind</q> freeman Stilgar",    
  },
  {
    slideImg: "./picts/dune/10_rabban.jpg",
    comment: "<q>Ruthless</q> Glossu Rabban",
  },
  {
    slideImg: "./picts/dune/11_chani.jpg",
    comment: "Chani <q>the enlightened one</q>",
  },
  {
    slideImg: "./picts/dune/12_shaddan.png",
    comment: "Emperor Shaddam IV Corrino",
  },
  {
    slideImg: "./picts/dune/13_irullan.jpg",
    comment: "Princess Ирулан Коррино",
  }
];

new AutoSlider({
  list: DUNA_LIST,
  csssd: {
    color: "teal",
    letterSpacing: "0.7px",
    fontFamily: "Merienda",
  },
  isAutoSlider: true,
  panel: ["renderControls"],
  imgInSlideCount: 1,
  delay: 2000,
  arrows: {
    prev: `<span class="material-symbols-outlined"> arrow_left_alt </span>`,
    next: `<span class="material-symbols-outlined"> arrow_right_alt </span>`,
  },
  lazyLoad: true,
});
