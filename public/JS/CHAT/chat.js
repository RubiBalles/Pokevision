const usernameInput = document.getElementById("username");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const messagesDiv = document.getElementById("messages");

let username = "";

usernameInput.addEventListener("blur", () => {
    if (usernameInput.value && username !== usernameInput.value.trim()) {
    username = usernameInput.value.trim();
    socket.emit("userJoined", username);
    }
});

sendBtn.addEventListener("click", () => {
    const message = chatInput.value.trim();
    if (message && username) {
    socket.emit("chatMessage", { username, message });
    chatInput.value = "";
    }
});

function appendMessage(text, isSystem = false) {
    const p = document.createElement("p");
    p.textContent = text;
    if (isSystem) p.style.fontStyle = "italic";
    messagesDiv.appendChild(p);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}