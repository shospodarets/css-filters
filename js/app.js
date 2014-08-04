'use strict';
var FiltersController = require('./controllers/filters-controller').FiltersController,
    filtersData = require('./data/filters-data').filtersData,
    SchemeChanger = require('./components/scheme-changer').SchemeChanger,
    Iframe = require('./components/iframe').Iframe,
    SupportedBrowser = require('./components/supported-browser').SupportedBrowser,
    Presets = require('./components/presets').Presets,
    RouterController = require('./controllers/router-controller').RouterController;

var App = function () {
    // check if browser supports all features
    this.supportedBrowser = new SupportedBrowser();
    if (!this.supportedBrowser.isBrowserSupported) return;

    this.routerController = new RouterController({
        srcParam: 'src',
        filtersParam: 'filters'
    });

    this.filtersController = new FiltersController({
        viewWrapper: '.css-filters',
        filtersData: filtersData,
        onFiltersChange: this.onFiltersChange.bind(this)
    });

    this.iframe = new Iframe({
        iframeWrapper: '.iframe-wrapper',
        iframeBoxTmlpEl: '.iframe-box-tmpl',
        src: this.routerController.getIframeSrcFromUrl() || 'http://malyw.github.io/',
        srcForm: '.src-form',
        srcInput: '.src-input',
        onIframeSrcChange: this.onIframeSrcChange.bind(this)
    });

    this.schemeChanger = new SchemeChanger({
        filtersModelData: this.filtersController.getFiltersModelData()
    });

    this.presets = new Presets({
        btnGroup: '.presets .button-group',
        activeFilters: this.routerController.getFiltersFromUrl(),
        onPresetActivated: this.onPresetActivated.bind(this)
    });
};

// EVENTS
App.prototype.onPresetActivated = function (filtersData) {
    this.filtersController.setFiltersFromPreset(filtersData);
};

App.prototype.onFiltersChange = function (filtersModelData) {
    this.schemeChanger.setScheme(filtersModelData);
    this.routerController.setFiltersToUrl(this.filtersController.getActiveFiltersData());
};

App.prototype.onIframeSrcChange = function (src) {
    this.routerController.setIframeSrcToUrl(src);
};

exports.App = App;