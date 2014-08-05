'use strict';

var IS_OPEN_CLASS = 'show-modal';
/**
 * Open/close modal window
 * and apply css filters for page container
 *
 * @param options
 * @constructor
 */
var Modal = function (options) {
    this.options = options;

    // FIELDS
    this.applyClass = this.options.applyClass;
    this.isOpen = this.options.isOpen;

    // ELS
    this.body = document.querySelector('body');
    this.pageContainer = document.getElementById('container');
    this.modalWrapper = document.querySelector(this.options.modalWrapper);
    this.modalBoxTmplEl = document.querySelector(this.options.modalBoxTmplEl);

    this.appendTmpl();

    // ELS
    this.closeBtnEl = this.modalWrapper.querySelector('.close-btn');
    this.modalActionsEl = document.querySelector('.modal-actions');
    this.openBtnEl = this.modalActionsEl.querySelector('.open-modal-btn');

    // SET VIEW
    this.setView();
    this.modalActionsEl.style.display = '';// show modal actions buttons

    // BIND EVENTS
    this.bindEvents();
};

Modal.prototype.appendTmpl = function () {
    this.modalWrapper.innerHTML = this.modalBoxTmplEl.textContent;
};

// VIEW
Modal.prototype.setView = function () {
    if (this.isOpen) {
        this.open();
    } else {
        this.close();
    }
};

Modal.prototype.open = function () {
    this.body.classList.add(IS_OPEN_CLASS);// show modal
    this.pageContainer.classList.add(this.applyClass);// apply filters to page
    this.modalWrapper.style.display = 'block';// show modal content (which might be hidden before with .close())
    // Add param from url
    this.isOpen = true;
    this.options.onModalVisibilityChange(this.isOpen);
};

Modal.prototype.close = function () {
    // SO MUCH CODE TO SHOW FILTERS ANIMATION DURING CLOSE ACTION
    this.modalWrapper.style.display = 'none';// hide modal box
    this.pageContainer.style['-webkit-filter'] = 'none';// reset filters to page to trigger reset animation
    setTimeout(function () {
        this.body.classList.remove(IS_OPEN_CLASS);// hide modal
        this.pageContainer.classList.remove(this.applyClass);// remove filters from page
        this.pageContainer.style['-webkit-filter'] = '';// reset filter on page, which was set before
        // Remove param from url
        this.isOpen = false;
        this.options.onModalVisibilityChange(this.isOpen);
    }.bind(this), 500);
};

// EVENTS
Modal.prototype.bindEvents = function () {
    document.addEventListener('keyup', function (e) {
        if (e.keyCode === 27) this.close();
    }.bind(this));

    this.closeBtnEl.addEventListener('click', this.close.bind(this));

    this.openBtnEl.addEventListener('click', this.open.bind(this));
};

exports.Modal = Modal;