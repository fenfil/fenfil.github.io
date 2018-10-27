let camera, w, h, renderer, container, stats, orbitControls, clock, cube;

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

function makefirststep(faces, color) {

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


function solveCube() {

	let operations = [];

	// let wg = find('wg').faces;
	
	// setTimeout(() => {makefirststep(find('wr').faces, 'wr');}, 1000);
	// setTimeout(() => {makefirststep(find('wg').faces, 'wg');}, 2000);
	// setTimeout(() => {makefirststep(find('wb').faces, 'wb');}, 3000);
	// setTimeout(() => {makefirststep(find('wo').faces, 'wo');}, 4000);

	// console.log(f);

	cube.addDeferFunction(makefirststep.bind(null, find('wr').faces, 'wr'));
	cube.addDeferFunction(makefirststep.bind(null, find('wg').faces, 'wg'));
	cube.addDeferFunction(makefirststep.bind(null, find('wb').faces, 'wb'));
	cube.addDeferFunction(makefirststep.bind(null, find('wo').faces, 'wo'));
	// makefirststep(find('wg').faces, 'wg');
	// makefirststep(find('wb').faces, 'wb');
	// makefirststep(find('wo').faces, 'wo');

	// cube.addOperationsByMass(operations);


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