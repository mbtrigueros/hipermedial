let pyramid = {
  color: { r: 15, g: 230, b: 126, a: 10 },
  points: [
    { x: 310, y: 80 },
    { x: 150, y: 320 },
    { x: 470, y: 320 }
  ],
  weight: 2
}

function setup() {
  let canvas = createCanvas(620, 400)
  canvas.parent('anim')
}

function draw() {
  noFill();
  strokeWeight(pyramid.weight);
  stroke(pyramid.color.r, pyramid.color.g, pyramid.color.b);
  triangle(pyramid.points[2].x, pyramid.points[0].y, pyramid.points[0].x, pyramid.points[0].y, pyramid.points[1].x, pyramid.points[2].y);

  if(mouseIsPressed) {
    pyramid.points[1].x = mouseX
    pyramid.points[0].y = mouseY
    pyramid.color.r = mouseX;
    pyramid.color.g = mouseY;
    pyramid.weight = mouseY/10; 

    background(0, 50);
  } 
}