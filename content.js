// WhatsApp Draft Saver - Content Script
// Injects into WhatsApp Web to handle draft saving/restoring

(function () {
    'use strict';

    let currentChatId = null;
    let saveTimeout = null;
    let isEnabled = true;
    let autoSaveDelay = 1000;
    let autoRestore = true;
    let askBeforeRestore = false;
    let isRestoring = false;

    // Initialize the extension
    async function init() {
        console.log('WhatsApp Draft Saver: Initializing...');

        // Load settings
        await loadSettings();

        // Wait for WhatsApp to fully load
        await waitForWhatsApp();

        // Setup observers and listeners
        setupChatObserver();
        setupInputListener();
        setupSendListener();

        console.log('WhatsApp Draft Saver: Ready!');
    }

    // Load settings from storage
    async function loadSettings() {
        try {
            const response = await chrome.runtime.sendMessage({ type: 'GET_SETTINGS' });
            if (response) {
                isEnabled = response.enabled !== false;
                autoSaveDelay = response.autoSaveDelay || 1000;
                autoRestore = response.autoRestore !== false;
                askBeforeRestore = response.askBeforeRestore || false;
            }
        } catch (e) {
            console.log('WhatsApp Draft Saver: Could not load settings, using defaults');
        }
    }

    // Listen for settings changes
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local') {
            if (changes.enabled) isEnabled = changes.enabled.newValue;
            if (changes.autoSaveDelay) autoSaveDelay = changes.autoSaveDelay.newValue;
            if (changes.autoRestore) autoRestore = changes.autoRestore.newValue;
            if (changes.askBeforeRestore) askBeforeRestore = changes.askBeforeRestore.newValue;
        }
    });

    // Wait for WhatsApp Web to fully load
    function waitForWhatsApp() {
        return new Promise((resolve) => {
            const check = () => {
                const app = document.querySelector('#app');
                const main = document.querySelector('#main');
                if (app && main) {
                    resolve();
                } else {
                    setTimeout(check, 500);
                }
            };
            check();
        });
    }

    // Get current chat ID (contact/group name)
    function getCurrentChatId() {
        // Try multiple selectors for the chat header
        const selectors = [
            'header span[title]',
            '#main header span[dir="auto"]',
            '#main header div[data-testid="conversation-info-header"] span'
        ];

        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                const title = element.getAttribute('title') || element.textContent;
                if (title && title.trim()) {
                    return title.trim();
                }
            }
        }
        return null;
    }

    // Get the message input element
    function getInputElement() {
        const selectors = [
            'div[contenteditable="true"][data-tab="10"]',
            'div[contenteditable="true"][aria-placeholder]',
            'footer div[contenteditable="true"]',
            '#main footer div[contenteditable="true"]'
        ];

        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) return element;
        }
        return null;
    }

    // Get the send button element
    function getSendButton() {
        const selectors = [
            'button[aria-label="Send"]',
            'span[data-icon="send"]',
            'button[data-testid="send"]'
        ];

        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) return element.closest('button') || element;
        }
        return null;
    }

    // Save the current draft
    async function saveDraft(text) {
        if (!isEnabled || !currentChatId || isRestoring) return;

        try {
            await chrome.runtime.sendMessage({
                type: 'SAVE_DRAFT',
                chatId: currentChatId,
                text: text
            });
        } catch (e) {
            console.log('WhatsApp Draft Saver: Could not save draft');
        }
    }

    // Restore draft for current chat
    async function restoreDraft() {
        if (!isEnabled || !currentChatId || !autoRestore) return;

        try {
            const response = await chrome.runtime.sendMessage({
                type: 'GET_DRAFT',
                chatId: currentChatId
            });

            if (response && response.text) {
                const input = getInputElement();
                if (!input) return;

                // Check if input is already empty
                const currentText = input.textContent || '';
                if (currentText.trim()) return; // Don't overwrite existing text

                if (askBeforeRestore) {
                    // Show confirmation
                    const shouldRestore = confirm(`Restore draft for "${currentChatId}"?\n\n"${response.text.substring(0, 50)}${response.text.length > 50 ? '...' : ''}"`);
                    if (!shouldRestore) return;
                }

                // Restore the draft
                isRestoring = true;
                input.focus();

                // Clear existing content
                input.innerHTML = '';

                // Set the draft text
                input.textContent = response.text;

                // Trigger input event to update WhatsApp's internal state
                const inputEvent = new InputEvent('input', {
                    bubbles: true,
                    cancelable: true,
                    inputType: 'insertText',
                    data: response.text
                });
                input.dispatchEvent(inputEvent);

                // Move cursor to end
                const range = document.createRange();
                const selection = window.getSelection();
                range.selectNodeContents(input);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);

                isRestoring = false;
                console.log(`WhatsApp Draft Saver: Restored draft for "${currentChatId}"`);
            }
        } catch (e) {
            isRestoring = false;
            console.log('WhatsApp Draft Saver: Could not restore draft');
        }
    }

    // Clear draft for current chat
    async function clearDraft() {
        if (!currentChatId) return;

        try {
            await chrome.runtime.sendMessage({
                type: 'CLEAR_DRAFT',
                chatId: currentChatId
            });
            console.log(`WhatsApp Draft Saver: Cleared draft for "${currentChatId}"`);
        } catch (e) {
            console.log('WhatsApp Draft Saver: Could not clear draft');
        }
    }

    // Setup observer for chat changes
    function setupChatObserver() {
        const observer = new MutationObserver(() => {
            const newChatId = getCurrentChatId();

            if (newChatId && newChatId !== currentChatId) {
                currentChatId = newChatId;
                console.log(`WhatsApp Draft Saver: Switched to chat "${currentChatId}"`);

                // Restore draft for new chat after a short delay
                setTimeout(restoreDraft, 300);
            }
        });

        // Observe the main area for changes
        const main = document.querySelector('#main') || document.querySelector('#app');
        if (main) {
            observer.observe(main, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['title']
            });
        }

        // Initial chat detection
        currentChatId = getCurrentChatId();
        if (currentChatId) {
            setTimeout(restoreDraft, 500);
        }
    }

    // Setup input listener for draft saving
    function setupInputListener() {
        document.addEventListener('input', (e) => {
            if (!isEnabled) return;

            const input = getInputElement();
            if (!input) return;

            // Check if the event target is the input element
            if (e.target === input || input.contains(e.target)) {
                // Clear any existing timeout
                if (saveTimeout) {
                    clearTimeout(saveTimeout);
                }

                // Save after delay (debounce)
                saveTimeout = setTimeout(() => {
                    const text = input.textContent || '';
                    saveDraft(text);
                }, autoSaveDelay);
            }
        }, true);
    }

    // Setup send button listener
    function setupSendListener() {
        // Listen for Enter key press
        document.addEventListener('keydown', (e) => {
            if (!isEnabled) return;

            if (e.key === 'Enter' && !e.shiftKey) {
                const input = getInputElement();
                if (input && (input === document.activeElement || input.contains(document.activeElement))) {
                    // Check if there's text to send
                    const text = input.textContent || '';
                    if (text.trim()) {
                        // Clear draft when message is sent
                        setTimeout(clearDraft, 100);
                    }
                }
            }
        }, true);

        // Listen for send button click
        document.addEventListener('click', (e) => {
            if (!isEnabled) return;

            const sendBtn = getSendButton();
            if (sendBtn && (sendBtn === e.target || sendBtn.contains(e.target))) {
                // Clear draft when send button is clicked
                setTimeout(clearDraft, 100);
            }
        }, true);
    }

    // Start the extension
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
