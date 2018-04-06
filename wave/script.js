'use strict'
window.onload = function() {

	var canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext('2d'),
			h = canvas.height,
	 		w = canvas.width;
	var step = 20, startx = 200, starty = 50, colors = ['#08bc04', '#0f8b09', '#0a4d05'];
	var blockheight = step * 8, skew = 1.6, perspSkew = 0.6;
	var cx = w/2, cy = h/2;
	class SquareItem {
		constructor(x, y, ctx) {
			[this.x, this.y, this.ctx] = [x, y, ctx];
			this.diffy = 0;
			this.realx = startx + this.y * step * perspSkew +  this.x * step*skew;
			this.realy = starty + this.diffy + this.y * step*1.2;
			// this.phase = Math.random() * 3;
			this.phase = Math.sqrt((this.realx - cx) * (this.realx - cx) + (this.realy - cy) * (this.realy - cy)) / -40;
			// console.log(this.y, this.x, this.phase);
		}
		draw() {
			this.ctx.fillStyle = colors[0];
			this.ctx.beginPath();
			this.ctx.moveTo(startx + this.y * step * perspSkew +  this.x * step*skew, starty + this.diffy + this.y * step*1.2);
			this.ctx.lineTo(startx + this.y * step * perspSkew + this.x * step*skew + step, starty + this.diffy + this.y * step*1.2);
			this.ctx.lineTo(startx + this.y * step * perspSkew + this.x * step*skew + step * 1.4, starty + this.diffy + this.y * step*1.2 + step * 0.8);
			this.ctx.lineTo(startx + this.y * step * perspSkew + this.x * step*skew + step * 0.4, starty + this.diffy + this.y * step*1.2 + step * 0.8);
			this.ctx.fill();


			this.ctx.fillStyle = colors[1];
			this.ctx.beginPath();
			this.ctx.moveTo(startx + this.y * step * perspSkew + this.x * step * skew, starty + this.diffy + this.y * step*1.2);
			this.ctx.lineTo(startx + this.y * step * perspSkew + this.x * step * skew, starty + this.diffy + this.y * step*1.2 + blockheight);
			this.ctx.lineTo(startx + this.y * step * perspSkew + this.x * step * skew + step * 0.4, starty + this.diffy + this.y * step*1.2 + blockheight + step * 0.8);
			this.ctx.lineTo(startx + this.y * step * perspSkew + this.x * step * skew + step * 0.4, starty + this.diffy + this.y * step*1.2 + step * 0.8);
			this.ctx.fill();


			this.ctx.fillStyle = colors[2];
			this.ctx.beginPath();
			this.ctx.moveTo(startx + this.y * step * perspSkew + this.x * step * skew + step * 0.4, starty + this.diffy + this.y * step*1.2 + step * 0.8);
			this.ctx.lineTo(startx + this.y * step * perspSkew + this.x * step * skew + step * 1.4, starty + this.diffy + this.y * step*1.2 + step * 0.8);
			this.ctx.lineTo(startx + this.y * step * perspSkew + this.x * step * skew + step * 1.4, starty + this.diffy + this.y * step*1.2 + blockheight + step * 0.8);
			this.ctx.lineTo(startx + this.y * step * perspSkew + this.x * step * skew + step * 0.4, starty + this.diffy + this.y * step*1.2 + blockheight + step * 0.8);
			this.ctx.fill();
			this.diffy = 30 * Math.sin(this.phase);
			this.phase += 0.1;
		}
	}
	var points = [];
	for (let i = 0; i < 20; i++) {
		points.push([]);
		for (let j = 0; j < 20; j++) {
			points[i].push(new SquareItem(j, i, ctx));
		}
	}
	function animate() {
		requestAnimationFrame(animate);
		ctx.clearRect(0, 0, w, h);
		for (let i = 0; i < 20; i++) {
			for (let j = 0; j < 20; j++) {
				points[i][j].draw();
			}
		}
	}
	animate();
	canvas.addEventListener('click', function(e) {
		for (let i = 0; i < 20; i++) {
			for (let j = 0; j < 20; j++) {
				points[i][j].phase = Math.sqrt((points[i][j].realx - e.clientX) * (points[i][j].realx - e.clientX) + (points[i][j].realy - e.clientY) * (points[i][j].realy - e.clientY)) / -40;
			}
		}
	});
}