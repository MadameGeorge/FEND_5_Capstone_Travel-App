import { planTrip } from '../src/client/js/app';
const fetchMock = require('fetch-mock');

describe('Test post route', () => {
	test('Checks if postRequest function is defined', () => {
		expect(planTrip()).toBeDefined();
	});

	test('Checks if postRequest  ', async () => {
		fetchMock.post('http://fake.com', { polarity: "positive" });
		const response = await planTrip('http://fake.com');

		expect.assertions(1);
		expect(response.polarity).toEqual('positive');
	});
});