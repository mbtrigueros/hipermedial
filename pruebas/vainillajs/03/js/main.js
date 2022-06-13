// Canvas Reference: https://www.w3schools.com/graphics/canvas_reference.asp

//Resizing the canvas
let canvas = document.querySelector("canvas");
canvas.width = 960;
canvas.height = 500;

//Context
let context = canvas.getContext("2d");

//Block Class
class Block {
  constructor(x, y, w, h, a) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.a = a;
    this.color = {
      r: random(100, 255), //pastel colors :)
      g: random(100, 255),
      b: random(100, 255),
    };
  }

  window(offsetX, offsetY) {
    let x = this.x + offsetX;
    let y = this.y + offsetY;
    let w = 10;
    let h = 10;
    context.shadowBlur = 5;
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 0;
    context.shadowColor = "white";
    context.fillStyle = "white";
    context.fillRect(x, y, w, h);
  }

  draw() {
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowColor = "gray";
    context.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.a})`;
    context.fillRect(this.x, this.y, this.w, this.h);
    // context.lineWidth = 3;
    context.strokeStyle = "white";
    context.strokeRect(this.x, this.y, this.w, this.h);
    this.window(20, 20);
  }

  update() {
    this.draw();
  }
}

//Create Stars
function stars() {
  for (let index = 0; index < 1000; index++) {
    let x = random(0, canvas.width);
    let y = random(0, canvas.height);
    let h = 1;
    let w = 1;
    let color = {
      r: 255,
      g: 255,
      b: 255,
      a: 1,
    };
    context.shadowBlur = 1;
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 1;
    context.shadowColor = "white";
    context.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    context.fillRect(x, y, w, h);
  }
}

//stars();

//JS Events
//Reference: https://www.w3schools.com/js/js_events.asp

//Setup of a mouse object to use in the event
let mouse = {
  x: undefined,
  y: undefined,
};

let blocks = [];

//Add On Click event
canvas.addEventListener("click", (event) => {
  console.log(event); //The event argument is an object that has information about the event. Example: mouse position.

  mouse.x = event.offsetX;
  mouse.y = event.offsetY;

  let x = mouse.x;
  let y = mouse.y;
  let w = 50;
  let h = 50;
  let a = 1;

  let s = 0;
  s = snapToGrid(x, y);

  x = s.x;
  y = s.y;

  let can;

  for (let i = 0; i < blocks.length; i++) {
    if (y == canvas.height - gridSize) {
      can = true;
      console.log("esta en el piso");
    }
    if (y + h >= blocks[i].y && x == blocks[i].x) {
      can = true;
      console.log("no esta en el piso, pero esta arriba");
      if (canvas.height - y == gridSize * 2) {
        //detect how high is the block
        a = 0.1;
      }
    }
  }

  if (y == canvas.height - gridSize || can)
    blocks.push(new Block(x, y, w, h, a));

  blocks.forEach((newBlock) => {
    for (let i = 0; i < blocks.length; i++) {
      if (newBlock === blocks[i]) continue;
      if (
        newBlock.x + blocks[i].w > blocks[i].x &&
        newBlock.x < blocks[i].x + blocks[i].w &&
        newBlock.y + blocks[i].h > blocks[i].y &&
        newBlock.y < blocks[i].y + blocks[i].h
      ) {
        blocks.pop();
      }
    }

    newBlock.update();
  });
});

//Erase last block added on right click
canvas.addEventListener("auxclick", (e) => {
  blocks.pop();
  context.clearRect(0, 0, canvas.width, canvas.height);
  blocks.forEach((newBlock) => {
    newBlock.update();
  });
});

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

//GRID
let gridSize = 50;

for (let i = gridSize; i < canvas.width; i += gridSize) {
  for (let j = gridSize; j < canvas.height; j += gridSize) {
    drawPoints(i, j, "transparent");
  }
}
// used to draw points
function drawPoints(x, y, color) {
  context.beginPath();
  context.arc(x, y, 2, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
  context.closePath();
}
function snapToGrid(x, y) {
  let modX = x % gridSize;
  let modY = y % gridSize;
  let result = { x: 0, y: 0 };
  result.x = modX > gridSize / 2 ? x + (gridSize - modX) : x - modX;
  result.y = modY > gridSize / 2 ? y + (gridSize - modY) : y - modY;
  return result;
}

//Random function
function random(min = 0, max = 100) {
  // find diff
  let difference = max - min;
  // generate random number
  let rand = Math.random();
  // multiply with difference
  rand = Math.floor(rand * difference);
  // add with min value
  rand = rand + min;
  return rand;
}
