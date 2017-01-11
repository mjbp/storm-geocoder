/**
 * @name storm-geocoder: Google Maps API geocoder loader and wrapper
 * @version 0.1.2: Wed, 11 Jan 2017 16:29:44 GMT
 * @author stormid
 * @license MIT
 */
(function(root, factory) {
   var mod = {
       exports: {}
   };
   if (typeof exports !== 'undefined'){
       mod.exports = exports
       factory(mod.exports)
       module.exports = mod.exports.default
   } else {
       factory(mod.exports);
       root.StormGeocoder = mod.exports.default
   }

}(this, function(exports) {
   'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stormLoad = require('storm-load');

var _stormLoad2 = _interopRequireDefault(_stormLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONSTANTS = {
	GMAPI: 'http://maps.googleapis.com/maps/api/js?callback=$__GMAPILoaded__$'
},
    defaults = {
	key: null
},
    StormGeocoder = {
	init: function init() {
		this.mapsGeocoder = new window.google.maps.Geocoder();
		this.find = this.mapsGeocoder.geocode;
		return this;
	},
	promise: function promise(q) {
		var _this = this;

		return new Promise(function (resolve, reject) {
			_this.find({ address: q }, function (res, status) {
				if (status !== google.maps.GeocoderStatus.OK) return reject('Google Maps API status: ' + status.split('_').join(' ').toLowerCase());
				resolve(res);
			});
		});
	}
};

var run = function run() {
	return delete window.$__GMAPILoaded__$;
};

var init = function init(sel, locs, opts) {
	window.$__GMAPILoaded__$ = run;

	return (0, _stormLoad2.default)(CONSTANTS.GMAPI + (!opts || !opts.key ? '' : '&key=' + opts.key)).then(function () {
		return Object.assign(Object.create(StormGeocoder), {
			settings: Object.assign({}, defaults, opts)
		}).init();
	}).catch(function (e) {
		return console.log('Script loading error: ' + e.message);
	});
};

exports.default = { init: init };;
}));
