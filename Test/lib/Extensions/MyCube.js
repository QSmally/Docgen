
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
    
    /**
     * Name of this MyCube.
     * @name MyCube#Name
     * @type {String}
     */
    get Name () {
        return this.Name;
    }

    /**
     * Returns the number 5.
     * @returns {Number}
     * @static
     */
    static No () {
        return 5;
    }

    /**
     * Asynchronously returns the number 16.
     * @returns {Number}
     * @static
     * @async
     */
    static async No2 () {
        return 16;
    }

}

module.exports = MyCube;


/**
 * The number 5 or 16.
 * @typedef {Number} NoNum
 */
