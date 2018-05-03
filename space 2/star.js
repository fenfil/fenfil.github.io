class Star {
	constructor() {
		this.update()
	}
	live() {
		if (this.onExplode) {
			this.explode();
		} else {
			this.draw()
		}
	}
	explode() {
		this.z++;

		let x = this.z * this.x / (camera.z - this.z) + this.x;
		x = x/camera.max * w / 2;
		if (x > w/2 || x < -w/2) {
			this.update();
			return;
		}

		let y = this.z * this.y / (camera.z - this.z) + this.y;
		y = y/camera.max * h / 2;
		if (y > h/2 || y < -h/2) {
			this.update();
			return;
		}


		let g = ctx.createRadialGradient(x, y, 0, x, y, this.r * 2);
		g.addColorStop(0, 'rgba(255, 255, 255, 1)');
		g.addColorStop(1, 'rgba(255, 255, 255, 0)');


		ctx.fillStyle = g;
		ctx.beginPath();
		ctx.arc(x, y, this.r * 2, 0, Math.PI * 2);
		ctx.fill();


		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(x, y, this.r, 0, Math.PI * 2);
		ctx.fill();



		this.explodepoint += 0.01;

		if (this.explodepoint >= 1) {
			this.explodepoint = 0;
			this.onExplode = 0;
		}

	}
	draw() {

		this.r += 0.01;

		this.z++;

		if (Math.random() > 0.99) this.onExplode = 1;

		let x = this.z * this.x / (camera.z - this.z) + this.x;
		x = x/camera.max * w / 2;
		if (x > w/2 || x < -w/2) {
			this.update();
			return;
		}

		let y = this.z * this.y / (camera.z - this.z) + this.y;
		y = y/camera.max * h / 2;
		if (y > h/2 || y < -h/2) {
			this.update();
			return;
		}

		let g = ctx.createRadialGradient(x, y, 0, x, y, this.r);
		g.addColorStop(0, this.color);
		g.addColorStop(1, 'rgba(255, 255, 255, 0)');

		ctx.fillStyle = g;
		ctx.beginPath();
		ctx.arc(x, y, this.r, 0, Math.PI * 2);
		ctx.fill();

	}
	update() {
		this.onExplode = 0;
		this.explodepoint = 0;
		this.x = (Math.random() - 0.5) * 500;
		this.y = (Math.random() - 0.5) * 500;
		this.z = (Math.random() - 0.5) * 500;
		// this.r = Math.random() * 2 + 5;
		this.r = 0;
		this.color = `hsl(${Math.floor(Math.random()*360)}, 50%, 50%)`;		
	}
}

class Camera {
	constructor(a) {
		this.x = 0;
		this.y = 0;
		this.z = 500;
		this.angle = a;
		this.max = this.z * Math.tan(this.angle);
	}
}