// Function to check if a URL is an Amazon affiliate link
function isAmazonAffiliateLink(url) {
  const amazonRegex = /amazon\.(com|co\.uk|ca|de|fr|in|co\.jp|com\.au)/i;
  const affiliateTagRegex = /[\?&]tag=[a-zA-Z0-9]+-[0-9]{2}\b/;
  return amazonRegex.test(url) && affiliateTagRegex.test(url);
}

// Function to show a tooltip near the link
function showTooltip(element, message) {
  const existingTooltip = element.dataset.tooltipId
    ? document.getElementById(element.dataset.tooltipId)
    : null;
  if (existingTooltip) existingTooltip.remove();

  const tooltip = document.createElement('div');
  const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;
  tooltip.id = tooltipId;
  element.dataset.tooltipId = tooltipId;
  tooltip.textContent = message;
  tooltip.className = 'amazon-affiliate-tooltip';
  document.body.appendChild(tooltip);
  const rect = element.getBoundingClientRect();
  tooltip.style.top = `${rect.top + window.scrollY - 30}px`;
  tooltip.style.left = `${rect.left + window.scrollX}px`;
}

// Function to process all links on the page
function processLinks() {
  console.log('Processing links...');
  const links = document.querySelectorAll('a[href*="amazon."]');
  console.log(`Found ${links.length} potential Amazon links`);

  links.forEach(link => {
    if (isAmazonAffiliateLink(link.href) && !link.classList.contains('amazon-affiliate-link')) {
      console.log('Affiliate link detected:', link.href);
      link.classList.add('amazon-affiliate-link');
      link.addEventListener('mouseover', () => {
        showTooltip(link, 'Amazon Affiliate Link Detected!');
      });
      link.addEventListener('mouseout', () => {
        const tooltip = link.dataset.tooltipId
          ? document.getElementById(element.dataset.tooltipId)
          : null;
        if (tooltip) tooltip.remove();
      });
    }
  });
}

// Debounce function to limit observer calls
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Page loaded, running processLinks');
  processLinks();
});

// Observe for dynamically added content with debounce
const debouncedProcessLinks = debounce(processLinks, 500);
const observer = new MutationObserver((mutations) => {
  let hasRelevantChanges = false;
  mutations.forEach(mutation => {
    if (mutation.addedNodes.length) {
      hasRelevantChanges = true;
    }
  });
  if (hasRelevantChanges) {
    console.log('DOM changed, running debounced processLinks');
    debouncedProcessLinks();
  }
});
observer.observe(document.body, { childList: true, subtree: true });

// Handle clicks to open affiliate links in incognito mode
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && link.href && isAmazonAffiliateLink(link.href)) {
    console.log('Affiliate link clicked:', link.href);
    e.preventDefault();
    chrome.runtime.sendMessage({ url: link.href });
  }
});