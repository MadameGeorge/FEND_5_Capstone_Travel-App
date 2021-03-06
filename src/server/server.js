/* Server setup */

// Require Express to run server and routes
const express = require('express');
const fetch = require('node-fetch');
// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware */
// Express config to use body-parser as middleware.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors()); 

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 8081;

// eslint-disable-next-line no-unused-vars
const server = app.listen(port, () => {
	console.log('server is running');
	console.log('running on localhost: ' + port);
});

// Setup dotenv
const dotenv = require('dotenv');
dotenv.config();



/* Weatherbit API call */

// POST route to receive a call with data from client
app.post('/weather', async (req, res) => {
	const duration = req.body.duration;
	const weather = await getWeather(duration);
	res.send(weather);
});
// Function to make a call to Weatherbit
const getWeather = async (duration) => {
	// WeatherBit API url
	const weatherbitApiKey = process.env.WEATHERBIT_API_ID;
	const weatherbitQueryUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
	const lat = results.latitude;
	const lon = results.longitude;
	const response = await fetch(`${weatherbitQueryUrl}${lat}&lon=${lon}&days=${duration}&key=${weatherbitApiKey}`);
	try {
		const weather = await response.json();
		return weather;
	}
	catch(error) {
		console.log('Something went wrong with an Pixabay API: ', error);
	}
};



/* Pixabay API call */

// POST route to receive a call with data from client
app.post('/image', async (req, res) => {
	const city = req.body.city;
	const img = await getImage(city);
	res.send(img);
});

const getImage = async (city) => {
	// Pixabay API url
	const pixabayApiKey = process.env.PIXABAY_API_ID;
	const pixabayQueryUrl = `https://pixabay.com/api/?key=${pixabayApiKey}&q=`;

	const response = await fetch(pixabayQueryUrl + city + '&orientation=horizontal&image_type=photo&category=places');
	try {
		const apiPixabay = await response.json();
		return apiPixabay;
	}
	catch(error) {
		console.log('Something went wrong with an Pixabay API: ', error);
	}
};



/* Database object */
let results = {};



/* Endpoints */

// GET 
app.get('/get', getResults);
function getResults(req, res) {
	res.send(results);
}

// POST
app.post('/add', addTrip);
function addTrip(request, response) {
	results['departureDate'] = request.body.departureDate;
	results['arrivalDate'] = request.body.arrivalDate;
	results['daysRemain'] = request.body.daysRemain;
	results['duration'] = request.body.duration;
	results['city'] = request.body.city;
	results['latitude'] = request.body.latitude;
	results['longitude'] = request.body.longitude;
	results['country'] = request.body.country;
	response.send(results);
}

// PATCH
app.patch('/update', updateTrip);
function updateTrip(request, response) {
	if (request.body.imageUrl !== undefined) {
		results['imageUrl'] = request.body.imageUrl;
		results['imageAuthor'] = request.body.imageAuthor;
	}
	if (request.body.weather !== undefined) {
		results['weather'] = request.body.weather;
		results['temp-max'] = request.body.tempMax;
		results['temp-min'] = request.body.tempMin;
		results['temp-now'] = request.body.tempNow;
	}
	response.send(results);
}

module.exports = app;
