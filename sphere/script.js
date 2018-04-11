window.onload = function() {

	var canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext('2d'),
			h = canvas.height,
	 		w = canvas.width;
	var cx = w/2, cy = h/2, r = h/2 - 50, dx, dy;
	let clearColor = 'white';

	function Particle(t, a) {
		this.x = r * Math.cos(a) * Math.cos(t);
		this.y = r * Math.sin(a) * Math.cos(t);
		this.z = r * Math.sin(t);
		this.r = this.z / 50;
	}
	Particle.prototype.run = function() {
		// this.x = r * Math.cos(this.a + rotx);
		// // this.y = r * Math.sin(this.a) * Math.cos(this.t);
		// this.z = 1;
		
		// x rotation

		let y = Math.cos(roty) * this.y - Math.sin(roty) * this.z;
		let z = Math.sin(roty) * this.y + Math.cos(roty) * this.z;
		this.y = y;
		this.z = z;

		// y rotation

		let x = Math.cos(rotx) * this.x - Math.sin(rotx) * this.z;
		z = Math.sin(rotx) * this.x + Math.cos(rotx) * this.z;
		this.x = x;
		this.z = z;

		// z rotation

		x = Math.cos(Math.PI / 1000) * this.x - Math.sin(Math.PI / 1000) * this.y;
		y = Math.sin(Math.PI / 1000) * this.x + Math.cos(Math.PI / 1000) * this.y;
		this.x = x;
		this.y = y;

		this.r = this.z / 30;
	}

	ctx.fillStyle = clearColor;
	ctx.fillRect(0, 0, w, h);

	function animate() {
		requestAnimationFrame(animate);
		let grad;
		ctx.fillStyle = clearColor;
		ctx.fillRect(0, 0, w, h);
		for (let i = 0; i < particles.length; i++) {
			particles[i].run();
			if (particles[i].z > 0) {
				ctx.beginPath();
				ctx.arc(cx + particles[i].x, cy + particles[i].y, particles[i].r, 0, Math.PI * 2);
				grad = ctx.createRadialGradient(cx + particles[i].x, cy + particles[i].y, 0, cx + particles[i].x, cy + particles[i].y, particles[i].r);
				grad.addColorStop(0, '#67fafc');
				grad.addColorStop(0.6, '#0c5f62');
				grad.addColorStop(0.6, clearColor);
				grad.addColorStop(0.9, clearColor);
				grad.addColorStop(0.9, '#4d7bf0');
				grad.addColorStop(1, '#4d7bf0');
				ctx.fillStyle = grad;
				ctx.fill();
			} if (particles[i].z === 0) {
				ctx.beginPath();
				ctx.arc(cx + particles[i].x, cy + particles[i].y, particles[i].r, 0, Math.PI * 2);
				grad = ctx.createRadialGradient(cx + particles[i].x, cy + particles[i].y, 0, cx + particles[i].x, cy + particles[i].y, particles[i].r);
				grad.addColorStop(0, '#67fafc');
				grad.addColorStop(0.6, '#0c5f62');
				grad.addColorStop(0.6, clearColor);
				grad.addColorStop(0.9, clearColor);
				grad.addColorStop(0.9, '#4d7bf0');
				grad.addColorStop(1, '#4d7bf0');
				ctx.fillStyle = grad;
				ctx.fill();
			} if (particles[i].z < 0) {
				ctx.beginPath();
				ctx.arc(cx + particles[i].x, cy + particles[i].y, 0.5, 0, Math.PI * 2);
				ctx.fillStyle = 'black';
				ctx.fill();
			}
		}
	}

	var particles = [], n = 0;

	for (let t = 0; t < Math.PI * 2; t += Math.PI / 10) {
		for (let a = 0; a < Math.PI; a += Math.PI / 10) {
			particles[n] = new Particle(t, a);
			n++;
		}
	}
	
	var [rotx, roty] = [0, 0];
	var lastx, lasty;
	canvas.addEventListener('mousemove', function(e) {
		if (lastx) {
			rotx = -((e.clientX - lastx)) / 500;
			roty = -((e.clientY - lasty)) / 500;
		}
		[lastx, lasty] = [e.clientX, e.clientY];
	});
	animate();
}