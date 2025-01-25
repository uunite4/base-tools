// Change the background color of the webpage
document.body.style.backgroundColor = 'lightblue'

// conosle log selected text
document.addEventListener('mouseup', () => {
	const selectedText = window.getSelection().toString()
	if (selectedText) {
		console.log(`Selected text: ${selectedText}`)
	}
})
