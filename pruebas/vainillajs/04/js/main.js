// Canvas Reference: https://www.w3schools.com/graphics/canvas_reference.asp

//Testing Season & time
let hemisphere = "";

window.navigator.geolocation.getCurrentPosition((position) => {
  console.log(position.coords.latitude);
  if (position.coords.latitude > 0) {
    hemisphere = "North";
  } else {
    hemisphere = "South";
  }
  let date = new Date();
  let month = date.getMonth();
  let time = date.getTime();
  if (hemisphere == "South" && month > 1) {
    console.log("otoño");
  }
  if (time > 17) {
    console.log("es de noche");
  } else {
    console.log("es de dia");
  }
});

//Resizing the canvas
let canvas = document.querySelector("canvas");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

//Context
let context = canvas.getContext("2d");

//Block Class
class Block {
  constructor(x, y, w, h, a, dx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.a = a;
    this.dx = dx;
    this.color = {
      r: random(100, 255), //pastel colors :)
      g: random(100, 255),
      b: random(100, 255),
    };
  }

  window() {
    let x = this.x + 5;
    let y = this.y + this.h;
    let w = this.w / 2;
    let h = this.h / 2;
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
    context.fillRect(this.x, this.y + this.h, this.w, this.h / 2);

    // context.lineWidth = 3;
    context.strokeStyle = "white";
    context.strokeRect(this.x, this.y, this.w, this.h);
  }
  drawRoof() {
    context.fillRect(this.x, this.y + this.h, this.w, this.h / 2);
    context.strokeRect(this.x, this.y + this.h, this.w, this.h / 2);
  }

  move() {
    if (this.x > 100 || this.x < 10) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
  }

  update() {
    //this.drawRoof();
    this.draw();
    //this.window();
  }
}

//JS Events
//Reference: https://www.w3schools.com/js/js_events.asp

//Setup of a mouse object to use in the event
let mouse = {
  x: undefined,
  y: undefined,
};

let blocks = [];

let pruebaImg = new Image();
pruebaImg.src = "imgs/prueba-export.png";

//Add On Click event
canvas.addEventListener("click", (event) => {
  console.log(event); //The event argument is an object that has information about the event. Example: mouse position.

  mouse.x = event.offsetX;
  mouse.y = event.offsetY;

  let x = mouse.x;
  let y = mouse.y;
  let w = 20;
  let h = 20;
  let a = 1;

  let s = 0;
  s = snapToGrid(x, y);

  x = s.x;
  y = s.y;

  let test = new Sprite({
    position: {
      x: s.x,
      y: s.y,
    },
    img: pruebaImg,
    frames: {
      max: 1,
    },
  });

  blocks.push(test);

  blocks.forEach((newBlock) => {
    for (let i = 0; i < blocks.length; i++) {
      if (newBlock === blocks[i]) continue;
      if (
        newBlock.position.x + newBlock.width > blocks[i].position.x &&
        newBlock.position.x < blocks[i].position.x + blocks[i].width &&
        newBlock.position.y + newBlock.height > blocks[i].position.y &&
        newBlock.position.y < blocks[i].position.y + blocks[i].height
      ) {
        blocks.pop();
      }
    }
    newBlock.draw();
  });
});

//Erase last block added on right click
canvas.addEventListener("auxclick", (e) => {
  blocks.pop();
  context.clearRect(0, 0, canvas.width, canvas.height);
  blocks.forEach((newBlock) => {
    newBlock.draw();
  });
});

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

//GRID
let gridSize = 20;

let x = 10;
let y = 10;
let w = 20;
let h = 20;
let dx = 0.05;

// let prueba = new Block(x, y, w, h, 1, dx);
// //Animation Loop
// function animate() {
//   //With this function you make the loop
//   requestAnimationFrame(animate);

//   for (let i = 0; i < canvas.width; i += gridSize) {
//     for (let j = 0; j < canvas.height; j += gridSize) {
//       drawPoints(i, j, "white");
//     }
//   }
//   //context.clearRect(0, 0, innerWidth, innerHeight);
//   prueba.update();
//   prueba.move();
// }

//animate();

function drawPoints(x, y, color) {
  context.strokeStyle = color;
  context.strokeRect(x, y, 20, 20);
  context.fillStyle = color;
  context.fill();
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
