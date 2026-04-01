// Detect platform
const host = window.location.hostname;

// Create sidebar
const sidebar = document.createElement("div");
sidebar.id = "chat-sidebar";
document.body.appendChild(sidebar);

// Get user messages (multi-platform)
function getUserMessages() {
  // ChatGPT
  if (host.includes("chat.openai.com") || host.includes("chatgpt.com")) {
    return document.querySelectorAll('[data-message-author-role="user"]');
  }

  // Gemini (robust fallback approach)
  if (host.includes("gemini.google.com")) {
    return document.querySelectorAll('user-query, .user-query, [data-query], [role="textbox"]');
  }

  return [];
}

// Get preview text
function getPreviewText(element) {
  let text = element.innerText || "";
  text = text.trim().replace(/\s+/g, " ");

  return text.length > 40 ? text.substring(0, 40) + "..." : text;
}

// Update sidebar
function updateSidebar() {
  const messages = getUserMessages();

  if (!messages || messages.length === 0) return;

  sidebar.innerHTML = "";

  messages.forEach((msg, index) => {
    const btn = document.createElement("button");

    const preview = getPreviewText(msg);

    btn.innerText = `${index + 1}. ${preview}`;
    btn.title = preview;

    btn.onclick = () => {
      msg.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    };

    sidebar.appendChild(btn);
  });
}

// Highlight active message
function highlightCurrent() {
  const messages = getUserMessages();
  const buttons = sidebar.querySelectorAll("button");

  messages.forEach((msg, index) => {
    const rect = msg.getBoundingClientRect();

    if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
      buttons.forEach(btn => btn.classList.remove("active"));

      if (buttons[index]) {
        buttons[index].classList.add("active");
      }
    }
  });
}

// Debounced observer (performance fix)
let timeout;

const observer = new MutationObserver(() => {
  clearTimeout(timeout);
  timeout = setTimeout(updateSidebar, 300);
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Scroll listener
window.addEventListener("scroll", highlightCurrent);

// Initial run
setTimeout(updateSidebar, 1000);