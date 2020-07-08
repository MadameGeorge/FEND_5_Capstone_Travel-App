import { planTrip } from '../src/client/js/app';
import { formatDate } from '../src/client/js/formatDate';

describe('Test date format function', () => {
	test('Should be a function', () => {
		expect(typeof formatDate).toBe('function');
	}),

	test('Should change the format', () => {
		const date = '2020-07-06';
		const dateN =  new Date(date);
		const dateFormated = '6 July 2020';
		expect(formatDate(dateN)).toEqual(dateFormated);
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