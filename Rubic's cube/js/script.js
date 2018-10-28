let camera, w, h, renderer, container, stats, orbitControls, clock, cube;
let timesbtn = 0;

window.onload = init;

function init() {
	createScene();
	createLights();
	createCube();
	loop();
}

function createScene() {
	w = window.innerWidth;
	h = window.innerHeight;

	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0x000000, 100, 350);
	
	camera = new THREE.PerspectiveCamera(50, w/h, 1, 10000);
	camera.position.z = 250;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(w, h);
	renderer.setClearColor(new THREE.Color('#F2ED99'));

	container = document.getElementById('world');
	container.appendChild(renderer.domElement);

	orbitControls = new THREE.OrbitControls(camera);
  // orbitControls.autoRotate = true;
  
  clock = new THREE.Clock();

	stats = new Stats;
	stats.setMode(0);

	// scene.add(new THREE.AxesHelper(5));

	document.getElementById('stats').appendChild(stats.domElement);
}

function createLights() {

	let point = new THREE.PointLight(0xffffff, 1);
	point.position.set(-150, 150, 150);
	scene.add(point);

	let amb = new THREE.AmbientLight(0xffffff, .9);
	scene.add(amb);
}

function createCube() {

	if (cube) scene.remove(cube.mesh);
	cube = new Rubic();
	scene.add(cube.mesh);

}

function desolveCube() {

	let min = 10, max = 20;

	let moves = ['u', 'l', 'r', 'b', 'd', 'f', 'u2', 'l2', 'r2', 'b2', 'd2', 'f2', "f'", "d'", "b'", "u'", "r'", "l'"];
	let iterations = Math.random() * (max - min) + min;
	let operations = [];
	for (let i = 0; i < iterations; i++) {
		operations.push(moves[Math.floor(Math.random() * moves.length)]);
	}
	cube.addOperationsByMass(operations);

}

function DoesColorsExistInCube(cube, colors) {
	let faces = cube.faces;
	
	let n = colors.length;
	let count = 0;
	if (faces.b !== '') count++;
	if (faces.l !== '') count++;
	if (faces.r !== '') count++;
	if (faces.u !== '') count++;
	if (faces.d !== '') count++;
	if (faces.f !== '') count++;
	if (count !== n) return false;
	for (let i = 0; i < n; i++) {
		if ((faces.b === colors[i]) || (faces.l === colors[i]) || (faces.r === colors[i]) ||
				(faces.u === colors[i]) || (faces.f === colors[i]) || (faces.d === colors[i])) count--;
	}
	return count === 0;
}

function find(colors) {
	let cubes = cube.cubes;
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			for (let k = -1; k < 2; k++) {
				if (i == 0 && j == 0 && k == 0) continue;
				if (DoesColorsExistInCube(cubes[i][j][k], colors)) return {x: i, y: j, z: k, faces: cubes[i][j][k].faces};
			}
		}
	}
	return false;
}

function makeFirstStep(faces, color) {

	let offset = {u: 'u', d: 'd'};
	let wr = {u: faces.u, d: faces.d, l: faces.l, r: faces.r, f: faces.f, b: faces.b};
	

	switch (color[1]) {
		case 'r':
			offset.f = 'f';
			offset.l = 'l';
			offset.b = 'b';
			offset.r = 'r'; [wr.f, wr.r, wr.b, wr.l] = [wr.f, wr.r, wr.b, wr.l];
			break;
		case 'b':
			offset.f = 'r';
			offset.l = 'f';
			offset.b = 'l';
			offset.r = 'b'; [wr.f, wr.r, wr.b, wr.l] = [wr.r, wr.b, wr.l, wr.f];
			break;
		case 'g':
			offset.f = 'l';
			offset.l = 'b';
			offset.b = 'r';
			offset.r = 'f'; [wr.f, wr.r, wr.b, wr.l] = [wr.l, wr.f, wr.r, wr.b];
			break;
		case 'o':
			offset.f = 'b';
			offset.l = 'r';
			offset.b = 'f';
			offset.r = 'l'; [wr.f, wr.r, wr.b, wr.l] = [wr.b, wr.l, wr.f, wr.r];
			break;
	} 

	

	if (wr.u === color[0]) {
		if (wr.l === color[1]) {
			cube.addOperationsByMass([offset.l + '2', offset.d, offset.f + '2']);
		} else if (wr.r === color[1]) {
			cube.addOperationsByMass([offset.r + '2', offset.d + "'", offset.f + '2']);
		} else if (wr.b === color[1]) {
			cube.addOperationsByMass([offset.b + '2', offset.d + "2", offset.f + '2']);
		} else if (wr.f === color[1]) {
		}
	} else if (wr.d === color[0]) {
		if (wr.l === color[1]) {
			cube.addOperationsByMass([offset.d, offset.f + '2']);
		} else if (wr.r === color[1]) {
			cube.addOperationsByMass([offset.d + "'", offset.f + '2']);
		} else if (wr.b === color[1]) {
			cube.addOperationsByMass([offset.d + "2", offset.f + '2']);
		} else if (wr.f === color[1]) {
			cube.addOperationsByMass([offset.f + '2']);
		}
	} else if (wr.b === color[0]) {
		if (wr.l === color[1]) {
			cube.addOperationsByMass([offset.u, offset.l, offset.u + "'"]);
		} else if (wr.r === color[1]) {
			cube.addOperationsByMass([offset.u + "'", offset.r + "'", offset.u]);
		} else if (wr.u === color[1]) {
			cube.addOperationsByMass([offset.b, offset.u, offset.l, offset.u + "'"]);
		} else if (wr.d === color[1]) {
			cube.addOperationsByMass([offset.b, offset.u + "'", offset.r + "'", offset.u, offset.b + "'"]);
		}
	} else if (wr.l === color[0]) {
		if (wr.u === color[1]) {
			cube.addOperationsByMass([offset.l, offset.f]);
		} else if (wr.b === color[1]) {
			cube.addOperationsByMass([offset.u + "2", offset.b + "'", offset.u + '2']);
		} else if (wr.f === color[1]) {
			cube.addOperationsByMass([offset.f]);
		} else if (wr.d === color[1]) {
			cube.addOperationsByMass([offset.l + "'", offset.f, offset.l]);
		}
	} else if (wr.r === color[0]) {
		if (wr.u === color[1]) {
			cube.addOperationsByMass([offset.r + "'", offset.f + "'"]);
		} else if (wr.b === color[1]) {
			cube.addOperationsByMass([offset.u + "2", offset.b, offset.u + '2']);
		} else if (wr.f === color[1]) {
			cube.addOperationsByMass([offset.f + "'"]);
		} else if (wr.d === color[1]) {
			cube.addOperationsByMass([offset.r, offset.f + "'", offset.r + "'"]);
		}
	} else if (wr.f === color[0]) {
		if (wr.u === color[1]) {
			cube.addOperationsByMass([offset.f, offset.u + "'", offset.r, offset.u]);
		} else if (wr.l === color[1]) {
			cube.addOperationsByMass([offset.u, offset.l + "'", offset.u + "'"]);
		} else if (wr.r === color[1]) {
			cube.addOperationsByMass([offset.u + "'", offset.r, offset.u]);
		} else if (wr.d === color[1]) {
			cube.addOperationsByMass([offset.f + "'", offset.u + "'", offset.r, offset.u]);
		}
	}
}

function makeFirstRow(faces, color) {

	let fs = {u: faces.u, d: faces.d, l: faces.l, r: faces.r, f: faces.f, b: faces.b};
	let offset = {u: 'u', l: 'l', r: 'r', b: 'b', d: 'd', f: 'f'};

	switch (color[1]) {
		case 'g':
			[fs.f, fs.r, fs.b, fs.l] = [fs.f, fs.r, fs.b, fs.l];
			break;
		case 'o':
			[fs.f, fs.r, fs.b, fs.l] = [fs.l, fs.f, fs.r, fs.b];
			[offset.f, offset.r, offset.b, offset.l] = [offset.l, offset.f, offset.r, offset.b]
			break;
		case 'b':
			[fs.f, fs.r, fs.b, fs.l] = [fs.b, fs.l, fs.f, fs.r];
			[offset.f, offset.r, offset.b, offset.l] = [offset.b, offset.l, offset.f, offset.r]
			break;
		case 'r':
			[fs.f, fs.r, fs.b, fs.l] = [fs.r, fs.b, fs.l, fs.f];
			[offset.f, offset.r, offset.b, offset.l] = [offset.r, offset.b, offset.l, offset.f]
			break;
	}

	function transform(s) {
		let res = '';
		for (let i = 0; i < s.length; i++) {
			if (typeof offset[s[i]] !== 'undefined') {
				res += offset[s[i]];
			} else {
				res += s[i];
			}
		}
		return res;
	}

	if (fs.u === color[0]) {
		if (fs.l === color[1]) {
		} else if (fs.f === color[1]) {
			cube.addOperationsByString(transform("r'd2rf'df"));
		} else if (fs.r === color[1]) {
			cube.addOperationsByString(transform("b'd'bd2f'df"));
		} else if (fs.b === color[1]) {
			cube.addOperationsByString(transform("l'd'ldf'df"));
		}
	} else if (fs.d === color[0]) {
		if (fs.l === color[1]) {
			cube.addOperationsByString(transform("d"));
		} else if (fs.f === color[1]) {
		} else if (fs.r === color[1]) {
			cube.addOperationsByString(transform("d'"));
		} else if (fs.b === color[1]) {
			cube.addOperationsByString(transform("d2"));
		}
		cube.addOperationsByString(transform("ld'l'f'd2f"));
	} else if (fs.l === color[0]) {
		if (fs.u === color[1]) {
			cube.addOperationsByString(transform("l'd2l2d'l'"));
		} else if (fs.f === color[1]) {
			cube.addOperationsByString(transform("ldl'd2f'df"));
		} else if (fs.d === color[1]) {
			cube.addOperationsByString(transform("d'f'df"));
		} else if (fs.b === color[1]) {
			cube.addOperationsByString(transform("d2ld'l'"));
		}
	} else if (fs.b === color[0]) {
		if (fs.u === color[1]) {
			cube.addOperationsByString(transform("b'd'bld'l'"));
		} else if (fs.l === color[1]) {
			cube.addOperationsByString(transform("bdb'd'f'df"));
		} else if (fs.d === color[1]) {
			cube.addOperationsByString(transform("f'df"));
		} else if (fs.r === color[1]) {
			cube.addOperationsByString(transform("ld2l'"));
		}
	} else if (fs.r === color[0]) {
		if (fs.u === color[1]) {
			cube.addOperationsByString(transform("r'd'rdld'l'"));
		} else if (fs.f === color[1]) {
			cube.addOperationsByString(transform("ld'l'"));
		} else if (fs.d === color[1]) {
			cube.addOperationsByString(transform("f'd2f"));
		} else if (fs.b === color[1]) {
			cube.addOperationsByString(transform("rdr'f'df"));
		}
	} else if (fs.f === color[0]) {
		if (fs.u === color[1]) {
			cube.addOperationsByString(transform("f'd'fd2ld'l'"));
		} else if (fs.l === color[1]) {
			cube.addOperationsByString(transform("dld'l'"));
		} else if (fs.d === color[1]) {
			cube.addOperationsByString(transform("d2f'df"));
		} else if (fs.r === color[1]) {
			cube.addOperationsByString(transform("fdf2d2f"));
		}
	}
}

function makeSecondRow(faces, color) {

	let fs = {u: faces.u, d: faces.d, l: faces.l, r: faces.r, f: faces.f, b: faces.b};
	let offset = {u: 'u', l: 'l', r: 'r', b: 'b', d: 'd', f: 'f'};

	switch (color[1]) {
		case 'r':
			[fs.f, fs.r, fs.b, fs.l] = [fs.f, fs.r, fs.b, fs.l];
			break;
		case 'g':
			[fs.f, fs.r, fs.b, fs.l] = [fs.l, fs.f, fs.r, fs.b];
			[offset.f, offset.r, offset.b, offset.l] = [offset.l, offset.f, offset.r, offset.b]
			break;
		case 'o':
			[fs.f, fs.r, fs.b, fs.l] = [fs.b, fs.l, fs.f, fs.r];
			[offset.f, offset.r, offset.b, offset.l] = [offset.b, offset.l, offset.f, offset.r]
			break;
		case 'b':
			[fs.f, fs.r, fs.b, fs.l] = [fs.r, fs.b, fs.l, fs.f];
			[offset.f, offset.r, offset.b, offset.l] = [offset.r, offset.b, offset.l, offset.f]
			break;
	}

	function transform(s) {
		let res = '';
		for (let i = 0; i < s.length; i++) {
			if (typeof offset[s[i]] !== 'undefined') {
				res += offset[s[i]];
			} else {
				res += s[i];
			}
		}
		return res;
	}
	// function transform2(s, base) { 
	// 	switch base
	// 	let res = '';
	// 	for (let i = 0; i < s.length; i++) {
	// 		if (typeof offset[s[i]] !== 'undefined') {
	// 			res += offset[s[i]];
	// 		} else {
	// 			res += s[i];
	// 		}
	// 	}
	// 	return res;
	// }

	if (fs.d === color[0]) {
		if (fs.l === color[1]) {
			cube.addOperationsByString(transform("d"));
		} else if (fs.f === color[1]) {
		} else if (fs.r === color[1]) {
			cube.addOperationsByString(transform("d'"));
		} else if (fs.b === color[1]) {
			cube.addOperationsByString(transform("d2"));
		}
		cube.addOperationsByString(transform("dld'l'd'f'df"));
	} else if (fs.d === color[1]) {
		if (fs.l === color[0]) {
		} else if (fs.f === color[0]) {
			cube.addOperationsByString(transform("d'"));
		} else if (fs.r === color[0]) {
			cube.addOperationsByString(transform("d2"));
		} else if (fs.b === color[0]) {
			cube.addOperationsByString(transform("d"));
		}
		cube.addOperationsByString(transform("d'f'dfdld'l'"));
	} else if ((fs.l === color[0] && fs.f === color[1])) {
	} else if ((fs.l === color[1] && fs.f === color[0])) {
		cube.addOperationsByString(transform("dld'l'd'f'dfd'ld'l'd'f'df"));
	} else if ((fs.r === color[0] && fs.f === color[1])) {
		cube.addOperationsByString(transform("dfd'f'd'r'drd2ld'l'd'f'df"));
	} else if ((fs.r === color[1] && fs.f === color[0])) {
		cube.addOperationsByString(transform("dfd'f'd'r'drd'f'dfdld'l'"));
	} else if ((fs.l === color[0] && fs.b === color[1])) {
		cube.addOperationsByString(transform("d'l'dldbd'b'd2f'dfdld'l'"));
	} else if ((fs.l === color[1] && fs.b === color[0])) {
		cube.addOperationsByString(transform("d'l'dldbd'b'dld'l'd'f'df"));
	} else if ((fs.r === color[0] && fs.b === color[1])) {
		cube.addOperationsByString(transform("d'b'dbdrd'r'd2ld'l'd'f'df"));
	} else if ((fs.r === color[1] && fs.b === color[0])) {
		cube.addOperationsByString(transform("d'b'dbdrd'r'd'f'dfdld'l'"));
	}

}


function makeSecondCross() {

	let fs = [];
	for (let i = -1; i < 2; i++) {
		fs[i] = [];
		for (let j = -1; j < 2; j++) {
			fs[i][j] = cube.cubes[-i][-1][j].faces.d === 'y';
		}
	}

	let offset = {
		u: 'd',
		d: 'u',
		l: 'r',
		r: 'l',
		f: 'f',
		b: 'b'
	};

	function transform(s) {
		let res = '';
		for (let i = 0; i < s.length; i++) {
			if (typeof offset[s[i]] !== 'undefined') {
				res += offset[s[i]];
			} else {
				res += s[i];
			}
		}
		return res;
	}

	if (fs[-1][0] && !fs[0][-1] && !fs[0][1] && fs[1][0]) {
		cube.addOperationsByString(transform("frur'u'f'"));
	} else if (!fs[-1][0] && fs[0][-1] && fs[0][1] && !fs[1][0]) {
		cube.addOperationsByString(transform("ufrur'u'f'"));
	} else if (fs[-1][0] && fs[0][-1] && !fs[0][1] && !fs[1][0]) {
		cube.addOperationsByString(transform("frur'u'rur'u'f'"));
	} else if (!fs[-1][0] && fs[0][-1] && !fs[0][1] && fs[1][0]) {
		cube.addOperationsByString(transform("u'frur'u'rur'u'f'"));
	} else if (!fs[-1][0] && !fs[0][-1] && fs[0][1] && fs[1][0]) {
		cube.addOperationsByString(transform("u2frur'u'rur'u'f'"));
	} else if (fs[-1][0] && !fs[0][-1] && fs[0][1] && !fs[1][0]) {
		cube.addOperationsByString(transform("ufrur'u'rur'u'f'"));
	} else if (!fs[-1][0] && !fs[0][-1] && !fs[0][1] && !fs[1][0]) {
		cube.addOperationsByString(transform("frur'u'rur'u'f'ufrur'u'f'"));
	}

}

function DetermineYellowSituation(map) {
	
	if (map[-1][-1].u && map[-1][1].u && map[1][1].u && map[1][-1].u) {
		return 'done';
	}
	if (map[-1][-1].b && map[-1][1].f && map[1][-1].b && map[1][1].f) {
		return '3pifpuf';
	}
	if (map[-1][-1].l && map[-1][1].l && map[1][-1].r && map[1][1].r) {
		cube.addOperationsByString('d');
		return '3pifpuf';
	}
	if (map[-1][-1].u && map[-1][1].l && map[1][1].f && map[1][-1].r) {
		cube.addOperationsByString("d'");
		return 'fish';
	}
	if (map[-1][-1].b && map[-1][1].u && map[1][1].f && map[1][-1].r) {
		return 'fish';
	}
	if (map[-1][-1].b && map[-1][1].l && map[1][1].u && map[1][-1].r) {
		cube.addOperationsByString('d');
		return 'fish';
	}
	if (map[-1][-1].b && map[-1][1].l && map[1][1].f && map[1][-1].u) {
		cube.addOperationsByString("d2");
		return 'fish';
	}
	if (map[-1][-1].l && map[-1][1].l && map[1][1].f && map[1][-1].b) {
		return 'helicopter';
	}
	if (map[-1][-1].b && map[-1][1].l && map[1][1].r && map[1][-1].b) {
		cube.addOperationsByString("d'");
		return 'helicopter';
	}
	if (map[-1][-1].b && map[-1][1].f && map[1][1].r && map[1][-1].r) {
		cube.addOperationsByString("d2");
		return 'helicopter';
	}
	if (map[-1][-1].l && map[-1][1].f && map[1][1].f && map[1][-1].r) {
		cube.addOperationsByString("d");
		return 'helicopter';
	}
	if (map[-1][-1].b && map[-1][1].u && map[1][1].u && map[1][-1].b) {
		return 'eyes';
	}
	if (map[-1][-1].u && map[-1][1].u && map[1][1].r && map[1][-1].r) {
		cube.addOperationsByString("d'");
		return 'eyes';
	}
	if (map[-1][-1].u && map[-1][1].f && map[1][1].f && map[1][-1].u) {
		cube.addOperationsByString("d2");
		return 'eyes';
	}
	if (map[-1][-1].l && map[-1][1].l && map[1][1].u && map[1][-1].u) {
		cube.addOperationsByString("d");
		return 'eyes';
	}
	if (map[-1][-1].b && map[-1][1].f && map[1][1].u && map[1][-1].u) {
		return 'ears';
	}
	if (map[-1][-1].l && map[-1][1].u && map[1][1].u && map[1][-1].r) {
		cube.addOperationsByString("d'");
		return 'ears';
	}
	if (map[-1][-1].u && map[-1][1].u && map[1][1].f && map[1][-1].b) {
		cube.addOperationsByString("d2");
		return 'ears';
	}
	if (map[-1][-1].u && map[-1][1].l && map[1][1].r && map[1][-1].u) {
		cube.addOperationsByString("d");
		return 'ears';
	}
	if (map[-1][-1].u && map[-1][1].l && map[1][1].u && map[1][-1].b) {
		return 'eights';
	}
	if (map[-1][-1].b && map[-1][1].u && map[1][1].r && map[1][-1].u) {
		cube.addOperationsByString("d'");
		return 'eights';
	}
	if (map[-1][-1].u && map[-1][1].f && map[1][1].u && map[1][-1].r) {
		cube.addOperationsByString("d2");
		return 'eights';
	}
	if (map[-1][-1].l && map[-1][1].u && map[1][1].f && map[1][-1].u) {
		cube.addOperationsByString("d");
		return 'eights';
	}
	if (map[-1][-1].l && map[-1][1].f && map[1][1].r && map[1][-1].u) {
		return 'unfish';
	}
	if (map[-1][-1].l && map[-1][1].f && map[1][1].u && map[1][-1].b) {
		cube.addOperationsByString("d'");
		return 'unfish';
	}
	if (map[-1][-1].l && map[-1][1].u && map[1][1].r && map[1][-1].b) {
		cube.addOperationsByString("d2");
		return 'unfish';
	}
	if (map[-1][-1].u && map[-1][1].f && map[1][1].r && map[1][-1].b) {
		cube.addOperationsByString("d");
		return 'unfish';
	}
}

function makeTrueYellow() {

	let fs = [];
	for (let i = -1; i < 2; i++) {
		fs[i] = [];
		for (let j = -1; j < 2; j++) {
			fs[i][j] = {u: cube.cubes[-i][-1][j].faces.d === 'y', r: cube.cubes[-i][-1][j].faces.l === 'y',
									l: cube.cubes[-i][-1][j].faces.r === 'y', f: cube.cubes[-i][-1][j].faces.f === 'y',
									b: cube.cubes[-i][-1][j].faces.b === 'y'};
		}
	}

	let offset = {
		u: 'd',
		d: 'u',
		l: 'r',
		r: 'l',
		f: 'f',
		b: 'b'
	};

	function transform(s) {
		let res = '';
		for (let i = 0; i < s.length; i++) {
			if (typeof offset[s[i]] !== 'undefined') {
				res += offset[s[i]];
			} else {
				res += s[i];
			}
		}
		return res;
	}

	let situation = DetermineYellowSituation(fs);

	switch (situation) {
		case '3pifpuf':
			cube.addOperationsByString(transform("frur'u'rur'u'rur'u'f'"));
			break;
		case 'fish':
			cube.addOperationsByString(transform("rur'uru2r'"));
			break;
		case 'helicopter':
			cube.addOperationsByString(transform("ru2r2u'r2u'r2u2r"));
			break;
		case 'eyes':
			cube.addOperationsByString(transform("r2d'ru2r'dru2r"));
			break;
		case 'ears':
			cube.addOperationsByString(transform("lfr'f'l'frf'"));
			break;
		case 'eights':
			cube.addOperationsByString(transform("r'f'l'frf'lf"));
			break;
		case 'unfish':
			cube.addOperationsByString(transform("ru2r'u'ru'r'"));
			break;
	}
}

function makeTopCorners() {

	let fs = [];
	for (let i = -1; i < 2; i++) {
		fs[i] = [];
		for (let j = -1; j < 2; j++) {
			fs[i][j] = {r: cube.cubes[-i][-1][j].faces.l,	l: cube.cubes[-i][-1][j].faces.r,
									f: cube.cubes[-i][-1][j].faces.f,	b: cube.cubes[-i][-1][j].faces.b};
		}
	}

	let offset = {
		u: 'd',
		d: 'u',
		l: 'r',
		r: 'l',
		f: 'f',
		b: 'b'
	};

	function transform(s) {
		let res = '';
		for (let i = 0; i < s.length; i++) {
			if (typeof offset[s[i]] !== 'undefined') {
				res += offset[s[i]];
			} else {
				res += s[i];
			}
		}
		return res;
	}

	let situation = '';
	let colorString = 'rgob';

	if (fs[-1][-1].u === 'y' && fs[-1][1].u === 'y' && fs[1][-1].u === 'y' && fs[1][1].u === 'y') {
		situation = 'done'
	} else if (fs[-1][-1].l === fs[-1][1].l && fs[1][-1].r !== fs[1][1].r) {
		situation = 'straight';
	} else if (fs[-1][-1].b === fs[1][-1].b && fs[-1][1].f !== fs[1][1].f) {
		cube.addOperationsByString("d'");
		situation = 'straight';
	} else if (fs[1][-1].r === fs[1][1].r && fs[-1][-1].l !== fs[-1][1].l) {
		cube.addOperationsByString("d2");
		situation = 'straight';
	} else if (fs[-1][1].f === fs[1][1].f && fs[-1][-1].b !== fs[1][-1].b) {
		cube.addOperationsByString("d");
		situation = 'straight';
	} else {
		let index;
		for (let i = 0; i < 4; i++) {
			if (colorString[i] === fs[-1][1].f) index = i;
		}
		if (fs[1][-1].b === colorString[(index + 2) % 4] && fs[-1][1].f !== fs[1][1].f) {
			situation = 'cross';
		}
		for (let i = 0; i < 4; i++) {
			if (colorString[i] === fs[1][1].f) index = i;
		}
		if (fs[-1][-1].b === colorString[(index + 2) % 4] && fs[-1][1].f !== fs[1][1].f) {
			cube.addOperationsByString("d");
			situation = 'cross';
		}
	}

	switch (situation) {
		case 'straight':
			cube.addOperationsByString(transform("ru2r'u'ru2l'ur'u'l"));
			break;
		case 'cross':
			cube.addOperationsByString(transform("fru'r'u'rur'f'rur'u'r'frf'"));
			break;
	}
}

function makeTopMiddles() {

	let fs = [];
	for (let i = -1; i < 2; i++) {
		fs[i] = [];
		for (let j = -1; j < 2; j++) {
			fs[i][j] = {r: cube.cubes[-i][-1][j].faces.l,	l: cube.cubes[-i][-1][j].faces.r,
									f: cube.cubes[-i][-1][j].faces.f,	b: cube.cubes[-i][-1][j].faces.b};
		}
	}

	let offset = {
		u: 'd',
		d: 'u',
		l: 'r',
		r: 'l',
		f: 'f',
		b: 'b'
	};

	function transform(s) {
		let res = '';
		for (let i = 0; i < s.length; i++) {
			if (typeof offset[s[i]] !== 'undefined') {
				res += offset[s[i]];
			} else {
				res += s[i];
			}
		}
		return res;
	}

	let situation = '';

	if (fs[-1][1].f === fs[0][1].f && fs[-1][-1].b === fs[0][-1].b) {
		situation = 'done';
	} else if (fs[-1][1].f === fs[0][1].f) {
		if (fs[0][-1].b === fs[1][-1].r) {
			situation = 'triangle';
		} else {
			situation = 'reversedtriangle';
		}
		cube.addOperationsByString(transform("u2"));
	} else if (fs[-1][0].l === fs[-1][-1].l) {
		if (fs[1][0].r === fs[-1][1].f) {
			situation = 'triangle';
		} else {
			situation = 'reversedtriangle';
		}
		cube.addOperationsByString(transform("u"));
	} else if (fs[1][0].r === fs[1][-1].r) {
		if (fs[-1][0].l === fs[-1][-1].b) {
			situation = 'triangle';
		} else {
			situation = 'reversedtriangle';
		}
		cube.addOperationsByString(transform("u'"));
	} else if (fs[-1][-1].b === fs[0][-1].b) {
		if (fs[0][1].f === fs[-1][1].l) {
			situation = 'triangle';
		} else {
			situation = 'reversedtriangle';
		}
	} else if (fs[0][1].f === fs[1][1].r && fs[-1][0].l === fs[-1][-1].b) {
		situation = 'skies';
	} else if (fs[0][1].f === fs[-1][1].l && fs[1][0].r === fs[-1][-1].b) {
		cube.addOperationsByString(transform("u"));
		situation = 'skies';
	} else if (fs[0][1].f === fs[-1][-1].b && fs[-1][0].l === fs[1][1].r) {
		situation = 'cross';
	}

	switch (situation) {
		case 'triangle':
			cube.addOperationsByString(transform("r2urur'u'r'u'r'ur'"));
			break;
		case 'reversedtriangle':
			cube.addOperationsByString(transform("ru'rururu'r'u'r2"));
			break;
		case 'skies':
			cube.addOperationsByString(transform("ru'rururu'r'u'r2"));
			cube.addOperationsByString(transform("u'"));
			cube.addOperationsByString(transform("ru'rururu'r'u'r2"));
			break;
		case 'cross':
			cube.addOperationsByString(transform("ru'rururu'r'u'r2"));
			cube.addOperationsByString(transform("u"));
			cube.addOperationsByString(transform("ru'rururu'r'u'r2"));
			break;
	}
}

function moveLastRow() {
	if (cube.cubes[0][-1][1].faces.f === 'r') {
	} else if (cube.cubes[0][-1][1].faces.f === 'g') {
		cube.addOperationsByString("d'");
	} else if (cube.cubes[0][-1][1].faces.f === 'o') {
		cube.addOperationsByString("d2");
	} else if (cube.cubes[0][-1][1].faces.f === 'b') {
		cube.addOperationsByString("d");
	}
}

function solveCube() {

	cube.addDeferFunction(makeFirstStep.bind(null, find('wr').faces, 'wr'));
	cube.addDeferFunction(makeFirstStep.bind(null, find('wg').faces, 'wg'));
	cube.addDeferFunction(makeFirstStep.bind(null, find('wb').faces, 'wb'));
	cube.addDeferFunction(makeFirstStep.bind(null, find('wo').faces, 'wo'));
	
	cube.addDeferFunction(makeFirstRow.bind(null, find('wgr').faces, 'wgr'));
	cube.addDeferFunction(makeFirstRow.bind(null, find('wog').faces, 'wog'));
	cube.addDeferFunction(makeFirstRow.bind(null, find('wbo').faces, 'wbo'));
	cube.addDeferFunction(makeFirstRow.bind(null, find('wrb').faces, 'wrb'));

	cube.addDeferFunction(makeSecondRow.bind(null, find('gr').faces, 'gr'));
	cube.addDeferFunction(makeSecondRow.bind(null, find('og').faces, 'og'));
	cube.addDeferFunction(makeSecondRow.bind(null, find('bo').faces, 'bo'));
	cube.addDeferFunction(makeSecondRow.bind(null, find('rb').faces, 'rb'));

	cube.addDeferFunction(makeSecondCross);
	cube.addDeferFunction(makeTrueYellow);

	cube.addDeferFunction(makeTopCorners);

	cube.addDeferFunction(makeTopMiddles);
	cube.addDeferFunction(moveLastRow);
}

function rotate(obj, vector, rad) {
	rotMatrix = new THREE.Matrix4();
	rotMatrix.makeRotationAxis(vector.normalize(), rad);

	let cp = new THREE.Vector4(obj.position.x, obj.position.y, obj.position.z, 1);
	let newp = cp.applyMatrix4(rotMatrix);

	rotMatrix.multiply(obj.matrix);
	obj.matrix = rotMatrix;
	obj.rotation.setFromRotationMatrix(obj.matrix);

	obj.position.x = newp.x;
	obj.position.y = newp.y;
	obj.position.z = newp.z;
}

function highlight(obj) {
	obj.material.forEach(e => {e.color.setHex(0xffffff)});
}

function loop() {

	cube.exec();

  orbitControls.update(clock.getDelta());
	stats.update();

	renderer.render(scene, camera);
	requestAnimationFrame(loop);

}