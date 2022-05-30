// Canvas Reference: https://www.w3schools.com/graphics/canvas_reference.asp

//Resizing the canvas
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

//Building Class
class Building {
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = {
      r: random(100, 255), //pastel colors :)
      g: random(100, 255),
      b: random(100, 255),
      a: 1,
    };
  }

  window(offsetX, offsetY){
    let x = this.x + offsetX;
    let y = this.y + offsetY;
    let w = 5;
    let h = 5;
    context.shadowBlur = 5;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowColor = 'white';
    context.fillStyle = 'white';
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

  draw(){
    context.shadowBlur = 2;
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 1;
    context.shadowColor = 'gray';
    context.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`;
    context.fillRect(this.x, this.y, this.w, this.h);
    context.lineWidth = 3;
    context.strokeStyle = 'white';
    context.strokeRect(this.x, this.y, this.w, this.h);
    for (let x = 0; x < this.w/2; x+=10) {
      for (let y = 0; y < this.h; y+=10) {
        this.window(x+this.w/4, y+10);
      }
    }
  }
}

//Create Stars
function stars(){
  for (let index = 0; index < 1000; index++) {
    let x = random(0, canvas.width);
    let y = random(0, canvas.height);
    let h = 1;
    let w = 1;
    let color = {
      r: 255,
      g: 255, 
      b: 255, 
      a: 1}
    context.shadowBlur = 1;
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 1;
    context.shadowColor = 'white';
    context.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    context.fillRect(x, y, w, h);
  }
}

stars();

//JS Events
//Reference: https://www.w3schools.com/js/js_events.asp

//Setup of a mouse object to use in the event
const mouse = {
  x: undefined,
  y: undefined,
}

//Add On Click event
canvas.addEventListener("click", (event) => {
  console.log(event); //The event argument is an object that has information about the event. Example: mouse position.

  mouse.x = event.offsetX;
  mouse.y = event.offsetY;

  let x= mouse.x;
  let y= mouse.y;
  let w= random(100, 280)/2;
  let h= mouse.y * canvas.height; //The height of the building depends on where you put your mouse

  let building = new Building(x, y, w, h);
  building.draw();
});


