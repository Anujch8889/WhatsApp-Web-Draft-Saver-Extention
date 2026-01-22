# WhatsApp Web Draft Saver Extension

A privacy-focused Chrome extension that automatically saves and restores message drafts in WhatsApp Web. Never lose a drafted message again!

## Features

- **✍️ Auto-save Drafts**: Automatically saves text as you type.
- **📂 Per-Chat Memory**: Maintains separate drafts for each contact or group.
- **🔒 100% Local**: Uses `chrome.storage.local` exclusively. No data leaves your browser.
- **🧹 Auto-Clear**: Automatically clears the draft when you send the message.
- **🎛️ Easy Toggle**: simple ON/OFF switch in the popup.
- **⚙️ Configurable**: Customize auto-save delay and restore behavior.

## Installation

1. Download the extension ZIP file (or clone this repo).
2. Unzip the file.
3. Open Chrome and navigate to `chrome://extensions/`.
4. Enable **Developer mode** in the top right.
5. Click **Load unpacked**.
6. Select the extension folder.

## Privacy Policy

This extension does not collect, store, or transmit any user data to external servers. All drafts are stored locally on your device using the Chrome Storage API and are automatically cleared when sent or manually deleted by the user.

## License

MIT
