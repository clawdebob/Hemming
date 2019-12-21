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
};

viewModel.inputClass = ko.pureComputed(function () {
    return this.inputError() ? 'codeInput--error' : '';
}, viewModel);

viewModel.buttonClass = ko.pureComputed(function () {
    return this.inputError() ? 'countButton--disabled' : '';
}, viewModel);

viewModel.initialMsgLen = ko.pureComputed(function () {
    return this.initialMsg().length;
}, viewModel);

viewModel.controlMsgLen = ko.pureComputed(function () {
    return this.controlMsg().length;
}, viewModel);

ko.applyBindings(viewModel);

viewModel.codeString.subscribe((data) => {
    const binaryReg = /^[01]+$/gmi;
    viewModel.inputError(!binaryReg.test(data) && data);
});

$('.countButton').on('click', () => {
   const bitArray = _.map(viewModel.codeString().split(''), (val) => Number(val));
   const bitAddResults = calculate.getControlBitsResults(_.clone(bitArray));
   // const fullArray = bitAddResults.bitArray;
   const controlBitsPositions = bitAddResults.controlBitsPositions;
   console.log(controlBitsPositions);
    const fullArray = _.map(bitAddResults.bitArray, (value, idx) => {
        const cssClass = _.includes(controlBitsPositions, idx) ? 'results__bitBlock--control' : '';

        return {
            value,
            cssClass
        }
    });
   const fullMessageString = _.reduce(bitArray, (str, val) => str + val, '');

   viewModel.initialMsg(bitArray);
   viewModel.controlMsg(fullArray);
    calculate.calculateControlBits(bitAddResults);
   viewModel.computed(true);
    console.log(fullMessageString);
});



