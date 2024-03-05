import { toggleClass, iterator, checkCount, nested } from "../utils/utils.js";
const EVENT_SELECTORS = [
    ".slider__prev",
    ".slider__next",
    ".slider__panel_btn",
    ".slider__panel_dot",
];
export default class Slider {
    list;
    options;
    $sliderBody;
    $slider;
    $track;
    $imageBlocks;
    $controls;
    $dots;
    count;
    width;
    panel;
    imgInSlideCount;
    constructor({ list, options = {}, panel = undefined, imgInSlideCount = 1, }) {
        // DOM-ELEMS
        this.$sliderBody = document.querySelector(`.slider__body`);
        this.$slider = document.querySelector(`.slider`);
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
        this.builder(this.$sliderBody, this.list, this.$slider, this.options, this.panel, this.imgInSlideCount);
    }
    builder(sliderBody, list, slider, options, panel, imgInSlideCount) {
        // order to invoke:
        // 1
        this.render(sliderBody, list);
        // 2
        panel && this[panel[0]](slider, list);
        // 3
        this.trackStyles(this.$track, this.$imageBlocks, list, imgInSlideCount);
        // 4
        this.checkOptionsStyles(options);
        // 5
        this.addClickEventToSlider();
        // 6
        this.resize();
    }
    render(sliderBody, list) {
        sliderBody.innerHTML = `<div class="slider__track">
        ${iterator(list, (slidesArr) => `
            ${slidesArr
            .map(({ slideImg, comment }) => `
                <article class="slider__img">
                  <img src="${slideImg}" />
                  <span class="slider__img_index"> ${comment || ``}</span>
                </article>`)
            .join("")}
            `, "map")}            
    </div>        
    `;
        this.$track = document.querySelector(".slider__track");
        this.$imageBlocks = document.querySelectorAll(".slider__img");
    }
    renderControls(slider, list) {
        const image = list[0][0].controlImg;
        slider.insertAdjacentHTML("beforeend", `
    <section class='slider__panel'>
     ${image
            ? iterator(list, (_, i) => `<div class='slider__panel_btn ${i === 0 ? "active" : ""}'>
                  <img src="${image}" id='${i}' loading='lazy'/>                      
                </div>`, "map")
            : iterator(list, (_, i) => `
                <div class='slider__panel_btn ${i === 0 ? "active" : ""}' id='${i}' style="border: 1px solid">                  
                    ${i + 1}
                </div>`, "map")}
  	</section>
  `);
        this.$controls = Array.from(document.querySelectorAll(".slider__panel_btn"));
    }
    renderDots(slider, list) {
        slider.insertAdjacentHTML("beforeend", `
		<section class='slider__panel'>
		${iterator(list, (_, i) => `<div class='slider__panel_dot ${i === 0 ? "active" : ""}' id='${i}'></div>`, "map")}
		</section>
	`);
        this.$dots = Array.from(document.querySelectorAll(".slider__panel_dot"));
    }
    trackStyles = (track, images, list, imgInSlideCount) => {
        this.width = this.$sliderBody.offsetWidth;
        images.forEach((img) => (img.style.width = `${this.width / imgInSlideCount - 8}px`));
        track.style.width = `${this.width * list.length}px`;
    };
    checkOptionsStyles(options) {
        if (!Object.values(options).length) {
            return console.warn(`Cant find any prop in style-options of ${this.constructor.name} constructor`);
        }
        // check the correction of options props values:
        if (!Object.values(options).find((val) => val)) {
            return console.warn(`The values of 'Options object' are empty or falsy...`);
        }
        iterator(Object.keys(options), (key) => (this.$slider.style[key] = options[key]), "forEach");
    }
    moveTrack(count) {
        this.$track.style.transform = `translateX(-${count * this.width}px)`;
    }
    selectActiveElem(ind, elem) {
        iterator(this[elem], (elem, i) => {
            elem.classList.remove("active");
            ind === i && elem.classList.add("active");
        }, "forEach");
    }
    resize() {
        window.addEventListener("resize", () => this.trackStyles(this.$track, this.$imageBlocks, this.list, this.imgInSlideCount));
    }
    // EVENTS --------------------------------------------
    addClickEventToSliderHandler = (e) => {
        if (!(e.target instanceof HTMLElement))
            return;
        if (!EVENT_SELECTORS.some((sel) => e.target.closest(sel)))
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
export class AutoSlider extends Slider {
    isAutoSlider;
    intervalId;
    constructor({ isAutoSlider = false, list, options, panel, imgInSlideCount, }) {
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
                this.selectActiveElem(this.count, this.$controls ? "$controls" : "$dots");
            this.moveTrack(this.count);
        }, 1700);
    }
    addMouseEventToSliderHandler = (e) => {
        if (e.type === "mouseenter") {
            clearInterval(this.intervalId);
            return toggleClass(EVENT_SELECTORS.slice(0, 2));
        }
        toggleClass(EVENT_SELECTORS.slice(0, 2));
        this.isAutoSlider && this.autoSlider();
    };
    addMouseEventToSlider() {
        this.$slider.addEventListener("mouseenter", this.addMouseEventToSliderHandler);
        this.$slider.addEventListener("mouseleave", this.addMouseEventToSliderHandler);
    }
}
