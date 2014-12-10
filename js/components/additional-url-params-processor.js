'use strict';

/**
 * Process additional url params on application load:
 * -scrollTo
 * -overflowHeight
 *
 * @param options
 * @constructor
 */
var AdditionalUrlParamsProcessor = function (options) {
    this.options = options;


    this.checkScrollTo();
    this.checkOverflowHeight();
};

// UTILS
function findPosition(element) {
    var curleft = 0, curtop = 0;
    if (element.offsetParent) {
        do {
            curleft += element.offsetLeft;
            curtop += element.offsetTop;
        } while (element = element.offsetParent);
        return {x: curleft, y: curtop};
    }
    return undefined;
}

function applyStyles(elements, css) {
    Object.keys(css).forEach(function (name) {
        elements.forEach(function (element) {
            element.style[name] = css[name];
        });
    });
}

function getWindowScrollPosition() {
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

    return {
        x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
        y: window.pageXOffset !== undefined ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
    };
}

// CHECK PARAMS

// scroll to element
AdditionalUrlParamsProcessor.prototype.checkScrollTo = function () {
    var scrollToParam = this.options.routerController.getParamFromUrl('scrollTo');
    if (!scrollToParam) return;

    var scrollToEl = document.querySelector(scrollToParam);
    if (scrollToEl && scrollToEl.scrollIntoView) {
        window.scrollTo(0, findPosition(scrollToEl).y);
    }
};

// overflow page by height
AdditionalUrlParamsProcessor.prototype.checkOverflowHeight = function () {
    var overflowHeightParam = this.options.routerController.getParamFromUrl('overflowHeight');
    if (!overflowHeightParam) return;


    var scrollY = getWindowScrollPosition().y;// save page scroll Y position before overflow page

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

    // reapply scroll Y
    if (scrollY) {// if page was Y scrolled- emulate back that position
        applyStyles([
                document.querySelector('#container')
            ],
            {
                'position': 'relative',
                'top': -scrollY + 'px'

            });
    }
};

exports.AdditionalUrlParamsProcessor = AdditionalUrlParamsProcessor;