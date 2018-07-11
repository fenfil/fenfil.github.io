let [w, h] = [window.innerWidth, window.innerHeight];
let canvas = document.querySelector('canvas'),
		ctx = canvas.getContext('2d');
canvas.width = w;
canvas.height = h;

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.r = 5;
		
		this.v = 0;
		this.cos = 0;
		this.sin = 0;
	}
	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fill();
	}
	setcscy(cx, cy) {
		this.v = 10;
		let r = Math.sqrt((this.x - cx) ** 2 + (this.y - cy) ** 2);
		this.cos = (this.x - cx) / r;
		this.sin = (this.y - cy) / r;
	}
	flow() {
		if (this.v === 0) {
			return;
		}
		this.x += this.v * this.cos;
		this.y += this.v * this.sin;
		this.v *= 0.8;
		if (this.v < 0.05) {
			this.v = 0;
		}
	}
}

let p = [];

for (let i = 10; i < h; i += 50) {
	for (let j = 10; j < w; j += 50) {
		p.push(new Point(j, i));
	}
}

ctx.fillStyle = '#4CCEF9';

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, w, h);
	p.forEach(e => {
		e.flow();
		e.draw();
	});
	// setTimeout(animate, 300);
}

animate();

document.addEventListener('click', e => {
	let x = e.clientX,
			y = e.clientY;
	p.forEach(e => {
		let r = Math.sqrt((e.x - x) ** 2 + (e.y - y) ** 2);
		setTimeout(function() {e.setcscy(x, y)}, r)
	});
});