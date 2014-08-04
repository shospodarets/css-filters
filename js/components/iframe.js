'use strict';

/**
 * Insert iframe and controls to apply css filters on it
 * and control iframe's src
 *
 * @param options
 * @constructor
 */
var Iframe = function (options) {
    this.options = options;

    this.iframeWrapper = document.querySelector(this.options.iframeWrapper);
    this.iframeBoxTmlpEl = document.querySelector(this.options.iframeBoxTmlpEl);
    this.src = this.options.src;

    this.appendIframe();

    this.srcForm = this.iframeWrapper.querySelector(this.options.srcForm);
    this.srcInput = this.iframeWrapper.querySelector(this.options.srcInput);
    this.iframe = this.iframeWrapper.querySelector('iframe');
    this.setInputSrcValue(this.src);
    this.setIframeSrc(this.src);

    this.bindEvents();
};

Iframe.prototype.appendIframe = function () {
    this.iframeWrapper.innerHTML = this.iframeBoxTmlpEl.textContent;
};

Iframe.prototype.bindEvents = function () {
    this.srcForm.addEventListener('submit', this.onSubmit.bind(this), false);
};

//

Iframe.prototype.setIframeSrc = function () {
    this.iframe.setAttribute('src', this.src);
    this.options.onIframeSrcChange(this.src);// trigger src change
};

Iframe.prototype.setInputSrcValue = function (value) {
    this.srcInput.value = value;
};

Iframe.prototype.onSubmit = function (e) {
    // set src from input
    var value = this.srcInput.value;
    if (value !== this.src) { // don't reload iframe when it's not needed
        this.src = value;
        this.setIframeSrc(value);
    }

    e.preventDefault();
};

exports.Iframe = Iframe;