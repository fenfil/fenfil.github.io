class Rubic {
	constructor() {
		let size = 30;

		this.isExecuting = false;
		this.step = 0;
		this.operation = '';
		this.operationString = '';
		this.operationindex = 0;

		this.mesh = new THREE.Object3D();
		
		this.cubes = [];
		for (let i = -1; i < 2; i++) {
			this.cubes[i] = [];
			for (let j = -1; j < 2; j++) {
				this.cubes[i][j] = [];
				for (let k = -1; k < 2; k++) {
					let colors = [new THREE.Color('blue'), new THREE.Color('green'), new THREE.Color('white'),
									new THREE.Color('yellow'), new THREE.Color('red'), new THREE.Color('orange'), new THREE.Color(0x404040)];
					let materials = [];
					colors.forEach(e => materials.push(new THREE.MeshPhongMaterial({color: e})));
					if (i == 0 && j == 0 && k == 0) continue;
					let a = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), materials);
					for (let index = 0; index < 6; index++) {
						a.geometry.faces[index * 2].materialIndex = index;
						a.geometry.faces[index * 2 + 1].materialIndex = index;
					}
					if (i != 1) {a.geometry.faces[0].materialIndex = a.geometry.faces[1].materialIndex = 6}
					if (i != -1) {a.geometry.faces[2].materialIndex = a.geometry.faces[3].materialIndex = 6}
					if (j != 1) {a.geometry.faces[4].materialIndex = a.geometry.faces[5].materialIndex = 6}
					if (j != -1) {a.geometry.faces[6].materialIndex = a.geometry.faces[7].materialIndex = 6}
					if (k != 1) {a.geometry.faces[8].materialIndex = a.geometry.faces[9].materialIndex = 6}
					if (k != -1) {a.geometry.faces[10].materialIndex = a.geometry.faces[11].materialIndex = 6}

					a.position.set(i * size + i * 5, j * size + j * 5, k * size + k * 5);
					this.mesh.add(a);
					this.cubes[i][j][k] = a;
				}
			}
		}
	}
	setOperation(s) {
		this.operation = s;
	}
	setOperationString(s) {
		this.operationindex = 0;
		this.operationString = s;
	}
	increaseOperationIndex() {
		this.operationindex++;
	}
	exec() {
		let maxstep = 10;
		switch (this.operationString[this.operationindex]) {
			case 'u':
				this.u(Math.PI / 2 / maxstep);
				this.step++;
				if (this.step === maxstep) {
					this.step = 0; this.uUpdate(); this.increaseOperationIndex();
				}
				break;
			case 'l':
				this.l(Math.PI / 2 / maxstep);
				this.step++;
				if (this.step === maxstep) {
					this.step = 0; this.lUpdate(); this.increaseOperationIndex();
				}
				break;
			case 'r':
				this.r(Math.PI / 2 / maxstep);
				this.step++;
				if (this.step === maxstep) {
					this.step = 0; this.rUpdate(); this.increaseOperationIndex();
				}
				break;
			case 'd':
				this.d(Math.PI / 2 / maxstep);
				this.step++;
				if (this.step === maxstep) {
					this.step = 0; this.dUpdate(); this.increaseOperationIndex();
				}
				break;
			case 'b':
				this.b(Math.PI / 2 / maxstep);
				this.step++;
				if (this.step === maxstep) {
					this.step = 0; this.bUpdate(); this.increaseOperationIndex();
				}
				break;
			case 'f':
				this.f(Math.PI / 2 / maxstep);
				this.step++;
				if (this.step === maxstep) {
					this.step = 0; this.fUpdate(); this.increaseOperationIndex();
				}
				break;
			default:
				break;
		}
	}
	u(deg = Math.PI) {
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				rotate(this.cubes[i][1][j], new THREE.Vector3(0, -1, 0), deg);
			}
		}
	}
	uUpdate() {
		[
		this.cubes[-1][1][-1], this.cubes[-1][1][1], this.cubes[1][1][1], this.cubes[1][1][-1],
		this.cubes[0][1][1], this.cubes[0][1][-1], this.cubes[-1][1][0], this.cubes[1][1][0]
		] = [
		this.cubes[-1][1][1], this.cubes[1][1][1], this.cubes[1][1][-1], this.cubes[-1][1][-1],
		this.cubes[1][1][0], this.cubes[-1][1][0], this.cubes[0][1][1], this.cubes[0][1][-1]
		];
	}
	l(deg) {
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				rotate(this.cubes[-1][i][j], new THREE.Vector3(1, 0, 0), deg);
			}
		}
	}
	lUpdate() {
		[this.cubes[-1][-1][-1], this.cubes[-1][1][-1], this.cubes[-1][1][1], this.cubes[-1][-1][1],
		this.cubes[-1][1][0], this.cubes[-1][0][1], this.cubes[-1][-1][0], this.cubes[-1][0][-1]] = [
		this.cubes[-1][-1][1], this.cubes[-1][-1][-1], this.cubes[-1][1][-1], this.cubes[-1][1][1],
		this.cubes[-1][0][-1], this.cubes[-1][1][0], this.cubes[-1][0][1], this.cubes[-1][-1][0]
		];
	}
	r(deg) {
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				rotate(this.cubes[1][i][j], new THREE.Vector3(-1, 0, 0), deg);
			}
		}
	}
	rUpdate() {
		[this.cubes[1][-1][-1], this.cubes[1][1][-1], this.cubes[1][1][1], this.cubes[1][-1][1],
		this.cubes[1][1][0], this.cubes[1][0][1], this.cubes[1][-1][0], this.cubes[1][0][-1]] = [
		this.cubes[1][1][-1], this.cubes[1][1][1], this.cubes[1][-1][1], this.cubes[1][-1][-1],
		this.cubes[1][0][1], this.cubes[1][-1][0], this.cubes[1][0][-1], this.cubes[1][1][0]
		];
	}
	f(deg) {
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				rotate(this.cubes[j][i][1], new THREE.Vector3(0, 0, -1), deg);
			}
		}
	}
	fUpdate() {
		[this.cubes[-1][-1][1], this.cubes[1][-1][1], this.cubes[1][1][1], this.cubes[-1][1][1],
		this.cubes[0][-1][1], this.cubes[1][0][1], this.cubes[0][1][1], this.cubes[-1][0][1]] = [
		this.cubes[1][-1][1], this.cubes[1][1][1], this.cubes[-1][1][1], this.cubes[-1][-1][1],
		this.cubes[1][0][1], this.cubes[0][1][1], this.cubes[-1][0][1], this.cubes[0][-1][1]
		];
	}
	b(deg) {
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				rotate(this.cubes[j][i][-1], new THREE.Vector3(0, 0, 1), deg);
			}
		}
	}
	bUpdate() {
		[
		this.cubes[-1][-1][-1], this.cubes[-1][1][-1], this.cubes[1][1][-1], this.cubes[1][-1][-1],
		this.cubes[-1][0][-1], this.cubes[0][1][-1], this.cubes[1][0][-1], this.cubes[0][-1][-1]
		] = [
		this.cubes[-1][1][-1], this.cubes[1][1][-1], this.cubes[1][-1][-1], this.cubes[-1][-1][-1],
		this.cubes[0][1][-1], this.cubes[1][0][-1], this.cubes[0][-1][-1], this.cubes[-1][0][-1]
		]
	}
	d(deg) {
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				rotate(this.cubes[j][-1][i], new THREE.Vector3(0, 1, 0), deg);
			}
		}
	}
	dUpdate() {
		[
		this.cubes[-1][-1][-1], this.cubes[1][-1][-1], this.cubes[1][-1][1], this.cubes[-1][-1][1],
		this.cubes[-1][-1][0], this.cubes[0][-1][-1], this.cubes[1][-1][0], this.cubes[0][-1][1]
		] = [
		this.cubes[1][-1][-1], this.cubes[1][-1][1], this.cubes[-1][-1][1], this.cubes[-1][-1][-1],
		this.cubes[0][-1][-1], this.cubes[1][-1][0], this.cubes[0][-1][1], this.cubes[-1][-1][0]
		];
	}
}