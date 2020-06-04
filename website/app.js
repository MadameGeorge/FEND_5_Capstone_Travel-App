/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let today = new Date();
let dayToday = today.getDate() + '.' + (today.getMonth()+1) + '.' + today.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = config.MY_API_KEY;

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', updateJournal);

/* Function called by event listener */
function updateJournal(e) {
	// Get value of a zipcode and feelings
	let zipCode = document.getElementById('zip').value;
	let feelings = document.getElementById('feelings').value;
	let queryUrl = baseUrl + zipCode + ',us' + apiKey;
	// Run funtion
	getApiWeather(queryUrl)
	// Then post the data
		.then(function(apiWeather) {
			postJournalEntry('/add', {
				date: dayToday, 
				temperature: apiWeather.main.temp, 
				content: feelings
			});
		})
		.then( () => {
			updateUi();
		});
}

/* Function to GET Web API Data*/
const getApiWeather = async (url) => {
	let request = await fetch(url);
	try {
		const apiWeather = await request.json();
		return apiWeather;
	}
	catch(error) {
		console.log('Something went wrong with an API: ', error);
	}
};

/* Function to POST data */
const postJournalEntry = async ( url = '', journal = {} ) => {
	let response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(journal)
	});
	try {
		const newJournalEntry = await response.json();
		return newJournalEntry;
	}
	catch(error) {
		console.log('Something went wrong with fetching the post data: ', error);
	}
};

/* Function to GET Project Data to update the UI*/
const updateUi = async () => {
	const request = await fetch('/get');
	try {
		const journalEntry = await request.json();
		document.getElementById('date').innerHTML = `Date: ${journalEntry.date}`;
		document.getElementById('temp').innerHTML = `Temperature: ${journalEntry.temperature} °F`;
		document.getElementById('content').innerHTML = journalEntry.content;
	}
	catch(error) {
		console.log('Something went wrong with updating the UI: ', error);
	}
};
