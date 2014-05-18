'use strict';

exports.presetsData = [
    {
        name: "Reset",
        filters: {}
    },
    {
        name: "Inverted",
        filters: {
            invert: 1,
            'hue-rotate': 180,
            brightness: 0.9
        },
        activeOnInit: true
    },
    {
        name: "Vintage",
        filters: {
            grayscale: 0.1,
            saturate: 1,
            sepia: 0.6
        }
    }
];