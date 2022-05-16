let circulos = []

function setup() {
  let canvas = createCanvas(800, 600)
  canvas.parent("p5contenedor")
  // createCanvas(windowWidth, windowHeight)

  for (let i = 0; i < 30; i++) {
    circulos[i] = {
      x: random(0, width),
      y: random(0, height),
      diametro: 80,
      vy: 2,
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255)
    }
  }

  background(200, 50, 150)
}

function draw() {
  background(200, 50, 150, 20)

  for (let i = 0; i < circulos.length; i++) {
    stroke(circulos[i].r, circulos[i].g, circulos[i].b)
    noFill()
    strokeWeight(1)
    circle(circulos[i].x, circulos[i].y, circulos[i].diametro)

    circulos[i].y += circulos[i].vy
    circulos[i].x += 5 // 5 es la velocidad
    // diametro = sin(radians(x)) * 80
    circulos[i].diametro += 2

    if (circulos[i].x > width) {
      circulos[i].x = 0
    }

    if (circulos[i].y > height) {
      circulos[i].vy = -circulos[i].vy
    }

    if (circulos[i].y < 0) {
      circulos[i].vy = -circulos[i].vy
    }

    if (circulos[i].diametro > 150) {
      circulos[i].diametro = 0
    }
  }

  fill(255, 0, 0)
  rect(200, 300, 200, 80)

  fill(0, 255, 0)
  // noFill()
  stroke(0, 0, 255)
  strokeWeight(15)
  rect(500, 100, 200, 200)
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight)
// }