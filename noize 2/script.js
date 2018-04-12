'use strict'
window.onload = function() {

	let canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let ctx = canvas.getContext('2d'),
			h = canvas.height,
	 		w = canvas.width;

	let img = ctx.createImageData(w, h);

	for (let i = 0; i < img.data.length; i+=8) {
		let r = Math.random()*255;
		img.data[i] = r;
		img.data[i+1] = r;
		img.data[i+2] = r;
		img.data[i+3] = 255;

		img.data[i+4] = r;
		img.data[i+5] = r;
		img.data[i+6] = r;
		img.data[i+7] = 255;
	}

	ctx.putImageData(img, 0, 0);	

	let animate = () => {
		requestAnimationFrame(animate);
		for (let i = 0; i < img.data.length; i+=4) {
			let r = Math.random()*255;
			img.data[i] = r;
			img.data[i+1] = r;
			img.data[i+2] = r;
			img.data[i+3] = 255;
		}
		ctx.putImageData(img, 0, 0, 0, 0, w, h);
	}

	animate();
}