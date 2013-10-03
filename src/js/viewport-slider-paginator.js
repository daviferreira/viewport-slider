/*global console, viewportSlider, console*/

var viewportSliderPaginator;

(function (window, document) {
    'use strict';

    viewportSliderPaginator = {

        init: function init() {
            this.createPaginator();
        },

        createPaginator: function createPaginator() {
            this.root = document.createElement('div');
            this.root.id = 'viewport-slider-paginator';
            this.root.className = 'viewport-slider-paginator';
            this.root.innerHTML = '<ul>' +
                                  this.getPagesHtml() +
                                  '</ul>';
            document.body.appendChild(this.root);
            this.root.style.marginTop = -(this.root.offsetHeight / 2) + 'px';
            this.bindPagination();
        },

        getPagesHtml: function getPagesHtml() {
            var i,
                html = '';
            for (i = 0; i < viewportSlider.slides.length; i += 1) {
                html += '<li><a href="#" data-index="' + i + '" class="' +
                        (i === 0 ? 'active ' : '') +
                        'viewport-slider-paginator-bullet"><span></span></a></li>';
            }
            return html;
        },

        bindPagination: function bindPagination() {
            var i,
                self = this,
                paginateFn = function (e) {
                    var index = parseInt(this.getAttribute('data-index'), 10);
                    e.preventDefault();
                    viewportSlider.paginate(index, function () {
                        for (i = 0; i < self.links.length; i += 1) {
                            if (i === index) {
                                self.links[i].classList.add('active');
                            } else {
                                self.links[i].classList.remove('active');
                            }
                        }
                    });
                };
            this.links = this.root.querySelectorAll('a');
            for (i = 0; i < this.links.length; i += 1) {
                this.links[i].addEventListener('click', paginateFn);
            }
        }

    };

}(window, document));
