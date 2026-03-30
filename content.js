// Get all user messages (your questions)
function getUserMessages() {
  return document.querySelectorAll('[data-message-author-role="user"]');
}

// Create sidebar
const sidebar = document.createElement("div");
sidebar.id = "chat-sidebar";
document.body.appendChild(sidebar);

// Update sidebar buttons
function updateSidebar() {
  sidebar.innerHTML = "";

  const messages = getUserMessages();

  messages.forEach((msg, index) => {
    const btn = document.createElement("button");
    btn.innerText = index + 1;

    btn.onclick = () => {
      msg.scrollIntoView({ behavior: "smooth" });
    };

    sidebar.appendChild(btn);
  });
}

// Observe changes (important for ChatGPT)
const observer = new MutationObserver(() => {
  updateSidebar();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Initial run
updateSidebar();