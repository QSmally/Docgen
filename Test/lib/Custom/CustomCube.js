
"use strict";

const MyCube = require("../Extensions/MyCube");

class CustomCube extends MyCube {

    /**
     * A duplicate Cube.
     * @param {Number} x Length of this Cube.
     * @param {Number} z Width of this Cube.
     * @extends {MyCube}
     */
    constructor (x, y) {
        
        super (
            "Dupe",
            x,
            y
        );

    }

}

module.exports = CustomCube;
