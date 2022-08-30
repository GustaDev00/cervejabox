const hasOverflow = (selector) => {
	const element = document.querySelector(selector);
	const curOverflow = element.style.overflow;

	if (!curOverflow || curOverflow === "visible") {
		element.style.overflow = "hidden";
	};

	const isOverflowing = element.clientWidth < element.scrollWidth
		|| element.clientHeight < element.scrollHeight;

	element.style.overflow = curOverflow;
	return isOverflowing;
};

export default hasOverflow;