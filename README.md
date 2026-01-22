# WhatsApp Web Draft Saver - Chrome Extension

🔄 Automatically save and restore message drafts in WhatsApp Web. Per-chat memory, 100% local storage, privacy-friendly.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔄 **Auto Draft Save** | Automatically saves text as you type |
| 📂 **Per-Chat Memory** | Separate drafts for each contact/group |
| 🔒 **100% Local** | Uses `chrome.storage.local` only - no servers |
| 🧹 **Auto Clear** | Clears draft when message is sent |
| 🎛️ **Toggle Control** | Enable/disable via popup switch |
| ⚙️ **Settings Panel** | Customize delay, view stats, restore options |

## 🚀 Installation

### From Chrome Web Store
*(Coming soon)*

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top right)
4. Click **Load unpacked**
5. Select the extension folder
6. Done! The extension icon will appear in your toolbar

## 📖 How to Use

1. **Open WhatsApp Web** - Go to `web.whatsapp.com`
2. **Start typing** - Your draft is automatically saved
3. **Switch chats** - Each chat has its own draft
4. **Refresh the page** - Your draft is restored!
5. **Send a message** - Draft is automatically cleared

## ⚙️ Settings

Click the ⚙️ Settings link in the popup to:
- **Adjust auto-save delay** (500ms - 3000ms)
- **View saved draft count**
- **Clear all drafts**
- **Toggle smart restore options**

## 🔒 Privacy

- ✅ **No server communication** - All data stays in your browser
- ✅ **chrome.storage.local** - Encrypted by Chrome
- ✅ **No tracking** - Zero analytics or data collection
- ✅ **Minimal permissions** - Only what's needed
- ✅ **Open source** - Easy to audit

## 📁 File Structure

```
WhatsApp Web Draft Saver/
├── manifest.json      # Extension configuration
├── background.js      # Service worker
├── content.js         # WhatsApp Web integration
├── popup.html/css/js  # Extension popup UI
├── settings.html/css/js # Settings page
└── icons/             # Extension icons
```

## 🛠️ Development

Built with vanilla JavaScript - no frameworks needed!

### Permissions Used
- `storage` - Save drafts locally
- `activeTab` - Interact with WhatsApp Web tab
- `host_permissions` - Access `web.whatsapp.com`

## 📜 License

MIT License - Feel free to use and modify!

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

Made with ❤️ for WhatsApp Web users
