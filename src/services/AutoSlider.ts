import Slider from "./Slider.js"
import { T_SLIDER_PARAMS } from "../types/types";
import { toggleClass, EVENT_SELECTORS} from "../utils/utils.js";

// CLASS EXTENDS  BASE CLASS "SLIDER" !

export default class AutoSlider extends Slider {
  isAutoSlider: boolean;
  intervalId: undefined | number;
  delay: number;

  constructor({
    isAutoSlider = false,
    list,
    csssd,
    panel,
    imgInSlideCount,
    delay = 1800,
    arrows,
    lazyLoad,
  }: T_SLIDER_PARAMS) {
    super({ csssd, list, panel, imgInSlideCount, arrows, lazyLoad });
    // LOGICAL
    this.isAutoSlider = isAutoSlider;
    this.intervalId = undefined;
    this.delay = delay;
    // METHS
    arrows && this.addMouseEventToSlider();
    this.isAutoSlider && this.autoSlider(this.delay);
    this.resize()
  }

  autoSlider(delay: number) {
    this.intervalId = setInterval(() => {
      this.count++;
      this.prepareForMoveTrack();
    }, delay);
  }

  addMouseEventToSliderHandler = (e: Event) => {
    if (e.type === "mouseenter") {
      clearInterval(this.intervalId);
      return toggleClass(EVENT_SELECTORS.slice(0, 2));
    }
    toggleClass(EVENT_SELECTORS.slice(0, 2));
    this.isAutoSlider && this.autoSlider(this.delay);
  };

  addMouseEventToSlider() {
    this.$slider.addEventListener(
      "mouseenter",
      this.addMouseEventToSliderHandler
    );
    this.$slider.addEventListener(
      "mouseleave",
      this.addMouseEventToSliderHandler
    );
  }

  resize() {
    window.addEventListener("resize", () =>
      this.trackStyles(
        this.$track as HTMLDivElement,
        this.$imageBlocks as NodeListOf<HTMLDivElement>,
        this.list,
        this.imgInSlideCount
      )
    );
  }
}
