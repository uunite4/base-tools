const defaultFeatures = [
  {
    name: "Copy",
    description: "Copies the highlighted text.",
    featFunc: "copyFunction",
    shortcut: null,
    active: true,
  },
  {
    name: "Copy Uppercase",
    description: "Copies the highlighted text in uppercase letters.",
    featFunc: "copyUpperFunction",
    shortcut: "u",
    defaultShortcut: "u",
    active: true,
    keyActive: true
  },
  {
    name: "Copy Lowercase",
    description: "Copies the highlighted text in lowercase letters.",
    featFunc: "copyLowerFunction",
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

