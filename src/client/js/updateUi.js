export async function updateUi() {
	const request = await fetch('/get');
	try {
		const tripDetails = await request.json();
		console.log(tripDetails);
		// City
		document.getElementById('city-name').innerHTML = tripDetails.city;
		document.getElementById('country-name').innerHTML = tripDetails.country;
		// Dates
		const days = (tripDetails.daysRemain == 1) ? 'day' : 'days';
		const nights = (tripDetails.duration == 1) ? 'night' : 'nights';
		document.getElementById('departure-date').innerHTML = `Starts: ${tripDetails.departureDate}`;
		document.getElementById('arrival-date').innerHTML = `Ends: ${tripDetails.arrivalDate}`;
		document.getElementById('days-remain').innerHTML = `Your upcoming trip is in: ${tripDetails.daysRemain} ${days}`;
		document.getElementById('duration').innerHTML = `Trip duration: ${tripDetails.duration} ${nights}`;
		// Image
		document.getElementById('city-image').style.backgroundImage = `url(${tripDetails.imageUrl})`;
		document.getElementById('image-author').innerHTML = `Photo by ${tripDetails.imageAuthor} from Pixabay`;
		// Weather
		document.getElementById('temperature-current').innerHTML = `${tripDetails['temp-now']} °C`;
		document.getElementById('temperature-highest').innerHTML = `Max. temp: ${tripDetails['temp-max']} °C`;
		document.getElementById('temperature-lowest').innerHTML = `Min. temp: ${tripDetails['temp-min']} °C`;
	}
	catch(error) {
		console.log('Something went wrong with updating the UI: ', error);
	}
}
