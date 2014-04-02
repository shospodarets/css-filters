'use strict';
var FiltersController = require('./controllers/filters-controller').FiltersController,
    filtersData = require('./data/filters-data').filtersData,
    SchemeChanger = require('./components/scheme-changer').SchemeChanger,
    SupportedBrowser = require('./components/supported-browser').SupportedBrowser;

var App = function () {
    // check if browser supports all features
    this.supportedBrowser = new SupportedBrowser();
    if (!this.supportedBrowser.isBrowserSupported) return;

    this.filtersController = new FiltersController({
        viewWrapper: '.css-filters',
        filtersData: filtersData
    });

    this.schemeChanger = new SchemeChanger({
        filtersModelData: this.filtersController.getFiltersModelData()
    });

    this.bindEvents();
};

App.prototype.bindEvents = function () {
    this.filtersController.on('filtersChanged', this.schemeChanger.setScheme, this.schemeChanger);
};

exports.App = App;