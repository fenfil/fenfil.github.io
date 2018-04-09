	'use strict'

let canvas = document.getElementsByTagName('canvas')[0];
[canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];
let [w,h]=[canvas.width, canvas.height];

class Clock {
	constructor(canvas) {
		let date = new Date();

		this.ctx = canvas.getContext('2d'),
		this.r = Math.min(w, h) * 0.3;
		this.h = date.getHours() % 12 + date.getMinutes() / 60;
		this.m = date.getMinutes() + date.getSeconds() / 60;
		this.s = date.getSeconds() + date.getMilliseconds() / 1000;
	}
	update() {
		let date = new Date();
		this.h = date.getHours() % 12 + date.getMinutes() / 100;
		this.m = date.getMinutes() + date.getSeconds() / 100;
		this.s = date.getSeconds() + date.getMilliseconds() / 1000;
	}
	draw() {
		let gs = this.ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, this.r * 0.8);
		gs.addColorStop(0, 'black');
		gs.addColorStop(1, 'rgba(33, 240, 189, 0.8)');


		let gm = this.ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, this.r * 0.6);
		gm.addColorStop(0, 'black');
		gm.addColorStop(1, 'rgba(32, 224, 127, 0.8)');


		let gh = this.ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, this.r * 0.4);
		gh.addColorStop(0, 'black');
		gh.addColorStop(1, 'rgba(195, 83, 81, 0.8)');

		this.ctx.lineCap = 'round';
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0, 0, w, h);

		this.ctx.lineWidth = 4;
		this.ctx.strokeStyle =gs;
		this.ctx.beginPath();
		this.ctx.moveTo(w/2, h/2);
		this.ctx.lineTo(w/2 + 0.8 * this.r * Math.cos(this.s/60 * Math.PI * 2 - Math.PI / 2), h/2 + 0.8 * this.r * Math.sin(this.s/60 * Math.PI * 2 - Math.PI / 2));
		this.ctx.stroke();

		this.ctx.lineWidth = 7;
		this.ctx.beginPath();
		this.ctx.arc(w/2, h/2, this.r, - Math.PI / 2, this.s/60 * Math.PI * 2 - Math.PI / 2);
		this.ctx.stroke();



		this.ctx.lineWidth = 4;
		this.ctx.strokeStyle = gm;
		this.ctx.beginPath();
		this.ctx.moveTo(w/2, h/2);
		this.ctx.lineTo(w/2 + 0.6 * this.r * Math.cos(this.m/60 * Math.PI * 2 - Math.PI / 2), h/2 + 0.6 * this.r * Math.sin(this.m/60 * Math.PI * 2 - Math.PI / 2));
		this.ctx.stroke();

		this.ctx.lineWidth = 7;
		this.ctx.beginPath();
		this.ctx.arc(w/2, h/2, this.r - 8, - Math.PI / 2, this.m/60 * Math.PI * 2 - Math.PI / 2);
		this.ctx.stroke();



		this.ctx.lineWidth = 6;
		this.ctx.strokeStyle = gh;
		this.ctx.beginPath();
		this.ctx.moveTo(w/2, h/2);
		this.ctx.lineTo(w/2 + 0.4 * this.r * Math.cos(this.h/12 * Math.PI * 2 - Math.PI / 2), h/2 + 0.4 * this.r * Math.sin(this.h/12 * Math.PI * 2 - Math.PI / 2));
		this.ctx.stroke();



		this.ctx.lineWidth = 7;
		this.ctx.beginPath();
		this.ctx.arc(w/2, h/2, this.r - 16, - Math.PI / 2, this.h/12 * Math.PI * 2 - Math.PI / 2);
		this.ctx.stroke();


		this.update();
	}
}

let clock = new Clock(canvas);

let animate = () => {
	clock.draw();
	setTimeout(animate, 20);
}




animate();