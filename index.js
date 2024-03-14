import AutoSlider from "./gri-slider/index.js";

const SLIDE_LIST = [
  {
    slideImg: "./picts/guitars/at_ibanez.jpg",
    comment: "Andy Timmons `CRYING` Ibanez",
    // controlImg: "./src/icons/guitar.svg",
  },
  {
    slideImg: "./picts/guitars/ej_strat.jpg",
    comment: "Eric Johnson's `DESERT ROSE` Fender Strat",
  },
  {
    slideImg: "./picts/guitars/sv_JEM777.jpg",
    comment: "Steve Vai's `PRAYING` Ibanez JEM777",
  },
  {
    slideImg: "./picts/guitars/ym_fender_strat.jpg",
    comment: "Yngwee's `FLASHING` Fender Strat",
  },
];

const EMPTY = [];

// ACCELERATE: ---
new AutoSlider({
  list: SLIDE_LIST,
  csssd: {
    color: "purple",
    letterSpacing: "0.7px",
    fontFamily: "Merienda",
    fontWeight: 500,
  },
  // isAutoSlider: true,
  panel: ["renderDots"],
  imgInSlideCount: 1,
  delay: 2e3,
  arrows: [
    `<span class="icon-circle-right gri-slider__next_el" id="next"></span>`,
    `<span class="icon-circle-left gri-slider__prev_el" id="prev"></span>`,
  ],
});
