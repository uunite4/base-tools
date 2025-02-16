//FEATURE LIST
// ✅ 1. Copy 
// ✅ 2. Copy Uppercase
// ✅ 3. Copy Lowercase
// ✅ 4. translate
// ✅ 5. Currency convert
// ✅ 6. Word counter (more than 10)
// ✅ 7. Search (wod in a new tab)
// ✅ 8. Open url-like text
// 9. highlight
// 10. share (make an image)
// ✅ 11. download .txt

//AI FEATURES
// 1. Explain
// 2. Summerize (more than 10 words)
// 3. Read out loud


const allFeatures = [
  {
    name: "Copy",
    description: "Copies the highlighted text.",
    func: "copyFunction",
    iconType: "NORMAL",
    icon: "content_copy",
    shortcut: null,
    active: true,
  },
  {
    name: "Copy Uppercase",
    description: "Copies the highlighted text in uppercase letters.",
    func: "copyUpperFunction",
    iconType: "MULTI",
    iconList: {
      primary: "content_copy",
      secondary: "uppercase"
    },
    shortcut: "u",
    defaultShortcut: "u",
    active: false,
    keyActive: true
  },
  {
    name: "Copy Lowercase",
    description: "Copies the highlighted text in lowercase letters.",
    func: "copyLowerFunction",
    iconType: "MULTI",
    iconList: {
      primary: "content_copy",
      secondary: "lowercase"
    },
    shortcut: "l",
    defaultShortcut: "l",
    active: false,
    keyActive: true
  },
  {
    name: "Translate",
    description: "Translates the highlighted text to the prefrenced language.",
    func: "translate",
    iconType: "NORMAL",
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
  },
  {
    name: "Convert Currencies",
    description: "Converts the amount of money to the prefrenced currency",
    func: "convertCurrency",
    iconType: "SELF-FUNCTIONAL",
    inactiveIcon: "currency_exchange",
    active: true,
    settings: [
      {
        name: "currency",
        description: "whats currency do you want to money to be converted to?",
        type: "select",
        options: ["$ Dollar (USD)", "€ Euro (EUR)", "£ Pound (GBP)", "¥ Yen (JPY)", "₹ Rupee (INR)", "₽ Ruble (RUB)", "₪ Shekel (ILS)"]
      }
    ]
  },
  {
    name: "Word Counter",
    description: "Counts the amount of words",
    func: "countWords",
    iconType: "SELF-FUNCTIONAL",
    inactiveIcon: "123",
    active: false,
    settings: [
      {
        name: "minimum words to count",
        description: "what is the minimum of words for the button to start counting",
        type: "number",
        value: 1
      }
    ]
  },
  {
    name: "Search Google",
    description: "Searchs Google.",
    func: "googleSearch",
    iconType: "NORMAL",
    icon: "search",
    shortcut: "l",
    defaultShortcut: "l",
    active: false,
    keyActive: true,
    settings: [
      {
        name: "Tab",
        description: "Do you want to search in the current tab or open a new tab?",
        type: "radio",
        options: ["Current Tab", "New Tab", "New Window"]
      }
    ]
  },
  {
    name: "Open URL",
    description: "Open URL-like text that is not clickable.",
    func: "openURL",
    iconType: "ACTIVE-INACTIVE",
    icon: "link",
    shortcut: "u",
    defaultShortcut: "u",
    active: true,
    keyActive: true,
    settings: [
      {
        name: "Tab",
        description: "Do you want to open the link in the current tab or open a new tab?",
        type: "radio",
        options: ["Current Tab", "New Tab", "New Window"]
      }
    ]
  },
  {
    name: "Download",
    description: "Download the text to a file.",
    func: "download",
    iconType: "NORMAL",
    icon: "download",
    shortcut: "d",
    defaultShortcut: "d",
    active: true,
    keyActive: true,
    settings: [
      {
        name: "Format",
        description: "What format do you want the text to be downloaded in?",
        type: "radio",
        options: [".txt", ".word"]
      },
      {
        name: "File Name",
        description: "What do you want the file to be called?",
        type: "radio",
        options: ["Base Tools Download", "The highlighted text", {type: "text", placeholder: "Custom Text"}]
      }
    ]
  }
]

const defaultFeatures = allFeatures.filter(v => v.active)

chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({ features: defaultFeatures });
  console.log(details)
})



// switch (iconType) {
//   case "NORMAL":
//     break;
//   case "SELF-FUNCTIONAL":
//     break;
//   case "MULTI":
//     break;
//   case "ACTIVE-INACTIVE":
//     break;
// }



