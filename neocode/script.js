window.onload = function () {
  var canvas = document.getElementsByTagName("canvas")[0];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");

  var mas = [];
  var n = 250;
  var step = canvas.width / n;
  var itemsHeight = [];
  var times = 0;
  var speed = [];

  for (var i = 0; i < n; i++) {
    mas.push(i * step);
    itemsHeight.push(Math.ceil(Math.random() * 50));
    speed.push(Math.ceil(Math.random() * 10));
  }

  var timer = setInterval(function () {
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#44fa2c";
    for (var i = 0; i < n; i++) {
      ctx.fillRect(mas[i] + 1, itemsHeight[i] + 1, step - 2, step - 2);
    }
    for (var i = 0; i < n; i++) {
      if (itemsHeight[i] > canvas.height) {
        itemsHeight[i] = 0;
        times++;
      }
      itemsHeight[i] += speed[i];
    }
  }, 20);
};
