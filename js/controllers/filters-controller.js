'use strict';

var UTILS = require('../utils/utils'),
    FiltersModel = require('../models/filters-model').FiltersModel,
    FiltersView = require('../views/filters-view').FiltersView;

/**
 * @constructor
 * @param {{
 *  filtersData: {Object},
 *  viewWrapper: {String},
 *  onFiltersChange: {Function}
 * }} options
 */
var FiltersController = function (options) {
    this.options = options;

    this.filtersModel = new FiltersModel({
        filtersData: options.filtersData
    });
    this.filtersView = new FiltersView({
        viewWrapper: options.viewWrapper,
        filtersModelData: this.filtersModel.getFiltersData()
    });

    this.bindEvents();
};

FiltersController.prototype.bindEvents = function () {
    this.filtersView.on('filterChanged', this.onFilterViewChanged, this);
};

FiltersController.prototype.onFilterViewChanged = function (params) {
    // update model when view change
    this.filtersModel.onFilterViewChanged(params);
    // and trigger event with filters data
    this.triggerDataChanged();
};

FiltersController.prototype.getFiltersModelData = function () {
    return this.filtersModel.getFiltersData();
};

FiltersController.prototype.triggerDataChanged = function () {
    this.options.onFiltersChange(this.getFiltersModelData());
};

/**
 * Set filter values from preset and reset others
 */
FiltersController.prototype.setFiltersFromPreset = function (presetFiltersData) {
    var filtersData = UTILS.cloneObj(this.filtersModel.getFiltersData()),
        filterName;
    // PREPARE FILTERDATA
    // reset all filters except which are in preset
    for (filterName in filtersData) {
        if (presetFiltersData[filterName]) {// if there is filter in preset
            // set from preset
            filtersData[filterName]['current'] = presetFiltersData[filterName];
        } else {
            //reset
            filtersData[filterName]['current'] = 0;
        }
    }

    // SET FILTERDATA
    this.filtersView.setFilterValues(filtersData);
    this.filtersModel.setFiltersData(filtersData);

    // TRIGGER
    this.triggerDataChanged();
};

FiltersController.prototype.getActiveFiltersData = function () {
    var filtersData = UTILS.cloneObj(this.filtersModel.getFiltersData()),
        filterName,
        activeFiltersData = {};
    for (filterName in filtersData) {
        if (filtersData[filterName]["current"] !== 0) {
            activeFiltersData[filterName] = filtersData[filterName]["current"];
        }
    }
    return activeFiltersData;
};

exports.FiltersController = FiltersController;