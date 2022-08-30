importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

if (workbox) {
	console.log(`Workbox is loaded 🎉`);

	workbox.routing.registerRoute(
		new RegExp('^https://bbt.vteximg.com.br/arquivos/'),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: 'bbt-code',
			maxEntries: 10,
			maxAgeSeconds: 60 * 60 * 12
		})
	)

	workbox.routing.registerRoute(
		new RegExp('^https://fonts.gstatic.com/'),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: 'google-fonts',
			cacheExpiration: {
				maxEntries: 3,
				maxAgeSeconds: 60 * 60 * 24 * 30
			}
		})
	)

	workbox.routing.registerRoute(
		new RegExp('^https://io.vtex.com.br/front-libs/jquery/1.8.3/jquery'),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: 'jquery',
			cacheExpiration: {
				maxEntries: 1,
				maxAgeSeconds: 60 * 60 * 24 * 30
			}
		})
	)

	workbox.routing.registerRoute(
		new RegExp('^https://bbt.myvtex.com/babadotop-offline'),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: 'offline-page',
		})
	)

	workbox.precaching.precacheAndRoute(['https://bbt.myvtex.com/babadotop-offline']);

	workbox.routing.registerRoute(
		function (routeData) {
			return (routeData.event.request.headers.get('accept').includes('text/html'))
		},
		function (args) {
			return caches.match(args.event.request)
				.then(function (response) {
					if (response) {
						return response
					} else {
						return fetch(args.event.request)
							.then(function (response) {
								return caches.open('dynamic')
									.then(function (cache) {
										if (args.event.request.url == '/') {
											cache.put('/babadotop-offline', response.clone())
										} else {
											cache.put(args.event.request.url, response.clone())
										}
										return response;
									})
							})
							.catch(function (err) {
								return caches.match('/babadotop-offline')
									.then(function (response) {
										return response;
									})
							})
					}

				})
		}
	)

} else {
	console.log(`Workbox didn't load 😬`);
}