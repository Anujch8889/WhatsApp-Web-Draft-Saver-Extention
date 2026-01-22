# WhatsApp Web Draft Saver - Chrome Extension

**Never lose a message draft again!**  
WhatsApp Web Draft Saver is a privacy-focused Chrome extension that automatically saves your typed messages as you write them. If you accidentally close a tab or refresh the page, your draft is instantly restored when you come back.

---

## 🌟 Key Features

### 1. ✍️ Auto Draft Save
- **Seamless Saving**: Automatically saves your text locally as you type.
- **Real-time Protection**: No need to press any save button. Work continues exactly where you left off.
- **Configurable Delay**: You can set how quickly the auto-save triggers (from 0.5s to 3s) in Settings.

### 2. 📂 Per-Chat Draft Memory
- **Smart Isolation**: Keeps drafts separate for every contact and group.
- **No Mix-ups**: What you type for "Rahul" stays in "Rahul's" chat. What you type in "Team Group" stays there.
- **Instant Restore**: Switching between chats automatically restores the specific draft for that conversation.

### 3. 🛡️ 100% Privacy-Focused & Safe
- **No Servers**: We do not have any servers.
- **No Login Required**: Works instantly without valid accounts or sign-ups.
- **Local Storage Only**: Uses `chrome.storage.local` to keep data encrypted on your own device.
- **Data Never Leaves Your Browser**: Your messages are yours alone.

### 4. 🧹 Auto-Clear on Send
- **Smart Cleanup**: The moment you hit "Send" (or press Enter), the saved draft for that chat is automatically cleared.
- **Duplicate Prevention**: Ensures old drafts don't reappear after you've already sent the message.

### 5. 🎛️ User Control (Popup & Settings)
- **Instant Toggle**: Use the popup switch (🟢/🔴) to enable or disable the extension globally at any time.
- **Draft Management**: View how many drafts are currently stored.
- **Clear All Data**: A single button in Settings to wipe all saved drafts instantly.
- **Restore Preferences**: Choose whether to restore drafts automatically or ask for confirmation first.

---

## 📥 Installation

1. **Download** the source code or the ZIP file from this repository.
2. Unzip the file to a folder.
3. Open Google Chrome and type `chrome://extensions/` in the address bar.
4. Toggle **Developer mode** (top right corner) to **ON**.
5. Click the **Load unpacked** button (top left).
6. Select the folder where you unzipped the extension.
7. Open **WhatsApp Web**, and you're ready to go!

---

## ⚙️ Settings Configuration

Click the extension icon and select **Settings** to customize:

- **Auto-save delay**: Adjust the timer (e.g., save after 1 second of inactivity).
- **Storage**: See total saved drafts and clear cache.
- **Smart Restore**: 
  - ☑️ *Restore automatically*: Drafts appear instantly when you open a chat.
  - ☐ *Ask before restoring*: Shows a confirmation popup before filling the text box.

---

## 🔒 Privacy Policy

**We take your privacy seriously.**
- This extension **DOES NOT** collect, store, share, or transmit any personal data, chat logs, or contact information.
- All operations are performed locally within your browser using Chrome's secure storage API.
- No analytics or tracking scripts are included.

---

## 📜 License

This project is open-source and available under the **MIT License**.
