'use strict';

var featuresList = [
    'flexbox',
    'cssColumns',
    'cssFilters',
    'inputRange',
    'classList',
    'arrayForEach',
    'bind',
    'objectKeys',
    'objectCreate'
];
/**
 * @constructor
 */
var SupportedBrowser = function () {
    this.unsupportedFeatures = this.checkFeatures();
    this.unsupportedFeaturesEl = document.getElementById('unsupportedFeatures');
    this.isBrowserSupported = (this.unsupportedFeatures.length === 0);

    if (!this.isBrowserSupported) {
        this.showUnsupportedMsg(this.unsupportedFeatures);
    }
};

SupportedBrowser.prototype.showUnsupportedMsg = function (unsupportedFeatures) {
    document.body.className += ' not-supported-browser';

    var text = '';
    for (var i = 0; i < unsupportedFeatures.length; i++) {
        text += '<li>' + unsupportedFeatures[i] + '</li>';
    }
    this.unsupportedFeaturesEl.innerHTML = text;
};

SupportedBrowser.prototype.checkFeatures = function () {
    var featureName,
        i,
        isFeatureSupported,
        unsupportedFeatures = [];

    for (i = featuresList.length; i--;) {
        featureName = featuresList[i];
        isFeatureSupported = this[featureName]();
        if (!isFeatureSupported) {
            unsupportedFeatures.push(featureName);
        }
    }

    return unsupportedFeatures;
};

/*---------- FEATURES CHECK ----------*/
SupportedBrowser.prototype.objectCreate = function () {
    return typeof Object.create === 'function';
};

//noinspection JSUnusedGlobalSymbols
SupportedBrowser.prototype.objectKeys = function () {
    return typeof Object.keys === 'function';
};

SupportedBrowser.prototype.bind = function () {
    return typeof Function.prototype.bind === 'function';
};

SupportedBrowser.prototype.arrayForEach = function () {
    return typeof Array.prototype.forEach === 'function';
};

SupportedBrowser.prototype.classList = function () {
    return "classList" in document.createElement("_");
};

SupportedBrowser.prototype.inputRange = function () {
    var input = document.createElement('input');
    try {
        input.type = 'range';

        //noinspection RedundantIfStatementJS
        if (input.type == 'range') {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
};

SupportedBrowser.prototype.cssFilters = function () {
    var el = document.createElement('div');
    el.style.cssText = prefixes.join('filter' + ':blur(2px); ');
    return !!el.style.length && ((document.documentMode === undefined || document.documentMode > 9));
};

SupportedBrowser.prototype.cssColumns = function () {
    return testPropsAll('columnCount');
};

SupportedBrowser.prototype.flexbox = function () {
    return testPropsAll('flexWrap');
};

/*---------- START MODERNIZR PART ----------*/
/* Modernizr 2.7.1 | MIT & BSD */
var mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),

    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' ');

function is(obj, type) {
    return typeof obj === type;
}

function contains(str, substr) {
    return !!~('' + str).indexOf(substr);
}

function testProps(props, prefixed) {
    for (var i in props) {
        //noinspection JSUnfilteredForInLoop
        var prop = props[i];
        if (!contains(prop, "-") && mStyle[prop] !== undefined) {
            return prefixed == 'pfx' ? prop : true;
        }
    }
    return false;
}

function testDOMProps(props, obj, elem) {
    for (var i in props) {
        //noinspection JSUnfilteredForInLoop
        var item = obj[props[i]];
        if (item !== undefined) {

            if (elem === false) { //noinspection JSUnfilteredForInLoop
                return props[i];
            }

            if (is(item, 'function')) {
                return item.bind(elem || obj);
            }

            return item;
        }
    }
    return false;
}

function testPropsAll(prop, prefixed, elem) {

    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
        props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

    if (is(prefixed, "string") || is(prefixed, "undefined")) {
        return testProps(props, prefixed);

    } else {
        props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
        return testDOMProps(props, prefixed, elem);
    }
}
/*---------- END MODERNIZR PART ----------*/

exports.SupportedBrowser = SupportedBrowser;