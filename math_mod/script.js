const canvas = document.querySelector("canvas");
const xLenInput = document.querySelector("#xlen");
const yLenInput = document.querySelector("#ylen");
const zLenInput = document.querySelector("#zlen");
const dTInput = document.querySelector("#dt");
const xPointsInput = document.querySelector("#xpoints");
const yPointsInput = document.querySelector("#ypoints");
const zPointsInput = document.querySelector("#zpoints");
const DInput = document.querySelector("#D");
const rendererSelector = document.querySelector("#renderer");
const startBtn = document.querySelector("#start");
const upFrameBtn = document.querySelector("#upframe");
const downFrameBtn = document.querySelector("#downframe");
const frameContainer = document.querySelector("#framecontainer");

const [w, h] = [window.innerWidth, window.innerHeight];
canvas.width = w;
canvas.height = h;
const ctx = canvas.getContext("2d");

let SOURCE_POS = [0, 0, 0];
let SOURCE_MAS = 10000;

let ROTATE_X = -0.2;
let ROTATE_Y = 0;
let ROTATE_Z = 0.15;
let SCALE = 150;

let X_POINTS = 3;
let Y_POINTS = 3;
let Z_POINTS = 3;
let T_POINTS = 0;

let X_LEN = 10;
let Y_LEN = 10;
let Z_LEN = 10;
let T_LEN = 10;

let DX = 10;
let DY = 10;
let DZ = 10;
let DT = 10;
let RENDERER = "default";

let D = 0.5;
let CURRENT_FRAME = 0;

let drawData = [];

// const phi = x => x;
// const phi = x => Math.sin((5 * Math.PI * x) / L);
const phi = (x) => 1 - 4 * (x - 0.5) ** 2;

const rotate = (vec) =>
  rotateY(rotateX(rotateZ(vec, ROTATE_Z), ROTATE_X), ROTATE_Y);

const coordsToMatrixPos = ([i, j, k]) =>
  k + j * (Z_POINTS + 1) + i * (Z_POINTS + 1) * (Y_POINTS + 1);

const matrixPosToCoords = (pos) => {
  const i = (pos / ((Z_POINTS + 1) * (Y_POINTS + 1))) | 0;
  pos %= (Z_POINTS + 1) * (Y_POINTS + 1);
  const j = (pos / (Z_POINTS + 1)) | 0;
  pos %= Z_POINTS + 1;
  const k = pos;
  return [i, j, k];
};

const a = (x, n) =>
  (2 / L) *
  Integral((x) => phi(x) * Math.sin((n * Math.PI * x) / L), 0, L, 100);

const analyticT = (t, x) => {
  let r = 0;
  for (let i = 1; i < 100; i++) {
    r +=
      a(x, i) *
      Math.E ** (t * ((i * Math.PI * alpha) / L) ** 2 * -1) *
      Math.sin((i * Math.PI * x) / L);
  }
  return r;
};

const calcAnalytic = () => {
  const points = [];

  for (let i = 0; i <= X_POINTS; i++) {
    const x = (L * i) / X_POINTS;
    points.push(analyticT(T, x));
  }
  return points;
};

const calcWeb = () => {
  let points = [];
  const MATRIX_LENGTH = (X_POINTS + 1) * (Y_POINTS + 1) * (Z_POINTS + 1);
  const I_OFFSET = (Y_POINTS + 1) * (Z_POINTS + 1);
  const J_OFFSET = Z_POINTS + 1;
  const K_OFFSET = 1;

  let lastPoints = new Array(MATRIX_LENGTH);
  for (let i = 0; i <= X_POINTS; i++) {
    for (let j = 0; j <= Y_POINTS; j++) {
      for (let k = 0; k <= Z_POINTS; k++) {
        const pos = coordsToMatrixPos([i, j, k]);
        lastPoints[pos] = 0;
      }
    }
  }
  const srcPos = coordsToMatrixPos(SOURCE_POS);
  const srcPos2 = coordsToMatrixPos([1, 1, 1]);
  lastPoints[srcPos] = SOURCE_MAS;
  // lastPoints[srcPos2] = SOURCE_MAS;

  drawData = [lastPoints];

  const DDI = (DT * D) / DX / DX;
  const DDJ = (DT * D) / DY / DY;
  const DDK = (DT * D) / DZ / DZ;

  for (let j = 1; j <= T_POINTS; j++) {
    const m = new Matrix(MATRIX_LENGTH + 1, MATRIX_LENGTH);

    for (let i = 0; i <= X_POINTS; i++) {
      for (let j = 0; j <= Y_POINTS; j++) {
        for (let k = 0; k <= Z_POINTS; k++) {
          const pos = coordsToMatrixPos([i, j, k]);
          if (
            i == 0 ||
            j == 0 ||
            k == 0 ||
            i == X_POINTS ||
            j == Y_POINTS ||
            k == Z_POINTS
          ) {
            m.arr[pos][pos] = 1;
          } else {
            m.arr[pos][pos] = -2 * (DDI + DDJ + DDK) - 1;
            m.arr[pos][pos - I_OFFSET] = DDI;
            m.arr[pos][pos + I_OFFSET] = DDI;
            m.arr[pos][pos - J_OFFSET] = DDJ;
            m.arr[pos][pos + J_OFFSET] = DDJ;
            m.arr[pos][pos - K_OFFSET] = DDK;
            m.arr[pos][pos + K_OFFSET] = DDK;

            m.arr[pos][MATRIX_LENGTH] = -lastPoints[pos];
          }
        }
      }
    }

    points = m.gauss();
    drawData.push(points);
    lastPoints = points;
  }
};

const calcInitialFrame = () => {
  const MATRIX_LENGTH = (X_POINTS + 1) * (Y_POINTS + 1) * (Z_POINTS + 1);

  let lastPoints = new Array(MATRIX_LENGTH);
  for (let i = 0; i <= X_POINTS; i++) {
    for (let j = 0; j <= Y_POINTS; j++) {
      for (let k = 0; k <= Z_POINTS; k++) {
        const pos = coordsToMatrixPos([i, j, k]);
        lastPoints[pos] = 0;
      }
    }
  }
  const srcPos = coordsToMatrixPos(SOURCE_POS);
  const srcPos2 = coordsToMatrixPos([1, 1, 1]);
  lastPoints[srcPos] = SOURCE_MAS;
  // lastPoints[srcPos2] = SOURCE_MAS;

  drawData = [lastPoints];
};

const calcNonInitialFrame = () => {
  let points = [];
  const lastPoints = drawData[drawData.length - 1];

  const MATRIX_LENGTH = (X_POINTS + 1) * (Y_POINTS + 1) * (Z_POINTS + 1);
  const I_OFFSET = (Y_POINTS + 1) * (Z_POINTS + 1);
  const J_OFFSET = Z_POINTS + 1;
  const K_OFFSET = 1;
  const DDI = (DT * D) / DX / DX;
  const DDJ = (DT * D) / DY / DY;
  const DDK = (DT * D) / DZ / DZ;

  const m = new Matrix(MATRIX_LENGTH + 1, MATRIX_LENGTH);

  for (let i = 0; i <= X_POINTS; i++) {
    for (let j = 0; j <= Y_POINTS; j++) {
      for (let k = 0; k <= Z_POINTS; k++) {
        const pos = coordsToMatrixPos([i, j, k]);
        if (
          i == 0 ||
          j == 0 ||
          k == 0 ||
          i == X_POINTS ||
          j == Y_POINTS ||
          k == Z_POINTS
        ) {
          m.arr[pos][pos] = 1;
        } else {
          m.arr[pos][pos] = -2 * (DDI + DDJ + DDK) - 1;
          m.arr[pos][pos - I_OFFSET] = DDI;
          m.arr[pos][pos + I_OFFSET] = DDI;
          m.arr[pos][pos - J_OFFSET] = DDJ;
          m.arr[pos][pos + J_OFFSET] = DDJ;
          m.arr[pos][pos - K_OFFSET] = DDK;
          m.arr[pos][pos + K_OFFSET] = DDK;

          m.arr[pos][MATRIX_LENGTH] = -lastPoints[pos];
        }
      }
    }
  }

  points = m.gauss();
  drawData.push(points);
};

const calcFrame = () => {
  if (!drawData.length) calcInitialFrame();
  else calcNonInitialFrame();
};

const clear = () => {
  ctx.strokeStyle = "black";
  ctx.fillStyle = "black";
  const dashHeight = 5;
  let X = [1, 0, 0];
  let Y = [0, 1, 0];
  let Z = [0, 0, 1];

  X = rotate(X);
  Y = rotate(Y);
  Z = rotate(Z);

  ctx.clearRect(0, 0, w, h);
  ctx.beginPath();
  ctx.moveTo(w / 2, h / 2);
  ctx.lineTo(w / 2 + X[0] * SCALE * X_LEN, h / 2 - X[2] * SCALE * X_LEN);
  ctx.moveTo(w / 2, h / 2);
  ctx.lineTo(w / 2 + Y[0] * SCALE * Y_LEN, h / 2 - Y[2] * SCALE * Y_LEN);
  ctx.moveTo(w / 2, h / 2);
  ctx.lineTo(w / 2 + Z[0] * SCALE * Z_LEN, h / 2 - Z[2] * SCALE * Z_LEN);
  ctx.stroke();
  ctx.fillRect(
    w / 2 + X[0] * SCALE,
    h / 2 - dashHeight / 2 - X[2] * SCALE,
    1,
    dashHeight
  );
  ctx.fillRect(
    w / 2 + Y[0] * SCALE,
    h / 2 - dashHeight / 2 - Y[2] * SCALE,
    1,
    dashHeight
  );
  ctx.fillRect(
    w / 2 + Z[0] * SCALE - dashHeight / 2,
    h / 2 - Z[2] * SCALE,
    dashHeight,
    1
  );
};

const renderDefault = () => {
  clear();

  const frameData = drawData[CURRENT_FRAME];
  ctx.fillStyle = "red";

  for (let i = 0; i <= X_POINTS; i++) {
    for (let j = 0; j <= Y_POINTS; j++) {
      for (let k = 0; k <= Z_POINTS; k++) {
        const coords = rotate([
          (X_LEN * i) / X_POINTS,
          (Y_LEN * j) / Y_POINTS,
          (Z_LEN * k) / Z_POINTS,
        ]);
        const pos = coordsToMatrixPos([i, j, k]);
        const dataSize = frameData[pos];
        const finalSize = dataSize ** (1 / 3);
        ctx.fillRect(
          w / 2 + coords[0] * SCALE - finalSize / 2,
          h / 2 - coords[2] * SCALE - finalSize / 2,
          finalSize,
          finalSize
        );
      }
    }
  }
};

let renderedFor = null;
let renderedFlag = null;
const renderNoize = () => {
  clear();

  const getRand = () => {
    let r = Math.random();
    if (r > 0.5) {
      return 1 - Math.sqrt(r * 2 - 1);
    }
    return Math.sqrt(r * 2) - 1;
  };

  const frameData = drawData[CURRENT_FRAME];
  if (!frameData) return;

  if (renderedFlag !== frameData) {
    renderedFor = [];
    renderedFlag = frameData;
  }

  ctx.fillStyle = "red";

  if (!renderedFor.length) {
    for (let i = 0; i <= X_POINTS; i++) {
      for (let j = 0; j <= Y_POINTS; j++) {
        for (let k = 0; k <= Z_POINTS; k++) {
          const pos = coordsToMatrixPos([i, j, k]);
          const dataSize = frameData[pos];
          if (dataSize < 1) continue;
          for (let q = 0; q < dataSize; q++) {
            const offsetx = getRand();
            const offsety = getRand();
            const offsetz = getRand();
            let coords = [
              (X_LEN * (i + offsetx)) / X_POINTS,
              (Y_LEN * (j + offsety)) / Y_POINTS,
              (Z_LEN * (k + offsetz)) / Z_POINTS,
            ];
            renderedFor.push(coords);
            coords = rotate(coords);
            ctx.fillRect(
              w / 2 + coords[0] * SCALE,
              h / 2 - coords[2] * SCALE,
              1,
              1
            );
          }
        }
      }
    }
  } else {
    for (let i = 0; i < renderedFor.length; i++) {
      const coords = rotate(renderedFor[i]);
      ctx.fillRect(w / 2 + coords[0] * SCALE, h / 2 - coords[2] * SCALE, 1, 1);
    }
  }
};

function flushData() {
  CURRENT_FRAME = 0;
  drawData = [];
  getConstants();
  clear();
}

function render() {
  if (RENDERER == "default") renderDefault();
  else renderNoize();
}

xLenInput.addEventListener("change", flushData);
yLenInput.addEventListener("change", flushData);
zLenInput.addEventListener("change", flushData);
dTInput.addEventListener("change", flushData);
xPointsInput.addEventListener("change", flushData);
yPointsInput.addEventListener("change", flushData);
zPointsInput.addEventListener("change", flushData);
DInput.addEventListener("change", flushData);

let isMouseDown = false;
let isCalculating = false;
startBtn.addEventListener("click", () => {
  getConstants();
  clear();
  calcWeb();
  render();
});
startBtn;
document.addEventListener("mousedown", () => {
  isMouseDown = true;
});
document.addEventListener("mouseup", () => {
  isMouseDown = false;
});
document.addEventListener("mousemove", (e) => {
  if (!isMouseDown) return;
  ROTATE_Z -= e.movementX * 0.001;
  ROTATE_X -= e.movementY * 0.001;
  render();
});
document.addEventListener("scroll", (e) => {
  SCALE += window.scrollY;
  render();
});
upFrameBtn.addEventListener("click", () => {
  if (isCalculating) return;
  isCalculating = true;
  getConstants();
  if (!drawData[CURRENT_FRAME]) calcFrame();
  CURRENT_FRAME++;
  frameContainer.innerHTML = CURRENT_FRAME.toString();
  if (!drawData[CURRENT_FRAME]) calcFrame();
  render();
  isCalculating = false;
});
downFrameBtn.addEventListener("click", () => {
  getConstants();
  CURRENT_FRAME = Math.max(CURRENT_FRAME - 1, 0);
  frameContainer.innerHTML = CURRENT_FRAME.toString();
  render();
});

function getConstants() {
  DT = +dTInput.value;
  T_POINTS = Math.max(CURRENT_FRAME, T_POINTS);
  T_LEN = DT * T_POINTS;

  X_POINTS = +xPointsInput.value;
  Y_POINTS = +yPointsInput.value;
  Z_POINTS = +zPointsInput.value;
  X_LEN = +xLenInput.value;
  Y_LEN = +yLenInput.value;
  Z_LEN = +zLenInput.value;
  DX = X_LEN / X_POINTS;
  DY = Y_LEN / Y_POINTS;
  DZ = Z_LEN / Z_POINTS;

  SOURCE_POS = [(X_POINTS / 2) | 0, (Y_POINTS / 2) | 0, (Z_POINTS / 2) | 0];

  D = +DInput.value;
  RENDERER = rendererSelector.value;

  frameContainer.innerHTML = CURRENT_FRAME.toString();
}

getConstants();
calcFrame();
render();
