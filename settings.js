// WhatsApp Draft Saver - Settings Script

document.addEventListener('DOMContentLoaded', async () => {
    // DOM Elements
    const backBtn = document.getElementById('backBtn');
    const delaySlider = document.getElementById('delaySlider');
    const delayValue = document.getElementById('delayValue');
    const draftCountBadge = document.getElementById('draftCountBadge');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const autoRestoreCheck = document.getElementById('autoRestoreCheck');
    const askBeforeRestoreCheck = document.getElementById('askBeforeRestoreCheck');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    // Load current settings
    await loadSettings();

    // Back button handler
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.close();
    });

    // Delay slider handler
    delaySlider.addEventListener('input', () => {
        updateDelayDisplay();
    });

    delaySlider.addEventListener('change', async () => {
        await saveSettings();
        showToast('Auto-save delay updated');
    });

    // Clear all drafts handler
    clearAllBtn.addEventListener('click', async () => {
        const confirmed = confirm('Are you sure you want to clear all saved drafts?\n\nThis action cannot be undone.');
        if (confirmed) {
            try {
                await chrome.runtime.sendMessage({ type: 'CLEAR_ALL_DRAFTS' });
                draftCountBadge.textContent = '0';
                showToast('All drafts cleared');
            } catch (e) {
                showToast('Failed to clear drafts');
            }
        }
    });

    // Auto restore checkbox handler
    autoRestoreCheck.addEventListener('change', async () => {
        await saveSettings();
        showToast('Settings saved');
    });

    // Ask before restore checkbox handler
    askBeforeRestoreCheck.addEventListener('change', async () => {
        // If enabling "ask before restore", auto-restore must be on
        if (askBeforeRestoreCheck.checked && !autoRestoreCheck.checked) {
            autoRestoreCheck.checked = true;
        }
        await saveSettings();
        showToast('Settings saved');
    });

    // Load settings from storage
    async function loadSettings() {
        try {
            const data = await chrome.storage.local.get([
                'autoSaveDelay',
                'autoRestore',
                'askBeforeRestore',
                'drafts'
            ]);

            // Set delay slider
            const delay = data.autoSaveDelay || 1000;
            delaySlider.value = delay;
            updateDelayDisplay();

            // Set checkboxes
            autoRestoreCheck.checked = data.autoRestore !== false;
            askBeforeRestoreCheck.checked = data.askBeforeRestore || false;

            // Set draft count
            const drafts = data.drafts || {};
            draftCountBadge.textContent = Object.keys(drafts).length;
        } catch (e) {
            console.error('Error loading settings:', e);
        }
    }

    // Save settings to storage
    async function saveSettings() {
        try {
            await chrome.storage.local.set({
                autoSaveDelay: parseInt(delaySlider.value),
                autoRestore: autoRestoreCheck.checked,
                askBeforeRestore: askBeforeRestoreCheck.checked
            });
        } catch (e) {
            console.error('Error saving settings:', e);
        }
    }

    // Update delay display
    function updateDelayDisplay() {
        const value = parseInt(delaySlider.value);
        delayValue.textContent = (value / 1000).toFixed(1) + 's';
    }

    // Show toast notification
    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }

    // Listen for storage changes
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local' && changes.drafts) {
            const drafts = changes.drafts.newValue || {};
            draftCountBadge.textContent = Object.keys(drafts).length;
        }
    });
});
