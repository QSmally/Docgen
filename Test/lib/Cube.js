
"use strict";

class Cube {

    /**
     * A basic Cube measure.
     * @param {Number} x Length of this Cube.
     * @param {Number} z Width of this Cube.
     * @example const Cube = new Cube(5, 3);
     * console.log("a new line");
     * @implements {Awesomeness}
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

    /**
     * Returns an object with info.
     * @param {Object<String, Number>} n Foo
     * @returns {Object<n, l, w>} Info object
     */
    Info (n) {
        return {
            n,
            l: this.Length,
            w: this.Width,
        }
    }

}

module.exports = Cube;
