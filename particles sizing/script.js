'use strict'
window.onload = function() {

	let canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let ctx = canvas.getContext('2d'),
			h = canvas.height,
	 		w = canvas.width;
	
	let r = 50, cx, cy;

	class Particle {
		constructor() {
			let t = Math.random() * Math.PI * 2 - Math.PI, v = Math.random() * 1.5;
			this.x = Math.random() * w;
			this.y = Math.random() * h;
			this.vx = v * Math.cos(t);
			this.vy = v * Math.sin(t) - v/2;
			this.r = Math.random() * 3 + 1;
			this.R = this.r;
			this.color = 'hsl(' + Math.floor(Math.random() * 360) + ', 100%, 50%)';
		}
		draw() {
			this.x += this.vx;
			this.y += this.vy;
			if ((this.x - cx) * (this.x - cx) + (this.y - cy) * (this.y - cy) < 10000 && this.R < r) {
				this.R++;
			} else if (this.R > this.r) this.R--;
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.R, 0, Math.PI * 2);
			ctx.fill();

			if (this.x + this.r <= 0) this.vx *= -1;
			if (this.x - this.r >= w) this.vx *= -1;
			if (this.y + this.r <= 0) this.vy *= -1;
			if (this.y - this.r >= h) this.vy *= -1;
		}
	}

	let p = [];

	for (let i = 0; i < 500; i++) {
		p[i] = new Particle();
	}

	let animate = () => {
		requestAnimationFrame(animate);
		ctx.globalCompositeOperation = 'source-over';
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, w, h);
		ctx.globalCompositeOperation = 'lighter';
		for (let i = 0; i < p.length; i++) {
			p[i].draw();
		}
	}

	animate();
	canvas.addEventListener('mousemove', e => {
		cx = e.clientX;
		cy = e.clientY;
	});
}