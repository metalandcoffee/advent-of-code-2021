import { data } from './data.js';
//import { data } from './sampleData.js';
// https://adventofcode.com/2021/day/5/input

// Restructure data.
let dataArr = data.trim().split('\n');
const coords = dataArr.map(el => {
    return el.split(' -> ').map(coord => {
        return coord.split(',');
    });
});
//console.log(dataArr);

// Plot lines.
const graph = [];
for (let coord of coords) {
    // 
    /**
     * [5,9] -> [1,9] Vertical line example
     * [1,5] -> [4,5] Horizontal line example
     * Determine if its a horizontal or vertical line first.
     * This example is a vertical line.
     * Take the x coordinates and plot each point within range of the 2.
     */

    const x1 = parseInt(coord[0][0]);
    const x2 = parseInt(coord[1][0]);
    const y1 = parseInt(coord[0][1]);
    const y2 = parseInt(coord[1][1]);

    // Horizontal line.
    if (x1 === x2) {
        for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
            // Check if point already exists.
            const matches = graph.filter(point => {
                return point.x === x1 && point.y === i;
            });
            if (matches.length === 1) {
                matches[0].count++;
                continue;
            }
            const pointObj = {
                x: x1,
                y: i,
                count: 1
            }
            graph.push(pointObj);
        }
    } else if (y1 === y2) { // Vertical line.
        for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
            // Check if point already exists.
            const matches = graph.filter(point => {
                return point.y === y1 && point.x === i;
            });
            if (matches.length === 1) {
                matches[0].count++;
                continue;
            }
            const pointObj = {
                x: i,
                y: y1,
                count: 1
            }
            graph.push(pointObj);
        }
    } else {
        // Diagonal line.
        /**
         * [0,0] -> [2,2]
         * [8,8] -> [6,6]
         * [8,0] -> [0,8]
         * All points: [8,0], [7,1], [6,2], [5,3], [4,4], [3,5], [2,6], [1,7] and [0,8]
         * 
         * [7,9] -> [9,7]
         * All points: [7,9], [8,8], and [9,7]
         */
        if (x1 > x2 && y1 > y2) {
            let currY = y1;
            for (let i = x1; i >= x2; i--) {
                // Check if point already exists.
                const matches = graph.filter(point => {
                    return point.y === currY && point.x === i;
                });
                if (matches.length === 1) {
                    matches[0].count++;
                    currY--;
                    continue;
                }

                const pointObj = {
                    x: i,
                    y: currY,
                    count: 1
                }
                graph.push(pointObj);
                currY--;
            }
        } else if (x1 < x2 && y1 < y2) {
            let currY = y1;
            for (let i = x1; i <= x2; i++) {
                // Check if point already exists.
                const matches = graph.filter(point => {
                    return point.y === currY && point.x === i;
                });
                if (matches.length === 1) {
                    matches[0].count++;
                    currY++;
                    continue;
                }

                const pointObj = {
                    x: i,
                    y: currY,
                    count: 1
                }
                graph.push(pointObj);
                currY++;
            }
        } else if (x1 > x2) {
            let currY = y1;
            for (let i = x1; i >= x2; i--) {
                // Check if point already exists.
                const matches = graph.filter(point => {
                    return point.y === currY && point.x === i;
                });
                if (matches.length === 1) {
                    matches[0].count++;
                    currY++;
                    continue;
                }

                const pointObj = {
                    x: i,
                    y: currY,
                    count: 1
                }
                graph.push(pointObj);
                currY++;
            }
        } else if (x2 > x1) {
            let currY = y1;
            for (let i = x1; i <= x2; i++) {
                // Check if point already exists.
                const matches = graph.filter(point => {
                    return point.y === currY && point.x === i;
                });
                if (matches.length === 1) {
                    matches[0].count++;
                    currY--;
                    continue;
                }

                const pointObj = {
                    x: i,
                    y: currY,
                    count: 1
                }
                graph.push(pointObj);
                currY--;
            }
        }
    }


}

const overlaps = graph.filter(point => point.count > 1);
console.log(graph);
console.log(`${overlaps.length} points overlap.`);
