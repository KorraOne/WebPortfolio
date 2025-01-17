class Body {
  constructor(x,y, mass) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.angle = 0;
    this.angVelocity = 0;
    this.angAcceleration = 0;

    this.mass = mass;
    this.radius = sqrt(mass)*2

    this.c = color(0, 100, 80);
    this.hue = 0;
  }

  attract(body) {
    // get direction and magnitude
    let force = p5.Vector.sub(this.position, body.position);
    let distance = force.mag();
    distance = constrain(distance, 5, 20);
    
    // calculates force strength from gravity formula
    let strength = (G * this.mass * body.mass) / (distance * distance);
    force.setMag(strength);

    return force;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  stepColour() {
    if (colour) {
      this.hue = (this.hue + 0.1) % 360;
      this.c = color(this.hue, 100, 80);
    } else {
      this.c = color(0, 0, 40);
    }
  }

  update() {
    // change colour
    this.stepColour();

    // linear movement
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    // angular movement
    this.angAcceleration = this.velocity.x;
    this.angVelocity += this.angAcceleration;
    this.angVelocity = constrain(this.angVelocity, -0.1, 0.1);
    this.angle += this.angVelocity;

    // cleaning variables
    this.acceleration.mult(0);
    this.angAcceleration = 0;
    this.angVelocity *= 0.9
  }

  show() {
    stroke(0);
    colorMode(HSB);
    fill(this.c);

    push();
    rectMode(CENTER);
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    if (penSlider.value() == 0) {
      circle(0, 0, this.radius);
    } else if (penSlider.value() == 1) {
      line(0, 0, 0, this.radius/2);
    } else {
      square(0, 0, this.radius);
    }
    pop();
  }
}