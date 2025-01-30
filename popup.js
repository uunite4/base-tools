const features = [
	{
		name: "Copy",
		description: "Copies the highlighted text.",
		function: (text) => {
			navigator.clipboard.writeText(text)
			// Add a small popup saying Copied!
		},
		shortcut: none,
		active: true,
	},
	{
		name: "Copy Uppercase",
		description: "Copies the highlighted text in uppercase letters.",
		function: (text) => {
			navigator.clipboard.writeText(text.toUpperCase())
			// Add a small popup saying COPIED!
		},
		shortcut: "u",
		defaultShortcut: "u",
		active: true,
		keyActive: true
	},
	{
		name: "Copy Lowercase",
		description: "Copies the highlighted text in lowercase letters.",
		function: (text) => {
			navigator.clipboard.writeText(text.toLowerCase())
			// Add a small popup saying copied!
		},
		shortcut: "l",
		defaultShortcut: "l",
		active: true,
		keyActive: true
	}
]

const smallPopup = (message) => {
	const popupMessage = document.createElement("div")
	popupMessage.classList.add("BT-popup-message")
	popupMessage.innerHTML = message

}





