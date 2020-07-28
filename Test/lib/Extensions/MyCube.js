
"use strict";

const Cube = require("../Cube");

class MyCube extends Cube {

    /**
     * My custom Cube.
     * @param {String} n Name of this Cube.
     * @param {Number} x Length of this Cube.
     * @param {Number} z Width of this Cube.
     * @extends {Cube}
     */
    constructor (n, x, y) {
        
        super (x, y);

        /**
         * Defines the name of this Cube.
         * @name MyCube#Name
         * @type {NameOptions}
         * @private
         */
        Object.defineProperty(this, "Name", {
            value: n
        });

    }

    /**
     * Returns the name.
     * @name MyCube#Name
     * @type {String}
     */
    get Name () {
        return this.Name;
    }

}

module.exports = MyCube;

/**
 * Options for this MyCube.
 * @typedef {Object} NameOptions
 * @param {String} Name The name of this MyCube.
 * @param {Number} Age Length of life.
 */
