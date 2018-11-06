let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let [w, h] = [window.innerWidth, window.innerHeight];
canvas.width = w;
canvas.height = h;

if ('ondevicelight' in window) {
  window.addEventListener('devicelight', function(e) {
    let span = document.querySelector('span');
    span.innerHTML = e.value;
  });
} else {
  document.querySelector('span').innerHTML = 'error';
}

navigator.vibrate(200);