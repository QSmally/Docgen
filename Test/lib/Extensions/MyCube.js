
"use strict";

const Cube = require("../Cube");

class MyCube extends Cube {

    /**
     * My custom Cube.
     * @param {String} n Name of this Cube.
     * @param {Number} x Length of this Cube.
     * @param {Number} z Width of this Cube.
     * @param {Uint16Array} _n Hidden parameter.
     * @param {Uint32Array} [_a] Hidden optional parameter.
     * @extends {Cube}
     * @link https://cube.com/
     */
    constructor (n, x, y, _n, _a = new Uint32Array()) {

        // doNothing(_n);
        // doNothing(_a);
        
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
     * @link https://url.to.string/docs
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
     * @returns {NoNum}
     * @static
     */
    static No () {
        return 5;
    }

    /**
     * Asynchronously returns the number 16.
     * @returns {NoNum}
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
