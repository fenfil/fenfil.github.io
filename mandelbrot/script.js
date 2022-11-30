window.onload = function () {
  let canvas = document.querySelector("canvas");
  let ctx = canvas.getContext("2d");
  let [w, h] = [500, 500];
  canvas.width = 500;
  canvas.height = 500;
  let img = ctx.createImageData(w, h);
  let max = 300;
  let s = 500,
    sc = 4;
  let fromx = -2,
    fromy = -2,
    tox = 2,
    toy = 2;
  let size = 2;
  canvas.addEventListener("click", function (e) {
    if (e.clientX > canvas.width / 2 - w / 2 && e.clientY > canvas.height / 2 - h / 2 - 50) {
      if (e.clientX < canvas.width / 2 - w / 2 + 500 && e.clientY < canvas.height / 2 - h / 2 + 450) {
        let dx = e.clientX - canvas.width / 2 + w / 2;
        let dy = e.clientY - canvas.height / 2 + h / 2 + 50;
        let cx = (dx / s) * (tox - fromx) + fromx;
        let cy = (dy / s) * (toy - fromy) + fromy;
        size /= 2;
        fromx = cx - size;
        fromy = cy - size;
        tox = cx + size;
        toy = cy + size;
        draw();
        console.log(tox, toy);
      }
    }
  });
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let check = (i, j) => {
    let cre = (j / s) * (tox - fromx) + fromx;
    let cim = (i / s) * (toy - fromy) + fromy;
    let [x, y] = [0, 0];
    let n = 0;
    let iteration = 0;
    while (x * x + y * y <= 4 && iteration < max) {
      n = x * x - y * y + cre;
      y = 2 * x * y + cim;
      x = n;
      iteration++;
    }
    return [iteration, x * x + y * y];
  };

  let draw = () => {
    for (i = 0; i < h; i++) {
      for (j = 0; j < w; j++) {
        let [x, z] = check(i, j);
        x = Math.sqrt(x / max) * max;
        if (x < max) {
          img.data[j * 4 + i * img.width * 4] = (x / max) * 255; //x / max * 0.5;
          img.data[j * 4 + i * img.width * 4 + 1] = (x / max) * 255; //x / max;
          img.data[j * 4 + i * img.width * 4 + 2] = (x / max) * 255; //x / max;
          img.data[j * 4 + i * img.width * 4 + 3] = 255;
        } else {
          img.data[j * 4 + i * img.width * 4] = 0;
          img.data[j * 4 + i * img.width * 4 + 1] = 0;
          img.data[j * 4 + i * img.width * 4 + 2] = 0;
          img.data[j * 4 + i * img.width * 4 + 3] = 255;
        }
      }
    }
    ctx.putImageData(img, canvas.width / 2 - w / 2, canvas.height / 2 - h / 2 - 50);
  };
  draw();
};
