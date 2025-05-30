let ruleSketch = (p) => {
    p.setup = () => {
        let canvas = p.createCanvas(400, 100);
        canvas.parent("ruleCanvas");
    };

    p.draw = () => {
        p.background(202);
    };
};
new p5(ruleSketch);