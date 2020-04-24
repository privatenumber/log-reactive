const logReactive = require('.');
const { promisify } = require('util');
const sleep = promisify(setTimeout);

// Primitive
(async () => {
	const state = logReactive('Hello?');

	await sleep(1000);

	state.value = 'Hello!';

	await sleep(1000);

	state.value = 'Good bye';

	await sleep(1000);

	state.value = 'Hello again!';
})();

// Object
(async () => {
	const state = logReactive({ a: '1' });

	await sleep(1000);

	state.b = '2';

	await sleep(1000);

	state.c = '3';
})();
