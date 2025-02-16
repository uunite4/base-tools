let selectedText = ''
let lastSelectedText = ''
let features
let lastContainer

// Inject icons
const icons = ["content_copy", "uppercase", "lowercase", "translate", "currency_exchange", "123", "search", "link", "download"]
const sortedIcons = icons.sort().join(",")
const link = document.createElement("link")
link.rel = "stylesheet"
link.href = `https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=${sortedIcons}`
link.crossOrigin = "anonymous"

//Inject Rubik
const rubikLink = document.createElement("link")
rubikLink.rel = "stylesheet"
rubikLink.href = "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"

document.addEventListener("DOMContentLoaded", () => {
	document.head.appendChild(link);
	document.head.appendChild(rubikLink)
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
			func: window.functionMap[feat.func],
		}))

		features.forEach((feat, i) => {
			createFeatButton(
				feat,
				cont,
				selectedText,
				i,
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
	feat,
	container,
	text,
	index,
	pos
) => {
	const featButton = document.createElement('button')
	featButton.classList.add('BT-feat-btn')
	featButton.value = feat.name


	switch (feat.iconType) {
  		case "NORMAL":

  			const iconSpan = createFeatButtonIcon(feat.icon, "Active")
			featButton.appendChild(iconSpan)

			// function
			featButton.onclick = () => feat.func(text, container)

    		break;
  		case "SELF-FUNCTIONAL":

  			let resp
			//STEP 0 : MAKE BOTH ASYNC AND SUNC FUNCTION (CONVERT CURRENCIES AND WORDCOUNT) RETURN A PROMISE
			(async () => {
    			resp = await Promise.resolve(feat.func(text, container));
    	
    			// Code is normal now (I hate promises)
    			// STEP 1 : CHECK IF THE TEXT WE HIGHLIGHTED IS ACTUALLY GOOD FOR THIS FUNCTION

    			// The resp is an object that will have a property that
				// is called 'isActive' (because I designed this code and I'm a genius)
				if (resp.isActive) {
					//resp's property 'body' holds the answer
					featButton.innerHTML = featButton.innerHTML + resp.body
				} else {
					const iconSpan = createFeatButtonIcon(feat.inactiveIcon, "inActive")
					featButton.appendChild(iconSpan)
				}
			})();

    		break;
  		case "MULTI":

  			const iconCont = document.createElement("div")
			iconCont.classList.add("BT-icon-cont")
			featButton.appendChild(iconCont)

			const primeIcon = createFeatButtonIcon(feat.iconList.primary, "Active")
			iconCont.appendChild(primeIcon)

			const secoIconCont = document.createElement("div")
			secoIconCont.classList.add("BT-icon-seco-cont")
			iconCont.appendChild(secoIconCont)

			const secoIcon = createFeatButtonIcon(feat.iconList.secondary, "Secondary")
			secoIconCont.appendChild(secoIcon)

			// function
			featButton.onclick = () => feat.func(text, container)

    		break;
		case "ACTIVE-INACTIVE":

			let active = feat.func(text, "Check")

			if (active) {

				const iconSpan = createFeatButtonIcon(feat.icon, "Active")
				featButton.appendChild(iconSpan)

				// function
				featButton.onclick = () => feat.func(text, "Act")

			} else {

				const iconSpan = createFeatButtonIcon(feat.icon, "inActive")
				featButton.appendChild(iconSpan)

			}

    		break;
	}	

	//Add a little popup with the featName
	createFeatButtonHover(feat.name, featButton)
	featButton.style.zIndex = 10 - index

	container.appendChild(featButton)

	// do animation to place
	requestAnimationFrame(() => {
		featButton.style.transform = `translate(${pos.x}, ${pos.y}) scale(1) rotate(${pos.rotation})`
	})
}


const createFeatButtonIcon = (iconName, isActive) => {
	const iconSpan = document.createElement("span")
	iconSpan.classList.add("material-symbols-rounded")
	iconSpan.textContent = iconName
	//style icon
	iconSpan.style.fontVariationSettings = "'FILL' 1, 'wght' 600, 'GRAD' 100, 'opsz' 24"
	iconSpan.style.fontSize = `${iconName == "123" ? "1.7em" : "1.3em"}`
	switch (isActive) {
		case "Active":
			iconSpan.style.color = "#fff"
			break
		case "inActive":
			iconSpan.style.color = "#434659"
			break
		case "Secondary":
			iconSpan.style.color = "#232531"
			iconSpan.style.fontSize = "1em"
			iconSpan.style.marginBottom = "5px"
			iconSpan.style.marginLeft = "4px"
			break

	}
	return iconSpan
}

const createFeatButtonHover = (featName, featBtn) => {
	const hoverTxt = document.createElement("div")
	hoverTxt.classList.add("BT-featbtn-hovertxt")
	hoverTxt.innerHTML = featName
	hoverTxt.style.zIndex = 100
	featBtn.appendChild(hoverTxt)	
}