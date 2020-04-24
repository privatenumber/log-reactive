const { reactive, ref, watch } = require('vue');
const { LogDraft, LineCountStream } = require('draftlog');

console._stdout = LineCountStream(console._stdout);

function logReactive(data, formatter = (s => s)) {
	let reactiveData;
	if (typeof data === 'object' && data) {
		reactiveData = reactive(data);
	} else {
		reactiveData = ref(data);
	}

	const draft = new LogDraft(console, 'log');
	draft.write(formatter(data));

	watch(
		() => reactiveData,
		() => {
			const data = reactiveData._isRef ? reactiveData.value : reactiveData;
			draft.update(formatter(data));
		},
		{ deep: true },
	);

	return reactiveData;
}

module.exports = logReactive;
