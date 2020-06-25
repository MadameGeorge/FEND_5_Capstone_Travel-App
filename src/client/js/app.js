// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', planTrip);

/* Function called by event listener */
export function planTrip() {
	

	// Get value of city and date form inputs
	let cityInput = encodeURIComponent(document.getElementById('city').value);
	let departureInput = document.getElementById('start-date').value;
	let arrivalInput = document.getElementById('end-date').value;

	// WeatherBit API url
	const weatherbitApiKey = process.env.WEATHERBIT_API_ID;
	const weatherbitQueryUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weatherbitApiKey}`;
	// Change date input to WeatherBit format YYYY-MM-DD
	const weatherbitDate = weatherbitDate(departureInput);

	// Geonames API url
	const geonamesApiKey = process.env.GEONAMES_API_ID;
	let geonamesQueryUrl = `http://api.geonames.org/searchJSON?q=${cityInput}&username=${geonamesApiKey}`;

	// Call Geonames API
	getApiGeonames(geonamesQueryUrl)
		// Then post the data to the express server
		.then(function(apiGeonames) {
			// Calculate days remain to the trip
			let departureDate = new Date(departureInput);
			console.log(departureDate);
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

	
	// Call Pixabay API
	postData('/getimage', { city: cityInput})
		// Then post the data to the express server
		.then(function(apiPixabay) {
			console.log('PIXABAY pre post' + apiPixabay);
			updateData('/update', {
				imageUrl: apiPixabay.hits[0].webformatURL,
			});
		})
		// Then update UI
		.then( () => {
			displayImage();
		});
}

/* Function to formated date needed to call Weatherbit */
function weatherbitDate(date) {
	let formatedDepartureDate = new Date(date);
	let weatherbitDepartureDate = formatedDepartureDate.getFullYear() + '-' + (formatedDepartureDate.getMonth()+1) + '-' + formatedDepartureDate.getDate();
	console.log(weatherbitDepartureDate);
	return weatherbitDepartureDate;
}

/* Function to GET Geonames API Data */
const getApiGeonames = async (url) => {
	let request = await fetch(url);
	try {
		const apiGeonames = await request.json();
		console.log(apiGeonames);
		return apiGeonames;
	}
	catch(error) {
		console.log('Something went wrong with an Geonames API: ', error);
	}
};

/* Function to PATCH (update) data */
const updateData = async ( url = '', data = {} ) => {
	let response = await fetch(url, {
		method: 'PATCH',
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

/* Function to GET Project Data to update the UI */
const updateUi = async () => {
	const request = await fetch('/get');
	try {
		const tripDetails = await request.json();
		const days = (tripDetails.daysRemain == 1) ? 'day' : 'days';
		const nights = (tripDetails.duration == 1) ? 'night' : 'nights';
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

/* Function to GET project data and display image in UI */
const displayImage = async () => {
	const request = await fetch('/get');
	try {
		const image = await request.json();
		console.log('PIXABAY UPDATE UI' + image);
		const cityImage = document.getElementById('city-image');
		console.log(cityImage);
		cityImage.setAttribute('src', image.imageUrl);
	}
	catch(error) {
		console.log('Something went wrong with updating the UI: ', error);
	}
};