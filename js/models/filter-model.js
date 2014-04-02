'use strict';

/**
 * @constructor
 * @param {{
 *   filterData: {
 *      max: {Number},
 *      current: {Number},
 *      name: {String},
 *      [postfix]: {String},
 *      [filterCss]: {String}
 *   }
 *
 * }} options
 */
var FilterModel = function (options) {
    this.options = options;
    this.setData(this.options.filterData);
};

FilterModel.prototype.getData = function () {
    var filterData = {
        max: this.max,
        current: this.current,
        name: this.name
    };
    if (this.postfix) filterData.postfix = this.postfix;
    if (this.filterCss) filterData.filterCss = this.filterCss;

    return filterData;
};

FilterModel.prototype.setData = function (filterData) {
    var prop;
    for (prop in filterData) {
        //noinspection JSUnfilteredForInLoop
        this[prop] = filterData[prop];
    }
};

FilterModel.prototype.setValue = function (value) {
    this.current = value;
};

exports.FilterModel = FilterModel;