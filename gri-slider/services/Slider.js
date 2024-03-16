import { iterator, checkCount, nested, EVENT_SELECTORS, } from "../utils/utils.js";
var Slider = (function () {
    function Slider(_a) {
        var _this = this;
        var list = _a.list, _b = _a.csssd, csssd = _b === void 0 ? {} : _b, _c = _a.panel, panel = _c === void 0 ? undefined : _c, _d = _a.imgInSlideCount, imgInSlideCount = _d === void 0 ? 1 : _d, arrows = _a.arrows, lazyLoad = _a.lazyLoad;
        var _e;
        this.trackStyles = function (track, images, list, imgInSlideCount) {
            _this.width = _this.$sliderBody.offsetWidth;
            images.forEach(function (img) {
                return (img.style.width = "".concat(_this.width / imgInSlideCount - 8, "px"));
            });
            track.style.width = "".concat(_this.width * list.length, "px");
        };
        this.start = function (e) {
            if (!e.target.closest(".gri-slider__img"))
                return;
            _this.isGrabbing = true;
        };
        this.move = function (e) {
            if (!e.target.closest(".gri-slider__img"))
                return;
            if (!_this.isGrabbing)
                return;
            if (!(e.target instanceof HTMLElement))
                return;
            if (!_this.startCursorPos) {
                e.type.includes("touch")
                    ? (_this.startCursorPos = e.targetTouches[0].clientX)
                    : (_this.startCursorPos = e.x);
            }
        };
        this.end = function (e) {
            if (!e.target.closest(".gri-slider__img"))
                return;
            if (!_this.startCursorPos)
                return;
            e.type.includes("touch")
                ? (_this.endCursorPos = e.changedTouches[0].clientX)
                : (_this.endCursorPos = e.x);
            var diff = _this.endCursorPos - _this.startCursorPos;
            if (diff > 0 && diff > 30) {
                _this.count--;
            }
            if (diff < 0 && diff < -30) {
                _this.count++;
            }
            _this.prepareForMoveTrack();
            _this.isGrabbing = false;
            _this.startCursorPos = null;
        };
        this.addClickEventToSliderHandler = function (e) {
            if (!(e.target instanceof HTMLElement))
                return;
            if (!EVENT_SELECTORS.some(function (sel) { return e.target.closest(sel); }))
                return;
            switch (true) {
                case !!e.target.closest(EVENT_SELECTORS[0]):
                    _this.count--;
                    break;
                case !!e.target.closest(EVENT_SELECTORS[1]):
                    _this.count++;
                    break;
                default:
                    _this.count = +e.target.id;
                    break;
            }
            _this.prepareForMoveTrack();
        };
        this.$sliderBody = null;
        this.$slider = document.querySelector(".gri-slider");
        this.$track = null;
        this.$imageBlocks = null;
        this.$controls = null;
        this.$dots = null;
        this.arrows = arrows;
        this.csssd = csssd;
        this.panel = panel;
        this.imgInSlideCount = imgInSlideCount;
        this.list = nested(list, this.imgInSlideCount);
        this.count = 0;
        this.width = null;
        this.isGrabbing = false;
        this.startCursorPos = null;
        this.endCursorPos = null;
        if (!((_e = this.list) === null || _e === void 0 ? void 0 : _e.length))
            return console.error("YOU SHOULD PASS NON_EMPTY SLIDES ARRAY AS A VALUE OF 'LIST' PROP!");
        this.builder(this.list, this.$slider, this.csssd, this.panel, this.imgInSlideCount, this.arrows, lazyLoad);
    }
    Slider.prototype.builder = function (list, slider, csssd, panel, imgInSlideCount, arrows, lazyload) {
        this.render(slider, list, arrows, lazyload);
        arrows && this.renderArrows(arrows);
        panel && this[panel[0]](slider, list);
        this.trackStyles(this.$track, this.$imageBlocks, list, imgInSlideCount);
        this.checkOptionsStyles(csssd);
        lazyload && this.observer();
        this.disableContextMenu();
        this.addClickEventToSlider();
        this.addSwipeEventForMobile();
        this.addSwipeEventForDesktop();
    };
    Slider.prototype.render = function (slider, list, arrows, lazyLoad) {
        slider.innerHTML = "\n    ".concat(arrows ? "<div class=\"gri-slider__prev\"></div>" : "", "\n    <div class=\"gri-slider__body\">\n        <div class=\"gri-slider__track\">\n            ").concat(iterator(list, function (slidesArr, i) { return "\n                ".concat(slidesArr
            .map(function (_a) {
            var slideImg = _a.slideImg, comment = _a.comment;
            return "\n                    <article class=\"gri-slider__img\">\n                      ".concat(lazyLoad
                ? "<img src=\"".concat(i === 0 ? slideImg : "", "\" data-src='").concat(slideImg, "'/>")
                : "<img src=\"".concat(slideImg, "\" alt=\"check 'src'\"/>"), "                      \n                      <span class=\"gri-slider__img_comment\"> ").concat(comment || "", "</span>\n                    </article>");
        })
            .join(""), "              \n                "); }, "map"), "              \n        </div>    \n    </div>    \n    ").concat(arrows ? "<div class=\"gri-slider__next\"></div>" : "", "             \n    ");
        this.$sliderBody = document.querySelector(".gri-slider__body");
        this.$track = document.querySelector(".gri-slider__track");
        this.$imageBlocks = document.querySelectorAll(".gri-slider__img");
        this.$imageBlocks.forEach(function (imageBlock) {
            imageBlock.addEventListener("dragstart", function (e) { return e.preventDefault(); });
        });
    };
    Slider.prototype.renderControls = function (slider, list) {
        var panelIcon = list[0][0].controlImg;
        slider.insertAdjacentHTML("beforeend", "\n    <section class='gri-slider__panel'>\n     ".concat(panelIcon
            ? iterator(list, function (_, i) {
                return "<div class='gri-slider__panel_btn ".concat(i === 0 ? "active" : "", "'>\n                  <img src=\"").concat(panelIcon, "\" id='").concat(i, "' loading=\"lazy\"/>                      \n                </div>");
            }, "map")
            : iterator(list, function (_, i) { return "\n                <div class='gri-slider__panel_btn ".concat(i === 0 ? "active" : "", "' id='").concat(i, "' style=\"border: 1px solid\">                  \n                    ").concat(i + 1, "\n                </div>"); }, "map"), "\n  \t</section>\n  "));
        this.$controls = Array.from(document.querySelectorAll(".gri-slider__panel_btn"));
    };
    Slider.prototype.renderDots = function (slider, list) {
        slider.insertAdjacentHTML("beforeend", "\n\t\t<section class='gri-slider__panel'>\n\t\t".concat(iterator(list, function (_, i) {
            return "<div class='gri-slider__panel_dot ".concat(i === 0 ? "active" : "", "' id='").concat(i, "'></div>");
        }, "map"), "\n\t\t</section>\n\t"));
        this.$dots = Array.from(document.querySelectorAll(".gri-slider__panel_dot"));
    };
    Slider.prototype.renderArrows = function (arrows) {
        iterator(Object.keys(arrows), function (key) {
            return key === "prev"
                ? (document.querySelector(EVENT_SELECTORS[0]).innerHTML = arrows[key])
                : (document.querySelector(EVENT_SELECTORS[1]).innerHTML = arrows[key]);
        }, "forEach");
    };
    Slider.prototype.checkOptionsStyles = function (csssd) {
        var _this = this;
        if (!Object.values(csssd).length) {
            return console.warn("Cant find any prop in style-options of ".concat(this.constructor.name, " constructor"));
        }
        if (!Object.values(csssd).find(function (val) { return val; })) {
            return console.warn("The values of 'Options object' are empty or falsy...");
        }
        iterator(Object.keys(csssd), function (key) { return (_this.$slider.style[key] = csssd[key]); }, "forEach");
    };
    Slider.prototype.prepareForMoveTrack = function () {
        this.count = checkCount(this.count, this.list);
        this.panel &&
            this.selectActiveElem(this.count, this.$controls ? "$controls" : "$dots");
        this.moveTrack(this.count);
    };
    Slider.prototype.moveTrack = function (count) {
        this.$track.style.transform = "translate3D(-".concat(count * this.width, "px, 0px, 0px)");
    };
    Slider.prototype.selectActiveElem = function (ind, elem) {
        iterator(this[elem], function (elem, i) {
            elem.classList.remove("active");
            ind === i && elem.classList.add("active");
        }, "forEach");
    };
    Slider.prototype.disableContextMenu = function () {
        this.$slider.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
    };
    Slider.prototype.addClickEventToSlider = function () {
        this.$slider.addEventListener("click", this.addClickEventToSliderHandler);
    };
    Slider.prototype.addSwipeEventForDesktop = function () {
        this.$track.addEventListener("mousedown", this.start);
        this.$track.addEventListener("mousemove", this.move);
        this.$track.addEventListener("mouseup", this.end);
    };
    Slider.prototype.addSwipeEventForMobile = function () {
        this.$track.addEventListener("touchstart", this.start);
        this.$track.addEventListener("touchmove", this.move);
        this.$track.addEventListener("touchend", this.end);
    };
    Slider.prototype.observer = function () {
        var options = {
            root: this.$sliderBody,
            rootMargin: "0px",
            threshold: 0.05,
        };
        var cb = function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var img = entry.target.children[0];
                    var src = img.dataset.src;
                    img.src = src;
                    observer.unobserve(entry.target);
                }
            });
        };
        if (this.$imageBlocks) {
            this.$imageBlocks.forEach(function (block, i) {
                return i > 0 && new IntersectionObserver(cb, options).observe(block);
            });
        }
    };
    return Slider;
}());
export default Slider;
