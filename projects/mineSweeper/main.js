let cnv;

function setup() {
  cnv = createCanvas(400, 400);
  cnv.parent('sketch-holder');
}

let grid = [];
let rows, cols;
let w = 20;
let menuWidth = 0;
let bombChance = 0.2;

function setup() {
  createCanvas(500, 400);
  let boardWidth = width - menuWidth;
  let boardHeight = height;

  cols = floor(boardWidth / w);
  rows = floor(boardHeight / w);

  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      let bomb = random(1) < bombChance;
      let cell = new Cell(i * w, j * w, w, bomb);
      grid[i][j] = cell;
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].findValue(grid, cols, rows);
    }
  }
}

function draw() {
  background(255);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

function mouseReleased() {
  x = floor(mouseX / w);
  y = floor(mouseY / w);
  grid[x][y].clicked();
}

function keyPressed() {
  if (key === " ") {
    x = floor(mouseX / w);
    y = floor(mouseY / w);
    grid[x][y].addFlag();
  }
  if (keyCode === ENTER) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].clicked();
      }
    }
  }
}