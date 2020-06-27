const dateInputPolyfill = require('date-input-polyfill');

// Sass
import './styles/styles.scss';

// Js
import { planTrip } from './js/app.js';
import { formatDate } from './js/app.js';
import './js/date-input-polyfill.dist';

/* Event listener to make API calls and update the UI with user and API data */
document.getElementById('generate').addEventListener('click', planTrip);

// Export 
export {
	planTrip,
	formatDate
};