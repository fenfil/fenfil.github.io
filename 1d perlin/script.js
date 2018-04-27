let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
// let [w, h] = [500, 500];
let [w, h] = [window.innerWidth, window.innerHeight];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
let img = ctx.createImageData(w, h);


for (let i = 0; i < img.data.length; i+=4) {
    img.data[i+3] = 255;
}

let iter = [];

let newMap = (n, a) => {
    let map = [];
    for (let i = 0; i < n; i++) {
        map[i] = [Math.floor(i * w / (n-1)), h/2, Math.random()*a];
    }
    return map;
}

let n = 6, a = 100, amount = 8;
for (let i = 0; i < n; i++) {
    iter[i  ] = {map: newMap(amount, a), i: 0};
    a /= 2;
    amount *= 2;
}

let approx = (x, map, n) => {
    x -= map[n][0];
    x = x / (map[n+1][0] - map[n][0]);
    let ft = x * Math.PI;
    let f = (1 - Math.cos(ft)) * 0.5;
    return map[n][2] * (1 - f) + map[n+1][2] * f;
}

for (let x = 0; x < w; x++) {
    let y = 0;
    for (let j = 0; j < iter.length; j++) {
        if (x > iter[j].map[iter[j].i+1][0]) iter[j].i++;
        y += approx(x, iter[j].map, iter[j].i);
    }
    let a = x*4 + Math.floor(-y + h/2)*img.width*4;
    img.data[a] = 255;        
    img.data[a+4*img.width] = 255;        
    img.data[a-4*img.width] = 255;        
}


ctx.putImageData(img, 0, 0);

ctx.fillStyle = 'white';
ctx.fillRect(0, h/2, w, 2);
ctx.fillRect(0, h/2 - 100, w, 2);