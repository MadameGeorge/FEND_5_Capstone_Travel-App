// Require Express to run server and routes
const express = require('express');
const request = require('request');
const fetch = require('node-fetch');
// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors()); 

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 8080;

const server = app.listen(port, () => {
	console.log('server is running');
	console.log('running on localhost: ' + port);
});

// Setup dotenv
const dotenv = require('dotenv');
dotenv.config();

// Proxy for strict cors
// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	next();
// });


// Pixabay API url
const pixabayApiKey = process.env.PIXABAY_API_ID;
const pixabayQueryUrl = `https://pixabay.com/api/?key=${pixabayApiKey}&q=`;

// Pixabay API call
app.post('/getimage', async (req, res) => {
	const city = req.body.city;
	const img = await getImage(pixabayQueryUrl, city);
	res.send(img);
	console.log(img);
});

const getImage = async (pixabayQueryUrl, city) => {
	const response = await fetch(pixabayQueryUrl + city + '&orientation=horizontal&image_type=photo');
	try {
		const apiPixabay = await response.json();
		console.log('PIXABAY API' + apiPixabay);
		return apiPixabay;
	}
	catch(error) {
		console.log('Something went wrong with an Pixabay API: ', error);
	}
};


// Database
let results = {};

// Endpoints

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
	console.log(results);
	response.send(results);
}

// PATCH
app.patch('/update', updateTrip);
function updateTrip(request, response) {
	results['imageUrl'] = request.body.imageUrl;
	console.log(results);
	response.send(results);
}
