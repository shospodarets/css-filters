'use strict';
var UTILS = require('../utils/utils'),
    FilterModel = require('./filter-model').FilterModel;

/**
 * @constructor
 * @param {{
 *  filtersData: {
 *      filterName: {
 *          max: {Number},
 *          current: {Number},
 *          [postfix]: {String},
 *          [filterCss]: {String}
 *      }
 *  }
 * }} options
 */
var FiltersModel = function (options) {
    this.options = options;

    this.initFiltersData = this.options.filtersData;
    this.filtersModels = {};
    this.filtersData = {};// shall be updated after each change in filters

    this.createFilters(this.initFiltersData);
};

// CREATE FILTERS
FiltersModel.prototype.createFilters = function (filtersData) {
    var filterName;
    for (filterName in filtersData) {
        //noinspection JSUnfilteredForInLoop
        this.createFilter(filterName, filtersData[filterName]);
    }
};

FiltersModel.prototype.createFilter = function (filterName, filterData) {
    var _filterData = UTILS.cloneObj(filterData);
    _filterData['current'] = 0;// All range inputs will init with 0 value -> in that case each filter will be disabled on init
    _filterData['name'] = filterName;// copy filter name inside (useful for future using)

    var filterModel = new FilterModel({
        filterData: _filterData
    });

    this.filtersModels[filterName] = filterModel;
    this.filtersData[filterName] = filterModel.getData();
};

// GET
FiltersModel.prototype.getFiltersData = function () {
    return this.filtersData;
};

FiltersModel.prototype.getFilterModel = function (name) {
    return this.filtersModels[name];
};

// SET
FiltersModel.prototype.updateFilterData = function (name) {
    var filterModel = this.filtersModels[name];
    this.filtersData[name] = filterModel.getData();
};

FiltersModel.prototype.setFiltersData = function (filterData) {
    return this.filtersData = filterData;
};

// OTHER
/**
 * @param {{
 *  name: {String},
 *  value: {Number}
 * }} params
 */
FiltersModel.prototype.onFilterViewChanged = function (params) {
    var filterModel = this.getFilterModel(params.name);
    filterModel.setValue(params.value);
    this.updateFilterData(params.name);
};

exports.FiltersModel = FiltersModel;