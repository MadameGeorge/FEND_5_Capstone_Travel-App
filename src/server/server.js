// Require Express to run server and routes
const express = require('express');

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

// // Env
// const dotenv = require('dotenv');
// dotenv.config();

// Initialize all route with a callback function
app.get('/get', getResults);

function getResults(req, res) {
	res.send(results);
}

// Post Route

const results = {};

app.post('/add', addTrip);

function addTrip(request, response) {
	results['departureDate'] = request.body.departureDate;
	results['daysRemain'] = request.body.daysRemain;
	results['city'] = request.body.city;
	results['latitude'] = request.body.latitude;
	results['longitude'] = request.body.longitude;
	results['country'] = request.body.country;
	console.log(results);
	response.send(results);
}