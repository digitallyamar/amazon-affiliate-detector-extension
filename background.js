chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.url) {
    console.log('Opening in incognito:', message.url);
    chrome.windows.create({
      url: message.url,
      incognito: true
    }, (window) => {
      if (chrome.runtime.lastError) {
        console.error('Failed to create incognito window:', chrome.runtime.lastError);
      } else {
        console.log('Incognito window created:', window.id);
      }
    });
  }
});