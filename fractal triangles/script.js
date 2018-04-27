let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let [w, h] = [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];

class Triangle {
    constructor(a, b, c) {
        this.t = a;
        this.l = b;
        this.r = c;
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.t[0], this.t[1]);
        ctx.lineTo(this.l[0], this.l[1]);
        ctx.lineTo(this.r[0], this.r[1]);
        ctx.closePath();
        ctx.fill();
    }
    split(mas) {
        let t = [this.t[0], this.t[1]];
        let l = [(this.t[0] - this.l[0]) / 2 + this.l[0], (this.l[1] - this.t[1]) / 2 + this.t[1]];
        let r = [(this.r[0] - this.t[0]) / 2 + this.t[0], (this.r[1] - this.t[1]) / 2 + this.t[1]];

        mas.push(new Triangle(t, l, r));

        t = [(this.r[0] - this.t[0]) / 2 + this.t[0], (this.r[1] - this.t[1]) / 2 + this.t[1]];
        l = [(this.r[0] - this.l[0]) / 2 + this.l[0], (this.r[1] - this.l[1]) / 2 + this.l[1]];
        r = [this.r[0], this.r[1]];

        mas.push(new Triangle(t, l, r));

        t = [(this.t[0] - this.l[0]) / 2 + this.l[0], (this.l[1] - this.t[1]) / 2 + this.t[1]];
        l = this.l;
        r = [(this.r[0] - this.l[0]) / 2 + this.l[0], (this.r[1] - this.l[1]) / 2 + this.l[1]];
        [this.t, this.l, this.r] = [t, l, r];
    }
}

canvas.addEventListener('click', e => {
    console.log(e.clientX, e.clientY);
});

let triangles = [];

triangles.push(new Triangle([w/2, -500], [-500, h+10], [w + 500, h + 10]));

let anim = () => {
    if (triangles[0].r[0] - triangles[0].l[0] < 3) {
        return;
    }
    // requestAnimationFrame(anim);
    setTimeout(anim, 400);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'white';
    // ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < triangles.length; i++) {
        triangles[i].draw();
    }
    let n = triangles.length;
    for (let i = 0; i < n; i++) {
        triangles[i].split(triangles);
    }
}

anim();