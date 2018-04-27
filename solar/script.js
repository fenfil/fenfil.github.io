let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let [w, h] = [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];

class Hole {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    draw() {
        let bg = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        bg.addColorStop(0, 'black');
        bg.addColorStop(0.7, 'black');
        bg.addColorStop(0.85, 'rgba(255, 255, 255, 0.3)');
        bg.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Sun extends Hole {
    draw() {
        let bg = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        bg.addColorStop(0, 'white');
        bg.addColorStop(0.3, 'white');
        bg.addColorStop(0.85, 'yellow');
        bg.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Particle {
    constructor() {
        this.pos = [Math.random()*w, Math.random()*h];
        this.v = [0, 0];
        this.a = [0, 0];
        this.r = Math.random()*4 + 4;
        this.color = 'hsl(' + Math.floor(Math.random()*360) + ', 50%, 50%)';
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.r, 0, Math.PI*2);
        ctx.fill();
    }
    attract(holes) {
        this.a = [0, 0];
        for (let i = 0; i < holes.length; i++) {
            let r2 =  (this.pos[0] - holes[i].x)*(this.pos[0] - holes[i].x) + (this.pos[1] - holes[i].y)*(this.pos[1] - holes[i].y);
            let r =  Math.sqrt(r2);
            if (r > holes[i].r) {
                let f = 50 * this.r * holes[i].r / r2;
                let a = f / this.r;
                this.a[0] += a * (holes[i].x-this.pos[0]) / r;
                this.a[1] += a * (holes[i].y-this.pos[1]) / r;
            }
        }
    }
    run() {
        this.v[0] += this.a[0];
        this.v[1] += this.a[1];

        if ((this.pos[1] + this.r >= h && this.v[1] > 0) || (this.pos[1] - this.r <= 0 && this.v[1] < 0)) {
            this.v[1] *= -0.9;
        }
        
        if ((this.pos[0] + this.r >= w && this.v[0] > 0) || (this.pos[0] - this.r <= 0 && this.v[0] < 0)) {
            this.v[0] *= -0.9;
        }

        this.pos[0] += this.v[0];
        this.pos[1] += this.v[1];
    }
}


let particles = [];
let holes = [];
for (let i = 0; i < 20; i++) {
    particles.push(new Particle());
}


holes.push(new Sun(w/2, h/2, 50));

// holes.push(new Hole(w/2, h/2, 10));

// canvas.addEventListener('click', e => {
//     holes.push(new Hole(e.clientX, e.clientY, 20));
// });

// canvas.addEventListener('mousemove', e => {
//     holes[0].x = e.clientX;
//     holes[0].y = e.clientY;
// });


let anim = () => {
    requestAnimationFrame(anim);
    // setTimeout(anim, 400);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);
    // ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
        particles[i].attract(holes);
        particles[i].run();
        particles[i].draw();
    }
    for (let i = 0; i < holes.length; i++) {
        holes[i].draw();
    }
}

anim();