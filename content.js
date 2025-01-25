let selectedText = ''
let lastSelectedText = ''

window.addEventListener('mouseup', () => {
	lastSelectedText = selectedText
	const selection = window.getSelection()
	selectedText = selection.toString()
	//Remove last highlight container
	if (document.getElementById('highlight-container')) {
		document.getElementById('highlight-container').remove()
	}

	if (selectedText == lastSelectedText || !selectedText) {
		// no selected text
		//or
		//bug fix when you click the same selected text
		return
	}

	// all clear

	const rect = selection.getRangeAt(0).getBoundingClientRect()
	createContainer(rect.top, rect.left, rect.width, rect.height)
})

const createContainer = (top, left, width, height) => {
	const cont = document.createElement('div')
	cont.style.all = 'unset'
	cont.style.backgroundColor = 'red'
	cont.style.position = 'absolute'
	cont.style.top = `${top}px`
	cont.style.left = `${left}px`
	cont.style.width = `${width}px`
	cont.style.height = `${height}px`
	cont.style.zIndex = '99999'
	document.body.appendChild(cont)
	cont.setAttribute('id', 'highlight-container')
	return cont
}
