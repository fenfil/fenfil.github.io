window.onload = function() {

	var canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext('2d'),
			h = canvas.height,
	 		w = canvas.width;



	var center = {
		x: w /  2,
		y: h / 2 - 150
	};

	var points = [],
			n = 20,
			sizes = [],
			steps = 100,
			beginpath = 0,
			paths = [],
			colors = [];
	
	for (var i = 0; i < n; i++) {
		var x = Math.floor(Math.random() * w/2) + w/4;
		var y = Math.floor(Math.random() * h/2) + h/4 - 150;
		colors[i] = Math.ceil(Math.random() * 150) + 105;
		sizes[i] = Math.ceil(Math.random() * 10);
		points.push({x: x, y: y});
		paths[i] = 0;//(Math.floor(Math.random() * steps) + beginpath) % steps;
	}
	var firework = {
		beginX: w/2,
		beginY: h,
		endX: w/2,
		endY: h/2,
		color: '#7a0202',
		radius: 2,
		current: 0,
		finish: 100
	};
	firework.timer = setInterval(function() {
		if (firework.current != firework.finish) {
			ctx.fillStyle = 'rgba(15, 15, 50, 0.1)';
			ctx.fillRect(0, 0, w, h);
			ctx.fillStyle = firework.color;
			ctx.beginPath();
			ctx.arc(firework.beginX + firework.current * (firework.endX - firework.beginX) / firework.finish, firework.beginY + firework.current * (firework.endY - firework.beginY) / firework.finish, firework.radius, 0, Math.PI * 2);
			ctx.fill();
			firework.current++;
			firework.radius *= 0.99;
		}
		ctx.fillStyle = 'rgba(15, 15, 50, 0.1)';
		ctx.fillRect(0, 0, w, h);
	}, 20);

	setTimeout(function() {
		clearInterval(firework.timer);
		var timer = setInterval(function() {
			ctx.fillStyle = 'rgba(15, 15, 50, 0.1)';
			ctx.fillRect(0, 0, w, h);
			for (var i = 0; i < points.length; i++) {
				if (paths[i] != steps) {
					ctx.fillStyle = 'rgb(' + colors[i] + ', ' + colors[i] + ', ' + colors[i] + ')';
					ctx.beginPath();
					ctx.arc(center.x + paths[i] * (points[i].x - center.x) / steps, center.y + paths[i] * (points[i].y - center.y) / steps, paths[i] * sizes[i] / steps, 0, Math.PI * 2);
					ctx.fill();
					paths[i]++;	
				}
			}
		}, 20);
	}, 3000);

}