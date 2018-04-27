let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
let [w, h] = [500, 500];
// let [w, h] = [window.innerWidth, window.innerHeight];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
let img = ctx.createImageData(w, h);


for (let i = 0; i < img.data.length; i+=4) {
    img.data[i+3] = 255;
}


let time = performance.now();
let n = 8, a = 255/2, amount = 8;

let newMap = (n, a) => {
    let map = [];
    for (let i = 0; i < n; i++) {
        map[i] = [];
        for (let j = 0; j < n; j++) {
            map[i][j] = [Math.floor(j * w / (n-1)), Math.floor(i * h / (n-1)), Math.random()*a];
        }
    }
    return map;
}
let approx = (map, ni, nj) => {
    for (let x = map[ni][nj][0]; x < map[ni][nj+1][0]; x++) {
        let x1 = (x - map[ni][nj][0]) / (map[ni][nj+1][0]-map[ni][nj][0]);
        let r1 = map[ni][nj][2] * (1 - (1 - Math.cos(x1 * Math.PI)) * 0.5) + map[ni][nj+1][2] * (1 - Math.cos(x1 * Math.PI)) * 0.5;
        let r2 = map[ni+1][nj][2] * (1 - (1 - Math.cos(x1 * Math.PI)) * 0.5) + map[ni+1][nj+1][2] * (1 - Math.cos(x1 * Math.PI)) * 0.5;
        for (y = map[ni][nj][1]; y < map[ni+1][nj][1]; y++) {
            let y1 = (y - map[ni][nj][1]) / (map[ni+1][nj][1] - map[ni][nj][1]);
            let res = Math.floor(r1 * (1 - (1 - Math.cos(y1 * Math.PI)) * 0.5) + r2 * (1 - Math.cos(y1 * Math.PI)) * 0.5);
            let i = y * img.width * 4 + x * 4;
            img.data[i] += res;
            img.data[i+1] += res;
            img.data[i+2] += res;
        }
    }
}

for (let k = 0; k < n; k++) {
    iter = newMap(amount, a);
    a /= 2;
    amount *= 2;
    for (let i = 0; i < iter.length - 1; i++) {
        for (let j = 0; j < iter[i].length - 1; j++) {
            z = approx(iter, i, j);
        }
    }
}

console.log(performance.now() - time);

ctx.putImageData(img, 0, 0);