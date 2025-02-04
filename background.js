const allFeatures = [
  {
    name: "Copy",
    description: "Copies the highlighted text.",
    featFunc: "copyFunction",
    icon: "content_copy",
    shortcut: null,
    active: true,
  },
  {
    name: "Copy Uppercase",
    description: "Copies the highlighted text in uppercase letters.",
    featFunc: "copyUpperFunction",
    icon: "content_copy",
    shortcut: "u",
    defaultShortcut: "u",
    active: false,
    keyActive: true
  },
  {
    name: "Copy Lowercase",
    description: "Copies the highlighted text in lowercase letters.",
    featFunc: "copyLowerFunction",
    icon: "content_copy",
    shortcut: "l",
    defaultShortcut: "l",
    active: false,
    keyActive: true
  },
  {
    name: "Translate",
    description: "Translates the highlighted text to the prefrenced language.",
    featFunc: "translate",
    icon: "translate",
    shortcut: "t",
    defaultShortcut: "t",
    active: true,
    keyActive: true,
    settings: [
      {
        name: "language",
        description: "what language do you want the text to be translated to?",
        type: "select",
        options: ["english", "mandarin", "hindi", "spanish", "french", "arabic", "bengali", "portuguese", "russian", "urdu", "hebrew", ]
      }
    ]
  }
]

const defaultFeatures = allFeatures.filter(v => v.active)

chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({ features: defaultFeatures });
  console.log(details)
})

