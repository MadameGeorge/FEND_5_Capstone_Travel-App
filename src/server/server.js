// Require Express to run server and routes
const express = require('express');
const request = require('request');

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

// Proxy for strict cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});
  
app.get('/jokes/random', (req, res) => {
	request(
		{ url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
		(error, response, body) => {
			if (error || response.statusCode !== 200) {
				return res.status(500).json({ type: 'error', message: error.message });
			}
			res.json(JSON.parse(body));
		}
	);
});
  
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => console.log(`listening on ${PORT}`));


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