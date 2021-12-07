//import { data } from './sampleData.js';
import { data } from './data.js';
// https://adventofcode.com/2021/day/4/input

// Init variables.
const dataArr = data.split('\n');
const drawnNumbers = dataArr[0].split(',');
let bingoCards = [];
let isWinner = false;
let matchedRow = [];
let matchedCol = [];
let drawnNumber = '';
let winningCard = [];

// Debugging.
console.log(dataArr);

// Organize bingo cards (restructure data).
for (let i = 0; i < dataArr.length; i++) {
    if (dataArr[i] === '') {
        // Grab bingo card and separate it out into its own array.
        let card = dataArr.slice(i + 1, i + 6);
        card = card.map(el => {
            return el.trim().replace(/\s+/g, ' ').split(' ').map(el => {
                const obj = {};
                obj[el] = false;
                return obj;
            });
        });
        bingoCards.push(card);
    }
}

// Debugging.
console.log(bingoCards);

// Establish bingo matches while looping through each drawn number.
for (let i = 0; i < drawnNumbers.length; i++) {
    drawnNumber = drawnNumbers[i];
    bingoCards = bingoCards.map((card, index) => {
        return card.map((row, rIndex) => {
            return row.map((num, nIndex) => {
                const currentNum = Object.keys(num)[0];
                if (parseInt(currentNum) === parseInt(drawnNumber)) {
                    const obj = {};
                    obj[currentNum] = true;
                    return obj;
                }
                return num;
            })
        })
    });

    // Check for winners after 5th number is drawn.
    if (i > 5) {
        for (winningCard of bingoCards) {

            // Check for matching numbers in row.
            for (let row of winningCard) {
                let rowMarked = true;
                for (let num of row) {
                    const isMarked = Object.values(num)[0];
                    matchedRow.push(Object.keys(num)[0]);
                    if (!isMarked) {
                        rowMarked = false;
                        break;
                    }
                }
                isWinner = rowMarked;
                // Break if winner found.
                if (isWinner) break;
                matchedRow = [];
            }

            // Break if winner found.
            if (isWinner) break;

            //Check for matching numbers in column.
            for (let j = 0; j < winningCard.length; j++) {
                let colMarked = true;
                for (let row of winningCard) {
                    const isMarked = Object.values(row[j])[0];
                    matchedCol.push(Object.keys(row[j])[0]);
                    if (!isMarked) {
                        colMarked = false;
                        break;
                    }
                }
                isWinner = colMarked;
                // Break if winner found.
                if (isWinner) break;

                matchedCol = [];
                colMarked = true;
            }
        }
    }
    // Break if winner found.
    if (isWinner) break;
}

// Calculate answer for Advent of Code.
let winningCardSum = 0;

for (let row of winningCard) {
    for (let num of row) {
        if (false === Object.values(num)[0]) {
            winningCardSum += parseInt(Object.keys(num)[0]);
        }
    }
}


console.log(`winning card`, winningCardSum, winningCard);
console.log(`drawn number`, drawnNumber);
// console.log(`solution`, drawnNumber * winningCardSum);
// console.log(isWinner, matchedRow, matchedCol);
