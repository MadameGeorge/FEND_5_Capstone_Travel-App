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
const port = 8081;

const server = app.listen(port, () => {
	console.log('server is running');
	console.log('running on localhost: ' + port);
});

// Env
const dotenv = require('dotenv');
dotenv.config();

// Create an object to store data 
const journalEntry = {};

// Initialize all route with a callback function
app.get('/get', getJournalEntry);

function getJournalEntry(req, res) {
	res.send(journalEntry);
}

// // Post Route
app.post('/add', addJournalEntry);

function addJournalEntry(request, response) {
	journalEntry['date'] = request.body.date;
	journalEntry['temperature'] = request.body.temperature;
	journalEntry['content'] = request.body.content;
	response.send(journalEntry);
}
