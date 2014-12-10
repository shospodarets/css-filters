'use strict';

/**
 * Process additional url params on application load:
 * -overflowHeight=330
 * -hideContentExcept=.demo-img,.applied-filter
 *
 * @param options
 * @constructor
 */
var AdditionalUrlParamsProcessor = function (options) {
    this.options = options;


    this.checkHideContentExcept();
    this.checkOverflowHeight();
};

// UTILS
function applyStyles(elements, css) {
    Object.keys(css).forEach(function (name) {
        elements.forEach(function (element) {
            element.style[name] = css[name];
        });
    });
}

// CHECK PARAMS

// hide all content boxes except provided in param
AdditionalUrlParamsProcessor.prototype.checkHideContentExcept = function () {
    var hideContentExceptParam = this.options.routerController.getParamFromUrl('hideContentExcept');
    if (!hideContentExceptParam) return;

    var notHideElements = hideContentExceptParam.split(',');
    var query = '#container > *';
    notHideElements.forEach(function (notHideElement) {
        query += ':not(' + notHideElement + ')';
    });
    // RESULT QUERY EXAMPLE:
    // from param: hideContentExcept=.demo-img,.applied-filter
    // to quesry: #container > *:not(.demo-img):not(.applied-filter)

    var contentElements = document.querySelectorAll(query);
    applyStyles(
        Array.prototype.slice.call(contentElements),// to Array
        {
            'display': 'none'
        }
    );
};

// overflow page by height
AdditionalUrlParamsProcessor.prototype.checkOverflowHeight = function () {
    var overflowHeightParam = this.options.routerController.getParamFromUrl('overflowHeight');
    if (!overflowHeightParam) return;

    // overflow page
    applyStyles([
            document.querySelector('html'),
            document.body
        ],
        {
            'overflow': 'hidden',
            'height': overflowHeightParam + 'px',
            'min-height': 0
        });
};

exports.AdditionalUrlParamsProcessor = AdditionalUrlParamsProcessor;