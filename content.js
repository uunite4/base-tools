let selectedText = ''
let lastSelectedText = ''

window.addEventListener('mouseup', () => {
	lastSelectedText = selectedText
	const selection = window.getSelection()
	selectedText = selection.toString()
	//Remove last highlight container
	if (document.getElementById('BT-highlight-container')) {
		document.getElementById('BT-highlight-container').remove()
	}

	if (selectedText == lastSelectedText || !selectedText) {
		// no selected text OR bug fix when you click the same selected text
		return
	}

	// all clear

	const rect = selection.getRangeAt(0).getBoundingClientRect()
	const cont = createContainer(rect.top, rect.left, rect.width, rect.height)
	createFeatButton('Copy', () => console.log('Hello'), 'ICON', cont)
})

const createContainer = (top, left, width, height) => {
	const cont = document.createElement('div')
	cont.classList.add('BT-highlight-container')
	cont.setAttribute('id', 'BT-highlight-container')
	cont.style.top = `${top + window.scrollY}px`
	cont.style.left = `${left + window.scrollX}px`
	cont.style.width = `${width}px`
	cont.style.height = `${height}px`
	document.body.appendChild(cont)
	return cont
}

const createFeatButton = (featName, featFunc, featIcon, container) => {
	const featButton = document.createElement('button')
	featButton.classList.add('BT-feat-btn')
	featButton.value = featName
	//Need to put featIcon inside the button
	//Add a little popup with the featName
	featButton.onclick = featFunc
	container.appendChild(featButton)
	return featButton
}
