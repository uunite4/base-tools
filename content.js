let selectedText = ''
let lastSelectedText = ''
let features
let lastContainer

const removeLastContainer = () => {
	if (lastContainer) {
		const containerToRemove = lastContainer // capture last container before it gets updated
		lastContainer = null
		setTimeout(() => {
			containerToRemove.remove()
		}, 250)
	}
}

window.addEventListener('mouseup', () => {
	lastSelectedText = selectedText
	const selection = window.getSelection()
	selectedText = selection.toString().trim()
	//Remove last highlight container

	if (selectedText == lastSelectedText || !selectedText) {
		// no selected text OR bug fix when you click the same selected text
		return
	}

	//STEP 0: REMOVE LAST CONTAINER
	removeLastContainer()

	//STEP 1: CREATE CONTAINER
	const rect = selection.getRangeAt(0).getBoundingClientRect()
	const cont = createContainer(rect.top, rect.left, rect.width, rect.height)

	lastContainer = cont

	//STEP 2: GET DATA FROM POPUP.JS
	// HOW?:
	// The features data is stored in chrome.storage.local, the deafult features are set in backgroun.js,
	// then, when we open popup.js we can customize it, when something changes in popup.js is updates
	// it to the storage, so all we need to do to get the features is to read the chrome.storage.local !

	chrome.storage.local.get('features', (result) => {
		features = result.features

		// STEP 3: GENERATE BUTTONS ACCORDING TO FEATURES

		let newFeatures = features.map((feat) => ({
			...feat,
			featFunc: window.functionMap[feat.featFunc],
		}))

		newFeatures.forEach((feat) => {
			createFeatButton(feat.name, feat.featFunc, 'FEAT ICN', cont, selectedText)
		})
	})
})

const createContainer = (top, left, width, height) => {
	const cont = document.createElement('div')
	cont.classList.add('BT-highlight-container')
	cont.setAttribute('id', 'BT-highlight-container')
	// set position and width & height
	cont.style.top = `${top + window.scrollY}px`
	cont.style.left = `${left + window.scrollX}px`
	cont.style.width = `${width}px`
	cont.style.height = `${height}px`
	document.body.appendChild(cont)
	return cont
}

const createFeatButton = (featName, featFunc, featIcon, container, text) => {
	const featButton = document.createElement('button')
	featButton.classList.add('BT-feat-btn')
	featButton.value = featName
	//Need to put featIcon inside the button
	//Add a little popup with the featName
	featButton.onclick = () => featFunc(text)
	container.appendChild(featButton)
}
