// over commented but was just trying something
/**
 * Represents a simple moveable object
 */

class Mover {
    /**
     * @constructor
     * @param {number} x - x coordinate to be initialised
     * @param {number} y - y coordinate to be initialised
     */
    constructor(x, y) {
        /**
         * Position of object
         * @type {p5.Vector}
         */
        this.position = createVector(x, y);

        /**
         * Velocity of object
         * @type {p5.Vector}
         */
        this.velocity = createVector(0, 0);

        /**
         * Acceleration of object
         * @type {p5.Vector}
         */
        this.acceleration = createVector(0, 0);

        /**
         * Mass of object
         * @type {number}
         */
        this.mass = 1;
    }

    
    edges() {
        if (this.position.x < 0) {
            this.applyForce(createVector(2, 0));
        } else if (this.position.x > width) {
            this.applyForce(createVector(-2, 0));
        }

        if (this.position.y < 0) {
            this.applyForce(createVector(0, 2));
        } else if (this.position.y > height) {
            this.applyForce(createVector(0, -2));
        }
    }

    /**
     * Applys a force to the objects acceleration vector
     * @param {p5.Vector} force - force to be applied
     * @returns {void}
     */
    applyForce(force) {
        let newForce = p5.Vector.div(force, this.mass);
        this.acceleration.add(newForce);
    }


    /**
     * Updates velocity and position based on the acceleration
     * @returns {void}
     */
    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        // reset acceleration each update loop
        this.acceleration.mult(0);

        // adds some friction
        this.velocity.mult(1);
    }


    /**
     * Renders object to the canvas
     * @returns {void}
     */
    show() {
        // point(this.position.x, this.position.y);

        noStroke();
        fill(0);
        circle(this.position.x, this.position.y, 10);
    }
}