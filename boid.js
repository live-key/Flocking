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
        
        this.alignRad   = 25;
        this.cohesRad   = 50;
        this.separRad   = 25;
        this.avoidRad   = 60;

        this.maxRad = max(this.alignRad, this.cohesRad, this.separRad, 
                            this.avoidRad, this.surviRad);

        this.dead = false;
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
        if (this.dead) return;
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
        let delta = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.pos.x, this.pos.y, 
                other.pos.x, other.pos.y);
            if (other != this && d < this.cohesRad) {
                delta.add(other.pos)
                total++;
            }
        }

        if (total > 0) {
            delta.div(total);
            delta.sub(this.pos);
            delta.setMag(this.maxVel);
            delta.sub(this.vel);
            delta.limit(this.maxAcc);
        }
        return delta;
    }

    separation(boids) {
        let delta = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.pos.x, this.pos.y, 
                other.pos.x, other.pos.y);
            if (other != this && d < this.alignRad) {
                let sep = p5.Vector.sub(this.pos, other.pos);
                sep.div(d*d);
                delta.add(sep);
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

    avoidance(obs) {
        let delta = createVector();
        let total = 0;

        for (let ob of obs) {
            let d = dist(this.pos.x, this.pos.y, 
                ob.pos.x, ob.pos.y);
            if (d  - ob.rad < this.avoidRad) {
                if (d - ob.rad < -20) {
                    this.dead = true;
                    return delta;
                }
                let sep = p5.Vector.sub(this.pos, ob.pos);
                sep.div(d*d);
                delta.add(sep);
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

    behaviour(boids, obs) {
        let align = this.align(boids);
        let cohes = this.cohesion(boids);
        let separ = this.separation(boids);
        let avoid = this.avoidance(obs);

        align.mult(alignSlider.value());
        cohes.mult(cohesSlider.value());
        separ.mult(separSlider.value());
        avoid.mult(avoidSlider.value());

        this.acc.add(align);
        this.acc.add(cohes);
        this.acc.add(separ);
        this.acc.add(avoid);
    }
}