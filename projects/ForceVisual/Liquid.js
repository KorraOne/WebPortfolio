class Liquid {
  constructor(x, y, w, h, c) {
    this.position = createVector(x, y)
    this.width = w;
    this.height = h;

    this.c = c
  }

  show() {
    noStroke();
    rectMode(CORNER);
    fill(0, 0, 200, map(this.c, 0, 1, 50, 150))
    rect(this.position.x, this.position.y, this.width, this.height)
  }

  // returns true if mover within <this>
  containsMover(mover) {
    return (mover.position.x >= this.position.x &&
        mover.position.x <= this.position.x + this.width &&
        mover.position.y >= this.position.y &&
        mover.position.y <= this.position.y + this.height
    )
  }

  calculateDrag(mover) {
    // get the movers velocity
    let speed = mover.velocity.mag();

    // coefficient of drag * speed^2
    let dragMagnitude = this.c * speed * speed;

    // copy velocity, reverse it, set to the calced magnitude
    let dragForce = mover.velocity.copy();
    dragForce.mult(-1);
    dragForce.setMag(dragMagnitude);
    dragForce.limit(speed);
    // Return the force.
    return dragForce;
  }
}