
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
     * @name MyCube#MyCubeName
     * @type {String}
     */
    get MyCubeName () {
        return this.Name;
    }

}

module.exports = MyCube;
