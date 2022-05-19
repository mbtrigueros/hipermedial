// Canvas Reference: https://www.w3schools.com/graphics/canvas_reference.asp

//Resizing the canvas according to the viewport
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Context
let context = canvas.getContext("2d");

//Rectangle

// Reference Fill Rect: https://www.w3schools.com/tags/canvas_fillrect.asp
//Reference Fill Style: https://www.w3schools.com/tags/canvas_fillstyle.asp

// context.fillRect(100, 100, 100, 100);

//Line

//Reference Begin Path: https://www.w3schools.com/tags/canvas_beginpath.asp
//Reference Move To: https://www.w3schools.com/tags/canvas_moveto.asp
//Reference Line To: https://www.w3schools.com/tags/canvas_lineto.asp
//Reference Stroke: https://www.w3schools.com/tags/canvas_stroke.asp
//Reference Stroke Style: https://www.w3schools.com/tags/canvas_strokestyle.asp
//Reference Close Path: https://www.w3schools.com/tags/canvas_closepath.asp

// context.beginPath();
// context.moveTo(50, 300);
// context.lineTo(300, 100);
// context.lineTo(200, 400);
// context.closePath();
// context.stroke();

//Arc || Circle

// Reference Arc: https://www.w3schools.com/tags/canvas_arc.asp

//X & Y variables. dx = X Velocity dY = Y Velocity

//Circle Class
class Circle {
  constructor(x, y, radius, dx, dy, r, g, b, a) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  draw() {
    //Making circles
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    context.stroke();
    context.strokeStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  move() {
    //X + X Velocity (direction)
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    //Y + Y Velocity (direction)
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.y += this.dy;
  }
}

let circles = [];

for (let i = 0; i < 50; i++) {
  let radius = Math.random() * 100;
  let x = Math.random() * innerWidth - radius;
  let y = Math.random() * innerHeight - radius;
  let dx = (Math.random() - 0.5) * 12;
  let dy = (Math.random() - 0.5) * 12;
  let r = Math.random() * 255;
  let g = Math.random() * 255;
  let b = Math.random() * 255;
  let a = Math.random() * 0.1;
  circles.push(new Circle(x, y, radius, dx, dy, r, g, b, a));
}

//Animation Loop
function animate() {
  //With this function you make the loop
  requestAnimationFrame(animate);
  //context.clearRect(0, 0, innerWidth, innerHeight);
  //Making circles
  circles.map((circle) => {
    circle.draw();
    circle.move();
  });
}

//Call function
animate();
