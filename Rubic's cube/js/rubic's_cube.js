class Rubic {
	constructor() {
		let size = 30;
		let offset = 5;

		this.isExecuting = false;
		this.step = 0;
		this.operations = [];
		this.operationString = '';
		this.operationIndex = 0;
		this.colors = [new THREE.Color('blue'), new THREE.Color('green'), new THREE.Color('white'),
									new THREE.Color('yellow'), new THREE.Color('red'), new THREE.Color('orange'), new THREE.Color(0x000000)];
		this.mesh = new THREE.Object3D();
		this.deferFunctions = [];
		this.cubes = [];
		for (let i = -1; i < 2; i++) {
			this.cubes[i] = [];
			for (let j = -1; j < 2; j++) {
				this.cubes[i][j] = [];
				for (let k = -1; k < 2; k++) {
					let materials = [];
					this.colors.forEach(e => materials.push(new THREE.MeshPhongMaterial({color: e})));
					if (i == 0 && j == 0 && k == 0) continue;
					let a = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), materials);
					a.faces = {u: 'w', l: 'g', r: 'b', f: 'r', b: 'o', d: 'y'};
					for (let index = 0; index < 6; index++) {
						a.geometry.faces[index * 2].materialIndex = index;
						a.geometry.faces[index * 2 + 1].materialIndex = index;
					}
					if (i != 1) {a.geometry.faces[0].materialIndex = a.geometry.faces[1].materialIndex = 6; a.faces.r = ''}
					if (i != -1) {a.geometry.faces[2].materialIndex = a.geometry.faces[3].materialIndex = 6; a.faces.l = ''}
					if (j != 1) {a.geometry.faces[4].materialIndex = a.geometry.faces[5].materialIndex = 6; a.faces.u = ''}
					if (j != -1) {a.geometry.faces[6].materialIndex = a.geometry.faces[7].materialIndex = 6; a.faces.d = ''}
					if (k != 1) {a.geometry.faces[8].materialIndex = a.geometry.faces[9].materialIndex = 6; a.faces.f = ''}
					if (k != -1) {a.geometry.faces[10].materialIndex = a.geometry.faces[11].materialIndex = 6; a.faces.b = ''}

					a.position.set(i * size + i * offset, j * size + j * offset, k * size + k * offset);
					a.rotateFacesOfBox = this.rotateFacesOfBox;
					this.mesh.add(a);
					this.cubes[i][j][k] = a;
				}
			}
		}
	}
	addOperationsByString(s) {
		let i = 0;
		while (i < s.length) {
			switch (s[i+1]) {
				case "'":
					this.operations.push(s[i] + s[i+1]); i+=2;
					break;
				case "2":
					this.operations.push(s[i] + s[i+1]); i+=2;
					break;
				default:
					this.operations.push(s[i]); i++;
					break;
			}
		}
	}
	addOperationsByMass(mas) {
		this.operations = this.operations.concat(mas);
	}
	addDeferFunction(f) {
		this.deferFunctions.push(f);
	}
	increaseOperationIndex() {
		this.operationIndex++;
	}
	exec() {
		if (this.operationIndex === this.operations.length && this.deferFunctions.length > 0) {
			this.deferFunctions.splice(0, 1)[0]();
		}
		let maxstep = 10;
		let maxdoublestep = Math.floor(maxstep * 1.5);

		switch (this.operations[this.operationIndex]) {
			case 'u':
				this.u(Math.PI / 2 / maxstep);this.step++;if (this.step === maxstep) {this.step = 0; this.update(this.operations[this.operationIndex]); this.increaseOperationIndex();}
				break;
			case 'l':
				this.l(Math.PI / 2 / maxstep);this.step++;if (this.step === maxstep) {this.step = 0; this.update(this.operations[this.operationIndex]); this.increaseOperationIndex();}
				break;
			case 'r':
				this.r(Math.PI / 2 / maxstep);this.step++;if (this.step === maxstep) {this.step = 0; this.update(this.operations[this.operationIndex]); this.increaseOperationIndex();}
				break;
			case 'd':
				this.d(Math.PI / 2 / maxstep);this.step++;if (this.step === maxstep) {this.step = 0; this.update(this.operations[this.operationIndex]); this.increaseOperationIndex();}
				break;
			case 'b':
				this.b(Math.PI / 2 / maxstep);this.step++;if (this.step === maxstep) {this.step = 0; this.update(this.operations[this.operationIndex]); this.increaseOperationIndex();}
				break;
			case 'f':
				this.f(Math.PI / 2 / maxstep);this.step++;if (this.step === maxstep) {this.step = 0; this.update(this.operations[this.operationIndex]); this.increaseOperationIndex();}
				break;
			case 'u2':
				this.u(Math.PI / maxdoublestep);this.step++;if (this.step === maxdoublestep) {this.step = 0; this.update(this.operations[this.operationIndex]); this.increaseOperationIndex();}
				break;
			case 'l2':
				this.l(Math.PI / maxdoublestep);this.step++;if (this.step === maxdoublestep) {this.step = 0; this.update(this.operations[this.operationIndex]); this.increaseOperationIndex();}
				break;
			case 'r2':
				this.r(Math.PI / maxdoublestep);this.step++;if (this.step === maxdoublestep) {this.step = 0; this.update(this.operations[this.operationIndex]); this.increaseOperationIndex();}
				break;
			case 'd2':
				this.d(Math.PI / maxdoublestep);this.step++;if (this.step === maxdoublestep) {this.step = 0; this.update(this.operations[this.operationIndex]); this.increaseOperationIndex();}
				break;
			case 'b2':
				this.b(Math.PI / maxdoublestep);this.step++;if (this.step === maxdoublestep) {this.step = 0; this.update(this.operations[this.operationIndex]); this.increaseOperationIndex();}
				break;
			case 'f2':
				this.f(Math.PI / maxdoublestep);this.step++;if (this.step === maxdoublestep) {this.step = 0; this.update(this.operations[this.operationIndex]); this.increaseOperationIndex();}
				break;
			case "u'":
				this.u(-Math.PI / 2 / maxstep);this.step++;if (this.step === maxstep) {this.step = 0; this.update(this.operations[this.operationIndex]); this.increaseOperationIndex();}
				break;
			case "l'":
				this.l(-Math.PI / 2 / maxstep);this.step++;if (this.step === maxstep) {this.step = 0; this.update(this.operations[this.operationIndex]); this.increaseOperationIndex();}
				break;
			case "r'":
				this.r(-Math.PI / 2 / maxstep);this.step++;if (this.step === maxstep) {this.step = 0; this.update(this.operations[this.operationIndex]); this.increaseOperationIndex();}
				break;
			case "d'":
				this.d(-Math.PI / 2 / maxstep);this.step++;if (this.step === maxstep) {this.step = 0; this.update(this.operations[this.operationIndex]); this.increaseOperationIndex();}
				break;
			case "b'":
				this.b(-Math.PI / 2 / maxstep);this.step++;if (this.step === maxstep) {this.step = 0; this.update(this.operations[this.operationIndex]); this.increaseOperationIndex();}
				break;
			case "f'":
				this.f(-Math.PI / 2 / maxstep);this.step++;if (this.step === maxstep) {this.step = 0; this.update(this.operations[this.operationIndex]); this.increaseOperationIndex();}
				break;
			default:
				break;
		}

	}
	rotateFacesOfBox(axes, clockwise = true, times = 1) {
		switch (axes) {
			case 'x':
				if (times === 2) {
					[this.faces.u, this.faces.b, this.faces.d, this.faces.f] = [this.faces.d, this.faces.f, this.faces.u, this.faces.b];
				} else if (clockwise) {
					[this.faces.u, this.faces.b, this.faces.d, this.faces.f] = [this.faces.b, this.faces.d, this.faces.f, this.faces.u];
				} else {
					[this.faces.u, this.faces.b, this.faces.d, this.faces.f] = [this.faces.f, this.faces.u, this.faces.b, this.faces.d];
				}
				break;
			case 'y':
				if (times === 2) {
					[this.faces.f, this.faces.l, this.faces.b, this.faces.r] = [this.faces.b, this.faces.r, this.faces.f, this.faces.l];
				} else if (clockwise) {
					[this.faces.f, this.faces.l, this.faces.b, this.faces.r] = [this.faces.l, this.faces.b, this.faces.r, this.faces.f];
				} else {
					[this.faces.f, this.faces.l, this.faces.b, this.faces.r] = [this.faces.r, this.faces.f, this.faces.l, this.faces.b];
				}
				break;
			case 'z':
				if (times === 2) {
					[this.faces.r, this.faces.d, this.faces.l, this.faces.u] = [this.faces.l, this.faces.u, this.faces.r, this.faces.d];
				} else if (clockwise) {
					[this.faces.r, this.faces.d, this.faces.l, this.faces.u] = [this.faces.d, this.faces.l, this.faces.u, this.faces.r];
				} else {
					[this.faces.r, this.faces.d, this.faces.l, this.faces.u] = [this.faces.u, this.faces.r, this.faces.d, this.faces.l];
				}
				break;
		}
	}
	update(operation) {
		switch (operation) {
			case 'u':
				[
				this.cubes[-1][1][-1], this.cubes[-1][1][1], this.cubes[1][1][1], this.cubes[1][1][-1],
				this.cubes[0][1][1], this.cubes[1][1][0], this.cubes[0][1][-1], this.cubes[-1][1][0]
				] = [
				this.cubes[-1][1][1], this.cubes[1][1][1], this.cubes[1][1][-1], this.cubes[-1][1][-1],
				this.cubes[1][1][0], this.cubes[0][1][-1], this.cubes[-1][1][0], this.cubes[0][1][1]
				]; 

				[
				this.cubes[-1][1][-1], this.cubes[-1][1][1], this.cubes[1][1][1], this.cubes[1][1][-1],
				this.cubes[0][1][1], this.cubes[1][1][0], this.cubes[0][1][-1], this.cubes[-1][1][0]
				].forEach(e => {e.rotateFacesOfBox('y', false)});
				
				break;
			case 'l':
				[
				this.cubes[-1][-1][-1], this.cubes[-1][-1][1], this.cubes[-1][1][1], this.cubes[-1][1][-1],
				this.cubes[-1][1][0], this.cubes[-1][0][-1], this.cubes[-1][-1][0], this.cubes[-1][0][1]
				] = [
				this.cubes[-1][-1][1], this.cubes[-1][1][1], this.cubes[-1][1][-1], this.cubes[-1][-1][-1],
				this.cubes[-1][0][-1], this.cubes[-1][-1][0], this.cubes[-1][0][1], this.cubes[-1][1][0]
				];

				[
				this.cubes[-1][-1][-1], this.cubes[-1][-1][1], this.cubes[-1][1][1], this.cubes[-1][1][-1],
				this.cubes[-1][1][0], this.cubes[-1][0][-1], this.cubes[-1][-1][0], this.cubes[-1][0][1]
				].forEach(e => {e.rotateFacesOfBox('x')});
				break;
			case 'r':
				[
				this.cubes[1][-1][-1], this.cubes[1][1][-1], this.cubes[1][1][1], this.cubes[1][-1][1],
				this.cubes[1][1][0], this.cubes[1][0][1], this.cubes[1][-1][0], this.cubes[1][0][-1]
				] = [
				this.cubes[1][1][-1], this.cubes[1][1][1], this.cubes[1][-1][1], this.cubes[1][-1][-1],
				this.cubes[1][0][1], this.cubes[1][-1][0], this.cubes[1][0][-1], this.cubes[1][1][0]
				];

				[
				this.cubes[1][-1][-1], this.cubes[1][1][-1], this.cubes[1][1][1], this.cubes[1][-1][1],
				this.cubes[1][1][0], this.cubes[1][0][1], this.cubes[1][-1][0], this.cubes[1][0][-1]
				].forEach(e => {e.rotateFacesOfBox('x', false)});
				break;
			case 'f':
				[
				this.cubes[-1][-1][1], this.cubes[1][-1][1], this.cubes[1][1][1], this.cubes[-1][1][1],
				this.cubes[0][-1][1], this.cubes[1][0][1], this.cubes[0][1][1], this.cubes[-1][0][1]
				] = [
				this.cubes[1][-1][1], this.cubes[1][1][1], this.cubes[-1][1][1], this.cubes[-1][-1][1],
				this.cubes[1][0][1], this.cubes[0][1][1], this.cubes[-1][0][1], this.cubes[0][-1][1]
				];

				[
				this.cubes[-1][-1][1], this.cubes[1][-1][1], this.cubes[1][1][1], this.cubes[-1][1][1],
				this.cubes[0][-1][1], this.cubes[1][0][1], this.cubes[0][1][1], this.cubes[-1][0][1]
				].forEach(e => {e.rotateFacesOfBox('z', false)});
				break;
			case 'b':
				[
				this.cubes[-1][-1][-1], this.cubes[-1][1][-1], this.cubes[1][1][-1], this.cubes[1][-1][-1],
				this.cubes[-1][0][-1], this.cubes[0][1][-1], this.cubes[1][0][-1], this.cubes[0][-1][-1]
				] = [
				this.cubes[-1][1][-1], this.cubes[1][1][-1], this.cubes[1][-1][-1], this.cubes[-1][-1][-1],
				this.cubes[0][1][-1], this.cubes[1][0][-1], this.cubes[0][-1][-1], this.cubes[-1][0][-1]
				];

				[
				this.cubes[-1][-1][-1], this.cubes[-1][1][-1], this.cubes[1][1][-1], this.cubes[1][-1][-1],
				this.cubes[-1][0][-1], this.cubes[0][1][-1], this.cubes[1][0][-1], this.cubes[0][-1][-1]
				].forEach(e => {e.rotateFacesOfBox('z')});
				break;
			case 'd':
				[
				this.cubes[-1][-1][-1], this.cubes[1][-1][-1], this.cubes[1][-1][1], this.cubes[-1][-1][1],
				this.cubes[-1][-1][0], this.cubes[0][-1][-1], this.cubes[1][-1][0], this.cubes[0][-1][1]
				] = [
				this.cubes[1][-1][-1], this.cubes[1][-1][1], this.cubes[-1][-1][1], this.cubes[-1][-1][-1],
				this.cubes[0][-1][-1], this.cubes[1][-1][0], this.cubes[0][-1][1], this.cubes[-1][-1][0]
				];

				[
				this.cubes[-1][-1][-1], this.cubes[1][-1][-1], this.cubes[1][-1][1], this.cubes[-1][-1][1],
				this.cubes[-1][-1][0], this.cubes[0][-1][-1], this.cubes[1][-1][0], this.cubes[0][-1][1]
				].forEach(e => {e.rotateFacesOfBox('y')});
				break;
			case 'u2':
				[
				this.cubes[-1][1][-1], this.cubes[-1][1][1], this.cubes[1][1][1], this.cubes[1][1][-1],
				this.cubes[0][1][1], this.cubes[1][1][0], this.cubes[0][1][-1], this.cubes[-1][1][0]
				] = [
				this.cubes[1][1][1], this.cubes[1][1][-1], this.cubes[-1][1][-1], this.cubes[-1][1][1],
				this.cubes[0][1][-1], this.cubes[-1][1][0], this.cubes[0][1][1], this.cubes[1][1][0]
				];

				[
				this.cubes[-1][1][-1], this.cubes[-1][1][1], this.cubes[1][1][1], this.cubes[1][1][-1],
				this.cubes[0][1][1], this.cubes[1][1][0], this.cubes[0][1][-1], this.cubes[-1][1][0]
				].forEach(e => {e.rotateFacesOfBox('y', true, 2)});
				break;
			case 'l2':
				[
				this.cubes[-1][-1][-1], this.cubes[-1][-1][1], this.cubes[-1][1][1], this.cubes[-1][1][-1],
				this.cubes[-1][1][0], this.cubes[-1][0][-1], this.cubes[-1][-1][0], this.cubes[-1][0][1]
				] = [
				this.cubes[-1][1][1], this.cubes[-1][1][-1], this.cubes[-1][-1][-1], this.cubes[-1][-1][1],
				this.cubes[-1][-1][0], this.cubes[-1][0][1], this.cubes[-1][1][0], this.cubes[-1][0][-1]
				];


				[
				this.cubes[-1][-1][-1], this.cubes[-1][-1][1], this.cubes[-1][1][1], this.cubes[-1][1][-1],
				this.cubes[-1][1][0], this.cubes[-1][0][-1], this.cubes[-1][-1][0], this.cubes[-1][0][1]
				].forEach(e => {e.rotateFacesOfBox('x', true, 2)});
				break;
			case 'r2':
				[
				this.cubes[1][-1][-1], this.cubes[1][1][-1], this.cubes[1][1][1], this.cubes[1][-1][1],
				this.cubes[1][1][0], this.cubes[1][0][1], this.cubes[1][-1][0], this.cubes[1][0][-1]
				] = [
				this.cubes[1][1][1], this.cubes[1][-1][1], this.cubes[1][-1][-1], this.cubes[1][1][-1],
				this.cubes[1][-1][0], this.cubes[1][0][-1], this.cubes[1][1][0], this.cubes[1][0][1]
				];

				[
				this.cubes[1][-1][-1], this.cubes[1][1][-1], this.cubes[1][1][1], this.cubes[1][-1][1],
				this.cubes[1][1][0], this.cubes[1][0][1], this.cubes[1][-1][0], this.cubes[1][0][-1]
				].forEach(e => {e.rotateFacesOfBox('x', true, 2)});
				break;
			case 'f2':
				[
				this.cubes[-1][-1][1], this.cubes[1][-1][1], this.cubes[1][1][1], this.cubes[-1][1][1],
				this.cubes[0][-1][1], this.cubes[1][0][1], this.cubes[0][1][1], this.cubes[-1][0][1]
				] = [
				this.cubes[1][1][1], this.cubes[-1][1][1], this.cubes[-1][-1][1], this.cubes[1][-1][1],
				this.cubes[0][1][1], this.cubes[-1][0][1], this.cubes[0][-1][1], this.cubes[1][0][1]
				];

				[
				this.cubes[-1][-1][1], this.cubes[1][-1][1], this.cubes[1][1][1], this.cubes[-1][1][1],
				this.cubes[0][-1][1], this.cubes[1][0][1], this.cubes[0][1][1], this.cubes[-1][0][1]
				].forEach(e => {e.rotateFacesOfBox('z', true, 2)});
				break;
			case 'b2':
				[
				this.cubes[-1][-1][-1], this.cubes[-1][1][-1], this.cubes[1][1][-1], this.cubes[1][-1][-1],
				this.cubes[-1][0][-1], this.cubes[0][1][-1], this.cubes[1][0][-1], this.cubes[0][-1][-1]
				] = [
				this.cubes[1][1][-1], this.cubes[1][-1][-1], this.cubes[-1][-1][-1], this.cubes[-1][1][-1],
				this.cubes[1][0][-1], this.cubes[0][-1][-1], this.cubes[-1][0][-1], this.cubes[0][1][-1]
				];

				[
				this.cubes[-1][-1][-1], this.cubes[-1][1][-1], this.cubes[1][1][-1], this.cubes[1][-1][-1],
				this.cubes[-1][0][-1], this.cubes[0][1][-1], this.cubes[1][0][-1], this.cubes[0][-1][-1]
				].forEach(e => {e.rotateFacesOfBox('z', true, 2)});
				break;
			case 'd2':
				[
				this.cubes[-1][-1][-1], this.cubes[1][-1][-1], this.cubes[1][-1][1], this.cubes[-1][-1][1],
				this.cubes[-1][-1][0], this.cubes[0][-1][-1], this.cubes[1][-1][0], this.cubes[0][-1][1]
				] = [
				this.cubes[1][-1][1], this.cubes[-1][-1][1], this.cubes[-1][-1][-1], this.cubes[1][-1][-1],
				this.cubes[1][-1][0], this.cubes[0][-1][1], this.cubes[-1][-1][0], this.cubes[0][-1][-1]
				];

				[
				this.cubes[-1][-1][-1], this.cubes[1][-1][-1], this.cubes[1][-1][1], this.cubes[-1][-1][1],
				this.cubes[-1][-1][0], this.cubes[0][-1][-1], this.cubes[1][-1][0], this.cubes[0][-1][1]
				].forEach(e => {e.rotateFacesOfBox('y', true, 2)});
				break;
			case "u'":
				[
				this.cubes[-1][1][-1], this.cubes[-1][1][1], this.cubes[1][1][1], this.cubes[1][1][-1],
				this.cubes[0][1][1], this.cubes[1][1][0], this.cubes[0][1][-1], this.cubes[-1][1][0]
				] = [
				this.cubes[1][1][-1], this.cubes[-1][1][-1], this.cubes[-1][1][1], this.cubes[1][1][1],
				this.cubes[-1][1][0], this.cubes[0][1][1], this.cubes[1][1][0], this.cubes[0][1][-1]
				];

				[
				this.cubes[-1][1][-1], this.cubes[-1][1][1], this.cubes[1][1][1], this.cubes[1][1][-1],
				this.cubes[0][1][1], this.cubes[1][1][0], this.cubes[0][1][-1], this.cubes[-1][1][0]
				].forEach(e => {e.rotateFacesOfBox('y')});
				break;
			case "l'":
				[
				this.cubes[-1][-1][-1], this.cubes[-1][-1][1], this.cubes[-1][1][1], this.cubes[-1][1][-1],
				this.cubes[-1][1][0], this.cubes[-1][0][-1], this.cubes[-1][-1][0], this.cubes[-1][0][1]
				] = [
				this.cubes[-1][1][-1], this.cubes[-1][-1][-1], this.cubes[-1][-1][1], this.cubes[-1][1][1],
				this.cubes[-1][0][1], this.cubes[-1][1][0], this.cubes[-1][0][-1], this.cubes[-1][-1][0]
				];

				[
				this.cubes[-1][-1][-1], this.cubes[-1][-1][1], this.cubes[-1][1][1], this.cubes[-1][1][-1],
				this.cubes[-1][1][0], this.cubes[-1][0][-1], this.cubes[-1][-1][0], this.cubes[-1][0][1]
				].forEach(e => {e.rotateFacesOfBox('x', false)});
				break;
			case "r'":
				[
				this.cubes[1][-1][-1], this.cubes[1][1][-1], this.cubes[1][1][1], this.cubes[1][-1][1],
				this.cubes[1][1][0], this.cubes[1][0][1], this.cubes[1][-1][0], this.cubes[1][0][-1]
				] = [
				this.cubes[1][-1][1], this.cubes[1][-1][-1], this.cubes[1][1][-1], this.cubes[1][1][1],
				this.cubes[1][0][-1], this.cubes[1][1][0], this.cubes[1][0][1], this.cubes[1][-1][0]
				];

				[
				this.cubes[1][-1][-1], this.cubes[1][1][-1], this.cubes[1][1][1], this.cubes[1][-1][1],
				this.cubes[1][1][0], this.cubes[1][0][1], this.cubes[1][-1][0], this.cubes[1][0][-1]
				].forEach(e => {e.rotateFacesOfBox('x')});
				break;
			case "f'":
				[
				this.cubes[-1][-1][1], this.cubes[1][-1][1], this.cubes[1][1][1], this.cubes[-1][1][1],
				this.cubes[0][-1][1], this.cubes[1][0][1], this.cubes[0][1][1], this.cubes[-1][0][1]
				] = [
				this.cubes[-1][1][1], this.cubes[-1][-1][1], this.cubes[1][-1][1], this.cubes[1][1][1],
				this.cubes[-1][0][1], this.cubes[0][-1][1], this.cubes[1][0][1], this.cubes[0][1][1]
				];

				[
				this.cubes[-1][-1][1], this.cubes[1][-1][1], this.cubes[1][1][1], this.cubes[-1][1][1],
				this.cubes[0][-1][1], this.cubes[1][0][1], this.cubes[0][1][1], this.cubes[-1][0][1]
				].forEach(e => {e.rotateFacesOfBox('z')});
				break;
			case "b'":
				[
				this.cubes[-1][-1][-1], this.cubes[-1][1][-1], this.cubes[1][1][-1], this.cubes[1][-1][-1],
				this.cubes[-1][0][-1], this.cubes[0][1][-1], this.cubes[1][0][-1], this.cubes[0][-1][-1]
				] = [
				this.cubes[1][-1][-1], this.cubes[-1][-1][-1], this.cubes[-1][1][-1], this.cubes[1][1][-1],
				this.cubes[0][-1][-1], this.cubes[-1][0][-1], this.cubes[0][1][-1], this.cubes[1][0][-1]
				];

				[
				this.cubes[-1][-1][-1], this.cubes[-1][1][-1], this.cubes[1][1][-1], this.cubes[1][-1][-1],
				this.cubes[-1][0][-1], this.cubes[0][1][-1], this.cubes[1][0][-1], this.cubes[0][-1][-1]
				].forEach(e => {e.rotateFacesOfBox('z', false)});
				break;
			case "d'":
				[
				this.cubes[-1][-1][-1], this.cubes[1][-1][-1], this.cubes[1][-1][1], this.cubes[-1][-1][1],
				this.cubes[-1][-1][0], this.cubes[0][-1][-1], this.cubes[1][-1][0], this.cubes[0][-1][1]
				] = [
				this.cubes[-1][-1][1], this.cubes[-1][-1][-1], this.cubes[1][-1][-1], this.cubes[1][-1][1],
				this.cubes[0][-1][1], this.cubes[-1][-1][0], this.cubes[0][-1][-1], this.cubes[1][-1][0]
				];

				[
				this.cubes[-1][-1][-1], this.cubes[1][-1][-1], this.cubes[1][-1][1], this.cubes[-1][-1][1],
				this.cubes[-1][-1][0], this.cubes[0][-1][-1], this.cubes[1][-1][0], this.cubes[0][-1][1]
				].forEach(e => {e.rotateFacesOfBox('y', false)});
				break;
		}
 	}
	u(deg) {
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				rotate(this.cubes[i][1][j], new THREE.Vector3(0, -1, 0), deg);
			}
		}
	}
	l(deg) {
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				rotate(this.cubes[-1][i][j], new THREE.Vector3(1, 0, 0), deg);
			}
		}
	}
	r(deg) {
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				rotate(this.cubes[1][i][j], new THREE.Vector3(-1, 0, 0), deg);
			}
		}
	}
	f(deg) {
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				rotate(this.cubes[j][i][1], new THREE.Vector3(0, 0, -1), deg);
			}
		}
	}
	b(deg) {
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				rotate(this.cubes[j][i][-1], new THREE.Vector3(0, 0, 1), deg);
			}
		}
	}
	d(deg) {
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				rotate(this.cubes[j][-1][i], new THREE.Vector3(0, 1, 0), deg);
			}
		}
	}
}