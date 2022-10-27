const flock = [];
let obs = [];

let aSlider, cSlider, sSlider;

function setup() {
  createCanvas(700, 700);
  alignSlider = createSlider(0, 2, 1.5, 0.1);
  cohesSlider = createSlider(0, 2, 1, 0.1);
  separSlider = createSlider(0, 2, 2, 0.1);
  avoidSlider = createSlider(0, 2, 2, 0.1);

  for (let i = 0; i < 200; i++) {
    flock.push(new Boid());
  }
}
  
function draw() {
  background(0);

  for (let ob of obs) {
    ob.show();
  }

  for (let boid of flock) {
    boid.edges();
    boid.behaviour(flock, obs);
    boid.update();
    boid.show();
  }
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let o = new Obstacle(mouseX, mouseY);
    obs.push(o);
  } else {
    obs = [];
  }
}