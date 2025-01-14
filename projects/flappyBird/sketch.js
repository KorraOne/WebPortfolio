let gameStarted;
let bird;
let pipes;
let score;
let highScore = 0;
let clouds;

let sliderPipeSpeed, 
    sliderPipeGap, 
    sliderGravity, 
    sliderFlapStrength, 
    buttonDefaultSettings;

function setup() {
  createCanvas(500, 600);

  clouds = [];
  createBackground();

  resetGame();

  sliderPipeSpeed = select('#sliderPipeSpeed');
  sliderPipeGap = select('#sliderPipeGap');
  sliderGravity = select('#sliderGravity');
  sliderFlapStrength = select('#sliderFlapStrength');
  buttonDefaultSettings = select('#buttonDefaultSettings');
  
  buttonDefaultSettings.mousePressed(function() {
    sliderPipeSpeed.value(5);
    sliderPipeGap.value(100);
    sliderGravity.value(0.6);
    sliderFlapStrength.value(10);
  });
}

function draw() {
  background(0, 255, 255);
  drawBackgroud();

  if (gameStarted) {
    bird.update();
  }
  bird.show();

  for (pipe of pipes) {
    if (gameStarted) {
      pipe.move = true;
    }
    pipe.update();
    pipe.show();     
    
    // change settings from slider
    pipe.speed = sliderPipeSpeed.value();
    pipe.gapSize = sliderPipeGap.value();
  }

  // change settings from slider
  bird.g = sliderGravity.value();
  bird.flap = sliderFlapStrength.value();
  buttonDefaultSettings.mousePressed(function() {
    sliderPipeSpeed.value(5);
    sliderPipeGap.value(100);
    sliderGravity.value(0.6);
    sliderFlapStrength.value(10);
  });

  if (bird.alive) {
    textAlign(RIGHT);
    fill(0);
    textSize(32);
    text("Score: " + floor(score / 19), width - 10, 50);
    text("High Score: " + floor(highScore / 19), width - 10, 100);
  } else {
    textAlign(CENTER);
    fill(255, 0, 0);
    textSize(32);
    text("You Died :(", width / 2, height / 2);

    fill(0);
    textSize(24);
    text("Score: " + floor(score / 19), width / 2, height / 2 + 34);

    textSize(16);
    text("Press SPACE to restart", width / 2, height / 2 + 64);
  }
}

