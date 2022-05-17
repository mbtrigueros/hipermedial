// Canvas Reference: https://www.w3schools.com/graphics/canvas_reference.asp

//Resizing the canvas according to the viewport
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Context
let context = canvas.getContext('2d');

//Rectangle 

// Reference Fill Rect: https://www.w3schools.com/tags/canvas_fillrect.asp
//Reference Fill Style: https://www.w3schools.com/tags/canvas_fillstyle.asp

context.fillRect(100, 100, 100, 100); 

//Line

//Reference Begin Path: https://www.w3schools.com/tags/canvas_beginpath.asp
//Reference Move To: https://www.w3schools.com/tags/canvas_moveto.asp
//Reference Line To: https://www.w3schools.com/tags/canvas_lineto.asp
//Reference Stroke: https://www.w3schools.com/tags/canvas_stroke.asp
//Reference Stroke Style: https://www.w3schools.com/tags/canvas_strokestyle.asp
//Reference Close Path: https://www.w3schools.com/tags/canvas_closepath.asp

context.beginPath();
context.moveTo(50, 300);
context.lineTo(300, 100);
context.lineTo(200, 400);
context.closePath();
context.stroke();

//Arc || Circle

// Reference Arc: https://www.w3schools.com/tags/canvas_arc.asp

//X & Y variables. dx = X Velocity dY = Y Velocity
let x = Math.random() * innerWidth;
let dx = 10;
let radius = 50;
let y = Math.random() * innerHeight;
let dy = 10;

//Try randomizing the rgba values
let r = Math.random() * 255;
let g = Math.random() * 255;
let b = Math.random() * 255;
let a = Math.random();

//Circle Class
class Circle {
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
    }

    draw(){
    //Making circles
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, true);
    context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    context.stroke();
    }
}


//Animation Loop
function animate(){
    //With this function you make the loop
    requestAnimationFrame(animate);
    //context.clearRect(0, 0, innerWidth, innerHeight);

    //Making circles
    let circle = new Circle(100, 200, Math.random() * 100);
    circle.draw();
    //X + X Velocity (direction)
    if ( (x + radius >= innerWidth) || (x - radius <= 0)){
        dx = -dx;
    } 
    //Y + X Velocity (direction)
    if ( (y + radius >= innerHeight) || (y - radius <= 0)){
        dy = -dy;
    } 

    y += dy;
    x += dx;
}

//Call function
animate();