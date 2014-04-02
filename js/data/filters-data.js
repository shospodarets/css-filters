'use strict';
var filtersData = {
    'blur': {
        max: 10,
        postfix: 'px'
    },
    'brightness': {
        max: 10
    },
    'contrast': {
        max: 10
    },
    'grayscale': {
        max: 1
    },
    'drop-shadow': {
        max: 50,
        postfix: 'px',
        filterCss: '%CURRENT% %CURRENT% 10px black'
    },
    'hue-rotate': {
        max: 360,
        postfix: 'deg'
    },
    'invert': {
        max: 1
    },
    'opacity': {
        max: 1
    },
    'saturate': {
        max: 10
    },
    'sepia': {
        max: 1
    }
};

exports.filtersData = filtersData;