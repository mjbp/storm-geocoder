import should from 'should';
import Geocoder from '../dist/storm-geocoder.standalone';
import 'jsdom-global/register';


describe('Initialisation promise', () => {
	
});

describe('Initialisation return object', () => {

	Geocoder
		.init({key: 'Your key here'})
		.then(geocoder => {
			it('should resolve geocoder object', () => {
				should(geocoder)
				.Object();
			});
		});
	
});