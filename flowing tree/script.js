let canvas = document.createElement('canvas'),
		[w, h] = [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight],
		ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.ox = x;
		this.oy = y;
		this.vx = 0;
		this.vy = 0;
	}
	flow() {
		if (cx) {
			let r1 = Math.sqrt((cx - this.x) ** 2 + (cy - this.y) ** 2),
					r2 = Math.sqrt((this.ox - this.x) ** 2 + (this.oy - this.y) ** 2);
			let f1 = Math.sin((1 - r1 / 100) * Math.PI / 2) * (this.x - cx) / r1;
			let f2 = Math.sin((1 - r1 / 100) * Math.PI / 2) * (this.y - cy) / r1;
			if (r1 > 100) {
				f1 = 0;
				f2 = 0;
			}

			let fx = f1 + ((this.ox - this.x) / 100);
			let fy = f2 + ((this.oy - this.y) / 100);
			this.vx = fx * 4;
			this.vy = fy * 4;
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
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 0.5;
		ctx.beginPath();
		ctx.moveTo(this.a.x, this.a.y);
		ctx.lineTo(this.b.x, this.b.y);
		ctx.lineTo(this.c.x, this.c.y);
		ctx.stroke();
		ctx.fill();
		ctx.restore();
	}
	flow() {
		this.a.flow();
		this.b.flow();
		this.c.flow();
	}
}

let g = "292,373,268,349,297,336,272,321,306,304,268,290,304,271,275,264,304,253,324,251,319,237,296,225,308,200,341,199,382,203,400,176,450,211,477,253,448,274,417,249,380,272,420,286,386,308,376,340,400,372,428,339,419,312,458,320,462,290,491,304,491,344,429,343,469,362,461,379,411,379,422,338,407,372,385,363,374,324,350,336,348,298,384,291,351,280,380,252,364,232,411,228,428,203,448,229,448,209,430,193,348,199,360,218,309,247,336,288,304,341,356,300,334,279,353,249,346,233,447,290,384,317,396,360,326,359,297,354,294,296,359,297,296,362,352,358,359,388,381,359,407,400,354,419,400,443,358,448,392,479,356,487,395,497,360,526,408,541,360,559,399,578,628,520";
let u = g.split(',');
let q = [];
u.forEach(e => {
	q.push(Number(e));
});
let cx = 0, cy = 0;
let p = [];
let s = 15, start = 400;
for (let i = 0; i < q.length - 6; i+=2) {
	p.push(new Triangle([q[i], q[i+1]], [q[i+2], q[i+3]], [q[i+4], q[i+5]]));
}
let anim = () => {
	requestAnimationFrame(anim);
	ctx.clearRect(0, 0, w, h);
	p.forEach(e => {
		e.flow();
		e.draw();
	});
	// setTimeout(anim, 50);
}
anim();

document.addEventListener('mousemove', (e) => {
	cx = e.clientX;
	cy = e.clientY;
});



let dots = [];
document.addEventListener('click', (e) => {
	dots.push(e.clientX, e.clientY);
});

document.addEventListener('keypress', (e) => {
	if (e.keyCode === 115) {
		localStorage.setItem("dots", dots.toString());
	} else if (e.keyCode === 114) {
		console.log(dots);
		for (let i = 0; i < dots.length-1; i+=2) {
			ctx.beginPath();
			ctx.moveTo(dots[i], dots[i+1]);
			ctx.lineTo(dots[i+2], dots[i+3]);
			ctx.lineTo(dots[i+4], dots[i+5]);
			ctx.fill();
		}
	}
});