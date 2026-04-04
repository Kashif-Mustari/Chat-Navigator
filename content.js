// Detect platform
const host = window.location.hostname;

// Create sidebar
const sidebar = document.createElement("div");
sidebar.id = "chat-sidebar";
document.body.appendChild(sidebar);

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

// Debounce observer
let timeout;
const observer = new MutationObserver(() => {
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
  sidebar.style.right = "0";
});

sidebar.addEventListener("mouseenter", () => {
  sidebar.style.right = "0";
});

// Close safely
sidebar.addEventListener("mouseleave", () => {
  setTimeout(() => {
    if (!sidebar.matches(":hover") && !trigger.matches(":hover")) {
      sidebar.style.right = "-180px";
    }
  }, 150);
});