import AutoSlider from "./gri-slider/index.js";

const SLIDE_LIST = [
  {
    slideImg: "./picts/guitars/at_ibanez.jpg",
    comment: "Andy Timmons <b>`CRYING`</b> Ibanez",
    // controlImg: "./src/icons/guitar.svg",
  },
  {
    slideImg: "./picts/guitars/ej_strat.jpg",
    comment: "Eric Johnson's <b>`DESERT ROSE`</b> Fender Strat",
  },
  {
    slideImg: "./picts/guitars/pg_FRM_150TR.jpg",
    comment: "Paul Guilbert's FRM_150TR Ibanez",
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

// ACCELERATE: ---
new AutoSlider({
  list: SLIDE_LIST,
  options: { fontFamily: "montserrat", color: "#a81843", letterSpacing: '0.7px' },
  isAutoSlider: true,
  panel: ["renderControls"],
  imgInSlideCount: 1,
  delay: 2e3
});
