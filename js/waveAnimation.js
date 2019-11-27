let xSpacing = 1; // Distance between each horizontal location
let ySpacing = 120; // Distance between each wave
let waveWidth; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 30.0; // Height of wave
let frequency = 0.0033; // wave frequency
let dx; // Value for incrementing x
let sinValues; // Using an array to store height values for the wave
let padding = 30; // Padding from top

function setup() {
  createCanvas(800, 500);
  waveWidth = width + 16;
  dx = TWO_PI * frequency * xSpacing;
  sinValues = new Array(floor(waveWidth / xSpacing));
  squareValues = new Array(floor(waveWidth / xSpacing));
  triangleValues = new Array(floor(waveWidth / xSpacing));
  sawValues = new Array(floor(waveWidth / xSpacing));
}

function draw() {
  background("#2c3e50");
  calcSin(theta);
  calcSquare(theta);
  calcTriangle(theta);
  calcSaw(theta);
  renderWaves();
  //theta += 0.2 % TWO_PI;
}

function calcSin(thetaSin) {
  // For every x value, calculate a y value with sine function
  let x = thetaSin;
  for (let i = 0; i < sinValues.length; i++) {
    sinValues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function calcSquare(thetaSquare) {
  let x = thetaSquare;
  for (let i = 0; i < squareValues.length; i++) {
    squareValues[i] = x > PI ? -amplitude : amplitude;
    x = (x + dx) % TWO_PI;
  }
}

function calcTriangle(thetaTriangle) {
  let x = thetaTriangle;
  for (let i = 0; i < triangleValues.length; i++) {
    let slope;
    if (x >= HALF_PI && location < 3 * HALF_PI) {
      slope = (-2 * amplitude * xSpacing) / PI;
    } else {
      slope = (2 * amplitude * xSpacing) / PI;
    }
    triangleValues[i] = location - dx + 0.2 * slope;
    x = (x + dx) % TWO_PI;
  }
}

function calcSaw(thetaSaw) {
  let x = thetaSaw;
  let slope = -amplitude / PI;
  for (let i = 0; i < sawValues.length; i++) {
    if (x < PI) {
      sawValues[i] = slope * x;
    } else {
      sawValues[i] = slope * x + 2 * amplitude;
    }

    x = (x + dx) % TWO_PI;
  }
}

function renderWaves() {
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < sinValues.length; x++) {
    fill(color("#1abc9c"));
    stroke(color("#1abc9c"));
    //ellipse(x * xSpacing, padding + amplitude + sinValues[x], 8, 8);
    if (x > 0) {
      line(
        (x - 1) * xSpacing,
        sinValues[x - 1] + padding + amplitude,
        x * xSpacing,
        sinValues[x] + padding + amplitude
      );
    }
    line(0, padding + amplitude, width, padding + amplitude);

    fill(color("#bc1a7b"));
    stroke(color("#bc1a7b"));
    //ellipse(x * xSpacing, padding + amplitude + ySpacing + squareValues[x], 8, 8);
    if (x > 0) {
      line(
        (x - 1) * xSpacing,
        squareValues[x - 1] + padding + amplitude + ySpacing,
        x * xSpacing,
        squareValues[x] + padding + amplitude + ySpacing
      );
    }
    line(
      0,
      padding + amplitude + ySpacing,
      width,
      padding + amplitude + ySpacing
    );

    fill(color("#bc3a1a"));
    stroke(color("#bc3a1a"));
    //ellipse(x * xSpacing, padding + amplitude + 2 * ySpacing + sinValues[x], 8, 8);
    if (x > 0) {
      line(
        (x - 1) * xSpacing,
        triangleValues[x - 1] + padding + amplitude + 2 * ySpacing,
        x * xSpacing,
        triangleValues[x] + padding + amplitude + 2 * ySpacing
      );
    }
    line(
      0,
      padding + amplitude + 2 * ySpacing,
      width,
      padding + amplitude + 2 * ySpacing
    );

    fill(color("#bc8b1a"));
    stroke(color("#bc8b1a"));
    //ellipse(x * xSpacing, padding + amplitude + 3 * ySpacing + sawValues[x], 8, 8);
    if (x > 0) {
      line(
        (x - 1) * xSpacing,
        sawValues[x - 1] + padding + amplitude + 3 * ySpacing,
        x * xSpacing,
        sawValues[x] + padding + amplitude + 3 * ySpacing
      );
    }
    line(
      0,
      padding + amplitude + 3 * ySpacing,
      width,
      padding + amplitude + 3 * ySpacing
    );
  }
}
