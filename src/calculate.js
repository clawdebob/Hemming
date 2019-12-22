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

        controlMsg.bitArray.forEach((val, idx) => {
            const binaryCounter = (idx + 1)
                .toString(2)
                .padStart(controlMsg.controlBitsPositions.length, '0')
                .split('')
                .map((val) => Number(val));

            binaryCounter.forEach((ival, iidx) => {
                if(ival === 1 && val === 1){
                    controlBitsCountArray[iidx]++;
                }
            });
        });

        const finalControlBitsArray = controlBitsCountArray.reverse().map((val) => val%2===0 ? 0 : 1);

        return controlMsg.bitArray.map((val, idx) => {
            const controlIdx = controlMsg.controlBitsPositions.indexOf(idx);

            return  controlIdx !== -1 ? finalControlBitsArray[controlIdx] : val;
        });
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
};
