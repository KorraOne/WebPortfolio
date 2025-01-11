class Bird {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.g = 0.6;
    this.flap = 10;
    this.alive = true;
  }

  show() {
    drawBird(this.x, this.y);
  }

  update() {
    this.gravity();
    this.y += this.vy;
    this.y = constrain(this.y, 0, height - 32);
  }

  up() {
    this.vy = -this.flap;
  }

  gravity() {
    this.vy += this.g;
  }
}

function drawBird(x, y) {
  // body
  fill(255, 255, 0);
  ellipse(x, y, 32, 28);

  // wing
  fill(255, 200, 0);
  ellipse(x - 10, y, 18, 14);

  // mouth
  push();
  translate(x + 10, y + 4);
  fill(255, 0, 0);
  ellipse(0, 0, 16, 10);
  line(-2, 0, 8, 0)
  pop();

  // eye
  push();
  translate(x + 5, y - 6);
  fill(255);
  ellipse(0, 0, 14, 10);
  fill(0);
  circle(1, 0, 2);
  pop();
}