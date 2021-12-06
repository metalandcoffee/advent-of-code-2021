import { data } from './data.js';

// https://adventofcode.com/2021/day/1/input
const dataArr = data.split('\n');
console.log(dataArr);
let count = 0;
/*let prevVal = '';
for (const value of dataArr) {

    // If a previous value has not been set, set it and go back to beginning of loop.
    if ('' === prevVal) {
        prevVal = parseInt(value);
        continue;
    }

    // Otherwise compare values.
    if (parseInt(value) > prevVal) {
        count++;
    }

    prevVal = parseInt(value);
}*/

let prevSum = '';
for (let i = 0; i < dataArr.length; i++) {
    // @todo: Check to make sure array elements exist (not greater than length)
    const sum = parseInt(dataArr[i]) + parseInt(dataArr[i + 1]) + parseInt(dataArr[i + 2]);
    //console.log(dataArr[i], dataArr[i + 1], dataArr[i + 2]);
    if ('' === prevSum) {
        prevSum = sum;
        continue;
    }

    if (sum > prevSum) {
        count++;
    }
    prevSum = sum;
}

console.log(count);
