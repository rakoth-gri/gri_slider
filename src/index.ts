import AutoSlider from "./services/Slider.js";

// TYPES
import { T_SLIDELIST_ITEM } from "./types/types";

const SLIDE_LIST: T_SLIDELIST_ITEM[] = [
  {
    slideImg:
      "https://guitar.com/wp-content/uploads/2020/01/Jackson-charvel-double-neck@1400x1050.jpg",
    comment: "For those who know what to do",
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
      "https://reverb-res.cloudinary.com/image/upload/v1578873090/krameroriginalcarousel_jpvgzr.jpg",
    comment: "Hello, love you guitars",
  },
  {
    slideImg:
      "http://www.hutchinsonguitars.com/wp-content/uploads/2014/11/IMG_2340.jpg",
  },
  {
    slideImg: "https://rare-gallery.com/uploads/posts/571448-guitar.jpg",
    comment: "Hello, love you guitars",
  },
  {
    slideImg: "https://images2.alphacoders.com/671/671623.jpg",
  },
  {
    slideImg:
      "https://i.pinimg.com/originals/c6/64/42/c664421ecd4b6a8551d7f338232f87c9.jpg",
    comment: "Acoustic vibe...",
  },
];

new AutoSlider({
  list: SLIDE_LIST,
  options: { color: "teal", letterSpacing: "0.7px", fontFamily: "Pacifico, cursive" },
  isAutoSlider: false,
  panel: ["renderDots"],
  imgInSlideCount: 1,
  delay: 3000,
});
