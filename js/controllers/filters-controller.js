'use strict';

var UTILS = require('../utils/utils'),
    EventsSystem = require('../utils/events-system').EventsSystem,
    FiltersModel = require('../models/filters-model').FiltersModel,
    FiltersView = require('../views/filters-view').FiltersView;

/**
 * @constructor
 * @param {{
 *  filtersData: {Object},
 *  viewWrapper: {String}
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

UTILS.inherit(FiltersController, EventsSystem);

FiltersController.prototype.bindEvents = function () {
    this.filtersView.on('filterChanged', this.onFilterViewChanged, this);
};

FiltersController.prototype.onFilterViewChanged = function (params) {
    // update model when view change
    this.filtersModel.onFilterViewChanged(params);
    // and trigger event with filters data
    this.trigger('filtersChanged', this.getFiltersModelData());
};

FiltersController.prototype.getFiltersModelData = function () {
    return this.filtersModel.getFiltersData();
};

exports.FiltersController = FiltersController;