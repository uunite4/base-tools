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
	}
}

window.functionMap = functionMap