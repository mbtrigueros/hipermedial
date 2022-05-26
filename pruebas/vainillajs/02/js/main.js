// Canvas Reference: https://www.w3schools.com/graphics/canvas_reference.asp

//Resizing the canvas according to the viewport
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Context
let context = canvas.getContext("2d");

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
      a: Math.random() * 2,
    };
  }

  draw(){
    context.strokeRect(this.x, this.y, this.w, this.h);
    context.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`;
  }
}

//JS Events
//Reference: https://www.w3schools.com/js/js_events.asp

//Setup of a mouse object to use in the event
const mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("click", (event) => {
  //console.log(event); //The event argument is an object that has information about the event. Example: mouse position.

  mouse.x = event.x;
  mouse.y = event.y;

  let rectangle = new Rectangle(mouse.x, mouse.y, Math.random() * 100, Math.random() * 200);
  rectangle.draw();

  console.log(mouse);
});

