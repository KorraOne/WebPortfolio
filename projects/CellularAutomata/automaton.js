let automatonSketch = (p) => {
    let cells = [];
    let w = 10, y = 0;
    let ruleSet = [];
    let ruleNumber = 0;

    p.setup = () => {
        let canvas = p.createCanvas(410, 300);
        canvas.parent("automatonCanvas");
        resetSimulation();
    };

    p.draw = () => {
        for (let i = 0; i < cells.length; i++) {
            p.fill(cells[i] ? 0 : 255);
            p.noStroke();
            p.rect(i * w, y, w, w);
        }

        let nextCells = [];
        for (let i = 0; i < cells.length; i++) {
            let left = cells[(i - 1 + cells.length) % cells.length];
            let mid = cells[i];
            let right = cells[(i + 1) % cells.length];
            nextCells[i] = calculateNextGen(left, mid,right);
        }

        cells = nextCells;
        y += w;
    };

    function calculateNextGen(left, mid, right) {
      if (left == 0 && mid == 0 && right == 0) return ruleSet[0];
      if (left == 0 && mid == 0 && right == 1) return ruleSet[1];
      if (left == 0 && mid == 1 && right == 0) return ruleSet[2];
      if (left == 0 && mid == 1 && right == 1) return ruleSet[3];
      if (left == 1 && mid == 0 && right == 0) return ruleSet[4];
      if (left == 1 && mid == 0 && right == 1) return ruleSet[5];
      if (left == 1 && mid == 1 && right == 0) return ruleSet[6];
      if (left == 1 && mid == 1 && right == 1) return ruleSet[7];
    }

    function resetSimulation() {
        ruleSet = decimalToRuleSet(ruleNumber);
        console.log(ruleNumber);
        p.background(220);
        y = 0;
        cells = new Array(p.width / w).fill(0);
        cells[Math.floor(cells.length / 2)] = 1;
    }

    p.updateRuleNum = (newRuleNum) => {
        ruleNumber = newRuleNum;
        resetSimulation(); // Apply new rules and reset simulation
    };
};

// Create the p5 instance
let sketchInstance = new p5(automatonSketch);

// Function to update rule set externally
function updateRuleNum(newRuleNum) {
    sketchInstance.updateRuleNum(newRuleNum);
}