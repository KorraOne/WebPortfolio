class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 60;
    this.population = 200;

    this.puffs = [];
    let xCoords = [];
    for (let i = 0; i < this.population; i++) {
      xCoords.push(i - this.population / 2);
    }

    let t = random(10000);
    for (x of xCoords) {
      this.puffs.push(new Puff(this.x + x, this.y + noise(t) * 100));
      t += 0.05;
    }
  }

  update() {
    this.x -= 1;
    if (this.x < -100) {
      this.x = width + 100;
    }

    for (let puff of this.puffs) {
      puff.update();
    }
  }

  show() {
    for (let puff of this.puffs) {
      fill(255);
      noStroke();
      circle(puff.x, puff.y, this.size);
    }

    fill(0, 255, 255);
    rectMode(CENTER);
    rect(this.x, this.y + 90, this.population + this.size, 100);
    rectMode(CORNER);
    stroke(0);
  }
}

class Puff {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    this.x -= 1;
    if (this.x < -100) {
      this.x = width + 100;
    }
  }

  show() {
    fill(0);
    circle(this.x, this.y, 5);
  }
}