# WhatsApp Web Draft Saver

A privacy-focused Chrome extension that automatically saves and restores message drafts in WhatsApp Web.

## ✨ Features

- 🔄 **Auto Draft Save** - Automatically saves text as you type
- 📂 **Per-Chat Memory** - Separate drafts for each contact/group
- 🔒 **100% Local Storage** - Uses `chrome.storage.local` only, no servers
- 🧹 **Auto Clear on Send** - Clears draft when message is sent
- 🎛️ **Toggle Control** - Enable/disable via popup switch
- ⚙️ **Settings Panel** - Customize delay, view stats, restore options

## 🔒 Privacy

- ✅ No server communication - All data stays in your browser
- ✅ No tracking or analytics
- ✅ Minimal permissions - Only what's needed
- ✅ Open source - Easy to audit

## 📦 Installation

### From Chrome Web Store
*(Coming soon)*

### Manual Installation
1. Download or clone this repository
2. Open `chrome://extensions/` in Chrome
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the extension folder

## 🎯 How to Use

1. **Enable the extension** - Click the extension icon and toggle ON
2. **Type in WhatsApp Web** - Your drafts are automatically saved
3. **Switch chats** - Each chat remembers its own draft
4. **Refresh or close** - Your drafts will be restored when you return
5. **Send a message** - The draft is automatically cleared

## ⚙️ Settings

- **Auto-save delay** - Control how quickly drafts are saved (500ms - 3000ms)
- **Clear all drafts** - Remove all saved drafts at once
- **Smart restore** - Choose automatic or confirmation-based restore

## 📁 Files

```
WhatsApp Web Draft Saver/
├── manifest.json       # Extension configuration
├── background.js       # Service worker
├── content.js          # WhatsApp Web integration
├── popup.html/css/js   # Extension popup UI
├── settings.html/css/js # Settings page
└── icons/              # Extension icons
```

## 🛠️ Development

This extension uses:
- Chrome Extension Manifest V3
- Vanilla JavaScript
- `chrome.storage.local` API

## 📄 License

MIT License - Feel free to use and modify!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
