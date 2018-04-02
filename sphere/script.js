window.onload = function() {

	var canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext('2d'),
			h = canvas.height,
	 		w = canvas.width;
	var cx = w/2, cy = h/2, r = 300, dx, dy;

	function Particle(teta, alpha) {
		this.t  = teta;
		this.a  = a;
		this.x = r * Math.cos(this.a) * Math.sin(this.t);
		this.y = r * Math.sin(this.a) * Math.sin(this.t);
		this.z = r * Math.cos(this.t);
		this.r = Math.cos(this.a) * Math.cos(this.t) * 5 + 5;
	}
	Particle.prototype.run = function() {
		if (dx == undefined) dx = 0;
		if (dy == undefined) dy = 0;
		// this.a = Math.atan((this.y + dy)/(this.x + dx));
		// this.t = Math.asin(Math.sqrt( ((this.x + dx)*(this.x + dx) + (this.y + dy)*(this.y + dy)) / (r * r)));
		this.a += dx/360;
		this.t += dy/360;
		this.x = r * Math.cos(this.a) * Math.sin(this.t);
		this.y = r * Math.sin(this.a) * Math.sin(this.t);
		this.z = r * Math.cos(this.t);
		this.r = this.z / 100 + 3;
	}

	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, w, h);

	function animate() {
		requestAnimationFrame(animate);
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, w, h);
		for (var i = 0; i < n; i++) {
			ctx.beginPath();
			particles[i].run();
			// dx = 0; dy = 0;
			ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
			ctx.arc(cx + particles[i].x, cy + particles[i].y, particles[i].r, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	var particles = [],
			n = 0;
	for (var t = 0; t < 360; t += 30) {
		for (var a = 0; a < 360; a += 30) {
			particles[n] = new Particle(t, a);
			n++;
		}
	}
	var last = {x: w/2, y: h/2};
	canvas.addEventListener('mousemove', function(e) {
		dx = e.clientX - last.x;
		dy = e.clientY - last.y;
		last.x = e.clientX;
		last.y = e.clientY;
	});

	animate();
}