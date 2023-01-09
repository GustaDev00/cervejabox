const ScrollBack = (nextPage) => {
	const productId = window.localStorage.getItem("productId"),
		pathName = window.localStorage.getItem("pathName");

	if (productId != null) {
		if (pathName == window.location.pathname.toLowerCase()) {
			if ($('body').hasClass('category') || $('body').hasClass('campaign') || $('body').hasClass('departament') || $('body').hasClass('search-page')
				|| $('body').hasClass('essential')) {
				$('body').append(`
					<div id="progressBar">
						<div id="progress"></div>
					</div>
				`);

				var width = 0, i = 1;
				const progressBar = document.getElementById("progress");

				const start = new Date();
				const scrollBack = setInterval(function () {
					if ($("a[data-product-id='" + productId + "'").length == 0) {
						nextPage();

						setTimeout(function () {
							if (width < 100) {
								width = width + 5;
								progressBar.style.width = width + "%";
								i++;
							}
						}, i * 200);
					} else {
						$([document.documentElement, document.body]).animate({ scrollTop: $("a[data-product-id='" + productId + "'").offset().top }, 0);

						width = 100;
						progressBar.style.width = "100%";

						clearInterval(scrollBack);
						const end = new Date();
						console.info(`[ScrollBack] Tempo: ${(end.getTime() - start.getTime()) / 1000}s`);

						window.localStorage.removeItem("productId");
						window.localStorage.removeItem("pathName");

						setTimeout(function () {
							document.getElementById('progressBar').remove();
						}, 1500);
					}
				});
			}
		}
	}
}

export default ScrollBack;