let canvas = document.createElement('canvas');
document.body.appendChild(canvas);
let [w,h] = [window.innerWidth, window.innerHeight];
[canvas.width, canvas.height] = [w, h];
let ctx = canvas.getContext('2d');

class Triangle {
	constructor(a, b, c, start) {
		this.start = {x: start[0], y: start[1], z: start[2]};
  	this.a = {x: a[0], y: a[1], z: a[2]};
  	this.b = {x: b[0], y: b[1], z: b[2]};
  	this.c = {x: c[0], y: c[1], z: c[2]};


  	// this.a = {x: a[0] - start[0], y: a[1] - start[1], z: a[2] - start[2]};
  	// this.b = {x: -start[0]+b[0], y: -start[1]+b[1], z: -start[2]+b[2]};
  	// this.c = {x: -start[0]+c[0], y: -start[1]+c[1], z: -start[2]+c[2]};
	}
	draw() {
		ctx.beginPath();
		ctx.moveTo(this.start.x + this.a.x, this.start.y + this.a.y);
		ctx.lineTo(this.start.x + this.b.x, this.start.y + this.b.y);
		ctx.lineTo(this.start.x + this.c.x, this.start.y + this.c.y);
		ctx.closePath();
		ctx.stroke();
	}
	rotateX(t) {
		this.a = {x: this.a.x, y: Math.cos(t) * this.a.y - Math.sin(t) * this.a.z, z: Math.sin(t) * this.a.y + Math.cos(t) * this.a.z};
		this.b = {x: this.b.x, y: Math.cos(t) * this.b.y - Math.sin(t) * this.b.z, z: Math.sin(t) * this.b.y + Math.cos(t) * this.b.z};
		this.c = {x: this.c.x, y: Math.cos(t) * this.c.y - Math.sin(t) * this.c.z, z: Math.sin(t) * this.c.y + Math.cos(t) * this.c.z};
	}
	rotateY(t) {
		this.a = {x: Math.cos(t) * this.a.x + Math.sin(t) * this.a.z, y: this.a.y, z: -Math.sin(t) * this.a.x + Math.cos(t) * this.a.z};
		this.b = {x: Math.cos(t) * this.b.x + Math.sin(t) * this.b.z, y: this.b.y, z: -Math.sin(t) * this.b.x + Math.cos(t) * this.b.z};
		this.c = {x: Math.cos(t) * this.c.x + Math.sin(t) * this.c.z, y: this.c.y, z: -Math.sin(t) * this.c.x + Math.cos(t) * this.c.z};
	}
	rotateZ(t) {
		this.a = {x: Math.cos(t) * this.a.x - Math.sin(t) * this.a.y, y: Math.sin(t) * this.a.x + Math.cos(t) * this.a.y,z: this.a.z};
		this.b = {x: Math.cos(t) * this.b.x - Math.sin(t) * this.b.y, y: Math.sin(t) * this.b.x + Math.cos(t) * this.b.y,z: this.b.z};
		this.c = {x: Math.cos(t) * this.c.x - Math.sin(t) * this.c.y, y: Math.sin(t) * this.c.x + Math.cos(t) * this.c.y,z: this.c.z};
	}
}

class Sphere {
	constructor(x, y, r, detail = 10) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.vx = 0;
		this.vy = 0;
		this.vz = 0;
		this.ax = 0;
		this.ay = 0;
		this.az = 0;
		this.color = Math.floor(Math.random() * 360);

		detail -= 2;
		let items = [], n = 0;
		let mas = [], mas1 = [];

		for (let k = 0, j = 0; j < Math.PI * 2; j+=Math.PI/detail, k++) {
			mas[k] = [this.r * Math.cos(Math.PI/2 + Math.PI/detail) * Math.sin(j), this.r * Math.cos(Math.PI/2 + Math.PI/detail) * Math.cos(j), this.r * Math.sin(Math.PI/2 + Math.PI/detail)];
		}
		for (let k = 0 ; k < mas.length - 1; k++) {
			items[n] = new Triangle([this.r * Math.cos(Math.PI/2) * Math.sin(Math.PI/2), this.r * Math.cos(Math.PI/2) * Math.cos(Math.PI/2), this.r * Math.sin(Math.PI/2)], mas[k], mas[k+1],[this.x, this.y, 0]); n++;
		}
		items[n] = new Triangle([this.r * Math.cos(Math.PI/2) * Math.sin(Math.PI/2), this.r * Math.cos(Math.PI/2) * Math.cos(Math.PI/2), this.r * Math.sin(Math.PI/2)], mas[mas.length-1], mas[0],[this.x, this.y, 0]); n++;

		
		for (let k = 0, j = 0; j < Math.PI * 2; j+=Math.PI/detail, k++) {
			mas[k] = [this.r * Math.cos(Math.PI * 3/2 - Math.PI/detail) * Math.sin(j), this.r * Math.cos(Math.PI * 3/2 - Math.PI/detail) * Math.cos(j), this.r * Math.sin(Math.PI * 3/2 - Math.PI/detail)];
		}
		for (let k = 0 ; k < mas.length - 1; k++) {
			items[n] = new Triangle([this.r * Math.cos(Math.PI * 3/2) * Math.sin(Math.PI * 3/2), this.r * Math.cos(Math.PI * 3/2) * Math.cos(Math.PI * 3/2), this.r * Math.sin(Math.PI * 3/2)], mas[k], mas[k+1],[this.x, this.y, 0]); n++;
		}
		items[n] = new Triangle([this.r * Math.cos(Math.PI * 3/2) * Math.sin(Math.PI * 3/2), this.r * Math.cos(Math.PI * 3/2) * Math.cos(Math.PI * 3/2), this.r * Math.sin(Math.PI * 3/2)], mas[mas.length-1], mas[0],[this.x, this.y, 0]); n++;



		for (let i = Math.PI/2 + Math.PI /detail; i <= Math.PI*3/2 - Math.PI*2/detail; i+=Math.PI /detail) {
			for (let k = 0, j = 0; j < Math.PI * 2; j+=Math.PI/detail, k++) {
				mas[k] = [this.r * Math.cos(i + Math.PI/detail) * Math.sin(j), this.r * Math.cos(i + Math.PI/detail) * Math.cos(j), this.r * Math.sin(i + Math.PI/detail)];
			}

			for (let k = 0, j = 0; j < Math.PI * 2; j+=Math.PI/detail, k++) {
				mas1[k] = [this.r * Math.cos(i) * Math.sin(j), this.r * Math.cos(i) * Math.cos(j), this.r * Math.sin(i)];
			}
			
			for (let k = 0; k < mas.length - 1; k++) {
				items[n] = new Triangle(mas[k], mas[k+1], mas1[k], [this.x, this.y, 0]);
				n++;
				items[n] = new Triangle(mas[k+1], mas1[k], mas1[k+1], [this.x, this.y, 0]);
				n++;
			}
			items[n] = new Triangle(mas[mas.length - 1], mas[0], mas1[mas.length - 1],[this.x, this.y, 0]); n++;
			items[n] = new Triangle(mas[0], mas1[0], mas1[mas.length - 1],[this.x, this.y, 0]); n++;
		}
		// // console.log(mase);
		
		this.items = items;
	}
	draw() {
		ctx.strokeStyle = 'hsla(' + this.color + ',90%,50%, 0.4)';
		for (let i = 0; i < this.items.length; i++){
			this.items[i].draw();
		}
	}
	rotateX(t) {
		for (let i = 0; i < this.items.length; i++) {
			this.items[i].rotateX(t);
		}
	}
	rotateY(t) {
		for (let i = 0; i < this.items.length; i++) {
			this.items[i].rotateY(t);
		}
	}
	rotateZ(t) {
		for (let i = 0; i < this.items.length; i++) {
			this.items[i].rotateZ(t);
		}
	}
	seta(x, y, z) {
		this.ax = x;
		this.ay = y;
		this.az = z;
	}
	update() {

		this.vx += this.ax;
		this.vy += this.ay;
		this.vz += this.az;

		this.x += this.vx;
		this.y += this.vy;
		this.z += this.vz;
		let it = this.items;
		for (let i = 0; i < it.length; i++) {
			it[i].start.x = this.x;
			it[i].start.y = this.y;
			it[i].start.z = this.z;
		}
		if (this.y + this.r > h && this.vy > 0) {
			this.vy *= -0.9;
		}
	}
}


let s = [], g = 0.15, n = 5;
for (let i = 0; i < n; i++) {
	s.push(new Sphere(150 + i * (w - 150)/n, 150 + i * (h/3)/n, 100, 10));
	s[i].seta(0, g, 0);
}
let anim = () => {
	requestAnimationFrame(anim);
	ctx.clearRect(0, 0, w, h);
	for (let i = 0; i < s.length; i++) {
		s[i].rotateZ(0.005);
		s[i].rotateY(0.005);
		s[i].update();
		s[i].draw();
	}

}
anim();


// for (let i = Math.PI / 2; i <= Math.PI / 2 + Math.PI * 2 ; i += 0.1) {
// 	for (let j = 0; j <= Math.PI * 2; j += Math.PI / 5) {
// 		ctx.fillRect( w/2 + 100 * Math.cos(i) * Math.sin(j), h/2 + 100 * Math.cos(i) * Math.cos(j), 2, 2);
// 	}
// }


// class Figure {
// 	constructor(items) {
// 		this.items = items;
// 	}
// 	draw() {
// 		for (let i = 0; i < this.items.length; i++) {
// 			this.items[i].draw();
// 		}
// 	}
// 	rotateX(t) {
// 		for (let i = 0; i < this.items.length; i++) {
// 			this.items[i].rotateX(t);
// 		}
// 	}
// 	translateY(y) {
// 		for (let i = 0; i < this.items.length; i++) {
// 			this.items[i].translateY(y);
// 		}
// 	}
// }

// let angle = Math.PI * 0.3;

// let a = new Triangle([100, 100, 100], [200, 100, 100], [150, 150, 150], [100, 100, 100]);
// let b = new Triangle([100, 100, 100], [100, 200, 100], [150, 150, 150], [100, 100, 100]);
// let c = new Triangle([200, 200, 100], [200, 100, 100], [150, 150, 150], [100, 100, 100]);
// let d = new Triangle([200, 200, 100], [100, 200, 100], [150, 150, 150], [100, 100, 100]);
//let f = new Figure([a, b, c, d]);

// let anim = () => {
// 	requestAnimationFrame(anim);
// 	ctx.clearRect(0, 0, w, h);
// 	f.rotateX(Math.PI/50);
// 	f.translateY(1);
// 	f.draw();
// }
// anim();