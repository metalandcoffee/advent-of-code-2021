import { data } from './data.js';

// https://adventofcode.com/2021/day/1/input
const dataArr = data.split('\n');
console.log(dataArr);

let gammaRate = '';
let epsilonRate = '';

for (let i = 0; i < dataArr[0].length; i++) {
    let zeroes = 0;
    let ones = 0;
    for (const binary of dataArr) {
        if ('0' === binary[i]) {
            zeroes++;
        }
        if ('1' === binary[i]) {
            ones++;
        }
    }

    gammaRate += zeroes > ones ? '0' : '1';
    epsilonRate += zeroes > ones ? '1' : '0';
}

console.log(`Day 3, Part 1 Answer `, parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));

// Oxygen Generator Rating.
let oxyGenArr = dataArr;
let cO2ScrubArr = dataArr;
for (let i = 0; i < 12; i++) {
    let zeroes = 0;
    let ones = 0;
    let onesArr = [];
    let zeroesArr = [];

    if (oxyGenArr.length > 1) {
        for (const binary of oxyGenArr) {
            if ('0' === binary[i]) {
                zeroesArr.push(binary);
                zeroes++;
            }
            if ('1' === binary[i]) {
                onesArr.push(binary);
                ones++;
            }
        }

        // Tally up!
        if (ones > zeroes) {
            oxyGenArr = onesArr;
        } else if (zeroes > ones) {
            oxyGenArr = zeroesArr;
        } else {
            oxyGenArr = onesArr;
        }
    }

    zeroes = 0;
    ones = 0;
    onesArr = [];
    zeroesArr = [];

    if (cO2ScrubArr.length > 1) {
        for (const binary of cO2ScrubArr) {
            if ('0' === binary[i]) {
                zeroesArr.push(binary);
                zeroes++;
            }
            if ('1' === binary[i]) {
                onesArr.push(binary);
                ones++;
            }
        }

        // Tally up!
        if (ones > zeroes) {
            cO2ScrubArr = zeroesArr;
        } else if (zeroes > ones) {
            cO2ScrubArr = onesArr;
        } else {
            cO2ScrubArr = zeroesArr;
        }
    }
}

console.log(`Oxygen Generator rating`, oxyGenArr, parseInt(oxyGenArr[0], 2));
console.log(`CO2 Scrubber rating`, cO2ScrubArr, parseInt(cO2ScrubArr[0], 2));
console.log(`Day 3, Part 2 Answer `, parseInt(oxyGenArr[0], 2) * parseInt(cO2ScrubArr[0], 2));