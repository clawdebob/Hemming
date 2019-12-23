import './index.less';
import ko from 'knockout';
import $ from 'jquery';
import _ from 'lodash';
import calculate from './calculate';
import createTables from './createTables';

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

ko.applyBindings(viewModel);

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
    createTables.deleteTable('tact-table');
    viewModel.initialMsg(bitArray);
    viewModel.controlMsg(fullArray);
    const resObj = calculate.calculateControlBits(bitAddResults);
    const result = _.map(resObj.result, controlBitHandler);
    createTables.buildTables(resObj.bitmap, 'tact-table', 'Таблица тактов');
    const dataBits = $('#tact-table td, th');
    for(let column = 0; column < dataBits.length; column++) {
        const input = dataBits[column].querySelector('input[value="x"]');
        if(input) {
            dataBits[column].style['background-color'] = 'red';
            input.style['background-color'] = 'red';
        }
    }
    viewModel.finalMsg(result);
    viewModel.computed(true);
});



