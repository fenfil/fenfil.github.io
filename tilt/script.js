let a = document.querySelector('div');

window.addEventListener('deviceorientation', (e) => {
    console.log(e);
    
    a.innerText = e.gamma;
    b.innerText = e.beta;
    c.innerText = e.alpha;
});

let e = new DeviceOrientationEvent('deviceorientation');