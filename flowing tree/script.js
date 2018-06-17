let canvas = document.createElement('canvas'),
		[w, h] = [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight],
		ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.ox = x;
		this.oy = x;
		this.fx = 0;
		this.fy = 0;
		this.vx = 0;
		this.vy = 0;
		this.maxrad = 0;
	}
	flow() {
		let r = Math.sqrt((cx - this.x) ** 2 + (cy - this.y) ** 2);
		if (r < 100 && !this.maxrad) {
			this.fx = (this.x - cx) / r;
			this.fy = (this.y - cy) / r;
			this.vx += this.fx;
			this.vy += this.fy;
			this.x += this.vx;
			this.y += this.vy;
		} else {
			let r = Math.sqrt((this.ox - this.x) ** 2 + (this.oy - this.y) ** 2);
			this.fx = (this.ox - this.x) / r;
			this.fy = (this.oy - this.y) / r;
			this.vx += this.fx;
			this.vy += this.fy;
			this.x += this.vx;
			this.y += this.vy;
		}

	}
}

class Triangle {
	constructor(a, b, c) {
		this.a = new Point(a[0], a[1]);
		this.b = new Point(b[0], b[1]);
		this.c = new Point(c[0], c[1]);
		this.color = 'hsla(' + (100*Math.random() + 50) + ', 50%, 50%, 0.8)';
	}
	draw() {
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(this.a.x, this.a.y);
		ctx.lineTo(this.b.x, this.b.y);
		ctx.lineTo(this.c.x, this.c.y);
		ctx.fill();
		ctx.restore();
	}
	flow() {
		this.a.flow();
		this.b.flow();
		this.c.flow();
	}
}

let cx, cy;
let p = [];
let s = 15;
for (let i = 0; i < 10; i++) {
	for (let j = 0; j < 10; j++) {
		p.push(new Triangle([i * s, j * s], [i * s + s, j * s], [i * s + s, j * s + s]));
		p.push(new Triangle([i * s, j * s], [i * s + s, j * s + s], [i * s, j * s + s]));
	}
}

let anim = () => {
	requestAnimationFrame(anim);
	ctx.clearRect(0, 0, w, h);
	p.forEach(e => {
		e.flow();
		e.draw();
	});
}
anim();

document.addEventListener('mousemove', (e) => {
	cx = e.clientX;
	cy = e.clientY;
});