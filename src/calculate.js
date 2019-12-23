const excludeFirst = (val, idx) => idx !== 0;
const reduceFloat = (val) => Number((val).toFixed(4));

module.exports = {
    getControlBitsResults: (bitArray) => {
        const initialLength = bitArray.length;
        const controlBitsPositions = [];

        for(let pow = 1; pow <= initialLength; pow *= 2) {
            const idx = pow - 1;

            bitArray.splice(idx, 0, 0);
            controlBitsPositions.push(idx);
        }

        return {
            bitArray,
            controlBitsPositions
        };
    },

    calculateControlBits: (controlMsg) => {
        const controlBitsCountArray = new Array(controlMsg.controlBitsPositions.length).fill(0);
        let bitmap = [];

        controlMsg.controlBitsPositions.forEach(() => {
            bitmap.push([]);
        });

        const countLength = controlMsg.controlBitsPositions.length;

        controlMsg.bitArray.forEach((val, idx) => {
            let binaryCounter = (idx + 1)
                .toString(2)
                .padStart(countLength, '0')
                .split('')
                .map((val) => Number(val));

            if(binaryCounter.length > countLength) {
                binaryCounter = binaryCounter.slice(1, binaryCounter.length);
            }

            binaryCounter.forEach((ival, iidx) => {
                if(controlMsg.controlBitsPositions.length === binaryCounter.length) {
                    bitmap[iidx].push(ival);
                }
                if(ival === 1 && val === 1){
                    controlBitsCountArray[iidx]++;
                }
            });
        });

        bitmap = bitmap.map((val) => val.map((ival) => ival ? 'x' : ''));
        bitmap
            .reverse()
            .unshift([],[]);
        controlMsg.bitArray.forEach((val, idx) => {
            bitmap[0].push(idx + 1);
            bitmap[1].push(val);
        });

        const finalControlBitsArray = controlBitsCountArray.reverse().map((val) => val%2===0 ? 0 : 1);

        return {
            result: controlMsg.bitArray.map((val, idx) => {
                const controlIdx = controlMsg.controlBitsPositions.indexOf(idx);

                return  controlIdx !== -1 ? finalControlBitsArray[controlIdx] : val;
            }),
            bitmap
        }
    },

    calculateAcceleration: (matrix) => {
        return matrix
            .filter(excludeFirst)
            .map((row, idx) => {
                return row.map((val) => reduceFloat(matrix[0][idx] / val));
            });
    },

    calculateCost: (matrix, threadsArray) => {
        return matrix
            .filter(excludeFirst)
            .map((row, idx) => {
                return row.map((val) => reduceFloat(threadsArray[idx] * val));
            });
    },

    calculateEfficiency: (accelerationMatrix, threadsArray) => {
        return accelerationMatrix
            .map((row, idx) => {
                return row.map((val) => reduceFloat(val / threadsArray[idx]));
            });
    },

    disp: (coefficient) => (2 * Math.cos(coefficient) / (Math.sqrt(coefficient) * Math.sqrt(coefficient + 1)) + 0.1).toFixed(5),

    mat: (coefficient) => ((Math.log(coefficient)/2) * Math.sin(coefficient) + 10).toFixed(5),
};
