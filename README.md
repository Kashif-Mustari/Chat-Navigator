# Chat Navigator

Chat Navigator is a lightweight browser extension that turns long AI conversations into a clean, clickable index. It detects your questions in ChatGPT and Gemini, then shows them in a polished slide-out sidebar so you can jump back to any prompt with one click.

## Features

- Detects user questions automatically
- Shows a polished slide-out sidebar
- Displays numbered question previews
- Highlights the currently visible question
- Smoothly scrolls to selected messages
- Updates in real time as the chat changes
- Works on ChatGPT and Gemini

## Supported Sites

- `https://chat.openai.com/*`
- `https://chatgpt.com/*`
- `https://gemini.google.com/*`

## Project Structure

```text
Chat-Navigator/
|-- manifest.json
|-- content.js
|-- style.css
|-- README.md
```

## How To Add

1. Download or clone this repo.

   ```bash
   git clone https://github.com/Kashif-Mustari/Chat-Navigator.git
   ```

2. Open `chrome://extensions/`.
3. Turn on Developer mode.
4. Click Load unpacked.
5. Select the `Chat-Navigator` folder.

For Firefox temporary add-on:

1. Open `about:debugging#/runtime/this-firefox`.
2. Click Load Temporary Add-on.
3. Select `manifest.json`.

## Usage

1. Open ChatGPT or Gemini.
2. Start or open a conversation.
3. Move your cursor to the right edge of the page.
4. Use the Chat Navigator sidebar to jump between your questions.

## How It Works

The extension runs a content script on supported AI chat pages. It scans the page for user-message elements, creates sidebar buttons from the detected text, and watches for new messages with `MutationObserver`.

When you click a sidebar item, the matching message is brought into view with smooth scrolling.

## Privacy

- No tracking
- No analytics
- No external server calls
- Runs locally in your browser on supported sites

## Tech Stack

- Vanilla JavaScript
- CSS
- Chrome Extension Manifest V3

## Roadmap

- Add search inside the sidebar
- Add light and dark theme options
- Add support for more AI chat platforms
- Add a pin/unpin sidebar option
- Add export or copy shortcuts for prompts
- Add a demo screenshot

## Contributing

Contributions are welcome. Fork the repository, make your changes, and open a pull request.

## Support

If you like this project, consider giving it a star on GitHub.

## Author

Created by Kashif Mustari.

GitHub: https://github.com/Kashif-Mustari

## License

This project is open source and available under the MIT License.
