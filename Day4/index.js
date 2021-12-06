import { data } from './sampleData.js';

// https://adventofcode.com/2021/day/1/input
const dataArr = data.split('\n');
console.log(dataArr);

const drawnNumbers = dataArr[0];
const bingoCards = [];

// slice indexOf

for (let i = 0; i < dataArr.length; i++) {
    if (dataArr[i] === '') {
        // Grab bingo card and separate it out into its own array.
        let card = dataArr.slice(i + 1, i + 6);
        card = card.map(el => {
            const newEl = el.trim().replace(/\s+/g, ' ');
            return newEl.split(' ');
        });
        bingoCards.push(card);
    }
}

console.log(bingoCards);