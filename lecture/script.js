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
    const d = Math.sqrt((this.x - mouseX) ** 2 + (this.y - mouseY) ** 2);

    ctx.fillStyle = d > 50 ? "#aaaaaa" : "#cccccc";

    ctx.beginPath();
    ctx.arc(this.x, this.y, d > 50 ? this.r : this.r * 5, 0, Math.PI * 2);
    ctx.fill();
  }
}

let particles = new Array(200).fill(0).map(() => new Particle());

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  requestAnimationFrame(animate);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  particles.forEach((particle) => {
    particle.run();
    particle.draw();
  });
}

animate();
