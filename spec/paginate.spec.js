/*global viewportSlider, describe, it, expect, spyOn,
         afterEach, beforeEach, fireEvent, jasmine*/

describe('Paginate TestCase', function () {
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
        viewportSlider.currentSlide = 0;
    });

    it('should do nothing when index is less than 0', function () {
        spyOn(viewportSlider, 'applyTransform');
        viewportSlider.paginate(-1);
        expect(viewportSlider.applyTransform).not.toHaveBeenCalled();
    });

    it('should do nothing when index is greater than slides length', function () {
        spyOn(viewportSlider, 'applyTransform');
        viewportSlider.paginate(viewportSlider.slides.length);
        expect(viewportSlider.applyTransform).not.toHaveBeenCalled();
    });

    it('should do nothing when index is the same as currentSlide', function () {
        spyOn(viewportSlider, 'applyTransform');
        viewportSlider.paginate(0);
        expect(viewportSlider.applyTransform).not.toHaveBeenCalled();
    });

    it('should set the css transform on the root element', function () {
        spyOn(viewportSlider, 'applyTransform').andCallThrough();
        viewportSlider.paginate(1);
        expect(viewportSlider.applyTransform).toHaveBeenCalledWith(100);
        expect(this.el.style['-webkit-transform']).toBe('translate3d(0px, -100%, 0px)');
        expect(this.el.style['-moz-transform']).toBe('translate3d(0px, -100%, 0px)');
        expect(this.el.style['-ms-transform']).toBe('translate3d(0px, -100%, 0px)');
        expect(this.el.style.transform).toBe('translate3d(0px, -100%, 0px)');
    });

    it('should update the current slide after paginating', function () {
        jasmine.Clock.useMock();
        expect(viewportSlider.currentSlide).toBe(0);
        viewportSlider.paginate(1);
        jasmine.Clock.tick(viewportSlider.options.animationHalt);
        expect(viewportSlider.currentSlide).toBe(1);
    });

    it('should do nothing when scrollTime is less than animationHalt', function () {
        var res = viewportSlider.paginate(1);
        expect(res).toBe(undefined);
        res = viewportSlider.paginate(1);
        expect(res).toBe(false);
    });

    it('should execute the callback when it is present', function () {
        var callback = jasmine.createSpy();
        viewportSlider.paginate(1, callback);
        expect(callback).toHaveBeenCalled();
    });

});
