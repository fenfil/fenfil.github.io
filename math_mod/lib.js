function Integral(f, a, b, n) {
  var i,
    x,
    n2 = n * 2,
    h = (b - a) / n2;
  var sum = f(a) + f(b);

  for (i = 1; i < n2; i += 2) sum += 4 * f(a + i * h);

  for (i = 2; i < n2 - 1; i += 2) sum += 2 * f(a + i * h);

  return (sum * h) / 3;
}

class Matrix {
  constructor(x, y) {
    this.arr = new Array(y).fill(0).map(() => new Array(x).fill(0));
  }
  addRow(item, i) {
    for (let j = 0; j < this.arr[0].length; j++) {
      this.arr[i][j] += item;
    }
  }
  addRowVec(vec, i) {
    for (let j = 0; j < this.arr[0].length; j++) {
      this.arr[i][j] += vec[j];
    }
  }
  multRow(item, i) {
    for (let j = 0; j < this.arr[0].length; j++) {
      this.arr[i][j] *= item;
    }
  }
  multRowVec(vec, i) {
    for (let j = 0; j < this.arr[0].length; j++) {
      this.arr[i][j] *= vec[j];
    }
  }
  setRow(item, i) {
    for (let j = 0; j < this.arr[0].length; j++) {
      this.arr[i][j] = item;
    }
  }
  setRowVec(vec, i) {
    for (let j = 0; j < this.arr[0].length; j++) {
      this.arr[i][j] = vec[j];
    }
  }
  addCol(item, i) {
    for (let j = 0; j < this.arr.length; j++) {
      this.arr[j][i] += item;
    }
  }
  addColVec(vec, i) {
    for (let j = 0; j < this.arr.length; j++) {
      this.arr[j][i] += vec[j];
    }
  }
  multCol(item, i) {
    for (let j = 0; j < this.arr.length; j++) {
      this.arr[j][i] *= item;
    }
  }
  multColVec(vec, i) {
    for (let j = 0; j < this.arr.length; j++) {
      this.arr[j][i] *= vec[j];
    }
  }
  setCol(item, i) {
    for (let j = 0; j < this.arr.length; j++) {
      this.arr[j][i] = item;
    }
  }
  setColVec(vec, i) {
    for (let j = 0; j < this.arr.length; j++) {
      this.arr[j][i] = vec[j];
    }
  }
  setDiag(item, offset) {
    for (let j = 0; j < Math.min(this.arr.length, this.arr[0].length); j++) {
      if (j + offset >= 0 && j + offset < this.arr[0].length)
        this.arr[j][j + offset] = item;
    }
  }
  getRow(i) {
    return new Array(this.arr[0].length).fill(0).map((n, j) => this.arr[i][j]);
  }
  getCol(i) {
    return new Array(this.arr.length).fill(0).map((n, j) => this.arr[j][i]);
  }
  swapRows(i, j) {
    const a = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = a;
  }
  gauss() {
    for (let i = 0; i < this.arr.length - 1; i++) {
      let k = i;
      while (k < this.arr.length && this.arr[k][i] == 0) k++;

      if (k < this.arr.length) {
        this.swapRows(i, k);
      }
      for (let j = i + 1; j < this.arr.length; j++) {
        if (this.arr[j][i] !== 0) {
          const m = (-1 * this.arr[j][i]) / this.arr[i][i];
          this.multRow(m, i);
          this.addRowVec(this.arr[i], j);
          this.arr[j][i] = 0;
        }
      }
    }
    for (let i = this.arr.length - 1; i > 0; i--) {
      if (this.arr[i][i] == 0) continue;

      for (let j = i - 1; j >= 0; j--) {
        if (this.arr[j][i] !== 0) {
          const m = (-1 * this.arr[j][i]) / this.arr[i][i];
          this.multRow(m, i);
          this.addRowVec(this.arr[i], j);
          this.arr[j][i] = 0;
        }
      }
    }
    for (let i = 0; i < this.arr.length; i++) {
      this.arr[i][this.arr[i].length - 1] /= this.arr[i][i];
      this.arr[i][i] = 1;
    }
    return this.getCol(this.arr[0].length - 1);
  }
}

const rotateX = (vec, deg) => [
  vec[0],
  vec[1] * Math.cos(deg) - vec[2] * Math.sin(deg),
  vec[1] * Math.sin(deg) + vec[2] * Math.cos(deg)
];
const rotateY = (vec, deg) => [
  vec[0] * Math.cos(deg) + vec[2] * Math.sin(deg),
  vec[1],
  -vec[0] * Math.sin(deg) + vec[2] * Math.cos(deg)
];
const rotateZ = (vec, deg) => [
  vec[0] * Math.cos(deg) - vec[1] * Math.sin(deg),
  vec[0] * Math.sin(deg) + vec[1] * Math.cos(deg),
  vec[2]
];
