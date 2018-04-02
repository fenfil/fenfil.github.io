window.onload = function() {

	var canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext('2d'),
			h = canvas.height,
	 		w = canvas.width;
	var cx = w/2, cy = h/2, n = 200;
	var colors = ['#5fe7d9', '#657fee', '#2fec6d', '#36fccb'];

	function Particle(r, a, color, da, size) {
		this.r = r;
		this.a  = a;
		this.da = da;
		this.color = colors[color];
		this.size = size;
	}
	Particle.prototype.run = function() {
		this.a += this.da;
		if (this.a == 360) this.a = 0;
	}

	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, w, h);

	function animate() {
		requestAnimationFrame(animate);
		ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
		ctx.fillRect(0, 0, w, h);
		for (var i = 0; i < particles.length; i++) {
			particles[i].run();
			ctx.strokeStyle = particles[i].color;
			ctx.lineWidth = particles[i].size * 2;
			ctx.beginPath();
			ctx.moveTo(lastpoints[i].x, lastpoints[i].y);
			ctx.lineTo(cx + particles[i].r * Math.cos(particles[i].a), cy + particles[i].r * Math.sin(particles[i].a));
			ctx.stroke();
			ctx.beginPath();
			ctx.fillStyle = particles[i].color;
			ctx.arc(cx + particles[i].r * Math.cos(particles[i].a), cy + particles[i].r * Math.sin(particles[i].a), particles[i].size, 0, 2 * Math.PI);
			ctx.fill();
			lastpoints[i] = {x:cx + particles[i].r * Math.cos(particles[i].a), y: cy + particles[i].r * Math.sin(particles[i].a)}
		}
	}

	var particles = [], lastpoints = [];
	for (var i = 0; i < n; i++) {
		particles[i] = new Particle(Math.floor(Math.random() * 150) + 150, Math.floor(Math.random() * 360), Math.floor(Math.random() * 4), Math.random() * 0.01 + 0.01, Math.random() * 3);
		lastpoints[i] = {x: cx + particles[i].r * Math.cos(particles[i].a), y: cy + particles[i].r * Math.sin(particles[i].a)};
	}

	canvas.addEventListener('mousemove', function(e) {
		cx = e.clientX;
		cy = e.clientY;
	});

	animate();
}