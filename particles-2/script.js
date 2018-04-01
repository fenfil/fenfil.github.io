window.onload = function() {

	var canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext('2d'),
			h = canvas.height,
	 		w = canvas.width;

	var b = {x: w/2,y:h};

	var l = 10;

	function Particle(x, y) {
		this.x = x;
		this.y = y;
		this.size = 3;
		this.distance = 0;
		this.speed = {x: 0, y: 0};
	}

	Particle.prototype.run = function() {
		this.distance =  Math.sqrt((mouse.x - this.x) * (mouse.x - this.x) + (mouse.y - this.y) * (mouse.y - this.y));
		if (this.distance > 600) {
			this.speed.x = 0;
			this.speed.y = 0;
		} else {
			this.speed.x = this.speed.x + (mouse.x - this.x) / 4;
			this.speed.y = this.speed.y + (mouse.y - this.y) / 4;
		}
		this.x += this.speed.x * 0.5;
		this.y += this.speed.y * 0.5;
		if (this.x < 0) this.x = 0;
		if (this.x > w - 5) this.x =  w - 5;
		if (this.y < 0) this.y = 0;
		if (this.y > h - 5) this.y = h - 5;
		console.log(this.speed);
	}

	function land() {
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, w, h);
			ctx.fillStyle = '#f38989';
		for (var i = 0; i < particles.length; i++) {
			for (var j = 0; j < particles[i].length; j++) {
				ctx.beginPath();
				particles[i][j].run();
				ctx.arc(particles[i][j].x, particles[i][j].y, particles[i][j].size, 0, 2 * Math.PI);
				ctx.fill();
			}
		}
		setTimeout(land, 50)
	}


	var particles = [];
	var nx = 30, stepx = w / nx;
	var ny = 20, stepy = h / ny;
	var mouse = {x: w/2, y: h/2};

	for (var i = 0; i * stepy < h; i++) {
		particles[i] = [];
		for (var j = 0; j * stepx < w; j++) {
			particles[i][j] = new Particle(j * stepx, i * stepy);
		}
	}

	canvas.addEventListener('mousemove', function(e) {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});

	land(particles);

}