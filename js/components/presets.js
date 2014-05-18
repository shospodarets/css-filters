'use strict';

var UTILS = require('../utils/utils'),
    EventsSystem = require('../utils/events-system').EventsSystem,
    presetsData = require('../data/presets-data').presetsData;

/**
 *
 * @param options
 * @constructor
 */
var Presets = function (options) {
    this.options = options;

    this.btnGroup = document.querySelector(this.options.btnGroup);

    this.createDom();
};

UTILS.inherit(Presets, EventsSystem);

Presets.prototype.createDom = function () {
    presetsData.forEach(function (presetData) {
        var btn = document.createElement('span');
        btn.classList.add('button');
        btn.textContent = presetData.name;
        btn.addEventListener('click', this.onPresetClick.bind(this, presetData.filters), false);
        if (presetData.activeOnInit) {// activate on init if needed
            setTimeout(function () {// FIXME wait obser will listen component
                this.onPresetClick(presetData.filters);
            }.bind(this), 0);
        }

        this.btnGroup.appendChild(btn);
    }, this);
};

Presets.prototype.onPresetClick = function (filtersData) {
    this.trigger('presetActivated', filtersData);
};

exports.Presets = Presets;