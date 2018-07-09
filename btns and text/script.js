let h = document.getElementsByClassName('cubic')[0];
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let to = h.innerHTML.split("");
let from = [];
let times = [];

to.forEach(e => {
	from.push(getLetter());
	times.push(Math.floor(Math.random() * 10));
});

function getLetter() {
	return letters[Math.floor(Math.random() * letters.length)];
}

function display() {
	h.innerHTML = from.join('');
}


function check() {
	for (let i = 0; i < from.length; i++) {
		if (times[i] === 0) from[i] = to[i];
	}
}


function change() {
	let exit = 1;
	for (let i = 0; i < times.length; i++) {
		if (times[i] > 0) {
			exit = 0;
			break;
		}
	}
	if (exit) return;

	let ran = Math.floor(Math.random() * from.length);
	while (times[ran] === 0) {
		ran++;
		if (ran === from.length) ran = 0;
	}
	from[ran] = getLetter();
	times[ran]--;
	check();
	display();
	setTimeout(change, Math.random() * 100 + 10);
}

change();