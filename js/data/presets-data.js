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
        }
    },
    {
        name: "Vintage",
        filters: {
            grayscale: 0.1,
            saturate: 1,
            sepia: 0.6
        }
    },
    {
        name: "Grayscale",
        filters: {
            grayscale: 1
        }
    },
    {
        name: "Acid",
        filters: {
            'hue-rotate': 72,
            saturate: 3,
            sepia: 0.2
        },
        activeOnInit: true
    }
];