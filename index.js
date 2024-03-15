import AutoSlider from "./gri-slider/index.js";

const SLIDE_LIST = [
  {
    slideImg: "./picts/guitars/at_ibanez.jpg",
    comment: "Andy Timmons <b>`CRYING`</b> Ibanez",
    controlImg: "./src/icons/guitar.svg",
  },
  {
    slideImg: "./picts/guitars/ej_strat.jpg",
    comment: "Eric Johnson's <b>`DESERT ROSE`</b> Fender Strat",
  },
  {
    slideImg: "./picts/guitars/sv_JEM777.jpg",
    comment: "Steve Vai's <strong>` PRAYING `</strong> Ibanez JEM777",
  },
  {
    slideImg: "./picts/guitars/ym_fender_strat.jpg",
    comment: "Yngwee's <b>`FLASHING`</b> Fender Strat",
  },
];

const options = {
  list: SLIDE_LIST,
  csssd: {
    color: "teal",
    letterSpacing: "0.7px",
    fontFamily: "Merienda",
    fontWeight: 500,
  },
  // isAutoSlider: true,
  panel: ["renderControls"],
  // imgInSlideCount: 2,
  // delay: 500,
  arrows: {
    prev: `<span class="icon-undo"></span>`,
    next: `<span class="icon-redo"></span>`,
  },
};

new AutoSlider(options);
