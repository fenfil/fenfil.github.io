'use strict'
window.onload = function() {

	let canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let ctx = canvas.getContext('2d'),
			h = canvas.height,
	 		w = canvas.width;
	class Point {
		constructor(x, y) {
			this.x = x;
			this.y = y;
			this.R = 10 + Math.random()*50;
			this.t = 0;
			this.r = 0;
		}
		run() {
			this.t += Math.PI / 100;
			this.r = Math.abs(this.R * Math.sin(this.t));
			this.x += Math.random() * 2 - 1;
		}
		draw() {
			ctx.beginPath();
			ctx.fillStyle = '#13b8d0';
			ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	let p = [];
	let anim = () => {
		requestAnimationFrame(anim);
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, w, h);
		if (Math.random() > 0.98) {
			p.push(new Point(Math.random()*w/2+w/4, Math.random()*h/2+h/4));
		}
		for (let i = 0; i < p.length; i++) {
			p[i].run();
			p[i].draw();
		}
	}
	anim();
}