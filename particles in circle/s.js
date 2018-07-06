let canvas = document.createElement('canvas');
document.body.appendChild(canvas);
let ctx = canvas.getContext('2d');
let [w, h] = [window.innerWidth, window.innerHeight];
[canvas.height, canvas.width] = [h, w];

let R = 300;

ctx.translate(w/2, h/2);

let scalar = (a, b) => {
	return a.x * b.x + a.y * b.y;
}

class Ball {
	constructor() {
		let r = Math.random() * (R - 10), a = Math.random() * 2 * Math.PI;
		this.x = r * Math.cos(a);
		this.y = r * Math.sin(a);
		this.vx = 0;
		this.vy = 0;
		this.gx = (Math.random() - 0.5) / 2;
		this.gy = (Math.random() - 0.5) / 2;
		this.r = Math.random() * 5 + 1;
		this.sec = 0;
	}
	fall() {
		this.y += this.vy;
		this.x += this.vx;
		this.vx += this.gx;
		this.vy += this.gy;

		if (Math.sqrt(this.x ** 2 + this.y ** 2) > R && !this.sec) {
			// this.vx *= -0.9;
			// this.vy *= -0.9;
			let n = {
				x: this.x / Math.sqrt(this.x ** 2 + this.y ** 2),
				y: this.y / Math.sqrt(this.x ** 2 + this.y ** 2),
			};
			let alpha = scalar({x: this.vx, y: this.vy}, n) / scalar(n, n);
			[this.vx, this.vy] = [this.vx - 2 * n.x * alpha, this.vy - 2 * n.y * alpha];
			[this.vx, this.vy] = [this.vx * 0.9, this.vy * 0.9];
			this.sec = 2;
		} else {
			this.sec > 0 ? this.sec-- : 0;
		}
		this.draw();
	}
	draw() {
		ctx.fillStyle = '#6f1997';
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fill();
	}
}

let b = [];
for (let i = 0; i < 100; i++) {
	b.push(new Ball());
}

let anim = () => {
	requestAnimationFrame(anim);
	ctx.clearRect(-w/2, -h/2, w, h);
	b.forEach(e => {
			e.fall();
	});
	// setTimeout(anim, 100);
}

anim();