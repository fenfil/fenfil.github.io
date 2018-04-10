window.onload = () => {
	let scene = new THREE.Scene();
	let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
	let renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor("#000000");
	document.body.appendChild( renderer.domElement );

	var geometry = new THREE.SphereGeometry( 2, 10, 10);
	var material = new THREE.MeshLambertMaterial({color: "#ff0b0b"});
	var sphere = new THREE.Mesh( geometry, material );
	sphere.castShadow = true;
	scene.add( sphere );

	var light = new THREE.PointLight( 0xffffff, 1.5, 100 );
	light.position.set( 10, 10, 10 );
	light.castShadow = true;
	scene.add( light );


	var light = new THREE.PointLight( 0xffffff, 0.7, 100 );
	light.position.set( -10, 10, 10 );
	scene.add( light );

	var amblight = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( amblight );



	var geometry = new THREE.PlaneGeometry(28, 15);
	var material = new THREE.MeshLambertMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
	var plane = new THREE.Mesh( geometry, material );
	plane.receiveShadow = true;
	scene.add( plane );

	// plane.rotation.x = Math.PI * 0.5;
	// plane.rotation.z = Math.PI * 0.1;
	// plane.position.x -= 1;
	sphere.position.z = 5;

	let cubes = [];
	let createCube = () => {
		let size = Math.random()* 0.5 + 1;
		let geometry = new THREE.BoxGeometry(size, size, size);
		let material = new THREE.MeshLambertMaterial( {color: Math.floor((Math.random() * 0.5 + 0.5) * 256 * 256 * 256 + (Math.random()/2 + 0.5) * 256 * 256 + (Math.random() * 0.5 + 0.5) * 256)} );
		let box = new THREE.Mesh( geometry, material );
		box.castShadow = true;
		box.position.x = Math.random() * 20 - 10;
		box.position.y = Math.random() * 10 - 5;
		box.position.z = Math.random();
		box.rotation.x = Math.random() * Math.PI / 4;
		box.rotation.y = Math.random() * Math.PI / 4;
		box.rotation.z = Math.random() * Math.PI / 4;
		return box;
	}

	for (let i = 0; i < 50; i++) {
		cubes.push({box:createCube(), x:Math.random() * 0.05, y: Math.random() * 0.05});
		scene.add(cubes[i].box);
	}

	camera.position.z = 7;
	// camera.position.x = ;
	camera.position.y = -15;
	camera.rotation.x = Math.PI / 2.5;
	// camera.lookAt(new THREE.Vector3(0, 0, 0));

	let s = {t: 0, r: 5};
	sphere.position.y = 3;

	let sphereRun = () => {
		sphere.position.x = s.r * Math.cos(s.t);
		sphere.position.y = s.r * Math.sin(s.t);
		s.t += 0.03;
	}

	let render = function () {
		requestAnimationFrame(render);
		// camera.position.y -= 0.1;
		// camera.rotation.x += 0.001;
		for (let i = 0; i < cubes.length; i++) {
			cubes[i].box.rotation.x += cubes[i].x;
			cubes[i].box.rotation.y += cubes[i].y;
		}
		renderer.render(scene, camera);
		sphere.rotation.z += 0.1;
		sphereRun();
	};

	render();
}