import './index.less';
import ko from 'knockout';
import $ from 'jquery';
import _ from 'lodash';
import calculate from './calculate';

const viewModel = {
    codeString: ko.observable(''),
    inputError: ko.observable(false),
    computed: ko.observable(false),
    fullMessageString: ko.observable(''),
    initialMsg: ko.observable([]),
    controlMsg: ko.observable([]),
    finalMsg: ko.observable([]),
};

viewModel.inputClass = ko.pureComputed(function () {
    return this.inputError() ? 'codeInput--error' : '';
}, viewModel);

viewModel.buttonClass = ko.pureComputed(function () {
    return this.inputError() || !this.codeString() ? 'countButton--disabled' : '';
}, viewModel);

viewModel.initialMsgLen = ko.pureComputed(function () {
    return this.initialMsg().length;
}, viewModel);

viewModel.controlMsgLen = ko.pureComputed(function () {
    return this.controlMsg().length;
}, viewModel);

const matrix = [
    [5,5,5,5,6],
    [1,2,3,4,5],
    [3,4,5,2,2]
];

console.log(calculate.calculateAcceleration(matrix));
console.log(calculate.calculateCost(matrix, [2,4]));
console.log(calculate.calculateEfficiency(calculate.calculateAcceleration(matrix), [2,4]));

ko.applyBindings(viewModel);

console.log(viewModel.codeString());

viewModel.codeString.subscribe((data) => {
    const binaryReg = /^[01]+$/gmi;
    viewModel.inputError(!binaryReg.test(data) && data);
});

$('.countButton').on('click', () => {
    const bitArray = _.map(viewModel.codeString().split(''), (val) => Number(val));
    const bitAddResults = calculate.getControlBitsResults(_.clone(bitArray));
    const controlBitsPositions = bitAddResults.controlBitsPositions;
    const controlBitHandler = (value, idx) => {
        const cssClass = _.includes(controlBitsPositions, idx) ? 'results__bitBlock--control' : '';

        return {
            value,
            cssClass
        }
    };
    const fullArray = _.map(bitAddResults.bitArray, controlBitHandler);
    viewModel.initialMsg(bitArray);
    viewModel.controlMsg(fullArray);
    const result = _.map(calculate.calculateControlBits(bitAddResults), controlBitHandler);
    viewModel.finalMsg(result);
    viewModel.computed(true);
});



