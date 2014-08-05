'use strict';
var FiltersController = require('./controllers/filters-controller').FiltersController,
    filtersData = require('./data/filters-data').filtersData,
    SchemeChanger = require('./components/scheme-changer').SchemeChanger,
    Iframe = require('./components/iframe').Iframe,
    SupportedBrowser = require('./components/supported-browser').SupportedBrowser,
    Presets = require('./components/presets').Presets,
    RouterController = require('./controllers/router-controller').RouterController,
    Modal = require('./components/modal').Modal;

var App = function () {
    var APPLY_CLASS = 'apply-filters',// to which class filters will be applied
        APPLY_SELECTOR = '.' + APPLY_CLASS;// to which css selector filters will be applied

    // check if browser supports all features
    this.supportedBrowser = new SupportedBrowser();
    if (!this.supportedBrowser.isBrowserSupported) return;

    this.routerController = new RouterController({
        srcParam: 'src',
        filtersParam: 'filters',
        modalParam: 'modal'
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

    this.modal = new Modal({
        modalWrapper: '.modal-wrapper',
        modalBoxTmplEl: '.modal-box-tmpl',
        applyClass: APPLY_CLASS,
        onModalVisibilityChange: this.onModalVisibilityChange.bind(this),
        isOpen: this.routerController.getModalFromUrl()
    });

    this.schemeChanger = new SchemeChanger({
        filtersModelData: this.filtersController.getFiltersModelData(),
        applySelector: APPLY_SELECTOR
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

App.prototype.onModalVisibilityChange = function (isOpen) {
    this.routerController.setModalToUrl(isOpen);
};

exports.App = App;