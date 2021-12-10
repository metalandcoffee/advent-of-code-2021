//import { data } from './data.js';
import { data } from './sampleData.js';
// https://adventofcode.com/2021/day/5/input

// Restructure data.
let dataArr = data.trim().split('\n');
dataArr = dataArr.map(el => {
    return el.split(' -> ').map(coord => {
        return coord.split(',');
    });
});
//console.log(dataArr);

// Filter coordinates to only pairs that form horizontal and vertical lines.
const coords = dataArr.filter(el => {
    if (parseInt(el[0][0]) === parseInt(el[1][0]) || parseInt(el[0][1]) === parseInt(el[1][1])) { // same x or y coords (i.e. [8,2] -> [8,4]).
        return true;
    } else {
        return false;
    }
});
console.log(coords);

// Initialize graph.
let diagram = [];
for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
        row.push(0);
    }
    diagram.push(row);
}

// Render graph.
let html = '';
for (let row of diagram) {
    for (let num of row) {
        html += `<span>${num === 0 ? '*' : num}</span>`;
    }
    html += '<br />';
}
app.innerHTML = html;

// Plot lines.
for (let coord of coords) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if ((i === parseInt(coord[0][0]) && j === parseInt(coord[0][1])) ||
                (i === parseInt(coord[1][0]) && j === parseInt(coord[1][1]))) {
                diagram[j][i] += 1;
                // Check if position is within range of 2 coordinates [1,9] [6,9].
            } else if (((i >= parseInt(coord[0][0]) && i <= parseInt(coord[1][0])) && j === parseInt(coord[0][1]) && j === parseInt(coord[1][1])) ||
                ((i <= parseInt(coord[0][0]) && i >= parseInt(coord[1][0])) && j === parseInt(coord[0][1]) && j === parseInt(coord[1][1]))) {
                diagram[j][i] += 1;
            } else if (((j >= parseInt(coord[0][1]) && j <= parseInt(coord[1][1])) && i === parseInt(coord[0][0]) && i === parseInt(coord[1][0])) ||
                ((j <= parseInt(coord[0][1]) && j >= parseInt(coord[1][1])) && i === parseInt(coord[0][0]) && i === parseInt(coord[1][0]))) {
                diagram[j][i] += 1;
            }
        }
    }
}

// Render graph.
html = '';
for (let row of diagram) {
    for (let num of row) {
        html += `<span>${num === 0 ? '*' : num}</span>`;
    }
    html += '<br />';
}
app.innerHTML = html;
