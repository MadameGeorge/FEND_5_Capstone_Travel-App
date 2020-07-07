export async function postData ( url = '', data = {} ) {
	let response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	});
	try {
		const newData = await response.json();
		return newData;
	}
	catch(error) {
		console.log('Something went wrong with fetching the POST data: ', error);
	}
}
