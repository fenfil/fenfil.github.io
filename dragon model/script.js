let camera, w, h, renderer, obj = [];
let count = 0;
let names = ['Dragon/Dragon/Dragon.obj'];
let t = 0;
var texture = new THREE.TextureLoader().load('Dragon/Dragon/Texture2.png');

init();

function init() {
	createScene();
	createLights();
	createObjects();
}

function createScene() {
	w = window.innerWidth;
	h = window.innerHeight;
	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera(50, w/h, 1, 10000);
	camera.position.y = -5;
	camera.position.z = 30;

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(w, h);
	renderer.shadowMap = true;

	document.body.appendChild(renderer.domElement);
	window.addEventListener('resize', handleWindowResize, false);
}

function createLights() {
	let point = new THREE.PointLight(0xffffff, .8, 1000);
	point.position.set(-20, -20, 20);
	scene.add(point);

	// let amb = new THREE.AmbientLight(0x404040);
	// scene.add(amb);
}

function handleWindowResize() {
	h = window.innerHeight;
	w = window.innerWidth;
	renderer.setSize(w, h);
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
}


function createObjects() {
	let loader = new THREE.OBJLoader;
	loader.load(names[0], onload);
}

function onload(e) {
	e.position.x = 0;
	obj = e;
	scene.add(e);
	obj.children[0].material = new THREE.MeshLambertMaterial({map: texture});
	obj.rotation.x = 0.4;
	obj.position.z = -100;
	loop();
}

function loop() {


	obj.rotation.x = 0.4 + Math.sin(t) / 10;
	t += 0.01;
	obj.position.z += 0.1;

	renderer.render(scene, camera);
	requestAnimationFrame(loop);

}