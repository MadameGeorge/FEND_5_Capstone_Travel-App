export async function updateData ( url = '', data = {} ) {
	let response = await fetch(url, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	});
	try {
		const updatedData = await response.json();
		return updatedData;
	}
	catch(error) {
		console.log('Something went wrong with fetching the PATCH data: ', error);
	}
}
