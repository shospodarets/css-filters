'use strict';

var presetsData = require('../data/presets-data').presetsData;

/**
 * @constructor
 * @param {{
*   btnGroup: {String},
*   onPresetActivated: {Function},
*   [activeFilters]: {Object}
* }} options
 */
var Presets = function (options) {
    this.options = options;

    this.btnGroup = document.querySelector(this.options.btnGroup);

    this.createDom();
    this.setActiveFiltersOnInit();
};

Presets.prototype.createDom = function () {
    presetsData.forEach(function (presetData) {
        var btn = document.createElement('span');
        btn.classList.add('button');
        btn.textContent = presetData.name;
        btn.addEventListener('click', this.setFilters.bind(this, presetData.filters), false);
        this.btnGroup.appendChild(btn);
    }, this);
};

Presets.prototype.setFilters = function (filtersData) {
    this.options.onPresetActivated(filtersData);// trigger set filters
};

Presets.prototype.getActiveFiltersFromData = function () {
    var activeFilters = null;
    presetsData.forEach(function (presetData) {
        if (presetData.activeOnInit) {// activate on init if needed
            activeFilters = presetData;
        }
    });
    return activeFilters.filters;
};

Presets.prototype.setActiveFiltersOnInit = function () {
    var filtersData = this.options.activeFilters;// filters data from url
    if (!filtersData) {// otherwise- from json
        filtersData = this.getActiveFiltersFromData();
    }

    this.setFilters(filtersData);
};

exports.Presets = Presets;