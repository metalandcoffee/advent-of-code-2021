import { data } from './data.js';
const dataArr = data.split('\n');
console.log(dataArr);

let depth = 0;
let hPosition = 0;
let aim = 0;

for (const value of dataArr) {
    const instruction = value.split(' ');
    instruction[1] = parseInt(instruction[1]);

    switch (instruction[0]) {
        case 'forward':
            hPosition += instruction[1];
            depth += aim * instruction[1];
            break;
        case 'up':
            aim -= instruction[1];
            break;
        case 'down':
            aim += instruction[1];
            break;
    }
}

console.log(hPosition * depth);