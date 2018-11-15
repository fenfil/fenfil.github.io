class Figure {
	constructor(x, y) {
		this.mesh = new THREE.Object3D();
		this.mesh.rotation.x = Math.PI / 2;
		this.mesh.position.x = x;
		this.mesh.position.y = y;
		scene.add(this.mesh);
		this.mesh.pointerToParent = 'asdasd';
	}
}

class King extends Figure {
	constructor({color: color, x: x, y: y}) {
		super(x, y);
		this.name = 'king';
		let mat = new THREE.MeshLambertMaterial({color: color});
		let top1 = new THREE.Mesh(new THREE.BoxGeometry(15, 5, 5), mat);
		let top2 = new THREE.Mesh(new THREE.BoxGeometry(5, 15, 5), mat);
		top1.position.y = top2.position.y = 78;
		let top3 = new THREE.Mesh(new THREE.CylinderGeometry(5, 15, 3), mat);
		top3.position.y = 70;
		let top4 = new THREE.Mesh(new THREE.CylinderGeometry(15, 15, 5), mat);
		top4.position.y = 66;
		let top5 = new THREE.Mesh(new THREE.CylinderGeometry(15, 5, 12), mat);
		top5.position.y = 58;
		let top6 = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 40), mat);
		top6.position.y = 32;
		let top7 = new THREE.Mesh(new THREE.CylinderGeometry(5, 15, 10), mat);
		top7.position.y = 7;
		let top8 = new THREE.Mesh(new THREE.CylinderGeometry(15, 15, 5), mat);

		this.mesh.add(top1);
		this.mesh.add(top2);
		this.mesh.add(top3);
		this.mesh.add(top4);
		this.mesh.add(top5);
		this.mesh.add(top6);
		this.mesh.add(top7);
		this.mesh.add(top8);
	}
}

class Queen extends Figure {
	constructor({color: color, x: x, y: y}) {
		
		super(x, y);
		this.name = 'queen';
		let mat = new THREE.MeshLambertMaterial({color: color});

		let top1 = new THREE.Mesh(new THREE.SphereGeometry(4, 8, 8), mat);
		top1.position.y = 66.5;
		let top2 = new THREE.Mesh(new THREE.CylinderGeometry(15, 7, 10), mat);
		top2.position.y = 60.5;

		for (let i = 0; i < 8; i++) {
			let x = 12 * Math.sin(i * Math.PI * 2 / 8);
			let z = 12 * Math.cos(i * Math.PI * 2 / 8);
			let top3 = new THREE.Mesh(new THREE.TetrahedronGeometry(3), mat);
			top3.position.set(x, 66, z);
			top3.rotation.x = -Math.PI / 4;
			top3.rotation.z = Math.PI / 4;
			this.mesh.add(top3);
		}

		let top3 = new THREE.Mesh(new THREE.CylinderGeometry(7, 10, 7), mat);
		top3.position.y = 52;
		let top4 = new THREE.Mesh(new THREE.CylinderGeometry(10, 14, 3), mat);
		top4.position.y = 47;
		let top5 = new THREE.Mesh(new THREE.CylinderGeometry(14, 14, 3), mat);
		top5.position.y = 44;
		let top6 = new THREE.Mesh(new THREE.CylinderGeometry(14, 7, 3), mat);
		top6.position.y = 41;
		let top7 = new THREE.Mesh(new THREE.CylinderGeometry(7, 4, 30), mat);
		top7.position.y = 25;
		let top8 = new THREE.Mesh(new THREE.CylinderGeometry(4, 9, 5), mat);
		top8.position.y = 8;
		let top9 = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, 3), mat);
		top9.position.y = 4;
		let top10 = new THREE.Mesh(new THREE.CylinderGeometry(15, 15, 5), mat);
		top10.position.y = 0;
		this.mesh.add(top1);
		this.mesh.add(top2);
		this.mesh.add(top3);
		this.mesh.add(top4);
		this.mesh.add(top5);
		this.mesh.add(top6);
		this.mesh.add(top7);
		this.mesh.add(top8);
		this.mesh.add(top9);
		this.mesh.add(top10);
	}
}

class Rook extends Figure {
	constructor({color: color, x: x, y: y}) {
		
		super(x, y);
		this.name = 'rook';
		let mat = new THREE.MeshLambertMaterial({color: color});

		let top1 = new THREE.Mesh(new THREE.BoxGeometry(9, 5, 3), mat);
		top1.position.x = 0;
		top1.position.y = 47;
		top1.position.z = 9;
		let top2 = new THREE.Mesh(new THREE.BoxGeometry(9, 5, 3), mat);
		top2.position.x = 0;
		top2.position.y = 47;
		top2.position.z = -9;
		let top3 = new THREE.Mesh(new THREE.BoxGeometry(3, 5, 9), mat);
		top3.position.x = -9;
		top3.position.y = 47;
		top3.position.z = 0;
		let top4 = new THREE.Mesh(new THREE.BoxGeometry(3, 5, 9), mat);
		top4.position.x = 9;
		top4.position.y = 47;
		top4.position.z = 0;
		let top5 = new THREE.Mesh(new THREE.BoxGeometry(20.5, 4, 20.5), mat);
		top5.position.y = 43;
		let top6 = new THREE.Mesh(new THREE.BoxGeometry(14, 4, 14), mat);
		top6.position.y = 39;
		let top7 = new THREE.Mesh(new THREE.CylinderGeometry(4, 5, 30), mat);
		top7.position.y = 22;
		let top8 = new THREE.Mesh(new THREE.CylinderGeometry(5, 9, 6), mat);
		top8.position.y = 5;
		let top9 = new THREE.Mesh(new THREE.CylinderGeometry(15, 15, 5), mat);
		top9.position.y = 0;

		this.mesh.add(top1);
		this.mesh.add(top2);
		this.mesh.add(top3);
		this.mesh.add(top4);
		this.mesh.add(top5);
		this.mesh.add(top6);
		this.mesh.add(top7);
		this.mesh.add(top8);
		this.mesh.add(top9);
	}
}

class Bishop extends Figure {
	constructor({color: color, x: x, y: y}) {
		
		super(x, y);
		this.name = 'bishop';
		let mat = new THREE.MeshLambertMaterial({color: color});

		let top1 = new THREE.Mesh(new THREE.ConeGeometry(10, 20), new THREE.MeshLambertMaterial({color: color}));
		top1.position.y = 82;
		let top2 = new THREE.Mesh(new THREE.CylinderGeometry(10, 3, 10), new THREE.MeshLambertMaterial({color: color}));
		top2.position.y = 67;
		let top3 = new THREE.Mesh(new THREE.CylinderGeometry(11, 11, 1), new THREE.MeshLambertMaterial({color: color}));
		top3.position.y = 63;
		let top4 = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 6), new THREE.MeshLambertMaterial({color: color}));
		top4.position.y = 59;
		let top5 = new THREE.Mesh(new THREE.CylinderGeometry(3, 4, 18), new THREE.MeshLambertMaterial({color: color}));
		top5.position.y = 48;
		let top6 = new THREE.Mesh(new THREE.CylinderGeometry(4, 6, 18), new THREE.MeshLambertMaterial({color: color}));
		top6.position.y = 30;
		let top7 = new THREE.Mesh(new THREE.CylinderGeometry(6, 8, 10), new THREE.MeshLambertMaterial({color: color}));
		top7.position.y = 16;
		let top8 = new THREE.Mesh(new THREE.CylinderGeometry(8, 12, 9), new THREE.MeshLambertMaterial({color: color}));
		top8.position.y = 6.5;
		let top9 = new THREE.Mesh(new THREE.CylinderGeometry(15, 15, 5), new THREE.MeshLambertMaterial({color: color}));
		top9.position.y = 0;

		this.mesh.add(top1);
		this.mesh.add(top2);
		this.mesh.add(top3);
		this.mesh.add(top4);
		this.mesh.add(top5);
		this.mesh.add(top6);
		this.mesh.add(top7);
		this.mesh.add(top8);
		this.mesh.add(top9);
	}
}

class Knight extends Figure {
	constructor({color: color, x: x, y: y}) {
		
		super(x, y);
		this.name = 'knight';
		let mat = new THREE.MeshLambertMaterial({color: color});

		let top1 = new THREE.Mesh(new THREE.CylinderGeometry(15, 15, 5), new THREE.MeshLambertMaterial({color: color}));
		top1.position.y = 0;
		let top2 = new THREE.Mesh(new THREE.BoxGeometry(15, 25, 15), new THREE.MeshLambertMaterial({color: color}));
		top2.position.y = 15;

		let a = top2.geometry.vertices;
		a[4].x += 8;
		a[5].x += 8;

		let top3 = new THREE.Mesh(new THREE.BoxGeometry(7, 15, 15), new THREE.MeshLambertMaterial({color: color}));
		top3.position.y = 35;
		top3.position.x = 4;
		a = top3.geometry.vertices;
		a[4].x -= 10;
		a[5].x -= 10;

		this.mesh.add(top3);
		this.mesh.add(top2);
		this.mesh.add(top1);
	}
}

class Pawn extends Figure {
	constructor({color: color, x: x, y: y}) {
		
		super(x, y);
		this.name = 'pawn';
		let mat = new THREE.MeshLambertMaterial({color: color});

		let top1 = new THREE.Mesh(new THREE.SphereGeometry(10, 10, 10), new THREE.MeshLambertMaterial({color: color}));
		top1.position.y = 45;
		let top2 = new THREE.Mesh(new THREE.CylinderGeometry(3, 10, 40), new THREE.MeshLambertMaterial({color: color}));
		top2.position.y = 20;
		let top3 = new THREE.Mesh(new THREE.CylinderGeometry(15, 15, 5), new THREE.MeshLambertMaterial({color: color}));

		this.mesh.add(top1);
		this.mesh.add(top2);
		this.mesh.add(top3);
	}
}