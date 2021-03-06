//import { data } from './sampleData2.js';
import { data } from './data.js';
// https://adventofcode.com/2021/day/4/input

// Init variables.
const dataArr = data.split('\n');
const drawnNumbers = dataArr[0].split(',');
const app = document.getElementById('app');
let bingoCards = [];
let isWinner = false;
let matchedRow = [];
let matchedCol = [];
let drawnNumber = '';
let winningCard = [];

const renderData = (drawnNumbers, bingoCards, drawnNumIndex = undefined) => {
    let drawnNumHTml = `<h2>Bingo Number Queue:</h2><ul id="number-queue">`;
    drawnNumbers.forEach((num, index) => {
        if (undefined === drawnNumIndex) {
            drawnNumHTml += `<li>${num},</li>`;
        } else {
            if (index <= drawnNumIndex) {
                drawnNumHTml += `<li class="true">${num},</li>`;
            } else {
                drawnNumHTml += `<li>${num},</li>`;
            }
        }
    });
    drawnNumHTml += `</ul>`;

    // Display bingo cards
    let bingoCardHtml = `<h2>Bingo Cards</h2><section class="bingo-cards">`;
    for (let card of bingoCards) {
        bingoCardHtml += `<table>`;
        for (let row of card) {
            bingoCardHtml += `<tr>`;
            for (let num of row) {
                bingoCardHtml += `<td class="${Object.values(num)[0]}">${Object.keys(num)[0]}</td>`;
            }
            bingoCardHtml += `</tr>`;
        }
        bingoCardHtml += `</table>`;
    }
    bingoCardHtml += `</section>`;
    app.innerHTML = drawnNumHTml + bingoCardHtml;
};

// Debugging.
//console.log(dataArr);

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
//console.log(bingoCards);

// Display Drawn Number Queue.
renderData(drawnNumbers, bingoCards);

// Establish bingo matches while looping through each drawn number.
//for (let i = 0; i < 1; i++) {
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

    // Re-render display.
    renderData(drawnNumbers, bingoCards, i);

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

            // Break if winner found.
            if (isWinner) break;
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
console.log(`solution`, drawnNumber * winningCardSum);
// console.log(isWinner, matchedRow, matchedCol);
