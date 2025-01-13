let movers = [];
let gravity, wind, mouseForce, jump;
let debugButton, defaultConfig, gravitySlider, windSlider, mouseSlider, jumpSlider;

function setup() {
  createCanvas(600, 600);

  gravity = createVector(0, 0.1);
  wind = createVector(0.1, 0);
  mouseForce = 1;

  movers.push(new Mover(0, height / 2, 1, 16));
  movers.push(new Mover(0, height / 2, 3, 16));
  movers.push(new Mover(0, height / 2, 5, 16));
  movers.push(new Mover(0, height / 2, 7, 16));
  movers.push(new Mover(0, height / 2, 9, 16));
  movers.push(new Mover(0, height / 2, 11, 16));
  movers.push(new Mover(0, height / 2, 13, 16));

  // controls
  debugButton = createCheckbox("Force Lines", true);
  defaultConfig = createButton("Default Parameters")
  gravitySlider = createSlider(-0.5, 0.5, 0.1, 0.1);
  windSlider = createSlider(-1, 1, 0.2, 0.1);
  mouseSlider = createSlider(-1, 2, 1, 0.5);
  jumpSlider = createSlider(-2, 2, -1, 0.1);

  defaultConfig.mousePressed(function() {
    gravitySlider.value(0.1);
    windSlider.value(0.2);
    mouseSlider.value(1);
    jumpSlider.value(-1);
  });
}

function draw() {
  background(255, 200, 180);

  for (let mover of movers) {
    if (mouseIsPressed) {
      if (mouseX > 0 && mouseX < width && 
        mouseY > 0 && mouseY < height) {
        // move towards mouse with force
        let force = createVector(mouseX, mouseY);
        force.sub(mover.position);
        force.normalize();
        force.mult(mouseForce);
        mover.applyForce(force);
      }
    }

    if (keyIsPressed) {
      if (key == ' ') {
        mover.applyForce(createVector(0, jump));
      }
      if (key == "w") {
        let force = wind.copy();
        mover.applyForce(force);
      }
    }

    if (mover.contactEdge()) {
      let friction = mover.velocity.copy();
      friction.normalize();
      friction.mult(-1);
      friction.setMag(0.01);
      mover.applyForce(friction);	
    }

    mover.applyForce(p5.Vector.mult(gravity, mover.mass));
    mover.checkEdges();
    mover.update();
    mover.show();

    // controls
    mover.debug = debugButton.checked();
    gravity.y = gravitySlider.value();
    wind.x = windSlider.value();
    mouseForce = mouseSlider.value();
    jump = jumpSlider.value();
  }
}
