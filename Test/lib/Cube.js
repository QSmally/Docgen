
"use strict";

class Cube {

    /**
     * A basic Cube measure.
     * @param {Number} x Length of this Cube.
     * @param {Number} z Width of this Cube.
     */
    constructor (x, y) {
        
        /**
         * The length of this Cube.
         * @name Cube#Length
         * @type {Number}
         * @readonly
         */
        this.Length = x;

        /**
         * The width of this Cube.
         * @name Cube#Width
         * @type {Number}
         * @readonly
         */
        this.Width = y;

    }

    /**
     * Calculates the surface of this Cube.
     * @returns {Number} Area of the Cube.
     * @async
     */
    async Square () {
        return this.Length * this.Width;
    }

}

module.exports = Cube;
