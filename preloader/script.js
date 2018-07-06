let canvas = document.querySelector('canvas'),
		ctx = canvas.getContext('2d'),
		[w, h] = [canvas.width,  canvas.height];

ctx.translate(w/2, h/2);
ctx.rotate(-Math.PI / 2);
ctx.lineWidth = 2;

class P {
	constructor(a) {
		this.a = a;
	}
	addA() {
		this.a += 0.02 * (-3 * this.a * this.a / Math.PI / Math.PI + 6 / Math.PI * this.a + 0.1);
		this.a %= Math.PI * 2;
	}
	draw() {
		ctx.beginPath();
		ctx.arc(r * Math.cos(this.a), r * Math.sin(this.a), R, 0, Math.PI * 2);
		ctx.fill();
	}
}

let r = w * 0.45 - 2, R = 2, p = [];

p.push(new P(0));
p.push(new P(Math.PI / 2));
p.push(new P(Math.PI));
p.push(new P(Math.PI * 1.5));

let draw = () => {
	requestAnimationFrame(draw);

	ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
	ctx.fillRect(-w/2, -h/2, w, h);

	ctx.fillStyle = '#800D18';
	p.forEach(e => {
		e.addA();
		e.draw();
	});
}

draw();