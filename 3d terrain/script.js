let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
// let [w, h] = [500, 500];
let [w, h] = [window.innerWidth, window.innerHeight];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

class Triangle {
    constructor(a, b, c, start) {
        this.die = 0;
        this.start = {x: start[0], y: start[1], z: start[2]};
        this.a = {x: a[0], y: a[1], z: a[2]};
        this.b = {x: b[0], y: b[1], z: b[2]};
        this.c = {x: c[0], y: c[1], z: c[2]};
    }
    fill() {
        if (this.die) return;
        ctx.beginPath();
            let x = (camera.z - camera.surf) / (camera.z-this.a.z) * this.a.x;//Math.sign(this.a.x) * Math.sqrt((camera.z - camera.surf) / cosx * (camera.z - camera.surf) / cosx - (camera.z - camera.surf) * (camera.z - camera.surf));
            let y = (camera.z - camera.surf) / (camera.z-this.a.z) * this.a.y;//Math.sign(this.a.y) * Math.sqrt((camera.z - camera.surf) / cosy * (camera.z - camera.surf) / cosy - (camera.z - camera.surf) * (camera.z - camera.surf));
        if ((this.a.z < camera.z) && (x < w/2 && x > -w/2) && (y > -h/2 && y < h/2)) {
            ctx.moveTo(this.start.x + x, this.start.y + y);
        } else {
            if (!this.die){
                gonetriangles++;
                this.die = 1;
            }
        }

            x = (camera.z - camera.surf) / (camera.z-this.b.z) * this.b.x;//Math.sign(this.b.x) * Math.sqrt((camera.z - camera.surf) / cosx * (camera.z - camera.surf) / cosx - (camera.z - camera.surf) * (camera.z - camera.surf));
            y = (camera.z - camera.surf) / (camera.z-this.b.z) * this.b.y;//Math.sign(this.b.y) * Math.sqrt((camera.z - camera.surf) / cosy * (camera.z - camera.surf) / cosy - (camera.z - camera.surf) * (camera.z - camera.surf));
            

        if ((this.b.z < camera.z) && (x < w/2 && x > -w/2) && (y > -h/2 && y < h/2)) {
            ctx.lineTo(this.start.x + x, this.start.y + y);
        } else {
            if (!this.die){
                gonetriangles++;
                this.die = 1;
            }
        }

            x = (camera.z - camera.surf) / (camera.z-this.c.z) * this.c.x;//Math.sign(this.c.x) * Math.sqrt((camera.z - camera.surf) / cosx * (camera.z - camera.surf) / cosx - (camera.z - camera.surf) * (camera.z - camera.surf));
            y = (camera.z - camera.surf) / (camera.z-this.c.z) * this.c.y;//Math.sign(this.c.y) * Math.sqrt((camera.z - camera.surf) / cosy * (camera.z - camera.surf) / cosy - (camera.z - camera.surf) * (camera.z - camera.surf));

        if ((this.c.z < camera.z) && (x < w/2 && x > -w/2) && (y > -h/2 && y < h/2)) {
            ctx.lineTo(this.start.x + x, this.start.y + y);
        } else {
            if (!this.die){
                gonetriangles++;
                this.die = 1;
            }
        }
        if (!this.die) {
            ctx.closePath();
            ctx.fill();
            return;
        }
        if (gonetriangles >= rowofparticles) addrow();
    }
    stroke() {
        if (this.die) return;
        ctx.beginPath();
            let x = (camera.z - camera.surf) / (camera.z-this.a.z) * this.a.x;//Math.sign(this.a.x) * Math.sqrt((camera.z - camera.surf) / cosx * (camera.z - camera.surf) / cosx - (camera.z - camera.surf) * (camera.z - camera.surf));
            let y = (camera.z - camera.surf) / (camera.z-this.a.z) * this.a.y;//Math.sign(this.a.y) * Math.sqrt((camera.z - camera.surf) / cosy * (camera.z - camera.surf) / cosy - (camera.z - camera.surf) * (camera.z - camera.surf));
        if ((this.a.z < camera.z) && (x < w/2 && x > -w/2) && (y > -h/2 && y < h/2)) {
            ctx.moveTo(this.start.x + x, this.start.y + y);
        } else {
            if (!this.die){
                gonetriangles++;
                this.die = 1;
            }
        }

            x = (camera.z - camera.surf) / (camera.z-this.b.z) * this.b.x;//Math.sign(this.b.x) * Math.sqrt((camera.z - camera.surf) / cosx * (camera.z - camera.surf) / cosx - (camera.z - camera.surf) * (camera.z - camera.surf));
            y = (camera.z - camera.surf) / (camera.z-this.b.z) * this.b.y;//Math.sign(this.b.y) * Math.sqrt((camera.z - camera.surf) / cosy * (camera.z - camera.surf) / cosy - (camera.z - camera.surf) * (camera.z - camera.surf));
            

        if ((this.b.z < camera.z) && (x < w/2 && x > -w/2) && (y > -h/2 && y < h/2)) {
            ctx.lineTo(this.start.x + x, this.start.y + y);
        } else {
            if (!this.die){
                gonetriangles++;
                this.die = 1;
            }
        }

            x = (camera.z - camera.surf) / (camera.z-this.c.z) * this.c.x;//Math.sign(this.c.x) * Math.sqrt((camera.z - camera.surf) / cosx * (camera.z - camera.surf) / cosx - (camera.z - camera.surf) * (camera.z - camera.surf));
            y = (camera.z - camera.surf) / (camera.z-this.c.z) * this.c.y;//Math.sign(this.c.y) * Math.sqrt((camera.z - camera.surf) / cosy * (camera.z - camera.surf) / cosy - (camera.z - camera.surf) * (camera.z - camera.surf));

        if ((this.c.z < camera.z) && (x < w/2 && x > -w/2) && (y > -h/2 && y < h/2)) {
            ctx.lineTo(this.start.x + x, this.start.y + y);
        } else {
            if (!this.die){
                gonetriangles++;
                this.die = 1;
            }
        }
        if (!this.die) {
            ctx.closePath();
            ctx.stroke();
            return;
        }
        if (gonetriangles >= rowofparticles) addrow();
    }
    rotateX(t) {
        this.a = {x: this.a.x, y: Math.cos(t) * this.a.y - Math.sin(t) * this.a.z, z: Math.sin(t) * this.a.y + Math.cos(t) * this.a.z};
        this.b = {x: this.b.x, y: Math.cos(t) * this.b.y - Math.sin(t) * this.b.z, z: Math.sin(t) * this.b.y + Math.cos(t) * this.b.z};
        this.c = {x: this.c.x, y: Math.cos(t) * this.c.y - Math.sin(t) * this.c.z, z: Math.sin(t) * this.c.y + Math.cos(t) * this.c.z};
    }
    rotateY(t) {
        this.a = {x: Math.cos(t) * this.a.x + Math.sin(t) * this.a.z, y: this.a.y, z: -Math.sin(t) * this.a.x + Math.cos(t) * this.a.z};
        this.b = {x: Math.cos(t) * this.b.x + Math.sin(t) * this.b.z, y: this.b.y, z: -Math.sin(t) * this.b.x + Math.cos(t) * this.b.z};
        this.c = {x: Math.cos(t) * this.c.x + Math.sin(t) * this.c.z, y: this.c.y, z: -Math.sin(t) * this.c.x + Math.cos(t) * this.c.z};
    }
    rotateZ(t) {
        this.a = {x: Math.cos(t) * this.a.x - Math.sin(t) * this.a.y, y: Math.sin(t) * this.a.x + Math.cos(t) * this.a.y,z: this.a.z};
        this.b = {x: Math.cos(t) * this.b.x - Math.sin(t) * this.b.y, y: Math.sin(t) * this.b.x + Math.cos(t) * this.b.y,z: this.b.z};
        this.c = {xrr: Math.cos(t) * this.c.x - Math.sin(t) * this.c.y, y: Math.sin(t) * this.c.x + Math.cos(t) * this.c.y,z: this.c.z};
    }
    translateY(y) {
        this.a.y += y;
        this.b.y += y;
        this.c.y += y;
    }
    translateZ(z) {
        this.a.z += z;
        this.b.z += z;
        this.c.z += z;
    }
    scale(t) {
        
    }
}

class Camera {
    constructor(x = 0, y = 0, z = 300, a) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.a = a;
        this.surf = z/2;
    }
}

class Terrain {
    constructor(items) {
        this.items = items;
    }
    rotateX(deg) {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].rotateX(deg);
        }
    }
    stroke() {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].stroke();
        }
    }
    fill() {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].fill();
        }
    }
    translateY(y = 1) {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].translateY(y);
        }
    }
    translateZ(z = 1) {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].translateZ(z);
        }
    }
    scale(a) {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].scale(a);
        }
    }
}


let points = [];
let sizex = 1500, sizey = 1500;
let rowofparticles = 8;
let gonetriangles = 0;

let addrow = () => {
    // console.log(gonetriangles);
    // if (gonetriangles > rowofparticles)
}

for (let i = 0; i < rowofparticles; i++) {
    points[i] = [];
    for (let j = 0; j < rowofparticles - i%2; j++) {
        points[i][j] = [j * Math.floor(sizex/(rowofparticles-1)) + Math.floor(sizey/(rowofparticles-1)) * (i%2)/2 - sizex/2, i * Math.floor(sizey/(rowofparticles-1)) - sizey/1.1, Math.random()*200];
    }
}

let n = 0;
let triangles = [];
for (let i = 0; i < points.length/2; i++) {
    for (let j = 0; j < points[
        i*2].length-1; j++) {
        triangles[n] = new Triangle(points[2*i][j],points[2*i][j+1], points[2*i+1][j], [w/2, h/2, 0]);
        n++;
    }
    for (let j = 0; j < points[i*2+1].length-1; j++) {
        triangles[n] = new Triangle(points[2*i][j+1],points[2*i+1][j], points[2*i+1][j+1], [w/2, h/2, 0]);
        n++;
    }
}
for (let i = 0; i < points.length/2-1; i++) {
    for (let j = 0; j < points[i*2].length-1; j++) {
        triangles[n] = new Triangle(points[2*i+1][j],points[2*i+2][j], points[2*i+2][j+1], [w/2, h/2, 0]);
        n++;
    }
    for (let j = 0; j < points[i*2+1].length-1; j++) {
        triangles[n] = new Triangle(points[2*i+1][j],points[2*i+1][j+1], points[2*i+2][j+1], [w/2, h/2, 0]);
        n++;
    }
}

points = points[0];

let terrain = new Terrain(triangles);
let camera = new Camera();
ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
let al = 0;
terrain.rotateX(Math.PI / 3);
let animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, w, h);
    terrain.translateY(0.8);
    terrain.translateZ(1);
    // terrain.rotateX(Math.sin(al)/50);
    // terrain.stroke();
    terrain.fill();
}
animate();

