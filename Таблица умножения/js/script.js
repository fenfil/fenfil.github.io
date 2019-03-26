let tabs = document.getElementsByTagName('li');
let tabContainer = document.querySelector('ul');
const htmlTable = document.getElementById('table');

tabs.forEach = [].forEach;

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let app = {
    answers: [],
    tabs: tabs,
    currentTabId: 0,
    tables: []
};

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

for (let i = 0; i < 5; i++) {
    let [a, b] = [numbers[Math.floor(Math.random()*numbers.length)], numbers[Math.floor(Math.random()*numbers.length)]];
    app.answers.push(a*b);
    let table = [[a, b]];
    let s = numbers.filter(e => (e != a) && (e != b));
    for (let i = 0; i < 11; i++) {
        let [x, y] = [s[Math.floor(Math.random()*s.length)], numbers[Math.floor(Math.random()*numbers.length)]];
        table.push([x, y]);
    }
    shuffle(table);
    app.tables.push(table);
}

for (let i in app.answers) {
    let li = document.createElement('li');
    li.id = '' + i;
    li.innerHTML = `... = ${app.answers[i]}`;
    tabContainer.appendChild(li);
    li.addEventListener('click', e => {
        app.tabs[app.currentTabId].classList.remove('active');
        e.target.classList.add('active');
        app.currentTabId = e.target.id;
        drawTable();
    });
    if (i == 0) {
        li.classList.add('active');
        drawTable();
    }
}

function drawTable() {
    for (let i = htmlTable.childNodes.length - 1; i >= 0; i--) {
        htmlTable.removeChild(htmlTable.childNodes[i]);
    }
    let table = app.tables[app.currentTabId];
    for (let j = 0; j < 3; j++) {
        let tr = document.createElement('tr');
        for (let k = 0; k  < 4; k++) {
            let td = document.createElement('td');
            td.innerHTML = `${table[k + j * 4][0]} * ${table[k + j * 4][1]}`;
            td.setAttribute('data', table[k + j * 4][0] + ' ' + table[k + j * 4][1]);
            td.addEventListener('click', e => {
                let [a, b] = e.target.getAttribute('data').split(' ');
                console.log(a, b);
                if (a * b == app.answers[app.currentTabId]) {
                    td.classList.add('good');
                } else {
                    td.classList.add('bad');
                }
            });
            tr.appendChild(td);
        }
        htmlTable.appendChild(tr);
    }
}