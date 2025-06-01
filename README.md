# Amazon Affiliate Link Detector

A Chrome extension that detects Amazon affiliate links on web pages and opens them in incognito mode.

## Features
- Detects Amazon affiliate links (e.g., with `tag=[a-zA-Z0-9]+-[0-9]{2}`) across domains (`.com`, `.in`, `.co.uk`, `.ca`, `.de`, `.fr`, `.co.jp`, `.com.au`).
- Adds a `rgb(230, 192, 123)` border to affiliate links.
- Shows a hover tooltip: “Amazon Affiliate Link Detected!”.
- Opens affiliate links in an incognito window when clicked.
- Supports dynamic content (e.g., Reddit) using MutationObserver.

## Installation
1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable “Developer mode”.
4. Click “Load unpacked” and select the extension folder.
5. Enable “Allow in Incognito” in extension settings.
6. Visit a page with Amazon affiliate links to test.

## Files
- `manifest.json`: Extension configuration.
- `content.js`: Detects affiliate links and handles clicks.
- `styles.css`: Styles for borders and tooltips.
- `background.js`: Opens incognito windows.