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

//X & Y variables. dx = X Velocity
let x = 100;
let dx = 10;
let radius = 50;
//let y = 100;

//Try randomizing the rgba values
let r = Math.random() * 255;
let g = Math.random() * 255;
let b = Math.random() * 255;
let a = Math.random();

//Animation Loop
function animate(){
    //With this function you make the loop
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);

    //Making circles
    context.beginPath();
    context.arc(x, 100, radius, 0, Math.PI * 2, true);
    context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    context.stroke();

    //X + X Velocity (direction)
    if ( (x + radius >= innerWidth) || (x - radius <= 0)){
        dx = -dx;
    } 

    x += dx;
}

//Call function
animate();
