let [w, h] = [window.innerWidth, window.innerHeight];
let img = document.querySelector('.img');
let [xoff, yoff] = [w * 0.05, h * 0.05];
img.addEventListener('mousemove', e => {
	img.style.marginLeft = (-e.clientX / w * xoff) + 'px';
	img.style.marginTop = (-e.clientY / h * yoff) + 'px';
});