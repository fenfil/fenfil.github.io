// window.onload = function() {
	w = 10;
	var canvas = document.getElementById('canvas');
	var land = canvas.getContext('2d');
	
	function drawTree(len, x0, y0) {
		land.clearRect(0,0,700,700);
		land.lineWidth = 10;
		land.lineJoin = 'round';
		land.lineCap = 'square'
		land.beginPath();
		land.moveTo(x0, y0);
		land.lineTo(x0, y0 - len);
		land.stroke();
		land.closePath();
		tree(len * 0.8, x0, y0-len, Math.PI / 2, w*0.8);
	}

	function tree(len, x0, y0, alpha, w) {
		if (len < 5) {return 0;}
		land.beginPath();
		land.lineWidth = w;
		var x = x0 + (len*Math.cos(alpha-0.3)),
				y = y0 - (len*Math.sin(alpha-0.3));

		land.moveTo(x0,y0);
		land.lineTo(x, y);
		land.closePath();
		land.stroke();
		land.lineWidth = w;
		tree(len * 0.8, x, y, alpha - 0.3, w*0.6);



		land.lineWidth = w;
		land.beginPath();
		land.moveTo(x0, y0);
		x = x0 + (len*Math.cos(alpha+0.3));
		y = y0 - (len*Math.sin(alpha+0.3));
		land.lineTo(x, y);
		land.closePath();
		land.stroke();
		tree(len * 0.8, x, y, alpha + 0.3, w*0.6);
	}

	drawTree(100, 350, 700);
// }