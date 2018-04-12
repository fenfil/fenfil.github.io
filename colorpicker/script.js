window.onload = () => {
	let canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d');
	[canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];
	let [w, h] = [canvas.width, canvas.height];

	let img = ctx.createImageData(500, 500);
	let pw = 0;
	ctx.fillRect(0, 0, w, h);
	for (let i = 0, j = 0; 4 * (i * img.width + j) < img.data.length; j++) {

		let b = (i / img.height) * 5;

		if (j < img.width / 3) {
			img.data[i * 4 * img.width + j * 4] = (255 - j / img.width * 3 * 255) * b;
			img.data[i * 4 * img.width + j * 4 + 1] = (j / img.width * 3 * 255) * b;
			img.data[i * 4 * img.width + j * 4 + 2] = b;
		} else if (j < img.width * 2 / 3) {
			img.data[i * 4 * img.width + j * 4 + 1] = (255 - (j - img.width / 3) / img.width * 3 * 255) * b;
			img.data[i * 4 * img.width + j * 4 + 2] = ((j - img.width / 3) / img.width * 3 * 255) * b;
			img.data[i * 4 * img.width + j * 4] = b;
		} else {
			img.data[i * 4 * img.width + j * 4 + 2] = (255 - (j - img.width * 2 / 3) / img.width * 3 * 255) * b;
			img.data[i * 4 * img.width + j * 4] = ((j - img.width * 2 / 3) / img.width * 3 * 255) * b;
			img.data[i * 4 * img.width + j * 4 + 1] = b;
		}

		img.data[i * 4 * img.width + j * 4 + 3] = 255;

		if (j === img.width) {
			i++; j = 0;
		}
	}
	ctx.putImageData(img, 10, 10);
	canvas.addEventListener('mousemove', function(e) {
		let a = ctx.getImageData(e.clientX, e.clientY, 1, 1);
		console.log(a.data[0], a.data[1], a.data[2]);
		let b = ctx.createImageData(50, 50);
		for (let i = 0; i < b.data.length; i+=4) {
			b.data[i] = a.data[0];
			b.data[i + 1] = a.data[1];
			b.data[i + 2] = a.data[2];
			b.data[i + 3] = 255;
		}
		ctx.putImageData(b, 500, 100);
	});

}