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
	// scene.fog = new THREE.FogExp2(0x000000, 0.03);
	
	camera = new THREE.PerspectiveCamera(50, w/h, 1, 10000);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(w, h);
	renderer.setClearColor(0x000000);

	container = document.getElementById('world');
	container.appendChild(renderer.domElement);

	orbitControls = new THREE.OrbitControls(camera);
  // orbitControls.autoRotate = true;
  
  clock = new THREE.Clock();

	stats = new Stats;
	stats.setMode(0);

	scene.add(new THREE.AxesHelper(5));

	document.getElementById('stats').appendChild(stats.domElement);
}

function createLights() {

	let point = new THREE.PointLight(0xffffff, 5);
	point.position.set(-150, 150, 150);
	scene.add(point);

	let amb = new THREE.AmbientLight(0xffffff, .7);
	scene.add(amb);
}

function createCube() {

	camera.position.z = 250;
	cube = new Rubic();
	scene.add(cube.mesh);

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