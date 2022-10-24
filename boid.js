class Boid {
    constructor() {
        this.minVel = 2;
        this.medVel = 4;

        this.pos        = createVector(random(width), random(height));
        this.vel        = p5.Vector.random2D();
        this.vel.setMag(random(this.minVel, this.medVel))
        this.acc        = createVector();
        
        this.maxAcc   = 0.2;
        this.maxVel = 5;
        
        this.alignRad   = 25;
        this.cohesRad   = 25;
        this.separRad   = 25;
        this.avoidRad   = 25;
        this.surviRad   = 25;
    }

    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = width;
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }

    update() {
        this.pos.add(this.vel);
        // this.vel.add(this.acceleration);
        this.vel.limit(this.maxVel);
        // this.acceleration.mult(0);
    }
    
    show() {
        strokeWeight(6);
        stroke(255);
        let pointX = this.pos.x;
        let pointY = this.pos.y;
        point(this.pos.x, this.pos.y);
        // triangle()
    }

    align(boids) {
        
    }

    seperation(boids) {

    }

    cohesion(boids) {

    }

    avoidance(boids) {

    }

    survival() {

    }
}