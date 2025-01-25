let selectedText = ''
let lastSelectedText = ''

window.addEventListener('mouseup', () => {
	lastSelectedText = selectedText
	selectedText = window.getSelection().toString()
	if (selectedText && selectedText != lastSelectedText) {
		// we can do whatever
		console.log('Selected: ' + selectedText)
	}
})
