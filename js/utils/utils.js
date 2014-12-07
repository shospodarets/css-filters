'use strict';

/**
 * Inheritance function
 *
 * @param child
 * @param parent
 */
exports.inherit = function (child, parent) {
    var Class = function () {
    };
    Class.prototype = parent.prototype;
    child.prototype = new Class();

    //noinspection JSUnusedGlobalSymbols
    child.prototype.constructor = child;
    child.superclass_ = parent.prototype;
};

exports.cloneObj = function (obj) {
    var clone = {};
    Object.keys(obj).forEach(function (keyName) {
        clone[keyName] = obj[keyName];
    });
    return clone;
};

// Return css string
exports.getCssDeclaration = function (prop, value) {
    return prop + ':' + value + ';';
};

// detect if "filter" property needs vendor
exports.filterProperty = (function () {
    var el = document.createElement('div'),
        vendors = [
            '-moz-filter',
            '-webkit-filter',
            '-ms-filter'
        ],
        valueToCheck = 'invert(0.1)',
        i, length, vendor,
        _filterProperty;
    for (i = 0, length = vendors.length; i < length; i++) {
        vendor = vendors[i];
        el.style.cssText = exports.getCssDeclaration(vendor, valueToCheck);
        if (el.style.length) {
            _filterProperty = vendor;
            break;
        }
    }
    if (!_filterProperty) {// vendor isn't needed
        _filterProperty = 'filter';
    }
    return _filterProperty;
}());

function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return {x: curleft, y: curtop};
    }
    return undefined;
}

exports.scrollToElement = function (query) {
    if (!query) return;

    var scrollToEl = document.querySelector(query);
    if (scrollToEl && scrollToEl.scrollIntoView) {
        window.scrollTo(0, findPos(scrollToEl).y);
    }
};