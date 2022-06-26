// SPRITE CLASS

class Sprite {
  constructor({ position, img, frames = { max: 1 }, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.img = img;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.img.onload = () => {
      this.width = this.img.width / this.frames.max;
      this.height = this.img.height;
    };
    this.moving = false;
  }

  draw() {
    context.drawImage(
      this.img,
      this.frames.val * this.img.width,
      0,
      this.img.width / this.frames.max,
      this.img.height,
      this.position.x,
      this.position.y,
      this.img.width / this.frames.max,
      this.img.height
    );

    if (this.frames.max > 1) this.frames.elapsed++;

    if (this.frames.elapsed % 12 === 0) {
      if (this.frames.val > this.frames.max - 1) this.frames.val++;
      else this.frames.val = 0;
    }
  }

  move() {
    if (this.position.x > 100 || this.position.x < 10) {
      this.velocity.x = -this.velocity.x;
    }
    this.position.x += this.velocity.x;
  }
}
