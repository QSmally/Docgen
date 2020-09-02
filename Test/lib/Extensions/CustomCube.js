
"use strict";

const MyCube = require("./MyCube");

class CustomCube extends MyCube {

    /**
     * Yet another custom Cube.
     * @param {Number} _x Length of this Cube.
     * @param {Number} _z Width of this Cube.
     * @extends {MyCube}
     */
    constructor (x, y) {
        
        super (
            "Custom",
            x,
            y
        );

        /**
         * The odd number.
         * @name CustomCube#OddNumber
         * @type {Number}
         * @private
         */
        this.OddNumber = 3;

    }

    /**
     * Fetches an odd number.
     * @name CustomCube#OddNumber
     * @type {Number}
     */
    get SomeOddNumber () {
        return this.OddNumber;
    }

    /**
     * Sets an odd number.
     * @name CustomCube#OddNumber
     * @type {Number}
     */
    set SomeOddNumber (Int) {
        if (Int % 2) this.OddNumber = Int;
    }

}

module.exports = CustomCube;
