let camera, w, h, renderer, container, box, orbitControls, clock, map, figures = [],
		colors = {black: 0x404040, white: 0xa0a0a0}, mouse = new THREE.Vector2(), INTERSECTED, raycaster, board, chosenFigure;

window.onload = init;

function init() {
	createScene();
	createLights();
	createMap();
	createLogic();
	loop();
}

function createScene() {
	w = window.innerWidth;
	h = window.innerHeight;
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(50, w/h, 1, 10000);
	camera.position.x = 105;
	camera.position.y = 105;
	camera.position.z = 400;

  orbitControls = new THREE.OrbitControls(camera);
  orbitControls.center = new THREE.Vector3(105, 50, 0);
  clock = new THREE.Clock();

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(w, h);
	renderer.shadowMap = true;

	raycaster = new THREE.Raycaster();

	container = document.getElementById('world');
	container.appendChild(renderer.domElement);
	window.addEventListener('resize', handleWindowResize, false);
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}

function onDocumentMouseMove(e) {
	e.preventDefault();
	mouse.x = ( e.clientX / w ) * 2 - 1;
	mouse.y = - ( e.clientY / h ) * 2 + 1;
}

function createLights() {
	let point = new THREE.PointLight(0xffffff, 1, 1000);
	point.position.set(105, 105, 100);
	scene.add(point);

	let amb = new THREE.AmbientLight(0x404040);
	scene.add(amb);
}

function handleWindowResize() {
	h = window.innerHeight;
	w = window.innerWidth;
	renderer.setSize(w, h);
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
}

function createMap() {

	let mapColors = [0x101010, 0xaaaaaa];
	let size = 30;
	map = new THREE.Object3D();
	board = [];
	for (let i = 0; i < 8; i++) {
		board[i] = [];
		for (let j = 0; j < 8; j++) {
			board[i][j] = null;
			let box = new THREE.Mesh(new THREE.BoxGeometry(size, size), new THREE.MeshLambertMaterial({color: mapColors[(i + j) % 2]}));
			box.position.set(j * size, i * size, 0);
			map.add(box);
			map.children[i * 8 + j].figure = null;
		}
	}
	// map.position.z = -3;   // TMP!!!
	map.position.y = -3;   // TMP!!!
	map.position.z = -105;   // TMP!!!
	scene.add(map);

	let squares = map.children;


	for (let i = 0; i < 8; i++) {
		board[1][i] = new Pawn({color: colors.white, x: i * 30, y: 30});
		board[6][i] = new Pawn({color: colors.black, x: i * 30, y: 30 * 6});
	}

	board[0][0] = new Rook({color: colors.white, x: 0, y: 0});
	board[0][7] = new Rook({color: colors.white, x: 210, y: 0});
	board[7][0] = new Rook({color: colors.black, x: 0, y: 210});
	board[7][7] = new Rook({color: colors.black, x: 210, y: 210});

	board[0][3] = new Queen({color: colors.white, x: 90, y: 0});
	board[7][4] = new Queen({color: colors.black, x: 120, y: 210});

	board[0][4] = new King({color: colors.white, x: 120, y: 0});
	board[7][3] = new King({color: colors.black, x: 90, y: 210});

	board[0][1] = new Knight({color: colors.white, x: 30, y: 0});
	board[0][6] = new Knight({color: colors.white, x: 180, y: 0});
	board[7][1] = new Knight({color: colors.black, x: 30, y: 210});
	board[7][6] = new Knight({color: colors.black, x: 180, y: 210});

	board[0][2] = new Bishop({color: colors.white, x: 60, y: 0});
	board[0][5] = new Bishop({color: colors.white, x: 150, y: 0});
	board[7][2] = new Bishop({color: colors.black, x: 60, y: 210});
	board[7][5] = new Bishop({color: colors.black, x: 150, y: 210});

  let tmp = new THREE.Object3D();    // TPM!!!
	tmp.position.z = 105;   // TMP!!!
  tmp.rotation.x = -Math.PI / 2;
  board.forEach(e => {
    e.forEach(e => {
      if (e) {
        tmp.add(e.mesh);
      }
    })
  });

  scene.add(tmp);

  map.rotation.x = Math.PI / 2;console.log(board);
}

function createLogic() {
}


function loop() {

  orbitControls.update(clock.getDelta() );
	camera.updateMatrixWorld();
	raycaster.setFromCamera(mouse, camera);

	let intersects = raycaster.intersectObjects(map.children);

	if (intersects.length > 0) { //

		if (INTERSECTED != intersects[0].object) {
			if (INTERSECTED) { // перешли с клетки на другую
				chosenFigure = board[intersects[0].object.position.y / 30][intersects[0].object.position.x / 30];
				INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
			}
			INTERSECTED = intersects[0].object;
			INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
			INTERSECTED.material.emissive.setHex(0xff0000);
		}

	} else {	// не выбрана клетка

		if (INTERSECTED) { // но была выбрана
			INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
		}
		chosenFigure = null;
		INTERSECTED = null;

	}

	renderer.render(scene, camera);
	requestAnimationFrame(loop);

}
