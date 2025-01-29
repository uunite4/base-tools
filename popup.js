const features = [
	{
		name: "Copy",
		description: "Copies the highlighted text.",
		function: copyFunc,
		shortcut: none,
		active: true,
	},
	{
		name: "Copy Uppercase",
		description: "Copies the highlighted text in uppercase letters.",
		function: copyUpperFunc,
		shortcut: "u",
		defaultShortcut: "u",
		active: true,
		keyActive: true
	},
	{
		name: "Copy Lowercase",
		description: "Copies the highlighted text in lowercase letters.",
		function: copyLowerFunc,
		shortcut: "l",
		defaultShortcut: "l",
		active: true,
		keyActive: true
	}
]

const copyFunc = (text) => {
	navigator.clipboard.writeText(text)
	// add a small popup saying Copied
}

const copyUpperFunc = (text) => {
	navigator.clipboard.writeText(text.toUpperCase())
	// add a small popup saying COPIED!
}

const copyLowerFunc = (text) => {
	navigator.clipboard.writeText(text.toLowerCase())
	// add a small popup saying copied!
}