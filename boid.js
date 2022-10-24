class Boid {
    constructor() {
        this.minVelRange = 2;
        this.maxVelRange = 4;

        this.pos        = createVector(random(width), random(height));

        this.vel        = p5.Vector.random2D();
        this.vel.setMag(random(this.minVelRange, this.maxVelRange))

        this.acc        = createVector(0, 0);
        
        this.maxAcc   = 0.2;
        this.maxVel = 5;
        
        this.alignRad   = 100;
        this.cohesRad   = 25;
        this.separRad   = 25;
        this.avoidRad   = 25;
        this.surviRad   = 25;

        this.maxRad = max(this.alignRad, this.cohesRad, this.separRad, 
                            this.avoidRad, this.surviRad);
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
        this.vel.add(this.acc);
        this.vel.limit(this.maxVel);
        this.acc.mult(0);
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
        let delta = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.pos.x, this.pos.y, 
                other.pos.x, other.pos.y);
            if (other != this && d < this.alignRad) {
                delta.add(other.vel)
                total++;
            }
        }

        if (total > 0) {
            delta.div(total);
            delta.setMag(this.maxVel);
            delta.sub(this.vel);
            delta.limit(this.maxAcc);
        }

        return delta;
    }

    cohesion(boids) {

    }

    seperation(boids) {

    }

    avoidance(boids) {

    }

    survival(boids) {

    }

    behaviour(boids) {
        let align = this.align(boids);
        // let cohes = this.cohesion(boids);
        // let separ = this.separation(boids);
        // let avoid = this.avoidance(boids);
        // let survi = this.survival(boids);

        align.mult(alignSlider.value());
        // cohes.mult(cohesSlider.value());
        // separ.mult(separSlider.value());

        this.acc.add(align);
        // this.acceleration.add(cohesion);
        // this.acceleration.add(separation);
    }
}