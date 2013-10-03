var viewportSlider;

(function (window, document) {
    'use strict';

    viewportSlider = {

        init: function init(root, selector) {
            document.body.style.overflow = 'hidden';
            this.slides = document.querySelectorAll(selector);
            this.root = root;
            this.root.classList.add('viewport-slide-container');
            this.lastScrolled = 0;
            // TODO: options
            this.animationHalt = 1500;
            this.currentSlide = 0;
            this.setUpSlides()
                .bindScroll();
            return this;
        },

        setUpSlides: function setUpSlides() {
            var i;
            for (i = 0; i < this.slides.length; i += 1) {
                this.slides[i].classList.add('viewport-slide');
            }
            return this;
        },

        bindScroll: function bindScroll() {
            var self = this,
                onMouseWheel = function (e) {
                    self.scroll(e);
                };

            window.addEventListener('mousewheel', onMouseWheel);
            window.addEventListener('DOMMouseScroll', onMouseWheel);
        },

        getWheelDirection: function getWheelDirection(e) {
            if (!e) {
                e = window.event;
            }
            return (e.detail < 0 || e.wheelDelta > 0) ? 1 : -1;
        },

        scroll: function scroll(e) {
            var scrollTime = new Date().getTime(),
                delta = 0;
            if (scrollTime - this.lastScrolled < this.animationHalt) {
                return false;
            }
            e.preventDefault();
            e.stopPropagation();
            delta = this.getWheelDirection(e);
            if (delta > 0) {
                this.paginate(this.currentSlide - 1);
            } else {
                this.paginate(this.currentSlide + 1);
            }
            this.lastScrolled = scrollTime;
        },

        paginate: function paginate(index) {
            if (index < 0 || index > (this.slides.length - 1)) {
                return;
            }
            var self = this;
            this.applyTransform(index * 100);
            setTimeout(function () {
                self.currentSlide = index;
            }, this.animationHalt - 1);
        },

        applyTransform: function applyTransform(pos) {
            this.root.style['-webkit-transform'] = 'translate3d(0px, -' + pos + '%, 0px)';
            this.root.style['-moz-transform'] = 'translate3d(0px, -' + pos + '%, 0px)';
            this.root.style['-ms-transform'] = 'translate3d(0px, -' + pos + '%, 0px)';
            this.root.style.transform = 'translate3d(0px, -' + pos + '%, 0px)';
        }

    };

}(window, document));
