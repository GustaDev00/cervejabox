import 'stylesheets/FakeSlick.scss';

const FakeSlick = (selector, width) => {
	const buttons = {
		prev: `<button class="slick-new__prev"></button>`,
		next: `<button class="slick-new__next"></button>`
	};

	for (const shelf of document.querySelectorAll(selector)) {
		const productWidth = width || 270;
		const parentSelector = shelf.parentNode;

		parentSelector.classList.add('fakeslick');

		shelf.insertAdjacentHTML('beforebegin', buttons.prev);
		shelf.insertAdjacentHTML('afterend', buttons.next);

		const $arrowNext = parentSelector.querySelector('button.slick-new__next');
		const $arrowPrev = parentSelector.querySelector('button.slick-new__prev');

		$arrowPrev.onclick = () => $(shelf).animate({ scrollLeft: shelf.scrollLeft - productWidth }, 250);
		$arrowNext.onclick = () => $(shelf).animate({ scrollLeft: shelf.scrollLeft + productWidth }, 250);

		shelf.addEventListener('scroll', (e) => disableArrows(e.target, $arrowPrev, $arrowNext));
		disableArrows(shelf, $arrowPrev, $arrowNext);
	};
};

const disableArrows = (selector, arrowPrev, arrowNext) => {
	if (selector.scrollLeft >= (selector.scrollWidth - selector.clientWidth)) {
		arrowNext.classList.add('disabled');
	} else {
		arrowNext.classList.remove('disabled');
	};

	if (selector.scrollLeft === 0) {
		arrowPrev.classList.add('disabled');
	} else {
		arrowPrev.classList.remove('disabled');
	};
};

export default FakeSlick;