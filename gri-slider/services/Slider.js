var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { toggleClass, iterator, checkCount, nested } from "../utils/utils.js";
var EVENT_SELECTORS = [
    ".gri-slider__prev",
    ".gri-slider__next",
    ".gri-slider__panel_btn",
    ".gri-slider__panel_dot",
];
var Slider = (function () {
    function Slider(_a) {
        var _this = this;
        var list = _a.list, _b = _a.csssd, csssd = _b === void 0 ? {} : _b, _c = _a.panel, panel = _c === void 0 ? undefined : _c, _d = _a.imgInSlideCount, imgInSlideCount = _d === void 0 ? 1 : _d, _e = _a.arrows, arrows = _e === void 0 ? [] : _e;
        this.mouseDown = function (e) {
            if (!e.target.closest(".gri-slider__img"))
                return;
            _this.isGrabbing = true;
        };
        this.mouseMove = function (e) {
            if (!e.target.closest(".gri-slider__img"))
                return;
            if (!_this.isGrabbing)
                return;
            if (!(e.target instanceof HTMLElement))
                return;
            if (!_this.startCursorPos)
                _this.startCursorPos = e.x;
        };
        this.mouseUp = function (e) {
            if (!e.target.closest(".gri-slider__img"))
                return;
            if (!_this.startCursorPos)
                return;
            _this.endCursorPos = e.x;
            var diff = _this.endCursorPos - _this.startCursorPos;
            if (diff > 0 && diff > 70) {
                _this.count--;
            }
            if (diff < 0 && diff < -70) {
                _this.count++;
            }
            _this.prepareForMoveTrack();
            _this.isGrabbing = false;
            _this.startCursorPos = null;
        };
        this.touchStart = function (e) {
            if (!e.target.closest(".gri-slider__img"))
                return;
            _this.isGrabbing = true;
        };
        this.touchMove = function (e) {
            if (!e.target.closest(".gri-slider__img"))
                return;
            if (!_this.isGrabbing)
                return;
            if (!(e.target instanceof HTMLElement))
                return;
            if (!_this.startCursorPos)
                _this.startCursorPos = e.targetTouches[0].clientX;
        };
        this.touchEnd = function (e) {
            if (!e.target.closest(".gri-slider__img"))
                return;
            if (!_this.startCursorPos)
                return;
            _this.endCursorPos = e.changedTouches[0].clientX;
            var diff = _this.endCursorPos - _this.startCursorPos;
            if (diff > 0 && diff > 70) {
                _this.count--;
            }
            if (diff < 0 && diff < -70) {
                _this.count++;
            }
            _this.prepareForMoveTrack();
            _this.isGrabbing = false;
            _this.startCursorPos = null;
        };
        this.trackStyles = function (track, images, list, imgInSlideCount) {
            _this.width = _this.$sliderBody.offsetWidth;
            images.forEach(function (img) {
                return (img.style.width = "".concat(_this.width / imgInSlideCount - 8, "px"));
            });
            track.style.width = "".concat(_this.width * list.length, "px");
        };
        this.addClickEventToSliderHandler = function (e) {
            if (!(e.target instanceof HTMLElement))
                return;
            if (!EVENT_SELECTORS.some(function (sel) { return e.target.closest(sel); }))
                return;
            switch (e.target.id) {
                case "prev":
                    _this.count--;
                    break;
                case "next":
                    _this.count++;
                    break;
                default:
                    _this.count = +e.target.id;
                    break;
            }
            _this.prepareForMoveTrack();
        };
        this.$sliderBody = document.querySelector(".gri-slider__body");
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
        if (!list.length)
            throw new Error("You should pass non-empty Array as a value of the `list` param!");
        this.builder(this.$sliderBody, this.list, this.$slider, this.csssd, this.panel, this.imgInSlideCount, this.arrows);
    }
    Slider.prototype.builder = function (sliderBody, list, slider, csssd, panel, imgInSlideCount, arrows) {
        arrows.length && this.renderArrows(arrows);
        this.render(sliderBody, list);
        panel && this[panel[0]](slider, list);
        this.trackStyles(this.$track, this.$imageBlocks, list, imgInSlideCount);
        this.checkOptionsStyles(csssd);
        this.addClickEventToSlider();
        this.resize();
        this.addSwipeEventForDesktop();
        this.addSwipeEventForMobile();
        this.disableContextMenu();
    };
    Slider.prototype.render = function (sliderBody, list) {
        sliderBody.innerHTML = "<div class=\"gri-slider__track\">\n        ".concat(iterator(list, function (slidesArr) { return "\n            ".concat(slidesArr
            .map(function (_a) {
            var slideImg = _a.slideImg, comment = _a.comment;
            return "\n                <article class=\"gri-slider__img\">\n                  <img src=\"".concat(slideImg, "\" />\n                  <span class=\"gri-slider__img_index\"> ").concat(comment || "", "</span>\n                </article>");
        })
            .join(""), "\n            "); }, "map"), "            \n    </div>        \n    ");
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
        var prev = "gri-slider__prev";
        var next = "gri-slider__next";
        iterator(arrows, function (arrow) {
            return arrow.includes(prev)
                ? (document.querySelector(".".concat(prev)).innerHTML =
                    arrow)
                : (document.querySelector(".".concat(next)).innerHTML =
                    arrow);
        }, "forEach");
    };
    Slider.prototype.disableContextMenu = function () {
        this.$slider.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
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
    Slider.prototype.resize = function () {
        var _this = this;
        window.addEventListener("resize", function () {
            return _this.trackStyles(_this.$track, _this.$imageBlocks, _this.list, _this.imgInSlideCount);
        });
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
    Slider.prototype.addClickEventToSlider = function () {
        this.$slider.addEventListener("click", this.addClickEventToSliderHandler);
    };
    Slider.prototype.addSwipeEventForDesktop = function () {
        this.$track.addEventListener("mousedown", this.mouseDown);
        this.$track.addEventListener("mousemove", this.mouseMove);
        this.$track.addEventListener("mouseup", this.mouseUp);
    };
    Slider.prototype.addSwipeEventForMobile = function () {
        this.$track.addEventListener("touchstart", this.touchStart);
        this.$track.addEventListener("touchmove", this.touchMove);
        this.$track.addEventListener("touchend", this.touchEnd);
    };
    return Slider;
}());
var AutoSlider = (function (_super) {
    __extends(AutoSlider, _super);
    function AutoSlider(_a) {
        var _b = _a.isAutoSlider, isAutoSlider = _b === void 0 ? false : _b, list = _a.list, csssd = _a.csssd, panel = _a.panel, imgInSlideCount = _a.imgInSlideCount, _c = _a.delay, delay = _c === void 0 ? 1800 : _c, arrows = _a.arrows;
        var _this = _super.call(this, { csssd: csssd, list: list, panel: panel, imgInSlideCount: imgInSlideCount, arrows: arrows }) || this;
        _this.addMouseEventToSliderHandler = function (e) {
            if (e.type === "mouseenter") {
                clearInterval(_this.intervalId);
                return toggleClass(EVENT_SELECTORS.slice(0, 2));
            }
            toggleClass(EVENT_SELECTORS.slice(0, 2));
            _this.isAutoSlider && _this.autoSlider(_this.delay);
        };
        _this.isAutoSlider = isAutoSlider;
        _this.intervalId = undefined;
        _this.delay = delay;
        _this.addMouseEventToSlider();
        _this.isAutoSlider && _this.autoSlider(_this.delay);
        return _this;
    }
    AutoSlider.prototype.autoSlider = function (delay) {
        var _this = this;
        this.intervalId = setInterval(function () {
            _this.count++;
            _this.count = checkCount(_this.count, _this.list);
            _this.panel &&
                _this.selectActiveElem(_this.count, _this.$controls ? "$controls" : "$dots");
            _this.moveTrack(_this.count);
        }, delay);
    };
    AutoSlider.prototype.addMouseEventToSlider = function () {
        this.$slider.addEventListener("mouseenter", this.addMouseEventToSliderHandler);
        this.$slider.addEventListener("mouseleave", this.addMouseEventToSliderHandler);
    };
    return AutoSlider;
}(Slider));
export default AutoSlider;
