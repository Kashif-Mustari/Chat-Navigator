# 🚀 Chat Navigator (Chrome Extension)

A simple and powerful browser extension that helps you **navigate long AI chats easily** by listing your questions in a sidebar.

---

## 📌 Problem

When using AI tools like ChatGPT, Gemini, or Grok:

* You ask multiple questions in a single chat
* Important questions go out of view
* You need to scroll a lot to find previous messages

👉 This becomes frustrating and time-consuming.

---

## 💡 Solution

**Chat Navigator** solves this problem by:

* 📍 Detecting all your questions automatically
* 🔢 Displaying them as numbered items (1, 2, 3...)
* ⚡ Allowing one-click navigation to any question

---

## ✨ Features

* ✅ Sidebar with numbered questions
* ✅ Smooth scrolling to selected message
* ✅ Real-time updates using MutationObserver
* ✅ Works with dynamic chat interfaces
* ✅ Lightweight and fast

---

## 🛠️ Tech Stack

* JavaScript (Vanilla)
* HTML / CSS
* Chrome Extension API (Manifest V3)

---

## 📂 Project Structure

```
Chat-Navigator/
│── manifest.json
│── content.js
│── style.css
```

---

## ⚙️ Installation (Chrome)

1. Clone or download this repository:

   ```
   git clone https://github.com/Kashif-Mustari/Chat-Navigator.git
   ```

2. Open Chrome and go to:

   ```
   chrome://extensions/
   ```

3. Enable **Developer Mode**

4. Click **Load unpacked**

5. Select the project folder

---

## 🦊 Run on Firefox (Optional)

1. Open Firefox
2. Go to:

   ```
   about:debugging#/runtime/this-firefox
   ```
3. Click **Load Temporary Add-on**
4. Select `manifest.json`

---

## 🧪 How It Works

* The extension scans the page for user messages
* Builds a sidebar with numbered buttons
* Clicking a number scrolls to that message

---

## 📸 Preview (Concept)

```
1
2
3
4
```

Click → Jump to that question instantly

---

## 🚧 Future Improvements

* 🔍 Show question preview text instead of numbers
* 🎯 Highlight current active question
* 🎨 Improved UI design
* 🌙 Dark/Light mode toggle
* 🔎 Search functionality

---

## 🤝 Contributing

Feel free to fork this repo and improve it!

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Kashif Mustari**
GitHub: https://github.com/Kashif-Mustari


on the way...............
