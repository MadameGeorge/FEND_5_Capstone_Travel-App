import { formatDate } from './formatDate';
import { updateData } from './updateData';
import { postData } from './postData';
import { getApiGeonames } from './getApiGeonames';
import { updateUi } from './updateUi';

export function planTrip() {
	document.getElementById('results').style.display = 'flex';
	// Get value of city and date form inputs
	let cityInput = encodeURIComponent(document.getElementById('city').value);
	let departureInput = document.getElementById('start-date').value;
	let arrivalInput = document.getElementById('end-date').value;

	// Calculate days remaining to the trip and trip duration
	let departureDate = new Date(departureInput);
	console.log(departureDate);
	let arrivalDate = new Date(arrivalInput);
	const formatedDepartureDate = formatDate(departureDate);
	console.log(formatedDepartureDate);

	const formatedArrivalDate = formatDate(arrivalDate);
	let today = new Date();
	let timeToTrip = departureDate.getTime() - today.getTime();
	let daysToTrip = (timeToTrip / (1000 * 3600 * 24)).toFixed(0);
	let durationTime = arrivalDate.getTime() - departureDate.getTime();
	let durationDays = (durationTime / (1000 * 3600 * 24)).toFixed(0);

	// Geonames API url
	const geonamesApiKey = process.env.GEONAMES_API_ID;
	let geonamesQueryUrl = `http://api.geonames.org/searchJSON?q=${cityInput}&username=${geonamesApiKey}`;

	// Call Geonames API
	getApiGeonames(geonamesQueryUrl)
		.then( async function(apiGeonames) {

			// Then post trip details to the express server
			await postData('/add', {
				departureDate: formatedDepartureDate,
				arrivalDate: formatedArrivalDate,
				daysRemain: daysToTrip,
				duration: durationDays,
				city: apiGeonames.geonames[0].name, 
				latitude: apiGeonames.geonames[0].lat, 
				longitude: apiGeonames.geonames[0].lng,
				country: apiGeonames.geonames[0].countryName
			});

			// Then post image retrieved from Pixabay API to the express server
			await postData('/image', { city: cityInput })
				.then(function(apiPixabay) {
					updateData('/update', {
						imageUrl: apiPixabay.hits[0].webformatURL,
						imageAuthor: apiPixabay.hits[0].user,
					});
				}).catch((error) => {
					console.log('Pixabay api error:', error);
					updateData('/update', {
						imageUrl: 'https://images.unsplash.com/photo-1592157874621-0a8033a473b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80',
						imageAuthor: 'Photo by Baptiste Gousset from Unsplash',
					});
				});

			// Then post weather retrieved from Weatherbits API to the express server
			await postData('/weather', { duration: durationDays })
				.then(function(apiWeatherbit) {
					updateData('/update', {
						weather: apiWeatherbit.data[0].weather.description,
						tempMax: apiWeatherbit.data[0]['max_temp'],
						tempMin: apiWeatherbit.data[0]['min_temp'],
						tempNow: apiWeatherbit.data[0].temp,
					});
				}).catch((error) => {
					console.log('Weatherbit api error:', error);
				});

			// Then update app user interface
			await updateUi();
		});
}
