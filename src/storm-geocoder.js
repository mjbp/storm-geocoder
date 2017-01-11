import Load from 'storm-load';

const CONSTANTS = {
		GMAPI: 'http://maps.googleapis.com/maps/api/js?callback=$__GMAPILoaded__$'
	},
	defaults = {
		key: null
	},
	StormGeocoder = {
		init(){
			this.mapsGeocoder = new window.google.maps.Geocoder();
			this.find = this.mapsGeocoder.geocode;
			return this;
		},
		promise(q){
			return new Promise((resolve, reject) => {
				this.find({ address: q }, (res, status) => {
					if(status !== google.maps.GeocoderStatus.OK) return reject(`Google Maps API status: ${status.split('_').join(' ').toLowerCase()}`);
					resolve(res);
				});
			});
		}
	};

const run = () => delete window.$__GMAPILoaded__$;

const init = (sel, locs, opts) => {
	window.$__GMAPILoaded__$ = run;
	
	return Load(CONSTANTS.GMAPI + (!opts || !opts.key ? '' : '&key=' + opts.key))
		.then(() => {
			return Object.assign(Object.create(StormGeocoder), {
				settings: Object.assign({}, defaults, opts)
			}).init();
		})
		.catch(e => console.log(`Script loading error: ${e.message}`));
};

export default { init };