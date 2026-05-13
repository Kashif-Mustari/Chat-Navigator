// Detect platform
const host = window.location.hostname;

// Create sidebar
const sidebar = document.createElement("div");
sidebar.id = "chat-sidebar";
sidebar.innerHTML = `
  <div class="chat-sidebar-header">
    <div>
      <p class="chat-sidebar-label">Chat Navigator</p>
      <h2>Questions</h2>
    </div>
    <span id="chat-count">0</span>
  </div>
  <div id="chat-list"></div>
`;
document.body.appendChild(sidebar);

const count = sidebar.querySelector("#chat-count");
const list = sidebar.querySelector("#chat-list");

// Create trigger area
const trigger = document.createElement("div");
trigger.id = "chat-trigger";
document.body.appendChild(trigger);

// Get user messages
function getUserMessages() {
  // ChatGPT
  if (host.includes("chat.openai.com") || host.includes("chatgpt.com")) {
    return document.querySelectorAll('[data-message-author-role="user"]');
  }

  // Gemini (fallback selectors)
  if (host.includes("gemini.google.com")) {
    return document.querySelectorAll('user-query, .user-query, [data-query], [role="textbox"]');
  }

  return [];
}

// Get preview text
function getPreviewText(element) {
  let text = element.innerText || "";
  text = text.trim().replace(/\s+/g, " ");

  return text.length > 72 ? text.substring(0, 72) + "..." : text;
}

// Update sidebar
function updateSidebar() {
  const messages = getUserMessages();
  count.innerText = messages.length;
  list.innerHTML = "";

  if (!messages || messages.length === 0) {
    list.innerHTML = `<p class="chat-empty">Your questions will appear here.</p>`;
    return;
  }

  messages.forEach((msg, index) => {
    const btn = document.createElement("button");
    const number = document.createElement("span");
    const previewText = document.createElement("span");

    const preview = getPreviewText(msg);

    number.className = "chat-item-number";
    number.innerText = index + 1;

    previewText.className = "chat-item-preview";
    previewText.innerText = preview;

    btn.appendChild(number);
    btn.appendChild(previewText);
    btn.title = preview;

    btn.onclick = () => {
      msg.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    };

    list.appendChild(btn);
  });

  highlightCurrent();
}

// Highlight active message
function highlightCurrent() {
  const messages = getUserMessages();
  const buttons = list.querySelectorAll("button");

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

// Debounce observer
let timeout;
const observer = new MutationObserver((mutations) => {
  const hasPageChange = mutations.some((mutation) => {
    return !sidebar.contains(mutation.target) && mutation.target !== trigger;
  });

  if (!hasPageChange) return;

  clearTimeout(timeout);
  timeout = setTimeout(updateSidebar, 300);
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Scroll highlight
window.addEventListener("scroll", highlightCurrent);

// Initial load
setTimeout(updateSidebar, 1000);

// ===== SIDEBAR INTERACTION (NO FLICKER) =====

// Open
trigger.addEventListener("mouseenter", () => {
  sidebar.classList.add("open");
});

sidebar.addEventListener("mouseenter", () => {
  sidebar.classList.add("open");
});

// Close safely
trigger.addEventListener("mouseleave", () => {
  setTimeout(() => {
    if (!sidebar.matches(":hover") && !trigger.matches(":hover")) {
      sidebar.classList.remove("open");
    }
  }, 150);
});

sidebar.addEventListener("mouseleave", () => {
  setTimeout(() => {
    if (!sidebar.matches(":hover") && !trigger.matches(":hover")) {
      sidebar.classList.remove("open");
    }
  }, 150);
});
