// WhatsApp Draft Saver - Background Service Worker

// Default settings
const DEFAULT_SETTINGS = {
  enabled: true,
  autoSaveDelay: 1000,
  autoRestore: true,
  askBeforeRestore: false,
  drafts: {}
};

// Initialize extension on install
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    // Set default settings on fresh install
    await chrome.storage.local.set(DEFAULT_SETTINGS);
    console.log('WhatsApp Draft Saver: Extension installed with default settings');
  } else if (details.reason === 'update') {
    // Merge new settings with existing ones on update
    const existing = await chrome.storage.local.get(null);
    const merged = { ...DEFAULT_SETTINGS, ...existing };
    await chrome.storage.local.set(merged);
    console.log('WhatsApp Draft Saver: Extension updated');
  }
});

// Handle messages from content script and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_SETTINGS') {
    chrome.storage.local.get(null).then(sendResponse);
    return true; // Keep channel open for async response
  }
  
  if (message.type === 'SAVE_DRAFT') {
    saveDraft(message.chatId, message.text).then(sendResponse);
    return true;
  }
  
  if (message.type === 'GET_DRAFT') {
    getDraft(message.chatId).then(sendResponse);
    return true;
  }
  
  if (message.type === 'CLEAR_DRAFT') {
    clearDraft(message.chatId).then(sendResponse);
    return true;
  }
  
  if (message.type === 'GET_DRAFT_COUNT') {
    getDraftCount().then(sendResponse);
    return true;
  }
  
  if (message.type === 'CLEAR_ALL_DRAFTS') {
    clearAllDrafts().then(sendResponse);
    return true;
  }
});

// Save draft for a specific chat
async function saveDraft(chatId, text) {
  if (!chatId) return { success: false };
  
  const data = await chrome.storage.local.get(['drafts', 'enabled']);
  if (!data.enabled) return { success: false };
  
  const drafts = data.drafts || {};
  
  if (text && text.trim()) {
    drafts[chatId] = text;
  } else {
    delete drafts[chatId];
  }
  
  await chrome.storage.local.set({ drafts });
  return { success: true };
}

// Get draft for a specific chat
async function getDraft(chatId) {
  if (!chatId) return { text: null };
  
  const data = await chrome.storage.local.get(['drafts', 'enabled']);
  if (!data.enabled) return { text: null };
  
  const drafts = data.drafts || {};
  return { text: drafts[chatId] || null };
}

// Clear draft for a specific chat
async function clearDraft(chatId) {
  if (!chatId) return { success: false };
  
  const data = await chrome.storage.local.get('drafts');
  const drafts = data.drafts || {};
  
  delete drafts[chatId];
  await chrome.storage.local.set({ drafts });
  return { success: true };
}

// Get total draft count
async function getDraftCount() {
  const data = await chrome.storage.local.get('drafts');
  const drafts = data.drafts || {};
  return { count: Object.keys(drafts).length };
}

// Clear all drafts
async function clearAllDrafts() {
  await chrome.storage.local.set({ drafts: {} });
  return { success: true };
}
