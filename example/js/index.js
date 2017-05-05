/**
 * @name storm-geocoder: Google Maps API geocoder loader and abstraction layer
 * @version 1.0.2: Fri, 05 May 2017 16:37:15 GMT
 * @author stormid
 * @license MIT
 */
import Load from 'storm-load';
import defaults from './lib/defaults';
import componentPrototype from './lib/component-prototype';

const GMAPI = 'http://maps.googleapis.com/maps/api/js?callback=$__GMAPILoaded__$',
	  run = () => delete window.$__GMAPILoaded__$;

const init = settings => {
	window.$__GMAPILoaded__$ = run;
	
	return Load(GMAPI + (!settings || !settings.key ? '' : '&key=' + settings.key))
		.then(() => Object.assign(Object.create(componentPrototype), {
				settings: Object.assign({}, defaults, settings)
			}).init())
		.catch(e => console.log(`Script loading error: ${e.message}`));
};

export default { init };