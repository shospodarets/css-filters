'use strict';

var UTILS = require('../utils/utils'),
    EventsSystem = require('../utils/events-system').EventsSystem;

/**
 * @constructor
 * @param {{
 *  srcParam: {String},
 *  filtersParam: {String}
 * }} options
 */
var RouterController = function (options) {
    this.options = options;

};

UTILS.inherit(RouterController, EventsSystem);

// UTILS METHOD
RouterController.prototype.setSearchString = function (searchString) {
    history.replaceState({}, document.title, "?" + searchString);
};

RouterController.prototype.getParamFromUrl = function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

RouterController.prototype.setParamToUrl = function (key, value) {
    key = encodeURI(key);
    value = encodeURI(value);

    var kvp = document.location.search.substr(1).split('&');

    var i = kvp.length;
    var x;
    while (i--) {
        x = kvp[i].split('=');

        if (x[0] == key) {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }

    if (i < 0) {kvp[kvp.length] = [key, value].join('=');}
    if (kvp[0] === '') kvp.shift();// prevent "?&" at the beginning of the quesry string
    this.setSearchString(kvp.join('&'));
};

// GETTERS
RouterController.prototype.getIframeSrcFromUrl = function () {
    var iframeSrc = this.getParamFromUrl(this.options.srcParam);

    if (!iframeSrc) iframeSrc = null;
    return iframeSrc;
};

RouterController.prototype.getFiltersFromUrl = function () {
    var activeFilters = this.getParamFromUrl(this.options.filtersParam);

    if (activeFilters) {
        // try to parse filters from url
        try {
            activeFilters = JSON.parse(activeFilters);
        } catch (err) {
            activeFilters = null;
        }
    } else {
        activeFilters = null;
    }
    return activeFilters;
};

// SETTERS
RouterController.prototype.setIframeSrcToUrl = function (src) {
    if (this.getIframeSrcFromUrl() === src) {
        return;// prevent loops
    }

    this.setParamToUrl(this.options.srcParam, src);
};

RouterController.prototype.setFiltersToUrl = function (filter) {
    if (this.getFiltersFromUrl() === filter) {
        return;// prevent loops
    }

    this.setParamToUrl(this.options.filtersParam, JSON.stringify(filter));
};

exports.RouterController = RouterController;