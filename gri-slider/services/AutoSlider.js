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
import Slider from "./Slider.js";
import { toggleClass, EVENT_SELECTORS } from "../utils/utils.js";
var AutoSlider = (function (_super) {
    __extends(AutoSlider, _super);
    function AutoSlider(_a) {
        var _b = _a.isAutoSlider, isAutoSlider = _b === void 0 ? false : _b, list = _a.list, csssd = _a.csssd, panel = _a.panel, imgInSlideCount = _a.imgInSlideCount, _c = _a.delay, delay = _c === void 0 ? 1800 : _c, arrows = _a.arrows, lazyLoad = _a.lazyLoad;
        var _this = _super.call(this, { csssd: csssd, list: list, panel: panel, imgInSlideCount: imgInSlideCount, arrows: arrows, lazyLoad: lazyLoad }) || this;
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
        arrows && _this.addMouseEventToSlider();
        _this.isAutoSlider && _this.autoSlider(_this.delay);
        _this.resize();
        return _this;
    }
    AutoSlider.prototype.autoSlider = function (delay) {
        var _this = this;
        this.intervalId = setInterval(function () {
            _this.count++;
            _this.prepareForMoveTrack();
        }, delay);
    };
    AutoSlider.prototype.addMouseEventToSlider = function () {
        this.$slider.addEventListener("mouseenter", this.addMouseEventToSliderHandler);
        this.$slider.addEventListener("mouseleave", this.addMouseEventToSliderHandler);
    };
    AutoSlider.prototype.resize = function () {
        var _this = this;
        window.addEventListener("resize", function () {
            return _this.trackStyles(_this.$track, _this.$imageBlocks, _this.list, _this.imgInSlideCount);
        });
    };
    return AutoSlider;
}(Slider));
export default AutoSlider;
