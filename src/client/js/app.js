// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', planTrip);

/* Function called by event listener */
export function planTrip(e) {
	

	// Get value of city and date inputs
	let cityInput = encodeURIComponent(document.getElementById('city').value);
	let departureInput = document.getElementById('start-date').value;
	let arrivalInput = document.getElementById('end-date').value;

	// API Key for Geonames API
	const geonamesApiKey = process.env.GEONAMES_API_ID;
	// Geonames API url
	const geonamesUrl = 'http://api.geonames.org/searchJSON?q=';
	// Create Geonames query URL with user input
	let geonamesQueryUrl = `${geonamesUrl} ${cityInput} &username= ${geonamesApiKey}`;

	// API Key for Geonames API
	const pixabayApiKey = process.env.PIXABAY_API_ID;
	// Pixabay API url
	const pixabayUrl = 'https://pixabay.com/api';
	let pizabayQueryUrl = `${pixabayUrl} ${cityInput} &username= ${pixabayApiKey}`;
	// Call Geonames API
	getApiGeonames(geonamesQueryUrl)
		// Then post the data to the express server
		.then(function(apiGeonames) {
			// Calculate days remain to the trip
			let departureDate = new Date(departureInput);
			let arrivalDate = new Date(arrivalInput);
			let today = new Date();
			let timeToTrip = departureDate.getTime() - today.getTime();
			let daysToTrip = (timeToTrip / (1000 * 3600 * 24)).toFixed(0);
			let durationTime = arrivalDate.getTime() - departureDate.getTime();
			let durationDays = (durationTime / (1000 * 3600 * 24)).toFixed(0);

			console.log(daysToTrip);
			// Post the data as an object
			postData('/add', {
				departureDate: departureInput,
				arrivalDate: arrivalInput,
				daysRemain: daysToTrip,
				duration: durationDays,
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
		const nights = (tripDetails.duration == 1) ? 'night' : 'nights';
		console.log(days);
		document.getElementById('city-name').innerHTML = `City: ${tripDetails.city}`;
		document.getElementById('country-name').innerHTML = `Country: ${tripDetails.country}`;
		document.getElementById('departure-date').innerHTML = `From: ${tripDetails.departureDate}`;
		document.getElementById('arrival-date').innerHTML = `To: ${tripDetails.arrivalDate}`;
		document.getElementById('days-remain').innerHTML = `Your trip is in: ${tripDetails.daysRemain} ${days}`;
		document.getElementById('duration').innerHTML = `Trip duration: ${tripDetails.duration} ${nights}`;
	}
	catch(error) {
		console.log('Something went wrong with updating the UI: ', error);
	}
}; 