const app = require('../src/server/server');
const supertest = require('supertest');
const request = supertest(app);

// eslint-disable-next-line no-undef
describe('Correct endpoints', () => {
	// eslint-disable-next-line no-undef
	test('Checks if GET route /get status is 200', async (done) => {
		const response = await request
			.get('/get');
		// eslint-disable-next-line no-undef
		expect(response.status).toBe(200);
		done();
	});
	test('Checks if POST route /add status is 200', async (done) => {
		const response = await request
			.post('/add')
			.send({
				city: 'Toronto'
			});
		expect(response.status).toBe(200);
		done();
	});
	test('Checks if PATCH route /update status is 200', async (done) => {
		const response = await request
			.patch('/update')
			.send({
				imageAuthor: 'Jack'
			});
		expect(response.status).toBe(200);
		done();
    });
    test('Checks if POST route /image status is 200', async (done) => {
		const response = await request
			.post('/image')
			.send({
				city: 'Toronto'
			});
		expect(response.status).toBe(200);
		done();
    });
    test('Checks if POST route /weather status is 200', async (done) => {
		const response = await request
			.post('/weather')
			.send({
				duration: '2'
			});
		expect(response.status).toBe(200);
		done();
	});
});
