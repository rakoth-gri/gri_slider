import { toggleClass, iterator, checkCount, nested } from "../utils/utils";
// TYPES--
import { T_SELECTORS, T_SLIDELIST_ITEM, T_PANEL } from "../types/types";

const EVENT_SELECTORS: T_SELECTORS[] = [
  ".gri-slider__prev",
  ".gri-slider__next",
  ".gri-slider__panel_btn",
  ".gri-slider__panel_dot",
];

class Slider {
  list: T_SLIDELIST_ITEM[][];
  options: Partial<CSSStyleDeclaration>;
  $sliderBody: HTMLDivElement;
  $slider: HTMLDivElement;
  $track: HTMLDivElement | null;
  $imageBlocks: NodeListOf<HTMLDivElement> | null;
  $controls: HTMLDivElement[] | null;
  $dots: HTMLDivElement[] | null;
  count: number;
  width: null | number;
  panel: T_PANEL[] | undefined;
  imgInSlideCount: number;

  constructor({
    list,
    options = {},
    panel = undefined,
    imgInSlideCount = 1,
  }: {
    list: T_SLIDELIST_ITEM[];
    options?: Partial<CSSStyleDeclaration>;
    panel?: T_PANEL[];
    imgInSlideCount?: number;
  }) {
    // DOM-ELEMS
    this.$sliderBody = document.querySelector(
      `.gri-slider__body`
    ) as HTMLDivElement;
    this.$slider = document.querySelector(`.gri-slider`) as HTMLDivElement;
    this.$track = null;
    this.$imageBlocks = null;
    this.$controls = null;
    this.$dots = null;
    // optional css.declaration object
    this.options = options;
    // LOGIC VARS
    this.panel = panel;
    this.imgInSlideCount = imgInSlideCount;
    this.list = nested(list, this.imgInSlideCount);
    this.count = 0;
    this.width = null;
    // METHS
    this.builder(
      this.$sliderBody,
      this.list,
      this.$slider,
      this.options,
      this.panel,
      this.imgInSlideCount
    );
  }

  builder(
    sliderBody: HTMLDivElement,
    list: T_SLIDELIST_ITEM[][],
    slider: HTMLDivElement,
    options: Partial<CSSStyleDeclaration>,
    panel: T_PANEL[] | undefined,
    imgInSlideCount: number
  ) {
    // order to invoke:
    // 1
    this.render(sliderBody, list);
    // 2
    panel && this[panel[0]](slider, list);
    // 3
    this.trackStyles(
      this.$track as HTMLDivElement,
      this.$imageBlocks as NodeListOf<HTMLDivElement>,
      list,
      imgInSlideCount
    );
    // 4
    this.checkOptionsStyles(options);
    // 5
    this.addClickEventToSlider();
    // 6
    this.resize();
  }

  render(sliderBody: HTMLDivElement, list: T_SLIDELIST_ITEM[][]) {
    sliderBody.innerHTML = `<div class="gri-slider__track">
        ${iterator(
          list,
          (slidesArr) => `
            ${slidesArr
              .map(
                ({ slideImg, comment }) => `
                <article class="gri-slider__img">
                  <img src="${slideImg}" />
                  <span class="gri-slider__img_index"> ${comment || ``}</span>
                </article>`
              )
              .join("")}
            `,
          "map"
        )}            
    </div>        
    `;

    this.$track = document.querySelector(".gri-slider__track");
    this.$imageBlocks = document.querySelectorAll(".gri-slider__img");
  }

  renderControls(slider: HTMLDivElement, list: T_SLIDELIST_ITEM[][]) {
    const image = list[0][0].controlImg;

    slider.insertAdjacentHTML(
      "beforeend",
      `
    <section class='gri-slider__panel'>
     ${
       image
         ? iterator(
             list,
             (_, i) =>
               `<div class='gri-slider__panel_btn ${i === 0 ? "active" : ""}'>
                  <img src="${image}" id='${i}' loading='lazy'/>                      
                </div>`,
             "map"
           )
         : iterator(
             list,
             (_, i) => `
                <div class='gri-slider__panel_btn ${
                  i === 0 ? "active" : ""
                }' id='${i}' style="border: 1px solid">                  
                    ${i + 1}
                </div>`,
             "map"
           )
     }
  	</section>
  `
    );
    this.$controls = Array.from(
      document.querySelectorAll(".gri-slider__panel_btn")
    ) as HTMLDivElement[];
  }

  renderDots(slider: HTMLDivElement, list: T_SLIDELIST_ITEM[][]) {
    slider.insertAdjacentHTML(
      "beforeend",
      `
		<section class='gri-slider__panel'>
		${iterator(
      list,
      (_, i) =>
        `<div class='gri-slider__panel_dot ${
          i === 0 ? "active" : ""
        }' id='${i}'></div>`,
      "map"
    )}
		</section>
	`
    );
    this.$dots = Array.from(
      document.querySelectorAll(".gri-slider__panel_dot")
    ) as HTMLDivElement[];
  }

  trackStyles = (
    track: HTMLDivElement,
    images: NodeListOf<HTMLDivElement>,
    list: T_SLIDELIST_ITEM[][],
    imgInSlideCount: number
  ) => {
    this.width = this.$sliderBody.offsetWidth;
    images.forEach(
      (img) =>
        (img.style.width = `${(this.width as number) / imgInSlideCount - 8}px`)
    );
    track.style.width = `${this.width * list.length}px`;
  };

  checkOptionsStyles(options: Partial<CSSStyleDeclaration>) {
    if (!Object.values(options).length) {
      return console.warn(
        `Cant find any prop in style-options of ${this.constructor.name} constructor`
      );
    }
    // check the correction of options props values:
    if (!Object.values(options).find((val) => val)) {
      return console.warn(
        `The values of 'Options object' are empty or falsy...`
      );
    }
    iterator(
      Object.keys(options),
      (key) => (this.$slider.style[key] = options[key]),
      "forEach"
    );
  }

  moveTrack(count: number) {
    (this.$track as HTMLDivElement).style.transform = `translateX(-${
      count * (this.width as number)
    }px)`;
  }

  selectActiveElem(ind: number, elem: keyof Slider) {
    iterator(
      this[elem] as HTMLDivElement[],
      (elem, i) => {
        elem.classList.remove("active");
        ind === i && elem.classList.add("active");
      },
      "forEach"
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

  // EVENTS --------------------------------------------

  addClickEventToSliderHandler = (e: Event) => {
    if (!(e.target instanceof HTMLElement)) return;

    if (!EVENT_SELECTORS.some((sel) => (e.target as HTMLElement).closest(sel)))
      return;

    switch (e.target.id) {
      case "prev":
        this.count--;
        break;
      case "next":
        this.count++;
        break;
      default:
        this.count = +e.target.id;
        break;
    }
    this.count = checkCount(this.count, this.list);
    this.panel &&
      this.selectActiveElem(this.count, this.$controls ? "$controls" : "$dots");
    this.moveTrack(this.count);
  };

  addClickEventToSlider() {
    this.$slider.addEventListener("click", this.addClickEventToSliderHandler);
  }
}

export default class AutoSlider extends Slider {
  isAutoSlider: boolean;
  intervalId: undefined | number;

  constructor({
    isAutoSlider = false,
    list,
    options,
    panel,
    imgInSlideCount,
  }: {
    isAutoSlider?: boolean;
    list: T_SLIDELIST_ITEM[];
    options?: Partial<CSSStyleDeclaration>;
    panel?: T_PANEL[];
    imgInSlideCount?: number;
  }) {
    super({ options, list, panel, imgInSlideCount });
    // LOGICAL
    this.isAutoSlider = isAutoSlider;
    this.intervalId = undefined;
    // METHS
    this.addMouseEventToSlider();
    this.isAutoSlider && this.autoSlider();
  }

  autoSlider() {
    this.intervalId = setInterval(() => {
      this.count++;
      this.count = checkCount(this.count, this.list);
      this.panel &&
        this.selectActiveElem(
          this.count,
          this.$controls ? "$controls" : "$dots"
        );
      this.moveTrack(this.count);
    }, 1700);
  }

  addMouseEventToSliderHandler = (e: Event) => {    
    if (e.type === "mouseenter") {
      clearInterval(this.intervalId);
      return toggleClass(EVENT_SELECTORS.slice(0, 2));
    }
    toggleClass(EVENT_SELECTORS.slice(0, 2));
    this.isAutoSlider && this.autoSlider();
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
}
