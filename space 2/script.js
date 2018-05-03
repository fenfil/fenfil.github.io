let canvas = document.createElement('canvas');
document.body.appendChild(canvas);
let [w, h] = [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];
let ctx = canvas.getContext('2d');

ctx.translate(w/2, h/2);


let a = [];

for (let i = 0; i < 200; i++) {
	a.push(new Star());
}

let camera = new Camera(Math.PI/4);

let animate = () => {
	requestAnimationFrame(animate);
	ctx.fillStyle = 'black';
	ctx.fillRect(-w/2, -h/2, w, h);
	a.forEach(e => e.draw());
	// setTimeout(animate, 100);
}

animate();