const calculate = require('../src/calculate');
const expect  = require('chai').expect;


describe('"Calculate" module test', () => {
    describe('Test matrix count functions', () => {
        const matrix = [
            [5,5,5,5,6],
            [1,2,3,4,5],
            [3,4,5,2,2]
        ];
        const threadsArray = [2,4];
        const accResult = [[5, 2.5, 1.6667, 1.25, 1],[1.6667, 1.25, 1, 2.5, 2.5]];
        const costResult = [[2, 4, 6, 8, 10], [12, 16, 20, 8, 8]];
        const effResult = [[2.5, 1.25, 0.8334, 0.625, 0.5], [0.4167, 0.3125, 0.25, 0.625, 0.625]];

        it('testing Acceleration calculation', () => {
            calculate.calculateAcceleration(matrix).forEach((val, idx) => {
               val.forEach((ival, iidx) => {
                  expect(accResult[idx][iidx]).equal(ival);
               });
            });
        });
        it('testing Cost calculation', () => {
            calculate.calculateCost(matrix, threadsArray).forEach((val, idx) => {
                val.forEach((ival, iidx) => {
                    expect(costResult[idx][iidx]).equal(ival);
                });
            });
        });
        it('testing Efficiency calculation', () => {
            calculate.calculateEfficiency(accResult, threadsArray).forEach((val, idx) => {
                val.forEach((ival, iidx) => {
                    expect(effResult[idx][iidx]).equal(ival);
                });
            });
        });
    });

    describe('Test Hemming code calculation', () => {
        const initialMessage = '1010101';
        const controlMessage = {
            bitArrayStr: '0010010101',
            bitArray: ('0010010101').split(''),
            controlBitsPositions: [0,1,3]
        };
        const resultMessage = '0010010101';

        it('Test calculation with control bits', () => {
            expect(calculate.getControlBitsResults(initialMessage.split('')).bitArray.join(''))
                .equal(controlMessage.bitArrayStr);
        });
        it('Test final result calculation', () => {
            expect(calculate.calculateControlBits(controlMessage).result.join('')).equal(resultMessage);
        });
    });

    describe('Test calculation functions', () => {
       it('Test disp function', () => {
           expect(calculate.disp(4)).equal('-0.19232');
       });
        it('Test mat function', () => {
            expect(calculate.mat(4)).equal('9.47542');
        });
    });
});
