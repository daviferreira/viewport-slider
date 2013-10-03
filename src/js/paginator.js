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
                paginateFn = function (e) {
                    e.preventDefault();
                    viewportSlider.paginate(parseInt(this.getAttribute('data-index'), 10));
                };
            this.links = this.root.querySelectorAll('a');
            for (i = 0; i < this.links.length; i += 1) {
                this.links[i].addEventListener('click', paginateFn);
            }
        },

        activate: function activate(index) {
            var i;
            for (i = 0; i < this.links.length; i += 1) {
                if (i === index) {
                    this.links[i].classList.add('active');
                } else {
                    this.links[i].classList.remove('active');
                }
            }
        }

    };

}(window, document));
