window.onload = function() {
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    let [w, h] = [window.innerWidth, window.innerHeight];
    canvas.width = w;
    canvas.height = h;
    let R = 200;
    let offset = 40;
    ctx.fillRect(0, 0, w, h);
    let split = (r, x, y, f) => {
        if (r < 5) return;
        ctx.fillStyle = 'rgba(' + (r/R * 255) + ', 200, ' + (255 - r/R*255) + ', 0.06)';
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(- r / 2,- r / 2, r, r);
        split(r/2, r/2, 0, !f);
        split(r/2, -r/2, 0, !f);
        split(r/2, 0, r/2, !f);
        split(r/2, 0, - r/2, !f);
        ctx.rotate(-Math.PI / 4);
        ctx.translate(-x, -y);        
    }

    
    
    let anim = () => {
        // requestAnimationFrame(anim);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, w, h);
        for (i = 0; i < w; i += R + offset) {
            for (j = 0; j < h; j += R + offset) {
                split(R, i, j);
            }
        }
        offset += 1;
    }
    anim();
}