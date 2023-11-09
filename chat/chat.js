// Function to fetch and update messages
async function fetchAndDisplayMessages() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/messages", {
      headers: { Authorization: token },
    });

    const messages = response.data.messages;

    // Get the chat container element
    const chatMessages = document.getElementById("chat-messages");

    // Check if there are new messages
    if (messages.length > chatMessages.children.length) {
      // Append the new messages to the chat container
      for (let i = chatMessages.children.length; i < messages.length; i++) {
        const message = messages[i];
        const messageDiv = document.createElement("div");
        messageDiv.innerHTML = `<strong>You:</strong> ${message.message}`;
        chatMessages.appendChild(messageDiv);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

// Set up polling to fetch and update messages every 1 second
setInterval(fetchAndDisplayMessages, 1000);

// Call the function once when the page loads
window.addEventListener("load", fetchAndDisplayMessages);



async function postMsg() {
  try {
    const inputMsg = document.getElementById("message").value;
    const inputMsgObj = {
      message: inputMsg,
    };
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:3000/api/message", inputMsgObj, {
      headers: { Authorization: token },
    });
    fetchMessages();
    document.getElementById("message").value = "";
  } catch (err) {
    console.error(err);
  }
}

document.getElementById("send").addEventListener("click", postMsg);

