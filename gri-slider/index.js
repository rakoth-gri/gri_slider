import AutoSlider from "./services/Slider.js";
var SLIDE_LIST = [
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
new AutoSlider({
    list: SLIDE_LIST,
    csssd: {
        color: "purple",
        letterSpacing: "0.7px",
        fontFamily: "Merienda",
    },
    panel: ["renderControls"],
    imgInSlideCount: 1,
    delay: 2000,
    arrows: {
        prev: "<span class=\"material-symbols-outlined\"> arrow_left_alt </span>",
        next: "<span class=\"material-symbols-outlined\"> arrow_right_alt </span>",
    },
});
