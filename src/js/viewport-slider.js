/*global console*/

var viewportSlider = {};

(function (window, document) {
    'use strict';

    viewportSlider.init = function init(root, selector) {
        document.body.style.overflow = 'hidden';
        this.slides = document.querySelectorAll(selector);
        this.root = root;
        this.root.classList.add('viewport-slide');
        this.isPaginating = false;
        this.currentSlide = 0;
        this.setUpSlides()
            .bindScroll();
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

    viewportSlider.bindScroll = function bindScroll() {
        var self = this,
            delta = 0,
            wheelDirection = function (e) {
                if (!e) {
                    e = window.event;
                }
                return (e.detail < 0 || e.wheelDelta > 0) ? 1 : -1;
            };

        window.addEventListener('mousewheel', function (e) {
            if (self.isPaginating) {
                return false;
            }
            e.preventDefault();
            e.stopPropagation();
            delta = wheelDirection(e);
            if (delta > 0) {
                self.paginate(self.currentSlide - 1);
            } else {
                self.paginate(self.currentSlide + 1);
            }
        });
    };

    viewportSlider.paginate = function paginate(index) {
        if (index < 0 || index > (this.slides.length - 1)) {
            return;
        }
        var self = this;
        this.isPaginating = true;
        this.root.style.webkitTransform = 'translate3d(0, -' + (index * document.documentElement.clientHeight) + 'px, 0)';
        setTimeout(function () {
            self.isPaginating = false;
            self.currentSlide = index;
        }, 450);
    };

}(window, document));
