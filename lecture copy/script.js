const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let ctx = canvas.getContext("2d");

let iToCoords = (i) => [(i / 4) % width | 0, (i / 4 / width) | 0];
let coordsToI = (x, y) => (x + y * width) * 4;

async function animate() {
  console.log(1);
  // await new Promise(
  //   (res) =>
  //     (image.onload = () => {
  //       res();
  //     })
  // );

  ctx.drawImage(image, 0, 0, width, height);
  let srcImgData = ctx.getImageData(0, 0, width, height);
  let imgData = ctx.createImageData(width, height);
  console.log(1);
  for (let i = 0; i < imgData.data.length; i += 4) {
    for (let j = 0; j < 3; j++) {
      const [x, y] = iToCoords(i);
      const points = [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
      ]
        .filter(([x, y]) => x >= 0 && x <= width && y >= 0 && y <= height)
        .map((p) => coordsToI(...p))
        .map((i) => srcImgData.data[i + j]);
      imgData.data[i + j] = points.reduce((acc, p) => acc + p, 0) / points.length;
    }
    imgData.data[i + 3] = 255;
  }

  ctx.putImageData(srcImgData, 0, 0);
}

animate();
