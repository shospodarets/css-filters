'use strict';

/**
 * Inheritance function
 *
 * @param child
 * @param parent
 */
exports.inherit = function (child, parent) {
    var Class = function () {};
    Class.prototype = parent.prototype;
    child.prototype = new Class();

    //noinspection JSUnusedGlobalSymbols
    child.prototype.constructor = child;
    child.superclass_ = parent.prototype;
};

exports.cloneObj = function (obj) {
    var clone = {};
    Object.keys(obj).forEach(function (keyName) {
        clone[keyName] = obj[keyName];
    });
    return clone;
};