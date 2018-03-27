window.onload = function() {

	var canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext('2d'),
			h = canvas.height,
	 		w = canvas.width;


	var		x = 20,
	 		color = 0;
	var i = 0, j, times = 2000;

	i = 0;
	for (var k = 0; k < times; k++) {
		i = 0; j = 0;
		setTimeout(function run() {
			times--;
			if (i >= h) {
				i = 0;
			}
			if (j >= w) {
				j = 0;
				i += x;
			}
			color = Math.floor(Math.random() * 255)
			ctx.fillStyle = 'rgb(' + color + ', ' + color + ', ' + color + ')';
			ctx.fillRect(j, i, x, x);
			j += x;
			if (times > 0) {
				setTimeout(run, 100);
			}
		}, 100);
	}

}