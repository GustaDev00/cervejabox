const isElementInViewport = (element, factor) => {
	if (typeof jQuery === "function" && element instanceof jQuery) {
		element = element[0];
	};

	const elementBounds = element.getBoundingClientRect();
	factor = isNaN(factor) || factor > 1 || factor <= 0 ? 1 : factor;

	return (
		window.innerHeight > elementBounds.top * factor &&
		0 < elementBounds.bottom * factor &&
		window.innerWidth > elementBounds.left * factor &&
		0 < elementBounds.right * factor
	);
};

export default isElementInViewport;