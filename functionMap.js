const functionMap = {
	copyFunction: (text, contUnused) => {
		console.log("Work Copy")
      	navigator.clipboard.writeText(text)
      	// Add a small popup saying Copied!
	},
	copyUpperFunction: (text, contUnused) => {
		console.log("Work Upper Copy")
      	navigator.clipboard.writeText(text.toUpperCase())
      	// Add a small popup saying Copied!
	},
	copyLowerFunction: (text, contUnused) => {
		console.log("Work Lower Copy")
      	navigator.clipboard.writeText(text.toLowerCase())
      	// Add a small popup saying Copied!
	},
	translate: async (text, cont) => {
		const trimText = text.trim()
		const targetLang = "es"

		// Step 1: Detect language
    	const detectResponse = await fetch('https://ws.detectlanguage.com/0.2/detect', {
        	method: 'POST',
       		headers: {
    	        'Authorization': 'Bearer 765d6c5ea0b4a407f176cebc0e1abef6',
    	        'Content-Type': 'application/json'
    	    },
    	    body: JSON.stringify({ q: trimText })
    	});

    	if (!detectResponse.ok) {
    	    throw new Error(`Language detection failed: ${detectResponse.statusText}`);
    	}

    	const detectData = await detectResponse.json();
    	const sourceLang = detectData.data.detections[0].language;

    	console.log(trimText + " " + sourceLang)

    	// Step 2: Translate text
    	const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimText)}&langpair=${sourceLang}|he`;

    	const translateResponse = await fetch(url);
    	if (!translateResponse.ok) {
    	    throw new Error(`Translation failed: ${translateResponse.statusText}`);
    	}

    	const translateData = await translateResponse.json();


    	// CREATE A BLOCK TO SHOW TEXT / ERROR

    	console.log("Work?")

    	const textBlock = document.createElement("span")
    	
    	console.log(textBlock)
    	

    	if (translateData.responseStatus !== 200) {
    		// ERROR
    		textBlock.innerHTML = "ERROR"
    		textBlock.classList.add("translate-text translate-error")
    	    // throw new Error(`Translation error: ${translateData.responseDetails}`);
    	} else {
    		const transText = translateData.responseData.translatedText
    		textBlock.innerHTML = transText
    		textBlock.classList.add("translate-text")
    	}

    	const bottomPosition = parseInt(cont.style.top) + parseInt(cont.style.height) + 5
    	textBlock.style.top = `${bottomPosition}px`
    	textBlock.style.left = cont.style.left

    	document.body.appendChild(textBlock)



    	setTimeout(() => {
    		textBlock.remove()
    	}, 5000)
	}
}	

window.functionMap = functionMap