class Obstacle {
    constructor(x, y) {
        console.log(x, y)

        this.pos = createVector(x, y);
        this.col = color(random(0,255), random(0,255), random(0,255));
        this.rad = 60; 
    }

    show() {
        noStroke(255);
        fill(this.col);
        ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
    }
}