window.onload = function() {

	var canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext('2d'),
			h = canvas.height,
	 		w = canvas.width;


	var n = 50,
			step = w / n,
			position = [],
			padding = 10;

	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = '#09a509';
	for (var i = 0; i < n; i++) {
		position[i] = Math.floor(Math.random() * 200);
		ctx.fillRect(step * i + padding, position[i], step - padding * 2, step - padding * 2);
	}
	var timer = setInterval(function() {

	ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = '#09a509';
	for (var i = 0; i < n; i++) {
		ctx.fillRect(step * i + padding, position[i], step - padding * 2, step - padding * 2);
		position[i] += step - padding * 2;
		if (position[i] > h) {
			position[i] = position[i] % h - 2 * step;
		}
	}
	}, 100);
}