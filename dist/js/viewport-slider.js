var viewportSlider = {};

(function (window, document) {
    'use strict';

    viewportSlider.init = function init(root, selector) {
        document.body.style.overflow = 'hidden';
        this.slides = document.querySelectorAll(selector);
        this.root = root;
        this.root.classList.add('viewport-slide');
        this.lastScrolled = 0;
        // this is needed due to trackpads that chain the mousewheel event
        this.animationHalt = 1500;
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
            var scrollTime = new Date().getTime();
            if (scrollTime - self.lastScrolled < self.animationHalt) {
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
            self.lastScrolled = scrollTime;
        });
    };

    viewportSlider.paginate = function paginate(index) {
        if (index < 0 || index > (this.slides.length - 1)) {
            return;
        }
        var self = this;
        this.applyTransform(index * document.documentElement.clientHeight);
        setTimeout(function () {
            self.currentSlide = index;
        }, 450);
    };

    viewportSlider.applyTransform = function applyTransform(pos) {
        this.root.style["-webkit-transform"] = "translate3d(0, -" + pos + "px, 0)";
        this.root.style["-moz-transform"] = "translate3d(0, -" + pos + "px, 0)";
        this.root.style["-ms-transform"] = "translate3d(0, -" + pos + "px, 0)";
        this.root.style.transform = "translate3d(0, -" + pos + "px, 0)";
    };

}(window, document));
