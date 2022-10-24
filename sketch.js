const flock = [];

let aSlider, cSlider, sSlider;

function setup() {
    createCanvas(640, 360);
    aSlider = createSlider(0, 2, 1.5, 0.1);
    cSlider = createSlider(0, 2, 1, 0.1);
    sSlider = createSlider(0, 2, 2, 0.1);
  }
  
  function draw() {
    background(0);
  }