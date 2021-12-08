import { data } from './sampleData.js';
//import { data } from './data.js';
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
const allWinners = [];
const wIds = [];
let lastDrawnNumber = '';
let lastWinningCard = '';

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
                /*
@todo - Check if a winner was found.
If found, check against winner array to see if winning row or column has already been tracked.
If it hasn't been tracked, then push to the winning array.
 */
                if (isWinner) {
                    const wId = btoa(JSON.stringify(matchedRow));
                    if (!wIds.includes(wId)) {
                        allWinners.push(matchedRow);
                        wIds.push(wId);
                        lastWinningCard = winningCard;
                    }
                    lastDrawnNumber = drawnNumber;
                }
                matchedRow = [];
                rowMarked = true;
                isWinner = false;
            }

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
                /*
           @todo - Check if a winner was found.
           If found, check against winner array to see if winning row or column has already been tracked.
           If it hasn't been tracked, then push to the winning array.
            */
                if (isWinner) {
                    const wId = btoa(JSON.stringify(matchedCol));
                    if (!wIds.includes(wId)) {
                        allWinners.push(matchedCol);
                        wIds.push(wId);
                        lastWinningCard = winningCard;
                    }
                    lastDrawnNumber = drawnNumber;
                }

                matchedCol = [];
                colMarked = true;
                isWinner = false;
            }
        }
    }
}

// Calculate answer for Advent of Code.
let lastWinningCardSum = 0;

for (let row of lastWinningCard) {
    for (let num of row) {
        if (false === Object.values(num)[0]) {
            lastWinningCardSum += parseInt(Object.keys(num)[0]);
        }
    }
}


console.log(lastDrawnNumber, lastWinningCard, allWinners);

