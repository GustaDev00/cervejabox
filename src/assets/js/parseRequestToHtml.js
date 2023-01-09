const parseRequestToHtml = async (url, returnBody) => {
	const response = await (
		await fetch(url)
	).text();

	const parse = new DOMParser().parseFromString(response, 'text/html');
	const body = parse.querySelector('body');

	return body !== null && returnBody ? body : parse;
};

export default parseRequestToHtml;