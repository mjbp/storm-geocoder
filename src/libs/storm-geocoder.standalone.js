/**
 * @name storm-geocoder: Google Maps API geocoder loader and wrapper
 * @version 0.1.2: Tue, 31 Jan 2017 17:45:49 GMT
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
/**
 * @name storm-load: Lightweight promise-based script loader
 * @version 0.3.1: Wed, 11 Jan 2017 12:57:30 GMT
 * @author stormid
 * @license MIT
 */
var create = function create(url) {
	return new Promise(function (resolve, reject) {
		var s = document.createElement('script');
		s.src = url;
		s.onload = s.onreadystatechange = function () {
			if (!this.readyState || this.readyState === 'complete') resolve();
		};
		s.onerror = s.onabort = reject;
		document.head.appendChild(s);
	});
};

var synchronous = function synchronous(urls) {
	return new Promise(function (resolve, reject) {
		var next = function next() {
			if (!urls.length) return resolve();
			create(urls.shift()).then(next).catch(reject);
		};
		next();
	});
};

var Load = function Load(urls) {
	var async = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	urls = [].concat(urls);
	if (!async) return synchronous(urls);

	return Promise.all(urls.map(function (url) {
		return create(url);
	}));
};

var CONSTANTS = {
	GMAPI: 'http://maps.googleapis.com/maps/api/js?callback=$__GMAPILoaded__$'
};
var defaults = {
	key: null
};
var StormGeocoder = {
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

	return Load(CONSTANTS.GMAPI + (!opts || !opts.key ? '' : '&key=' + opts.key)).then(function () {
		return Object.assign(Object.create(StormGeocoder), {
			settings: Object.assign({}, defaults, opts)
		}).init();
	}).catch(function (e) {
		return console.log('Script loading error: ' + e.message);
	});
};

var stormGeocoder = { init: init };

exports.default = stormGeocoder;;
}));
