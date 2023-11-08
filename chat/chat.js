document.addEventListener("DOMContentLoaded", () => {
    const chatMessages = document.getElementById("chat-messages");
    const messageInput = document.getElementById("message");
    const sendButton = document.getElementById("send");
  
    sendButton.addEventListener("click", () => {
      const messageText = messageInput.value;
  
      if (messageText.trim() !== "") {
        appendMessage("You", messageText);
        messageInput.value = "";
      }
    });
  
    function appendMessage(sender, message) {
      const messageDiv = document.createElement("div");
      messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
      chatMessages.appendChild(messageDiv);
    }
  });
  