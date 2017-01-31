(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _stormLoad = require('storm-load');

var _stormLoad2 = _interopRequireDefault(_stormLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onDOMContentLoadedTasks = [function () {
	var form = document.querySelector('.js-geocode'),
	    render = function render(data) {
		form.insertAdjacentHTML('afterend', '<table class="js-results results">' + data.map(function (row) {
			return '<tr>\n\t\t\t\t\t<td>' + row.formatted_address + '</td>\n\t\t\t\t\t<td>' + String(row.geometry.location.lat()).substr(0, 5) + ', ' + String(row.geometry.location.lng()).substr(0, 5) + '</td>\n\t\t\t\t</tr>';
		}).join('') + '</table>');
	};

	(0, _stormLoad2.default)('./js/storm-geocoder.standalone.js').then(function () {
		StormGeocoder.init().then(function (geocoder) {
			console.log(geocoder);
			form.addEventListener('submit', function (e) {
				e.preventDefault();

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
	});

	/*
 Geocoder
 .init()
 .then(geocoder => {
 	console.log(geocoder);
 	form.addEventListener('submit', e => {
 		e.preventDefault();
 			document.querySelector('.js-results') && form.parentNode.removeChild(document.querySelector('.js-results'));
 			geocoder
 			.promise(document.querySelector('#q').value)
 			.then(res => {
 				render(res);
 			})
 			.catch(err => {
 				form.insertAdjacentHTML('afterend', `<div class="js-results results">${err}</div>`);
 				console.log(err);
 			});
 	});
 })
 .catch(err => {
 	console.log(err);
 });
 */
}];

if ('addEventListener' in window) window.addEventListener('DOMContentLoaded', function () {
	onDOMContentLoadedTasks.forEach(function (fn) {
		return fn();
	});
});

},{"storm-load":2}],2:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJub2RlX21vZHVsZXMvc3Rvcm0tbG9hZC9kaXN0L3N0b3JtLWxvYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFNLDBCQUEwQixDQUFDLFlBQU07QUFDdEMsS0FBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQUFYO0FBQUEsS0FDQyxTQUFTLFNBQVQsTUFBUyxPQUFRO0FBQ2hCLE9BQUssa0JBQUwsQ0FBd0IsVUFBeEIseUNBQXlFLEtBQUssR0FBTCxDQUFTLGVBQU87QUFDeEYsbUNBQ08sSUFBSSxpQkFEWCw2QkFFTyxPQUFPLElBQUksUUFBSixDQUFhLFFBQWIsQ0FBc0IsR0FBdEIsRUFBUCxFQUFvQyxNQUFwQyxDQUEyQyxDQUEzQyxFQUE4QyxDQUE5QyxDQUZQLFVBRTRELE9BQU8sSUFBSSxRQUFKLENBQWEsUUFBYixDQUFzQixHQUF0QixFQUFQLEVBQW9DLE1BQXBDLENBQTJDLENBQTNDLEVBQThDLENBQTlDLENBRjVEO0FBSUEsR0FMd0UsRUFLdEUsSUFMc0UsQ0FLakUsRUFMaUUsQ0FBekU7QUFNQSxFQVJGOztBQVVDLDBCQUFLLG1DQUFMLEVBQ0MsSUFERCxDQUNNLFlBQU07QUFDWCxnQkFDQyxJQURELEdBRUMsSUFGRCxDQUVNLG9CQUFZO0FBQ2pCLFdBQVEsR0FBUixDQUFZLFFBQVo7QUFDQSxRQUFLLGdCQUFMLENBQXNCLFFBQXRCLEVBQWdDLGFBQUs7QUFDcEMsTUFBRSxjQUFGOztBQUVBLGFBQVMsYUFBVCxDQUF1QixhQUF2QixLQUF5QyxLQUFLLFVBQUwsQ0FBZ0IsV0FBaEIsQ0FBNEIsU0FBUyxhQUFULENBQXVCLGFBQXZCLENBQTVCLENBQXpDOztBQUVBLGFBQ0UsT0FERixDQUNVLFNBQVMsYUFBVCxDQUF1QixJQUF2QixFQUE2QixLQUR2QyxFQUVFLElBRkYsQ0FFTyxlQUFPO0FBQ1osWUFBTyxHQUFQO0FBQ0EsS0FKRixFQUtFLEtBTEYsQ0FLUSxlQUFPO0FBQ2IsVUFBSyxrQkFBTCxDQUF3QixVQUF4Qix1Q0FBdUUsR0FBdkU7QUFDQSxhQUFRLEdBQVIsQ0FBWSxHQUFaO0FBQ0EsS0FSRjtBQVNBLElBZEQ7QUFlQSxHQW5CRCxFQW9CQyxLQXBCRCxDQW9CTyxlQUFPO0FBQ2IsV0FBUSxHQUFSLENBQVksR0FBWjtBQUNBLEdBdEJEO0FBdUJBLEVBekJEOztBQTJCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkQsQ0EvRCtCLENBQWhDOztBQWlFQSxJQUFHLHNCQUFzQixNQUF6QixFQUFpQyxPQUFPLGdCQUFQLENBQXdCLGtCQUF4QixFQUE0QyxZQUFNO0FBQUUseUJBQXdCLE9BQXhCLENBQWdDLFVBQUMsRUFBRDtBQUFBLFNBQVEsSUFBUjtBQUFBLEVBQWhDO0FBQWdELENBQXBHOzs7Ozs7OztBQ25FakM7Ozs7OztBQU1BLElBQU0sU0FBUyxTQUFULE1BQVMsTUFBTztBQUNyQixRQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdkMsTUFBSSxJQUFJLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFSO0FBQ0EsSUFBRSxHQUFGLEdBQVEsR0FBUjtBQUNBLElBQUUsTUFBRixHQUFXLEVBQUUsa0JBQUYsR0FBdUIsWUFBVztBQUM1QyxPQUFJLENBQUMsS0FBSyxVQUFOLElBQW9CLEtBQUssVUFBTCxLQUFvQixVQUE1QyxFQUF3RDtBQUN4RCxHQUZEO0FBR0EsSUFBRSxPQUFGLEdBQVksRUFBRSxPQUFGLEdBQVksTUFBeEI7QUFDQSxXQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLENBQTFCO0FBQ0EsRUFSTSxDQUFQO0FBU0EsQ0FWRDs7QUFZTyxJQUFNLG9DQUFjLFNBQWQsV0FBYyxPQUFRO0FBQ2xDLFFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN2QyxNQUFJLE9BQU8sU0FBUCxJQUFPLEdBQU07QUFDaEIsT0FBSSxDQUFDLEtBQUssTUFBVixFQUFrQixPQUFPLFNBQVA7QUFDbEIsVUFBTyxLQUFLLEtBQUwsRUFBUCxFQUFxQixJQUFyQixDQUEwQixJQUExQixFQUFnQyxLQUFoQyxDQUFzQyxNQUF0QztBQUNBLEdBSEQ7QUFJQTtBQUNBLEVBTk0sQ0FBUDtBQU9BLENBUk07O2tCQVVRLFVBQUMsSUFBRCxFQUF3QjtBQUFBLEtBQWpCLEtBQWlCLHVFQUFULElBQVM7O0FBQ3RDLFFBQU8sR0FBRyxNQUFILENBQVUsSUFBVixDQUFQO0FBQ0EsS0FBSSxDQUFDLEtBQUwsRUFBWSxPQUFPLFlBQVksSUFBWixDQUFQOztBQUVaLFFBQU8sUUFBUSxHQUFSLENBQVksS0FBSyxHQUFMLENBQVM7QUFBQSxTQUFPLE9BQU8sR0FBUCxDQUFQO0FBQUEsRUFBVCxDQUFaLENBQVA7QUFDQSxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBMb2FkIGZyb20gJ3N0b3JtLWxvYWQnO1xuXG5jb25zdCBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcyA9IFsoKSA9PiB7XG5cdGxldCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWdlb2NvZGUnKSxcblx0XHRyZW5kZXIgPSBkYXRhID0+IHtcblx0XHRcdGZvcm0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGA8dGFibGUgY2xhc3M9XCJqcy1yZXN1bHRzIHJlc3VsdHNcIj4ke2RhdGEubWFwKHJvdyA9PiB7XG5cdFx0XHRcdHJldHVybiBgPHRyPlxuXHRcdFx0XHRcdDx0ZD4ke3Jvdy5mb3JtYXR0ZWRfYWRkcmVzc308L3RkPlxuXHRcdFx0XHRcdDx0ZD4ke1N0cmluZyhyb3cuZ2VvbWV0cnkubG9jYXRpb24ubGF0KCkpLnN1YnN0cigwLCA1KX0sICR7U3RyaW5nKHJvdy5nZW9tZXRyeS5sb2NhdGlvbi5sbmcoKSkuc3Vic3RyKDAsIDUpfTwvdGQ+XG5cdFx0XHRcdDwvdHI+YDtcblx0XHRcdH0pLmpvaW4oJycpfTwvdGFibGU+YCk7XG5cdFx0fTtcblxuXHRcdExvYWQoJy4vanMvc3Rvcm0tZ2VvY29kZXIuc3RhbmRhbG9uZS5qcycpXG5cdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0U3Rvcm1HZW9jb2RlclxuXHRcdFx0LmluaXQoKVxuXHRcdFx0LnRoZW4oZ2VvY29kZXIgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhnZW9jb2Rlcik7XG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZSA9PiB7XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXJlc3VsdHMnKSAmJiBmb3JtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXJlc3VsdHMnKSk7XG5cblx0XHRcdFx0XHRnZW9jb2RlclxuXHRcdFx0XHRcdFx0LnByb21pc2UoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3EnKS52YWx1ZSlcblx0XHRcdFx0XHRcdC50aGVuKHJlcyA9PiB7XG5cdFx0XHRcdFx0XHRcdHJlbmRlcihyZXMpO1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5jYXRjaChlcnIgPT4ge1xuXHRcdFx0XHRcdFx0XHRmb3JtLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBgPGRpdiBjbGFzcz1cImpzLXJlc3VsdHMgcmVzdWx0c1wiPiR7ZXJyfTwvZGl2PmApO1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChlcnIgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvKlxuXHRHZW9jb2RlclxuXHRcdC5pbml0KClcblx0XHQudGhlbihnZW9jb2RlciA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhnZW9jb2Rlcik7XG5cdFx0XHRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGUgPT4ge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXJlc3VsdHMnKSAmJiBmb3JtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXJlc3VsdHMnKSk7XG5cblx0XHRcdFx0Z2VvY29kZXJcblx0XHRcdFx0XHQucHJvbWlzZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcScpLnZhbHVlKVxuXHRcdFx0XHRcdC50aGVuKHJlcyA9PiB7XG5cdFx0XHRcdFx0XHRyZW5kZXIocmVzKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5jYXRjaChlcnIgPT4ge1xuXHRcdFx0XHRcdFx0Zm9ybS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgYDxkaXYgY2xhc3M9XCJqcy1yZXN1bHRzIHJlc3VsdHNcIj4ke2Vycn08L2Rpdj5gKTtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGVycik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KVxuXHRcdC5jYXRjaChlcnIgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coZXJyKTtcblx0XHR9KTtcblx0XHQqL1xufV07XG5cdFxuaWYoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7IG9uRE9NQ29udGVudExvYWRlZFRhc2tzLmZvckVhY2goKGZuKSA9PiBmbigpKTsgfSk7IiwiLyoqXG4gKiBAbmFtZSBzdG9ybS1sb2FkOiBMaWdodHdlaWdodCBwcm9taXNlLWJhc2VkIHNjcmlwdCBsb2FkZXJcbiAqIEB2ZXJzaW9uIDAuMy4xOiBXZWQsIDExIEphbiAyMDE3IDEyOjU3OjMwIEdNVFxuICogQGF1dGhvciBzdG9ybWlkXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuY29uc3QgY3JlYXRlID0gdXJsID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRsZXQgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXHRcdHMuc3JjID0gdXJsO1xuXHRcdHMub25sb2FkID0gcy5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICghdGhpcy5yZWFkeVN0YXRlIHx8IHRoaXMucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykgcmVzb2x2ZSgpO1xuXHRcdH07XG5cdFx0cy5vbmVycm9yID0gcy5vbmFib3J0ID0gcmVqZWN0O1xuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocyk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHN5bmNocm9ub3VzID0gdXJscyA9PiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0bGV0IG5leHQgPSAoKSA9PiB7XG5cdFx0XHRpZiAoIXVybHMubGVuZ3RoKSByZXR1cm4gcmVzb2x2ZSgpO1xuXHRcdFx0Y3JlYXRlKHVybHMuc2hpZnQoKSkudGhlbihuZXh0KS5jYXRjaChyZWplY3QpO1xuXHRcdH07XG5cdFx0bmV4dCgpO1xuXHR9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0ICh1cmxzLCBhc3luYyA9IHRydWUpID0+IHtcblx0dXJscyA9IFtdLmNvbmNhdCh1cmxzKTtcblx0aWYgKCFhc3luYykgcmV0dXJuIHN5bmNocm9ub3VzKHVybHMpO1xuXG5cdHJldHVybiBQcm9taXNlLmFsbCh1cmxzLm1hcCh1cmwgPT4gY3JlYXRlKHVybCkpKTtcbn07Il19
