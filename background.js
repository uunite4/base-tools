const defaultFeatures = [
  {
    name: "Copy",
    description: "Copies the highlighted text.",
    featFunc: function (text) {
      console.log("Work Copy")
      navigator.clipboard.writeText(text)
      // Add a small popup saying Copied!
    },
    shortcut: null,
    active: true,
  },
  {
    name: "Copy Uppercase",
    description: "Copies the highlighted text in uppercase letters.",
    function: (text) => {
      console.log("Work Copy Upper")
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
      conosle.log("Work Copy Lower")
      navigator.clipboard.writeText(text.toLowerCase())
      // Add a small popup saying copied!
    },
    shortcut: "l",
    defaultShortcut: "l",
    active: true,
    keyActive: true
  }
]

chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({ features: defaultFeatures });
  console.log(details)
})

