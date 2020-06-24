// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', planTrip);

/* Function called by event listener */
export function planTrip(e) {
	

	// let dayToday = today.getDate() + '.' + (today.getMonth()+1) + '.' + today.getFullYear();

	// Personal API Key for OpenWeatherMap API
	const apiKey = process.env.API_ID;

	// Get value of city and date inputs
	let cityInput = encodeURIComponent(document.getElementById('city').value);
	let departureInput = document.getElementById('departure').value;
	// Geonames API url
	const baseUrl = 'http://api.geonames.org/searchJSON?q=';
	// Create Geonames query URL with user input
	let queryUrl = `${baseUrl} ${cityInput} &username= ${apiKey}`;
	
	// Call Geonames API
	getApiGeonames(queryUrl)
		// Then post the data to the express server
		.then(function(apiGeonames) {
			// Calculate days remain to the trip
			var departureDate = new Date(departureInput);
			let today = new Date();
			let timeToTrip = departureDate.getTime() - today.getTime();
			let daysToTrip = (timeToTrip / (1000 * 3600 * 24)).toFixed(0);
			console.log(daysToTrip);
			// Post the data as an object
			postData('/add', {
				departureDate: departureInput,
				daysRemain: daysToTrip,
				city: apiGeonames.geonames[0].name, 
				latitude: apiGeonames.geonames[0].lat, 
				longitude: apiGeonames.geonames[0].lng,
				country: apiGeonames.geonames[0].countryName
			});
		})
		// Then update UI
		.then( () => {
			updateUi();
		});
}

/* Function to GET Web API Data*/
const getApiGeonames = async (url) => {
	let request = await fetch(url);
	try {
		const apiGeonames = await request.json();
		console.log(apiGeonames);
		return apiGeonames;
	}
	catch(error) {
		console.log('Something went wrong with an API: ', error);
	}
};

/* Function to POST data */
const postData = async ( url = '', data = {} ) => {
	let response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	});
	try {
		const newData = await response.json();
		console.log(newData);
		return newData;
	}
	catch(error) {
		console.log('Something went wrong with fetching the post data: ', error);
	}
};

/* Function to GET Project Data to update the UI*/
const updateUi = async () => {
	const request = await fetch('/get');
	try {
		const tripDetails = await request.json();
		console.log(tripDetails);
		const days = (tripDetails.daysRemain == 1) ? 'day' : 'days';
		console.log(days);
		document.getElementById('city-name').innerHTML = `City: ${tripDetails.city}`;
		document.getElementById('country-name').innerHTML = `Country: ${tripDetails.country}`;
		document.getElementById('departure-date').innerHTML = `Country: ${tripDetails.departureDate}`;
		document.getElementById('days-remain').innerHTML = `Your trip is in: ${tripDetails.daysRemain} ${days}`;
	}
	catch(error) {
		console.log('Something went wrong with updating the UI: ', error);
	}
}; 