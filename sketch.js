const flock = [];

let aSlider, cSlider, sSlider;

function setup() {
    createCanvas(700, 700);
    alignSlider = createSlider(0, 2, 1, 0.1);
    cohesSlider = createSlider(0, 2, 1, 0.1);
    separSlider = createSlider(0, 2, 1, 0.1);
    avoidSlider = createSlider(0, 2, 1, 0.1);
    surviSlider = createSlider(0, 2, 1, 0.1);

    for (let i = 0; i < 200; i++) {
      flock.push(new Boid());
    }
  }
  
  function draw() {
    background(0);

    for (let boid of flock) {
      boid.edges();
      boid.update();
      boid.show();
    }

  }