class Pipe {
  constructor(x) {
    this.gapSize = 100;
    this.gapPos = random(this.gapSize, height - this.gapSize);
    this.top = this.gapPos - this.gapSize;
    this.bottom = this.gapPos + this.gapSize;
    this.x = x;
    this.w = 60;
    this.speed = 5;
    this.move = false;
  }

  show() {
    fill(0, 255, 0);

    // top pipe
    rect(this.x, 0, this.w, this.top);
    rect(this.x - 2, this.top - 10, this.w + 4, 10);

    // bottom pipe
    rect(this.x, this.bottom, this.w, height - this.bottom);
    rect(this.x - 2, this.bottom, this.w + 4, 10);
  }

  update() {
    if (this.move) {
      this.x -= this.speed;
    }
    this.top = this.gapPos - this.gapSize;
    this.bottom = this.gapPos + this.gapSize;

    // check if bird hit pipe
    if (this.hit(bird)) {
      console.log('hit');
      bird.alive = false;
    }

    // move pipe back to the right
    // change gap position
    if (this.x < -this.w) {
      this.x = width;
      this.gapPos = random(this.gapSize, height - this.gapSize);
      this.top = this.gapPos - this.gapSize;
      this.bottom = this.gapPos + this.gapSize;
    }
  }

  hit(bird) {
    if (this.x < bird.x + 16 && this.x > bird.x - 16 - this.w) {
      // add score
      if (bird.alive) {
        score++;
      }

      // hitbox render, swap update() and show() in sketch.js
      // fill(255, 0, 0);
      // rect(this.x, 0, this.w, this.top);
      // rect(this.x, this.bottom, this.w, height - this.bottom);
      if (bird.y < this.top || bird.y > this.bottom) {
        return true;
      }
    }
  }
}