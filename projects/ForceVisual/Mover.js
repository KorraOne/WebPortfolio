class Mover {
  constructor(x,y, mass, radius) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.mass = mass;
    this.radius = radius;
    this.density = mass / radius;

    this.debug = false;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);

    // visualise force
    if (this.debug) {
      strokeWeight(1)
      stroke(0)
      f = force.copy();
      f.mult(50);
      line(this.position.x,
          this.position.y,
          this.position.x + f.x,
          this.position.y + f.y
      )
    }
  }

  contactEdge() {
    return (this.position.y > height - this.radius - 1);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    // this.acceleration.mult(0);
  }

  show() {
    stroke(0);
    let c = map(this.density, 0, 1, 255, 0);
    fill(c, 230);
    // circle(this.position.x, this.position.y, this.radius * 2);
    noStroke();
    rectMode(CENTER);
    square(this.position.x, this.position.y, this.radius * 2);

    if (this.debug) {
      strokeWeight(3);
      stroke(0);
      let acceleration = this.acceleration.copy();
      acceleration.mult(100);
      line(this.position.x,
          this.position.y,
          this.position.x + acceleration.x,
          this.position.y + acceleration.y
        )

      stroke(0, 100, 0);
      let velocity = this.velocity.copy();
      velocity.mult(10);
      line(this.position.x, 
          this.position.y, 
          this.position.x + velocity.x, 
          this.position.y + velocity.y
        )
      }
      // this should be in update but to visualise 
      // accel it needs to not be reset to 0 till after show()
      this.acceleration.mult(0);
    }

  checkEdges() {
    let elastic = 0.5;

    if (this.position.x > width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= -1;
      this.velocity.x *= elastic;
    } else if (this.position.x < 0 + this.radius) {
      this.position.x = this.radius;
      this.velocity.x *= -1;
      this.velocity.x *= elastic;
    }

    if (this.position.y >= height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= -1;
      this.velocity.y *= elastic;

      // if I make the ground a force to be like real life
      // problems - bouncing breaks
      // let force = p5.Vector.mult(gravity, this.mass);
      // force.mult(-1);
      // this.applyForce(force);
    } else if (this.position.y < this.radius) {
      this.position.y = this.radius;
      this.velocity.y *= -1;
      this.velocity.y *= elastic;
    }
  }
}