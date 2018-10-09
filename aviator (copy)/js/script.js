let camera, fieldOfView, aspectRatio, nearPlane, farPlane, w, h, renderer, container,
		hemisphereLight, shadowLight, sea, sky, airplane, mousePos = {x: 0, y: 0};

let Colors = {
	red: 0xf25346,
	white: 0xd8d0d1,
	brown: 0x59332e,
	pink: 0xF5986E,
	brownDark: 0x23190f,
	blue: 0x68c3c0,
};

window.onload = init;

function init() {
	createScene();
	createLights();
	createPlane();
	createSea();
	createSky();
	loop();
	document.addEventListener('mousemove', handleMouseMove);
}

function createScene() {
	w = window.innerWidth;
	h = window.innerHeight;
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
	fieldOfView = 60;
	aspectRatio = w / h;
	nearPlane = 1;
	farPlane = 10000;
	camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
	camera.position.x = 0;
	camera.position.y = 100;
	camera.position.z = 200;

	renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
	renderer.setSize(w, h);
	renderer.shadowMap = true;
	container = document.getElementById('world');
	container.appendChild(renderer.domElement);
	window.addEventListener('resize', handleWindowResize, false);
}
function handleWindowResize() {
	h = window.innerHeight;
	w = window.innerWidth;
	renderer.setSize(w, h);
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
}
function handleMouseMove(e) {
	let tx = -1 + (e.clientX / w) * 2;
	let ty = 1 - (e.clientY / h) * 2;
	mousePos = {x: tx, y: ty};
}
function updatePlane() {
	let targetY = normalize(mousePos.y,-.75,.75,25, 175);
	let targetX = normalize(mousePos.x,-.75,.75,-100, 100);
	
	airplane.mesh.position.y += (targetY-airplane.mesh.position.y)*0.1;
	airplane.mesh.position.x += (targetX-airplane.mesh.position.x)*0.1;
	airplane.mesh.rotation.z = (targetY-airplane.mesh.position.y)*0.0128;
	airplane.mesh.rotation.x = (airplane.mesh.position.y-targetY)*0.0064;
	airplane.propeller.rotation.x += 0.3;
}
function normalize(v, vmin, vmax, tmin, tmax) {
	let nv = Math.max(Math.min(v, vmax), vmin);
	let dv = vmax - vmin;
	let pc = (nv - vmin) / dv;
	let dt = tmax - tmin;
	let tv = tmin + (pc * dt);
	return tv;
}
function createLights() {
	hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
	shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
	shadowLight.position.set(150, 350, 350);
	shadowLight.castShadow = true;
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;
	ambientLight = new THREE.AmbientLight(0xdc8874, .5);
	scene.add(ambientLight);
	scene.add(hemisphereLight);
	scene.add(shadowLight);
}
function createSea() {
	sea = new Sea();
	sea.mesh.position.y = -600;
	scene.add(sea.mesh);
}
function createSky() {
	sky = new Sky();
	sky.mesh.position.y = -600
	scene.add(sky.mesh);
}
function createPlane() {
	airplane = new Airplane();
	airplane.mesh.scale.set(.25, .25, .25);
	airplane.mesh.position.y = 100;
	scene.add(airplane.mesh);
}
class Sea {
	constructor() {
		let geom = new THREE.CylinderGeometry(600,600,800,40,10);
		geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
		geom.mergeVertices();
		let l = geom.vertices.length;
		this.waves = [];

		for (let i=0; i<l; i++){
			let v = geom.vertices[i];

			this.waves.push({y:v.y,
											 x:v.x,
											 z:v.z,
											 ang:Math.random()*Math.PI*2,
											 amp:5 + Math.random()*15,
											 speed:0.016 + Math.random()*0.032
											});
		}
		
		let mat = new THREE.MeshPhongMaterial({
			color:Colors.blue,
			transparent:true,
			opacity:.8,
			flatShading:THREE.FlatShading,
		});

		this.mesh = new THREE.Mesh(geom, mat);
		this.mesh.receiveShadow = true;
	}
  moveWaves() {
	
	let verts = this.mesh.geometry.vertices;
	let l = verts.length;
	
	for (var i=0; i<l; i++){
		let v = verts[i];
		let vprops = this.waves[i];
		v.x = vprops.x + Math.cos(vprops.ang)*vprops.amp;
		v.y = vprops.y + Math.sin(vprops.ang)*vprops.amp;
		vprops.ang += vprops.speed;
	}

	this.mesh.geometry.verticesNeedUpdate=true;
	sea.mesh.rotation.z += .005;
}
}

class Cloud {
	constructor() {
		this.mesh = new THREE.Object3D();
		let geom = new THREE.BoxGeometry(20, 20, 20);
		let mat = new THREE.MeshPhongMaterial({color: Colors.white});
		let nBlocks = 3 + Math.floor(Math.random() * 3);
		for (let i = 0; i < nBlocks; i++) {
			let m = new THREE.Mesh(geom, mat);
			m.position.x = i * 15;
			m.position.y = Math.random() * 10;
			m.position.z = Math.random() * 10;
			m.rotation.z = Math.random() * Math.PI * 2;
			m.rotation.y = Math.random() * Math.PI * 2;
			let s = .1 + Math.random() * .9;
			m.scale.set(s, s, s);
			m.castShadow = true;
			m.receiveShadow = true;
			this.mesh.add(m);
		}
	}
}
class Sky {
	constructor() {
		this.mesh = new THREE.Object3D();
		this.nClouds = 20;
		let stepAngle = Math.PI * 2 / this.nClouds;
		for (let i = 0; i < this.nClouds; i++) {
			let c = new Cloud();
			let a =  	stepAngle * i;
			let h = 750 + Math.random() * 200;
			c.mesh.position.y = Math.sin(a) * h;
			c.mesh.position.x = Math.cos(a) * h;
			c.mesh.rotation.z = a + Math.PI / 2;
			c.mesh.position.z = -400 - Math.random() * 400;
			let s = 1 + Math.random() * 2;
			c.mesh.scale.set(s, s, s);
			this.mesh.add(c.mesh);
		}
	}
}
class Airplane {
	constructor() {
		this.mesh = new THREE.Object3D();
		let geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
		let matCockpit = new THREE.MeshPhongMaterial({color: Colors.red, flatShading: THREE.FlatShading});
		geomCockpit.vertices[4].y -= 10;
		geomCockpit.vertices[4].z += 20;
		geomCockpit.vertices[5].y -= 10;
		geomCockpit.vertices[5].z -= 20;
		geomCockpit.vertices[6].y += 30;
		geomCockpit.vertices[6].z += 20;
		geomCockpit.vertices[7].y += 30;
		geomCockpit.vertices[7].z -= 20;
		let cockpit = new THREE.Mesh(geomCockpit, matCockpit);
		cockpit.castShadow = true;
		cockpit.receiveShadow = true;
		this.mesh.add(cockpit);

		let geomEng = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
		let matEng = new THREE.MeshPhongMaterial({color: Colors.white, flatShading: THREE.FlatShading});
		let eng = new THREE.Mesh(geomEng, matEng);
		eng.position.x = 40;
		eng.castShadow = true;
		eng.receiveShadow = true;
		this.mesh.add(eng);

		let geomTail = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
		let matTail = new THREE.MeshPhongMaterial({color: Colors.red, flatShading: THREE.FlatShading});
		let tail = new THREE.Mesh(geomTail, matTail);
		tail.position.set(-35, 25, 0);
		tail.castShadow = true;
		tail.receiveShadow = true;
		this.mesh.add(tail);

		let geomWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
		let matWing = new THREE.MeshPhongMaterial({color: Colors.red, flatShading: THREE.FlatShading});
		let wing = new THREE.Mesh(geomWing, matWing);
		wing.castShadow = true;
		wing.receiveShadow = true;
		this.mesh.add(wing);

		let geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
		let matPropeller = new THREE.MeshPhongMaterial({color: Colors.brown, flatShading: THREE.FlatShading});
		this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
		this.propeller.castShadow = true;
		this.propeller.receiveShadow = true;

		let geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
		let matBlade = new THREE.MeshPhongMaterial({color: Colors.brownDark, flatShading: THREE.FlatShading});
		let blade = new THREE.Mesh(geomBlade, matBlade);
		blade.position.set(8, 0, 0);
		blade.castShadow = true;
		blade.receiveShadow = true;
		this.propeller.add(blade);
		this.propeller.position.set(50, 0,0);
		this.mesh.add(this.propeller);

		this.pilot = new Pilot();
		this.pilot.mesh.position.y = 30;
		this.mesh.add(this.pilot.mesh);
	}
}
class Pilot {
	constructor() {
		this.mesh = new THREE.Object3D();
		this.mesh.name = "pilot";
		
		this.angleHairs = 0;

		let bodyGeom = new THREE.BoxGeometry(15,15,15);
		let bodyMat = new THREE.MeshPhongMaterial({color:Colors.brown, flatShading:THREE.FlatShading});
		let body = new THREE.Mesh(bodyGeom, bodyMat);
		body.position.set(2,-12,0);
		this.mesh.add(body);

		let faceGeom = new THREE.BoxGeometry(10,10,10);
		let faceMat = new THREE.MeshLambertMaterial({color:Colors.pink});
		let face = new THREE.Mesh(faceGeom, faceMat);
		this.mesh.add(face);

		let hairGeom = new THREE.BoxGeometry(4,4,4);
		let hairMat = new THREE.MeshLambertMaterial({color:Colors.brown});
		let hair = new THREE.Mesh(hairGeom, hairMat);
		hair.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,2,0));
		
		let hairs = new THREE.Object3D();

		this.hairsTop = new THREE.Object3D();

		for (let i=0; i<12; i++){
			let h = hair.clone();
			let col = i%3;
			let row = Math.floor(i/3);
			let startPosZ = -4;
			let startPosX = -4;
			h.position.set(startPosX + row*4, 0, startPosZ + col*4);
			this.hairsTop.add(h);
		}
		hairs.add(this.hairsTop);

		let hairSideGeom = new THREE.BoxGeometry(12,4,2);
		hairSideGeom.applyMatrix(new THREE.Matrix4().makeTranslation(-6,0,0));
		let hairSideR = new THREE.Mesh(hairSideGeom, hairMat);
		let hairSideL = hairSideR.clone();
		hairSideR.position.set(8,-2,6);
		hairSideL.position.set(8,-2,-6);
		hairs.add(hairSideR);
		hairs.add(hairSideL);

		let hairBackGeom = new THREE.BoxGeometry(2,8,10);
		let hairBack = new THREE.Mesh(hairBackGeom, hairMat);
		hairBack.position.set(-1,-4,0)
		hairs.add(hairBack);
		hairs.position.set(-5,5,0);

		this.mesh.add(hairs);

		let glassGeom = new THREE.BoxGeometry(5,5,5);
		let glassMat = new THREE.MeshLambertMaterial({color:Colors.brown});
		let glassR = new THREE.Mesh(glassGeom,glassMat);
		glassR.position.set(6,0,3);
		let glassL = glassR.clone();
		glassL.position.z = -glassR.position.z

		let glassAGeom = new THREE.BoxGeometry(11,1,11);
		let glassA = new THREE.Mesh(glassAGeom, glassMat);
		this.mesh.add(glassR);
		this.mesh.add(glassL);
		this.mesh.add(glassA);

		let earGeom = new THREE.BoxGeometry(2,3,2);
		let earL = new THREE.Mesh(earGeom,faceMat);
		earL.position.set(0,0,-6);
		let earR = earL.clone();
		earR.position.set(0,0,6);
		this.mesh.add(earL);
		this.mesh.add(earR);
	}
	updateHair() {
		let hairs = this.hairsTop.children;

		let l = hairs.length;
		for (let i=0; i<l; i++){
			let h = hairs[i];
			h.scale.y = .75 + Math.cos(this.angleHairs+i/3)*.25;
		}
		this.angleHairs += 0.16;
	}
}



function loop() {
	updatePlane();
	airplane.pilot.updateHair();
	sea.moveWaves();
	sea.mesh.rotation.z += 0.005;
	sky.mesh.rotation.z += 0.01;
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}