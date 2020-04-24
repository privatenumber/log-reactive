const { reactive, ref, watch } = require('vue');
const { LogDraft, LineCountStream } = require('draftlog');

console._stdout = LineCountStream(console._stdout);

function logReactive(data) {
	let reactiveData;
	if (typeof data === 'object' && data) {
		reactiveData = reactive(data);
	} else {
		reactiveData = ref(data);
	}

	const draft = new LogDraft(console, 'log');
	draft.write(data);

	watch(
		() => reactiveData,
		() => {
			draft.update(reactiveData._isRef ? reactiveData.value : reactiveData);
		},
		{ deep: true }
	);

	return reactiveData;
}

module.exports = logReactive;
