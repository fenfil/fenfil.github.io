let canvas = document.querySelector('canvas'),
		[w, h] = [window.innerWidth, window.innerHeight],
		ctx = canvas.getContext('2d');

canvas.width = w;
canvas.height = h;

ctx.translate(w/2, h/2);

class Point {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
}

class Triangle {
	constructor(a, b, c) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.color = 'rgba(0, 0, 0, 0.3)';
		this.drawable = true;
	}
	draw() {
		if (this.drawable) {
			ctx.fillStyle = this.color;
			ctx.strokeStyle = this.color;
			ctx.beginPath();
			ctx.moveTo(this.a.x, this.a.y);
			ctx.lineTo(this.b.x, this.b.y);
			ctx.lineTo(this.c.x, this.c.y);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		}
	}
	highlight() {
		let sun = [1, 1, -1];
		let vectora = [this.b.x - this.a.x, this.b.y - this.a.y, this.b.z - this.a.z];
		let vectorb = [this.c.x - this.a.x, this.c.y - this.a.y, this.c.z - this.a.z];
		let vectorz = [vectora[1] * vectorb[2] - vectora[2] * vectorb[1],
									vectora[2] * vectorb[0] - vectorb[2] * vectora[0],
									vectora[0] * vectorb[1] - vectorb[0] * vectora[1]];
		let norma = Math.sqrt(vectorz[0] ** 2 + vectorz[1] ** 2 + vectorz[2] ** 2);
	  let n = [5 * vectorz[0] / norma, 5 * vectorz[1] / norma, 5 * vectorz[2] / norma];
	  let point = [this.a.x + n[0], this.a.y + n[1], this.a.z + n[2]];
	  let p2 = point[0] ** 2 + point[1] ** 2 + point[2] ** 2;
		 if (p2 < squareRadius) {
			vectorz[0] *= -1;
			vectorz[1] *= -1;
			vectorz[2] *= -1;
		}
		if (vectorz[2] <= 0) {
			this.drawable = false;
			return;
		} else {
			this.drawable = true;
		}
		let angle = (vectorz[0] * sun[0] + vectorz[1] * sun[1] + vectorz[2] * sun[2]) / Math.sqrt((vectorz[0] ** 2 + vectorz[1] ** 2 + vectorz[2] ** 2) * (sun[0] ** 2 + sun[1] ** 2 + sun[2] ** 2));
		let f = (-angle + 1) / 2;
		f = f ** 4;
		let color = f * 255;
		this.color = 'rgb(' + color + ',' + color + ',' + color + ')';
	}
}

class Sphere {
	constructor(r, n) {
		this.triangles = [];
		this.points = [];		
		this.r = r;
		let square = [];
		let theta, alpha;
		for (let i = 0; i < n; i++) {
			
			square[i] = [];
			theta = Math.PI * i / (n - 1);
			
			for (let j = 0; j < n; j++) {
				alpha = Math.PI * 2 * j / (n)
				let x = r * Math.sin(theta) * Math.cos(alpha);
				let y = r * Math.sin(theta) * Math.sin(alpha);
				let z = r * Math.cos(theta);
				let p = new Point(x, y, z);
				square[i][j] = p;
			}
		
		}

		for (let i = 1; i < n; i++) {
			this.triangles.push(new Triangle(square[0][0], square[1][i-1], square[1][i]));
			this.triangles.push(new Triangle(square[n-1][0], square[n-2][i-1], square[n-2][i]));
		}
			this.triangles.push(new Triangle(square[0][0], square[1][0], square[1][n-1]));
			this.triangles.push(new Triangle(square[n-1][0], square[n-2][0], square[n-2][n-1]));

		for (let i = 2; i < n-1; i++) {
			for (let j = 1; j < n; j++) {
				this.triangles.push(new Triangle(square[i-1][j-1], square[i-1][j], square[i][j]));
				this.triangles.push(new Triangle(square[i-1][j-1], square[i][j-1], square[i][j]));
			}
			this.triangles.push(new Triangle(square[i-1][0], square[i-1][n-1], square[i][n-1]));
			this.triangles.push(new Triangle(square[i-1][0], square[i][0], square[i][n-1]));
		}

		for (let i = 1; i < n-1; i++) {
			for (let j = 0; j < n; j++) {
				this.points.push(square[i][j]);
			}
		}

		this.points.push(square[0][0]);
		this.points.push(square[n-1][0]);
	}
	draw() {
		this.triangles.forEach(e => {
			e.highlight();
			e.draw();
		});
	}
	rotateZ(deg = 0.01) {
		this.points.forEach(e => {
			let x = e.x * Math.cos(deg) - e.y * Math.sin(deg);
			let y = e.x * Math.sin(deg) + e.y * Math.cos(deg);
			e.x = x;
			e.y = y;
		});
	}
	rotateX(deg = 0.01) {
		this.points.forEach(e => {
			let y = e.y * Math.cos(deg) - e.z * Math.sin(deg);
			let z = e.y * Math.sin(deg) + e.z * Math.cos(deg);
			e.y = y;
			e.z = z;
		});
	}
	rotateY(deg = 0.01) {
		this.points.forEach(e => {
			let x = e.x * Math.cos(deg) + e.z * Math.sin(deg);
			let z = -e.x * Math.sin(deg) + e.z * Math.cos(deg);
			e.x = x;
			e.z = z;
		});
	}
}

let Radius = 300, squareRadius = Radius ** 2;

if (w < 400) {
	Radius = w/2;
	squareRadius = Radius ** 2;
}

let s = new Sphere(Radius, 10);

let neutralcolor = 'rgb(0, 0, 0)';

let time = new Date();
let timeafter = 0;
let span = document.querySelector('span');
let frameCount = 0;

function benchmark() {
	timeafter = new Date();
	span.innerHTML = frameCount / (timeafter-time) * 1000;
	time = timeafter;
	frameCount = 0;
	setTimeout(benchmark, 100);
}


function loop() {
	frameCount++;
	ctx.fillStyle = neutralcolor;
	ctx.fillRect(-w/2, -h/2, w, h);
	s.draw();
	s.rotateX(0.01);
	requestAnimationFrame(loop);
}

loop();
benchmark();