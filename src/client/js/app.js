/* Event listener to make API calls and update the UI with user and API data */
document.getElementById('generate').addEventListener('click', planTrip);

/* Function called by event listener */
export function planTrip() {
	
	// Get value of city and date form inputs
	let cityInput = encodeURIComponent(document.getElementById('city').value);
	let departureInput = document.getElementById('start-date').value;
	let arrivalInput = document.getElementById('end-date').value;

	// Geonames API url
	const geonamesApiKey = process.env.GEONAMES_API_ID;
	let geonamesQueryUrl = `http://api.geonames.org/searchJSON?q=${cityInput}&username=${geonamesApiKey}`;

	// Call Geonames API
	getApiGeonames(geonamesQueryUrl)
		.then( async function(apiGeonames) {
			// Calculate days remaining to the trip and trip duration
			let departureDate = new Date(departureInput);
			let arrivalDate = new Date(arrivalInput);
			let today = new Date();
			let timeToTrip = departureDate.getTime() - today.getTime();
			let daysToTrip = (timeToTrip / (1000 * 3600 * 24)).toFixed(0);
			let durationTime = arrivalDate.getTime() - departureDate.getTime();
			let durationDays = (durationTime / (1000 * 3600 * 24)).toFixed(0);

			// Then post trip details to the express server
			await postData('/add', {
				departureDate: departureInput,
				arrivalDate: arrivalInput,
				daysRemain: daysToTrip,
				duration: durationDays,
				city: apiGeonames.geonames[0].name, 
				latitude: apiGeonames.geonames[0].lat, 
				longitude: apiGeonames.geonames[0].lng,
				country: apiGeonames.geonames[0].countryName
			});

			// Then post image retrieved from Pixabay API to the express server
			await postData('/image', { city: cityInput})
				.then(function(apiPixabay) {
					console.log('PIXABAY' + apiPixabay);
					updateData('/update', {
						imageUrl: apiPixabay.hits[0].webformatURL,
						imageAuthor: apiPixabay.hits[0].user,
					});
				});

			// Then post weather retrieved from Weatherbits API to the express server
			await postData('/weather', { duration: durationDays })
				.then(function(apiWeatherbit) {
					console.log('WEATHERBIT' + apiWeatherbit);
					updateData('/update', {
						weather: apiWeatherbit.data[0].weather.description,
						tempMax: apiWeatherbit.data[0]['max_temp'],
						tempMin: apiWeatherbit.data[0]['min_temp'],
						tempNow: apiWeatherbit.data[0].temp,
					});
				});

			// Then update app user interface
			await updateUi();
		});
}



/* Function to GET data from express server to update the UI with */
const updateUi = async () => {
	const request = await fetch('/get');
	try {
		const tripDetails = await request.json();
		console.log('UPDATE UI', tripDetails);
		// Trip
		const days = (tripDetails.daysRemain == 1) ? 'day' : 'days';
		const nights = (tripDetails.duration == 1) ? 'night' : 'nights';
		document.getElementById('city-name').innerHTML = `City: ${tripDetails.city}`;
		document.getElementById('country-name').innerHTML = `Country: ${tripDetails.country}`;
		document.getElementById('departure-date').innerHTML = `From: ${tripDetails.departureDate}`;
		document.getElementById('arrival-date').innerHTML = `To: ${tripDetails.arrivalDate}`;
		document.getElementById('days-remain').innerHTML = `Your upcoming trip is in: ${tripDetails.daysRemain} ${days}`;
		document.getElementById('duration').innerHTML = `Trip duration: ${tripDetails.duration} ${nights}`;
		// Image
		const cityImage = document.getElementById('city-image');
		cityImage.setAttribute('src', tripDetails.imageUrl);
		document.getElementById('image-author').innerHTML = `Photo by ${tripDetails.imageAuthor} from Pixabay`;
		// Weather
		document.getElementById('weather').innerHTML = `Weather: ${tripDetails.weather}`;
		document.getElementById('temperature-highest').innerHTML = `Highest temperature: ${tripDetails['temp-max']} C`;
		document.getElementById('temperature-lowest').innerHTML = `Lowest temperature: ${tripDetails['temp-min']} C`;
		document.getElementById('temperature-current').innerHTML = `Current temperature: ${tripDetails['temp-now']} C`;
	}
	catch(error) {
		console.log('Something went wrong with updating the UI: ', error);
	}
}; 



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
		console.log('Something went wrong with fetching the POST data: ', error);
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
		const updatedData = await response.json();
		console.log(updatedData);
		return updatedData;
	}
	catch(error) {
		console.log('Something went wrong with fetching the PATCH data: ', error);
	}
};

/* Function to formated date needed to call Weatherbit */
// function weatherbitDate(date) {
// 	let formatedDepartureDate = new Date(date);
// 	let weatherbitDepartureDate = formatedDepartureDate.getFullYear() + '-' + (formatedDepartureDate.getMonth()+1) + '-' + formatedDepartureDate.getDate();
// 	console.log(weatherbitDepartureDate);
// 	return weatherbitDepartureDate;
// }
