/*global viewportSlider, describe, it, expect, spyOn,
         afterEach, beforeEach, fireEvent*/

describe('Initialization TestCase', function () {
    'use strict';

    beforeEach(function () {
        this.el = document.createElement('div');
        this.el.innerHTML = '<section class="slide">1</section>' +
                            '<section class="slide">2</section>';
        document.body.appendChild(this.el);
        viewportSlider.init(this.el, '.slide');
    });

    afterEach(function () {
        document.body.removeChild(this.el);
    });

    it('should hide the document scroll', function () {
        expect(document.body.style.overflow).toBe('hidden');
    });

    it('should collect slide elements', function () {
        expect(viewportSlider.slides.length).toBe(2);
    });

    it('should add viewport-slide-container class to the root element', function () {
        expect(this.el.className).toContain('viewport-slide-container');
    });

    it('should call the setUpSlides method', function () {
        spyOn(viewportSlider, 'setUpSlides').andCallThrough();
        viewportSlider.init(this.el, '.slide');
        expect(viewportSlider.setUpSlides).toHaveBeenCalled();
    });

    it('should add viewport-slide class to slide elements', function () {
        var slides = document.querySelectorAll('.slide'),
            i;
        for (i = 0; i < slides.length; i += 1) {
            expect(slides[i].className).toContain('viewport-slide');
        }
    });

    it('should call the bindScroll method', function () {
        spyOn(viewportSlider, 'bindScroll').andCallThrough();
        viewportSlider.init(this.el, '.slide');
        expect(viewportSlider.bindScroll).toHaveBeenCalled();
    });

});
