class Cell {
    constructor(x, y, w, bomb) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.bomb = bomb;
      this.flag = false;
      this.revealed = false;
      this.value = 0;
    }
  
    show() {
      fill(255);
      if (this.revealed) fill(200);
      rect(this.x, this.y, this.w, this.w);
  
      if (this.flag) {
        fill(0, 255, 0);
        circle(this.x + this.w / 2, this.y + this.w / 2, this.w * 0.6);
      } else if (this.revealed) {
        if (this.bomb) {
          fill(255, 0, 0);
          circle(this.x + this.w / 2, this.y + this.w / 2, this.w * 0.6);
        } else if (this.value != 0) {
          fill(0);
          textAlign(CENTER);
          textSize(floor(this.w * 0.6));
          text(
            this.value,
            this.x + this.w / 2,
            this.y + this.w / 2 + this.w * 0.2
          );
        }
      }
    }
  
    addFlag() {
      if (!this.revealed) {
        if (this.flag) {
          this.flag = false;
        } else {
          this.flag = true;
        }
      }
    }
  
    clicked() {
      this.revealed = true;
      this.cascadeOpen();
    }
  
    cascadeOpen() {
      if (this.value == 0) {
        let neighbours = this.getNeighbours();
        for (let i = 0; i < neighbours.length; i++) {
          if (!neighbours[i].revealed) {
            neighbours[i].clicked();
          }
        }
      }
    }
  
    getNeighbours() {
      let neighbours = [];
  
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // if self cell
          if (i == 0 && j == 0) continue;
  
          let newX = this.x / this.w + i;
          let newY = this.y / this.w + j;
          if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
            neighbours.push(grid[newX][newY]);
          }
        }
      }
      return neighbours;
    }
  
    findValue(grid, cols, rows) {
      if (this.bomb) {
        this.value = -1;
        return;
      }
  
      let neighbours = this.getNeighbours();
      for (let i = 0; i < neighbours.length; i++) {
        if (neighbours[i].bomb) {
          this.value++;
        }
      }
    }
  }