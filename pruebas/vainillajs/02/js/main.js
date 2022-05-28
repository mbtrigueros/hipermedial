// Canvas Reference: https://www.w3schools.com/graphics/canvas_reference.asp

//Resizing the canvas according to the viewport
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth/2;
canvas.height = window.innerHeight/2;

//Context
let context = canvas.getContext("2d");

//Random function
function random(min = 0, max = 100) {
  // find diff
  let difference = max - min;
  // generate random number 
  let rand = Math.random();
  // multiply with difference 
  rand = Math.floor( rand * difference);
  // add with min value 
  rand = rand + min;
  return rand;
}

let windows = [];

//Rectangle Class
class Rectangle {
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = {
      r: Math.random() * 255,
      g: Math.random() * 255,
      b: Math.random() * 255,
      a: 1,
    };
  }

  window(offsetX, offsetY){
    context.fillStyle = 'white';
    context.fillRect(this.x + offsetX, this.y + offsetY, 5, 5);
  }

  draw(){
    context.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`;
    context.fillRect(this.x, this.y, this.w, this.h);
    for (let x = 0; x < this.w-15; x+=10) {
      for (let y = 0; y < this.h; y+=20) {
        this.window(x+5, y+10);
      }
    }
  }
}
//JS Events
//Reference: https://www.w3schools.com/js/js_events.asp

//Setup of a mouse object to use in the event
const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("click", (event) => {
  console.log(event); //The event argument is an object that has information about the event. Example: mouse position.

  mouse.x = event.offsetX;
  mouse.y = event.offsetY;

  let rectangle = new Rectangle(mouse.x, mouse.y, random(50, 300)/2, mouse.y * canvas.height);

  rectangle.draw();


  console.log(mouse);
  console.log(rectangle);
});

