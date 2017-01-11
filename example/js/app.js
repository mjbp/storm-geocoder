(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _stormGeocoder = require('./libs/storm-geocoder');

var _stormGeocoder2 = _interopRequireDefault(_stormGeocoder);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var onDOMContentLoadedTasks = [function () {
	var form = document.querySelector('.js-geocode'),
	    render = function render(data) {
		form.insertAdjacentHTML('afterend', '<table class="js-results results">' + data.map(function (row) {
			return '<tr>\n\t\t\t\t\t<td>' + row.formatted_address + '</td>\n\t\t\t\t\t<td>' + String(row.geometry.location.lat()).substr(0, 5) + ', ' + String(row.geometry.location.lng()).substr(0, 5) + '</td>\n\t\t\t\t</tr>';
		}).join('') + '</table>');
	};

	_stormGeocoder2.default.init().then(function (geocoder) {
		console.log(geocoder);
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			/*
   geocoder.find({ address: document.querySelector('#q').value }, (res, status) => {
   	console.log(status, res);
   });
   */

			document.querySelector('.js-results') && form.parentNode.removeChild(document.querySelector('.js-results'));

			geocoder.promise(document.querySelector('#q').value).then(function (res) {
				render(res);
			}).catch(function (err) {
				form.insertAdjacentHTML('afterend', '<div class="js-results results">' + err + '</div>');
				console.log(err);
			});
		});
	}).catch(function (err) {
		console.log(err);
	});
}];

if ('addEventListener' in window) window.addEventListener('DOMContentLoaded', function () {
	onDOMContentLoadedTasks.forEach(function (fn) {
		return fn();
	});
});

},{"./libs/storm-geocoder":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stormLoad = require('storm-load');

var _stormLoad2 = _interopRequireDefault(_stormLoad);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

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
}; /**
    * @name storm-geocoder: Google Maps API geocoder loader and wrapper
    * @version 0.1.2: Wed, 11 Jan 2017 16:29:44 GMT
    * @author stormid
    * @license MIT
    */

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

exports.default = { init: init };

},{"storm-load":3}],3:[function(require,module,exports){
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

var synchronous = exports.synchronous = function synchronous(urls) {
	return new Promise(function (resolve, reject) {
		var next = function next() {
			if (!urls.length) return resolve();
			create(urls.shift()).then(next).catch(reject);
		};
		next();
	});
};

exports.default = function (urls) {
	var async = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	urls = [].concat(urls);
	if (!async) return synchronous(urls);

	return Promise.all(urls.map(function (url) {
		return create(url);
	}));
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL3N0b3JtLWdlb2NvZGVyLmpzIiwibm9kZV9tb2R1bGVzL3N0b3JtLWxvYWQvZGlzdC9zdG9ybS1sb2FkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7Ozs7QUFFQSxJQUFNLDJCQUEyQixZQUFNLEFBQ3RDO0tBQUksT0FBTyxTQUFBLEFBQVMsY0FBcEIsQUFBVyxBQUF1QjtLQUNqQyxTQUFTLFNBQVQsQUFBUyxhQUFRLEFBQ2hCO09BQUEsQUFBSyxtQkFBTCxBQUF3Qix3REFBaUQsQUFBSyxJQUFJLGVBQU8sQUFDeEY7bUNBQ08sSUFEUCxBQUNXLDhDQUNKLE9BQU8sSUFBQSxBQUFJLFNBQUosQUFBYSxTQUFwQixBQUFPLEFBQXNCLE9BQTdCLEFBQW9DLE9BQXBDLEFBQTJDLEdBRmxELEFBRU8sQUFBOEMsWUFBTyxPQUFPLElBQUEsQUFBSSxTQUFKLEFBQWEsU0FBcEIsQUFBTyxBQUFzQixPQUE3QixBQUFvQyxPQUFwQyxBQUEyQyxHQUZ2RyxBQUU0RCxBQUE4QyxLQUUxRztBQUx3RSxHQUFBLEVBQUEsQUFLdEUsS0FMSCxBQUF5RSxBQUtqRSxNQUNSO0FBUkYsQUFVQTs7eUJBQUEsQUFDRSxPQURGLEFBRUUsS0FBSyxvQkFBWSxBQUNqQjtVQUFBLEFBQVEsSUFBUixBQUFZLEFBQ1o7T0FBQSxBQUFLLGlCQUFMLEFBQXNCLFVBQVUsYUFBSyxBQUNwQztLQUFBLEFBQUUsQUFDRjtBQU1BOzs7Ozs7WUFBQSxBQUFTLGNBQVQsQUFBdUIsa0JBQWtCLEtBQUEsQUFBSyxXQUFMLEFBQWdCLFlBQVksU0FBQSxBQUFTLGNBQTlFLEFBQXlDLEFBQTRCLEFBQXVCLEFBRTVGOztZQUFBLEFBQ0UsUUFBUSxTQUFBLEFBQVMsY0FBVCxBQUF1QixNQURqQyxBQUN1QyxPQUR2QyxBQUVFLEtBQUssZUFB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LElBQVQsQ0FBYyxXQUFkLENBQTBCLENBQTFCO0FBQ0EsRUFSTSxDQUFQO0FBU0EsQ0FWRDs7QUFZTyxJQUFNLG9DQUFjLFNBQWQsV0FBYyxPQUFRO0FBQ2xDLFFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN2QyxNQUFJLE9BQU8sU0FBUCxJQUFPLEdBQU07QUFDaEIsT0FBSSxDQUFDLEtBQUssTUFBVixFQUFrQixPQUFPLFNBQVA7QUFDbEIsVUFBTyxLQUFLLEtBQUwsRUFBUCxFQUFxQixJQUFyQixDQUEwQixJQUExQixFQUFnQyxLQUFoQyxDQUFzQyxNQUF0QztBQUNBLEdBSEQ7QUFJQTtBQUNBLEVBTk0sQ0FBUDtBQU9BLENBUk07O2tCQVVRLFVBQUMsSUFBRCxFQUF3QjtBQUFBLEtBQWpCLEtBQWlCLHVFQUFULElBQVM7O0FBQ3RDLFFBQU8sR0FBRyxNQUFILENBQVUsSUFBVixDQUFQO0FBQ0EsS0FBSSxDQUFDLEtBQUwsRUFBWSxPQUFPLFlBQVksSUFBWixDQUFQOztBQUVaLFFBQU8sUUFBUSxHQUFSLENBQVksS0FBSyxHQUFMLENBQVM7QUFBQSxTQUFPLE9BQU8sR0FBUCxDQUFQO0FBQUEsRUFBVCxDQUFaLENBQVA7QUFDQSxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBHZW9jb2RlciBmcm9tICcuL2xpYnMvc3Rvcm0tZ2VvY29kZXInO1xuXG5jb25zdCBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcyA9IFsoKSA9PiB7XG5cdGxldCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWdlb2NvZGUnKSxcblx0XHRyZW5kZXIgPSBkYXRhID0+IHtcblx0XHRcdGZvcm0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGA8dGFibGUgY2xhc3M9XCJqcy1yZXN1bHRzIHJlc3VsdHNcIj4ke2RhdGEubWFwKHJvdyA9PiB7XG5cdFx0XHRcdHJldHVybiBgPHRyPlxuXHRcdFx0XHRcdDx0ZD4ke3Jvdy5mb3JtYXR0ZWRfYWRkcmVzc308L3RkPlxuXHRcdFx0XHRcdDx0ZD4ke1N0cmluZyhyb3cuZ2VvbWV0cnkubG9jYXRpb24ubGF0KCkpLnN1YnN0cigwLCA1KX0sICR7U3RyaW5nKHJvdy5nZW9tZXRyeS5sb2NhdGlvbi5sbmcoKSkuc3Vic3RyKDAsIDUpfTwvdGQ+XG5cdFx0XHRcdDwvdHI+YDtcblx0XHRcdH0pLmpvaW4oJycpfTwvdGFibGU+YCk7XG5cdFx0fTtcblxuXHRHZW9jb2RlclxuXHRcdC5pbml0KClcblx0XHQudGhlbihnZW9jb2RlciA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhnZW9jb2Rlcik7XG5cdFx0XHRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGUgPT4ge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdC8qXG5cdFx0XHRcdGdlb2NvZGVyLmZpbmQoeyBhZGRyZXNzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcScpLnZhbHVlIH0sIChyZXMsIHN0YXR1cykgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHN0YXR1cywgcmVzKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdCovXG5cblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXJlc3VsdHMnKSAmJiBmb3JtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXJlc3VsdHMnKSk7XG5cblx0XHRcdFx0Z2VvY29kZXJcblx0XHRcdFx0XHQucHJvbWlzZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcScpLnZhbHVlKVxuXHRcdFx0XHRcdC50aGVuKHJlcyA9PiB7XG5cdFx0XHRcdFx0XHRyZW5kZXIocmVzKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5jYXRjaChlcnIgPT4ge1xuXHRcdFx0XHRcdFx0Zm9ybS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgYDxkaXYgY2xhc3M9XCJqcy1yZXN1bHRzIHJlc3VsdHNcIj4ke2Vycn08L2Rpdj5gKTtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGVycik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KVxuXHRcdC5jYXRjaChlcnIgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coZXJyKTtcblx0XHR9KTtcbn1dO1xuXHRcbmlmKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4geyBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcy5mb3JFYWNoKChmbikgPT4gZm4oKSk7IH0pOyIsIi8qKlxuICogQG5hbWUgc3Rvcm0tZ2VvY29kZXI6IEdvb2dsZSBNYXBzIEFQSSBnZW9jb2RlciBsb2FkZXIgYW5kIHdyYXBwZXJcbiAqIEB2ZXJzaW9uIDAuMS4yOiBXZWQsIDExIEphbiAyMDE3IDE2OjI5OjQ0IEdNVFxuICogQGF1dGhvciBzdG9ybWlkXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuaW1wb3J0IExvYWQgZnJvbSAnc3Rvcm0tbG9hZCc7XG5cbmNvbnN0IENPTlNUQU5UUyA9IHtcblx0XHRHTUFQSTogJ2h0dHA6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP2NhbGxiYWNrPSRfX0dNQVBJTG9hZGVkX18kJ1xuXHR9LFxuXHRkZWZhdWx0cyA9IHtcblx0XHRrZXk6IG51bGxcblx0fSxcblx0U3Rvcm1HZW9jb2RlciA9IHtcblx0XHRpbml0KCl7XG5cdFx0XHR0aGlzLm1hcHNHZW9jb2RlciA9IG5ldyB3aW5kb3cuZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcblx0XHRcdHRoaXMuZmluZCA9IHRoaXMubWFwc0dlb2NvZGVyLmdlb2NvZGU7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdHByb21pc2UocSl7XG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHR0aGlzLmZpbmQoeyBhZGRyZXNzOiBxIH0sIChyZXMsIHN0YXR1cykgPT4ge1xuXHRcdFx0XHRcdGlmKHN0YXR1cyAhPT0gZ29vZ2xlLm1hcHMuR2VvY29kZXJTdGF0dXMuT0spIHJldHVybiByZWplY3QoYEdvb2dsZSBNYXBzIEFQSSBzdGF0dXM6ICR7c3RhdHVzLnNwbGl0KCdfJykuam9pbignICcpLnRvTG93ZXJDYXNlKCl9YCk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fTtcblxuY29uc3QgcnVuID0gKCkgPT4gZGVsZXRlIHdpbmRvdy4kX19HTUFQSUxvYWRlZF9fJDtcblxuY29uc3QgaW5pdCA9IChzZWwsIGxvY3MsIG9wdHMpID0+IHtcblx0d2luZG93LiRfX0dNQVBJTG9hZGVkX18kID0gcnVuO1xuXHRcblx0cmV0dXJuIExvYWQoQ09OU1RBTlRTLkdNQVBJICsgKCFvcHRzIHx8ICFvcHRzLmtleSA/ICcnIDogJyZrZXk9JyArIG9wdHMua2V5KSlcblx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKFN0b3JtR2VvY29kZXIpLCB7XG5cdFx0XHRcdHNldHRpbmdzOiBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0cylcblx0XHRcdH0pLmluaXQoKTtcblx0XHR9KVxuXHRcdC5jYXRjaChlID0+IGNvbnNvbGUubG9nKGBTY3JpcHQgbG9hZGluZyBlcnJvcjogJHtlLm1lc3NhZ2V9YCkpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgeyBpbml0IH07IiwiLyoqXG4gKiBAbmFtZSBzdG9ybS1sb2FkOiBMaWdodHdlaWdodCBwcm9taXNlLWJhc2VkIHNjcmlwdCBsb2FkZXJcbiAqIEB2ZXJzaW9uIDAuMy4xOiBXZWQsIDExIEphbiAyMDE3IDEyOjU3OjMwIEdNVFxuICogQGF1dGhvciBzdG9ybWlkXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuY29uc3QgY3JlYXRlID0gdXJsID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRsZXQgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXHRcdHMuc3JjID0gdXJsO1xuXHRcdHMub25sb2FkID0gcy5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICghdGhpcy5yZWFkeVN0YXRlIHx8IHRoaXMucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykgcmVzb2x2ZSgpO1xuXHRcdH07XG5cdFx0cy5vbmVycm9yID0gcy5vbmFib3J0ID0gcmVqZWN0O1xuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocyk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHN5bmNocm9ub3VzID0gdXJscyA9PiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0bGV0IG5leHQgPSAoKSA9PiB7XG5cdFx0XHRpZiAoIXVybHMubGVuZ3RoKSByZXR1cm4gcmVzb2x2ZSgpO1xuXHRcdFx0Y3JlYXRlKHVybHMuc2hpZnQoKSkudGhlbihuZXh0KS5jYXRjaChyZWplY3QpO1xuXHRcdH07XG5cdFx0bmV4dCgpO1xuXHR9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0ICh1cmxzLCBhc3luYyA9IHRydWUpID0+IHtcblx0dXJscyA9IFtdLmNvbmNhdCh1cmxzKTtcblx0aWYgKCFhc3luYykgcmV0dXJuIHN5bmNocm9ub3VzKHVybHMpO1xuXG5cdHJldHVybiBQcm9taXNlLmFsbCh1cmxzLm1hcCh1cmwgPT4gY3JlYXRlKHVybCkpKTtcbn07Il19
