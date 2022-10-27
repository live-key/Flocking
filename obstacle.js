class Obstacle {
    constructor() {
        this.pos = createVector(random(width*0.25, width*0.75), 
                random(height*0.25, height*0.75));
        this.col = color(random(0,255), random(0,255), random(0,255));
        this.rad = random(50, 70); 
    }

    show() {
        noStroke(255);
        fill(this.col);
        ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
    }
}