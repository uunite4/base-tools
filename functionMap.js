const functionMap = {
	copyFunction: (text, settings) => {
		console.log("Work Copy")
      	navigator.clipboard.writeText(text)
      	// Add a small popup saying Copied!
	},
	copyUpperFunction: (text, settings) => {
		console.log("Work Upper Copy")
      	navigator.clipboard.writeText(text.toUpperCase())
      	// Add a small popup saying Copied!
	},
	copyLowerFunction: (text, settings) => {
		console.log("Work Lower Copy")
      	navigator.clipboard.writeText(text.toLowerCase())
      	// Add a small popup saying Copied!
	},
	translate: async (text, settings) => {
		const trimText = text.trim()
		const targetLang = "es"
		const cont = settings.cont

		//BLOCK
		const bottomPosition = parseInt(cont.style.top) + parseInt(cont.style.height) + 10
		const textBlock = document.createElement("span")
		textBlock.style.top = `${bottomPosition}px`
    	textBlock.style.left = cont.style.left
    	// textBlock.style.width = cont.style.width
    	// textBlock.style.height = cont.style.height
    	textBlock.classList.add("translate-text")
    	document.body.appendChild(textBlock)

		//LOADER

		const loader = document.createElement("div")
		loader.classList.add("translate-loader")
    	loader.style.top = `${bottomPosition}px`
    	loader.style.left = cont.style.left
    	textBlock.appendChild(loader)


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

    	// Step 2: Translate text
    	const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimText)}&langpair=${sourceLang}|he`;

    	const translateResponse = await fetch(url);
    	if (!translateResponse.ok) {
    	    throw new Error(`Translation failed: ${translateResponse.statusText}`);
    	}

    	const translateData = await translateResponse.json();


    	// CREATE A BLOCK TO SHOW TEXT / ERROR
    	loader.remove()    	

    	if (translateData.responseStatus !== 200) {
    		// ERROR
    		textBlock.innerHTML = "ERROR"
    		textBlock.classList.add("translate-text translate-error")
    	    // throw new Error(`Translation error: ${translateData.responseDetails}`);
    	} else {
    		const transText = translateData.responseData.translatedText
    		textBlock.innerHTML = transText
    	}

    	setTimeout(() => {
    		textBlock.remove()
    	}, 5000)
	},
	convertCurrency: async (text, settings) => {
		const response = {
			isActive: "",
			body: ""
		}

		if (text.replace( /[\$€£¥₹₽₪](\d){1,}(\.(\d){1,})?/ , "uunite") == "uunite") {
			// text is good for replacment
			response.isActive = true
			
			// STEP 1 : CHECK THE FIRST CHARACTER AND GET THE CODE (hardcoded)
			const currencySymbl = text[0]
			let currencyCode
			switch (currencySymbl) {
				case "$" :
					currencyCode = "usd"
					break
				case "€" :
					currencyCode = "eur"
					break
				case "£" :
					currencyCode = "gbp"
					break
				case "¥" :
					currencyCode = "jpy"
					break
				case "₹" :
					currencyCode = "inr"
					break
				case "₽" :
					currencyCode = "rub"
					break
				case "₪" :
					currencyCode = "ils"
					break
				default:
					currencyCode = "Not Supported"
			}

			// STEP 2 : GET THE CONVERSION RATE
			const currencyConvertResp = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyCode}.json`)
			const allExchangeRates = await currencyConvertResp.json()
			console.log(allExchangeRates)
			const exchangeRate = allExchangeRates[currencyCode].ils

			// STEP 3 : CONVERT
			const money = (parseInt(text.slice(1)) * exchangeRate).toFixed(2)

			// STEP 4 : RETURN A NICE DESIGN
			const moneyArr = money.toString().split(".").map(v => parseInt(v))
			console.log(moneyArr)
			response.body = `
			<div class="BT-currency-exchange-cont">
				<span class="BT-currency-exchange-symbl">₪</span>
				<div class="BT-currency-exchange-num-cont">
					<span class="BT-currency-exchange-num ${moneyArr[0] > 99 ? "bigger" : ""}">${moneyArr[0]}</span>
					<span class="BT-currency-exchange-num-top ${moneyArr[0] > 99 ? "bigger" : ""}">${moneyArr[1]}</span>
				</div>
				
			</div>`

		} else {
			response.isActive = false
		}

		return response
	},
	countWords: (text, settings) => {
		const response = {
			isActive: "",
			body: ""
		}
		const wordsArr = text.trim().split(/\s+/).filter(word => word.length > 0)
		if (wordsArr.length < 1) {
			response.isActive = false
		} else {
			response.isActive = true
			response.body = `<div class="BT-wordcount">${wordsArr.length}</div>`
		}
		return response
	},
	googleSearch: (text, settings) => {
		const url = `https://www.google.com/search?q=${encodeURIComponent(text)}`;
    	window.open(url, '_blank');
	},
	openURL: (text, action, settings) => {
		const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/i;
		switch (action) {
			case "Check":
				if (text.replace(urlRegex, "uunite") == "uunite") {
					//this is a URL
					return true
				} else {
					return false
				}
				break;
			case "Act":
				let link = text
				if (!link.startsWith("http://") && !link.startsWith("https://")) {
    				link = "https://" + link;
				}
				window.open(link, "_blank");
				break;
		}
	},
	download: (text, settings) => {
  		const filename = `Base Tools Download.txt`; // Your desired filename

		// Create Blob with the text
		const blob = new Blob([text], { type: "text/plain" });

		// Create temporary URL for the Blob
  		const url = URL.createObjectURL(blob);

		// Create hidden anchor element
		const a = document.createElement("a");
		a.href = url;
		a.download = filename; // Set filename
		a.style.display = "none";

		// Trigger download
		document.body.appendChild(a);
		a.click();

		// Cleanup
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	},
	highlight: (text, settings) => {
		const colorList = settings.options[0].options.map(v => v.default)
		
		for (i = 0; i < colorList.length; i++) {
			const colorbtn = document.createElement("button")
			colorbtn.classList.add("BT-hover-colorbtn")
			
		}
	}
}	

window.functionMap = functionMap