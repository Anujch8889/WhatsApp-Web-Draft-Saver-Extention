// WhatsApp Draft Saver - Popup Script

document.addEventListener('DOMContentLoaded', async () => {
    const enableToggle = document.getElementById('enableToggle');
    const toggleStatus = document.getElementById('toggleStatus');
    const draftCount = document.getElementById('draftCount');
    const settingsBtn = document.getElementById('settingsBtn');

    // Load current state
    await loadState();

    // Toggle change handler
    enableToggle.addEventListener('change', async () => {
        const isEnabled = enableToggle.checked;

        // Update UI
        updateToggleUI(isEnabled);

        // Save to storage
        await chrome.storage.local.set({ enabled: isEnabled });
    });

    // Settings button handler
    settingsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        chrome.tabs.create({ url: 'settings.html' });
    });

    // Load state from storage
    async function loadState() {
        try {
            const data = await chrome.storage.local.get(['enabled', 'drafts']);

            // Set toggle state
            const isEnabled = data.enabled !== false;
            enableToggle.checked = isEnabled;
            updateToggleUI(isEnabled);

            // Set draft count
            const drafts = data.drafts || {};
            const count = Object.keys(drafts).length;
            draftCount.textContent = count;
        } catch (e) {
            console.error('Error loading state:', e);
        }
    }

    // Update toggle UI
    function updateToggleUI(isEnabled) {
        toggleStatus.textContent = isEnabled ? 'ON' : 'OFF';
        toggleStatus.classList.toggle('off', !isEnabled);
    }

    // Listen for storage changes
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local') {
            if (changes.enabled) {
                const isEnabled = changes.enabled.newValue;
                enableToggle.checked = isEnabled;
                updateToggleUI(isEnabled);
            }
            if (changes.drafts) {
                const drafts = changes.drafts.newValue || {};
                draftCount.textContent = Object.keys(drafts).length;
            }
        }
    });
});
