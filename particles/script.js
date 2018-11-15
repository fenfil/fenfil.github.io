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
		this.size = 5;
		this.color = 0;
		this.distance = 0;
	}

	Particle.prototype.run = function() {
		this.distance =  Math.sqrt((mouse.x - this.x) * (mouse.x - this.x) + (mouse.y - this.y) * (mouse.y - this.y));
		if (this.distance > 300) {
			this.color = 60;
		} else {
			this.color = Math.floor(214 - this.distance / 2);
		}
		this.x += (mouse.x - this.x) / this.distance * 2;
		this.y += (mouse.y - this.y) / this.distance * 2;
		this.x = this.x + Math.random() * 10 - 5;
		this.y = this.y + Math.random() * 10 - 5;
	}

	function land() {
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, w, h);
		for (var i = 0; i < particles.length; i++) {
			ctx.beginPath();
			ctx.fillStyle = 'rgb(' + particles[i].color + ', ' + particles[i].color + ', ' + particles[i].color + ')';
			particles[i].run();
			ctx.arc(particles[i].x, particles[i].y, particles[i].size, 0, 2 * Math.PI);
			ctx.fill();
		}
		setTimeout(land, 30)
	}


	var particles = [];
	var nx = 10, stepx = w / nx;
	var ny = 10, stepy = h / ny;
	var mouse = {x: w/2, y: h/2};

	for (var i = 0; i * stepy < h; i++) {
		for (var j = 0; j * stepx < w; j++) {
			particles[i * 10 + j] = new Particle(j * stepx, i * stepy);
		}
	}

	canvas.addEventListener('mousemove', function(e) {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});

	land(particles);

}