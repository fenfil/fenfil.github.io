let res = document.querySelector('.result');
let a = document.querySelector('.one');
let b = document.querySelector('.two');

document.querySelector('button').addEventListener('click', e => {
    let answer = res.value.length > 0 ? +res.value : undefined;
    if (typeof answer == 'number') {
        checkAnswer();
    } else {
        bad();
    }
});

document.addEventListener('keyup', e => {
    let answer = res.value.length > 0 ? +res.value : undefined;
    if (typeof answer == 'number') {
        if (+a.innerHTML * +b.innerHTML == res.value) {
            good();
        }
    }
});

function bad() {
    res.classList.add('bad');
    setTimeout(() => res.classList.remove('bad'), 100);
}

function checkAnswer() {
    if (+a.innerHTML * +b.innerHTML == res.value) {
        good();
    } else {
        bad();
    }
}

function good() {
    res.classList.add('good');
    setTimeout(() => res.classList.remove('good'), 100);
    res.value = '';
    a.innerHTML = Math.floor(Math.random() * 10);
    b.innerHTML = Math.floor(Math.random() * 10);
}