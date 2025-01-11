function keyPressed() {
  if (key === ' ' && bird.alive) {
    if (!gameStarted) {
      gameStarted = true;
    }
    bird.up();
  } else {
    if (score > highScore) {
      highScore = score;
    }

    resetGame();
  }
}

function touchStarted() {
  if (mouseX > 0 && mouseX < width && 
      mouseY > 0 && mouseY < height) {
    print("touch");
    if (bird.alive) {
      if (!gameStarted) {
        gameStarted = true;
      }
      bird.up();
    } else {
      if (score > highScore) {
        highScore = score;
      }
      resetGame();
    }
  }
  return false;
}

function resetGame() {
  gameStarted = false;
  bird = new Bird(200, height / 2);
  pipes = [];
  score = 0;
  pipes.push(new Pipe(width - 300));
  pipes.push(new Pipe(width));
  pipes.push(new Pipe(width + 300));
}

function createBackground() {
  // clouds
  clouds.push(new Cloud(100, 100));
  clouds.push(new Cloud(300, 200));
  clouds.push(new Cloud(500, 150));
  clouds.push(new Cloud(700, 250));
  clouds.push(new Cloud(900, 300));
  clouds.push(new Cloud(1100, 200));
  clouds.push(new Cloud(1300, 150));
}

function drawBackgroud() {
  noStroke();
  fill(110, 40, 20);
  rect(0, height - 30, width, height);
  stroke(0);

  for (cloud of clouds) {
    cloud.update();
    cloud.show();
  }
}