window.onload = function() {

	var canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext('2d'),
			h = canvas.height,
	 		w = canvas.width;



	var center = {
		x: w /  2,
		y: h / 2
	};

	var points = [],
			n = 20,
			sizes = [],
			steps = 100,
			beginpath = 20,
			paths = [],
			colors = [];

	for (var i = 0; i < n; i++) {
		var x = Math.floor(Math.random() * w);
		var y = Math.floor(Math.random() * h);
		colors[i] = Math.ceil(Math.random() * 150) + 105;
		sizes[i] = Math.ceil(Math.random() * 10);
		points.push({x: x, y: y});
		paths[i] = (Math.floor(Math.random() * steps) + beginpath) % steps;
	}

	console.log(colors);
	var timer = setInterval(function() {
		ctx.fillStyle = 'rgba(15, 15, 50, 0.1)';
		ctx.fillRect(0, 0, w, h);
		for (var i = 0; i < points.length; i++) {
			ctx.fillStyle = 'rgb(' + colors[i] + ', ' + colors[i] + ', ' + colors[i] + ')';
			ctx.beginPath();
			ctx.arc(center.x + paths[i] * (points[i].x - center.x) / steps, center.y + paths[i] * (points[i].y - center.y) / steps, paths[i] * sizes[i] / steps, 0, Math.PI * 2);
			ctx.fill();
			paths[i]++;
			if (paths[i] == steps) {
				points[i] = {x: Math.floor(Math.random() * w), y: Math.floor(Math.random() * h)};
				paths[i] = Math.ceil(Math.random() * 30);
			}
		}
	}, 20);

	canvas.addEventListener('mousemove', function(e) {
		center.x = e.clientX;
		center.y = e.clientY;
	});

}