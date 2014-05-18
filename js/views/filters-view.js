'use strict';
var UTILS = require('../utils/utils'),
    EventsSystem = require('../utils/events-system').EventsSystem,
    FilterView = require('./filter-view').FilterView;

/**
 * @constructor
 * @param {{
 *  viewWrapper: {String},
 *  filtersModelData: {
 *      filterName: {
 *          max: {Number},
 *          current: {Number},
 *          name: {String},
 *          [postfix]: {String},
 *          [filterCss]: {String}
 *      }
 *  }
 * }} options
 */
var FiltersView = function (options) {
    this.options = options;
    this.filtersViews = {};
    this.initFiltersModelData = this.options.filtersModelData;

    this.viewWrapperEl = document.querySelector(this.options.viewWrapper);
    this.createFilters(this.initFiltersModelData);
};

UTILS.inherit(FiltersView, EventsSystem);

FiltersView.prototype.createFilters = function (filtersData) {
    var filterName;
    for (filterName in filtersData) {
        //noinspection JSUnfilteredForInLoop
        this.createFilter(filterName, filtersData[filterName]);
    }
};

FiltersView.prototype.createFilter = function (filterName, filterData) {
    var _filterData = UTILS.cloneObj(filterData);

    var filterView = new FilterView({
        filterData: _filterData
    });

    this.filtersViews[filterName] = filterView;

    filterView.on('filterChanged', this.onFilterChange, this);

    this.appendFilter(filterView);
};

FiltersView.prototype.appendFilter = function (filterView) {
    return this.viewWrapperEl.appendChild(filterView.container);
};

FiltersView.prototype.onFilterChange = function (params) {
    // ToDo retrigger + add throttle
    this.trigger('filterChanged', params);
};

FiltersView.prototype.setFilterValues = function (filtersData) {// update values without triggering events etc.
    var filterName;
    for (filterName in filtersData) {
        if (!this.filtersViews[filterName]) throw 'Incorrect filter data';
        this.filtersViews[filterName].inputEl.value = filtersData[filterName]['current'];
    }
};

exports.FiltersView = FiltersView;