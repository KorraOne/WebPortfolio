var canvas

let mover1;
let mover2;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', -1);
  background(0, 200, 255);

  mover1 = new Mover(300, 200);
  mover2 = new Mover(300, 400);

  mover1.velocity = createVector(5, 13);
}

function draw() {
  attract(mover1, mover2);
  attract(mover2, mover1);

  mover1.edges();
  mover1.update();
  mover1.show();

  mover2.update();
  mover2.show();

  stroke(2);
  line(mover1.position.x, mover1.position.y, mover2.position.x, mover2.position.y);

  background(0, 200, 255, 10);
}

function mouseInCanvas() {
  return mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height
}

/**
 * Mover is attracted towards attractor, One way attraction
 * 
 * @param {Mover} mover 
 * @param {Mover} attractor 
 */
function attract(mover, attractor) {
  let f = createVector(attractor.position.x, attractor.position.y);
  f.sub(mover.position);
  f.mult(0.01);
  f.clampToZero();
  mover.applyForce(f); 
}