const functionMap = {
	copyFunction: (text) => {
		console.log("Work Copy")
      	navigator.clipboard.writeText(text)
      	// Add a small popup saying Copied!
	},
	copyUpperFunction: (text) => {
		console.log("Work Upper Copy")
      	navigator.clipboard.writeText(text.toUpperCase())
      	// Add a small popup saying Copied!
	},
	copyLowerFunction: (text) => {
		console.log("Work Lower Copy")
      	navigator.clipboard.writeText(text.toLowerCase())
      	// Add a small popup saying Copied!
	},
	translate: async (text) => {
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
    	if (translateData.responseStatus !== 200) {
    	    throw new Error(`Translation error: ${translateData.responseDetails}`);
    	}

    	console.log(translateData.responseData.translatedText) 
	}
}	

window.functionMap = functionMap