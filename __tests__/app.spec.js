import { planTrip } from '../src/client/js/app';
import { formatDate } from '../src/client/js/app';
// const fetchMock = require('fetch-mock');

describe('Test date format function', () => {
	test('Should be a function', () => {
		expect(typeof formatDate).toBe('function');
	}),

	test('Should change the format', () => {
		const date = 'Sun Jun 28 2020 01:00:00 GMT+0100 (British Summer Time)';
		const dateFormated = '28 June 2020';
		expect(formatDate(date)).toEqual(dateFormated);
	});
});

describe('Test app js', () => {

	document.body.innerHTML =
    '<div>' +
    '  <span id="username" />' +
    '  <button id="generate" />' +
    '  <div id="results" style="display:none;">' +
    '    <div id="city" />' +
    '    <div id="start-date" />' +
    '    <div id="end-date" />' +
    '</div>';

	document.getElementById('generate').addEventListener('click', planTrip);

	test('Should be a function', () => {
		expect(typeof planTrip).toBe('function');
	});
});