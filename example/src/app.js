import Geocoder from './libs/storm-geocoder';

const onDOMContentLoadedTasks = [() => {
	let form = document.querySelector('.js-geocode'),
		render = data => {
			form.insertAdjacentHTML('afterend', `<table class="js-results results">${data.map(row => {
				return `<tr>
					<td>${row.formatted_address}</td>
					<td>${String(row.geometry.location.lat()).substr(0, 5)}, ${String(row.geometry.location.lng()).substr(0, 5)}</td>
				</tr>`;
			}).join('')}</table>`);
		};

	Geocoder
		.init()
		.then(geocoder => {
			console.log(geocoder);
			form.addEventListener('submit', e => {
				e.preventDefault();
				/*
				geocoder.find({ address: document.querySelector('#q').value }, (res, status) => {
					console.log(status, res);
				});
				*/

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
}];
	
if('addEventListener' in window) window.addEventListener('DOMContentLoaded', () => { onDOMContentLoadedTasks.forEach((fn) => fn()); });