let xSpacing = 16; // Distance between each horizontal location
let ySpacing; // Distance between each wave
let waveWidth; // Width of entire wave
let theta = 0; // Start angle at 0
let amplitude; // Height of wave
let frequency = 0.0033; // wave frequency
let dx; // Value for incrementing x
let sinValues; // Using an array to store height values for the wave
let padding; // Padding from top
let renderLines = false; // flag for rendering lines between poitns
let pointWidth = 8; // Width of the wave ellipses
let speed = 0.02; // Speed of wave scrolling
let dropThreshold;
let dropSpeed = 18; // Speed of saw and square points dropping
let sawThreshold;
p5.disableFriendlyErrors = true; // Performance optimization
let animHeight;
let animWidth;
let cnv;
// The following variables should be specified in html e.g.:
// <script> variableName="home" </script>
// parentId
// colorSin
// colorSquare
// colorTri
// colorSaw
let waveOffset = 0;

function setColors() {
  if (typeof colorSin == "undefined") {
    colorSin = "#1abc9c";
  }
  if (typeof colorSquare == "undefined") {
    colorSquare = "#bc1a7b";
  }
  if (typeof colorTri == "undefined") {
    colorTri = "#bc3a1a";
  }
  if (typeof colorSaw == "undefined") {
    colorSaw = "#bc9b1a";
  }
}

function setWindow() {
  if (typeof parentId != "undefined") {
    animHeight = document.getElementById(parentId).clientHeight;
    animWidth = document.getElementById(parentId).clientWidth;
    cnv = createCanvas(animWidth, animHeight);
    cnv.parent(parentId);
  } else {
    animHeight = windowHeight;
    animWidth = windowWidth;
  }
}

function setup() {
  setColors();
  setWindow();
  initConstants();
}

function windowResized() {
  setup();
}

function initConstants() {
  waveWidth = width + 16;
  ySpacing = animHeight / 4;
  padding = animHeight / 20;
  amplitude = animHeight / 20;
  waveOffset = animHeight / 30;
  dx = TWO_PI * frequency * xSpacing;
  dropThreshold = 0.97 * PI;
  sawThreshold = 0.15 * amplitude;
  sinValues = new Array(floor(waveWidth / xSpacing));
  squareValues = new Array(floor(waveWidth / xSpacing));
  triValues = new Array(floor(waveWidth / xSpacing));
  sawValues = new Array(floor(waveWidth / xSpacing));
}

function draw() {
  background("#2c3e50");
  calcSin(theta);
  calcSquare(theta);
  calcTri(theta);
  calcSaw(theta);
  renderWaves();
  theta += speed % TWO_PI;
}

function calcSin(thetaSin) {
  // For every x value, calculate a y value with sine function
  let x = thetaSin;
  for (let i = 0; i < sinValues.length; i++) {
    sinValues[i] = -(sin(x) * amplitude);
    x += dx;
  }
}

function calcSquare(thetaSquare) {
  let x = thetaSquare % TWO_PI;
  for (let i = 0; i < squareValues.length; i++) {
    if (x > dropThreshold && x < PI) {
      squareValues[i] += speed * dropSpeed * amplitude;
      squareValues[i] = Math.min(squareValues[i], amplitude);
    } else if (x > dropThreshold * 2 && x < TWO_PI) {
      squareValues[i] += -speed * dropSpeed * amplitude;
      squareValues[i] = Math.max(squareValues[i], -amplitude);
    } else if (x >= PI) {
      squareValues[i] = amplitude;
    } else {
      squareValues[i] = -amplitude;
    }
    x = (x + dx) % TWO_PI;
  }
}

function calcTri(thetaTri) {
  let x = thetaTri % TWO_PI;
  let slope = (2 * amplitude) / PI;
  for (let i = 0; i < triValues.length; i++) {
    if (x < HALF_PI) {
      triValues[i] = -(slope * x);
    } else if (x < PI) {
      triValues[i] = slope * x - 2 * amplitude;
    } else if (x < 3 * HALF_PI) {
      triValues[i] = slope * x - 2 * amplitude;
    } else {
      triValues[i] = -(slope * x) + 4 * amplitude;
    }
    x = (x + dx) % TWO_PI;
  }
}

function calcSaw(thetaSaw) {
  let x = thetaSaw % TWO_PI;
  let slope = amplitude / PI;
  for (let i = 0; i < sawValues.length; i++) {
    if (x > dropThreshold && x < PI) {
      sawValues[i] += speed * dropSpeed * amplitude;
      sawValues[i] = Math.min(squareValues[i], amplitude);
    } else if (x <= PI) {
      sawValues[i] = -(slope * x);
    } else {
      sawValues[i] = -(slope * x - 2 * amplitude);
    }

    x = (x + dx) % TWO_PI;
  }
}

function renderWaves() {
  strokeWeight(6);
  renderSin(padding + amplitude - waveOffset, colorSin);
  renderSquare(padding + amplitude + ySpacing - waveOffset, colorSquare);
  renderTri(padding + amplitude + 2 * ySpacing + waveOffset, colorTri);
  renderSaw(padding + amplitude + 3 * ySpacing + waveOffset, colorSaw);
}

function renderSin(y, waveColor) {
  fill(color(waveColor));
  stroke(color(waveColor));
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < sinValues.length; x++) {
    ellipse(x * xSpacing, sinValues[x] + y, pointWidth, pointWidth);
    if (renderLines && x > 0) {
      line(
        (x - 1) * xSpacing,
        sinValues[x - 1] + y,
        x * xSpacing,
        sinValues[x] + y
      );
    }
  }
}

function renderSquare(y, waveColor) {
  fill(color(waveColor));
  stroke(color(waveColor));
  for (let x = 0; x < sinValues.length; x++) {
    ellipse(x * xSpacing, squareValues[x] + y, pointWidth, pointWidth);
    if (renderLines && x > 0) {
      if (squareValues[x - 1] == squareValues[x]) {
        line(
          (x - 1) * xSpacing,
          squareValues[x - 1] + y,
          x * xSpacing,
          squareValues[x] + y
        );
      }
    }
  }
}

function renderTri(y, waveColor) {
  fill(color(waveColor));
  stroke(color(waveColor));
  for (let x = 0; x < sinValues.length; x++) {
    ellipse(x * xSpacing, triValues[x] + y, pointWidth, pointWidth);
    if (renderLines && x > 0) {
      line(
        (x - 1) * xSpacing,
        triValues[x - 1] + y,
        x * xSpacing,
        triValues[x] + y
      );
    }
  }
}

function renderSaw(y, waveColor) {
  fill(color(waveColor));
  stroke(color(waveColor));
  for (let x = 0; x < sinValues.length; x++) {
    ellipse(x * xSpacing, sawValues[x] + y, pointWidth, pointWidth);
    if (renderLines && x > 0) {
      if (abs(sawValues[x - 1] - sawValues[x]) <= sawThreshold) {
        line(
          (x - 1) * xSpacing,
          sawValues[x - 1] + y,
          x * xSpacing,
          sawValues[x] + y
        );
      }
    }
  }
}
