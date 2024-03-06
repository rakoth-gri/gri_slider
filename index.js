import AutoSlider from "./gri-slider/index.js";

const SLIDE_LIST = [
  {
    slideImg:
      "https://guitar.com/wp-content/uploads/2020/01/Jackson-charvel-double-neck@1400x1050.jpg",
    comment: "love this one",
    controlImg: "./src/icons/home.svg",
  },
  {
    slideImg:
      "http://www.hutchinsonguitars.com/wp-content/uploads/2014/11/IMG_2340.jpg",
  },
  {
    slideImg:
      "https://i.pinimg.com/originals/c6/64/42/c664421ecd4b6a8551d7f338232f87c9.jpg",
  },  
  {
    slideImg:
      "https://i.pinimg.com/originals/c6/64/42/c664421ecd4b6a8551d7f338232f87c9.jpg",
    comment: "Such a vibe....",
  },
];
new AutoSlider({
  list: SLIDE_LIST,
  options: { fontFamily: "Roboto", color: "orangered" },
  isAutoSlider: true,
  panel: ["renderControls"],
  imgInSlideCount: 1,
});
