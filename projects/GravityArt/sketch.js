let bodies = [];
let stop = false;
let G = 1;
let colour = true;

let penSlider;
let gravitySlider;

function setup() {
  createCanvas(600, 600);
  background(220);

  bodies.push(new Body(200, 200, 200));
  bodies.push(new Body(400, 400, 200));
  bodies[0].velocity = createVector(0, 12);
  bodies[1].velocity = createVector(0, -12);

  penSlider = createSlider(0, 2, 0);
  gravitySlider = createSlider(0, 3, 1);
  massSlider = createSlider(100, 500, 200, 50);
}

function draw() {
  G = gravitySlider.value();

  if (!stop) {
    bodies[0].mass = massSlider.value();
    bodies[1].mass = massSlider.value();

    bodies[0].update();
    bodies[1].update();
    bodies[0].show();
    bodies[1].show();

    bodies[1].applyForce(bodies[0].attract(bodies[1]));
    bodies[0].applyForce(bodies[1].attract(bodies[0]));
  }
}

function keyPressed() {
  if (key === " ") {
    background(220);
  } else if (key === "q") {
    stop = !stop;
  } else if (key === "w") {
    colour = !colour;
  }
}