'use strict';

var UTILS = require('../utils/utils'),
    EventsSystem = require('../utils/events-system').EventsSystem;

/**
 * @constructor
 * @param {{
 *  filterData: {
*       max: {Number},
*       current: {Number},
*       name: {String},
*      [postfix]: {String},
*      [filterCss]: {String}
 *  }
 * }} options
 */
var FilterView = function (options) {
    this.options = options;

    this.name = this.options.filterData['name'];

    this.container = document.createDocumentFragment();
    this.createDom(this.options.filterData);

    this.inputEl = this.container.querySelector('.range');

    this.bindEvents();
};

UTILS.inherit(FilterView, EventsSystem);

FilterView.prototype.createDom = function (filterData) {
    // value attribute set to 0 - in that case filter will be disabled o init
    var div = document.createElement('div'),
        html = '<div class="filter-box">\
                    <span class="filter-text">\
                        ' + this.name + '\
                    </span>\
                    <div class="input-wrapper">\
                        <input class="range" type="range"\
                            min="0"\
                            max="' + filterData.max + '"\
                            step="' + filterData.max / 10 + '"\
                            value="0"\
                        />\
                    <div>\
                </div>';

    div.classList.add('filter');
    div.innerHTML = html;
    this.container.appendChild(div);
};

FilterView.prototype.bindEvents = function () {
    this.inputEl.addEventListener('change', this.onFilterValueChange.bind(this));
};

FilterView.prototype.onFilterValueChange = function () {
    this.trigger('filterChanged', {
        name: this.name,
        value: Number(this.inputEl.value)
    });
};

exports.FilterView = FilterView;