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
    this.vx *= 0.999;
    this.vy *= 0.999;
    this.d = Math.sqrt((this.x - mouseX) ** 2 + (this.y - mouseY) ** 2);
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
    ctx.fillStyle = this.d > 50 ? "#aaaaaa" : "#cccccc";

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();

    if (this.d > 50) {
      return;
    }

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
  }

  lineTo(otherParticle) {
    ctx.strokeStyle = "#444";

    const d = Math.sqrt((this.x - otherParticle.x) ** 2 + (this.y - otherParticle.y) ** 2);
    if (d > 100) {
      return;
    }

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(otherParticle.x, otherParticle.y);
    ctx.stroke();

    const multiplier = d < 30 ? -1 : 1;

    const vector = {
      x: (otherParticle.x - this.x) * multiplier,
      y: (otherParticle.y - this.y) * multiplier,
    };
    let n = Math.sqrt(vector.x ** 2 + vector.y ** 2) * 70;
    vector.x /= n;
    vector.y /= n;
    this.vx += vector.x;
    this.vy += vector.y;
    otherParticle.vx -= vector.x;
    otherParticle.vy -= vector.y;
  }
}

let particles = new Array(200).fill(0).map(() => new Particle());

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener("click", (e) => {
  particles.forEach((p) => {
    if (p.d > 100) {
      return;
    }
    const vector = {
      x: p.x - mouseX,
      y: p.y - mouseY,
    };
    vector.x /= p.d;
    vector.y /= p.d;
    p.vx = vector.x * 7;
    p.vy = vector.y * 7;
  });
});

function animate() {
  requestAnimationFrame(animate);

  let img = ctx.createImageData(width, height);

  for (let i = 0; i < img.data.length; i += 4) {
    const x = (i / 4) % width | 0;
    const y = (i / 4 / width) | 0;
    const d = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
    const max = 100;
    const color = d > max ? 0 : (50 * Math.cos((Math.PI * d) / max)) | 0;
    img.data[i] = color;
    img.data[i + 1] = 0;
    img.data[i + 2] = color;
    img.data[i + 3] = 255;
  }

  ctx.putImageData(img, 0, 0);

  particles.forEach((particle) => {
    particle.run();
  });

  for (let i = 0; i < particles.length - 1; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      particles[i].lineTo(particles[j]);
    }
  }

  particles.forEach((particle) => {
    particle.draw();
  });
}

animate();
