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

        console.log(controlMsg.bitArray);

        controlMsg.bitArray.forEach((val, idx) => {
            const binaryCounter = (idx+1)
                .toString(2)
                .padStart(controlMsg.controlBitsPositions.length, '0')
                .split('')
                .map((val) => Number(val));

            binaryCounter.forEach((ival, iidx) => {
                // console.log(ival, val);
                if(ival === 1 && val === 1){
                    controlBitsCountArray[iidx]++;
                }
                console.log('counter',binaryCounter, val);
            });
        });
        console.log(controlBitsCountArray);

        const finalControlBitsArray = controlBitsCountArray.reverse().map((val) => val%2===0 ? 0 : 1);

        console.log(finalControlBitsArray);

        // for(let c = 0; c < controlMsg.bitArray.length; c++) {
        //     const binaryCounter = c.toString(2).padStart(controlMsg.controlBitsPositions.length, '0');
        //
        //     console.log(binaryCounter);
        // }
    },
};
