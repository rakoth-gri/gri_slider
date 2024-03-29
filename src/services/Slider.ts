import {
  iterator,
  checkCount,
  nested,
  EVENT_SELECTORS,
} from "../utils/utils.js";
// TYPES--
import {
  T_SLIDELIST_ITEM,
  T_PANEL,
  T_SLIDER_PARAMS,
  T_ARROWS,
} from "../types/types.js";

export default class Slider {
  list: T_SLIDELIST_ITEM[][];
  csssd: Partial<CSSStyleDeclaration>;
  $sliderBody: HTMLDivElement | null;
  $slider: HTMLDivElement;
  $track: HTMLDivElement | null;
  $imageBlocks: NodeListOf<HTMLDivElement> | null;
  $controls: HTMLDivElement[] | null;
  $dots: HTMLDivElement[] | null;
  count: number;
  width: null | number;
  panel: T_PANEL[] | undefined;
  imgInSlideCount: number;
  arrows: T_ARROWS | undefined;
  // TOUCH
  isGrabbing: boolean;
  startCursorPos: null | number;
  endCursorPos: null | number;

  constructor({
    list,
    csssd = {},
    panel = undefined,
    imgInSlideCount = 1,
    arrows,
    lazyLoad,
  }: T_SLIDER_PARAMS) {
    // DOM-ELEMS
    this.$sliderBody = null;
    this.$slider = document.querySelector(`.gri-slider`) as HTMLDivElement;
    this.$track = null;
    this.$imageBlocks = null;
    this.$controls = null;
    this.$dots = null;
    this.arrows = arrows;
    // optional css.declaration:
    this.csssd = csssd;
    // LOGIC VARS
    this.panel = panel;
    this.imgInSlideCount = imgInSlideCount;
    this.list = nested(list, this.imgInSlideCount);
    this.count = 0;
    this.width = null;
    // TOUCH LOGIC
    this.isGrabbing = false;
    this.startCursorPos = null;
    this.endCursorPos = null;
    if (!this.list?.length)
      // @ts-ignore
      return console.error(
        "YOU SHOULD PASS NON_EMPTY SLIDES ARRAY AS A VALUE OF 'LIST' PROP!"
      );
    // METHS
    this.builder(
      this.list,
      this.$slider,
      this.csssd,
      this.panel,
      this.imgInSlideCount,
      this.arrows,
      lazyLoad
    );
  }

  builder(
    list: T_SLIDELIST_ITEM[][],
    slider: HTMLDivElement,
    csssd: Partial<CSSStyleDeclaration>,
    panel: T_PANEL[] | undefined,
    imgInSlideCount: number,
    arrows: T_ARROWS | undefined,
    lazyload: true | undefined
  ) {
    // order to invoke:
    // 0
    this.render(slider, list, arrows, lazyload);
    // 1
    arrows && this.renderArrows(arrows);
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
    this.checkOptionsStyles(csssd);
    // 5
    lazyload && this.observer();
    // 6
    this.disableContextMenu();
    // 7
    this.addClickEventToSlider();
    // 8
    this.addSwipeEventForMobile();
    // 9
    this.addSwipeEventForDesktop();
  }

  // RENDERING --------------------------------

  render(
    slider: HTMLDivElement,
    list: T_SLIDELIST_ITEM[][],
    arrows: T_ARROWS | undefined,
    lazyLoad: true | undefined
  ) {
    slider.innerHTML = `
    ${arrows ? `<div class="gri-slider__prev"></div>` : ""}
    <div class="gri-slider__body">
        <div class="gri-slider__track">
            ${iterator(
              list,
              (slidesArr, i) => `
                ${slidesArr
                  .map(
                    ({ slideImg, comment }) => `
                    <article class="gri-slider__img">
                      ${
                        lazyLoad
                          ? `<img src="${
                              i === 0 ? slideImg : ""
                            }" data-src='${slideImg}'/>`
                          : `<img src="${slideImg}" alt="check 'src'"/>`
                      }                      
                      <span class="gri-slider__img_comment"> ${
                        comment || ``
                      }</span>
                    </article>`
                  )
                  .join("")}              
                `,
              "map"
            )}              
        </div>    
    </div>    
    ${arrows ? `<div class="gri-slider__next"></div>` : ""}             
    `;

    this.$sliderBody = document.querySelector(`.gri-slider__body`);
    this.$track = document.querySelector(".gri-slider__track");
    this.$imageBlocks = document.querySelectorAll(".gri-slider__img");
    // отменяем поведение по-умолчанию, элементы не захватываются....
    this.$imageBlocks.forEach((imageBlock) => {
      imageBlock.addEventListener("dragstart", (e) => e.preventDefault());
    });
  }

  renderControls(slider: HTMLDivElement, list: T_SLIDELIST_ITEM[][]) {
    const panelIcon = list[0][0].controlImg;

    slider.insertAdjacentHTML(
      "beforeend",
      `
    <section class='gri-slider__panel'>
     ${
       panelIcon
         ? iterator(
             list,
             (_, i) =>
               `<div class='gri-slider__panel_btn ${i === 0 ? "active" : ""}'>
                  <img src="${panelIcon}" id='${i}' loading="lazy"/>                      
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

  renderArrows(arrows: T_ARROWS) {
    iterator(
      Object.keys(arrows),
      (key: keyof T_ARROWS) =>
        key === "prev"
          ? ((
              document.querySelector(EVENT_SELECTORS[0]) as HTMLElement
            ).innerHTML = arrows[key])
          : ((
              document.querySelector(EVENT_SELECTORS[1]) as HTMLElement
            ).innerHTML = arrows[key]),
      "forEach"
    );
  }

  // STYLING CSS --------------------------------

  trackStyles = (
    track: HTMLDivElement,
    images: NodeListOf<HTMLDivElement>,
    list: T_SLIDELIST_ITEM[][],
    imgInSlideCount: number
  ) => {
    this.width = (this.$sliderBody as HTMLDivElement).offsetWidth;
    images.forEach(
      (img) =>
        (img.style.width = `${(this.width as number) / imgInSlideCount - 8}px`)
    );
    track.style.width = `${this.width * list.length}px`;
  };

  checkOptionsStyles(csssd: Partial<CSSStyleDeclaration>) {
    if (!Object.values(csssd).length) {
      return console.warn(
        `Cant find any prop in style-options of ${this.constructor.name} constructor`
      );
    }
    // check the correction of options props values:
    if (!Object.values(csssd).find((val) => val)) {
      return console.warn(
        `The values of 'Options object' are empty or falsy...`
      );
    }
    iterator(
      Object.keys(csssd),
      // @ts-ignore
      (key) => (this.$slider.style[key] = csssd[key as keyof typeof csssd]),
      "forEach"
    );
  }

  // ACTIONS ------------------------------------------

  prepareForMoveTrack() {
    this.count = checkCount(this.count, this.list);
    this.panel &&
      this.selectActiveElem(this.count, this.$controls ? "$controls" : "$dots");
    this.moveTrack(this.count);
  }

  moveTrack(count: number) {
    (this.$track as HTMLDivElement).style.transform = `translate3D(-${
      count * (this.width as number)
    }px, 0px, 0px)`;
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

  // EVENTS --------------------------------------------

  // SWIPE  EVENT HANDLERS FOR DESKTOP AND MOBILE COMBINED -------------

  disableContextMenu() {
    this.$slider.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  }

  start = (e: Event) => {
    if (!(e.target as HTMLDivElement).closest(".gri-slider__img")) return;
    this.isGrabbing = true;
  };

  move = (e: Event) => {
    if (!(e.target as HTMLDivElement).closest(".gri-slider__img")) return;
    if (!this.isGrabbing) return;
    if (!(e.target instanceof HTMLElement)) return;
    if (!this.startCursorPos) {
      e.type.includes("touch")
        ? (this.startCursorPos = (e as TouchEvent).targetTouches[0].clientX)
        : (this.startCursorPos = (e as MouseEvent).x);
    }
  };

  end = (e: Event) => {
    if (!(e.target as HTMLDivElement).closest(".gri-slider__img")) return;
    if (!this.startCursorPos) return;
    e.type.includes("touch")
      ? (this.endCursorPos = (e as TouchEvent).changedTouches[0].clientX)
      : (this.endCursorPos = (e as MouseEvent).x);

    const diff =
      (this.endCursorPos as number) - (this.startCursorPos as number);

    if (diff > 0 && diff > 30) {
      this.count--;
    }

    if (diff < 0 && diff < -30) {
      this.count++;
    }

    this.prepareForMoveTrack();
    this.isGrabbing = false;
    this.startCursorPos = null;
  };

  // CLICK EVENT HANDLER -------------

  addClickEventToSliderHandler = (e: Event) => {
    if (!(e.target instanceof HTMLElement)) return;

    if (!EVENT_SELECTORS.some((sel) => (e.target as HTMLElement).closest(sel)))
      return;

    switch (true) {
      case !!e.target.closest(EVENT_SELECTORS[0]):
        this.count--;
        break;
      case !!e.target.closest(EVENT_SELECTORS[1]):
        this.count++;
        break;
      default:
        this.count = +e.target.id;
        break;
    }
    this.prepareForMoveTrack();
  };

  addClickEventToSlider() {
    this.$slider.addEventListener("click", this.addClickEventToSliderHandler);
  }

  addSwipeEventForDesktop() {
    (this.$track as HTMLDivElement).addEventListener("mousedown", this.start);

    (this.$track as HTMLDivElement).addEventListener("mousemove", this.move);

    (this.$track as HTMLDivElement).addEventListener("mouseup", this.end);
  }

  addSwipeEventForMobile() {
    (this.$track as HTMLDivElement).addEventListener("touchstart", this.start);

    (this.$track as HTMLDivElement).addEventListener("touchmove", this.move);

    (this.$track as HTMLDivElement).addEventListener("touchend", this.end);
  }

  // OBSERVER EVENT
  observer() {
    let options = {
      root: this.$sliderBody,
      rootMargin: "0px",
      threshold: 0.05,
    };

    let cb: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let img = entry.target.children[0] as HTMLImageElement;
          let src = img.dataset.src as string;
          img.src = src;
          observer.unobserve(entry.target);
        }
      });
    };

    if (this.$imageBlocks) {
      this.$imageBlocks.forEach(
        (block, i) =>
          i > 0 && new IntersectionObserver(cb, options).observe(block)
      );
    }
  }
}
