// Canvas Reference: https://www.w3schools.com/graphics/canvas_reference.asp

//Resizing the canvas
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;

//Context
let context = canvas.getContext("2d");

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

let isColliding = false;

//Block Class
class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.color = {
      r: random(100, 255), //pastel colors :)
      g: random(100, 255),
      b: random(100, 255),
      a: 1,
    };
  }

  window(offsetX, offsetY) {
    let x = this.x + offsetX;
    let y = this.y + offsetY;
    let w = 10;
    let h = 10;
    context.shadowBlur = 5;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowColor = "white";
    context.fillStyle = "white";
    context.fillRect(x, y, w, h);
  }

  // door(){
  //   let x = this.x +this.w/4;
  //   let y = canvas.height-20;
  //   let w = this.w/2;
  //   let h = 30;
  //   context.shadowBlur = 5;
  //   context.shadowColor = 'gray';
  //   context.shadowColor = 'transparent';
  //   context.fillStyle = 'white';
  //   // context.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`;
  //   context.fillRect(x, y, w, h);
  //   context.lineWidth = 1;
  //   context.strokeStyle = 'white';
  //   context.strokeRect(x, y, w, h);
  // }

  draw() {
    // context.shadowBlur = 2;
    // context.shadowOffsetX = 1;
    // context.shadowOffsetY = 1;
    // context.shadowColor = "gray";
    context.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`;
    context.fillRect(this.x, this.y, this.w, this.h);
    // context.lineWidth = 3;
    context.strokeStyle = "white";
    context.strokeRect(this.x, this.y, this.w, this.h);

    this.window(20, 20);
  }

  //Collision detection
  update(Blocks) {
    for (let index = 0; index < Blocks.length; index++) {
      if (this === Blocks[index]) continue;
      if (
        this.x + this.w >= Blocks[index].x &&
        this.x <= Blocks[index].x + Blocks[index].w
      ) {
        isColliding = true;
        console.log(isColliding);
      } else {
        isColliding = false;
        console.log(isColliding);
      }
    }
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

stars();

//Collision detection function
function collisionDetection(a, b) {
  if (a.x + a.width >= b.x && a.x <= b.x + b.width) {
    return true;
  }
}

//JS Events
//Reference: https://www.w3schools.com/js/js_events.asp

//Setup of a mouse object to use in the event
const mouse = {
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

  let s = snapToGrid(x, y);

  x = s.x;
  y = s.y;

  //Change new Block position if it collides with another one
  for (let i = 0; i < blocks.length; i++) {
    if (
      x + 50 >= blocks[i].x &&
      x <= blocks[i].x + 50 &&
      y + 50 >= blocks[i].y &&
      y <= blocks[i].y + 50
    ) {
      isColliding = true;
    } else {
      isColliding = false;
    }
  }
  blocks.push(new Block(x, y));
  blocks.forEach((newBlock) => {
    newBlock.draw(blocks);
  });
});

//GRID
let gridSize = 50;

for (let i = gridSize; i < canvas.width; i += gridSize) {
  for (let j = gridSize; j < canvas.height; j += gridSize) {
    drawPoints(i, j, "white");
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
