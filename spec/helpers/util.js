function fireEvent(element, event, options) {
    'use strict';
    var evt;
    options = options || {};
    evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true);
    if (options.detail) {
        evt.detail = options.detail;
    }
    if (options.wheelDelta) {
        evt.wheelDelta = options.wheelDelta;
    }
    return !element.dispatchEvent(evt);
}
