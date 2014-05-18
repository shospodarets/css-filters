'use strict';

var UTILS = require('../utils/utils'),
    filterProperty = UTILS.filterProperty,
    getCssDeclaration = UTILS.getCssDeclaration;

/**
 * @constructor
 * @param {{
 *   filtersModelData: {
 *      filterName: {
 *          max: {Number},
 *          current: {Number},
 *          name: {String},
 *          [postfix]: {String},
 *          [filterCss]: {String}
 *      }
 *   }
 *
 * }} options
 */
var SchemeChanger = function (options) {
    this.options = options;

    this.demoEl = document.querySelector('.demo-img');
    this.appliedFilterText = document.querySelector('.applied-filter');

    this.setScheme(options.filtersModelData);
};

// MAIN
/**
 * @param {{
 * filterName: {
 *  max: {Number},
 *  current: {Number},
 *  name: {String},
 *  [postfix]: {String},
 *  [filterCss]: {String}
 * }
 * }} filtersModelData
 */
SchemeChanger.prototype.setScheme = function (filtersModelData) {
    var _filtersModelData = UTILS.cloneObj(filtersModelData);

    var cssValue = this.generateFilterCss(_filtersModelData);
    this.setFilterCss(cssValue);
};

// UTILS
SchemeChanger.prototype.generateFilterCss = function (filtersModelData) {
    //noinspection JSUnusedAssignment
    var filterName,
        current,
        filterData,
        enabledFilters = this.getEnabledFilters(filtersModelData),
        postfix = '',
        filterCss = '',
        cssValue = '';
    for (filterName in enabledFilters) {
        //noinspection JSUnfilteredForInLoop
        filterData = enabledFilters[filterName];
        current = filterData.current;
        postfix = filterData.postfix || '';
        filterCss = filterData.filterCss || '';
        //noinspection JSUnfilteredForInLoop
        cssValue += this.generateCssValue(filterName, current, postfix, filterCss);
    }
    return cssValue;
};

/**
 * generate property value, which will be applied for filter.
 * E.g. 'blur(3px) brightness(2.3) drop-shadow(45px 45px 10px black)'.
 *
 * @param filterName {Number}
 * @param current {Number}
 * @param postfix {String|''}
 * @param filterCss {String|''}
 */
SchemeChanger.prototype.generateCssValue = function (filterName, current, postfix, filterCss) {
    var filterInnerVal = '';
    if (filterCss) {
        filterInnerVal = filterCss.replace(/\%CURRENT\%/gi, (current + postfix));
    } else {
        filterInnerVal = current + postfix;
    }
    return ' ' + filterName + '(' + filterInnerVal + ')';
};

SchemeChanger.prototype.getEnabledFilters = function (filtersModelData) {
    var filterName,
        filterData,
        enabledFilters = {};
    for (filterName in filtersModelData) {
        //noinspection JSUnfilteredForInLoop
        filterData = filtersModelData[filterName];
        if (filterData.current !== 0) {
            //noinspection JSUnfilteredForInLoop
            enabledFilters[filterName] = filterData;
        }
    }
    return  enabledFilters;
};

SchemeChanger.prototype.setFilterCss = function (cssValue) {
    if (!cssValue) cssValue = ' none';

    this.demoEl.style[filterProperty] = cssValue;
    this.appliedFilterText.textContent = getCssDeclaration(filterProperty, cssValue);
};

exports.SchemeChanger = SchemeChanger;