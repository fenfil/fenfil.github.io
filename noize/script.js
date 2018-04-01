window.onload = function() {

	var canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext('2d'),
			h = canvas.height,
	 		w = canvas.width;


	var		x = 10,
	 			color = 0,
	 			times = 1000;

	function run() {
		times--;
		var i = 0;
		var j = 0;

		while (x * i < h) {
			j = 0;
			while (x * j < w) {
				color = Math.floor(Math.random() * 255)
				ctx.fillStyle = 'rgb(' + color + ', ' + color + ', ' + color + ')';
				ctx.fillRect(j * x, i * x, x, x);
				j++;
			}
			i++;
		}

		if (times > 0) {
			setTimeout(run, 10);
		}
	}

	run();
}