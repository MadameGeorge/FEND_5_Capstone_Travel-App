export async function getApiGeonames (url) {
	let request = await fetch(url);
	try {
		const apiGeonames = await request.json();
		return apiGeonames;
	}
	catch(error) {
		console.log('Something went wrong with an Geonames API: ', error);
	}
}
