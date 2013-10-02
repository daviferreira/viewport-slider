var viewportSlider = {};

(function (window, document) {
    'use strict';

    viewportSlider.init = function init(selector) {
        document.body.style.overflow = 'hidden';
        this.slides = document.querySelectorAll(selector);
        this.setUpSlides();
        return this;
    };

    viewportSlider.setUpSlides = function setUpSlides() {
        var i;
        for (i = 0; i < this.slides.length; i += 1) {
            this.slides[i].style.height = document.documentElement.clientHeight + 'px';
            this.slides[i].style.width = document.documentElement.clientWidth + 'px';
        }
        return this;
    };

}(window, document));
