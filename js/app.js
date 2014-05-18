'use strict';
var FiltersController = require('./controllers/filters-controller').FiltersController,
    filtersData = require('./data/filters-data').filtersData,
    SchemeChanger = require('./components/scheme-changer').SchemeChanger,
    Iframe = require('./components/iframe').Iframe,
    SupportedBrowser = require('./components/supported-browser').SupportedBrowser;

var App = function () {
    // check if browser supports all features
    this.supportedBrowser = new SupportedBrowser();
    if (!this.supportedBrowser.isBrowserSupported) return;

    this.filtersController = new FiltersController({
        viewWrapper: '.css-filters',
        filtersData: filtersData
    });

    this.iframe = new Iframe({
        iframeWrapper: '.iframe-wrapper',
        iframeBoxTmlpEl: '.iframe-box-tmpl',
        src: 'http://gospodarets.com/developments/paint-board/', // current page
        srcForm: '.src-form',
        srcInput: '.src-input'
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