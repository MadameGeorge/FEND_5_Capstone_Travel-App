export function formatDate(date) {
	let month = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
	let formatedDate = date.getDate() + ' ' + month + ' ' + date.getFullYear();
	return formatedDate;
}