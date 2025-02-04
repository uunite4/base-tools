//TODO:
//1. Add custom icon for coppy uppercase and lowercase features
//2. Search for translate API

async function detectAndTranslate(text, targetLang) {
    // Step 1: Detect language
    const detectResponse = await fetch('https://ws.detectlanguage.com/0.2/detect', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 765d6c5ea0b4a407f176cebc0e1abef6',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ q: text })
    });

    if (!detectResponse.ok) {
        throw new Error(`Language detection failed: ${detectResponse.statusText}`);
    }

    const detectData = await detectResponse.json();
    const sourceLang = detectData.data.detections[0].language;

    // Step 2: Translate text
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;

    const translateResponse = await fetch(url);
    if (!translateResponse.ok) {
        throw new Error(`Translation failed: ${translateResponse.statusText}`);
    }

    const translateData = await translateResponse.json();
    if (translateData.responseStatus !== 200) {
        throw new Error(`Translation error: ${translateData.responseDetails}`);
    }

    return translateData.responseData.translatedText;
}

// Example usage
detectAndTranslate("Hola, ¿cómo estás?", "en")
    .then(translatedText => console.log("Translated text:", translatedText))
    .catch(error => console.error(error));


//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------


let selectedText = ''
let lastSelectedText = ''
let features
let lastContainer

// Inject icons
const link = document.createElement("link")
link.rel = "stylesheet"
link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=content_copy,translate"
link.crossOrigin = "anonymous"


document.addEventListener("DOMContentLoaded", () => {
	document.head.appendChild(link);
})

const removeLastContainer = () => {
	if (lastContainer) {
		const containerToRemove = lastContainer // capture last container before it gets updated
		const lastFeatureBtns = [...document.getElementsByClassName('BT-feat-btn')]
		lastContainer = null

		lastFeatureBtns.forEach((feature) => {
			feature.style.transform = 'translate(0px, 0px) scale(0.3)'
			feature.addEventListener('transitionend', () => feature.remove())
		})

		setTimeout(() => {
			//remove container
			containerToRemove.remove()

			//remove feature buttons + add back animation
		}, 100)
	}
}

window.addEventListener('mouseup', () => {
	lastSelectedText = selectedText
	const selection = window.getSelection()
	selectedText = selection.toString().trim()
	//Remove last highlight container

	//STEP 0: REMOVE LAST CONTAINER
	removeLastContainer()

	//STEP 0.1: CHECK IF WE ACTUALLY SELECTED ANYTHING
	if (selectedText == lastSelectedText || !selectedText) {
		// no selected text OR bug fix when you click the same selected text
		return
	}

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

		features = features.map((feat) => ({
			...feat,
			featFunc: window.functionMap[feat.featFunc],
		}))

		features.forEach((feat, i) => {
			createFeatButton(
				feat.name,
				feat.featFunc,
				feat.icon,
				cont,
				selectedText,
				window.featPos[i]
			)
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

const createFeatButton = (
	featName,
	featFunc,
	featIcon,
	container,
	text,
	pos
) => {
	const featButton = document.createElement('button')
	featButton.classList.add('BT-feat-btn')
	featButton.value = featName

	//add icons
	const iconSpan = document.createElement("span")
	iconSpan.classList.add("material-symbols-rounded")
	iconSpan.textContent = 'content_copy'

	//style icon
	iconSpan.style.fontVariationSettings = "'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 24"
	iconSpan.style.fontSize = "1.4em"
	iconSpan.style.color = "#000"

	featButton.appendChild(iconSpan)

	//Add a little popup with the featName
	featButton.onclick = () => featFunc(text)
	container.appendChild(featButton)

	// do animation to place
	requestAnimationFrame(() => {
		featButton.style.transform = `translate(${pos.x}, ${pos.y}) scale(1)`
	})
}
