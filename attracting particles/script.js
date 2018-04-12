'use strict'
window.onload = function() {

	let canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let ctx = canvas.getContext('2d'),
			h = canvas.height,
	 		w = canvas.width;

	let cx = w/2, cy=h/2;
	class Point {
		constructor(x, y) {
			this.x = x;
			this.y = y;
			this.vx = 0;
			this.vy = 0;
			this.ax = 0;
			this.ay = 0;
			this.r = 2;
		}
		run() {
			let dx = cx - this.x;
			let dy = cy - this.y;
			
			if (Math.sqrt(dx*dx+dy*dy) < 40) {
				if (dx==0 && dy==0) {
					this.ax = 0;
					this.ay = 0;
				} else {
					// this.ax = -(dx / Math.sqrt(dx*dx+dy*dy)) *10;
					// this.ay = -(dy / Math.sqrt(dx*dx+dy*dy)) *10;
					this.vx = 0;
					this.vy = 0;
					this.ax = 0;
					this.ay = 0;
				}
			} else {
				if (dx==0 && dy==0) {
					this.ax = 0;
					this.ay = 0;
				} else {
					this.ax = (dx / Math.sqrt(dx*dx+dy*dy)) / 5;
					this.ay = (dy / Math.sqrt(dx*dx+dy*dy)) / 5;
				}
			}
			this.vx += this.ax;
			this.vy += this.ay;
			this.x += this.vx;
			this.y += this.vy;
		}
		draw() {
			ctx.beginPath();
			ctx.fillStyle = '#13b8d0';
			ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	let p = [];
	for (let i = 0; i < h; i+=50) {
		for (let j = 0; j < w; j+=50) {
			p.push(new Point(j, i));
		}
	}
	let anim = () => {
		requestAnimationFrame(anim);
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, w, h);
		for (let i = 0; i < p.length; i++) {
			p[i].run();
			p[i].draw();
		}
		// setTimeout(anim, 200);
	}
	anim();
	canvas.addEventListener('mousemove', function(e) {
		cx = e.clientX;
		cy = e.clientY;
	});
}