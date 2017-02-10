import Load from 'storm-load';

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

		Load('./js/storm-geocoder.standalone.js')
		.then(() => {
			StormGeocoder
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
	
if('addEventListener' in window) window.addEventListener('DOMContentLoaded', () => { onDOMContentLoadedTasks.forEach((fn) => fn()); });