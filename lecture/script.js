const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let ctx = canvas.getContext("2d");

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 3;
    this.vy = (Math.random() - 0.5) * 3;
    this.r = Math.random() * 5;
  }

  run() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) {
      this.vx *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.vy *= -1;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

let particles = new Array(200).fill(0).map(() => new Particle());

function animate() {
  requestAnimationFrame(animate);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#aaaaaa";

  particles.forEach((particle) => {
    particle.run();
    particle.draw();
  });
}

animate();
