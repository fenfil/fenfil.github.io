window.onload = function() {
	var canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var ctx = canvas.getContext("2d"),
			width = 10,
			mousedown = false,
			path = [];
	ctx.lineWidth = width * 2;

	canvas.addEventListener('mousedown', function(e) {
		mousedown = true;
		path.push('mousedown');
	});

	canvas.addEventListener('mouseup', function() {
		mousedown = false;
		ctx.beginPath();
	});

	canvas.addEventListener("mousemove", function(e) {
		if (mousedown) {
			path.push([e.clientX, e.clientY]);
			ctx.lineTo(e.clientX, e.clientY);
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(e.clientX, e.clientY, width, 0, Math.PI * 2);
			ctx.fill();
			
			ctx.beginPath();
			ctx.moveTo(e.clientX, e.clientY);
		}
	});

	function clear() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	function repeat() {
		path = JSON.parse(localStorage.getItem('path'));
		timer = setInterval(function() {
			if (!path.length) {
				clearInterval(timer);
			}
			e = {
				clientX: path[0][0],
				clientY: path[0][1]
			}
			path.shift();
			ctx.lineTo(e.clientX, e.clientY);
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(e.clientX, e.clientY, width, 0, Math.PI * 2);
			ctx.fill();
			
			ctx.beginPath();
			ctx.moveTo(e.clientX, e.clientY);
		}, 20);
	}

	document.addEventListener('keydown', function(e) {
		if (e.keyCode == 83) {
			localStorage.setItem('path', JSON.stringify(path));
		} else if (e.keyCode == 82) {
			clear();
			repeat();
		} else if (e.keyCode == 67) {
			clear();
		}
	});
}