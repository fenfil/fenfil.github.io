window.onload = function() {

	var canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext('2d'),
			h = canvas.height,
	 		w = canvas.width;

	function Particle(x, y) {
		this.x = x;
		this.y = y;
		this.size = Math.floor(Math.random() * 5 + 2);
		this.dx = Math.random() * 100 - 50;
		this.dy = Math.random() * 100 - 50;
		this.color = 'rgb(' + Math.floor(Math.random() * 100 + 150) + ', ' + Math.floor(Math.random() * 100) + ', ' + Math.floor(Math.random() * 100 + 150) + ')';
		this.dists = [];
	}

	Particle.prototype.run = function() {
		if (this.x < 0) this.dx *= -1;
		if (this.x > w) this.dx *= -1;
		if (this.y < 0) this.dy *= -1;
		if (this.y > h) this.dy *= -1;
		for (var i = 0; i < particles.length; i++) {
			this.dists[i] = Math.sqrt((this.x - particles[i].x) * (this.x - particles[i].x) + (this.y - particles[i].y) * (this.y - particles[i].y));
		}
		this.x += this.dx / 50;
		this.y += this.dy / 50;
	}

	var particles = [],
			n = 10;

	for (var i = 0; i < 100; i++) {
			particles[i] = new Particle(Math.floor(Math.random() * w * 0.9 + w * 0.05), Math.floor(Math.random() * h * 0.9 + h * 0.05));
	}
	particles[n + 1] = new Particle(0, 0);
	particles[n + 1].dx = 0;
	particles[n + 1].dy = 0;
	particles[n + 1].size = 0;
	canvas.addEventListener('mousemove', function(e) {
		particles[n + 1].x = e.clientX;
		particles[n + 1].y = e.clientY;
	});

	ctx.strokeStyle = '#d3cece';

	function go() {
		ctx.fillStyle = 'black'
		ctx.fillRect(0, 0, w, h);
		for (var i = 0; i < particles.length; i++) {
			particles[i].run();
			ctx.fillStyle = particles[i].color;
			for (var j = 0; j < particles.length; j++) {
				if ((j != i) && (particles[i].dists[j] < 100)) {
					ctx.lineWidth = Math.floor((100 - particles[i].dists[j]) / 20);
					ctx.beginPath();
					ctx.moveTo(particles[i].x, particles[i].y);
					ctx.lineTo(particles[j].x, particles[j].y);
					ctx.stroke();
				}
			}
			ctx.beginPath();
			ctx.arc(particles[i].x, particles[i].y, particles[i].size, 0, 2 * Math.PI);
			ctx.fill();
		}
		setTimeout(go, 10);
	}

	go();

	console.log(ctx);
}